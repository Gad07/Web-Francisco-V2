import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneController({ scrollProgress = 0, mouse = { x: 0, y: 0 }, isLoaded = false, zoomProgress = 0 }) {
  const { camera, scene } = useThree();
  const smoothCam = useRef({ x: 0, y: 0, z: 12 });

  useFrame((state, delta) => {
    // Lock camera rotation strictly steady - NO mouse movement
    camera.rotation.set(0, 0, 0);

    // Loading Phase — Pure White Background
    if (!isLoaded) {
      camera.position.set(0, 0, 12);
      smoothCam.current.z = 12;
      smoothCam.current.y = 0;
      scene.background = new THREE.Color('#ffffff');
      scene.fog.color.setHex(0xffffff);
      scene.fog.density = 0;
      return;
    }

    // Post-load Phase
    let targetY, targetZ;
    let bgColor = new THREE.Color('#ffffff');
    let fogColor = new THREE.Color('#ffffff');
    let fogDensity = 0.01;

    if (scrollProgress < 0.3) {
      // Hero section: Camera is 100% fixed and steady
      targetY = 0;
      targetZ = 10;
      bgColor.setHex(0xffffff);
      fogColor.setHex(0xffffff);
      fogDensity = 0.01;
    } else if (scrollProgress < 0.5) {
      const t = (scrollProgress - 0.3) / 0.2;
      targetY = -t * 5;
      targetZ = 10 - t * 2;
      bgColor = new THREE.Color('#ffffff').lerp(new THREE.Color('#010503'), t);
      fogColor = new THREE.Color('#ffffff').lerp(new THREE.Color('#010503'), t);
      fogDensity = 0.01 + t * 0.02;
    } else {
      const t = (scrollProgress - 0.5) / 0.5;
      targetY = -5 - t * 15;
      targetZ = 8;
      bgColor.setHex(0x010503);
      fogColor.setHex(0x010503);
      fogDensity = 0.03;
    }

    scene.background = bgColor;
    scene.fog.color.copy(fogColor);
    scene.fog.density = fogDensity;

    smoothCam.current.y += (targetY - smoothCam.current.y) * 0.08;
    smoothCam.current.z += (targetZ - smoothCam.current.z) * 0.08;
    camera.position.y = smoothCam.current.y;
    camera.position.z = smoothCam.current.z;
  });

  return (
    <>
      {/* Lights adapt to the environment mode */}
      <ambientLight intensity={!isLoaded ? 0.8 : (scrollProgress < 0.3 ? 1.5 : 0.4)} color="#ffffff" />
      <directionalLight 
        position={[12, 8, 6]} 
        intensity={!isLoaded ? 3.0 : (scrollProgress < 0.3 ? 3.5 : 2.0)} 
        color="#ffffff" 
        castShadow
      />
      <directionalLight position={[-6, -3, -4]} intensity={0.8} color={isLoaded && scrollProgress < 0.3 ? "#ffffff" : "#52b774"} />
      <pointLight position={[0, -22, 5]} intensity={2.5} distance={35} color="#0ea5e9" />
      <fogExp2 attach="fog" args={[0x000000, 0]} />
    </>
  );
}
