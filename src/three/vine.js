import * as THREE from 'three';

export class ContinuousVineScene {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Create 3D Spiral Vine Path curving vertically down the viewport
    const points = [];
    const totalPoints = 80;
    const heightSpan = 35; // Extends across the vertical journey

    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const y = 8 - t * heightSpan;
      const angle = t * Math.PI * 6;
      // Winding motion along the right side of the screen
      const x = 3.8 + Math.sin(angle) * 1.4 + Math.sin(t * 12) * 0.4;
      const z = 2.0 + Math.cos(angle) * 1.2 - t * 4.0;
      points.push(new THREE.Vector3(x, y, z));
    }

    this.curve = new THREE.CatmullRomCurve3(points);
    this.tubeSegments = 300;

    // Vine Stem Geometry
    this.tubeGeo = new THREE.TubeGeometry(this.curve, this.tubeSegments, 0.08, 8, false);
    
    // Vine Material with Emerald / Lime Glow
    this.vineMat = new THREE.MeshStandardMaterial({
      color: 0x247a46,
      emissive: 0x124724,
      emissiveIntensity: 0.4,
      roughness: 0.6,
      metalness: 0.1,
    });

    this.vineMesh = new THREE.Mesh(this.tubeGeo, this.vineMat);
    this.group.add(this.vineMesh);

    // Spores / Little Glowing Leaves along the Vine
    this.vineNodes = [];
    const leafGeo = new THREE.PlaneGeometry(0.35, 0.2);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x5eead4,
      emissive: 0x34d399,
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide,
    });

    const nodeCount = 45;
    for (let i = 0; i < nodeCount; i++) {
      const t = i / nodeCount;
      const pt = this.curve.getPoint(t);
      const tangent = this.curve.getTangent(t);

      const leaf = new THREE.Mesh(leafGeo, nodeMat);
      leaf.position.copy(pt);
      leaf.lookAt(pt.clone().add(tangent));
      leaf.rotation.z += Math.random() * Math.PI;

      this.group.add(leaf);
      this.vineNodes.push({
        mesh: leaf,
        threshold: t,
        baseScale: 0.8 + Math.random() * 0.6,
      });
    }

    this.setScrollProgress(0);
  }

  setScrollProgress(progress) {
    // Controls how much of the vine has grown based on scroll (0.0 to 1.0)
    // progress is clamped
    const clamped = Math.max(0, Math.min(1, progress * 1.2));
    
    // Calculate draw range for tube geometry
    const totalIndices = this.tubeSegments * 8 * 6; // 8 radial segments * 6 indices per quad
    const visibleCount = Math.floor(clamped * totalIndices);
    this.tubeGeo.setDrawRange(0, visibleCount);

    // Reveal leaves / spores that have been reached by the growth tip
    for (let i = 0; i < this.vineNodes.length; i++) {
      const node = this.vineNodes[i];
      if (clamped >= node.threshold) {
        const growth = Math.min(1, (clamped - node.threshold) * 6);
        const s = node.baseScale * growth;
        node.mesh.scale.set(s, s, s);
        node.mesh.visible = true;
      } else {
        node.mesh.visible = false;
      }
    }
  }

  update(time) {
    // Subtle organic pulsing on glowing spores
    for (let i = 0; i < this.vineNodes.length; i++) {
      const node = this.vineNodes[i];
      if (node.mesh.visible) {
        const pulse = 0.8 + Math.sin(time * 3 + i) * 0.2;
        node.mesh.material.emissiveIntensity = 0.6 * pulse;
      }
    }
  }

  setVisible(visible) {
    this.group.visible = visible;
  }
}
