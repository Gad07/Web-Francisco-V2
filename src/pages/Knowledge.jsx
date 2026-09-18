import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

export default function Knowledge() {
  const sections = [
    {
      num: "01",
      title: "Noticias y Pronunciamientos",
      desc: "Actividades institucionales, firmas de acuerdos multilaterales, eventos de alto nivel, posicionamientos públicos y avances de proyectos territoriales.",
      category: "Actualidad Institucional",
      count: "18 Publicaciones"
    },
    {
      num: "02",
      title: "Artículos de Opinión",
      desc: "Análisis y reflexiones firmadas por fundadores, consejeros honoríficos, investigadores aliados y especialistas en gobernanza ambiental.",
      category: "Debate & Perspectiva",
      count: "24 Artículos"
    },
    {
      num: "03",
      title: "Publicaciones Científicas",
      desc: "Artículos arbitrados, capítulos de libros, documentos de trabajo académico e investigaciones aplicadas con estricto rigor metodológico.",
      category: "Ciencia Arbitrada",
      count: "12 Documentos"
    },
    {
      num: "04",
      title: "Informes Técnicos y Dictámenes",
      desc: "Diagnósticos ecológicos, análisis de política pública, evaluaciones de impacto ambiental y manuales de procedimiento territorial descargables.",
      category: "Evidencia Aplicada",
      count: "30 Reportes"
    },
    {
      num: "05",
      title: "Recursos y Material Educativo",
      desc: "Guías metodológicas, infografías, manuales de capacitación comunitaria y memorias gráficas de nuestras intervenciones.",
      category: "Educación Ambiental",
      count: "15 Guías"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          tag="Repositorio Institucional"
          titleWhite="Centro de conocimiento e"
          titleGreen="investigación ambiental"
          description="Explora nuestros artículos científicos, dictámenes técnicos, reportes territoriales y material educativo de acceso abierto."
          bgImage="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600&h=900&fit=crop"
        />

        {/* Grid de Secciones */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map(s => (
              <div
                key={s.num}
                className="p-8 rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] hover:border-[#4a5a22]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#eae4d2] text-[#4a5a22] border border-[#d8ceb6] font-semibold">
                      {s.category}
                    </span>
                    <span className="font-serif text-[#4a5a22] text-lg font-bold">{s.num}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#2d2618] font-light mb-4">{s.title}</h3>
                  <p className="text-xs text-[#6b6048] font-light leading-relaxed mb-6">{s.desc}</p>
                </div>

                <div className="pt-4 border-t border-[#d8ceb6] flex items-center justify-between">
                  <span className="text-xs text-[#7a6e58] font-medium">{s.count}</span>
                  <span className="text-xs text-[#4a5a22] font-bold group-hover:translate-x-1 transition-transform cursor-pointer">Acceder al acervo &rarr;</span>
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
