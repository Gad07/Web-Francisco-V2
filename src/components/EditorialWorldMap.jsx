import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Proyección de coordenadas geográficas a coordenadas SVG (1000x500)
export function latLonToXY(lat, lon, width = 1000, height = 500) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

export default function EditorialWorldMap({ sedes, activeSedeId, onSelectSede, onOpenImmersion }) {
  const [hoveredSedeId, setHoveredSedeId] = useState(null);

  // Nodo Central México
  const mexicoPos = latLonToXY(23.6345, -102.5528);

  return (
    <div className="relative w-full rounded-3xl bg-[#eae4d2]/70 border border-[#d8ceb6] p-4 sm:p-8 shadow-sm overflow-hidden select-none">
      {/* Guía superior de interacción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#d8ceb6]/60">
        <div className="flex items-center gap-2.5 text-xs text-[#554a37] font-sans">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4a5a22] animate-pulse" />
          <span className="font-medium tracking-wide uppercase text-[10px] text-[#4a5a22] font-mono">
            Cartografía Editorial de Sedes
          </span>
          <span className="text-[#a89a7a]">&middot;</span>
          <span className="text-[11px] text-[#6b6048]">
            Haz clic en cualquier sede para abrir la experiencia inmersiva
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#7a6e58]">
          <span className="inline-block w-2 h-0.5 bg-[#4a5a22]" />
          <span>Red Multilateral Activa</span>
        </div>
      </div>

      {/* Canvas SVG del Mapa */}
      <div className="relative w-full aspect-[2/1] max-h-[500px]">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(45,38,24,0.04))' }}
        >
          <defs>
            {/* Gradientes orgánicos */}
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ded5be" />
              <stop offset="100%" stopColor="#d5caa9" />
            </linearGradient>

            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a5a22" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8fa84f" stopOpacity="0.3" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Líneas de cuadrícula geográfica (Graticules) */}
          <g className="opacity-30 stroke-[#c5b89a] stroke-[0.5]" strokeDasharray="3 4" fill="none">
            {/* Latitudes */}
            <line x1="0" y1="125" x2="1000" y2="125" /> {/* 45° N */}
            <line x1="0" y1="250" x2="1000" y2="250" strokeDasharray="none" strokeWidth="0.8" className="opacity-60" /> {/* Ecuador */}
            <line x1="0" y1="375" x2="1000" y2="375" /> {/* 45° S */}

            {/* Longitudes */}
            <line x1="250" y1="0" x2="250" y2="500" /> {/* 90° W */}
            <line x1="500" y1="0" x2="500" y2="500" /> {/* 0° Meridiano */}
            <line x1="750" y1="0" x2="750" y2="500" /> {/* 90° E */}
          </g>

          {/* Continentes Vectoriales Detallados */}
          <g fill="url(#landGradient)" stroke="#c2b493" strokeWidth="0.8" strokeLinejoin="round">
            {/* América del Norte */}
            <path d="M 120 70 Q 180 50 260 60 Q 320 80 340 130 Q 310 160 270 170 Q 240 180 230 220 Q 210 240 190 220 Q 150 170 130 130 Z M 160 80 Q 220 70 250 100 Q 210 130 170 110 Z" />
            
            {/* Centroamérica y Caribe */}
            <path d="M 230 220 Q 260 230 285 255 Q 265 260 245 240 Z M 270 230 Q 295 235 285 245 Z" />

            {/* América del Sur */}
            <path d="M 270 260 Q 340 270 380 330 Q 370 400 320 460 Q 290 470 280 430 Q 270 340 265 290 Z" />

            {/* Europa */}
            <path d="M 460 110 Q 520 90 560 120 Q 550 160 500 175 Q 470 170 465 140 Z M 480 140 Q 510 135 500 160 Z" />

            {/* África */}
            <path d="M 460 185 Q 550 180 580 240 Q 590 320 540 400 Q 500 410 470 340 Q 440 260 450 200 Z" />

            {/* Asia */}
            <path d="M 560 90 Q 720 70 880 110 Q 910 180 840 260 Q 760 280 700 240 Q 640 230 580 180 Z" />

            {/* Australia y Oceanía */}
            <path d="M 780 330 Q 860 320 890 370 Q 870 420 800 420 Q 760 380 770 340 Z" />
          </g>

          {/* Arcos de Cooperación Internacional desde México */}
          <g fill="none">
            {sedes.filter(s => s.id !== 'mexico').map((sede) => {
              const target = latLonToXY(sede.lat, sede.lon);
              const isTargetActive = activeSedeId === sede.id || activeSedeId === 'mexico';
              
              // Punto de control para curva cuadrática elevada
              const dx = target.x - mexicoPos.x;
              const dy = target.y - mexicoPos.y;
              const cx = (mexicoPos.x + target.x) / 2 - (dy * 0.3);
              const cy = (mexicoPos.y + target.y) / 2 - Math.abs(dx * 0.25) - 30;

              return (
                <g key={`arc-line-${sede.id}`}>
                  {/* Línea de Arco */}
                  <path
                    d={`M ${mexicoPos.x} ${mexicoPos.y} Q ${cx} ${cy} ${target.x} ${target.y}`}
                    stroke={isTargetActive ? '#4a5a22' : '#a89a7a'}
                    strokeWidth={isTargetActive ? 2 : 1}
                    strokeDasharray={isTargetActive ? 'none' : '4 4'}
                    opacity={isTargetActive ? 0.9 : 0.4}
                    className="transition-all duration-500"
                  />

                  {/* Partícula animada sobre el arco */}
                  {isTargetActive && (
                    <circle r="3" fill="#a3e635" filter="url(#glow)">
                      <animateMotion
                        path={`M ${mexicoPos.x} ${mexicoPos.y} Q ${cx} ${cy} ${target.x} ${target.y}`}
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>

          {/* Marcadores Interactivos de cada Sede */}
          {sedes.map((sede) => {
            const { x, y } = latLonToXY(sede.lat, sede.lon);
            const isSelected = activeSedeId === sede.id;
            const isHovered = hoveredSedeId === sede.id;

            return (
              <g
                key={`marker-${sede.id}`}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => {
                  onSelectSede(sede.id);
                  if (onOpenImmersion) onOpenImmersion(sede.id);
                }}
                onMouseEnter={() => setHoveredSedeId(sede.id)}
                onMouseLeave={() => setHoveredSedeId(null)}
              >
                {/* Ondas expansivas de pulso */}
                <circle
                  r={isSelected ? 14 : 9}
                  fill={isSelected ? '#4a5a22' : '#5a6b2a'}
                  opacity="0.2"
                >
                  <animate
                    attributeName="r"
                    values={isSelected ? "10;22;10" : "6;14;6"}
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Anillo exterior */}
                <circle
                  r={isSelected ? 8 : 5}
                  fill={isSelected ? '#f5efe3' : '#4a5a22'}
                  stroke={isSelected ? '#4a5a22' : '#f5efe3'}
                  strokeWidth="2"
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />

                {/* Punto central */}
                <circle
                  r={isSelected ? 4 : 2.5}
                  fill={isSelected ? '#4a5a22' : '#c8d8a0'}
                />

                {/* Etiqueta Flotante Editorial */}
                <g transform={`translate(0, ${y < 120 ? 20 : -16})`}>
                  <rect
                    x="-42"
                    y="-11"
                    width="84"
                    height="22"
                    rx="11"
                    fill={isSelected ? '#2d2618' : isHovered ? '#3a4a18' : '#eae4d2'}
                    stroke={isSelected ? '#a3e635' : '#c9bb9c'}
                    strokeWidth="1.2"
                    filter="drop-shadow(0 2px 6px rgba(0,0,0,0.15))"
                    className="transition-colors duration-300"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill={isSelected || isHovered ? '#f5efe3' : '#2d2618'}
                    fontSize="9.5"
                    fontFamily="sans-serif"
                    fontWeight={isSelected ? '600' : '500'}
                    letterSpacing="0.04em"
                    className="transition-colors duration-300 pointer-events-none"
                  >
                    {sede.flag} {sede.code}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Botones de acción inferior en el mapa */}
      <div className="mt-6 pt-4 border-t border-[#d8ceb6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {sedes.map((sede) => {
            const isSelected = activeSedeId === sede.id;
            return (
              <button
                key={`btn-map-${sede.id}`}
                type="button"
                onClick={() => {
                  onSelectSede(sede.id);
                  if (onOpenImmersion) onOpenImmersion(sede.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#3a4a18] text-[#f5efe3] border-[#3a4a18] shadow-sm font-medium'
                    : 'bg-[#f5efe3] text-[#554a37] border-[#d8ceb6] hover:border-[#4a5a22]/60'
                }`}
              >
                <span>{sede.flag}</span>
                <span>{sede.code}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onOpenImmersion && onOpenImmersion(activeSedeId)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-98 group cursor-pointer"
        >
          <span>Abrir Inmersión de la Sede</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
