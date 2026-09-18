import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Easing in-out cúbico
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Shader de Atmósfera Rayleigh ──
const atmVS = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vViewPos  = -(modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmFS = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  uniform vec3  atmColor;
  uniform float atmPower;
  uniform float atmOpacity;
  void main() {
    float rim = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPos)), 0.0, 1.0), atmPower);
    gl_FragColor = vec4(atmColor, rim * atmOpacity);
  }
`;

function EarthModel({ zoomProgress = 0, isLoaded = false }) {
  const earthRef = useRef();
  const cloudRef = useRef();
  const groupRef = useRef();

  // Texturas originales de Three.js (NASA)
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  colorMap.colorSpace  = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;

  const atmMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   atmVS,
    fragmentShader: atmFS,
    uniforms: {
      atmColor:   { value: new THREE.Color(0x5bbfff) },
      atmPower:   { value: 3.2 },
      atmOpacity: { value: 1.0 },
    },
    side:        THREE.BackSide,
    blending:    THREE.AdditiveBlending,
    transparent: true,
    depthWrite:  false,
  }), []);

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

    // Atmósfera: se disuelve en el tramo final
    if (atmMat.uniforms) {
      const fade = zoomProgress > 0.72
        ? Math.max(0, 1.0 - (zoomProgress - 0.72) / 0.28)
        : 1.0;
      atmMat.uniforms.atmOpacity.value = fade;
    }
  });

  if (isLoaded) return null;

  const globalOpacity    = zoomProgress > 0.78 ? Math.max(0, 1.0 - (zoomProgress - 0.78) / 0.22) : 1.0;
  const needsTransparency = globalOpacity < 0.999;

  return (
    <group ref={groupRef} position={[0, 0.45, 0]}>
      {/* 1. Superficie terrestre — MeshStandardMaterial (PBR real) */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[3.4, 96, 96]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.7, 0.7)}
          roughness={0.82}
          metalness={0.0}
          // Sin emissive oscuro — la luz ambiental cumple esa función
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

      {/* 3. Halo Atmosférico Rayleigh */}
      <mesh>
        <sphereGeometry args={[3.62, 64, 64]} />
        <primitive object={atmMat} attach="material" />
      </mesh>
    </group>
  );
}

export default function Earth3D(props) {
  return (
    <React.Suspense fallback={null}>
      <EarthModel {...props} />
    </React.Suspense>
  );
}
