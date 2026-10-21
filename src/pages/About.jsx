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
      period: '04 de Febrero, 2020',
      tag: 'Fundación del Consejo',
      location: 'Ciudad de México',
      title: 'Establecimiento en México',
      desc: 'Conformación del organismo y articulación de su cuerpo colegiado fundador, estableciendo los marcos estatutarios para impulsar proyectos de gobernanza ecológica, investigación aplicada y alianzas de cooperación territorial.',
    },
    {
      year: '2023 - 2024',
      period: 'Periodo Operativo',
      tag: 'Acción Territorial en Xochimilco',
      location: 'Suelo de Conservación ANP',
      title: 'Intervención en Área Natural Protegida',
      desc: 'Bajo la conducción del Mtro. Luis D. García González y el Mtro. Francisco Solorio del Consejo Global Ambiental, se desarrollan actividades de educación ambiental, conservación, divulgación y participación comunitaria en el Área Natural Protegida Ejidos de Xochimilco y San Gregorio Atlapulco en la Ciudad de México.',
    },
    {
      year: '2026',
      period: 'Proyección Bilateral',
      tag: 'Cooperación Internacional en Canadá',
      location: 'Toronto · Ottawa · Montreal',
      title: 'Proyección y Diálogo Bilateral',
      desc: 'El Consejo Global Ambiental fortalece su proyección internacional mediante una agenda de vinculación institucional, cooperación e intercambio de experiencias en Toronto, Ottawa y Montreal, impulsando oportunidades de colaboración en restauración ecológica, sostenibilidad urbana, gobernanza ambiental y participación comunitaria.',
    },
    {
      year: '2026',
      period: 'Consolidación Institucional',
      tag: 'Fortalecimiento del CGA y Proyectos',
      location: 'Cuerpo Colegiado y Proyectos',
      title: 'Consejerías Honoríficas y Dirección Nacional',
      desc: 'El CGA inicia una nueva etapa de fortalecimiento institucional con la conformación de sus primeras Consejerías Honoríficas, integrando especialistas de reconocida trayectoria en áreas estratégicas como bienestar animal y educación ambiental. Asimismo, incorpora la Dirección Nacional de Proyectos, fortaleciendo las capacidades de coordinación, vinculación y ejecución de proyectos en México.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans">
      <PageHero
        titleWhite="Conocimiento, cooperación y"
        titleGreen="acción territorial"
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
      />

      {/* =================================================================
          1.1 QUIÉNES SOMOS
          ================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda: Mensaje Editorial Oficial */}
          <div className="lg:col-span-7 space-y-6">
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
                className="absolute inset-0 w-full h-full object-cover"
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
          1.2 MISIÓN Y VISIÓN (CON FONDO WATERMARK EDITORIAL)
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 bg-[#ece4d0]/60 border-y border-[#d8ceb6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Misión con Watermark M y MISIÓN */}
          <div className="relative overflow-hidden bg-[#f5efe3] rounded-3xl p-8 sm:p-12 border border-[#d8ceb6] shadow-sm flex flex-col justify-between group hover:border-[#4a5a22]/50 transition-all duration-300">
            {/* Watermark de Fondo */}
            <span className="absolute -bottom-8 -right-3 font-serif text-[150px] sm:text-[210px] font-bold text-[#4a5a22]/[0.06] select-none pointer-events-none leading-none tracking-tighter transition-transform duration-500 group-hover:scale-105">
              M
            </span>
            <span className="absolute top-6 right-8 font-serif text-2xl sm:text-3xl font-light italic tracking-[0.25em] text-[#4a5a22]/10 uppercase select-none pointer-events-none">
              Misión
            </span>

            <div className="relative z-10 space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2d2618] font-light">
                Nuestra <span className="italic text-[#4a5a22] font-normal">Misión</span>
              </h3>
              <p className="text-[#5c523e] text-base sm:text-lg leading-relaxed font-light">
                Fortalecer la gobernanza ambiental y promover el desarrollo sostenible mediante la cooperación internacional, el conocimiento especializado y la articulación de alianzas estratégicas, impulsando soluciones que protejan la biodiversidad, fortalezcan la resiliencia de los territorios y generen beneficios ambientales y sociales verificables.
              </p>
            </div>
          </div>

          {/* Visión con Watermark V y VISIÓN */}
          <div className="relative overflow-hidden bg-[#f5efe3] rounded-3xl p-8 sm:p-12 border border-[#d8ceb6] shadow-sm flex flex-col justify-between group hover:border-[#4a5a22]/50 transition-all duration-300">
            {/* Watermark de Fondo */}
            <span className="absolute -bottom-8 -right-3 font-serif text-[150px] sm:text-[210px] font-bold text-[#4a5a22]/[0.06] select-none pointer-events-none leading-none tracking-tighter transition-transform duration-500 group-hover:scale-105">
              V
            </span>
            <span className="absolute top-6 right-8 font-serif text-2xl sm:text-3xl font-light italic tracking-[0.25em] text-[#4a5a22]/10 uppercase select-none pointer-events-none">
              Visión
            </span>

            <div className="relative z-10 space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2d2618] font-light">
                Nuestra <span className="italic text-[#4a5a22] font-normal">Visión</span>
              </h3>
              <p className="text-[#5c523e] text-base sm:text-lg leading-relaxed font-light">
                Consolidarse como un organismo internacional de referencia en gobernanza ambiental y desarrollo sostenible, reconocido por su liderazgo, capacidad de incidencia y articulación multisectorial para transformar el conocimiento y la cooperación en soluciones de impacto duradero para los territorios y las comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          1.2 PRINCIPIOS INSTITUCIONALES (Los 9 Principios Oficiales - Sin Scroll)
          ================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 relative bg-[#f5efe3] overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Columna Izquierda: Índice Completo de Principios (Sin Scroll Interno) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618] leading-[1.12]">
                  Principios <span className="italic text-[#4a5a22]">Institucionales.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed max-w-lg">
                  Nueve pilares que fundamentan nuestras decisiones, alianzas e intervenciones en los territorios.
                </p>
              </div>

              {/* Lista completa interactiva - Flujo natural sin scrollbar */}
              <div className="divide-y divide-[#d8ceb6]/60">
                {principles.map((p, idx) => (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => setActivePrinciple(idx)}
                    className={`group w-full flex items-start gap-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                      activePrinciple === idx
                        ? 'bg-[#4a5a22]/10 px-3.5 rounded-2xl'
                        : 'hover:pl-2'
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
                        <p className="mt-2 text-xs text-[#5c523e] font-light leading-relaxed lg:hidden">
                          {p.desc}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Detallada del Principio Activo (Sticky en Desktop) */}
            <div className="lg:col-span-6 hidden lg:block sticky top-28 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrinciple}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#f5efe3]/95 backdrop-blur-xl border border-[#d8ceb6] rounded-3xl p-8 sm:p-10 shadow-xl space-y-4"
                >
                  <span className="text-xs font-mono text-[#4a5a22] font-bold tracking-wider uppercase block">
                    Principio {principles[activePrinciple].num}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-normal leading-snug">
                    {principles[activePrinciple].title}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#4a5a22]/40 my-3" />
                  <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed">
                    {principles[activePrinciple].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          1.3 HISTORIA DEL CGA (LÍNEA DE TIEMPO ALTERNADA Y ANIMADA)
          ================================================================= */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 md:px-20 bg-[#ece4d0]/40 border-t border-[#d8ceb6] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Cabecera Editorial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618]">
              Historia del <span className="italic text-[#4a5a22]">Consejo Global Ambiental</span>
            </h2>
          </motion.div>

          {/* Línea de Tiempo: Alternada (Izquierda - Derecha - Izquierda) con Eje Central */}
          <div className="relative">
            {/* Eje Vertical Central en Desktop / Lateral en Mobile */}
            <div className="absolute top-4 bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#4a5a22]/10 via-[#4a5a22]/35 to-[#4a5a22]/10 pointer-events-none" />

            <div className="space-y-12 sm:space-y-16">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
                  >
                    {/* Indicador Central (Nodo con Animación) */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      whileHover={{ scale: 1.35 }}
                      transition={{ duration: 0.4 }}
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 top-7 md:top-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full bg-[#f5efe3] border-2 border-[#4a5a22] shadow-xs flex items-center justify-center z-20 group-hover:border-[#384519] group-hover:bg-[#4a5a22] transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#4a5a22] group-hover:bg-[#f5efe3] transition-colors" />
                    </motion.div>

                    {/* Fila Izquierda / Derecha según alternancia */}
                    {isLeft ? (
                      <>
                        {/* Tarjeta en la IZQUIERDA (Desktop) */}
                        <motion.div
                          initial={{ opacity: 0, x: -35 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={{ y: -3 }}
                          className="w-full md:w-1/2 pl-14 md:pl-0 md:pr-12 lg:md:pr-16"
                        >
                          <div className="p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#d8ceb6] shadow-xs hover:shadow-md hover:border-[#4a5a22]/40 transition-all duration-300 space-y-3">
                            {/* Cabecera Limpia (Sin Cápsulas) */}
                            <div className="flex items-center justify-between gap-3 border-b border-[#d8ceb6]/40 pb-3">
                              <div>
                                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22] block font-sans">
                                  {item.tag}
                                </span>
                                <span className="text-[11px] text-[#8a7e68] font-light block mt-0.5">
                                  {item.location}
                                </span>
                              </div>
                              {/* Año en mobile */}
                              <div className="md:hidden text-right">
                                <span className="font-serif text-xl font-light text-[#4a5a22] block leading-none">
                                  {item.year}
                                </span>
                                <span className="text-[10px] text-[#8a7e68] block mt-0.5">
                                  {item.period}
                                </span>
                              </div>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#2d2618] leading-snug">
                              {item.title}
                            </h3>

                            <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>

                        {/* Año Contextual a la DERECHA (Desktop) */}
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          className="hidden md:flex md:w-1/2 md:pl-12 lg:md:pl-16 flex-col justify-center text-left"
                        >
                          <span className="font-serif text-4xl lg:text-5xl font-light text-[#4a5a22] tracking-tight group-hover:text-[#384519] transition-colors">
                            {item.year}
                          </span>
                          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#7a6e58] mt-1.5 block">
                            {item.period}
                          </span>
                          <span className="text-xs text-[#8a7e68] font-light mt-0.5 block">
                            {item.location}
                          </span>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        {/* Año Contextual a la IZQUIERDA (Desktop) */}
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          className="hidden md:flex md:w-1/2 md:pr-12 lg:md:pr-16 flex-col justify-center text-right"
                        >
                          <span className="font-serif text-4xl lg:text-5xl font-light text-[#4a5a22] tracking-tight group-hover:text-[#384519] transition-colors">
                            {item.year}
                          </span>
                          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#7a6e58] mt-1.5 block">
                            {item.period}
                          </span>
                          <span className="text-xs text-[#8a7e68] font-light mt-0.5 block">
                            {item.location}
                          </span>
                        </motion.div>

                        {/* Tarjeta en la DERECHA (Desktop) */}
                        <motion.div
                          initial={{ opacity: 0, x: 35 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          whileHover={{ y: -3 }}
                          className="w-full md:w-1/2 pl-14 md:pl-12 lg:md:pl-16"
                        >
                          <div className="p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#d8ceb6] shadow-xs hover:shadow-md hover:border-[#4a5a22]/40 transition-all duration-300 space-y-3">
                            {/* Cabecera Limpia (Sin Cápsulas) */}
                            <div className="flex items-center justify-between gap-3 border-b border-[#d8ceb6]/40 pb-3">
                              <div>
                                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22] block font-sans">
                                  {item.tag}
                                </span>
                                <span className="text-[11px] text-[#8a7e68] font-light block mt-0.5">
                                  {item.location}
                                </span>
                              </div>
                              {/* Año en mobile */}
                              <div className="md:hidden text-right">
                                <span className="font-serif text-xl font-light text-[#4a5a22] block leading-none">
                                  {item.year}
                                </span>
                                <span className="text-[10px] text-[#8a7e68] block mt-0.5">
                                  {item.period}
                                </span>
                              </div>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#2d2618] leading-snug">
                              {item.title}
                            </h3>

                            <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
