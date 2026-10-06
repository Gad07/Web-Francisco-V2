import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

// Conversión Lat/Lon a Vector3 3D
export function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generador de curva de arco parabólico
function createArcCurve(p1, p2, radius, height = 0.35) {
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(radius + height + (p1.distanceTo(p2) * 0.12));
  return new THREE.QuadraticBezierCurve3(p1, mid, p2);
}

// Componente para arcos de cooperación internacional
function ConnectionArc({ fromPos, toPos, radius, active }) {
  const curve = useMemo(() => createArcCurve(fromPos, toPos, radius), [fromPos, toPos, radius]);
  const points = useMemo(() => curve.getPoints(40), [curve]);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={active ? '#cde48e' : '#5a6b2a'}
        transparent
        opacity={active ? 0.95 : 0.35}
        linewidth={active ? 2 : 1}
      />
    </line>
  );
}

// Pin marcador 3D en la superficie del globo
function CountryPin({ country, radius, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => latLonToVector3(country.lat, country.lon, radius * 1.018), [country.lat, country.lon, radius]);
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
    }
  });

  return (
    <group
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(country.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Esfera central del marcador */}
      <mesh>
        <sphereGeometry args={[isSelected ? 0.08 : 0.055, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : '#d4e899'}
          emissive={isSelected ? '#a3e635' : '#4a5a22'}
          emissiveIntensity={isSelected ? 3.5 : 1.8}
        />
      </mesh>

      {/* Anillo de pulso exterior */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[isSelected ? 0.11 : 0.07, isSelected ? 0.15 : 0.10, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#cde48e' : '#8fa84f'}
          transparent
          opacity={isSelected ? 0.85 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Etiqueta HTML flotante */}
      <Html
        position={[0, isSelected ? 0.22 : 0.16, 0]}
        center
        distanceFactor={6.5}
        className="pointer-events-none select-none transition-transform duration-300"
      >
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans transition-all duration-300 backdrop-blur-md shadow-lg ${
            isSelected
              ? 'bg-[#2d2618]/95 text-[#f5efe3] border border-[#a3e635] scale-110 font-semibold ring-2 ring-[#a3e635]/30'
              : hovered
              ? 'bg-black/80 text-white border border-white/40 scale-105'
              : 'bg-black/60 text-slate-300 border border-white/20'
          }`}
        >
          <span className="text-sm">{country.flag}</span>
          <span className="tracking-wide">{country.code}</span>
        </div>
      </Html>
    </group>
  );
}

// Contenido interno del Globo
function GlobeInner({ countries, activeCountryId, onSelectCountry }) {
  const globeGroupRef = useRef();
  const controlsRef = useRef();
  const radius = 2.4;

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  colorMap.colorSpace = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;

  const activeCountry = useMemo(
    () => countries.find((c) => c.id === activeCountryId) || countries[0],
    [countries, activeCountryId]
  );

  const mexicoNode = useMemo(() => countries.find((c) => c.id === 'mexico') || countries[0], [countries]);
  const mexicoPos = useMemo(() => latLonToVector3(mexicoNode.lat, mexicoNode.lon, radius), [mexicoNode, radius]);

  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!activeCountry) return;
    const targetY = -((activeCountry.lon + 90) * Math.PI) / 180;
    const targetX = (activeCountry.lat * Math.PI) / 180 * 0.45;
    targetRotation.current = { x: targetX, y: targetY };
  }, [activeCountry]);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      // Suavizado elegante hacia la posición del país seleccionado
      globeGroupRef.current.rotation.y += (targetRotation.current.y - globeGroupRef.current.rotation.y) * 0.045;
      globeGroupRef.current.rotation.x += (targetRotation.current.x - globeGroupRef.current.rotation.x) * 0.045;
    }
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />

      <group ref={globeGroupRef} position={[0, 0, 0]}>
        {/* Esfera Terrestre */}
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.85, 0.85)}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* Nubes */}
        <mesh>
          <sphereGeometry args={[radius * 1.015, 64, 64]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.4}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Atmósfera Glow */}
        <mesh>
          <sphereGeometry args={[radius * 1.045, 32, 32]} />
          <meshBasicMaterial
            color="#5a6b2a"
            transparent
            opacity={0.16}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Pines 3D */}
        {countries.map((country) => (
          <CountryPin
            key={country.id}
            country={country}
            radius={radius}
            isSelected={country.id === activeCountryId}
            onSelect={onSelectCountry}
          />
        ))}

        {/* Arcos de Conexión */}
        {countries
          .filter((c) => c.id !== 'mexico')
          .map((country) => {
            const countryPos = latLonToVector3(country.lat, country.lon, radius);
            const isArcActive = country.id === activeCountryId || activeCountryId === 'mexico';
            return (
              <ConnectionArc
                key={`arc-${country.id}`}
                fromPos={mexicoPos}
                toPos={countryPos}
                radius={radius}
                active={isArcActive}
              />
            );
          })}
      </group>
    </>
  );
}

// Componente Exportado
export default function InteractiveGlobe3D({ countries, activeCountryId, onSelectCountry }) {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] relative">
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 4, 5]} intensity={2.4} color="#fffcf2" />
        <directionalLight position={[-6, -2, -4]} intensity={0.7} color="#d4e899" />
        <pointLight position={[0, 8, 0]} intensity={0.6} />

        <React.Suspense fallback={null}>
          <GlobeInner
            countries={countries}
            activeCountryId={activeCountryId}
            onSelectCountry={onSelectCountry}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
