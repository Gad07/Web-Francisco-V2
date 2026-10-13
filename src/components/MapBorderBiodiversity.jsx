import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/index.jsx';

// Datos de Fauna y Flora Emblemática con PNGs transparentes (sin fondo) que emergen de los bordes del mapa
const BORDER_SPECIES_DATA = {
  mexico: {
    country: { es: 'México', en: 'Mexico' },
    flag: '🇲🇽',
    items: [
      {
        id: 'mx-aguila',
        name: { es: 'Águila Real', en: 'Golden Eagle' },
        scientificName: 'Aquila chrysaetos',
        type: 'fauna',
        badge: { es: '🦅 Símbolo Patrio', en: '🦅 National Symbol' },
        role: { es: 'Guardián trófico y apex depredador de serranías mexicanas', en: 'Trophic guardian & apex predator of Mexican highlands' },
        position: 'top-right',
        img: '/images/fauna/aguila_real.png',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-32 sm:w-44 md:w-52',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'mx-ajolote',
        name: { es: 'Ajolote de Xochimilco', en: 'Xochimilco Axolotl' },
        scientificName: 'Ambystoma mexicanum',
        type: 'fauna',
        badge: { es: '🐾 Peligro Crítico (CR)', en: '🐾 Critically Endangered (CR)' },
        role: { es: 'Bioindicador lacustre y joya evolutiva de regeneración celular', en: 'Lacustrine bioindicator & evolutionary cellular regeneration jewel' },
        position: 'bottom-left',
        img: 'https://png.pngtree.com/png-vector/20251010/ourmid/pngtree-pink-axolotl-swimming-underwater-showing-gills-and-soft-body-png-image_17675658.webp',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'mx-biznaga',
        name: { es: 'Biznaga bola de hilo', en: 'Thread Ball Cactus' },
        scientificName: 'Epithelantha micromeris',
        type: 'flora',
        badge: { es: '🌵 Joya del Desierto', en: '🌵 Desert Jewel' },
        role: { es: 'Microhábitat y retención hídrica en zonas áridas del norte', en: 'Microhabitat and water retention in northern arid ecosystems' },
        position: 'top-left',
        img: '/images/fauna/biznaga_bola_hilo.png',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: -40 },
      },
      {
        id: 'mx-jaguar',
        name: { es: 'Jaguar Mesoamericano', en: 'Mesoamerican Jaguar' },
        scientificName: 'Panthera onca',
        type: 'fauna',
        badge: { es: '🐆 Depredador Tope', en: '🐆 Apex Predator' },
        role: { es: 'Regulador trófico supremo del Corredor Biológico Mesoamericano', en: 'Supreme trophic regulator of the Mesoamerican Biological Corridor' },
        position: 'bottom-right',
        img: 'https://png.pngtree.com/png-vector/20240920/ourmid/pngtree-walking-jaguar-on-transparent-background-png-image_13878172.png',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-32 sm:w-44 md:w-48',
        motionOrigin: { x: 80, y: 40 },
      },
    ],
  },
  colombia: {
    country: { es: 'Colombia', en: 'Colombia' },
    flag: '🇨🇴',
    items: [
      {
        id: 'co-condor',
        name: { es: 'Cóndor de los Andes', en: 'Andean Condor' },
        scientificName: 'Vultur gryphus',
        type: 'fauna',
        badge: { es: '🦅 Ave Nacional', en: '🦅 National Bird' },
        role: { es: 'Guardián y saneador ecológico de cumbres y páramos andinos', en: 'Guardian and ecological scavenger of Andean peaks & páramos' },
        position: 'top-right',
        img: '/images/fauna/colombia_condor.png',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-32 sm:w-44 md:w-52',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'co-oso',
        name: { es: 'Oso de Anteojos', en: 'Spectacled Bear' },
        scientificName: 'Tremarctos ornatus',
        type: 'fauna',
        badge: { es: '🐾 Jardinero Andino', en: '🐾 Andean Gardener' },
        role: { es: 'Dispersor de semillas y protector de los bosques de niebla', en: 'Seed disperser and protector of high-altitude cloud forests' },
        position: 'bottom-left',
        img: '/images/fauna/colombia_oso.png',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-26 sm:w-34 md:w-40',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'co-rana',
        name: { es: 'Rana Dorada Venenosa', en: 'Golden Poison Frog' },
        scientificName: 'Phyllobates terribilis',
        type: 'fauna',
        badge: { es: '🐸 Centinela del Chocó', en: '🐸 Chocó Sentinel' },
        role: { es: 'Bioindicador de selvas húmedas prístinas del Pacífico colombiano', en: 'Bioindicator of pristine humid rainforests in Colombian Pacific' },
        position: 'bottom-right',
        img: '/images/fauna/colombia_rana.png',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'co-orquidea',
        name: { es: 'Orquídea Flor de Mayo', en: 'May Flower Orchid' },
        scientificName: 'Cattleya trianae',
        type: 'flora',
        badge: { es: '🌸 Flor Nacional', en: '🌸 National Flower' },
        role: { es: 'Epífita endémica representativa del dosel andino', en: 'Endemic epiphyte representative of Andean cloud canopies' },
        position: 'top-left',
        img: '/images/fauna/colombia_orquidea.png',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: -40 },
      },
    ],
  },
  canada: {
    country: { es: 'Canadá', en: 'Canada' },
    flag: '🇨🇦',
    items: [
      {
        id: 'ca-buho',
        name: { es: 'Búho Nival del Ártico', en: 'Snowy Owl' },
        scientificName: 'Bubo scandiacus',
        type: 'fauna',
        badge: { es: '🦉 Cazador Ártico', en: '🦉 Arctic Hunter' },
        role: { es: 'Centinela alado y regulador poblacional de la tundra polar', en: 'Winged sentinel and population regulator of polar tundra' },
        position: 'top-right',
        img: '/images/fauna/canada_buho.png',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-28 sm:w-40 md:w-48',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'ca-castor',
        name: { es: 'Castor Canadiense', en: 'North American Beaver' },
        scientificName: 'Castor canadensis',
        type: 'fauna',
        badge: { es: '🪵 Ingeniero de Ecosistemas', en: '🪵 Ecosystem Engineer' },
        role: { es: 'Constructor hidrológico y restaurador clave de humedales boreales', en: 'Hydrological builder & critical restorer of boreal wetlands' },
        position: 'bottom-left',
        img: '/images/fauna/canada_castor.png',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-26 sm:w-34 md:w-40',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'ca-oso-polar',
        name: { es: 'Oso Polar Ártico', en: 'Arctic Polar Bear' },
        scientificName: 'Ursus maritimus',
        type: 'fauna',
        badge: { es: '❄️ Centinela del Hielo Marino', en: '❄️ Sea Ice Sentinel' },
        role: { es: 'Bioindicador cumbre de la estabilidad del hielo marino boreal', en: 'Apex bioindicator of boreal marine sea ice stability' },
        position: 'bottom-right',
        img: '/images/fauna/canada_oso_polar.png',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-30 sm:w-40 md:w-48',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'ca-arce',
        name: { es: 'Hoja de Arce Azucarero', en: 'Sugar Maple Leaf' },
        scientificName: 'Acer saccharum',
        type: 'flora',
        badge: { es: '🍁 Emblema Nacional', en: '🍁 National Emblem' },
        role: { es: 'Pilar vegetal del dosel templado caducifolio y captura de biomasa', en: 'Plant pillar of temperate deciduous canopy & biomass capture' },
        position: 'top-left',
        img: '/images/fauna/canada_arce.png',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: -40 },
      },
    ],
  },
  espana: {
    country: { es: 'España', en: 'Spain' },
    flag: '🇪🇸',
    items: [
      {
        id: 'es-aguila',
        name: { es: 'Águila Imperial Ibérica', en: 'Spanish Imperial Eagle' },
        scientificName: 'Aquila adalberti',
        type: 'fauna',
        badge: { es: '🦅 Rapaz Endémica', en: '🦅 Endemic Raptor' },
        role: { es: 'Reina y guardiana apical de dehesas y marismas ibéricas', en: 'Apex queen & guardian of Iberian dehesas and marshes' },
        position: 'top-right',
        img: '/images/fauna/espana_aguila_imperial.png',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-28 sm:w-40 md:w-48',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'es-lince',
        name: { es: 'Lince Ibérico', en: 'Iberian Lynx' },
        scientificName: 'Lynx pardinus',
        type: 'fauna',
        badge: { es: '🐾 Joya del Monte Mediterráneo', en: '🐾 Mediterranean Jewel' },
        role: { es: 'El felino más protegido de Europa y especialista del ecosistema de dehesa', en: 'Europe’s most protected feline and dehesa specialist' },
        position: 'bottom-left',
        img: '/images/fauna/espana_lince_iberico.png',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-26 sm:w-34 md:w-40',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'es-lobo',
        name: { es: 'Lobo Ibérico', en: 'Iberian Wolf' },
        scientificName: 'Canis lupus signatus',
        type: 'fauna',
        badge: { es: '🐺 Depredador Regulador', en: '🐺 Regulatory Predator' },
        role: { es: 'Regulador trófico de ungulados silvestres en la Cordillera Cantábrica', en: 'Trophic regulator of wild ungulates in Cantabrian mountains' },
        position: 'bottom-right',
        img: '/images/fauna/espana_lobo_iberico.png',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-28 sm:w-38 md:w-44',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'es-clavel',
        name: { es: 'Clavel Silvestre Ibérico', en: 'Wild Spanish Carnation' },
        scientificName: 'Dianthus caryophyllus',
        type: 'flora',
        badge: { es: '🌸 Flor Tradicional', en: '🌸 Traditional Bloom' },
        role: { es: 'Icono botánico y polinizador silvestre de la campiña peninsular', en: 'Wild botanical icon & pollinator of the Iberian countryside' },
        position: 'top-left',
        img: '/images/fauna/espana_clavel.png',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: -40 },
      },
    ],
  },
  costarica: {
    country: { es: 'Costa Rica', en: 'Costa Rica' },
    flag: '🇨🇷',
    items: [
      {
        id: 'cr-quetzal',
        name: { es: 'Quetzal Resplandeciente', en: 'Resplendent Quetzal' },
        scientificName: 'Pharomachrus mocinno',
        type: 'fauna',
        badge: { es: '🦜 Ave Sagrada de Niebla', en: '🦜 Sacred Cloud Forest Bird' },
        role: { es: 'Sembrador alado de aguacatillos en bosques nubosos de Talamanca', en: 'Winged planter of wild avocados in Talamanca cloud forests' },
        position: 'top-right',
        img: 'https://static.vecteezy.com/system/resources/previews/053/136/157/large_2x/resplendent-quetzal-displays-majestic-feathers-in-stunning-art-free-png.png',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-28 sm:w-40 md:w-48',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'cr-perezoso',
        name: { es: 'Perezoso de Tres Dedos', en: 'Brown-throated Three-Toed Sloth' },
        scientificName: 'Bradypus variegatus',
        type: 'fauna',
        badge: { es: '🦥 Símbolo Nacional', en: '🦥 National Symbol' },
        role: { es: 'Microecosistema simbiótico del dosel lluvioso de Costa Rica', en: 'Symbiotic micro-ecosystem of Costa Rica’s rainforest canopy' },
        position: 'bottom-left',
        img: '/images/fauna/costarica_perezoso.png',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-28 sm:w-36 md:w-40',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'cr-rana',
        name: { es: 'Rana Arbórea de Ojos Rojos', en: 'Red-Eyed Tree Frog' },
        scientificName: 'Agalychnis callidryas',
        type: 'fauna',
        badge: { es: '🐸 Centinela Tropical', en: '🐸 Tropical Sentinel' },
        role: { es: 'Bioindicador de la calidad de microcuencas y bosques húmedos tropicales', en: 'Bioindicator of micro-watersheds & tropical humid rainforests' },
        position: 'bottom-right',
        img: '/images/fauna/costarica_rana_ojos_rojos.png',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'cr-guaria',
        name: { es: 'Guaria Morada Nacional', en: 'Guaria Morada National Orchid' },
        scientificName: 'Guarianthe skinneri',
        type: 'flora',
        badge: { es: '🌸 Flor Nacional', en: '🌸 National Flower' },
        role: { es: 'Orquídea epífita tradicional de los bosques húmedos del Pacífico', en: 'Traditional epiphytic orchid of Pacific premontane humid forests' },
        position: 'top-left',
        img: '/images/fauna/costarica_guaria_morada.png',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: -40 },
      },
    ],
  },
};

export default function MapBorderBiodiversity({ activeSedeId, visible = false, playKey = 0 }) {
  const { t } = useI18n();

  const activeData = BORDER_SPECIES_DATA[activeSedeId] || BORDER_SPECIES_DATA.mexico;
  // Mostrar las especies con imagen definida
  const items = activeData.items.filter((item) => Boolean(item.img));

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      <AnimatePresence mode="sync">
        {visible &&
          items.map((item) => (
            <motion.div
              key={`${playKey}-${item.id}`}
              initial={{
                opacity: 0,
                x: item.motionOrigin.x * 1.5,
                y: item.motionOrigin.y * 1.5,
                scale: 0.7,
                rotate: item.motionOrigin.x > 0 ? 10 : -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                x: item.motionOrigin.x * 1.8,
                y: item.motionOrigin.y * 1.8,
                scale: 0.75,
                rotate: item.motionOrigin.x > 0 ? 12 : -12,
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute ${item.customStyle} will-change-transform transform-gpu pointer-events-none`}
            >
              {/* Contenedor interno para oscilación continua natural sin interferir con la entrada/salida */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -1.5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 3.4,
                  ease: 'easeInOut',
                }}
                className="transform-gpu"
              >
                <img
                  src={item.img}
                  alt={t(item.name)}
                  className={`${item.imgSize} h-auto object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transform-gpu`}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

