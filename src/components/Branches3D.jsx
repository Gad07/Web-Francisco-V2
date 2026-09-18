import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── TRANSPARENT OAK LEAF PROCESSOR ────────────────────────────────────────

function loadTransparentLeafTexture(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const maxVal = Math.max(data[i], data[i + 1], data[i + 2]);
        if (maxVal < 22) {
          data[i + 3] = 0;
        } else if (maxVal < 55) {
          data[i + 3] = Math.floor(((maxVal - 22) / 33) * 255);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.src = url;
  });
}

// ─── CURVED LEAF GEOMETRY WITH STEM AT ORIGIN ───────────────────────────────

function createLeafWithStemGeometry(width = 0.65, height = 0.88) {
  const geo = new THREE.PlaneGeometry(width, height, 12, 12);
  // Shift origin (0,0,0) to the base of the stem so leaves attach directly to branch surface
  geo.translate(0, height * 0.48, 0);

  const pos = geo.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    const vNorm = vertex.y / height;
    const uNorm = vertex.x / width;

    // Natural 3D cupping & bend along the leaf body
    const curveX = -Math.pow(uNorm * 2, 2) * 0.12 * Math.sin(vNorm * Math.PI);
    const curveY = Math.sin(vNorm * Math.PI) * 0.08;

    vertex.z += curveX + curveY;
    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  geo.computeVertexNormals();
  return geo;
}

// ─── ORGANIC HIGH-DETAIL TAPERED 3D BRANCH GEOMETRY ────────────────────────

function createTaperedBranchGeo(points, rStart, rEnd, tubularSegments = 96, radialSegments = 24) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const frames = curve.computeFrenetFrames(tubularSegments, false);

  const vertices = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const point = curve.getPointAt(t);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    // Smooth botanical taper along curve
    const radius = rStart * (1 - t) + rEnd * t;

    for (let j = 0; j <= radialSegments; j++) {
      const u = j / radialSegments;
      const theta = u * Math.PI * 2;

      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      // Multi-frequency organic noise for natural bark ridges, knots & bumps
      const barkNoise = (
        Math.sin(theta * 5 + t * Math.PI * 14) * 0.12 +
        Math.cos(t * 28 + theta * 4) * 0.08 +
        Math.sin(theta * 2 + t * Math.PI * 6) * 0.10
      ) * radius;

      const currentRadius = Math.max(0.008, radius + barkNoise);

      const vx = point.x + currentRadius * (cosTheta * N.x + sinTheta * B.x);
      const vy = point.y + currentRadius * (cosTheta * N.y + sinTheta * B.y);
      const vz = point.z + currentRadius * (cosTheta * N.z + sinTheta * B.z);

      vertices.push(vx, vy, vz);

      const nx = cosTheta * N.x + sinTheta * B.x;
      const ny = cosTheta * N.y + sinTheta * B.y;
      const nz = cosTheta * N.z + sinTheta * B.z;
      normals.push(nx, ny, nz);

      // Tiled bark UV coordinates along branch circumference and length
      uvs.push(u * 4.0, t * 12.0);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const first = i * (radialSegments + 1) + j;
      const second = first + radialSegments + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return { geo, curve };
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function Branches3D({ visible }) {
  const groupRef = useRef();
  const fgLeavesRef = useRef();
  const bgLeavesRef = useRef();

  const [oakTexture, setOakTexture] = useState(null);
  const [ficusTexture, setFicusTexture] = useState(null);

  useEffect(() => {
    loadTransparentLeafTexture('/textures/leaf_oak.jpg').then(setOakTexture);
    loadTransparentLeafTexture('/textures/leaf_ficus.jpg').then(setFicusTexture);
  }, []);

  // Procedural peeled bark alpha mask — irregular strips reveal inner wood
  const barkAlphaMap = useMemo(() => {
    const w = 1024, h = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Start fully opaque (white = full bark)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Irregular vertical peeled strips
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * w;
      const stripW = 20 + Math.random() * 80;
      const stripH = 120 + Math.random() * 600;
      const y = Math.random() * h;
      ctx.save();
      ctx.translate(x + stripW / 2, y + stripH / 2);
      ctx.rotate((Math.random() - 0.5) * 0.25);
      const grad = ctx.createLinearGradient(-stripW / 2, 0, stripW / 2, 0);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.3, `rgba(0,0,0,${0.55 + Math.random() * 0.35})`);
      grad.addColorStop(0.7, `rgba(0,0,0,${0.55 + Math.random() * 0.35})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(-stripW / 2, -stripH / 2, stripW, stripH);
      ctx.restore();
    }

    // Fine horizontal crack lines
    for (let i = 0; i < 30; i++) {
      const y = Math.random() * h;
      const x = Math.random() * w * 0.5;
      ctx.fillStyle = `rgba(0,0,0,${0.2 + Math.random() * 0.3})`;
      ctx.fillRect(x, y, 30 + Math.random() * (w - x), 1 + Math.random() * 3);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 4);
    return tex;
  }, []);

  // Dual PBR Textures (Weathered dark trunk bark + Stripped golden-tan wood)
  const { barkMap, barkNormal, woodMap, woodNormal } = useMemo(() => {
    const loader = new THREE.TextureLoader();

    const bMap = loader.load('/textures/bark_albedo.jpg');
    bMap.wrapS = bMap.wrapT = THREE.RepeatWrapping;
    bMap.repeat.set(1.5, 8);
    bMap.colorSpace = THREE.SRGBColorSpace;
    bMap.anisotropy = 16;

    const bNorm = loader.load('/textures/bark_normal.jpg');
    bNorm.wrapS = bNorm.wrapT = THREE.RepeatWrapping;
    bNorm.repeat.set(1.5, 8); // Match albedo to prevent grid moire
    bNorm.anisotropy = 16;

    const wMap = loader.load('/textures/bark_albedo.jpg');
    wMap.wrapS = wMap.wrapT = THREE.RepeatWrapping;
    wMap.repeat.set(1.5, 8);
    wMap.colorSpace = THREE.SRGBColorSpace;
    wMap.anisotropy = 16;

    const wNorm = loader.load('/textures/bark_normal.jpg');
    wNorm.wrapS = wNorm.wrapT = THREE.RepeatWrapping;
    wNorm.repeat.set(1.5, 8);
    wNorm.anisotropy = 16;

    return { barkMap: bMap, barkNormal: bNorm, woodMap: wMap, woodNormal: wNorm };
  }, []);

  const oakLeafGeo = useMemo(() => createLeafWithStemGeometry(0.68, 0.90), []);
  const ficusLeafGeo = useMemo(() => createLeafWithStemGeometry(0.55, 0.75), []);

  // 3D Organic Branch Skeleton replicating the shape of reference photo (media_1789661048417.png)
  const branchData = useMemo(() => [
    // 1. Main Continuous Thick Trunk -> Upper Antler Bough
    {
      rStart: 0.52,
      rEnd: 0.04,
      points: [
        [7.5, -6.5, -0.6],
        [5.5, -3.5, -0.1],
        [3.8, -1.2, 0.3],
        [2.2, 0.8, 0.4],
        [0.8, 2.8, 0.2],
        [-0.5, 4.4, -0.1],
        [-1.8, 5.5, -0.4]
      ]
    },

    // 2. Lower Continuous Long Wavy Branch System
    {
      rStart: 0.30,
      rEnd: 0.04,
      points: [
        [3.8, -1.2, 0.3],
        [2.0, -2.0, 0.3],
        [0.2, -2.5, 0.2],
        [-1.8, -2.7, 0.0],
        [-3.8, -2.8, -0.2],
        [-5.0, -2.9, -0.1]
      ]
    },

    // 3. Upper Twig 1 (Straight Up)
    {
      rStart: 0.15,
      rEnd: 0.03,
      points: [
        [2.2, 0.8, 0.4],
        [1.8, 3.2, 0.6],
        [1.2, 5.2, 0.7]
      ]
    },

    // 4. Upper Twig 2 (Crooked Left)
    {
      rStart: 0.14,
      rEnd: 0.03,
      points: [
        [0.8, 2.8, 0.2],
        [-0.8, 3.4, 0.5],
        [-2.2, 3.8, 0.3]
      ]
    },

    // 5. Lower Twig 1 (Down-Left)
    {
      rStart: 0.14,
      rEnd: 0.03,
      points: [
        [2.0, -2.0, 0.3],
        [0.2, -3.4, 0.5],
        [-1.2, -4.2, 0.3]
      ]
    },

    // 6. Lower Twig 2 (Downward Crooked Spur)
    {
      rStart: 0.10,
      rEnd: 0.03,
      points: [
        [-1.8, -2.7, 0.0],
        [-2.8, -3.8, -0.2],
        [-3.8, -4.4, -0.4]
      ]
    },

    // 7. Small Dry Stubs / Knobby Spurs
    {
      rStart: 0.09,
      rEnd: 0.02,
      points: [
        [5.5, -3.5, -0.1],
        [6.2, -2.0, 0.7]
      ]
    },
    {
      rStart: 0.08,
      rEnd: 0.02,
      points: [
        [3.8, -1.2, 0.3],
        [4.1, 0.5, 1.0]
      ]
    },
    {
      rStart: 0.07,
      rEnd: 0.02,
      points: [
        [0.2, -2.5, 0.2],
        [-0.2, -1.4, 0.5]
      ]
    }
  ], []);

  const branchMeshes = useMemo(() => {
    return branchData.map(b => ({
      ...createTaperedBranchGeo(b.points, b.rStart, b.rEnd),
      rStart: b.rStart,
      rEnd: b.rEnd
    }));
  }, [branchData]);

  // Leaf placement: attaching leaf stem origins directly onto 3D twig surfaces
  const { leafPositions, fgCount, bgCount } = useMemo(() => {
    const positions = [];
    const dummy = new THREE.Object3D();

    branchMeshes.forEach((branch) => {
      const numNodes = 10; // More sample points for denser leaf coverage
      for (let i = 1; i <= numNodes; i++) {
        const t = 0.15 + (i / numNodes) * 0.80;
        const pos = branch.curve.getPointAt(t);
        const tangent = branch.curve.getTangentAt(t);

        const radiusAtT = branch.rStart * (1 - t) + branch.rEnd * t;
        if (radiusAtT > 0.35) continue; // Include more medium boughs

        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
        const normal = new THREE.Vector3().crossVectors(right, tangent).normalize();

        const clusterSize = 5; // Denser clusters at each node
        for (let c = 0; c < clusterSize; c++) {
          const angle = (c / clusterSize) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
          const surfaceNormal = right.clone().multiplyScalar(Math.cos(angle)).add(normal.clone().multiplyScalar(Math.sin(angle))).normalize();

          const stemOrigin = pos.clone().add(surfaceNormal.clone().multiplyScalar(radiusAtT * 0.9));
          dummy.position.copy(stemOrigin);

          const leafDir = surfaceNormal.clone().add(tangent.clone().multiplyScalar(0.4)).normalize();
          dummy.lookAt(stemOrigin.clone().add(leafDir));

          dummy.rotateX(0.3 + Math.random() * 0.5);
          dummy.rotateZ((Math.random() - 0.5) * 0.7);
          dummy.scale.setScalar(0.60 + Math.random() * 0.5);
          dummy.updateMatrix();
          positions.push(dummy.matrix.clone());
        }
      }
    });

    const fgCount = positions.length;

    // Background Depth Layer Leaves — dense atmospheric fill
    for (let i = 0; i < 180; i++) {
      dummy.position.set(
        Math.random() * 16 - 3,
        Math.random() * 18 - 5,
        -2.5 - Math.random() * 3
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.setScalar(0.9 + Math.random() * 1.1);
      dummy.updateMatrix();
      positions.push(dummy.matrix.clone());
    }

    return { leafPositions: positions, fgCount, bgCount: 180 };
  }, [branchMeshes]);

  // Sync matrices with InstancedMeshes
  useEffect(() => {
    if (bgLeavesRef.current && fgLeavesRef.current && leafPositions.length > 0) {
      fgLeavesRef.current.count = fgCount;
      for (let i = 0; i < fgCount; i++) {
        fgLeavesRef.current.setMatrixAt(i, leafPositions[i]);
      }
      fgLeavesRef.current.instanceMatrix.needsUpdate = true;

      bgLeavesRef.current.count = bgCount;
      for (let i = 0; i < bgCount; i++) {
        bgLeavesRef.current.setMatrixAt(i, leafPositions[fgCount + i]);
      }
      bgLeavesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [leafPositions, fgCount, bgCount, oakTexture, ficusTexture]);

  // STRICT REQUIREMENT: Locked 100% fixed and static (No mouse tracking, No sway)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(2.2, 0.0, 0.0);
      groupRef.current.rotation.set(0.0, 0.0, 0.0);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* Studio Lighting highlights for 3D PBR Bark & Leaf Sheen */}
      <directionalLight position={[10, 14, 12]} intensity={3.8} color="#fffaf0" castShadow />
      <directionalLight position={[-8, -5, 3]} intensity={1.2} color="#cde0ff" />
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* DUAL LAYER 3D Branch Segments: Inner golden wood tube + outer peeling cracked bark */}
      {branchMeshes.map((b, i) => (
        <React.Fragment key={i}>
          {/* Inner Wood Layer — warm honey-gold stripped timber visible through bark gaps */}
          <mesh geometry={b.geo} scale={[0.92, 1.0, 0.92]}>
            <meshStandardMaterial
              map={woodMap}
              normalMap={woodNormal}
              normalScale={new THREE.Vector2(2.0, 2.0)}
              roughness={0.65}
              metalness={0.02}
              color="#b89060"
              side={THREE.BackSide}
            />
          </mesh>

          {/* Outer Bark Layer — dark cracked bark, peeling only on thin twigs (realistic) */}
          <mesh geometry={b.geo} castShadow receiveShadow>
            <meshStandardMaterial
              map={barkMap}
              normalMap={barkNormal}
              normalScale={new THREE.Vector2(2.0, 2.0)}
              alphaMap={b.rStart < 0.18 ? barkAlphaMap : null}
              transparent={b.rStart < 0.18}
              alphaTest={b.rStart < 0.18 ? 0.05 : 0}
              roughness={b.rStart >= 0.30 ? 0.86 : 0.93}
              metalness={0.01}
              color={b.rStart >= 0.30 ? '#3d2e1e' : '#4a3626'}
            />
          </mesh>
        </React.Fragment>
      ))}

      {/* Background Depth Layer Leaves */}
      <instancedMesh
        ref={bgLeavesRef}
        args={[ficusLeafGeo, null, bgCount]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          map={ficusTexture || oakTexture}
          transparent={true}
          alphaTest={0.2}
          side={THREE.DoubleSide}
          roughness={0.65}
          metalness={0.0}
          clearcoat={0.2}
          color="#658865"
        />
      </instancedMesh>

      {/* Foreground Photorealistic Oak Leaves attached at stem bases */}
      <instancedMesh
        ref={fgLeavesRef}
        args={[oakLeafGeo, null, Math.max(1, fgCount)]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          map={oakTexture}
          transparent={true}
          alphaTest={0.25}
          side={THREE.DoubleSide}
          roughness={0.28}
          metalness={0.0}
          clearcoat={0.8}
          clearcoatRoughness={0.12}
          reflectivity={0.85}
          color="#ffffff"
        />
      </instancedMesh>
    </group>
  );
}
