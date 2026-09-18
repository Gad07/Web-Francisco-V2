import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const principles = [
    {
      num: '01',
      title: 'Rigor científico y normativo',
      desc: 'Todas nuestras acciones e incidencias se sustentan en evidencia empírica, análisis normativo y metodologías validadas internacionalmente.',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '02',
      title: 'Gobernanza y corresponsabilidad',
      desc: 'Fomentamos el diálogo constructivo entre gobiernos, academia, sector productivo y comunidades territoriales.',
      img: 'https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '03',
      title: 'Acción territorial medible',
      desc: 'Priorizamos el trabajo en campo con indicadores de impacto verificables, trazabilidad y resultados directos.',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '04',
      title: 'Cooperación internacional',
      desc: 'Conectamos capacidades globales con las necesidades y dinámicas socioculturales de cada territorio.',
      img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '05',
      title: 'Inclusión intergeneracional',
      desc: 'Garantizamos la participación equitativa de juventudes, pueblos originarios y sectores en situación de vulnerabilidad.',
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '06',
      title: 'Integridad y transparencia',
      desc: 'Rendición de cuentas continua, ética pública y comunicación veraz sobre cada programa desarrollado.',
      img: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '07',
      title: 'Respeto a la vida y Una Salud',
      desc: 'Defendemos el bienestar animal, la integridad ecosistémica y la salud humana como un equilibrio indivisible.',
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans">
      <PageHero
        tag="El Consejo Global Ambiental"
        titleWhite="Conocimiento, acción y"
        titleGreen="gobernanza territorial"
        description="Organismo internacional dedicado a transformar la política pública, la ciencia aplicada y la acción en el territorio para la sostenibilidad planetaria."
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
      />

      {/* =================================================================
          SECCIÓN 1: IDENTIDAD Y VISIÓN EDITORIAL (2 Columnas)
          ================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Mensaje Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">
                Nuestra Identidad
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-light text-[#2d2618] leading-[1.15]">
                Impulsamos la resiliencia <br />
                <span className="italic text-[#4a5a22] font-normal">ecosistémica y comunitaria.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed font-sans">
              El Consejo Global Ambiental articula redes de conocimiento, ciencia ciudadana e innovación gubernamental para proteger los biomas más frágiles de nuestro planeta.
            </p>

            <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed font-sans">
              Desde las altas cuencas montañosas hasta la profundidad de los ecosistemas marinos, diseñamos estrategias integrales orientadas a la justicia ambiental y el cumplimiento vinculante de la Agenda 2030.
            </p>

            <div className="pt-6 border-t border-[#d8ceb6]/60 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#4a5a22]/40" />
              <div className="text-xs uppercase tracking-[0.2em] text-[#7a6e58] font-sans font-medium">
                Pacto por la Conservación Territorial
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Fotográfica Limpia */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#d8ceb6] shadow-[0_12px_40px_rgba(45,38,24,0.08)] h-[440px] sm:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop"
                alt="Bosque nativo y conservación"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =================================================================
          SECCIÓN 2: PRINCIPIOS ÉTICOS (Inmersiva estilo Hambre Cero)
          ================================================================= */}
      <section className="py-28 md:py-36 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] border-t border-[#e0d4ba] overflow-hidden min-h-[640px] lg:min-h-[740px] flex items-center">
        
        {/* ─── Imagen Inmersiva de Fondo Derecho (Cubre toda la sección sin bordes) ─── */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[54%] xl:w-[58%] h-full pointer-events-none z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activePrinciple}
              src={principles[activePrinciple].img}
              alt={principles[activePrinciple].title}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Degradado progresivo horizontal y vertical para fundirse suavemente */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #f5efe3 0%, rgba(245,239,227,0.94) 12%, rgba(245,239,227,0.45) 45%, transparent 85%)'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #f5efe3 0%, transparent 15%, transparent 85%, #f5efe3 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Columna Izquierda: Título y Selector de Principios en 2 Columnas */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">
                  Fundamentos Éticos
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618] leading-[1.12]">
                  Principios de Actuación <br />
                  <span className="italic text-[#4a5a22] font-normal">Institucional.</span>
                </h2>
              </div>

              {/* Botones organizados en 2 Columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {principles.map((p, idx) => (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => setActivePrinciple(idx)}
                    className={`py-3 px-4 rounded-xl text-xs font-sans transition-all flex items-center gap-3 text-left cursor-pointer ${
                      activePrinciple === idx
                        ? 'bg-[#3a4a18] text-[#f5efe3] shadow-md font-semibold translate-x-1'
                        : 'bg-[#eae4d2]/85 text-[#6b6048] hover:bg-[#eae4d2] hover:text-[#2d2618] border border-[#d8ceb6]/80'
                    }`}
                  >
                    <span className="font-serif text-sm opacity-80">{p.num}</span>
                    <span className="line-clamp-1">{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Detalle Dinámico del Principio Seleccionado en Liquid Glass */}
            <div className="lg:col-span-6 w-full">
              <div className="relative p-8 sm:p-12 rounded-3xl bg-[#eae4d2]/85 backdrop-blur-2xl border border-[#d8ceb6] shadow-[0_15px_40px_rgba(45,38,24,0.08)] min-h-[260px] flex flex-col justify-center overflow-hidden">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePrinciple}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 space-y-4"
                  >
                    {/* Número de fondo marca de agua */}
                    <div 
                      aria-hidden="true"
                      className="font-serif text-8xl sm:text-9xl text-[#4a5a22]/10 absolute -top-6 -right-2 pointer-events-none select-none font-light leading-none"
                    >
                      {principles[activePrinciple].num}
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-[#5a6b2a] font-semibold">
                        Principio {principles[activePrinciple].num}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-[#2d2618] font-light leading-[1.18]">
                        {principles[activePrinciple].title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed font-sans">
                      {principles[activePrinciple].desc}
                    </p>

                    <div className="pt-4 border-t border-[#d8ceb6]/60 flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-[#4a5a22]/40" />
                      <div className="text-[11px] uppercase tracking-wider text-[#7a6e58] font-sans font-medium">
                        Fundamento Ético Vinculante
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================================
          SECCIÓN 3: MODELO DE ARTICULACIÓN TERRITORIAL (2 Columnas)
          ================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Cabecera y Descripción */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">
                Metodología Institucional
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#2d2618] leading-[1.15]">
                Un modelo de articulación <br />
                <span className="italic text-[#4a5a22] font-normal">multinivel y horizontal.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed font-sans">
              No intervenimos de manera aislada. Nuestro esquema de gobernanza sincroniza el rigor científico con las decisiones comunales y la adopción de políticas públicas vinculantes.
            </p>
          </div>

          {/* Columna Derecha: 3 Ejes de Articulación en Liquid Glass */}
          <div className="lg:col-span-7 space-y-4">
            {[
              {
                num: '01',
                title: 'Ciencia y Datos Territoriales',
                desc: 'Diagnósticos satelitales y levantamiento de indicadores bioculturales con validación comunitaria.',
              },
              {
                num: '02',
                title: 'Incidencia y Dictamen Normativo',
                desc: 'Acompañamiento a poderes legislativos y gobiernos locales para blindar áreas de alto valor ecosistémico.',
              },
              {
                num: '03',
                title: 'Alianzas y Financiamiento Climático',
                desc: 'Canalización transparente de recursos internacionales a custodios ejidales e iniciativas territoriales.',
              },
            ].map((eje) => (
              <div
                key={eje.num}
                className="p-6 sm:p-7 rounded-2xl bg-[#eae4d2]/60 backdrop-blur-xl border border-[#d8ceb6] hover:bg-[#f5efe3]/50 hover:border-[#4a5a22] transition-all duration-300 shadow-[0_4px_20px_rgba(45,38,24,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif text-2xl text-[#3a4a18] font-light">{eje.num}</span>
                  <div>
                    <h3 className="font-serif text-xl text-[#2d2618] font-light mb-1">{eje.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6b6048] font-light leading-relaxed font-sans">{eje.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FooterNav />
    </div>
  );
}
