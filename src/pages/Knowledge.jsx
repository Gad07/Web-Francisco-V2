import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function Knowledge() {
  const { t } = useI18n();

  const sections = [
    {
      num: '01',
      title: {
        es: 'Noticias y Pronunciamientos',
        en: 'News and Statements',
      },
      desc: {
        es: 'Actividades institucionales, firmas de acuerdos multilaterales, eventos de alto nivel, posicionamientos públicos y avances de proyectos territoriales.',
        en: 'Institutional activities, multilateral agreement signings, high-level events, public positions and progress on territorial projects.',
      },
      category: {
        es: 'Actualidad Institucional',
        en: 'Institutional News',
      },
      count: {
        es: '18 Publicaciones',
        en: '18 Publications',
      },
    },
    {
      num: '02',
      title: {
        es: 'Artículos de Opinión',
        en: 'Opinion Articles',
      },
      desc: {
        es: 'Análisis y reflexiones firmadas por fundadores, consejeros honoríficos, investigadores aliados y especialistas en gobernanza ambiental.',
        en: 'Analysis and reflections signed by founders, honorary councillors, partner researchers and specialists in environmental governance.',
      },
      category: {
        es: 'Debate & Perspectiva',
        en: 'Debate & Perspective',
      },
      count: {
        es: '24 Artículos',
        en: '24 Articles',
      },
    },
    {
      num: '03',
      title: {
        es: 'Publicaciones Científicas',
        en: 'Scientific Publications',
      },
      desc: {
        es: 'Artículos arbitrados, capítulos de libros, documentos de trabajo académico e investigaciones aplicadas con estricto rigor metodológico.',
        en: 'Peer-reviewed articles, book chapters, academic working papers and applied research held to strict methodological standards.',
      },
      category: {
        es: 'Ciencia Arbitrada',
        en: 'Peer-reviewed Science',
      },
      count: {
        es: '12 Documentos',
        en: '12 Documents',
      },
    },
    {
      num: '04',
      title: {
        es: 'Informes Técnicos y Dictámenes',
        en: 'Technical Reports and Opinions',
      },
      desc: {
        es: 'Diagnósticos ecológicos, análisis de política pública, evaluaciones de impacto ambiental y manuales de procedimiento territorial descargables.',
        en: 'Ecological diagnostics, public policy analysis, environmental impact assessments and downloadable territorial procedure manuals.',
      },
      category: {
        es: 'Evidencia Aplicada',
        en: 'Applied Evidence',
      },
      count: {
        es: '30 Reportes',
        en: '30 Reports',
      },
    },
    {
      num: '05',
      title: {
        es: 'Recursos y Material Educativo',
        en: 'Resources and Educational Material',
      },
      desc: {
        es: 'Guías metodológicas, infografías, manuales de capacitación comunitaria y memorias gráficas de nuestras intervenciones.',
        en: 'Methodological guides, infographics, community training manuals and graphic records of our field interventions.',
      },
      category: {
        es: 'Educación Ambiental',
        en: 'Environmental Education',
      },
      count: {
        es: '15 Guías',
        en: '15 Guides',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Centro de conocimiento e', en: 'Knowledge and' }}
          titleGreen={{ es: 'investigación ambiental', en: 'environmental research' }}
          description={{
            es: 'Explora nuestros artículos científicos, dictámenes técnicos, reportes territoriales y material educativo de acceso abierto.',
            en: 'Explore our scientific articles, technical opinions, territorial reports and open access educational material.',
          }}
          bgImage="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600&h=900&fit=crop"
        />

        {/* Grid de Secciones */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((s) => (
              <div
                key={s.num}
                className="p-8 rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] hover:border-[#4a5a22]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#eae4d2] text-[#4a5a22] border border-[#d8ceb6] font-semibold">
                      {t(s.category)}
                    </span>
                    <span className="font-serif text-[#4a5a22] text-lg font-bold">{s.num}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#2d2618] font-light mb-4">{t(s.title)}</h3>
                  <p className="text-xs text-[#6b6048] font-light leading-relaxed mb-6">{t(s.desc)}</p>
                </div>

                <div className="pt-4 border-t border-[#d8ceb6] flex items-center justify-between">
                  <span className="text-xs text-[#7a6e58] font-medium">{t(s.count)}</span>
                  <span className="text-xs text-[#4a5a22] font-bold group-hover:translate-x-1 transition-transform cursor-pointer">
                    {t({ es: 'Acceder al acervo', en: 'Access the collection' })} &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
