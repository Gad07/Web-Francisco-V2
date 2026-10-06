import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function Projects() {
  const { t } = useI18n();
  const [activeProject, setActiveProject] = useState(0);

  const EASE = [0.22, 1, 0.36, 1];

  const projects = [
    {
      id: 'P-01',
      title: {
        es: 'Gobernanza Ambiental para el Hambre Cero',
        en: 'Environmental Governance for Zero Hunger',
      },
      subtitle: {
        es: 'Ganador Reconocimiento Internacional WESS 2026',
        en: 'Winner of the WESS 2026 International Recognition',
      },
      location: {
        es: 'Suelo de Conservación & Zonas Periurbanas',
        en: 'Conservation Land & Peri-urban Areas',
      },
      status: {
        es: 'En Ejecución',
        en: 'In Progress',
      },
      desc: {
        es: 'Proyecto emblemático que integra conservación ecosistémica, participación comunitaria, educación ambiental, cooperación interinstitucional y seguridad alimentaria en los territorios más vulnerables.',
        en: 'Flagship project integrating ecosystem conservation, community participation, environmental education, interinstitutional cooperation and food security in the most vulnerable territories.',
      },
      challenge: {
        es: 'Degradación acelerada de áreas agrícolas tradicionales, pérdida de biodiversidad nativa y vulnerabilidad alimentaria en comunidades rurales.',
        en: 'Accelerated degradation of traditional farming areas, loss of native biodiversity and food insecurity in rural communities.',
      },
      solution: {
        es: 'Construcción de módulos biointensivos agroecológicos, bancos comunitarios de semillas criollas y redes de bioinsumos sostenibles.',
        en: 'Construction of agroecological biointensive modules, community banks of heirloom seeds and networks of sustainable bio-inputs.',
      },
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=900&fit=crop&auto=format',
      metrics: [
        { val: '16,890+', label: { es: 'Personas beneficiadas directamente', en: 'People directly benefited' } },
        { val: '1,500+', label: { es: 'Semillas nativas resguardadas', en: 'Native seeds safeguarded' } },
        { val: '8', label: { es: 'Bancos de germoplasma criollo', en: 'Heirloom germplasm banks' } },
      ],
      deliverables: [
        { es: 'Manual de Producción Biointensiva en Zonas de Conservación', en: 'Biointensive Production Manual for Conservation Areas' },
        { es: 'Red Comunitaria de Custodios del Germoplasma Nactivo', en: 'Community Network of Native Germplasm Custodians' },
        { es: 'Diagnóstico de Salud Nutricional y Ecosistémica', en: 'Nutritional and Ecosystem Health Diagnostic' },
      ],
    },
    {
      id: 'P-02',
      title: {
        es: 'Custodia Activa del Suelo de Conservación',
        en: 'Active Stewardship of Conservation Land',
      },
      subtitle: {
        es: 'Protección Ecosistémica & Vigilancia Territorial',
        en: 'Ecosystem Protection & Territorial Monitoring',
      },
      location: {
        es: 'Cuencas Hídricas & Corredores Biológicos',
        en: 'Watersheds & Biological Corridors',
      },
      status: {
        es: 'Permanente',
        en: 'Ongoing',
      },
      desc: {
        es: 'Estrategia integral de inspección, vigilancia y restauración ecológica para frenar la expansión urbana ilegal y el cambio de uso de suelo.',
        en: 'Comprehensive inspection, monitoring and ecological restoration strategy to halt illegal urban expansion and land use change.',
      },
      challenge: {
        es: 'Tala clandestina, invasión de áreas protegidas y fragmentación de hábitats de fauna endémica.',
        en: 'Illegal logging, encroachment on protected areas and fragmentation of endemic wildlife habitats.',
      },
      solution: {
        es: 'Patrullajes comunitarios articulados con tecnología de monitoreo satelital e instalación de cámaras trampa.',
        en: 'Community patrols combined with satellite monitoring technology and camera trap installation.',
      },
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop&auto=format',
      metrics: [
        { val: '44', label: { es: 'Recorridos de inspección en campo', en: 'Field inspection routes' } },
        { val: '85,000 ha', label: { es: 'Monitoreadas continuamente', en: 'Continuously monitored' } },
        { val: '100%', label: { es: 'Trazabilidad de denuncias', en: 'Complaint traceability' } },
      ],
      deliverables: [
        { es: 'Sistema de Monitoreo Georreferenciado en Tiempo Real', en: 'Real-Time Georeferenced Monitoring System' },
        { es: 'Dictámenes Técnicos de Impacto Ambiental para Autoridades', en: 'Technical Environmental Impact Opinions for Authorities' },
        { es: 'Protocolo Comunitario de Prevención de Ilícitos Ambientales', en: 'Community Protocol for Preventing Environmental Offences' },
      ],
    },
    {
      id: 'P-03',
      title: {
        es: 'Red de Salud Ecosistémica y Una Salud',
        en: 'Ecosystem Health and One Health Network',
      },
      subtitle: {
        es: 'Bienestar Animal & Bioseguridad Comunitaria',
        en: 'Animal Welfare & Community Biosafety',
      },
      location: {
        es: 'Comunidades Rurales e Interfaz Fauna Silvestre',
        en: 'Rural Communities and Wildlife Interfaces',
      },
      status: {
        es: 'Fase 2',
        en: 'Phase 2',
      },
      desc: {
        es: "Implementación del modelo 'Una Salud' integrando el bienestar animal, la salud pública y la conservación de la biodiversidad silvestre.",
        en: "Implementation of the 'One Health' model integrating animal welfare, public health and the conservation of wild biodiversity.",
      },
      challenge: {
        es: 'Enfermedades zoonóticas, uso indiscriminado de agroquímicos y maltrato a animales de trabajo en el campo.',
        en: 'Zoonotic diseases, indiscriminate use of agrochemicals and abuse of working animals in the field.',
      },
      solution: {
        es: 'Jornadas integrales de bioseguridad, vacunación, trato digno animal y transición hacia insumos biológicos sin toxicidad.',
        en: 'Comprehensive biosafety days, vaccination, dignified animal treatment and a transition towards non-toxic biological inputs.',
      },
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format',
      metrics: [
        { val: '31k+', label: { es: 'Personas informadas en campañas', en: 'People reached through campaigns' } },
        { val: '12', label: { es: 'Talleres de bioseguridad en ejidos', en: 'Biosafety workshops in communal lands' } },
        { val: '0', label: { es: 'Uso de plaguicidas de alta peligrosidad en parcelas demostrativas', en: 'Use of highly hazardous pesticides on demonstration plots' } },
      ],
      deliverables: [
        { es: 'Guía de Trato Digno Animal y Bioseguridad Rural', en: 'Guide to Dignified Animal Treatment and Rural Biosafety' },
        { es: 'Informe Técnico de Salud de Ecosistemas y Fauna Nactiva', en: 'Technical Report on Ecosystem and Native Wildlife Health' },
        { es: 'Red de Promotores Comunitarios de Una Salud', en: 'Network of Community One Health Promoters' },
      ],
    },
  ];

  const p = projects[activeProject];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Proyectos socioambientales e', en: 'Socio-environmental projects and' }}
          titleGreen={{ es: 'impacto verificable', en: 'verifiable impact' }}
          description={{
            es: 'Conoce nuestras iniciativas emblemáticas en campo, diseñadas bajo estrictos indicadores de evaluación, participación comunitaria y gobernanza.',
            en: 'Discover our flagship field initiatives, designed around strict evaluation indicators, community participation and governance.',
          }}
          bgImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&h=900&fit=crop"
        />

        {/* ─── SECCIÓN DE PROYECTOS ─── */}
        <section className="pt-16 sm:pt-20 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">

          {/* Cabecera editorial */}
          <div className="pb-6 border-b border-[#d8ceb6]/70 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#4a5a22]" />
              <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#4a5a22]">
                {t({ es: 'Portafolio', en: 'Portfolio' })}
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] tabular text-[#8a7e68]">
                &middot; {String(projects.length).padStart(2, '0')}{' '}
                {t({ es: 'iniciativas en ejecución', en: 'initiatives in progress' })}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-[1.12] max-w-2xl">
                {t({ es: 'Iniciativas emblemáticas con', en: 'Flagship initiatives with' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'resultados verificables.', en: 'verifiable results.' })}
                </span>
              </h2>
              <p className="text-xs sm:text-[13px] text-[#5c523e] font-light leading-relaxed max-w-sm">
                {t({
                  es: 'Cada proyecto opera con gobernanza local, rigor metodológico y métricas auditables en los territorios más vulnerables.',
                  en: 'Every project operates with local governance, methodological rigour and auditable metrics in the most vulnerable territories.',
                })}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Índice de proyectos */}
            <div className="lg:col-span-4">
              <div className="flex items-baseline justify-between pb-3 border-b border-[#2d2618]">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#2d2618]">
                  {t({ es: 'Índice de proyectos', en: 'Project index' })}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] tabular text-[#8a7e68]">
                  {projects.length} {t({ es: 'fichas', en: 'records' })}
                </span>
              </div>

              <div className="divide-y divide-[#d8ceb6] border-b border-[#d8ceb6]">
                {projects.map((proj, idx) => {
                  const isActive = activeProject === idx;
                  return (
                    <motion.button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveProject(idx)}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.45, delay: 0.045 * idx, ease: EASE }}
                      className={`group w-full text-left px-5 py-5 flex items-start gap-4 border-l-2 transition-colors duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#2d2618] border-l-[#4a5a22]'
                          : 'border-l-transparent hover:bg-[#eae4d2] hover:border-l-[#4a5a22]/40'
                      }`}
                    >
                      <span className={`shrink-0 w-10 h-10 flex items-center justify-center border font-serif text-[12px] tabular transition-colors duration-300 ${
                        isActive
                          ? 'border-[#a9bd6f]/60 text-[#f5efe3]'
                          : 'border-[#c9bb9c] text-[#6b6048] group-hover:border-[#4a5a22] group-hover:text-[#4a5a22]'
                      }`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className={`font-serif text-[17px] leading-snug transition-colors duration-300 ${
                          isActive ? 'text-[#f5efe3]' : 'text-[#2d2618]'
                        }`}>
                          {t(proj.title)}
                        </h3>

                        <div className="mt-2 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#a9bd6f]' : 'bg-[#4a5a22]'}`} />
                          <span className={`text-[10px] uppercase tracking-[0.16em] font-medium ${isActive ? 'text-[#c8bb98]' : 'text-[#8a7e68]'}`}>
                            {t(proj.status)}
                          </span>
                        </div>

                        <p className={`mt-2 text-[11px] leading-relaxed ${isActive ? 'text-[#ada08a]' : 'text-[#8a7e68]'}`}>
                          {t(proj.location)}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Ficha del Proyecto */}
            <div className="lg:col-span-8">
              <motion.article
                key={activeProject}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="border border-[#d8ceb6] bg-[#f5efe3]"
              >
                {/* Figura principal */}
                <figure className="border-b border-[#d8ceb6]">
                  <div className="h-56 sm:h-72 overflow-hidden">
                    <img src={p.img} alt={t(p.title)} className="w-full h-full object-cover" />
                  </div>
                  <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 sm:px-8 py-3 bg-[#eae4d2]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a7e68]">{t(p.location)}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] tabular font-medium text-[#4a5a22]">
                      {t({ es: 'Proyecto', en: 'Project' })} {p.id}
                    </span>
                  </figcaption>
                </figure>

                {/* Cabecera de la ficha */}
                <header className="px-5 sm:px-8 py-7 sm:py-9">
                  <h2 className="font-serif text-[28px] sm:text-[38px] leading-[1.08] text-[#2d2618]">{t(p.title)}</h2>
                  <p className="mt-3 font-serif italic text-[17px] sm:text-[19px] leading-snug text-[#4a5a22]">{t(p.subtitle)}</p>
                  <p className="mt-5 text-[13.5px] sm:text-[15px] leading-relaxed text-[#5c523e] max-w-2xl">{t(p.desc)}</p>
                </header>

                {/* Reto y solución, separados por filete vertical */}
                <div className="grid sm:grid-cols-2 border-t border-[#d8ceb6] divide-y divide-[#d8ceb6] sm:divide-y-0 sm:divide-x">
                  <div className="px-5 sm:px-8 py-6">
                    <div className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#4a5a22] mb-3">
                      {t({ es: 'Reto territorial', en: 'Territorial challenge' })}
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#5c523e]">{t(p.challenge)}</p>
                  </div>
                  <div className="px-5 sm:px-8 py-6">
                    <div className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#4a5a22] mb-3">
                      {t({ es: 'Solución aplicada', en: 'Applied solution' })}
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#5c523e]">{t(p.solution)}</p>
                  </div>
                </div>

                {/* Franja de indicadores */}
                <div className="grid sm:grid-cols-3 border-t border-[#d8ceb6] bg-[#eae4d2] divide-y divide-[#d8ceb6] sm:divide-y-0 sm:divide-x">
                  {p.metrics.map((m, idx) => (
                    <div key={idx} className="px-5 sm:px-6 py-6">
                      <div className="font-serif text-[30px] sm:text-[34px] leading-none text-[#334215] tabular">{m.val}</div>
                      <div className="mt-3 text-[11px] leading-snug text-[#7a6e58]">{t(m.label)}</div>
                    </div>
                  ))}
                </div>

                {/* Entregables */}
                <div className="px-5 sm:px-8 py-6 border-t border-[#d8ceb6]">
                  <div className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#4a5a22] mb-3">
                    {t({ es: 'Entregables verificables', en: 'Verifiable deliverables' })}
                  </div>
                  <ol className="divide-y divide-[#d8ceb6]">
                    {p.deliverables.map((d, i) => (
                      <li key={i} className="flex items-baseline gap-4 py-3">
                        <span className="shrink-0 w-5 font-serif text-[13px] tabular text-[#4a5a22]">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[13px] leading-relaxed text-[#5c523e]">{t(d)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.article>
            </div>
          </div>

          {/* ─── CIERRE EDITORIAL ─── */}
          <div className="mt-16 pt-8 border-t border-[#d8ceb6]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h3 className="font-serif text-2xl sm:text-[28px] text-[#2d2618] font-light leading-snug max-w-md">
              {t({ es: 'Proyectos que convierten el diagnóstico', en: 'Projects that turn diagnosis into' })} <br />
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'en resultados auditables.', en: 'auditable results.' })}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/agenda-2030"
                className="inline-flex items-center gap-2.5 bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>{t('nav.agenda2030')}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </Link>
              <Link
                to="/lineas-estrategicas"
                className="inline-flex items-center gap-2.5 border border-[#2d2618]/30 hover:border-[#4a5a22] text-[#2d2618] rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer"
              >
                <span>{t('nav.lineasEstrategicas')}</span>
                <svg className="w-3.5 h-3.5 text-[#4a5a22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
