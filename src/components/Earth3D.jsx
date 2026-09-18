import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const atmVS = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vViewPos = -(modelViewMatrix * vec4(position,1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;
const atmFS = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  uniform vec3 atmColor;
  uniform float atmPower;
  void main() {
    float fres = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPos)), 0.0, 1.0), atmPower);
    gl_FragColor = vec4(atmColor, fres * 0.85);
  }
`;

function EarthModel({ zoomProgress, isLoaded }) {
  const earthRef = useRef();
  const cloudRef = useRef();
  const groupRef = useRef();
  const starsRef = useRef();

  // Load high-resolution realistic textures
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  colorMap.colorSpace = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;

  const atmMat = new THREE.ShaderMaterial({
    vertexShader: atmVS,
    fragmentShader: atmFS,
    uniforms: {
      atmColor: { value: new THREE.Color(0x3b82f6) },
      atmPower: { value: 4.5 },
    },
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

  // Star field
  const { starPositions, starColors } = React.useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const warm = Math.random() > 0.88;
      col[i * 3]     = warm ? 1.0 : 0.88 + Math.random() * 0.12;
      col[i * 3 + 1] = warm ? 0.92 : 0.92 + Math.random() * 0.08;
      col[i * 3 + 2] = warm ? 0.72 : 1.0;
    }
    return { starPositions: pos, starColors: col };
  }, []);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.02;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.025;

    if (groupRef.current && !isLoaded) {
      groupRef.current.position.set(0, 0.45, 0);
      groupRef.current.scale.setScalar(1);
      groupRef.current.rotation.x = 0.15;
    }
  });

  // Disappear when fully loaded to show white hero
  if (isLoaded) return null;

  return (
    <group ref={groupRef} rotation={[0, 0, 0.41]}>
      <mesh ref={earthRef} castShadow>
        <sphereGeometry args={[3.4, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new THREE.Color(0x222222)}
          shininess={15}
        />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[3.43, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.85}
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
    <React.Suspense fallback={null}>
      <EarthModel {...props} />
    </React.Suspense>
  );
}
