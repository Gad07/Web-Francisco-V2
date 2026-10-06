import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function About() {
  const { t } = useI18n();
  const [activePrinciple, setActivePrinciple] = useState(0);

  const principles = [
    {
      num: '01',
      title: { es: 'Rigor científico y normativo', en: 'Scientific and normative rigour' },
      desc: {
        es: 'Todas nuestras acciones e incidencias se sustentan en evidencia empírica, análisis normativo y metodologías validadas internacionalmente.',
        en: 'All our actions and advocacy are grounded in empirical evidence, normative analysis and internationally validated methodologies.',
      },
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '02',
      title: { es: 'Gobernanza y corresponsabilidad', en: 'Governance and shared responsibility' },
      desc: {
        es: 'Fomentamos el diálogo constructivo entre gobiernos, academia, sector productivo y comunidades territoriales.',
        en: 'We foster constructive dialogue between governments, academia, the productive sector and territorial communities.',
      },
      img: 'https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '03',
      title: { es: 'Acción territorial medible', en: 'Measurable territorial action' },
      desc: {
        es: 'Priorizamos el trabajo en campo con indicadores de impacto verificables, trazabilidad y resultados directos.',
        en: 'We prioritise field work with verifiable impact indicators, traceability and direct results.',
      },
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '04',
      title: { es: 'Cooperación internacional', en: 'International cooperation' },
      desc: {
        es: 'Conectamos capacidades globales con las necesidades y dinámicas socioculturales de cada territorio.',
        en: 'We connect global capacities with the needs and sociocultural dynamics of each territory.',
      },
      img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '05',
      title: { es: 'Inclusión intergeneracional', en: 'Intergenerational inclusion' },
      desc: {
        es: 'Garantizamos la participación equitativa de juventudes, pueblos originarios y sectores en situación de vulnerabilidad.',
        en: 'We guarantee the equitable participation of young people, indigenous peoples and sectors in vulnerable situations.',
      },
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '06',
      title: { es: 'Integridad y transparencia', en: 'Integrity and transparency' },
      desc: {
        es: 'Rendición de cuentas continua, ética pública y comunicación veraz sobre cada programa desarrollado.',
        en: 'Continuous accountability, public ethics and truthful communication about every programme we run.',
      },
      img: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '07',
      title: { es: 'Respeto a la vida y Una Salud', en: 'Respect for life and One Health' },
      desc: {
        es: 'Defendemos el bienestar animal, la integridad ecosistémica y la salud humana como un equilibrio indivisible.',
        en: 'We defend animal welfare, ecosystem integrity and human health as an indivisible balance.',
      },
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format',
    },
  ];

  const ejes = [
    {
      num: '01',
      title: { es: 'Ciencia y Datos Territoriales', en: 'Science and Territorial Data' },
      desc: {
        es: 'Diagnósticos satelitales y levantamiento de indicadores bioculturales con validación comunitaria.',
        en: 'Satellite diagnostics and biocultural indicator surveys validated by the community.',
      },
      tag: { es: 'Satélite + Comunidad', en: 'Satellite + Community' },
    },
    {
      num: '02',
      title: { es: 'Incidencia y Dictamen Normativo', en: 'Advocacy and Normative Opinion' },
      desc: {
        es: 'Acompañamiento a poderes legislativos y gobiernos locales para blindar áreas de alto valor ecosistémico.',
        en: 'Support to legislative bodies and local governments to protect areas of high ecosystem value.',
      },
      tag: { es: 'Política pública vinculante', en: 'Binding public policy' },
    },
    {
      num: '03',
      title: { es: 'Alianzas y Financiamiento Climático', en: 'Alliances and Climate Finance' },
      desc: {
        es: 'Canalización transparente de recursos internacionales a custodios ejidales e iniciativas territoriales.',
        en: 'Transparent channelling of international resources to communal land custodians and territorial initiatives.',
      },
      tag: { es: 'Recursos verificables', en: 'Verifiable resources' },
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans">
      <PageHero
        titleWhite={{ es: 'Conocimiento, acción y', en: 'Knowledge, action and' }}
        titleGreen={{ es: 'gobernanza territorial', en: 'territorial governance' }}
        description={{
          es: 'Organismo internacional dedicado a transformar la política pública, la ciencia aplicada y la acción en el territorio para la sostenibilidad planetaria.',
          en: 'International body dedicated to transforming public policy, applied science and on-the-ground action for planetary sustainability.',
        }}
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
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-light text-[#2d2618] leading-[1.15]">
                {t({ es: 'Impulsamos la resiliencia', en: 'We advance resilience' })} <br />
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'ecosistémica y comunitaria.', en: 'ecosystem and community.' })}
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed font-sans">
              {t({
                es: 'El Consejo Global Ambiental articula redes de conocimiento, ciencia ciudadana e innovación gubernamental para proteger los biomas más frágiles de nuestro planeta.',
                en: 'The Global Environmental Council connects knowledge networks, citizen science and public innovation to protect the most fragile biomes on our planet.',
              })}
            </p>

            <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed font-sans">
              {t({
                es: 'Desde las altas cuencas montañosas hasta la profundidad de los ecosistemas marinos, diseñamos estrategias integrales orientadas a la justicia ambiental y el cumplimiento vinculante de la Agenda 2030.',
                en: 'From high mountain basins to the depths of marine ecosystems, we design comprehensive strategies oriented towards environmental justice and binding delivery of the 2030 Agenda.',
              })}
            </p>

            <div className="pt-6 border-t border-[#d8ceb6]/60 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#4a5a22]/40" />
              <div className="text-xs uppercase tracking-[0.2em] text-[#7a6e58] font-sans font-medium">
                {t({ es: 'Pacto por la Conservación Territorial', en: 'Pact for Territorial Conservation' })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Fotográfica Limpia */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#d8ceb6] shadow-[0_12px_40px_rgba(45,38,24,0.08)] h-[440px] sm:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop"
                alt={t({ es: 'Bosque nativo y conservación', en: 'Native forest and conservation' })}
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
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[75%] h-full pointer-events-none z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activePrinciple}
              src={principles[activePrinciple].img}
              alt={t(principles[activePrinciple].title)}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda: Título + Índice Editorial de Principios */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618] leading-[1.12]">
                  {t({ es: 'Fundamentos', en: 'Ethical' })}{' '}
                  <span className="italic text-[#4a5a22] font-normal">
                    {t({ es: 'Éticos.', en: 'Foundations.' })}
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed font-sans max-w-md">
                  {t({
                    es: 'Siete principios que ordenan cada dictamen, cada alianza y cada intervención del Consejo en los territorios.',
                    en: 'Seven principles that guide every opinion, every alliance and every intervention of the Council in the territories.',
                  })}
                </p>
              </div>

              {/* Índice Editorial — selector numerado */}
              <div className="divide-y divide-[#d8ceb6]/40">
                {principles.map((p, idx) => (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => setActivePrinciple(idx)}
                    className={`group w-full flex items-center gap-4 py-3 text-left transition-all duration-300 cursor-pointer ${
                      activePrinciple === idx ? '' : 'hover:pl-1'
                    }`}
                  >
                    <span
                      className={`font-serif text-sm w-8 shrink-0 transition-colors ${
                        activePrinciple === idx ? 'text-[#3a4a18]' : 'text-[#a89a7a] group-hover:text-[#4a5a22]'
                      }`}
                    >
                      {p.num}
                    </span>
                    <span
                      className={`flex-1 text-[13px] sm:text-sm font-sans transition-colors ${
                        activePrinciple === idx
                          ? 'text-[#2d2618] font-medium'
                          : 'text-[#6b6048] group-hover:text-[#2d2618]'
                      }`}
                    >
                      {t(p.title)}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-[#4a5a22] transition-opacity duration-300 ${
                        activePrinciple === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Ficha del Principio en vidrio discreto */}
            <div className="lg:col-span-7 w-full">
              <div
                className="relative p-9 sm:p-12 rounded-3xl min-h-[300px] flex flex-col justify-center overflow-hidden"
                style={{
                  background:
                    'radial-gradient(120% 120% at 15% 0%, rgba(255,255,255,0.30), rgba(255,255,255,0) 46%), linear-gradient(155deg, rgba(246,240,224,0.42) 0%, rgba(246,240,224,0.14) 50%, rgba(246,240,224,0.30) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -12px 24px -18px rgba(100,90,45,0.22), 0 24px 60px -28px rgba(45,38,24,0.30)',
                }}
              >
                {/* Brillo especular sutil */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -top-1/4 left-[-10%] h-[75%] w-[40%] rotate-[18deg] bg-gradient-to-r from-white/35 via-white/8 to-transparent blur-[2px]" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePrinciple}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 space-y-5"
                  >
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2d2618] font-light leading-[1.15]">
                      {t(principles[activePrinciple].title)}
                    </h3>

                    <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed font-sans max-w-xl">
                      {t(principles[activePrinciple].desc)}
                    </p>

                    <div className="pt-4 border-t border-[#d8ceb6]/50 flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-[#4a5a22]/50" />
                      <div className="text-[11px] uppercase tracking-wider text-[#7a6e58] font-sans font-medium">
                        {t({ es: 'Fundamento Ético Vinculante', en: 'Binding Ethical Foundation' })}
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

          {/* Columna Izquierda: Cabecera + Datos Editoriales */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#2d2618] leading-[1.15]">
                {t({ es: 'Un modelo de articulación', en: 'A model of' })} <br />
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'multinivel y horizontal.', en: 'multi-level and horizontal coordination.' })}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed font-sans max-w-md">
                {t({
                  es: 'No intervenimos de manera aislada. Nuestro esquema de gobernanza sincroniza el rigor científico con las decisiones comunales y la adopción de políticas públicas vinculantes.',
                  en: 'We do not intervene in isolation. Our governance model synchronises scientific rigour with community decisions and the adoption of binding public policies.',
                })}
              </p>
            </div>

            <div className="pt-6 border-t border-[#d8ceb6]/50 space-y-6">
              <div className="flex items-center gap-5">
                <span className="font-serif text-6xl leading-none text-[#4a5a22] font-light">03</span>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#7a6e58] font-sans font-medium leading-relaxed">
                  {t({ es: 'Ejes de articulación', en: 'Axes of multi-level' })}<br />
                  {t({ es: 'territorial multinivel', en: 'territorial coordination' })}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#4a5a22]/40" />
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a8a6a] font-sans">
                  {t({ es: 'Ciencia · Norma · Financiamiento', en: 'Science · Regulation · Finance' })}
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: 3 Ejes de Articulación (índice editorial, sin cajas) */}
          <div className="lg:col-span-7">
            <div className="border-t border-b border-[#d8ceb6]/40 divide-y divide-[#d8ceb6]/40">
              {ejes.map((eje) => (
                <div key={eje.num} className="group grid grid-cols-[56px_1fr] sm:grid-cols-[68px_1fr_auto] items-baseline gap-x-5 gap-y-1 py-6 sm:py-7">
                  <span
                    className={`font-serif text-2xl sm:text-3xl font-light leading-none transition-colors ${
                      eje.num === '02' ? 'text-[#4a5a22]' : 'text-[#9a8a6a] group-hover:text-[#4a5a22]'
                    }`}
                  >
                    {eje.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-[#2d2618] font-light leading-snug mb-1 transition-colors group-hover:text-[#4a5a22]">
                      {t(eje.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6b6048] font-light leading-relaxed font-sans">
                      {t(eje.desc)}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 justify-self-end">
                    <div className="w-4 h-[1px] bg-[#4a5a22]/40" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#8a7a5e] font-sans font-medium">
                      {t(eje.tag)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <FooterNav />
    </div>
  );
}
