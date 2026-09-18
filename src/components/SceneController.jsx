import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneController({
  scrollProgress = 0,
  isLoaded = false,
  zoomProgress = 0,
}) {
  const { camera, scene } = useThree();
  const smoothZ   = useRef(12);
  const smoothFov = useRef(45);
  const smoothY   = useRef(0);

  useFrame((state, delta) => {
    if (!isLoaded) {
      const targetZ   = 12.0 - zoomProgress * 3.2;
      const targetFov = 45.0 - zoomProgress * 14.0;

      smoothZ.current   = THREE.MathUtils.damp(smoothZ.current,   targetZ,   8, delta);
      smoothFov.current = THREE.MathUtils.damp(smoothFov.current, targetFov, 8, delta);

      camera.position.set(0, 0, smoothZ.current);
      camera.fov = smoothFov.current;
      camera.updateProjectionMatrix();
      camera.rotation.set(0, 0, 0);

      scene.background = new THREE.Color('#ffffff');
      if (scene.fog) scene.fog.density = 0;
      return;
    }

    // Post-load
    smoothFov.current = THREE.MathUtils.damp(smoothFov.current, 45, 5, delta);
    camera.fov = smoothFov.current;
    camera.updateProjectionMatrix();

    let tY = 0, tZ = 10, fogD = 0.01;
    const bg  = new THREE.Color();
    const fog = new THREE.Color();

    if (scrollProgress < 0.3) {
      bg.setHex(0xffffff); fog.setHex(0xffffff);
    } else if (scrollProgress < 0.5) {
      const t = (scrollProgress - 0.3) / 0.2;
      bg.set('#ffffff').lerp(new THREE.Color('#010503'), t); fog.copy(bg);
      tY = -t * 5; tZ = 10 - t * 2; fogD = 0.01 + t * 0.02;
    } else {
      bg.setHex(0x010503); fog.setHex(0x010503);
      const t = (scrollProgress - 0.5) / 0.5;
      tY = -5 - t * 15; tZ = 8; fogD = 0.03;
    }

    scene.background = bg;
    if (scene.fog) { scene.fog.color.copy(fog); scene.fog.density = fogD; }

    smoothY.current = THREE.MathUtils.damp(smoothY.current, tY, 5, delta);
    smoothZ.current = THREE.MathUtils.damp(smoothZ.current, tZ, 5, delta);
    camera.position.set(0, smoothY.current, smoothZ.current);
    camera.rotation.set(0, 0, 0);
  });

  const isLoader = !isLoaded;
  const isHero   = isLoaded && scrollProgress < 0.3;

  return (
    <>
      {/* Strong ambient — ilumina uniformemente la cara visible, evita planeta negro */}
      <ambientLight
        intensity={isLoader ? 1.8 : isHero ? 1.6 : 0.3}
        color="#ffffff"
      />

      {/* Sol principal — posición casi FRONTAL ligeramente desplazado arriba-derecha */}
      {/* Frontal garantiza que la cara que mira la cámara sea la más iluminada */}
      <directionalLight
        position={[4, 3, 10]}
        intensity={isLoader ? 2.2 : isHero ? 2.2 : 1.2}
        color="#fffaf2"
        castShadow
      />

      {/* Relleno izquierdo — añade profundidad y detalle a los continentes */}
      <directionalLight
        position={[-6, 2, 6]}
        intensity={isLoader ? 0.8 : 0.5}
        color="#cce8ff"
      />

      {/* Luz de borde / terminador — silueta sutil del globo */}
      <directionalLight
        position={[-2, -4, -8]}
        intensity={isLoader ? 0.3 : 0.2}
        color="#55cfff"
      />

      {/* Punto océano para secciones oscuras de scroll */}
      <pointLight position={[0, -22, 5]} intensity={2.0} distance={38} color="#0ea5e9" />

      <fogExp2 attach="fog" args={[0x000000, 0]} />
    </>
  );
}
