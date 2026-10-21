import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Rutas locales de máxima velocidad (alojadas directamente en /public/textures/planets/)
const PLANET_TEXTURES = [
  '/textures/planets/earth_atmos_2048.jpg',
  '/textures/planets/earth_normal_2048.jpg',
  '/textures/planets/earth_specular_2048.jpg',
  '/textures/planets/earth_clouds_1024.png',
];

// Pre-carga inmediata de texturas a nivel de módulo
useTexture.preload(PLANET_TEXTURES);

// Easing in-out cúbico
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Fallback visual inmediato para Suspense: el planeta se dibuja en el milisegundo 0
function EarthFallback({ zoomProgress = 0 }) {
  const groupRef = useRef();
  const earthRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.022;
    if (!groupRef.current) return;
    const ez = easeInOutCubic(zoomProgress);
    groupRef.current.scale.setScalar(1.0 + ez * 2.0);
    groupRef.current.position.set(0, 0, 0);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[3.4, 64, 64]} />
        <meshStandardMaterial
          color="#1e4663"
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

function EarthModel({ zoomProgress = 0, isLoaded = false, onReady }) {
  const earthRef = useRef();
  const cloudRef = useRef();
  const groupRef = useRef();

  // Carga de texturas locales
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture(PLANET_TEXTURES);

  colorMap.colorSpace  = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;

  // Notificar inmediatamente que el planeta está 100% listo y visible
  useEffect(() => {
    if (onReady) {
      onReady();
    }
  }, [onReady]);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.022;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.028;

    if (!groupRef.current || isLoaded) return;

    const ez = easeInOutCubic(zoomProgress);

    // Planet centered vertically (y=0 = screen center)
    groupRef.current.scale.setScalar(1.0 + ez * 2.0);
    groupRef.current.rotation.x = 0.10 + ez * 0.18;
    groupRef.current.rotation.z = 0.41 - ez * 0.06;
    groupRef.current.position.set(0, 0, 0);
  });

  if (isLoaded) return null;

  const globalOpacity    = zoomProgress > 0.78 ? Math.max(0, 1.0 - (zoomProgress - 0.78) / 0.22) : 1.0;
  const needsTransparency = globalOpacity < 0.999;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Superficie terrestre — MeshStandardMaterial (PBR real) */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[3.4, 96, 96]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.7, 0.7)}
          roughness={0.82}
          metalness={0.0}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0}
          transparent={needsTransparency}
          opacity={globalOpacity}
        />
      </mesh>

      {/* 2. Capa Volumétrica de Nubes */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[3.445, 96, 96]} />
        <meshStandardMaterial
          map={cloudsMap}
          roughness={1.0}
          metalness={0.0}
          transparent
          opacity={0.90 * globalOpacity}
          blending={THREE.NormalBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function Earth3D(props) {
  return (
    <React.Suspense fallback={<EarthFallback zoomProgress={props.zoomProgress} />}>
      <EarthModel {...props} />
    </React.Suspense>
  );
}
