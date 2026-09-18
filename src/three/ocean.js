import * as THREE from 'three';

/**
 * Creates animated procedural caustic light texture
 */
function createCausticTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);

  // Overlapping sine waves to simulate sun caustics through waves
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

export class OceanScene {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Initial position in 3D space: below the terrestrial world
    this.group.position.set(0, -22, 0);

    // 1. Bioluminescent Plankton / Marine Snow Particles
    const particleCount = 800;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 35;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      pScales[i] = 1 + Math.random() * 3;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.25,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    this.plankton = new THREE.Points(pGeo, pMat);
    this.group.add(this.plankton);

    // 2. Volumetric Light Rays (God Rays / Light Shafts)
    const rayGeo = new THREE.CylinderGeometry(0.5, 4.5, 18, 16, 1, true);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.rays = [];
    for (let i = 0; i < 4; i++) {
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set((i - 1.5) * 5.5, 5, -2 + (i % 2) * 3);
      ray.rotation.z = -0.15 + (i * 0.08);
      ray.rotation.x = 0.1;
      this.group.add(ray);
      this.rays.push(ray);
    }

    // 3. Floating 3D Bubbles
    const bubbleGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.33,
    });

    this.bubbles = [];
    for (let i = 0; i < 25; i++) {
      const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
      bubble.position.set(
        (Math.random() - 0.5) * 18,
        -8 + Math.random() * 16,
        (Math.random() - 0.5) * 12
      );
      const s = 0.4 + Math.random() * 1.2;
      bubble.scale.set(s, s, s);
      this.group.add(bubble);
      this.bubbles.push({
        mesh: bubble,
        speed: 1.0 + Math.random() * 2.0,
        swaySpeed: 2.0 + Math.random() * 2.0,
      });
    }

    // 4. Underwater Caustic Floor Plane
    const causticTexture = createCausticTexture();
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x03223f,
      map: causticTexture,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -8;
    this.group.add(floor);
    this.causticTexture = causticTexture;

    // 5. Swaying Kelp / Marine Flora
    this.kelps = [];
    const kelpMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      emissive: 0x042f2e,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });

    for (let k = 0; k < 12; k++) {
      const kelpPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, 2.5, 0),
        new THREE.Vector3(-0.3, 5.0, 0.2),
        new THREE.Vector3(0.4, 7.5, -0.1),
      ];
      const kelpCurve = new THREE.CatmullRomCurve3(kelpPoints);
      const kelpMesh = new THREE.Mesh(new THREE.TubeGeometry(kelpCurve, 20, 0.12, 6, false), kelpMat);
      kelpMesh.position.set(
        (Math.random() - 0.5) * 22,
        -8,
        -5 + (Math.random() - 0.5) * 10
      );
      this.group.add(kelpMesh);
      this.kelps.push({ mesh: kelpMesh, phase: Math.random() * Math.PI * 2 });
    }
  }

  update(time) {
    // 1. Drifting plankton
    const positions = this.plankton.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + i) * 0.005; // Gentle vertical bobbing
      positions[i] += Math.cos(time * 0.5 + i) * 0.003; // Horizontal current drift
    }
    this.plankton.geometry.attributes.position.needsUpdate = true;

    // 2. Bubbles rising
    for (let i = 0; i < this.bubbles.length; i++) {
      const b = this.bubbles[i];
      b.mesh.position.y += 0.03 * b.speed;
      b.mesh.position.x += Math.sin(time * b.swaySpeed + i) * 0.01;
      if (b.mesh.position.y > 10) {
        b.mesh.position.y = -8;
      }
    }

    // 3. Rays shimmer
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      ray.material.opacity = 0.08 + Math.sin(time * 1.5 + i) * 0.04;
    }

    // 4. Caustics motion
    if (this.causticTexture) {
      this.causticTexture.offset.x = time * 0.04;
      this.causticTexture.offset.y = time * 0.03;
    }

    // 5. Kelp sway with water currents
    for (let i = 0; i < this.kelps.length; i++) {
      const k = this.kelps[i];
      k.mesh.rotation.z = Math.sin(time * 1.2 + k.phase) * 0.12;
      k.mesh.rotation.x = Math.cos(time * 0.8 + k.phase) * 0.08;
    }
  }

  setVisible(visible) {
    this.group.visible = visible;
  }
}
