import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_LUX = [0.16, 1, 0.3, 1];

export default function Communication() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  const filters = [
    { id: 'all', label: { es: 'Todo', en: 'All' } },
    { id: 'noticias', label: { es: 'Noticias', en: 'News' } },
    { id: 'eventos', label: { es: 'Eventos', en: 'Events' } },
    { id: 'opinion', label: { es: 'Opinión', en: 'Opinion' } },
    { id: 'dialogos', label: { es: 'Diálogos', en: 'Dialogues' } },
    { id: 'publicaciones', label: { es: 'Publicaciones', en: 'Publications' } },
  ];

  const featuredStory = {
    id: 'feat-1',
    type: 'noticias',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&fit=crop&auto=format',
    category: { es: 'COMUNICADO OFICIAL · GINEBRA / CDMX', en: 'OFFICIAL PRESS RELEASE · GENEVA / CDMX' },
    date: '04 Abril 2026',
    title: {
      es: 'El Consejo Global Ambiental suscribe acuerdo histórico de custodia biocultural con 14 pueblos originarios',
      en: 'The Global Environmental Council signs landmark biocultural custody agreement with 14 indigenous peoples',
    },
    summary: {
      es: 'El acuerdo formaliza la protección de más de 450,000 hectáreas de corredores biológicos estratégicos y garantiza la soberanía comunitaria sobre bancos de germoplasma y semillas criollas ante la crisis climática.',
      en: 'The agreement formalizes the protection of over 450,000 hectares of strategic biological corridors and guarantees community sovereignty over heirloom seed banks in the face of climate crisis.',
    },
    content: {
      es: 'En una sesión solemne celebrada con autoridades tradicionales y observadores de las Naciones Unidas, el Consejo Global Ambiental formalizó el mecanismo de financiamiento directo a comunidades custodias. Este protocolo reconoce el valor intangible de la preservación biológica y garantiza que los fondos de compensación climática lleguen sin intermediación burocrática a los territorios vivos.',
      en: 'In a solemn session held with traditional authorities and UN observers, the Global Environmental Council formalized direct funding mechanisms for steward communities.',
    },
    readTime: '5 min de lectura',
    author: 'Dirección de Prensa CGA',
  };

  const articles = [
    {
      id: 'art-2',
      type: 'opinion',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&fit=crop&auto=format',
      category: { es: 'TRIBUNA EDITORIAL', en: 'EDITORIAL ESSAY' },
      date: '28 Marzo 2026',
      title: {
        es: 'Más allá de los bonos de carbono: la urgencia de la integridad ecosistémica',
        en: 'Beyond Carbon Credits: The Urgency of Ecosystem Integrity',
      },
      summary: {
        es: 'Reflexión del Presidente Francisco Solorio sobre cómo evitar la mercantilización especulativa de los bosques y priorizar la resiliencia viva comunitaria frente a monocultivos arbóreos.',
        en: 'Reflection by President Francisco Solorio on preventing speculative forest commodification and prioritizing living community resilience over tree monocultures.',
      },
      content: {
        es: 'La compensación de emisiones no puede convertirse en un pase libre para seguir contaminando. Un bosque no es únicamente un sumidero de toneladas métricas de CO2; es una red intrincada de biodiversidad, agua dulce y memoria biocultural. Desde el CGA impulsamos créditos de biodiversidad verificados con métricas satelitales que exigen restauración real de especies nativas.',
        en: 'Carbon offsetting cannot become a free pass to continue polluting. A forest is not merely a carbon sink; it is an intricate web of biodiversity, freshwater and cultural heritage.',
      },
      readTime: '6 min de lectura',
      author: 'Dr. Francisco Solorio',
    },
    {
      id: 'art-3',
      type: 'dialogos',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&fit=crop&auto=format',
      category: { es: 'DIÁLOGOS CGA · EPISODIO 12', en: 'CGA DIALOGUES · EPISODE 12' },
      date: '15 Marzo 2026',
      title: {
        es: 'Voces de la Selva: Inteligencia Artificial y Sabiduría Ancestral',
        en: 'Voices of the Rainforest: Artificial Intelligence and Ancestral Wisdom',
      },
      summary: {
        es: 'Conversatorio en profundidad con tecnólogos geoespaciales y guardabosques sobre cómo las alertas satelitales en tiempo real empoderan a las brigadas ejidales en la detección de tala clandestina.',
        en: 'In-depth talk with geospatial engineers and park rangers on how real-time satellite alerts empower communal brigades to halt illegal logging.',
      },
      content: {
        es: 'En este episodio de Diálogos CGA, conversamos con la Dra. Astrid Lindholm y el Comisariado Ejidal de Calakmul sobre el despliegue de sensores acústicos solares e imágenes radar SAR para vigilar más de 200,000 hectáreas de selva tropical.',
        en: 'In this episode of CGA Dialogues, we speak with Dr. Astrid Lindholm and local rangers on deploying solar acoustic sensors and SAR radar imaging.',
      },
      readTime: 'Podcast & Video · 42 min',
      author: 'Producción Multimedia CGA',
    },
    {
      id: 'art-4',
      type: 'eventos',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&fit=crop&auto=format',
      category: { es: 'CUMBRE INTERNACIONAL · SUIZA', en: 'INTERNATIONAL SUMMIT · SWITZERLAND' },
      date: '18 - 21 Mayo 2026',
      title: {
        es: 'Foro Global de Gobernanza Ambiental, Cuencas y Diplomacia Climática en Ginebra',
        en: 'Global Environmental Governance, Watersheds & Climate Diplomacy Forum in Geneva',
      },
      summary: {
        es: 'Encuentro anual con ministros de medio ambiente, juristas supranacionales, directores de centros científicos y voceros comunitarios para consensuar la agenda internacional de resiliencia hídrica.',
        en: 'Annual meeting with ministers of environment, supranational jurists, scientific directors and community leaders to align international water resilience agendas.',
      },
      content: {
        es: 'El Palacio de las Naciones en Ginebra acogerá 16 paneles temáticos, presentaciones de casos de restauración biocultural y mesas redondas de financiamiento verde multilateral.',
        en: 'The Palais des Nations in Geneva will host 16 thematic panels, biocultural restoration case studies and multilateral green finance roundtables.',
      },
      readTime: 'Sede: Ginebra, Suiza',
      author: 'Comité Organizador CGA',
    },
    {
      id: 'art-5',
      type: 'publicaciones',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&fit=crop&auto=format',
      category: { es: 'COMPENDIO CIENTÍFICO · ACCESO ABIERTO', en: 'SCIENTIFIC COMPENDIUM · OPEN ACCESS' },
      date: 'Febrero 2026',
      title: {
        es: 'Informe Bianual de Conservación de Biomas y Captura de Carbono 2024-2026',
        en: 'Bi-Annual Biome Conservation and Carbon Sequestration Report 2024-2026',
      },
      summary: {
        es: 'Documento técnico con metodología abierta, mapas satelitales de alta resolución, índices de biomasa y resultados medibles en 9 cuencas prioritarias de México y América Latina.',
        en: 'Technical document with open methodology, high-resolution satellite maps, biomass indices and measurable outcomes across 9 priority watersheds.',
      },
      content: {
        es: 'Incluye 120 páginas de cartografía satelital, análisis de biodiversidad mediante eDNA (ADN ambiental) y lineamientos de política pública para la conservación de bosques templados y selvas bajas.',
        en: 'Includes 120 pages of satellite cartography, eDNA biodiversity analysis, and public policy guidelines for conservation.',
      },
      readTime: 'PDF Descargable · 18.4 MB',
      author: 'Comité Científico Editorial',
    },
    {
      id: 'art-6',
      type: 'noticias',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&fit=crop&auto=format',
      category: { es: 'ALIANZAS ESTRATÉGICAS', en: 'STRATEGIC PARTNERSHIPS' },
      date: '10 Febrero 2026',
      title: {
        es: 'Inauguración de la Red de Viveros Bioculturales de Alta Montaña',
        en: 'Inauguration of the High-Mountain Biocultural Nurseries Network',
      },
      summary: {
        es: 'Puesta en marcha de 8 centros comunitarios para la germinación y rescate de especies endémicas de pinos y oyameles resistentes a sequías extremas.',
        en: 'Launch of 8 community centers for the propagation and rescue of endemic pine and fir species resilient to severe droughts.',
      },
      content: {
        es: 'Con capacidad para producir más de 1.2 millones de plántulas al año, la red beneficia directamente a 32 comunidades ejidales y fortalece la recarga de mantos freáticos en la Sierra Madre.',
        en: 'With a capacity of 1.2M saplings per year, the network directly benefits 32 communal settlements and boosts aquifer recharge.',
      },
      readTime: '3 min de lectura',
      author: 'Dirección Territorial CGA',
    },
    {
      id: 'art-7',
      type: 'dialogos',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&fit=crop&auto=format',
      category: { es: 'DIÁLOGOS CGA · EPISODIO 11', en: 'CGA DIALOGUES · EPISODE 11' },
      date: '20 Enero 2026',
      title: {
        es: 'El Derecho Humano al Agua frente a la Privatización de Cuencas',
        en: 'The Human Right to Water vs. Watershed Privatization',
      },
      summary: {
        es: 'Mesa de diálogo con juristas internacionales y líderes defensores de ríos sobre litigios climáticos que frenaron concesiones mineras abusivas.',
        en: 'Panel with international jurists and river defenders on climate lawsuits that halted abusive mining concessions.',
      },
      content: {
        es: 'El Dr. Julien de Saint-Germain analiza la jurisprudencia de los Derechos de la Naturaleza y los precedentes donde los ríos son declarados sujetos de derechos.',
        en: 'Dr. Julien de Saint-Germain analyzes the jurisprudence of Rights of Nature where rivers are declared subjects of rights.',
      },
      readTime: 'Audio & Transcripción · 38 min',
      author: 'Área Jurídica CGA',
    },
    {
      id: 'art-8',
      type: 'publicaciones',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=900&fit=crop&auto=format',
      category: { es: 'GUÍA METODOLÓGICA', en: 'METHODOLOGICAL GUIDE' },
      date: 'Enero 2026',
      title: {
        es: 'Manual de Bancos Comunitarios de Semillas y Germoplasma Criollo',
        en: 'Handbook of Community Seed Banks & Heirloom Germplasm',
      },
      summary: {
        es: 'Manual práctico ilustrado para la recolección, selección, secado, almacenamiento hermético y catálogo genético de maíces y leguminosas nativas.',
        en: 'Illustrated practical handbook for collection, selection, drying, hermetic storage and genetic cataloguing of native crops.',
      },
      content: {
        es: 'Diseñado para productores agrícolas, escuelas rurales y comités ambientales. Disponible en español, inglés y lenguas originarias.',
        en: 'Designed for farmers, rural schools and environmental committees. Available in Spanish, English and indigenous languages.',
      },
      readTime: 'PDF Descargable · 8.2 MB',
      author: 'Dra. María Soledad Albarrán',
    },
  ];

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter((a) => a.type === activeFilter);

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite={{ es: 'Comunicación, Medios &', en: 'Communication, Media &' }}
        titleGreen={{ es: 'Publicaciones Oficiales', en: 'Official Publications' }}
        description={{
          es: 'Difusión científica de alto impacto, posicionamientos editoriales, comunicados oficiales, producción multimedia y la memoria viva del Consejo Global Ambiental.',
          en: 'High-impact scientific dissemination, editorial essays, official press releases, multimedia productions and the living archive of the Global Environmental Council.',
        }}
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop&auto=format"
      />

      <main className="py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-20 max-w-7xl mx-auto space-y-16">
        
        {/* ARTÍCULO DE PORTADA / LEAD FEATURED STORY (BENTO EDITORIAL) */}
        {activeFilter === 'all' && (
          <Reveal>
            <section className="relative rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* IMAGEN DE PORTADA (LIMPIA SIN LABELS) */}
                <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] overflow-hidden bg-[#2d2618]">
                  <img
                    src={featuredStory.image}
                    alt={t(featuredStory.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* CONTENIDO NARRATIVO */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4a5a22] font-light leading-[1.18] tracking-tight">
                      {t(featuredStory.title)}
                    </h2>

                    <p className="text-[#6b6048] font-light text-sm sm:text-base leading-relaxed">
                      {t(featuredStory.summary)}
                    </p>

                    <p className="text-xs font-sans text-[#8a7e68] font-medium tracking-wide">
                      {featuredStory.date}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#d8ceb6]/60 flex items-center justify-between">
                    <div className="text-xs text-[#8a7e68]">
                      <span className="font-semibold text-[#2d2618] block">{featuredStory.author}</span>
                      <span>{t({ es: 'Publicación Oficial CGA', en: 'Official CGA Release' })}</span>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(featuredStory)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                    >
                      <span>{t({ es: 'Leer Artículo', en: 'Read Story' })}</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        )}

        {/* SELECTOR DE FILTROS EN UNA SOLA LÍNEA SIN CLIPPING */}
        <section className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-sm">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`w-full py-2.5 px-2 rounded-xl text-xs sm:text-sm font-sans font-medium text-center transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#4a5a22] text-[#f5efe3] shadow-md font-semibold'
                    : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-[#f5efe3]/80'
                }`}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
        </section>

        {/* GRILLA EDITORIAL DE TARJETAS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filtered.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.05}>
              <article className="rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* IMAGEN DE LA TARJETA (LIMPIA SIN LABELS) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2d2618]">
                    <img
                      src={item.image}
                      alt={t(item.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* CUERPO EDITORIAL */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="font-serif text-2xl text-[#4a5a22] font-medium leading-snug group-hover:text-[#384519] transition-colors">
                      {t(item.title)}
                    </h3>

                    <p className="text-[#6b6048] text-xs sm:text-sm font-light leading-relaxed">
                      {t(item.summary)}
                    </p>

                    <p className="text-[11px] font-sans text-[#8a7e68] font-medium tracking-wide pt-1">
                      {item.date}
                    </p>
                  </div>
                </div>

                {/* PIE DE TARJETA CON AUTOR Y ACCIÓN */}
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#eae4d2] flex items-center justify-between">
                  <div className="text-[11px] text-[#8a7e68]">
                    <span className="font-medium text-[#2d2618] block">{item.author}</span>
                    <span>{item.readTime}</span>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4a5a22] hover:text-[#2d2618] transition-colors group-hover:underline"
                  >
                    <span>{item.type === 'publicaciones' ? t({ es: 'Descargar', en: 'Download' }) : t({ es: 'Leer más', en: 'Read more' })}</span>
                    <span className="translate-x-0 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </section>

        {/* SALA DE MEDIOS & PRENSA INTERNACIONAL */}
        <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#2d2618] text-[#f5efe3] shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a8bc65]">
                {t({ es: 'Sala de Prensa & Prensa Internacional', en: 'Press Room & International Media' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
                {t({ es: 'Recursos Oficiales para Periodistas e Investigadores', en: 'Official Resources for Journalists & Researchers' })}
              </h3>
              <p className="text-xs sm:text-sm text-[#d8ceb6] font-light leading-relaxed max-w-2xl">
                {t({
                  es: 'Accede a kits de prensa oficiales, semblanzas curriculares del Dr. Francisco Solorio, archivo fotográfico de alta resolución y acreditaciones para foros globales del CGA.',
                  en: 'Access official press kits, biographical profiles of Dr. Francisco Solorio, high-resolution media photography and credentials for CGA global summits.',
                })}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="mailto:prensa@consejoparaelambienteglobal.org"
                className="px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all text-center shadow-md"
              >
                {t({ es: 'Contactar a Prensa', en: 'Contact Press Office' })} &rarr;
              </a>
              <a
                href="#boletin"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('boletin')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-[#f5efe3]/10 hover:bg-[#f5efe3]/20 border border-white/20 text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-all text-center"
              >
                {t({ es: 'Suscribirse al Boletín', en: 'Subscribe to Dispatch' })}
              </a>
            </div>
          </div>
        </section>

        {/* SUSCRIPCIÓN AL BOLETÍN OFICIAL */}
        <section id="boletin" className="p-8 sm:p-12 rounded-3xl bg-[#eae4d2]/70 border border-[#d8ceb6] text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22]">
            {t({ es: 'Boletín Semanal CGA', en: 'CGA Weekly Dispatch' })}
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
            {t({ es: 'Suscríbete a nuestro boletín de análisis y convocatorias', en: 'Subscribe to our analysis and calls dispatch' })}
          </h4>
          <p className="text-xs sm:text-sm text-[#6b6048] max-w-lg mx-auto font-light leading-relaxed">
            {t({
              es: 'Recibe en tu correo las publicaciones científicas, análisis editoriales del Presidente y convocatorias a diplomados.',
              en: 'Receive scientific papers, presidential editorial essays and diploma calls directly in your inbox.',
            })}
          </p>

          {!subscribed ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <input
                required
                type="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder={t({ es: 'tu.correo@ejemplo.com', en: 'your.email@example.com' })}
                className="flex-1 px-5 py-3.5 rounded-full bg-[#f5efe3] border border-[#d8ceb6] text-xs sm:text-sm focus:outline-none focus:border-[#4a5a22] text-[#2d2618]"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                {t({ es: 'Suscribirme', en: 'Subscribe' })}
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-[#4a5a22]/10 text-[#4a5a22] font-semibold text-xs">
              ✓ {t({ es: '¡Gracias por suscribirte al boletín oficial del CGA!', en: 'Thank you for subscribing to the official CGA dispatch!' })}
            </div>
          )}
        </section>
      </main>

      {/* MODAL DETALLE DE ARTÍCULO / COMUNICADO */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2d2618]/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: EASE_LUX }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 sm:p-10 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] shadow-2xl text-[#2d2618]"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 text-xl text-[#6b6048] hover:text-[#2d2618]"
              >
                ✕
              </button>

              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-4 bg-[#2d2618]">
                  <img
                    src={selectedArticle.image}
                    alt={t(selectedArticle.title)}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#4a5a22]">
                    {t(selectedArticle.category)}
                  </span>
                  <span className="text-xs text-[#8a7e68]">{selectedArticle.date}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2d2618] leading-snug">
                  {t(selectedArticle.title)}
                </h3>

                <p className="text-sm text-[#4a5a22] font-semibold italic leading-relaxed">
                  {t(selectedArticle.summary)}
                </p>

                <div className="py-4 border-y border-[#eae4d2] text-xs sm:text-sm text-[#5c523e] font-light leading-relaxed space-y-3">
                  <p>{t(selectedArticle.content)}</p>
                  <p>
                    {t({
                      es: 'Para consultas adicionales sobre este documento o solicitar entrevistas institucionales, contacta a la oficina de prensa del Consejo Global Ambiental.',
                      en: 'For additional inquiries regarding this document or to request institutional interviews, contact the Global Environmental Council press office.',
                    })}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-[#8a7e68]">
                    <strong>{t({ es: 'Autor: ', en: 'Author: ' })}</strong>{selectedArticle.author} · {selectedArticle.readTime}
                  </div>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 rounded-full bg-[#2d2618] text-[#f5efe3] text-xs uppercase font-semibold tracking-wider hover:bg-[#4a5a22] transition-colors"
                  >
                    {t({ es: 'Cerrar', en: 'Close' })}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FooterNav />
    </div>
  );
}
