import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";

export default function StrategicLines() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: gridRef, inView: gridInView } = useInView(0.05);
  const { ref: methodRef, inView: methodInView } = useInView(0.1);

  const categories = [
    { id: "ALL", label: "Todas las Líneas" },
    { id: "CLIMA", label: "Clima & Ecosistemas" },
    { id: "GOBERNANZA", label: "Gobernanza & Legalidad" },
    { id: "PRODUCCION", label: "Producción & Bienestar" },
  ];

  const lines = [
    {
      id: "01",
      category: "GOBERNANZA",
      title: "Gobernanza ambiental y política pública",
      desc: "Agendas estratégicas, marcos de coordinación institucional, análisis regulatorio, dictámenes técnicos e incidencia pública ante los tres órdenes de gobierno, alineada a los ODS 16 y 17.",
      scope: ["Análisis regulatorio y normativo", "Incidencia ante poderes públicos", "Dictámenes técnicos vinculantes"],
      img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "02",
      category: "CLIMA",
      title: "Cambio climático, resiliencia y transición sostenible",
      desc: "Mitigación, adaptación territorial, soluciones basadas en la naturaleza, gestión integral de riesgos y fortalecimiento de capacidades climáticas vinculadas a los ODS 7, 11 y 13.",
      scope: ["Modelos de adaptación climática", "Soluciones basadas en la naturaleza", "Gestión territorial del riesgo"],
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "03",
      category: "CLIMA",
      title: "Conservación, restauración y biodiversidad",
      desc: "Protección de ecosistemas prioritarios, regeneración de suelos, cuencas hídricas, corredores biológicos y preservación de especies nativas bajo los ODS 6, 14 y 15.",
      scope: ["Restauración integral de cuencas", "Custodia de corredores biológicos", "Protección de flora y fauna nativa"],
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "04",
      category: "GOBERNANZA",
      title: "Territorio, legalidad y cohesión social",
      desc: "Defensa del suelo de conservación, ordenamiento territorial ecológico, prevención de delitos ambientales y apropiación comunitaria en el marco de los ODS 11 y 16.",
      scope: ["Defensa del suelo de conservación", "Ordenamiento ecológico comunitario", "Prevención de ilícitos ambientales"],
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "05",
      category: "GOBERNANZA",
      title: "Agenda 2030 y Objetivos de Desarrollo Sostenible",
      desc: "Integración transversal de los ODS en planes de desarrollo, sistemas de monitoreo, indicadores verificables y rendición de cuentas con enfoque transversal en el ODS 17.",
      scope: ["Alineación transversal de planes", "Sistemas de monitoreo e indicadores", "Auditoría de cumplimiento ODS"],
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "06",
      category: "PRODUCCION",
      title: "Sistemas productivos y seguridad alimentaria",
      desc: "Transición agroecológica, economía circular en cadenas productivas rurales, mercados justos y programas para la soberanía alimentaria conforme a los ODS 2, 8 y 12.",
      scope: ["Transición agroecológica", "Cadenas de valor circulares", "Soberanía alimentaria comunitaria"],
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "07",
      category: "PRODUCCION",
      title: "Sostenibilidad y responsabilidad empresarial",
      desc: "Estrategias de sostenibilidad corporativa (ESG), debida diligencia ambiental, innovación tecnológica y alianzas público-privadas orientadas a los ODS 8, 9 y 12.",
      scope: ["Métricas ESG de alto estándar", "Debida diligencia ambiental", "Alianzas público-privadas verdes"],
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "08",
      category: "PRODUCCION",
      title: "Educación ambiental, ciencia y juventudes",
      desc: "Divulgación científica, programas de formación ambiental comunitaria, impulso a liderazgos jóvenes e investigación aplicada en concordancia con los ODS 4, 10 y 13.",
      scope: ["Formación técnica comunitaria", "Liderazgos juveniles climáticos", "Investigación científica aplicada"],
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "09",
      category: "PRODUCCION",
      title: "Bienestar animal y enfoque Una Salud",
      desc: "Trato digno, protección y bienestar animal vinculados a la salud pública, la integridad de los ecosistemas y la coexistencia armónica bajo los ODS 3, 11 y 15.",
      scope: ["Protocolos de bienestar animal", "Integración 'Una Salud' ecosistémica", "Bioseguridad y coexistencia"],
      img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "10",
      category: "CLIMA",
      title: "Cooperación internacional y participación social",
      desc: "Diplomacia ambiental, intercambio de mejores prácticas entre países, fondos multilaterales y articulación ciudadana paritaria en cumplimiento de los ODS 5, 10 y 17.",
      scope: ["Diplomacia ambiental multilateral", "Atracción de fondos verdes", "Mesas de diálogo internacional"],
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&auto=format",
    }
  ];

  const filteredLines =
    selectedCategory === "ALL"
      ? lines
      : lines.filter((l) => l.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Nuestros campos de"
        titleGreen="actuación estratégica"
        description="Diez líneas de trabajo especializadas para abordar los desafíos climáticos, ecológicos y territoriales desde una perspectiva técnica e integral."
        bgImage="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&h=900&fit=crop"
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
              Diez ejes de impacto <br />
              <span className="text-neutral-700">para transformar realidades.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Cada línea de actuación está respaldada por una consejería honorífica y un equipo técnico especializado, asegurando rigor científico, viabilidad jurídica y pertinencia territorial en cada proyecto.
            </p>
          </div>
        </div>
      </section>

      {/* Selector de Categorías */}
      <section className="pt-2 pb-10 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-[#85C441] text-white shadow-md scale-105"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid Fotográfico de las 10 Líneas Estratégicas */}
      <section className="py-6 px-6 bg-white" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredLines.map((line, i) => (
              <div
                key={line.id}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group"
                style={{
                  opacity: gridInView ? 1 : 0,
                  transform: gridInView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i % 3) * 0.1}s`,
                }}
              >
                {/* Imagen de Cabecera (Limpia, sin floating pills) */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={line.img}
                    alt={line.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Número de Línea */}
                  <span
                    className="absolute top-4 left-4 font-display text-3xl font-bold text-[#85C441] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {line.id}
                  </span>

                  {/* Título en la Imagen */}
                  <div className="absolute bottom-4 inset-x-4">
                    <h3
                      className="font-display text-lg font-bold text-white leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {line.title}
                    </h3>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Descripción con ODS integrado de forma natural */}
                    <p className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed mb-4">
                      {line.desc}
                    </p>

                    {/* Alcances y Ejes de Acción */}
                    <div className="space-y-1.5 mb-6">
                      {line.scope.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#85C441] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enlaces de Acción */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      to="/proyectos"
                      className="text-xs font-bold text-[#85C441] hover:text-[#72ad34] transition-colors flex items-center gap-1.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Ver proyectos activos</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>

                    <Link
                      to="/gobernanza"
                      className="text-[11px] font-semibold text-neutral-400 hover:text-[#85C441] transition-colors"
                    >
                      Consejería asignada
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Módulo de Metodología y Rigor Técnico */}
      <section className="py-16 px-6 bg-white" ref={methodRef}>
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              opacity: methodInView ? 1 : 0,
              transform: methodInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
            className="p-8 md:p-12 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <span
                  className="font-display text-4xl md:text-5xl font-bold text-[#85C441] block mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  100%
                </span>
                <h4 className="font-display text-lg font-bold text-neutral-700 mb-1">
                  Rigor Científico Colegiado
                </h4>
                <p className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Cada iniciativa es dictaminada por consejeros honoríficos con acreditación académica e investigación de campo.
                </p>
              </div>

              <div>
                <span
                  className="font-display text-4xl md:text-5xl font-bold text-[#85C441] block mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Territorial
                </span>
                <h4 className="font-display text-lg font-bold text-neutral-700 mb-1">
                  Incidencia Directa en Suelo
                </h4>
                <p className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Convenios directos con ejidos, comunidades y custodios para la defensa real del patrimonio ambiental.
                </p>
              </div>

              <div>
                <span
                  className="font-display text-4xl md:text-5xl font-bold text-[#85C441] block mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ODS
                </span>
                <h4 className="font-display text-lg font-bold text-neutral-700 mb-1">
                  Alineación Agenda 2030
                </h4>
                <p className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Métricas e indicadores auditables que reportan avances cuantitativos ante organismos multilaterales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Institucional */}
      <section className="pt-2 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs">
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] mb-5 font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Colabora en una línea de acción
          </h2>
          <p className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            Invitamos a instituciones públicas, organismos multilaterales, universidades y empresas a sumarse a nuestras líneas estratégicas mediante proyectos con impacto territorial verificable.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Vincular mi institución</span>
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
