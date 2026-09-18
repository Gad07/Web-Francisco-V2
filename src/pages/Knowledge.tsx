import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";

export default function Knowledge() {
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: gridRef, inView: gridInView } = useInView(0.05);

  const sections = [
    {
      num: "01",
      title: "Noticias y Pronunciamientos",
      desc: "Actividades institucionales, firmas de acuerdos multilaterales, eventos de alto nivel, posicionamientos públicos y avances de proyectos territoriales.",
      category: "Actualidad Institucional",
    },
    {
      num: "02",
      title: "Artículos de Opinión",
      desc: "Análisis y reflexiones firmadas por fundadores, consejeros honoríficos, investigadores aliados y especialistas en gobernanza ambiental.",
      category: "Debate & Perspectiva",
    },
    {
      num: "03",
      title: "Publicaciones Científicas",
      desc: "Artículos arbitrados, capítulos de libros, documentos de trabajo académico e investigaciones aplicadas con estricto rigor metodológico.",
      category: "Ciencia Arbitrada",
    },
    {
      num: "04",
      title: "Informes Técnicos y Dictámenes",
      desc: "Diagnósticos ecológicos, análisis de política pública, evaluaciones de impacto ambiental y manuales de procedimiento territorial descargables.",
      category: "Evidencia Aplicada",
    },
    {
      num: "05",
      title: "Recursos y Material Educativo",
      desc: "Guías metodológicas, infografías, manuales de capacitación comunitaria y memorias gráficas de nuestras intervenciones.",
      category: "Educación Ambiental",
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Centro editorial y"
        titleGreen="conocimiento especializado"
        description="Plataforma de divulgación, análisis técnico, ciencia aplicada y resultados verificables para la toma de decisiones ambientales."
        bgImage="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600&h=900&fit=crop"
      />

      {/* Intro */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center" ref={introRef}>
          <div
            style={{
              opacity: introInView ? 1 : 0,
              transform: introInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] mb-6 leading-tight font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rigor editorial y <br />
              <span className="text-neutral-700">divulgación transparente.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              El Consejo Global Ambiental organiza su acervo técnico y editorial distinguiendo claramente los niveles de validación científica, pronunciamiento institucional y material formativo para la ciudadanía.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Colecciones */}
      <section className="py-8 px-6 bg-white" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((sec, i) => (
              <div
                key={sec.title}
                className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm relative group hover:border-[#85C441] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  opacity: gridInView ? 1 : 0,
                  transform: gridInView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i % 3) * 0.1}s`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-display text-3xl md:text-4xl font-bold text-[#85C441]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sec.num}
                    </span>
                    <span
                      className="text-xs font-semibold px-3 py-1 bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {sec.category}
                    </span>
                  </div>

                  <h3
                    className="font-display text-xl text-neutral-700 mb-3 leading-snug font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {sec.title}
                  </h3>

                  <p
                    className="text-neutral-600 text-sm leading-relaxed font-sans font-normal mb-6"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <Link
                    to="/contacto"
                    className="text-xs text-[#85C441] font-bold hover:text-[#72ad34] transition-colors flex items-center gap-1.5"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span>Consultar acervo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Institucional */}
      <section className="pt-8 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs">
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] mb-5 font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Propuestas Editoriales y Académicas
          </h2>
          <p
            className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Invitamos a investigadores, consejeros y organizaciones a postular colaboraciones técnicas y artículos para nuestras series editoriales.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Enviar propuesta editorial</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
