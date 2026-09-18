import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";

export default function About() {
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.1);
  const { ref: principlesRef, inView: principlesInView } = useInView(0.1);
  const { ref: ecosystemRef, inView: ecosystemInView } = useInView(0.1);

  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const principles = [
    {
      num: "01",
      title: "Rigor científico y jurídico",
      desc: "Todas nuestras acciones y propuestas se sustentan en evidencia empírica, análisis normativo y metodologías validadas internacionalmente.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "02",
      title: "Gobernanza y corresponsabilidad",
      desc: "Fomentamos el diálogo constructivo entre gobiernos, academia, sector productivo y comunidades territoriales.",
      img: "https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "03",
      title: "Acción territorial medible",
      desc: "Priorizamos el trabajo en campo con indicadores de impacto verificables, trazabilidad y resultados directos.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "04",
      title: "Cooperación internacional",
      desc: "Conectamos capacidades globales con las necesidades y dinámicas socioculturales de cada territorio.",
      img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "05",
      title: "Inclusión intergeneracional",
      desc: "Garantizamos la participación equitativa de juventudes, pueblos originarios y sectores en situación de vulnerabilidad.",
      img: "https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "06",
      title: "Integridad y transparencia",
      desc: "Rendición de cuentas continua, ética pública y comunicación veraz sobre cada programa desarrollado.",
      img: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "07",
      title: "Respeto a la vida y Una Salud",
      desc: "Defendemos el bienestar animal, la integridad ecosistémica y la salud humana como un equilibrio indivisible.",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format",
    },
  ];

  const audiences = [
    {
      title: "Gobiernos y Estados",
      role: "Políticas públicas, ordenamiento ecológico territorial y acuerdos interinstitucionales vinculantes.",
      tag: "Articulación Pública",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"/>
        </svg>
      ),
    },
    {
      title: "Academia e Investigación",
      role: "Generación de ciencia aplicada, dictámenes técnicos independientes y rigor metodológico internacional.",
      tag: "Evidencia y Ciencia",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
    },
    {
      title: "Sector Privado y ESG",
      role: "Inversión responsable, descarbonización de cadenas de valor y transición hacia modelos regenerativos.",
      tag: "Criterios ESG & Valor",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      title: "Comunidades y Ejidos",
      role: "Defensa del territorio, gestión comunitaria del agua, saberes ancestrales y manejo forestal.",
      tag: "Gobernanza Territorial",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      title: "Juventudes y Líderes",
      role: "Participación activa con sustento técnico, formación diplomática socioambiental y relevo generacional.",
      tag: "Inclusión y Relevo",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
    {
      title: "Organismos Internacionales",
      role: "Cooperación técnica global, financiamiento climático multilateral y alineación a la Agenda 2030.",
      tag: "Alianzas Globales",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Identidad y"
        titleGreen="misión institucional"
        description="Conoce los principios que guían nuestra acción y nuestro compromiso con el desarrollo sostenible en los territorios."
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-20 px-6 relative bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div
            ref={introRef}
            className="grid lg:grid-cols-12 gap-12 items-center"
            style={{
              opacity: introInView ? 1 : 0,
              transform: introInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="lg:col-span-7">
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] mb-6 leading-[1.15] font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Construyendo puentes entre <br />
                <span className="text-neutral-700">ciencia, política y territorio.</span>
              </h2>
              <div className="w-20 h-1 bg-[#85C441] rounded-full mb-8" />
              <p
                className="text-neutral-600 text-lg md:text-xl leading-relaxed font-sans font-normal"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                El Consejo Global Ambiental actúa como una plataforma internacional de conocimiento, cooperación y acción. Convocamos a líderes y sectores estratégicos para formular propuestas, acompañar proyectos y generar incidencia pública frente a los desafíos climáticos más apremiantes de nuestro tiempo.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-8 md:p-12 min-h-[520px] lg:min-h-[560px] flex flex-col justify-end text-white border border-neutral-200/80 shadow-xl overflow-hidden group">
                {/* Imagen de fondo */}
                <img
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&h=1600&fit=crop&auto=format"
                  alt="Naturaleza y conservación ambiental"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

                {/* Contenido */}
                <div className="relative z-10 pt-16">
                  <h3
                    className="font-display text-2xl md:text-3xl text-white mb-3 leading-tight font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Un organismo al servicio del bien común ambiental
                  </h3>
                  <p className="text-white/90 font-sans font-normal text-xs sm:text-sm leading-relaxed mb-5">
                    Transformamos los acuerdos diplomáticos y el debate especializado en acciones tangibles que protegen la biodiversidad, regeneran cuencas y empoderan a las comunidades locales.
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/20 text-xs text-[#85C441] font-bold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#85C441]"></span>
                    <span>Incidencia activa y proyectos estratégicos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="py-20 px-6 bg-white border-t border-neutral-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto" ref={cardsRef}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] mb-6 font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Hacia dónde <span className="text-neutral-700">caminamos</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Misión Card */}
            <div
              className="relative p-8 md:p-12 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 hover:shadow-xl transition-all duration-500 flex flex-col justify-between shadow-xs group"
              style={{
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h3
                    className="font-display text-2xl md:text-3xl text-neutral-700 font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Misión
                  </h3>
                  <span
                    className="font-display text-3xl md:text-4xl text-[#85C441] font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    01
                  </span>
                </div>

                <h4
                  className="font-display text-lg md:text-xl text-[#85C441] mb-3 leading-snug font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Proteger el medio ambiente e impulsar la acción climática.
                </h4>

                <p
                  className="text-neutral-600 font-sans font-normal leading-relaxed text-sm md:text-base mb-6"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Mediante la gobernanza ambiental, la cooperación técnica internacional, la ciencia y la educación ambiental; articulando a instituciones públicas, comunidades y sectores productivos para contribuir a la Agenda 2030 con impactos territoriales verificables.
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-200/70 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#85C441]/15 text-[#85C441] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-sans text-neutral-700 font-medium">Gobernanza ambiental y cooperación técnica interinstitucional</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#85C441]/15 text-[#85C441] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-sans text-neutral-700 font-medium">Impacto directo en comunidades territoriales y ecosistemas</span>
                </div>
              </div>
            </div>

            {/* Visión Card */}
            <div
              className="relative p-8 md:p-12 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 hover:shadow-xl transition-all duration-500 flex flex-col justify-between shadow-xs group"
              style={{
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h3
                    className="font-display text-2xl md:text-3xl text-neutral-700 font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Visión 2030
                  </h3>
                  <span
                    className="font-display text-3xl md:text-4xl text-[#85C441] font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    02
                  </span>
                </div>

                <h4
                  className="font-display text-lg md:text-xl text-[#85C441] mb-3 leading-snug font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ser un organismo internacional de referencia en gobernanza ambiental.
                </h4>

                <p
                  className="text-neutral-600 font-sans font-normal leading-relaxed text-sm md:text-base mb-6"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Reconocidos por transformar el conocimiento, los acuerdos institucionales y la participación social en soluciones directas en México, Colombia, Canadá, España, Costa Rica y el mundo.
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-200/70 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#85C441]/15 text-[#85C441] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-sans text-neutral-700 font-medium">Presencia activa y proyectos conjuntos en naciones estratégicas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#85C441]/15 text-[#85C441] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-sans text-neutral-700 font-medium">Soluciones basadas en la naturaleza con métricas de la Agenda 2030</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principios Section - Expanding Interactive Accordion */}
      <section className="py-20 px-6 bg-white overflow-hidden" ref={principlesRef}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#85C441] font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Principios <span className="text-neutral-700">Institucionales</span>
            </h2>
            <p
              className="text-neutral-600 text-sm md:text-base font-sans font-normal leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Haz clic o pasa el cursor por cada pilar para desplegar su fundamentación técnica y marco de acción territorial.
            </p>
          </div>

          {/* Acordeón Expandible de 7 Principios */}
          <div
            className="flex flex-col lg:flex-row gap-3 min-h-[580px] lg:h-[500px] w-full rounded-3xl p-3 bg-white border border-neutral-200/80 shadow-md"
            style={{
              opacity: principlesInView ? 1 : 0,
              transform: principlesInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {principles.map((p, i) => {
              const isActive = activePrinciple === i;
              return (
                <div
                  key={p.num}
                  onMouseEnter={() => setActivePrinciple(i)}
                  onClick={() => setActivePrinciple(i)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex-grow,transform] ${isActive
                    ? "lg:flex-[6] flex-[4] min-h-[380px] lg:min-h-0 bg-neutral-900 border border-[#85C441] shadow-xl"
                    : "lg:flex-[1] flex-[1] min-h-[56px] lg:min-h-0 bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-[#85C441]/60 hover:shadow-md"
                    }`}
                >
                  {/* Imagen de fondo con zoom fluido */}
                  <img
                    src={p.img}
                    alt={p.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${isActive ? "scale-105 opacity-100" : "scale-100 opacity-0 pointer-events-none"
                      }`}
                  />
                  {/* Gradiente oscuro suave */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40 transition-opacity duration-700 pointer-events-none ${isActive ? "opacity-100" : "opacity-0"
                      }`}
                  />

                  {/* Estado Colapsado */}
                  <div
                    className={`absolute inset-0 z-10 w-full h-full flex lg:flex-col items-center justify-between p-3 lg:py-6 transition-opacity duration-300 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                  >
                    <div className="flex-shrink-0">
                      <span
                        className="font-display text-base lg:text-lg font-bold text-[#85C441]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.num}
                      </span>
                    </div>

                    {/* Texto vertical estilizado en desktop */}
                    <div className="hidden lg:flex flex-1 items-center justify-center overflow-hidden py-3">
                      <span
                        className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-neutral-700 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 select-none"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {p.title}
                      </span>
                    </div>

                    {/* Texto horizontal en mobile */}
                    <span className="lg:hidden font-sans text-xs text-neutral-700 font-semibold truncate px-3 flex-1 text-center">
                      {p.title}
                    </span>

                    <div className="flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#85C441] block" />
                    </div>
                  </div>

                  {/* Estado Expandido */}
                  <div
                    className={`absolute inset-0 z-10 p-6 md:p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 ease-out ${isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                  >
                    {/* Header superior con número y tag */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/15">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-10 h-10 rounded-full bg-[#85C441]/25 border border-[#85C441] text-[#85C441] font-bold flex items-center justify-center font-display text-base shadow-md"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {p.num}
                        </span>
                        <span className="text-xs text-white/90 uppercase tracking-widest font-sans font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#85C441] animate-pulse"></span>
                          Principio Rector Institucional
                        </span>
                      </div>
                      <span className="text-sm text-[#85C441] font-semibold tracking-wider font-mono">
                        0{i + 1} / 07
                      </span>
                    </div>

                    {/* Cuerpo central: Título y descripción */}
                    <div className="my-auto py-4">
                      <h3
                        className="font-display text-2xl md:text-3xl lg:text-4xl text-[#85C441] mb-3 leading-snug font-bold"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.title}
                      </h3>

                      <p
                        className="text-white font-sans font-normal text-sm md:text-base leading-relaxed max-w-2xl"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {p.desc}
                      </p>
                    </div>

                    {/* Footer sutil */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70 font-sans">
                      <span>Marco Estratégico 2026–2030</span>
                      <span className="text-[#85C441] font-medium">Consejo Global Ambiental</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ecosistema de Colaboración */}
      <section className="py-20 px-6 bg-white border-t border-neutral-100" ref={ecosystemRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header de sección */}
          <div
            className="max-w-3xl mx-auto text-center mb-16"
            style={{
              opacity: ecosystemInView ? 1 : 0,
              transform: ecosystemInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] mb-4 font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ecosistema de <span className="text-neutral-700">Colaboración</span>
            </h2>
            <p
              className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Unimos capacidades técnicas, rigor científico y visión territorial con los sectores clave para acelerar la sostenibilidad y la gobernanza ambiental.
            </p>
          </div>

          {/* Grid de 6 Sectores */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            style={{
              opacity: ecosystemInView ? 1 : 0,
              transform: ecosystemInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            {audiences.map((aud, idx) => (
              <div
                key={aud.title}
                className="group relative bg-white border border-neutral-200/80 rounded-2xl p-7 hover:border-[#85C441] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  transitionDelay: `${idx * 40}ms`,
                }}
              >
                <div>
                  {/* Top Bar del Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#85C441]/10 text-[#85C441] group-hover:bg-[#85C441] group-hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0">
                      {aud.icon}
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {aud.tag}
                    </span>
                  </div>

                  {/* Título */}
                  <h3
                    className="font-display text-xl text-neutral-700 font-bold mb-3 transition-colors group-hover:text-[#85C441]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {aud.title}
                  </h3>

                  {/* Descripción / Rol */}
                  <p
                    className="text-neutral-600 font-sans font-normal text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {aud.role}
                  </p>
                </div>

                {/* Micro indicador inferior */}
                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#85C441]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#85C441]"></span>
                  <span>Alianza estratégica activa</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner Institucional */}
          <div
            className="rounded-3xl bg-neutral-50/80 border border-neutral-200/80 p-8 md:p-12 text-center shadow-xs"
            style={{
              opacity: ecosystemInView ? 1 : 0,
              transform: ecosystemInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <div className="max-w-2xl mx-auto">
              <h3
                className="font-display text-2xl md:text-3xl lg:text-4xl text-[#85C441] mb-4 leading-tight font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ¿Listo para articular proyectos y sumar voluntades?
              </h3>
              <p
                className="text-neutral-600 font-sans font-normal text-base md:text-lg mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Integra a tu institución, empresa, comunidad o equipo científico en nuestras mesas técnicas y proyectos territoriales conjuntos.
              </p>

              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span>Sumar voluntades</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
