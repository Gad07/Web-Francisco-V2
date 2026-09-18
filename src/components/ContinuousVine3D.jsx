import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ContinuousVine3D({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const tubeMeshRef = useRef();

  const { curve, tubeGeo, vineNodes } = useMemo(() => {
    const points = [];
    const totalPoints = 80;
    const heightSpan = 35;

    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const y = 8 - t * heightSpan;
      const angle = t * Math.PI * 6;
      const x = 3.8 + Math.sin(angle) * 1.4 + Math.sin(t * 12) * 0.4;
      const z = 2.0 + Math.cos(angle) * 1.2 - t * 4.0;
      points.push(new THREE.Vector3(x, y, z));
    }

    const c = new THREE.CatmullRomCurve3(points);
    const geo = new THREE.TubeGeometry(c, 300, 0.08, 8, false);

    const nodes = [];
    const nodeCount = 40;
    for (let i = 0; i < nodeCount; i++) {
      const t = i / nodeCount;
      const pt = c.getPoint(t);
      const tangent = c.getTangent(t);
      nodes.push({
        pos: [pt.x, pt.y, pt.z],
        tangent,
        threshold: t,
        baseScale: 0.8 + Math.random() * 0.5,
      });
    }

    return { curve: c, tubeGeo: geo, vineNodes: nodes };
  }, []);

  const vineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x247a46,
      emissive: 0x0f401f,
      emissiveIntensity: 0.35,
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  const leafMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    });
  }, []);

  const leafGeo = useMemo(() => new THREE.PlaneGeometry(0.35, 0.2), []);

  const leavesRef = useRef();

  useFrame(() => {
    const clamped = Math.max(0, Math.min(1, scrollProgress * 1.25));
    
    if (tubeMeshRef.current) {
      const totalIndices = 300 * 8 * 6;
      const visibleCount = Math.floor(clamped * totalIndices);
      tubeGeo.setDrawRange(0, visibleCount);
    }

    if (leavesRef.current) {
      const dummy = new THREE.Object3D();
      vineNodes.forEach((node, i) => {
        const isVisible = clamped >= node.threshold;
        const growth = isVisible ? Math.min(1, (clamped - node.threshold) * 6) : 0;
        const s = node.baseScale * growth;

        if (s > 0) {
          dummy.position.set(...node.pos);
          dummy.scale.set(s, s, s);
          dummy.lookAt(
            node.pos[0] + node.tangent.x,
            node.pos[1] + node.tangent.y,
            node.pos[2] + node.tangent.z
          );
          dummy.updateMatrix();
          leavesRef.current.setMatrixAt(i, dummy.matrix);
        } else {
          // Hide by scaling to 0
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          leavesRef.current.setMatrixAt(i, dummy.matrix);
        }
      });
      leavesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={tubeMeshRef} geometry={tubeGeo} material={vineMat} />
      <instancedMesh ref={leavesRef} args={[leafGeo, leafMat, vineNodes.length]}>
      </instancedMesh>
    </group>
  );
}
