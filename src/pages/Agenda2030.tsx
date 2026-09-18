import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";

export default function Agenda2030() {
  const [activeOdsIndex, setActiveOdsIndex] = useState<number>(0);

  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: odsRef, inView: odsInView } = useInView(0.05);
  const { ref: transversalRef, inView: transversalInView } = useInView(0.1);
  const { ref: methodRef, inView: methodInView } = useInView(0.05);

  const odsList = [
    {
      num: "02",
      category: "PRODUCCION",
      title: "Hambre Cero",
      tagline: "Soberanía alimentaria y agricultura biointensiva",
      desc: "Despliegue de agricultura biointensiva, huertos familiares y custodia de bancos de germoplasma criollo para garantizar la soberanía alimentaria comunitaria en zonas rurales y periurbanas.",
      scope: [
        "Red de 8 bancos comunitarios de semillas criollas",
        "Formación en biopreparados y manejo agroecológico",
        "Circuitos cortos de abasto y comercialización justa",
      ],
      stat: "16,890+",
      statLabel: "personas beneficiadas",
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "03",
      category: "PRODUCCION",
      title: "Salud y Bienestar",
      tagline: "Enfoque integral 'Una Salud' en territorio",
      desc: "Implementación del enfoque integral 'Una Salud', vinculando la salud ecosistémica, el trato digno a la fauna silvestre y el bienestar humano libre de contaminantes tóxicos.",
      scope: [
        "Erradicación de plaguicidas de alta peligrosidad",
        "Monitoreo biológico de fuentes de agua y suelo",
        "Programas de bioseguridad y bienestar animal rural",
      ],
      stat: "100%",
      statLabel: "libre de agroquímicos sintéticos",
      img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "04",
      category: "GOBERNANZA",
      title: "Educación de Calidad",
      tagline: "Alfabetización ecológica y escuelas de campo",
      desc: "Escuelas de campo comunitarias, alfabetización ecológica y formación de liderazgos juveniles para la defensa jurídica y técnica del medio ambiente en ejidos y comunidades.",
      scope: [
        "44 escuelas de campo agroecológicas activas",
        "Formación técnica para asambleas ejidales",
        "Diplomados de derecho ambiental aplicado",
      ],
      stat: "44",
      statLabel: "escuelas de campo implementadas",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "06",
      category: "BIOSFERA",
      title: "Agua Limpia y Saneamiento",
      tagline: "Bioingeniería y custodia de cuencas hidrológicas",
      desc: "Dictámenes periciales y bioingeniería para la preservación de cuencas hidrológicas, zonas lacustres de Xochimilco y mantos acuíferos metropolitanos de alta vulnerabilidad.",
      scope: [
        "Monitoreo de calidad y batimetría en canales",
        "Biofiltros con macrofitas acuáticas autóctonas",
        "Protección de zonas de recarga del acuífero",
      ],
      stat: "2,657 ha",
      statLabel: "en custodia pericial hidrológica",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "08",
      category: "PRODUCCION",
      title: "Trabajo Decente y Crecimiento",
      tagline: "Bioeconomía circular y cooperativas verdes",
      desc: "Impulso a la bioeconomía rural, creación de empleos verdes comunitarios y consolidación de cooperativas campesinas con alto valor agregado y certificación ambiental.",
      scope: [
        "Laboratorios comunitarios de bioinsumos",
        "Rutas agroturísticas bioculturales sostenibles",
        "Asesoría técnica para formalización comercial",
      ],
      stat: "12",
      statLabel: "cooperativas de bioinsumos activas",
      img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "11",
      category: "GOBERNANZA",
      title: "Ciudades y Comunidades Sostenibles",
      tagline: "Defensa jurídica del suelo de conservación",
      desc: "Defensa jurídica del suelo de conservación, ordenamiento ecológico del territorio y contención técnica de la mancha urbana en zonas de amortiguamiento ecológico.",
      scope: [
        "Peritajes en suelo de conservación de la CDMX",
        "Cartografía participativa de riesgos socioambientales",
        "Resolución pacífica de controversias ejidales",
      ],
      stat: "88,000 ha",
      statLabel: "bajo vigilancia técnica continua",
      img: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "12",
      category: "PRODUCCION",
      title: "Producción y Consumo Responsables",
      tagline: "Cierre de ciclos de nutrientes y residuo cero",
      desc: "Transición hacia economías circulares en cadenas productivas del campo, reducción de huella hídrica y aprovechamiento integral de biomasa residual sin desperdicios.",
      scope: [
        "Compostaje masivo de biomasa residual",
        "Sustitución integral de fertilizantes sintéticos",
        "Modelos de residuo cero en chinampas y parcelas",
      ],
      stat: "100%",
      statLabel: "de nutrientes recirculados",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "13",
      category: "BIOSFERA",
      title: "Acción por el Clima",
      tagline: "Adaptación ecosistémica y captura de carbono",
      desc: "Adaptación basada en ecosistemas, cuantificación de captura de carbono en biomasa forestal y fortalecimiento de la resiliencia comunitaria ante eventos hidrometeorológicos.",
      scope: [
        "Obras de captación e infiltración de agua pluvial",
        "Brigadas comunitarias de prevención de incendios",
        "Planes locales de acción climática territorial",
      ],
      stat: "420+ ha",
      statLabel: "con proyectos de captura de carbono",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "15",
      category: "BIOSFERA",
      title: "Vida de Ecosistemas Terrestres",
      tagline: "Regeneración de suelos y santuarios de polinizadores",
      desc: "Restauración ecológica de suelos degradados, custodia de corredores biológicos boscosos y establecimiento de reservas botánicas para polinizadores autóctonos.",
      scope: [
        "24 islas botánicas de flora melífera nativa",
        "Reforestación técnica con especies endémicas",
        "Regeneración microbiológica del horizonte edáfico",
      ],
      stat: "24",
      statLabel: "islas de polinizadores en operación",
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "16",
      category: "GOBERNANZA",
      title: "Paz, Justicia e Instituciones Sólidas",
      tagline: "Gobernanza participativa y dictámenes periciales",
      desc: "Gobernanza ambiental participativa, dictámenes periciales vinculantes ante tribunales, combate a delitos ambientales y salvaguarda de la legalidad de la tenencia social de la tierra.",
      scope: [
        "Dictámenes periciales en tribunales agrarios y civiles",
        "Acompañamiento legal a asambleas ejidales",
        "Transparencia y libre acceso a expedientes técnicos",
      ],
      stat: "100%",
      statLabel: "proyectos respaldados por asamblea",
      img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "17",
      category: "GOBERNANZA",
      title: "Alianzas para Lograr los Objetivos",
      tagline: "Diplomacia ambiental y articulación interinstitucional",
      desc: "Articulación multisectorial entre sociedad civil, academia, gobiernos de los tres órdenes e instituciones de cooperación internacional para catalizar financiamiento y rigor técnico.",
      scope: [
        "Consejo Consultivo con 30+ especialistas honoríficos",
        "Convenios de colaboración con universidades",
        "Mecanismos de cooperación técnica internacional",
      ],
      stat: "30+",
      statLabel: "aliados institucionales en red activa",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=900&fit=crop&auto=format",
    },
  ];

  const activeOds = odsList[activeOdsIndex] || odsList[0];

  const transversales = [
    {
      num: "01",
      title: "Fin de la Pobreza",
      concept: "Justicia Económica Rural",
      desc: "Protección de los medios de vida campesinos y fortalecimiento de economías locales para erradicar la vulnerabilidad económica ligada a la degradación ambiental.",
      points: [
        "Defensa de la propiedad comunitaria del suelo",
        "Circuitos de economía campesina sin intermediarios",
      ],
    },
    {
      num: "05",
      title: "Igualdad de Género",
      concept: "Liderazgo de Mujeres en Territorio",
      desc: "El 100% de las iniciativas de meliponicultura, bancos de germoplasma y huertos familiares son liderados activamente por comités de mujeres rurales.",
      points: [
        "Gobernanza paritaria en asambleas y proyectos",
        "Empoderamiento técnico y económico femenino",
      ],
    },
    {
      num: "10",
      title: "Reducción de Desigualdades",
      concept: "Equidad Territorial",
      desc: "Priorizamos la inversión técnica y el despliegue pericial en comunidades históricamente marginadas, cerrando brechas entre el centro y las periferias.",
      points: [
        "Cierre de brechas entre centro y periferias rurales",
        "Acceso universal a dictámenes técnicos periciales",
      ],
    },
  ];

  const methodSteps = [
    {
      num: "01",
      title: "Alineación ONU",
      subtitle: "Marco Multilateral & Indicadores",
      summary: "Identificación de metas e indicadores oficiales de la Agenda 2030 aplicables a la problemática regional concreta.",
      deliverable: "Matriz de correlación técnica ODS e indicadores de línea base.",
      tools: ["Estándares CEPAL / PNUMA", "Taxonomía de indicadores globales", "Mapeo de metas prioritarias"],
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "02",
      title: "Dictamen Pericial",
      subtitle: "Diagnóstico Científico en Campo",
      summary: "Levantamiento de línea base con muestreo físico-químico, batimetría y cartografía geoespacial de alta resolución.",
      deliverable: "Dictamen pericial colegiado con validez técnica y jurídica.",
      tools: ["Sistemas de Información Geográfica (SIG)", "Espectrometría y muestreo edáfico", "Batimetría y perfiles de agua"],
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "03",
      title: "Acuerdo Comunitario",
      subtitle: "Gobernanza y Legitimidad Social",
      summary: "Gobernanza participativa con asambleas ejidales, formalizando pactos de corresponsabilidad social y custodia territorial.",
      deliverable: "Acta asamblearia formal de corresponsabilidad y plan de manejo.",
      tools: ["Metodología de asamblea participativa", "Cartografía social del territorio", "Convenios de custodia comunitaria"],
      img: "https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "04",
      title: "Auditoría Abierta",
      subtitle: "Rendición de Cuentas y Trazabilidad",
      summary: "Publicación periódica de memorias técnicas, expedientes auditables y métricas de impacto verificables de libre consulta.",
      deliverable: "Expediente digital público con trazabilidad de indicadores.",
      tools: ["Plataforma de datos abiertos", "Monitoreo pericial recurrente", "Certificación de cumplimiento ODS"],
      img: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=900&fit=crop&auto=format",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Nuestra alineación con la"
        titleGreen="Agenda 2030 global"
        description="Los Objetivos de Desarrollo Sostenible traducidos en proyectos territoriales, indicadores auditables y rigor científico verificable."
        bgImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&h=900&fit=crop"
      />

      {/* Intro Editorial */}
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
              Metas globales para <br />
              <span className="text-neutral-700">soluciones territoriales.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Para el Consejo Global Ambiental, la Agenda 2030 no es una declaración simbólica; es una herramienta metodológica viva que estructura cada intervención técnica, cada dictamen y cada alianza territorial.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 1: 11 OBJETIVOS PRIORITARIOS
          Diseño Master-Detail: Lista Interactiva a la Izquierda + 
          Card Grande de Visualización a la Derecha
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white border-t border-neutral-100" ref={odsRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header de Sección */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#85C441] block mb-2 font-sans">
              Alineación Multilateral
            </span>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              11 Objetivos <span className="text-neutral-700">Prioritarios</span>
            </h2>
            <p
              className="text-neutral-600 text-base font-sans font-normal leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Selecciona un objetivo de la lista para ver su despliegue técnico, métricas e impacto en territorio.
            </p>
          </div>

          {/* Master-Detail Layout: Lista + Card Grande */}
          <div
            className="grid lg:grid-cols-12 gap-8 items-start"
            style={{
              opacity: odsInView ? 1 : 0,
              transform: odsInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Columna Izquierda: Lista Interactiva de ODS (Sin scroll interno) */}
            <div className="lg:col-span-5 flex flex-col gap-2.5 w-full">
              {odsList.map((ods, idx) => {
                const isSelected = activeOdsIndex === idx;
                return (
                  <button
                    key={ods.num}
                    type="button"
                    onClick={() => setActiveOdsIndex(idx)}
                    onMouseEnter={() => setActiveOdsIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#85C441] border-[#85C441] text-white shadow-lg translate-x-1"
                        : "bg-neutral-50/80 border-neutral-200/80 text-neutral-600 hover:bg-[#85C441] hover:border-[#85C441] hover:text-white hover:shadow-md hover:translate-x-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center font-display text-base flex-shrink-0 transition-all ${
                          isSelected
                            ? "bg-white text-[#85C441] shadow-md"
                            : "bg-white border border-neutral-200 text-[#85C441] group-hover:bg-white group-hover:text-[#85C441] group-hover:border-white shadow-xs"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {ods.num}
                      </span>
                      <div className="min-w-0 pr-2">
                        <h4
                          className={`font-display text-base font-bold leading-tight truncate transition-colors ${
                            isSelected ? "text-white" : "text-neutral-600 group-hover:text-white"
                          }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {ods.title}
                        </h4>
                        <span
                          className={`text-xs font-sans block truncate mt-0.5 transition-colors ${
                            isSelected ? "text-white/90" : "text-neutral-400 group-hover:text-white/90"
                          }`}
                        >
                          {ods.tagline}
                        </span>
                      </div>
                    </div>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`flex-shrink-0 transition-all duration-300 ${
                        isSelected
                          ? "text-white translate-x-1"
                          : "text-neutral-300 group-hover:text-white group-hover:translate-x-0.5"
                      }`}
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                );
              })}
            </div>

            {/* Columna Derecha: Card Grande que muestra el ODS Seleccionado (Fondo Blanco, Simplificada) */}
            <div className="lg:col-span-7 sticky top-24">
              <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-xl overflow-hidden relative text-neutral-800 flex flex-col justify-between">
                {/* Imagen de fondo con gradiente */}
                <div className="relative h-60 lg:h-64 overflow-hidden flex-shrink-0">
                  <img
                    src={activeOds.img}
                    alt={activeOds.title}
                    className="w-full h-full object-cover transition-all duration-700 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Título en la Imagen */}
                  <div className="absolute bottom-4 inset-x-6">
                    <span className="text-xs uppercase tracking-widest text-[#85C441] font-bold block mb-1 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {activeOds.tagline}
                    </span>
                    <h3
                      className="font-display text-3xl md:text-4xl text-white font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeOds.title}
                    </h3>
                  </div>
                </div>

                {/* Contenido Limpio y Directo */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <p
                    className="text-neutral-600 font-sans font-normal text-sm md:text-base leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {activeOds.desc}
                  </p>

                  {/* Footer de la Card con Métrica y Botón */}
                  <div className="pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-sans">
                        Impacto territorial
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl md:text-3xl font-bold text-[#85C441]">
                          {activeOds.stat}
                        </span>
                        <span className="text-xs text-neutral-500 font-sans">
                          {activeOds.statLabel}
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/proyectos"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold text-xs transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Ver proyectos vinculados</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ejes Transversales de Equidad (ODS 1, 5, 10) */}
      <section className="py-20 px-6 bg-neutral-50/70 border-t border-neutral-100" ref={transversalRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] mb-4 font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ejes Transversales <span className="text-neutral-700">de Equidad</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-5" />
            <p className="text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
              De forma obligatoria, todas las intervenciones del Consejo integran tres principios rectores de derechos humanos e inclusión social.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transversales.map((item, idx) => (
              <div
                key={item.num}
                className="relative p-8 rounded-3xl bg-white border border-neutral-200/80 hover:shadow-xl hover:border-[#85C441]/60 transition-all duration-500 flex flex-col justify-between group"
                style={{
                  opacity: transversalInView ? 1 : 0,
                  transform: transversalInView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.12}s`,
                }}
              >
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <h3
                      className="font-display text-xl md:text-2xl text-neutral-700 font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="font-display text-3xl text-[#85C441] font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.num}
                    </span>
                  </div>

                  <h4
                    className="font-display text-base text-[#85C441] mb-3 font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.concept}
                  </h4>

                  <p
                    className="text-neutral-600 font-sans font-normal leading-relaxed text-xs sm:text-sm mb-6"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-100 space-y-2.5">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#85C441]/15 text-[#85C441] flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs font-sans text-neutral-700 font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 2: DE LA META GLOBAL AL PERITAJE EN CAMPO
          Ruta Metodológica Conectada (4 Etapas en Grid de Proceso)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-neutral-50/60 border-t border-neutral-100 overflow-hidden" ref={methodRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header de Metodología */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#85C441] block mb-2 font-sans">
              Cadena de Custodia Técnica
            </span>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              De la Meta Global <span className="text-neutral-700">al Peritaje en Campo</span>
            </h2>
            <p
              className="text-neutral-600 text-base font-sans font-normal leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              La ruta metodológica secuencial que garantiza trazabilidad, legitimidad asamblearia y rigor probatorio en cada intervención territorial.
            </p>
          </div>

          {/* Línea de Proceso Conectada Superior (Visible en Desktop) */}
          <div className="hidden lg:flex items-center justify-between mb-8 px-4">
            {methodSteps.map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-full bg-[#85C441] text-white font-bold text-xs flex items-center justify-center font-display shadow-xs"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-neutral-700 font-sans">
                    {step.title}
                  </span>
                </div>
                {idx < methodSteps.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-[#85C441]/80 to-neutral-200" />
                )}
              </div>
            ))}
          </div>

          {/* Grid de 4 Tarjetas de Metodología Conectadas */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{
              opacity: methodInView ? 1 : 0,
              transform: methodInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {methodSteps.map((step, idx) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl hover:border-[#85C441] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group"
              >
                {/* Cabecera con Imagen */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Número de Etapa */}
                  <span
                    className="absolute top-3 left-4 font-display text-3xl font-bold text-[#85C441] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.num}
                  </span>

                  <div className="absolute bottom-3 inset-x-4">
                    <span className="text-[11px] uppercase tracking-wider text-[#85C441] font-bold block mb-0.5 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {step.subtitle}
                    </span>
                    <h3
                      className="font-display text-lg font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-neutral-600 text-xs font-sans font-normal leading-relaxed mb-4">
                      {step.summary}
                    </p>

                    {/* Entregable Técnico Vinculante */}
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-4 group-hover:border-[#85C441]/40 transition-colors">
                      <span className="text-[10px] uppercase tracking-wider text-[#85C441] font-bold block mb-1 font-sans">
                        Entregable Técnico:
                      </span>
                      <p className="text-xs text-neutral-700 font-sans font-medium leading-snug">
                        {step.deliverable}
                      </p>
                    </div>

                    {/* Herramientas e Instrumentos */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block font-sans">
                        Herramientas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {step.tools.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[11px] text-neutral-600 font-sans border border-neutral-200/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Institucional */}
      <section className="py-20 px-6 bg-neutral-50/80 border-t border-neutral-200/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] mb-5 font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Monitoreo y Evidencia Territorial
          </h2>
          <p
            className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Generamos dictámenes periódicos de alineación y cumplimiento de metas ODS para gobiernos locales, empresas y organismos internacionales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span>Solicitar asesoría técnica</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>

            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full font-bold transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span>Ver proyectos territoriales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
