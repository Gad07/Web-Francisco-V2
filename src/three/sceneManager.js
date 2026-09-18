import * as THREE from 'three';
import { EarthScene } from './earth.js';
import { BranchesScene } from './branches.js';
import { ContinuousVineScene } from './vine.js';
import { OceanScene } from './ocean.js';

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.time = 0;
    this.scrollProgress = 0;
    this.zoomProgress = 0;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isLoaded = false;

    // 1. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 2. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030806, 0.025);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);
    this.camera.position.set(0, 0, 12); // Orbit vantage position

    // 3. Lighting Setup
    this.setupLights();

    // 4. Instantiate 3D Sub-Scenes
    this.earthScene = new EarthScene(this.scene);
    this.branchesScene = new BranchesScene(this.scene);
    this.vineScene = new ContinuousVineScene(this.scene);
    this.oceanScene = new OceanScene(this.scene);

    // Initial visibility
    this.branchesScene.group.position.set(0, -10, 0); // hidden initially until zoom
    this.branchesScene.group.visible = false;

    // 5. Event Listeners
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  setupLights() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(this.ambientLight);

    // Key Sunlight
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    this.sunLight.position.set(10, 6, 8);
    this.scene.add(this.sunLight);

    // Emerald Rim Light
    this.rimLight = new THREE.DirectionalLight(0x34d399, 1.4);
    this.rimLight.position.set(-8, -4, -4);
    this.scene.add(this.rimLight);

    // Cyan Ocean Depth Light
    this.oceanLight = new THREE.PointLight(0x38bdf8, 2.0, 30);
    this.oceanLight.position.set(0, -20, 5);
    this.scene.add(this.oceanLight);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  setZoomProgress(progress) {
    // 0 = Full space view of Earth, 1 = Zoomed into Hero
    this.zoomProgress = progress;
    this.earthScene.setZoomProgress(progress);

    if (progress > 0.05) {
      this.branchesScene.group.visible = true;
      // Fade in & slide branches into view
      const t = Math.min(1, (progress - 0.05) * 1.5);
      this.branchesScene.group.position.y = -4 + t * 4;
      this.earthScene.group.position.set(-t * 3.5, t * 1.0, -t * 4.0); // push earth to left-back
    } else {
      this.branchesScene.group.visible = false;
      this.earthScene.group.position.set(0, 0, 0);
    }
  }

  setScrollProgress(progress) {
    // Global Scroll Progress (0.0 to 1.0 across entire site)
    this.scrollProgress = progress;
    this.vineScene.setScrollProgress(progress);

    // Dynamic Camera Tracking based on Chapters
    if (this.isLoaded) {
      // Progress map:
      // 0.0 - 0.25: Hero (Y=0, Z=9)
      // 0.25 - 0.50: Interdependencia (Y=-6, Z=8)
      // 0.50 - 0.70: Macro Portal (Z plunges into leaf/rock, fog shifts)
      // 0.70 - 1.00: Ocean Abyss (Y=-22, Z=8, water fog)

      if (progress < 0.50) {
        // Terrestrial stage
        const t = progress / 0.50;
        this.camera.position.y = -t * 8;
        this.camera.position.z = 9 - t * 1.5;
        this.scene.fog.color.setHex(0x030806);
        this.scene.fog.density = 0.025;
      } else if (progress < 0.70) {
        // Portal transition stage
        const t = (progress - 0.50) / 0.20;
        this.camera.position.y = -8 - t * 8;
        this.camera.position.z = 7.5 - t * 3.5; // Zoom in macro
        // Fog color shift towards cyan/ocean
        const fogColor = new THREE.Color(0x030806).lerp(new THREE.Color(0x011327), t);
        this.scene.fog.color.copy(fogColor);
        this.scene.fog.density = 0.035 + t * 0.02;
      } else {
        // Ocean Abyss stage
        const t = (progress - 0.70) / 0.30;
        this.camera.position.y = -16 - t * 6;
        this.camera.position.z = 6.0 + Math.sin(t * Math.PI) * 2;
        this.scene.fog.color.setHex(0x011022);
        this.scene.fog.density = 0.04;
      }
    }
  }

  render() {
    this.time += 0.016;

    // Smooth Mouse Interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Update Sub-Scenes
    this.earthScene.update(this.time, this.scrollProgress);
    this.branchesScene.update(this.time, this.mouse.x, this.mouse.y, this.scrollProgress);
    this.vineScene.update(this.time);
    this.oceanScene.update(this.time);

    // Subtle camera breathing
    this.camera.rotation.z = this.mouse.x * 0.02;
    this.camera.rotation.x = -this.mouse.y * 0.02;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  start() {
    this.render();
  }
}
