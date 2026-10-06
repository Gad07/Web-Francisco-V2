import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapBorderBiodiversity from './MapBorderBiodiversity.jsx';

// Capas de mapas 100% reales sin clave de API ni marcas de agua
const TILE_LAYERS = {
  satellite: {
    name: 'Satélite Fotorrealista',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
  },
  topo: {
    name: 'Topografía & Relieve',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, DeLorme, NAVTEQ',
    maxZoom: 18,
  },
  osm: {
    name: 'Mapa Político & Carreteras',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
};

export default function RealWorldMap({ sedes, activeSedeId, onSelectSede, showSpecies = false, speciesKey = 0, isCompact = false }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const linesRef = useRef([]);
  const [currentLayerKey, setCurrentLayerKey] = useState('satellite');

  // Inicialización de Leaflet 100% Real
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialSede = sedes.find((s) => s.id === activeSedeId) || sedes[0];

    // Crear mapa centrado exactamente en la sede activa en ambas dimensiones
    const map = L.map(mapContainerRef.current, {
      center: [initialSede.lat, initialSede.lon],
      zoom: isCompact ? 3.8 : 4.2,
      minZoom: 1.8,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    // Control de zoom en esquina inferior derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Añadir capa base
    const tileLayer = L.tileLayer(TILE_LAYERS[currentLayerKey].url, {
      maxZoom: TILE_LAYERS[currentLayerKey].maxZoom,
      subdomains: 'abcd',
    }).addTo(map);

    mapInstanceRef.current = { map, tileLayer };

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Cambio de capa (Satelital / Cartográfico / Topográfico)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const { map, tileLayer } = mapInstanceRef.current;
    map.removeLayer(tileLayer);

    const newTileLayer = L.tileLayer(TILE_LAYERS[currentLayerKey].url, {
      maxZoom: TILE_LAYERS[currentLayerKey].maxZoom,
      subdomains: 'abcd',
    }).addTo(map);

    mapInstanceRef.current.tileLayer = newTileLayer;
  }, [currentLayerKey]);

  // Actualización de marcadores y líneas de cooperación
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const { map } = mapInstanceRef.current;

    // Limpiar marcadores y líneas previas
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    linesRef.current.forEach((l) => map.removeLayer(l));
    markersRef.current = {};
    linesRef.current = [];

    const mexicoSede = sedes.find((s) => s.id === 'mexico') || sedes[0];

    // 1. Dibujar líneas geodésicas de cooperación desde México hacia las demás sedes
    sedes
      .filter((s) => s.id !== 'mexico')
      .forEach((sede) => {
        const isActive = activeSedeId === sede.id || activeSedeId === 'mexico';
        
        // Crear curva con puntos intermedios interpolados
        const latlngs = [
          [mexicoSede.lat, mexicoSede.lon],
          [(mexicoSede.lat + sede.lat) / 2 + 3, (mexicoSede.lon + sede.lon) / 2],
          [sede.lat, sede.lon],
        ];

        const polyline = L.polyline(latlngs, {
          color: isActive ? '#4a5a22' : '#8fa84f',
          weight: isActive ? 2.5 : 1.5,
          opacity: isActive ? 0.9 : 0.45,
          dashArray: isActive ? null : '5, 8',
          smoothFactor: 1,
        }).addTo(map);

        linesRef.current.push(polyline);
      });

    // 2. Crear Marcadores de Sede con HTML personalizado de lujo
    sedes.forEach((sede) => {
      const isSelected = activeSedeId === sede.id;

      const size = isSelected ? 46 : 36;
      const flagUrl = `https://flagcdn.com/w80/${sede.code.toLowerCase()}.png`;

      const customIcon = L.divIcon({
        className: 'custom-sede-pin',
        html: `
          <div style="position:relative;width:${size}px;height:${size}px;cursor:pointer;">
            ${isSelected ? `<div class="animate-ping" style="position:absolute;inset:-6px;border-radius:9999px;background:rgba(163,230,53,0.35);"></div>` : ''}
            <div style="position:relative;width:100%;height:100%;border-radius:9999px;overflow:hidden;border:${isSelected ? '3px solid #a3e635' : '2px solid #f5efe3'};box-shadow:0 6px 18px rgba(0,0,0,0.45);transition:all .3s;">
              <img src="${flagUrl}" alt="${sede.country.es}" style="width:100%;height:100%;object-fit:cover;display:block;" />
            </div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([sede.lat, sede.lon], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectSede(sede.id);
      });

      markersRef.current[sede.id] = marker;
    });
  }, [sedes, activeSedeId, currentLayerKey]);

  // Enfocar y auto-centrar perfectamente en ambas dimensiones (X y Y) cuando cambia la sede o el tamaño
  useEffect(() => {
    if (!mapInstanceRef.current || !activeSedeId) return;
    const activeSede = sedes.find((s) => s.id === activeSedeId);
    if (activeSede) {
      const { map } = mapInstanceRef.current;
      const targetZoom = isCompact ? 3.8 : 4.2;
      map.flyTo([activeSede.lat, activeSede.lon], targetZoom, {
        animate: true,
        duration: 1.1,
        easeLinearity: 0.25,
      });
    }
  }, [activeSedeId, sedes, isCompact]);

  // Mantener el país centrado en ambas dimensiones de forma continua durante la transición de ancho
  useEffect(() => {
    if (!mapContainerRef.current || !mapInstanceRef.current) return;
    const { map } = mapInstanceRef.current;

    let rafId;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        map.invalidateSize({ pan: false });
        const s = sedes.find((x) => x.id === activeSedeId);
        if (s) {
          // Centrado matemático exacto en ambas dimensiones (latitud y longitud) en cada frame
          map.panTo([s.lat, s.lon], { animate: false });
        }
      });
    });

    resizeObserver.observe(mapContainerRef.current);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [activeSedeId, sedes]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#d8ceb6] bg-[#0c120b] shadow-2xl">
      {/* Contenedor del Mapa Leaflet + Overlay de Biodiversidad en Bordes */}
      <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[660px] overflow-hidden">
        {/* Mapa Leaflet Base */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Fauna y Flora Emblemática recortada saliendo de los bordes del mapa */}
        <MapBorderBiodiversity activeSedeId={activeSedeId} visible={showSpecies} playKey={speciesKey} />

        {/* Selector sutil de capas en esquina superior derecha */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[25] flex items-center gap-1 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
          {Object.entries(TILE_LAYERS).map(([key, config]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCurrentLayerKey(key)}
              className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all duration-300 cursor-pointer ${
                currentLayerKey === key
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {config.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
