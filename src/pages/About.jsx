import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const principles = [
    {
      num: '01',
      title: 'Excelencia y conocimiento científico',
      desc: 'Fundamentar nuestras decisiones e iniciativas en la evidencia científica, el conocimiento especializado y el intercambio de saberes para promover soluciones ambientales informadas y sostenibles.',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '02',
      title: 'Reconocimiento de los saberes ancestrales y tradicionales',
      desc: 'Reconocer, respetar y valorar los conocimientos ancestrales de los pueblos indígenas y las comunidades locales, promoviendo el diálogo intercultural y su integración, con pleno respeto a sus derechos e identidad cultural, en la conservación de la biodiversidad y la gestión sostenible de los territorios.',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '03',
      title: 'Integridad y responsabilidad institucional',
      desc: 'Actuar con ética, independencia, transparencia y rendición de cuentas, garantizando una gestión responsable y congruente con nuestros compromisos institucionales.',
      img: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '04',
      title: 'Cooperación y gobernanza participativa',
      desc: 'Impulsar la colaboración entre gobiernos, organismos internacionales, academia, sector privado y sociedad civil, garantizando la participación efectiva de las comunidades en la identificación de prioridades, la toma de decisiones y el desarrollo de iniciativas que incidan en sus territorios.',
      img: 'https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '05',
      title: 'Equidad y justicia ambiental',
      desc: 'Promover el respeto a los derechos humanos, la igualdad de oportunidades y la participación de las comunidades, favoreciendo una distribución justa de los beneficios y responsabilidades ambientales.',
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '06',
      title: 'Sostenibilidad y pertinencia territorial',
      desc: 'Promover soluciones integrales que reconozcan la diversidad ambiental, social y cultural de los territorios, fortaleciendo sus capacidades de adaptación, conservación y desarrollo.',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '07',
      title: 'Responsabilidad intergeneracional',
      desc: 'Orientar nuestras acciones hacia la protección del patrimonio natural y el bienestar de las generaciones presentes y futuras, reconociendo la sostenibilidad como una responsabilidad compartida.',
      img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '08',
      title: 'Efectividad e impacto sostenible',
      desc: 'Transformar el conocimiento, la cooperación y los compromisos institucionales en acciones concretas, con objetivos definidos, resultados medibles y beneficios duraderos.',
      img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '09',
      title: 'Respeto a la vida y al patrimonio natural',
      desc: 'Reconocer el valor intrínseco de la biodiversidad, los ecosistemas y el bienestar animal, promoviendo su protección desde una perspectiva integral que vincule la salud ambiental y el bienestar humano.',
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format',
    },
  ];

  const timeline = [
    {
      year: '2020',
      tag: 'Fundación del Consejo',
      title: 'Establecimiento en México',
      desc: 'El 4 de febrero se establece el Consejo Global Ambiental en la Ciudad de México, con la finalidad de articular especialistas, instituciones y capacidades de cooperación ante desafíos ambientales que requieren una respuesta multidisciplinaria.',
    },
    {
      year: '2023 - 2024',
      tag: 'Acción Territorial en Xochimilco',
      title: 'Intervención en Área Natural Protegida',
      desc: 'Bajo la conducción del Mtro. Luis D. García González y el Mtro. Francisco Solorio del Consejo Global Ambiental, se desarrollan actividades de educación ambiental, conservación, divulgación y participación comunitaria en el Área Natural Protegida Ejidos de Xochimilco y San Gregorio Atlapulco en la Ciudad de México.',
    },
    {
      year: '2026',
      tag: 'Cooperación Internacional en Canadá',
      title: 'Proyección y Diálogo Bilateral',
      desc: 'El Consejo Global Ambiental fortalece su proyección internacional mediante una agenda de vinculación institucional, cooperación e intercambio de experiencias en Toronto, Ottawa y Montreal, impulsando oportunidades de colaboración en restauración ecológica, sostenibilidad urbana, gobernanza ambiental y participación comunitaria.',
    },
    {
      year: '2026',
      tag: 'Fortalecimiento del CGA y Proyectos',
      title: 'Consejerías Honoríficas y Dirección Nacional',
      desc: 'El CGA inicia una nueva etapa de fortalecimiento institucional con la conformación de sus primeras Consejerías Honoríficas, integrando especialistas de reconocida trayectoria en áreas estratégicas como bienestar animal y educación ambiental. Asimismo, incorpora la Dirección Nacional de Proyectos, fortaleciendo las capacidades de coordinación, vinculación y ejecución de proyectos en México.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans">
      <PageHero
        titleWhite="Conocimiento, cooperación y"
        titleGreen="acción territorial"
        description="Fundado el 4 de febrero de 2020, el Consejo Global Ambiental es un organismo internacional con sede en la Ciudad de México dedicado a fortalecer la gobernanza ambiental y promover soluciones integrales para el desarrollo sostenible."
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
      />

      {/* =================================================================
          1.1 QUIÉNES SOMOS
          ================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda: Mensaje Editorial Oficial */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a5a22]/10 border border-[#4a5a22]/20 text-[#4a5a22] text-xs font-semibold tracking-wider uppercase">
              01 · Identidad Institucional
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#2d2618] leading-[1.15]">
              Quiénes somos en el{' '}
              <span className="italic text-[#4a5a22] font-normal">
                Consejo Global Ambiental.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#5c523e] font-light leading-relaxed">
              Fundado el 4 de febrero de 2020, el Consejo Global Ambiental (CGA) es un organismo internacional con sede en la Ciudad de México, dedicado a fortalecer la gobernanza ambiental, impulsar la cooperación estratégica y promover soluciones integrales para el desarrollo sostenible. Reúne conocimiento técnico, capacidades institucionales y participación multisectorial para impulsar respuestas a desafíos ambientales con incidencia en los territorios.
            </p>

            <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed">
              Su trabajo vincula a gobiernos, academia, organizaciones, fundaciones, comunidades y sectores productivos en asuntos de gobernanza ambiental, cambio climático, biodiversidad, seguridad alimentaria, educación, economía circular y justicia ambiental. El Consejo promueve el intercambio de experiencias, la elaboración de propuestas técnicas y el desarrollo de iniciativas que integren prioridades ambientales y necesidades sociales.
            </p>

            <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed">
              Con México como punto de origen y relaciones de vinculación en Canadá, Colombia, Costa Rica y España, el CGA orienta su proyección internacional hacia la cooperación aplicada y el aprendizaje entre territorios. Sus actividades buscan traducirse en proyectos documentables, alianzas con objetivos definidos y capacidades que permanezcan más allá de cada intervención.
            </p>

            {/* Frase de Posicionamiento */}
            <div className="pt-6 border-t border-[#d8ceb6]/60 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-[2px] bg-[#4a5a22]" />
              <div className="text-xs uppercase tracking-[0.2em] text-[#3a4a18] font-sans font-semibold">
                Posicionamiento: Conocimiento, cooperación y acción territorial para el desarrollo sostenible.
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Conservación */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#d8ceb6] shadow-[0_16px_50px_rgba(45,38,24,0.1)] h-[440px] sm:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop"
                alt="Bosque nativo y conservación territorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-light">
                <span className="font-semibold block uppercase tracking-widest text-[#d8eb96] text-[10px] mb-1">
                  Acción Territorial
                </span>
                Respaldo técnico y vinculación comunitaria en suelo de conservación.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          1.2 MISIÓN Y VISIÓN
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 bg-[#ece4d0]/60 border-y border-[#d8ceb6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Misión */}
          <div className="bg-[#f5efe3] rounded-3xl p-8 sm:p-12 border border-[#d8ceb6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] flex items-center justify-center font-serif text-lg font-bold mb-6">
                M
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light mb-4">
                Nuestra <span className="italic text-[#4a5a22]">Misión</span>
              </h3>
              <p className="text-[#5c523e] text-base leading-relaxed font-light">
                Fortalecer la gobernanza ambiental y promover el desarrollo sostenible mediante la cooperación internacional, el conocimiento especializado y la articulación de alianzas estratégicas, impulsando soluciones que protejan la biodiversidad, fortalezcan la resiliencia de los territorios y generen beneficios ambientales y sociales verificables.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-[#f5efe3] rounded-3xl p-8 sm:p-12 border border-[#d8ceb6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] flex items-center justify-center font-serif text-lg font-bold mb-6">
                V
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light mb-4">
                Nuestra <span className="italic text-[#4a5a22]">Visión</span>
              </h3>
              <p className="text-[#5c523e] text-base leading-relaxed font-light">
                Consolidarse como un organismo internacional de referencia en gobernanza ambiental y desarrollo sostenible, reconocido por su liderazgo, capacidad de incidencia y articulación multisectorial para transformar el conocimiento y la cooperación en soluciones de impacto duradero para los territorios y las comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          1.2 PRINCIPIOS INSTITUCIONALES (Los 9 Principios Oficiales)
          ================================================================= */}
      <section className="py-28 md:py-36 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] overflow-hidden min-h-[640px] lg:min-h-[740px] flex items-center">
        {/* Imagen de fondo interactiva */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[75%] h-full pointer-events-none z-0 overflow-hidden">
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

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #f5efe3 0%, rgba(245,239,227,0.95) 20%, rgba(245,239,227,0.5) 50%, transparent 85%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #f5efe3 0%, transparent 15%, transparent 85%, #f5efe3 100%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda: Índice de Principios */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
                  Marco Ético Institucional
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618] leading-[1.12]">
                  Principios <span className="italic text-[#4a5a22]">Institucionales.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed max-w-lg">
                  Nueve pilares que fundamentan nuestras decisiones, alianzas e intervenciones en los territorios.
                </p>
              </div>

              {/* Lista interactiva */}
              <div className="divide-y divide-[#d8ceb6]/50 max-h-[460px] overflow-y-auto pr-3">
                {principles.map((p, idx) => (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => setActivePrinciple(idx)}
                    className={`group w-full flex items-start gap-4 py-3 text-left transition-all duration-300 cursor-pointer ${
                      activePrinciple === idx ? 'bg-[#4a5a22]/10 px-3 rounded-xl' : 'hover:pl-2'
                    }`}
                  >
                    <span
                      className={`font-serif text-sm w-7 shrink-0 transition-colors pt-0.5 ${
                        activePrinciple === idx ? 'text-[#3a4a18] font-bold' : 'text-[#8a7e68] group-hover:text-[#4a5a22]'
                      }`}
                    >
                      {p.num}
                    </span>
                    <div className="flex-1">
                      <span
                        className={`block text-[13px] sm:text-sm transition-colors ${
                          activePrinciple === idx
                            ? 'text-[#2d2618] font-semibold'
                            : 'text-[#5c523e] group-hover:text-[#2d2618]'
                        }`}
                      >
                        {p.title}
                      </span>
                      {activePrinciple === idx && (
                        <p className="mt-2 text-xs text-[#5c523e] font-light leading-relaxed">
                          {p.desc}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Detallada del Principio Activo */}
            <div className="lg:col-span-6 hidden lg:block">
              <div className="bg-[#f5efe3]/90 backdrop-blur-xl border border-[#d8ceb6] rounded-3xl p-8 shadow-xl">
                <span className="text-xs font-mono text-[#4a5a22] font-bold">
                  PRINCIPIO {principles[activePrinciple].num}
                </span>
                <h3 className="font-serif text-2xl text-[#2d2618] mt-2 mb-4 font-normal">
                  {principles[activePrinciple].title}
                </h3>
                <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                  {principles[activePrinciple].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          1.3 HISTORIA DEL CGA
          ================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 bg-[#ece4d0]/40 border-t border-[#d8ceb6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
              Trayectoria y Antecedentes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618]">
              Historia del <span className="italic text-[#4a5a22]">Consejo Global Ambiental</span>
            </h2>
            <p className="text-[#6b6048] font-light text-sm sm:text-base leading-relaxed">
              El CGA fue fundado el 4 de febrero de 2020 con la finalidad de articular especialistas, instituciones y capacidades de cooperación ante desafíos ambientales que requieren una respuesta multidisciplinaria. Su trayectoria ha incorporado acciones territoriales, desarrollo de proyectos y una agenda de vinculación internacional.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-[1px] before:bg-[#d8ceb6]">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Contenido */}
                <div className="md:w-1/2 pl-16 md:pl-0">
                  <div className={`p-8 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm ${
                    idx % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-serif text-xl font-bold text-[#4a5a22]">
                        {item.year}
                      </span>
                      <span className="text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4a5a22]/10 text-[#4a5a22] font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#2d2618] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Marcador central */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#4a5a22] ring-4 ring-[#f5efe3] z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
