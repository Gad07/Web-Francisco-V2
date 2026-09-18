import * as THREE from 'three';

/**
 * Photorealistic Botanical Texture Generator
 */
function createRealisticBotanicalTextures() {
  // 1. Photorealistic Tree Bark Texture (Natural Oak / Ficus bark with ridges & lichen)
  const barkCanvas = document.createElement('canvas');
  barkCanvas.width = 1024;
  barkCanvas.height = 1024;
  const bCtx = barkCanvas.getContext('2d');

  // Deep dark wood base
  bCtx.fillStyle = '#2c1e14';
  bCtx.fillRect(0, 0, 1024, 1024);

  // Vertical wood fibers and bark fissures
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 1024;
    const w = 2 + Math.random() * 8;
    const isDeep = Math.random() > 0.5;
    bCtx.fillStyle = isDeep ? '#180f08' : '#3d2b1d';
    bCtx.fillRect(x, 0, w, 1024);
  }

  // Organic Lichen / Moss Patches
  for (let i = 0; i < 120; i++) {
    const mx = Math.random() * 1024;
    const my = Math.random() * 1024;
    const mr = 10 + Math.random() * 30;
    const g = bCtx.createRadialGradient(mx, my, 0, mx, my, mr);
    g.addColorStop(0, 'rgba(54, 94, 50, 0.75)');
    g.addColorStop(0.6, 'rgba(38, 71, 35, 0.4)');
    g.addColorStop(1, 'rgba(38, 71, 35, 0)');
    bCtx.fillStyle = g;
    bCtx.beginPath();
    bCtx.arc(mx, my, mr, 0, Math.PI * 2);
    bCtx.fill();
  }

  const barkTexture = new THREE.CanvasTexture(barkCanvas);
  barkTexture.wrapS = THREE.RepeatWrapping;
  barkTexture.wrapT = THREE.RepeatWrapping;

  // 2. Photorealistic Leaf Texture with Natural Chlorophyll & Vein Architecture
  const leafCanvas = document.createElement('canvas');
  leafCanvas.width = 512;
  leafCanvas.height = 512;
  const lCtx = leafCanvas.getContext('2d');

  // Natural chlorophyll gradient (Lush rainforest green to sunlight tip)
  const lg = lCtx.createRadialGradient(256, 256, 20, 256, 256, 240);
  lg.addColorStop(0, '#589e47');
  lg.addColorStop(0.5, '#3a7830');
  lg.addColorStop(0.85, '#1e5218');
  lg.addColorStop(1, '#0e2b0b');
  lCtx.fillStyle = lg;
  lCtx.beginPath();
  lCtx.ellipse(256, 256, 220, 105, 0, 0, Math.PI * 2);
  lCtx.fill();

  // Natural Pale Veins
  lCtx.strokeStyle = 'rgba(164, 224, 148, 0.7)';
  lCtx.lineWidth = 6;
  lCtx.beginPath();
  lCtx.moveTo(40, 256);
  lCtx.lineTo(470, 256);
  lCtx.stroke();

  // Secondary Lateral Veins
  lCtx.lineWidth = 2.5;
  for (let vx = 80; vx < 440; vx += 36) {
    lCtx.beginPath();
    lCtx.moveTo(vx, 256);
    lCtx.quadraticCurveTo(vx + 30, 200, vx + 55, 175);
    lCtx.moveTo(vx, 256);
    lCtx.quadraticCurveTo(vx + 30, 312, vx + 55, 337);
    lCtx.stroke();
  }

  const leafTexture = new THREE.CanvasTexture(leafCanvas);
  return { barkTexture, leafTexture };
}

export class BranchesScene {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    const { barkTexture, leafTexture } = createRealisticBotanicalTextures();
    this.leafMeshes = [];

    // Realistic PBR Bark Material
    this.barkMat = new THREE.MeshStandardMaterial({
      map: barkTexture,
      bumpMap: barkTexture,
      bumpScale: 0.25,
      roughness: 0.9,
      metalness: 0.02,
    });

    // Subsurface Scattering Leaf Material
    this.leafMat = new THREE.MeshStandardMaterial({
      map: leafTexture,
      transparent: true,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide,
      alphaTest: 0.05,
      emissive: new THREE.Color(0x184715),
      emissiveIntensity: 0.3,
    });

    // Layer 1: Foreground Majestic Branch System (Right Viewport)
    this.createBranchSystem(
      new THREE.Vector3(5.0, 1.6, 4.2),
      new THREE.Euler(-0.1, -0.45, 0.3),
      1.15,
      36,
      1
    );

    // Layer 2: Deeper Canopy Layer (Background Depth)
    this.createBranchSystem(
      new THREE.Vector3(6.2, -0.8, 1.8),
      new THREE.Euler(0.25, -0.65, 0.1),
      0.95,
      24,
      2
    );

    this.group.position.set(0, 0, 0);
  }

  createBranchSystem(rootPos, rotation, scale, leafCount, layerIndex) {
    const branchGroup = new THREE.Group();
    branchGroup.position.copy(rootPos);
    branchGroup.rotation.copy(rotation);
    branchGroup.scale.set(scale, scale, scale);

    // Main Branch Stem Curve
    const points = [
      new THREE.Vector3(0, 3.8, 0),
      new THREE.Vector3(-1.3, 2.0, -0.4),
      new THREE.Vector3(-2.8, 0.5, -0.2),
      new THREE.Vector3(-4.2, -1.0, -0.7),
      new THREE.Vector3(-5.5, -2.6, -1.1),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const trunkGeo = new THREE.TubeGeometry(curve, 36, 0.24, 12, false);
    const trunkMesh = new THREE.Mesh(trunkGeo, this.barkMat);
    branchGroup.add(trunkMesh);

    // Lateral Twigs
    const subPoints1 = [
      new THREE.Vector3(-1.3, 2.0, -0.4),
      new THREE.Vector3(-2.2, 2.7, 0.3),
      new THREE.Vector3(-3.5, 3.0, 0.7),
    ];
    const subCurve1 = new THREE.CatmullRomCurve3(subPoints1);
    branchGroup.add(new THREE.Mesh(new THREE.TubeGeometry(subCurve1, 18, 0.13, 8, false), this.barkMat));

    const subPoints2 = [
      new THREE.Vector3(-2.8, 0.5, -0.2),
      new THREE.Vector3(-3.8, 0.9, -1.1),
      new THREE.Vector3(-5.1, 0.6, -1.7),
    ];
    const subCurve2 = new THREE.CatmullRomCurve3(subPoints2);
    branchGroup.add(new THREE.Mesh(new THREE.TubeGeometry(subCurve2, 18, 0.11, 8, false), this.barkMat));

    // Curved Organic 3D Leaves
    const leafGeo = new THREE.PlaneGeometry(0.85, 0.48, 6, 3);
    const pos = leafGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Realistic parabolic leaf curl
      pos.setZ(i, Math.sin(x * 2.5) * 0.12 - Math.abs(y) * 0.05);
    }
    leafGeo.computeVertexNormals();

    for (let i = 0; i < leafCount; i++) {
      const t = Math.random();
      const pt = curve.getPoint(t);

      const leafMesh = new THREE.Mesh(leafGeo, this.leafMat);
      leafMesh.position.copy(pt);

      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6
      );
      leafMesh.position.add(offset);

      leafMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const s = 0.8 + Math.random() * 0.5;
      leafMesh.scale.set(s, s, s);

      branchGroup.add(leafMesh);
      this.leafMeshes.push({
        mesh: leafMesh,
        initialRot: leafMesh.rotation.clone(),
        speed: 1.2 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        layer: layerIndex
      });
    }

    this.group.add(branchGroup);
  }

  update(time, mouseX, mouseY, scrollProgress) {
    // Natural Wind Dynamics
    for (let i = 0; i < this.leafMeshes.length; i++) {
      const item = this.leafMeshes[i];
      const wind = Math.sin(time * item.speed + item.phase) * 0.07;
      item.mesh.rotation.x = item.initialRot.x + wind;
      item.mesh.rotation.z = item.initialRot.z + wind * 0.6;
    }

    // Camera / Cursor Parallax
    const targetX = mouseX * 0.3;
    const targetY = -mouseY * 0.3;
    this.group.position.x += (targetX - this.group.position.x) * 0.05;
    this.group.position.y += (targetY - this.group.position.y) * 0.05;

    // Organic scroll movement
    this.group.rotation.y = -0.15 + scrollProgress * 0.35;
    this.group.position.z = -scrollProgress * 1.8;
  }

  setVisible(visible) {
    this.group.visible = visible;
  }
}
