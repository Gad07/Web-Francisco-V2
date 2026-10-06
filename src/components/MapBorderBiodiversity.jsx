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
        role: { es: 'Guardián trófico de serranías mexicanas', en: 'Trophic guardian of Mexican mountains' },
        position: 'top-right',
        // Imagen PNG transparente enviada por el usuario
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
        role: { es: 'Bioindicador lacustre y regeneración celular', en: 'Lacustrine bioindicator & cell regeneration' },
        position: 'bottom-left',
        img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'mx-jaguar',
        name: { es: 'Jaguar Mesoamericano', en: 'Mesoamerican Jaguar' },
        scientificName: 'Panthera onca',
        type: 'fauna',
        badge: { es: '🐆 Guardián de la Selva', en: '🐆 Rainforest Guardian' },
        role: { es: 'Superdepredador de las selvas del sureste', en: 'Apex predator of southeastern rainforests' },
        position: 'bottom-right',
        img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'mx-dalia',
        name: { es: 'Flor Nacional Dalia', en: 'National Dahlia Flower' },
        scientificName: 'Dahlia pinnata',
        type: 'flora',
        badge: { es: '🌸 Flor Nacional', en: '🌸 National Flower' },
        role: { es: 'Herencia botánica y medicinal prehispánica', en: 'Pre-Hispanic botanical & medicinal heritage' },
        position: 'top-left',
        img: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=500&fit=crop&auto=format',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-20 sm:w-28 md:w-32',
        motionOrigin: { x: -80, y: -40 },
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
        role: { es: 'Guardián y saneador de cumbres andinas', en: 'Guardian of the Andean mountain peaks' },
        position: 'top-right',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&fit=crop&auto=format',
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
        role: { es: 'Sembrador de los bosques de niebla', en: 'Planter of Andean cloud forests' },
        position: 'bottom-left',
        img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'co-rana',
        name: { es: 'Rana Dorada Venenosa', en: 'Golden Poison Frog' },
        scientificName: 'Phyllobates terribilis',
        type: 'fauna',
        badge: { es: '🐸 Centinela del Chocó', en: '🐸 Choco Sentinel' },
        role: { es: 'Bioindicador de selvas prístinas', en: 'Pristine rainforest bioindicator' },
        position: 'bottom-right',
        img: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-20 sm:w-28 md:w-32',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'co-orquidea',
        name: { es: 'Orquídea Flor de Mayo', en: 'May Flower Orchid' },
        scientificName: 'Cattleya trianae',
        type: 'flora',
        badge: { es: '🌸 Flor Nacional', en: '🌸 National Flower' },
        role: { es: 'Emblema botánico de epífitas andinas', en: 'Botanical emblem of Andean epiphytes' },
        position: 'top-left',
        img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=500&fit=crop&auto=format',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-20 sm:w-28 md:w-32',
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
        role: { es: 'Centinela alado de la tundra polar', en: 'Winged sentinel of polar tundra' },
        position: 'top-right',
        img: 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=500&fit=crop&auto=format',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-28 sm:w-40 md:w-48',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'ca-castor',
        name: { es: 'Castor Canadiense', en: 'North American Beaver' },
        scientificName: 'Castor canadensis',
        type: 'fauna',
        badge: { es: '🪵 Ingeniero Boreal', en: '🪵 Boreal Engineer' },
        role: { es: 'Constructor y restaurador de humedales', en: 'Wetland builder & restorer' },
        position: 'bottom-left',
        img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'ca-oso-polar',
        name: { es: 'Oso Polar Boreal', en: 'Boreal Polar Bear' },
        scientificName: 'Ursus maritimus',
        type: 'fauna',
        badge: { es: '❄️ Centinela del Hielo', en: '❄️ Sea Ice Sentinel' },
        role: { es: 'Indicador crítico del deshielo ártico', en: 'Critical indicator of Arctic ice health' },
        position: 'bottom-right',
        img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'ca-arce',
        name: { es: 'Hoja de Arce Azucarero', en: 'Sugar Maple Leaf' },
        scientificName: 'Acer saccharum',
        type: 'flora',
        badge: { es: '🍁 Emblema Nacional', en: '🍁 National Emblem' },
        role: { es: 'Símbolo identitario y dosel templado', en: 'National identity symbol & canopy' },
        position: 'top-left',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&fit=crop&auto=format',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-20 sm:w-28 md:w-32',
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
        role: { es: 'Reina de dehesas y marismas ibéricas', en: 'Queen of Iberian dehesas and wetlands' },
        position: 'top-right',
        img: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=500&fit=crop&auto=format',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-28 sm:w-40 md:w-48',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'es-lince',
        name: { es: 'Lince Ibérico', en: 'Iberian Lynx' },
        scientificName: 'Lynx pardinus',
        type: 'fauna',
        badge: { es: '🐾 Joya de la Dehesa', en: '🐾 Dehesa Jewel' },
        role: { es: 'Especialista del monte mediterráneo', en: 'Mediterranean scrubland specialist' },
        position: 'bottom-left',
        img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'es-lobo',
        name: { es: 'Lobo Ibérico', en: 'Iberian Wolf' },
        scientificName: 'Canis lupus signatus',
        type: 'fauna',
        badge: { es: '🐺 Especie Protegida', en: '🐺 Protected Species' },
        role: { es: 'Regulador trófico de ungulados silvestres', en: 'Trophic regulator of wild ungulates' },
        position: 'bottom-right',
        img: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'es-clavel',
        name: { es: 'Clavel Silvestre Ibérico', en: 'Wild Spanish Carnation' },
        scientificName: 'Dianthus caryophyllus',
        type: 'flora',
        badge: { es: '🌸 Flor Tradicional', en: '🌸 Traditional Bloom' },
        role: { es: 'Icono botánico y cultural de la campiña', en: 'Botanical icon of the Spanish countryside' },
        position: 'top-left',
        img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&fit=crop&auto=format',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-20 sm:w-28 md:w-32',
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
        role: { es: 'Sembrador alado de los bosques nubosos', en: 'Winged planter of cloud forest trees' },
        position: 'top-right',
        img: 'https://images.unsplash.com/photo-1550853024-fae8dd4be47f?w=500&fit=crop&auto=format',
        customStyle: 'top-2 right-2 sm:top-4 sm:right-6',
        imgSize: 'w-28 sm:w-40 md:w-48',
        motionOrigin: { x: 100, y: -40 },
      },
      {
        id: 'cr-perezoso',
        name: { es: 'Perezoso de Tres Dedos', en: 'Three-Toed Sloth' },
        scientificName: 'Bradypus tridactylus',
        type: 'fauna',
        badge: { es: '🦥 Símbolo Nacional', en: '🦥 National Symbol' },
        role: { es: 'Microecosistema móvil del dosel selvático', en: 'Mobile micro-ecosystem of rainforest canopy' },
        position: 'bottom-left',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 left-4 sm:bottom-6 sm:left-6',
        imgSize: 'w-24 sm:w-32 md:w-36',
        motionOrigin: { x: -80, y: 40 },
      },
      {
        id: 'cr-rana',
        name: { es: 'Rana de Ojos Rojos', en: 'Red-Eyed Tree Frog' },
        scientificName: 'Agalychnis callidryas',
        type: 'fauna',
        badge: { es: '🐸 Centinela Tropical', en: '🐸 Tropical Sentinel' },
        role: { es: 'Bioindicador de agua dulce y hojas húmedas', en: 'Freshwater and humidity bioindicator' },
        position: 'bottom-right',
        img: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=500&fit=crop&auto=format',
        customStyle: 'bottom-4 right-4 sm:bottom-6 sm:right-8',
        imgSize: 'w-20 sm:w-28 md:w-32',
        motionOrigin: { x: 80, y: 40 },
      },
      {
        id: 'cr-guaria',
        name: { es: 'Guaria Morada Nacional', en: 'Guaria Morada National Orchid' },
        scientificName: 'Guarianthe skinneri',
        type: 'flora',
        badge: { es: '🌸 Flor Nacional', en: '🌸 National Flower' },
        role: { es: 'Símbolo de buena fortuna y tradición', en: 'Symbol of good fortune and heritage' },
        position: 'top-left',
        img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=500&fit=crop&auto=format',
        customStyle: 'top-4 left-4 sm:top-6 sm:left-6',
        imgSize: 'w-20 sm:w-28 md:w-32',
        motionOrigin: { x: -80, y: -40 },
      },
    ],
  },
};

export default function MapBorderBiodiversity({ activeSedeId, visible = false, playKey = 0 }) {
  const { t } = useI18n();

  const activeData = BORDER_SPECIES_DATA[activeSedeId] || BORDER_SPECIES_DATA.mexico;
  // Solo se muestran recortes PNG reales (sin fondo)
  const items = activeData.items.filter((item) => item.img && item.img.endsWith('.png'));

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
              className={`absolute ${item.customStyle} will-change-transform transform-gpu`}
            >
              {/* Contenedor interno para oscilación continua natural de vuelo sin interferir con la entrada/salida */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 3.2,
                  ease: 'easeInOut',
                }}
                className="transform-gpu"
              >
                <img
                  src={item.img}
                  alt={t(item.name)}
                  className={`${item.imgSize} h-auto object-contain select-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transform-gpu`}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

