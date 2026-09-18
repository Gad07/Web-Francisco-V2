import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

export default function AnnualAssembly() {
  const [activeItem, setActiveItem] = useState(0);

  const agendaItems = [
    {
      num: "01",
      title: "Informe Anual de Actividades",
      short: "Balance institucional y auditoría de impacto",
      tag: "Rendición de Cuentas",
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
      tag: "Estrategia Territorial",
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
      tag: "Diplomacia Ambiental",
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
      tag: "Marco Jurídico",
      desc: "Formalización de compromisos estatutarios y normativos de observancia obligatoria para la presidencia, la secretaría ejecutiva y las consejerías honoríficas.",
      details: [
        "Votación nominal y registro formal de acuerdos en actas notariales.",
        "Emisión de mandatos ejecutivos para la dirección técnica.",
        "Publicación abierta e inmediata de resoluciones en el repositorio oficial."
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
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          tag="Órgano Máximo de Decisión"
          titleWhite="Asamblea Anual de"
          titleGreen="gobernanza y resultados"
          description="El espacio colegiado donde se aprueban las resoluciones estratégicas, se rinden cuentas públicas y se establecen las metas prioritarias para la protección socioambiental."
          bgImage="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1600&h=900&fit=crop"
        />

        {/* ─── CONSOLA INTERACTIVA: PUNTOS DEL ORDEN DEL DÍA ─── */}
        <section className="pt-16 sm:pt-20 pb-16 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">
          {/* Cabecera Editorial consistente con la web */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d8ceb6]/70 mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">
                Ejes de Deliberación
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-light text-[#2d2618] leading-[1.15]">
                Puntos del Orden del Día <br />
                <span className="italic text-[#4a5a22] font-normal">y dictámenes aprobados.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eae2ce] border border-[#d8ceb6] rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#3a4a18]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a4a18]" />
                <span>Sesión Ordinaria Plenaria</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#635741] font-light leading-relaxed lg:text-right">
                Selecciona cualquiera de los puntos de la agenda para consultar la memoria técnica, auditorías y acuerdos del pleno.
              </p>
            </div>
          </div>

          {/* Panel principal: tabs izquierda + detalle derecha con fondo olivo */}
          <div className="grid lg:grid-cols-12 border border-[#d8ceb6] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(45,38,24,0.08)] bg-white">

            {/* COLUMNA IZQUIERDA: TABS */}
            <div className="lg:col-span-4 border-r border-[#d8ceb6] flex flex-col bg-[#eae2ce] divide-y divide-[#dcd2bb]">
              {agendaItems.map((item, idx) => {
                const isActive = activeItem === idx;
                return (
                  <button
                    key={item.num}
                    onClick={() => setActiveItem(idx)}
                    className={`group w-full text-left px-6 py-6 flex-1 flex flex-col justify-center transition-all duration-200 relative cursor-pointer ${
                      isActive
                        ? 'bg-[#2d3a18] text-white border-l-4 border-l-[#a8c060]'
                        : 'bg-[#eae2ce] hover:bg-[#e2d8c0] text-[#221c12]'
                    }`}
                  >
                    <div className="flex items-start gap-4 pl-0.5">
                      <span className={`font-serif text-base font-bold shrink-0 mt-0.5 ${isActive ? 'text-[#a8c060]' : 'text-[#4a5a22]'}`}>
                        {item.num}
                      </span>
                      <div className="min-w-0">
                        <div className={`font-serif text-lg sm:text-[19px] leading-snug mb-1 transition-colors ${
                          isActive
                            ? 'text-white font-medium'
                            : 'text-[#221c12] font-normal group-hover:text-[#3a4a18]'
                        }`}>
                          {item.title}
                        </div>
                        <div className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                          isActive ? 'text-[#d4e4b2]' : 'text-[#635741]'
                        }`}>
                          {item.short}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* COLUMNA DERECHA: DETALLE CON FONDO Y DESVANECIDO OLIVO */}
            <div className="lg:col-span-8 relative overflow-hidden bg-[#2d3a18] min-h-[440px] flex flex-col justify-between">
              {/* Imagen de fondo con desvanecido olivo */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bg-${activeItem}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <img
                    src={agendaItems[activeItem].img}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Desvanecido Olivo institucional de derecha a izquierda */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to left, rgba(45,58,24,0.15) 0%, rgba(45,58,24,0.55) 30%, rgba(45,58,24,0.92) 60%, #2d3a18 80%)'
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Contenido en capa superior */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`agenda-detail-${activeItem}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between gap-5 w-full"
                >
                  {/* Cabecera limpia sin tags redundantes */}
                  <div className="space-y-2 max-w-[75%]">
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#ffffff] leading-tight">
                      {agendaItems[activeItem].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#e5decf] font-light leading-relaxed">
                      {agendaItems[activeItem].desc}
                    </p>
                  </div>

                  {/* Dictámenes */}
                  <div className="space-y-2.5 max-w-[75%]">
                    <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#b6cf6f]">
                      Dictámenes y Compromisos del Pleno
                    </div>
                    <div className="flex flex-col gap-2">
                      {agendaItems[activeItem].details.map((d, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#3a4a18]/70 border border-[#4d6322]/70 text-xs text-[#f5efe3] flex items-start gap-2.5 font-light leading-relaxed backdrop-blur-md"
                        >
                          <span className="text-[#a8c060] font-bold text-sm leading-none shrink-0">•</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Métricas y CTA en UNA SOLA LÍNEA */}
                  <div className="pt-4 border-t border-[#4d6322]/60 flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {agendaItems[activeItem].metrics.map((m, i) => (
                        <div key={i} className="text-center px-3.5 py-2 rounded-xl bg-[#3a4a18]/80 border border-[#4d6322]/70 backdrop-blur-md">
                          <div className="font-serif text-sm sm:text-base font-bold text-[#d4e8a0] leading-tight whitespace-nowrap">{m.val}</div>
                          <div className="text-[9px] text-[#c0caa8] uppercase tracking-wider mt-0.5 whitespace-nowrap">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/contacto"
                      className="px-5 py-2.5 bg-[#f5efe3] hover:bg-[#ffffff] text-[#2d3a18] rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm shrink-0 whitespace-nowrap cursor-pointer"
                    >
                      <span>Solicitar Relatoría</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ─── SECCIÓN DE MEMORIAS Y RESOLUCIONES HISTÓRICAS ─── */}
        <section className="pb-24 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">

          {/* Cabecera Editorial consistente */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d8ceb6]/70 mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#5a6b2a]">
                Memorias y Acuerdos
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-light text-[#2d2618] leading-[1.15]">
                Registro Histórico <br />
                <span className="italic text-[#4a5a22] font-normal">de resoluciones colegiadas.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eae2ce] border border-[#d8ceb6] rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#3a4a18]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a4a18]" />
                <span>Repositorio de Actas Notariadas</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#635741] font-light leading-relaxed lg:text-right">
                Línea de tiempo institucional y acceso público a los dictámenes y acuerdos aprobados en cada periodo de sesiones.
              </p>
            </div>
          </div>

          {/* Grid compacto de eventos */}
          <div className="grid md:grid-cols-3 gap-6">
            {assemblyEvents.map((evt) => (
              <div
                key={evt.year}
                className="group bg-white border border-[#d8ceb6] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(45,38,24,0.06)] hover:shadow-[0_12px_36px_rgba(45,38,24,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Cabecera del card con verde olivo institucional */}
                <div className="bg-[#2d3a18] px-6 py-5 flex items-center justify-between border-b border-[#3d4f20] relative">
                  <div>
                    <span className="font-serif text-3xl sm:text-4xl font-light text-[#f5efe3] tracking-tight block">
                      {evt.year}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-[#a8c060] font-semibold bg-[#3a4a18] border border-[#4d6322] px-2.5 py-1 rounded-md">
                      {evt.resolutionsCount}
                    </div>
                    <div className="text-[11px] text-[#c8d8a0] mt-1.5 font-light">
                      {evt.date}
                    </div>
                  </div>
                </div>

                {/* Cuerpo Editorial */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-[22px] font-normal text-[#221c12] leading-snug group-hover:text-[#3a4a18] transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#5c523e] font-light leading-relaxed bg-[#faf7f0] p-4 rounded-xl border border-[#ebe2d0]">
                      {evt.summary}
                    </p>
                  </div>

                  {/* Acuerdos Clave */}
                  <div className="pt-5 border-t border-[#e8dfcf] space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5a6b2a]">
                      Acuerdos Clave Dictaminados
                    </div>
                    <div className="space-y-2">
                      {evt.resolutions.map((res, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-[#4a4030] font-light leading-relaxed p-2 rounded-lg hover:bg-[#faf7f0] transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5a6b2a] mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
