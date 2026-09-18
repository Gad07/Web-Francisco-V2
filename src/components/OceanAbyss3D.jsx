import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createCausticTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(100, 220, 255, 0.4)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    const cy = i * 18;
    for (let x = 0; x < 512; x += 10) {
      const y = cy + Math.sin(x * 0.05 + i * 0.8) * 12 + Math.cos(x * 0.02) * 8;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export default function OceanAbyss3D() {
  const groupRef = useRef();
  const planktonRef = useRef();
  const causticTexture = useMemo(() => createCausticTexture(), []);

  // 1. Plankton Particles
  const { particleCount, pPositions } = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return { particleCount: count, pPositions: positions };
  }, []);

  // 2. Volumetric God Rays
  const rays = useMemo(() => {
    return [0, 1, 2, 3].map((i) => ({
      pos: [(i - 1.5) * 5.5, 5, -2 + (i % 2) * 3],
      rot: [0.1, 0, -0.15 + i * 0.08]
    }));
  }, []);

  // 3. Bubbles
  const bubbles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      pos: [(Math.random() - 0.5) * 18, -8 + Math.random() * 16, (Math.random() - 0.5) * 12],
      scale: 0.4 + Math.random() * 1.0,
      speed: 1.0 + Math.random() * 2.0,
      swaySpeed: 2.0 + Math.random() * 2.0,
    }));
  }, []);

  // 4. Kelp Forest
  const kelps = useMemo(() => {
    return Array.from({ length: 12 }, (_, k) => {
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, 2.5, 0),
        new THREE.Vector3(-0.3, 5.0, 0.2),
        new THREE.Vector3(0.4, 7.5, -0.1),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, 20, 0.12, 6, false);
      return {
        geo,
        pos: [(Math.random() - 0.5) * 22, -8, -5 + (Math.random() - 0.5) * 10],
        phase: Math.random() * Math.PI * 2
      };
    });
  }, []);

  const kelpMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      emissive: 0x042f2e,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Caustics drift
    if (causticTexture) {
      causticTexture.offset.x = time * 0.04;
      causticTexture.offset.y = time * 0.03;
    }

    // Plankton drift
    if (planktonRef.current) {
      const arr = planktonRef.current.geometry.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += Math.sin(time + i) * 0.003;
        arr[i] += Math.cos(time * 0.5 + i) * 0.002;
      }
      planktonRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -22, 0]}>
      {/* Plankton */}
      <points ref={planktonRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={pPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0x67e8f9}
          size={0.25}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Volumetric Rays */}
      {rays.map((ray, i) => (
        <mesh key={i} position={ray.pos} rotation={ray.rot}>
          <cylinderGeometry args={[0.5, 4.5, 18, 16, 1, true]} />
          <meshBasicMaterial
            color={0x38bdf8}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Caustic Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={0x03223f}
          map={causticTexture}
          roughness={0.3}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Kelp Forest */}
      {kelps.map((k, i) => (
        <mesh key={i} geometry={k.geo} material={kelpMat} position={k.pos} />
      ))}
    </group>
  );
}
