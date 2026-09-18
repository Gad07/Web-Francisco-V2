import * as THREE from 'three';

/**
 * Photorealistic Earth Texture Synthesizer (Natural NASA Blue Marble inspired)
 */
function createPhotorealisticEarthTextures() {
  const width = 2048;
  const height = 1024;

  // 1. Surface Diffuse Texture (Continents, Forests, Deserts, Oceans, Ice Caps)
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Realistic Ocean Base Gradient (Deep abyssal indigo to coastal turquoise)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#04101e');
  oceanGrad.addColorStop(0.3, '#072448');
  oceanGrad.addColorStop(0.5, '#0b3566');
  oceanGrad.addColorStop(0.7, '#072448');
  oceanGrad.addColorStop(1, '#030d18');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Continental Landmass Generator
  function drawRealisticLandmass(cx, cy, rx, ry, baseColor, detailColor) {
    ctx.save();
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    const points = 48;
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const noise = 0.82 + Math.sin(angle * 7 + cx) * 0.12 + Math.cos(angle * 4 + cy) * 0.1 + Math.sin(angle * 13) * 0.05;
      const x = cx + Math.cos(angle) * rx * noise;
      const y = cy + Math.sin(angle) * ry * noise;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // Biome vegetation & mountain interior
    ctx.fillStyle = detailColor;
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const noise = 0.75 + Math.sin(angle * 5 + cx * 2) * 0.14 + Math.cos(angle * 3) * 0.08;
      const x = cx + Math.cos(angle) * (rx * 0.7) * noise;
      const y = cy + Math.sin(angle) * (ry * 0.7) * noise;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Coastal Shallows (Turquoise reef glow)
  ctx.fillStyle = 'rgba(28, 126, 150, 0.4)';
  function drawShallowShelf(cx, cy, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 1.12, ry * 1.12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Continents
  // North America
  drawShallowShelf(width * 0.28, height * 0.35, width * 0.13, height * 0.23);
  drawRealisticLandmass(width * 0.28, height * 0.35, width * 0.12, height * 0.22, '#214d2e', '#3b6e43');
  drawRealisticLandmass(width * 0.24, height * 0.38, width * 0.05, height * 0.10, '#665c3b', '#47422b'); // Rockies/Arid

  // South America & Amazon
  drawShallowShelf(width * 0.33, height * 0.70, width * 0.10, height * 0.26);
  drawRealisticLandmass(width * 0.33, height * 0.70, width * 0.09, height * 0.25, '#124724', '#1f6636'); // Amazon Basin

  // Eurasia
  drawShallowShelf(width * 0.60, height * 0.30, width * 0.24, height * 0.20);
  drawRealisticLandmass(width * 0.60, height * 0.30, width * 0.22, height * 0.18, '#264d2d', '#3d7045');
  drawRealisticLandmass(width * 0.52, height * 0.28, width * 0.07, height * 0.10, '#356338', '#4b8250'); // Europe

  // Africa
  drawShallowShelf(width * 0.54, height * 0.58, width * 0.12, height * 0.25);
  drawRealisticLandmass(width * 0.54, height * 0.58, width * 0.11, height * 0.24, '#54502d', '#70683a'); // Savannah
  drawRealisticLandmass(width * 0.53, height * 0.44, width * 0.10, height * 0.08, '#8a7e4b', '#a3975d'); // Sahara
  drawRealisticLandmass(width * 0.55, height * 0.65, width * 0.08, height * 0.12, '#184724', '#266336'); // Congo

  // Asia & Oceania
  drawShallowShelf(width * 0.75, height * 0.38, width * 0.15, height * 0.18);
  drawRealisticLandmass(width * 0.75, height * 0.38, width * 0.14, height * 0.16, '#2a5431', '#417a4a');
  drawRealisticLandmass(width * 0.68, height * 0.48, width * 0.07, height * 0.10, '#356338', '#4b8250'); // India
  drawRealisticLandmass(width * 0.82, height * 0.72, width * 0.09, height * 0.15, '#786840', '#94804d'); // Australia
  drawRealisticLandmass(width * 0.78, height * 0.60, width * 0.06, height * 0.08, '#1b542b', '#2e7a41'); // Indonesia

  // Polar Ice Caps (Realistic soft textured white)
  const polarGradNorth = ctx.createLinearGradient(0, 0, 0, height * 0.14);
  polarGradNorth.addColorStop(0, '#ffffff');
  polarGradNorth.addColorStop(0.7, '#e8f4fc');
  polarGradNorth.addColorStop(1, 'rgba(232, 244, 252, 0)');
  ctx.fillStyle = polarGradNorth;
  ctx.fillRect(0, 0, width, height * 0.14);

  const polarGradSouth = ctx.createLinearGradient(0, height * 0.86, 0, height);
  polarGradSouth.addColorStop(0, 'rgba(232, 244, 252, 0)');
  polarGradSouth.addColorStop(0.3, '#e8f4fc');
  polarGradSouth.addColorStop(1, '#ffffff');
  ctx.fillStyle = polarGradSouth;
  ctx.fillRect(0, height * 0.86, width, height * 0.14);

  const surfaceTexture = new THREE.CanvasTexture(canvas);
  surfaceTexture.wrapS = THREE.RepeatWrapping;

  // 2. Normal & Bump Texture
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 1024;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext('2d');
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 1024, 512);

  // Elevation relief
  bCtx.fillStyle = '#b0b0b0';
  bCtx.fillRect(1024 * 0.24, 512 * 0.25, 45, 130);
  bCtx.fillRect(1024 * 0.30, 512 * 0.55, 35, 170);
  bCtx.fillRect(1024 * 0.64, 512 * 0.34, 130, 45);

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

  // 3. Specular Water Map (Oceans reflect sunlight, land is matte)
  const specCanvas = document.createElement('canvas');
  specCanvas.width = 1024;
  specCanvas.height = 512;
  const sCtx = specCanvas.getContext('2d');
  sCtx.fillStyle = '#ffffff'; // Oceans reflect brightly
  sCtx.fillRect(0, 0, 1024, 512);

  // Mask out landmasses so land doesn't have ocean gloss
  sCtx.fillStyle = '#101010';
  sCtx.fillRect(1024 * 0.20, 512 * 0.20, 1024 * 0.20, 512 * 0.70); // Americas
  sCtx.fillRect(1024 * 0.45, 512 * 0.15, 1024 * 0.45, 512 * 0.75); // Afro-Eurasia

  const specularTexture = new THREE.CanvasTexture(specCanvas);

  // 4. Photorealistic Cloud Map
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 2048;
  cloudCanvas.height = 1024;
  const cCtx = cloudCanvas.getContext('2d');
  cCtx.clearRect(0, 0, 2048, 1024);

  // Atmospheric cloud bands & organic formations
  for (let i = 0; i < 500; i++) {
    const cx = (Math.sin(i * 17.3) * 0.5 + 0.5) * 2048;
    const cy = (Math.cos(i * 9.1) * 0.5 + 0.5) * 1024;
    const r = 20 + (i % 12) * 15;
    const alpha = 0.2 + (i % 6) * 0.12;

    const g = cCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    g.addColorStop(0.7, `rgba(250, 253, 255, ${alpha * 0.4})`);
    g.addColorStop(1, 'rgba(255, 255, 255, 0)');

    cCtx.fillStyle = g;
    cCtx.beginPath();
    cCtx.arc(cx, cy, r, 0, Math.PI * 2);
    cCtx.fill();
  }

  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
  cloudTexture.wrapS = THREE.RepeatWrapping;

  return { surfaceTexture, bumpTexture, specularTexture, cloudTexture };
}

/**
 * Natural Rayleigh Atmospheric Glow Shader
 */
const RealisticAtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 glowColor;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float intensity = pow(1.0 - dot(vNormal, viewDir), 2.8);
      gl_FragColor = vec4(glowColor, intensity * 0.75);
    }
  `
};

export class EarthScene {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    const { surfaceTexture, bumpTexture, specularTexture, cloudTexture } = createPhotorealisticEarthTextures();

    // 1. Earth Sphere Mesh
    const earthGeo = new THREE.SphereGeometry(3.5, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: surfaceTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.08,
      roughness: 0.6,
      metalness: 0.1,
      roughnessMap: specularTexture,
    });
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.group.add(this.earthMesh);

    // 2. Volumetric Cloud Sphere
    const cloudGeo = new THREE.SphereGeometry(3.55, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      roughness: 1.0,
    });
    this.cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    this.group.add(this.cloudMesh);

    // 3. Atmosphere Rayleigh Glow
    const atmosphereGeo = new THREE.SphereGeometry(3.82, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: RealisticAtmosphereShader.vertexShader,
      fragmentShader: RealisticAtmosphereShader.fragmentShader,
      uniforms: {
        glowColor: { value: new THREE.Color(0x60a5fa) } // Natural oceanic sky blue
      },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    this.atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    this.group.add(this.atmosphereMesh);

    // 4. Subtle Cosmos Star Background
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 30 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.5,
    });
    this.stars = new THREE.Points(starGeo, starMat);
    this.scene.add(this.stars);

    // Axial Tilt
    this.group.rotation.z = 0.35;
    this.group.position.set(0, 0, 0);
  }

  update(time, scrollProgress) {
    this.earthMesh.rotation.y = time * 0.05;
    this.cloudMesh.rotation.y = time * 0.065;
    this.stars.rotation.y = time * 0.003;

    // Scroll reactivity
    this.group.rotation.x = 0.15 + scrollProgress * 0.7;
  }

  setZoomProgress(progress) {
    const scale = 1 + progress * 2.8;
    this.group.scale.set(scale, scale, scale);
  }

  setVisible(visible) {
    this.group.visible = visible;
  }
}
