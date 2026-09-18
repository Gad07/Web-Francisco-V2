import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";

export default function AnnualAssembly() {
  const [activeAgenda, setActiveAgenda] = useState<number | null>(null);
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: agendaRef, inView: agendaInView } = useInView(0.1);
  const { ref: docRef, inView: docInView } = useInView(0.1);

  const agendaItems = [
    {
      num: "01",
      title: "Informe Anual de Actividades",
      short: "Balance institucional y auditoría de impacto",
      desc: "Evaluación transparente, cuantitativa y cualitativa de los resultados alcanzados durante el periodo en todos los territorios de incidencia directa del Consejo.",
      details: [
        "Auditoría técnica de impacto socioambiental en los programas activos.",
        "Rendición de cuentas sobre la asignación de recursos y fondos multilaterales.",
        "Evaluación del cumplimiento de metas operativas por consejería especializada."
      ],
      metrics: [
        { label: "Transparencia", val: "100%" },
        { label: "Dictámenes", val: "24+" },
        { label: "Territorios", val: "10 Zonas" }
      ],
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=800&fit=crop&auto=format",
    },
    {
      num: "02",
      title: "Definición de Prioridades Territoriales",
      short: "Focos de emergencia y asignación directa",
      desc: "Establecimiento de las líneas de acción estratégicas, focos de emergencia ambiental y asignación de programas directos sobre el suelo de conservación.",
      details: [
        "Mapeo de zonas críticas para restauración de cuencas y biodiversidad.",
        "Asignación prioritaria de brigadas y equipos técnicos en campo.",
        "Articulación de acuerdos directos con ejidos, comunidades y custodios."
      ],
      metrics: [
        { label: "Líneas Estratégicas", val: "10" },
        { label: "Ecosistemas", val: "8 Clave" },
        { label: "Comunidades", val: "35+" }
      ],
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&h=800&fit=crop&auto=format",
    },
    {
      num: "03",
      title: "Directrices de Cooperación Internacional",
      short: "Validación de acuerdos multilaterales",
      desc: "Validación colegiada de acuerdos multilaterales, convenios con organismos globales, agencias de desarrollo y misiones diplomáticas ambientales.",
      details: [
        "Formalización de agendas conjuntas con agencias multilaterales.",
        "Integración de protocolos de cooperación y financiamiento verde.",
        "Intercambio de mejores prácticas científicas y marcos comparados."
      ],
      metrics: [
        { label: "Organismos", val: "12+" },
        { label: "Misiones", val: "6" },
        { label: "Convenios", val: "15" }
      ],
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&h=800&fit=crop&auto=format",
    },
    {
      num: "04",
      title: "Adopción de Resoluciones Vinculantes",
      short: "Compromisos estatutarios y mandatos",
      desc: "Formalización de compromisos estatutarios y normativos de observancia obligatoria para la presidencia, la secretaría ejecutiva y las consejerías honoríficas.",
      details: [
        "Votación nominal y registro formal de acuerdos en actas.",
        "Emisión de mandatos ejecutivos para la dirección técnica.",
        "Publicación abierta e inmediata de resoluciones en el repositorio."
      ],
      metrics: [
        { label: "Resoluciones", val: "100%" },
        { label: "Quórum", val: "Calificado" },
        { label: "Publicidad", val: "Irrestricta" }
      ],
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&h=800&fit=crop&auto=format",
    }
  ];

  const assemblyEvents = [
    {
      year: "2025",
      title: "Consolidación Territorial y Despliegue de las 10 Líneas",
      date: "14 de Noviembre, 2025",
      resolutionsCount: "18 Resoluciones Aprobadas",
      summary: "Sesión Ordinaria Plenaria celebrada con el 100% de consejerías acreditadas. Se realizó la evaluación integral del primer ciclo operativo, ratificación de alianzas multilaterales y aprobación unánime de los programas de restauración para cuencas prioritarias.",
      resolutions: [
        "Aprobación del Programa de Restauración Ecosistémica 2026-2030.",
        "Ratificación formal de convenios técnicos con 6 agencias de desarrollo internacional.",
        "Dictamen favorable e irrestricto de la auditoría de impacto socioambiental."
      ]
    },
    {
      year: "2024",
      title: "Incorporación de Consejerías Honoríficas y Marco 'Una Salud'",
      date: "22 de Octubre, 2024",
      resolutionsCount: "12 Resoluciones Aprobadas",
      summary: "Sesión Extraordinaria de Gobernanza con la participación del pleno constitutivo y asesores internacionales. Se formalizó el modelo de consejerías colegiadas y la integración del enfoque 'Una Salud' como eje rector en la evaluación de proyectos.",
      resolutions: [
        "Institucionalización de las 10 Consejerías Honoríficas Especializadas.",
        "Adopción del protocolo de bioseguridad y bienestar animal en territorio.",
        "Aprobación del reglamento de transparencia y rendición de cuentas."
      ]
    },
    {
      year: "2023",
      title: "Estatutos del Consejo Global Ambiental y Agenda 2030",
      date: "08 de Diciembre, 2023",
      resolutionsCount: "Acta Constitutiva Formalizada",
      summary: "Sesión Fundacional del Consejo efectuada con el liderazgo fundador y socios estratégicos. Se llevó a cabo la suscripción del acta constitutiva, promulgación de estatutos y trazado del plan quinquenal de acción ambiental.",
      resolutions: [
        "Promulgación de los Estatutos Fundacionales del Consejo Global Ambiental.",
        "Designación formal de la Presidencia y de la Secretaría Ejecutiva.",
        "Definición y registro de las 10 Líneas Temáticas Estratégicas."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Asamblea anual de"
        titleGreen="resultados estratégicos"
        description="El espacio colegiado de evaluación institucional, rendición pública de cuentas y definición de prioridades territoriales."
        bgImage="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1600&h=900&fit=crop"
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
              Evaluación colegiada y <br />
              <span className="text-neutral-700">visión de futuro.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              La Asamblea Anual reúne al liderazgo fundador, a los integrantes de las consejerías honoríficas y a aliados estratégicos para deliberar con independencia técnica y trazar las metas del Consejo Global Ambiental.
            </p>
          </div>
        </div>
      </section>

      {/* Consola Interactiva: Ejes de Deliberación (FOTOS COMPLETAS + TRASLACIÓN MORPH) */}
      <section className="pt-4 pb-20 px-6 bg-white" ref={agendaRef}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 max-w-3xl">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ejes de Deliberación
            </h2>
            <p
              className="text-neutral-600 text-sm md:text-base font-sans font-normal leading-relaxed mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Temas centrales y resoluciones aprobadas por el pleno del Consejo.
            </p>
            <p
              className="text-neutral-400 text-xs md:text-sm font-sans font-light"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Haz clic sobre cualquiera de las tarjetas para desplegar su desglose técnico, dictámenes y métricas de impacto.
            </p>
          </div>

          {/* Contenedor Persistente con Animación Tipo PowerPoint Morph */}
          <div className="relative overflow-hidden min-h-[520px] md:h-[520px]">
            {/* VISTA 1: 4 TARJETAS INICIALES (Cuando activeAgenda === null) */}
            <div
              className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 h-full items-stretch transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${activeAgenda === null
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none absolute inset-0 -translate-x-12"
                }`}
            >
              {agendaItems.map((item, i) => (
                <div
                  key={item.num}
                  onClick={() => setActiveAgenda(i)}
                  className="relative rounded-3xl overflow-hidden shadow-lg h-[460px] md:h-[520px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient y Datos de la Tarjeta */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7 z-10 text-white">
                    <span
                      className="font-display text-3xl font-bold text-[#85C441] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.num}
                    </span>

                    <div>
                      <div className="absolute bottom-0 inset-x-0 h-[68%] bg-gradient-to-t from-black via-black/85 to-transparent -z-10" />
                      <h3
                        className="font-display text-lg md:text-xl text-white font-bold mb-1.5 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-white/90 text-xs font-sans font-normal leading-relaxed mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] line-clamp-2"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {item.short}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#85C441] group-hover:text-white transition-colors pt-3 border-t border-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        <span>Ver dictámenes y métricas</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VISTA 2: VISTA EXPANDIDA MORPH / TRANSLATE (Cuando activeAgenda !== null) */}
            <div
              className={`grid md:grid-cols-2 gap-8 h-full items-stretch transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${activeAgenda !== null
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none absolute inset-0 translate-x-12"
                }`}
            >
              {/* Columna Izquierda: Foto Limpia del Eje Activo + Botón Regresar */}
              {activeAgenda !== null && (
                <div className="relative rounded-3xl overflow-hidden shadow-lg h-[460px] md:h-[520px]">
                  <img
                    src={agendaItems[activeAgenda].img}
                    alt={agendaItems[activeAgenda].title}
                    className="w-full h-full object-cover"
                  />

                  {/* Botón flotante para regresar en verde claro */}
                  <button
                    type="button"
                    onClick={() => setActiveAgenda(null)}
                    className="absolute top-6 left-6 px-4 py-2.5 rounded-xl bg-[#85C441] hover:bg-[#72ad34] text-white text-xs font-bold flex items-center gap-2 transition-all duration-300 shadow-xl cursor-pointer"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Regresar</span>
                  </button>

                  <div className="absolute bottom-6 left-6 z-10">
                    <span
                      className="font-display text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Eje {agendaItems[activeAgenda].num}
                    </span>
                  </div>
                </div>
              )}

              {/* Columna Derecha: Panel Blanco de Detalle Técnico (Sin Scroll) */}
              {activeAgenda !== null && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-200/80 flex flex-col justify-between overflow-hidden h-[460px] md:h-[520px]">
                  <div className="flex flex-col justify-between flex-1 min-h-0">
                    {/* Título del Eje con Animación Translate */}
                    <div
                      key={`eje-detail-title-${activeAgenda}`}
                      style={{
                        animation: "slideInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
                      }}
                      className="mb-3"
                    >
                      <h3
                        className="font-display text-2xl md:text-3xl text-[#85C441] font-bold mb-1 leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {agendaItems[activeAgenda].title}
                      </h3>
                      <p className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wide font-sans">
                        {agendaItems[activeAgenda].short}
                      </p>
                    </div>

                    {/* Descripción y Acciones del Eje */}
                    <div
                      key={`eje-detail-desc-${activeAgenda}`}
                      style={{
                        animation: "slideInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both",
                      }}
                      className="mb-3 flex-1"
                    >
                      <p className="text-neutral-600 text-xs sm:text-[13px] font-sans font-normal leading-relaxed bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80 mb-3">
                        {agendaItems[activeAgenda].desc}
                      </p>

                      <h4 className="text-xs uppercase tracking-wider text-[#85C441] font-bold mb-2 font-sans">
                        Dictámenes y Compromisos del Pleno
                      </h4>
                      <div className="space-y-1.5">
                        {agendaItems[activeAgenda].details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#85C441] mt-1.5 flex-shrink-0" />
                            <span className="text-neutral-600 text-xs font-sans font-normal leading-snug">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Barra de Métricas y Enlace */}
                  <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="grid grid-cols-3 gap-2 w-full sm:w-auto flex-1">
                      {agendaItems[activeAgenda].metrics.map((m, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-neutral-50 text-center border border-neutral-200/80">
                          <span
                            className="font-display text-sm md:text-base font-bold text-[#85C441] block leading-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {m.val}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/contacto"
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#85C441] text-white rounded-xl font-semibold hover:bg-[#72ad34] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Solicitar Relatoría</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Memorias y Acuerdos: Timeline Estilo Home (Con Selector de Año y Watermark de Fondo) */}
      <section className="py-24 px-6 relative bg-white overflow-hidden" ref={docRef}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Columna Izquierda (Sticky con Selector de Año) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32" style={{ fontFamily: "var(--font-sans)" }}>
              <p className="text-sm tracking-[0.2em] uppercase mb-4 text-[#85C441] font-bold">
                Memorias y Acuerdos
              </p>
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] mb-6 leading-tight font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Registro de <br />
                <span className="text-neutral-700">resoluciones</span>
              </h2>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-8 font-light">
                Línea de tiempo institucional y acceso público irrestricto a los dictámenes, actas notariales y relatorías aprobadas por el pleno.
              </p>
              <div className="w-16 h-1.5 bg-[#85C441] rounded-full"></div>
            </div>
          </div>

          {/* Columna Derecha (Timeline con Efecto Watermark idéntico al Home) */}
          <div className="w-full lg:w-2/3">
            <div className="relative border-l-2 border-[#85C441]/30 pl-8 md:pl-16 space-y-24 py-8">
              {assemblyEvents.map((evt, i) => (
                <div
                  key={evt.year}
                  className="relative group"
                  style={{
                    opacity: docInView ? 1 : 0,
                    transform: docInView ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                  }}
                >
                  {/* Punto en la línea de tiempo con Hover Zoom */}
                  <div className="absolute -left-[41px] md:-left-[73px] top-6 w-5 h-5 rounded-full bg-white border-[4px] border-[#85C441] group-hover:scale-125 transition-all duration-500 shadow-sm z-10" />

                  {/* Contenido del evento */}
                  <div className="transform transition-transform duration-500 group-hover:translate-x-3">
                    <div className="relative">
                      {/* Año de fondo (Efecto Watermark de Home) */}
                      <span
                        className="block font-display text-7xl md:text-9xl font-bold opacity-15 text-[#85C441] transition-opacity duration-500 group-hover:opacity-30 select-none -ml-2 md:-ml-4 mb-[-20px] md:mb-[-40px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {evt.year}
                      </span>

                      {/* Título del Evento */}
                      <h3
                        className="relative z-10 text-2xl md:text-3xl font-display text-neutral-700 font-bold leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {evt.title}
                      </h3>

                      {/* Fecha debajo del título */}
                      <p
                        className="relative z-10 text-xs md:text-sm font-semibold text-[#85C441] mt-1.5 mb-4 font-sans tracking-wide"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {evt.date}
                      </p>
                    </div>

                    {/* Descripción */}
                    <p
                      className="text-neutral-600 text-base leading-relaxed font-sans max-w-2xl font-light mb-5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {evt.summary}
                    </p>

                    {/* Resoluciones aprobadas */}
                    <div className="space-y-2 mb-6 max-w-2xl">
                      <span className="text-xs uppercase tracking-wider text-[#85C441] font-bold block mb-2 font-sans">
                        Resoluciones ({evt.resolutionsCount}):
                      </span>
                      {evt.resolutions.map((res, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-sans">
                          <svg
                            className="w-4 h-4 text-[#85C441] mt-0.5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>

                    {/* Botón de solicitud de relatoría */}
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-xl font-bold text-xs transition-all duration-300 shadow-xs hover:shadow-md"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Solicitar Relatoría de {evt.year}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Módulo Integrado de Cierre: Convocatoria & Repositorio */}
      <section className="pt-2 pb-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Tarjeta 1: Próxima Sesión */}
          <div className="p-8 md:p-10 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h3
                className="font-display text-2xl md:text-3xl text-neutral-700 font-bold mb-3 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Próxima Sesión Ordinaria
              </h3>
              <p className="text-neutral-600 text-sm font-sans font-normal leading-relaxed mb-6">
                Las instituciones acreditadas, delegaciones diplomáticas y observadores de la sociedad civil pueden solicitar su registro para las sesiones plenarias públicas del Consejo.
              </p>
            </div>
            <div>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-xl font-bold text-xs transition-all duration-300 shadow-md"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span>Acreditar delegación</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Tarjeta 2: Repositorio y Transparencia */}
          <div className="p-8 md:p-10 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h3
                className="font-display text-2xl md:text-3xl text-neutral-700 font-bold mb-3 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Repositorio de Actas y Dictámenes
              </h3>
              <p className="text-neutral-600 text-sm font-sans font-normal leading-relaxed mb-6">
                En cumplimiento estricto de nuestro código de integridad institucional, las síntesis ejecutivas y relatorías de acuerdos se encuentran permanentemente disponibles para consulta social.
              </p>
            </div>
            <div>
              <Link
                to="/conocimiento"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-xl font-bold text-xs transition-all duration-300 shadow-xs"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span>Consultar Archivo Histórico</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
