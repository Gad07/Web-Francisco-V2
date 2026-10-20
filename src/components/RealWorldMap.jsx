import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

// Encuadre continental que abarca América del Norte, Central, Sur y Europa sin zoom
const CONTINENTS_BOUNDS = [
  [-6.0, -125.0], // Suroeste: América del Sur / Colombia / Costa Rica / Pacífico
  [64.0, 20.0],   // Noreste: Canadá / España / Europa
];

export const DEFAULT_SEDES = [
  {
    id: 'mexico',
    num: '01',
    country: { es: 'México', en: 'Mexico' },
    city: { es: 'Ciudad de México', en: 'Mexico City' },
    sedeType: { es: 'Sede Central Global & Presidencia', en: 'Global Headquarters & Presidency' },
    code: 'MX',
    flag: '🇲🇽',
    lat: 23.6345,
    lon: -102.5528,
    status: { es: 'Sede Principal de Gobierno', en: 'Principal Government HQ' },
    email: 'info@consejoglobalambiental.com',
  },
  {
    id: 'canada',
    num: '02',
    country: { es: 'Canadá', en: 'Canada' },
    city: { es: 'Ottawa / Toronto', en: 'Ottawa / Toronto' },
    sedeType: { es: 'Council for Green Action — Canada', en: 'Council for Green Action — Canada' },
    code: 'CA',
    flag: '🇨🇦',
    lat: 56.1304,
    lon: -106.3468,
    status: { es: 'Agenda de Cooperación e Intercambio', en: 'Cooperation & Exchange Agenda' },
    email: 'info@councilforgreenaction.com',
  },
  {
    id: 'colombia',
    num: '03',
    country: { es: 'Colombia', en: 'Colombia' },
    city: { es: 'Bogotá D.C.', en: 'Bogota D.C.' },
    sedeType: { es: 'Vinculación Académica & Cooperación Técnica', en: 'Academic Liaison & Technical Cooperation' },
    code: 'CO',
    flag: '🇨🇴',
    lat: 4.5709,
    lon: -74.2973,
    status: { es: 'Intercambio de Conocimiento', en: 'Knowledge Exchange' },
    email: 'alianzas@consejoglobalambiental.com',
  },
  {
    id: 'costarica',
    num: '04',
    country: { es: 'Costa Rica', en: 'Costa Rica' },
    city: { es: 'San José', en: 'San Jose' },
    sedeType: { es: 'Proyección Internacional', en: 'International Projection' },
    code: 'CR',
    flag: '🇨🇷',
    lat: 9.7489,
    lon: -83.7534,
    status: { es: 'Exploración de Mecanismos de Cooperación', en: 'Exploration of Cooperation Mechanisms' },
    email: 'alianzas@consejoglobalambiental.com',
  },
  {
    id: 'espana',
    num: '05',
    country: { es: 'España', en: 'Spain' },
    city: { es: 'Madrid', en: 'Madrid' },
    sedeType: { es: 'Proyección Internacional', en: 'International Projection' },
    code: 'ES',
    flag: '🇪🇸',
    lat: 40.4637,
    lon: -3.7492,
    status: { es: 'Interlocución Institucional', en: 'Institutional Dialogue' },
    email: 'alianzas@consejoglobalambiental.com',
  },
];

export default function RealWorldMap({
  sedes,
  activeSedeId,
  onSelectSede,
  activeCountry,
  onSelectCountry,
  showSpecies = false,
  speciesKey = 0,
  isCompact = false,
}) {
  const currentSedes = sedes && Array.isArray(sedes) && sedes.length > 0 ? sedes : DEFAULT_SEDES;
  const currentActiveId = activeSedeId || activeCountry || currentSedes[0]?.id || 'mexico';
  const handleSelect = (id) => {
    if (onSelectSede) onSelectSede(id);
    if (onSelectCountry) onSelectCountry(id);
  };

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [currentLayerKey, setCurrentLayerKey] = useState('satellite');

  // Inicialización de Leaflet 100% Real
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialSede = currentSedes.find((s) => s.id === currentActiveId) || currentSedes[0];

    // Crear mapa enfocado en los continentes sin zoom
    const map = L.map(mapContainerRef.current, {
      center: [28.0, -52.0],
      zoom: 2,
      minZoom: 1.5,
      maxZoom: 4.5,
      zoomSnap: 0.1,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    // Añadir capa base
    const tileLayer = L.tileLayer(TILE_LAYERS[currentLayerKey].url, {
      maxZoom: TILE_LAYERS[currentLayerKey].maxZoom,
      subdomains: 'abcd',
    }).addTo(map);

    // Ajustar encuadre continental que enfoca América y Europa
    map.fitBounds(CONTINENTS_BOUNDS, {
      padding: [20, 20],
      animate: false,
    });

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

    // Limpiar marcadores previos
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    // 2. Crear Marcadores de Sede con HTML personalizado de lujo
    currentSedes.forEach((sede) => {
      const isSelected = currentActiveId === sede.id;

      const size = isSelected ? 46 : 36;
      const flagUrl = `https://flagcdn.com/w80/${sede.code.toLowerCase()}.png`;

      const customIcon = L.divIcon({
        className: 'custom-sede-pin',
        html: `
          <div style="position:relative;width:${size}px;height:${size}px;cursor:pointer;">
            ${isSelected ? `<div class="animate-ping" style="position:absolute;inset:-4px;border-radius:9999px;background:rgba(255,255,255,0.45);"></div>` : ''}
            <div style="position:relative;width:100%;height:100%;border-radius:9999px;overflow:hidden;border:${isSelected ? '3px solid #ffffff' : '2px solid rgba(255,255,255,0.85)'};box-shadow:${isSelected ? '0 0 0 3px #4a5a22, 0 8px 24px rgba(0,0,0,0.55)' : '0 4px 14px rgba(0,0,0,0.45)'};transition:all .3s;">
              <img src="${flagUrl}" alt="${sede.country?.es || sede.country || ''}" style="width:100%;height:100%;object-fit:cover;display:block;" />
            </div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([sede.lat, sede.lon], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        handleSelect(sede.id);
      });

      markersRef.current[sede.id] = marker;
    });
  }, [currentSedes, currentActiveId, currentLayerKey]);

  // Mantener el encuadre continental enfocado cuando cambia la vista compacta
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const { map } = mapInstanceRef.current;

    const timer = setTimeout(() => {
      map.invalidateSize({ pan: false });
      map.fitBounds(CONTINENTS_BOUNDS, {
        padding: [20, 20],
        animate: true,
        duration: 0.5,
      });
    }, 60);

    return () => clearTimeout(timer);
  }, [isCompact]);

  // Actualizar tamaño de Leaflet cuando el contenedor cambie de dimensión manteniendo el encuadre continental
  useEffect(() => {
    if (!mapContainerRef.current || !mapInstanceRef.current) return;
    const { map } = mapInstanceRef.current;

    let resizeTimer;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        map.invalidateSize({ pan: false });
        map.fitBounds(CONTINENTS_BOUNDS, {
          padding: [20, 20],
          animate: false,
        });
      }, 120);
    });

    resizeObserver.observe(mapContainerRef.current);
    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#d8ceb6] bg-[#0c120b] shadow-2xl">
      {/* Contenedor del Mapa Leaflet + Overlay de Biodiversidad en Bordes */}
      <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[660px] overflow-hidden">
        {/* Mapa Leaflet Base */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

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
