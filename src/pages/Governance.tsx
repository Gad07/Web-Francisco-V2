import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";
import franciscoSolorioImg from "../imports/Perfiles/FranciscoSolorio.png";

export default function Governance() {
  const [activeLeader, setActiveLeader] = useState<number | null>(null);
  const [activeCouncil, setActiveCouncil] = useState<number | null>(null);
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: leadRef, inView: leadInView } = useInView(0.1);
  const { ref: councilRef, inView: councilInView } = useInView(0.1);

  const leadership = [
    {
      num: "01",
      name: "Mtro. Luis García González",
      role: "Consejero Presidente y Fundador",
      tag: "Presidencia & Estrategia",
      bio: "Con amplia experiencia en liderazgo institucional y gobernanza ambiental estratégica. Ha impulsado diálogos de alto nivel, articulación con organismos multilaterales y la consolidación de marcos normativos y territoriales en favor de la sostenibilidad y la regeneración ecosistémica.",
      responsibilities: [
        "Conducción institucional y representación de alto nivel ante organismos internacionales.",
        "Orientación estratégica de la agenda ambiental, científica y territorial.",
        "Presidencia de la Asamblea Anual y articulación de acuerdos multilaterales.",
        "Supervisión del cumplimiento de los principios y estatutos del Consejo."
      ],
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        email: "presidencia@consejocga.org"
      },
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&auto=format",
    },
    {
      num: "02",
      name: "Mtro. Francisco Solorio",
      role: "Secretario Ejecutivo y Fundador",
      tag: "Dirección Ejecutiva & Alianzas",
      bio: "Especialista en gestión técnica, cooperación territorial y alianzas público-privadas para la acción ambiental. Encabeza el despliegue operativo en campo, la articulación con ejidos y comunidades, y la implementación rigurosa de proyectos socioambientales.",
      responsibilities: [
        "Dirección ejecutiva, gestión técnica y coordinación operativa general.",
        "Cooperación institucional e internacional con aliados estratégicos.",
        "Acompañamiento en territorio y desarrollo de proyectos sostenibles.",
        "Seguimiento a resoluciones y vinculación interinstitucional."
      ],
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        email: "secretaria@consejocga.org"
      },
      img: franciscoSolorioImg,
    }
  ];

  const council = [
    {
      name: "Dr. Carlos Esquivel Lacroix",
      role: "Consejero Honorífico",
      area: "Bienestar Animal y Una Salud",
      bio: "Especialista en bienestar animal y medicina veterinaria con amplia trayectoria internacional. Orienta las iniciativas que vinculan el trato digno a los animales con la protección ecosistémica y la salud humana.",
      country: "México / Internacional",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&auto=format",
    },
    {
      name: "Dra. Elena Vance",
      role: "Consejera Honorífica",
      area: "Conservación Marina y Océanos",
      bio: "Investigadora en oceanografía y arrecifes coralinos. Aporta conocimiento para los programas de conservación costera y restauración de ecosistemas marinos.",
      country: "Internacional",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&auto=format",
    },
    {
      name: "Mtro. Mateo Morales",
      role: "Consejero Honorífico",
      area: "Gobernanza Territorial y Suelo",
      bio: "Especialista en ordenamiento territorial, derecho ambiental y protección comunitaria del suelo de conservación.",
      country: "Latinoamérica",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&auto=format",
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <PageHero
        titleWhite="Liderazgo técnico y"
        titleGreen="conducción ejecutiva"
        description="Un modelo colegiado que garantiza deliberación, rigor técnico, integridad y capacidad de acción directa en los territorios."
        bgImage="https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1600&h=900&fit=crop"
      />

      {/* Intro */}
      <section className="py-24 px-6 bg-white">
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
              Gobernanza colegiada <br />
              <span className="text-neutral-700">para la acción efectiva.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              La gobernanza del Consejo Global Ambiental combina el liderazgo fundador y ejecutivo con diez consejerías honoríficas especializadas, garantizando deliberación plural, rigor científico e independencia técnica.
            </p>
          </div>
        </div>
      </section>

      {/* Liderazgo Fundador (SECCIÓN VERDE - 2 IMÁGENES INTERACTIVAS) */}
      <section className="py-24 px-6 bg-white" ref={leadRef}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Liderazgo Fundador
            </h2>
            <p
              className="text-neutral-600 text-sm md:text-base font-sans font-normal leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Haz clic sobre cualquiera de las dos fotografías para desplegar su semblanza institucional completa, atribuciones y canales de contacto directo.
            </p>
          </div>

          {/* Contenedor Persistente con Animación Tipo PowerPoint Morph / TranslateX */}
          <div className="relative overflow-hidden min-h-[580px] md:h-[580px]">
            <div className="grid md:grid-cols-2 gap-8 h-full items-stretch">
              
              {/* TARJETA 0: Mtro. Luis García (Columna Izquierda) */}
              <div
                onClick={() => activeLeader === null && setActiveLeader(0)}
                className={`relative rounded-3xl overflow-hidden shadow-lg h-[480px] md:h-[580px] transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
                  activeLeader === null ? "cursor-pointer hover:shadow-2xl hover:-translate-y-2" : ""
                }`}
                style={{
                  transform:
                    activeLeader === 1
                      ? "translate3d(-120%, 0, 0)"
                      : "translate3d(0, 0, 0)",
                  opacity: activeLeader === 1 ? 0 : leadInView ? 1 : 0,
                  pointerEvents: activeLeader === 1 ? "none" : "auto",
                  zIndex: activeLeader === 0 ? 20 : 10,
                }}
              >
                <img
                  src={leadership[0].img}
                  alt={leadership[0].name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay de texto inicial (Se desvanece suavemente al hacer clic) */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end transition-all duration-500 ease-in-out ${
                    activeLeader === null ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="absolute bottom-0 inset-x-0 h-[58%] bg-gradient-to-t from-black via-black/85 to-transparent" />
                  <div className="relative p-8 md:p-10 z-10 text-white">
                    <h3
                      className="font-display text-2xl md:text-3xl lg:text-4xl text-[#85C441] font-bold mb-1.5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {leadership[0].name}
                    </h3>
                    <p
                      className="text-white/95 text-sm md:text-base font-medium tracking-wide mb-6 font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {leadership[0].role}
                    </p>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#85C441] group-hover:text-white transition-colors pt-4 border-t border-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      <span>Ver semblanza, redes y contacto</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Botón flotante para regresar (Cuando Luis está activo en la izquierda) */}
                {activeLeader === 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLeader(null);
                    }}
                    className="absolute top-6 left-6 px-4 py-2.5 rounded-xl bg-[#85C441] hover:bg-[#72ad34] text-white text-xs font-bold flex items-center gap-2 transition-all duration-300 shadow-xl cursor-pointer animate-fadeIn"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Regresar</span>
                  </button>
                )}
              </div>

              {/* TARJETA 1: Mtro. Francisco Solorio (Columna Derecha que viaja a la Izquierda al hacer clic) */}
              <div
                onClick={() => activeLeader === null && setActiveLeader(1)}
                className={`relative rounded-3xl overflow-hidden shadow-lg h-[480px] md:h-[580px] transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
                  activeLeader === null ? "cursor-pointer hover:shadow-2xl hover:-translate-y-2" : ""
                }`}
                style={{
                  transform:
                    activeLeader === 1
                      ? "translate3d(calc(-100% - 2rem), 0, 0)"
                      : activeLeader === 0
                      ? "translate3d(120%, 0, 0)"
                      : "translate3d(0, 0, 0)",
                  opacity: activeLeader === 0 ? 0 : leadInView ? 1 : 0,
                  pointerEvents: activeLeader === 0 ? "none" : "auto",
                  zIndex: activeLeader === 1 ? 20 : 10,
                }}
              >
                <img
                  src={leadership[1].img}
                  alt={leadership[1].name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay de texto inicial de Francisco */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end transition-all duration-500 ease-in-out ${
                    activeLeader === null ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="absolute bottom-0 inset-x-0 h-[58%] bg-gradient-to-t from-black via-black/85 to-transparent" />
                  <div className="relative p-8 md:p-10 z-10 text-white">
                    <h3
                      className="font-display text-2xl md:text-3xl lg:text-4xl text-[#85C441] font-bold mb-1.5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {leadership[1].name}
                    </h3>
                    <p
                      className="text-white/95 text-sm md:text-base font-medium tracking-wide mb-6 font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {leadership[1].role}
                    </p>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#85C441] group-hover:text-white transition-colors pt-4 border-t border-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      <span>Ver semblanza, redes y contacto</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Botón flotante para regresar (Cuando Francisco viajó a la izquierda) */}
                {activeLeader === 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLeader(null);
                    }}
                    className="absolute top-6 left-6 px-4 py-2.5 rounded-xl bg-[#85C441] hover:bg-[#72ad34] text-white text-xs font-bold flex items-center gap-2 transition-all duration-300 shadow-xl cursor-pointer animate-fadeIn"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Regresar</span>
                  </button>
                )}
              </div>

              {/* PANEL DE DETALLES: Entra deslizándose desde la derecha a la Columna Derecha (SIN SCROLL) */}
              <div
                className={`absolute top-0 right-0 w-full md:w-[calc(50%-1rem)] h-[480px] md:h-[580px] bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-200/80 flex flex-col justify-between overflow-hidden transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform z-15 ${
                  activeLeader !== null
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                style={{
                  transform:
                    activeLeader !== null
                      ? "translate3d(0, 0, 0)"
                      : "translate3d(120%, 0, 0)",
                }}
              >
                {activeLeader !== null && (
                  <>
                    <div className="flex flex-col justify-between flex-1 min-h-0">
                      {/* Nombre con animación translate y color verde claro (#85C441) */}
                      <div
                        key={`title-${activeLeader}`}
                        className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-fadeIn mb-3"
                        style={{
                          transform: "translate3d(0, 0, 0)",
                          animation: "slideInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
                        }}
                      >
                        <h3
                          className="font-display text-2xl md:text-3xl text-[#85C441] font-bold mb-0.5 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {leadership[activeLeader].name}
                        </h3>
                        <p
                          className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wide font-sans"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {leadership[activeLeader].role}
                        </p>
                      </div>

                      {/* Semblanza en Verde Claro */}
                      <div
                        key={`bio-${activeLeader}`}
                        className="mb-3"
                        style={{
                          animation: "slideInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both",
                        }}
                      >
                        <h4
                          className="text-xs uppercase tracking-wider text-[#85C441] font-bold mb-1.5 font-sans"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Semblanza Institucional
                        </h4>
                        <p
                          className="text-neutral-600 text-xs sm:text-[13px] font-sans font-normal leading-relaxed bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {leadership[activeLeader].bio}
                        </p>
                      </div>

                      {/* Atribuciones en Verde Claro */}
                      <div
                        key={`resp-${activeLeader}`}
                        className="mb-3"
                        style={{
                          animation: "slideInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both",
                        }}
                      >
                        <h4
                          className="text-xs uppercase tracking-wider text-[#85C441] font-bold mb-1.5 font-sans"
                        >
                          Atribuciones y Responsabilidades Directivas
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {leadership[activeLeader].responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 p-2 rounded-xl bg-neutral-50 border border-neutral-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#85C441] mt-1.5 flex-shrink-0" />
                              <span className="text-neutral-600 text-xs font-sans font-normal leading-snug">
                                {resp}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Redes y Contacto */}
                    <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={leadership[activeLeader].social.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-[#85C441] flex items-center justify-center transition-all duration-200 border border-neutral-200 shadow-xs"
                          title="LinkedIn"
                        >
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                          </svg>
                        </a>
                        <a
                          href={leadership[activeLeader].social.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-[#85C441] flex items-center justify-center transition-all duration-200 border border-neutral-200 shadow-xs"
                          title="X / Twitter"
                        >
                          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                        <a
                          href={`mailto:${leadership[activeLeader].social.email}`}
                          className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-[#85C441] flex items-center justify-center transition-all duration-200 border border-neutral-200 shadow-xs"
                          title="Correo Electrónico Directo"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </a>
                      </div>

                      <Link
                        to="/contacto"
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#85C441] text-white rounded-xl font-semibold hover:bg-[#72ad34] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <span>Contactar a {leadership[activeLeader].name.split(" ")[1]}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consejerías Honoríficas (SECCIÓN INTERACTIVA CON FOTOS Y TRASLACIÓN) */}
      <section className="pt-16 pb-8 px-6 bg-white" ref={councilRef}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Consejerías Honoríficas
            </h2>
            <p
              className="text-neutral-600 text-sm md:text-base font-sans font-normal leading-relaxed mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Especialistas de alto nivel vinculados a las Líneas Estratégicas para asegurar rigor y solvencia en cada propuesta.
            </p>
            <p
              className="text-neutral-400 text-xs md:text-sm font-sans font-light"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Haz clic sobre cualquiera de las fotografías para desplegar su semblanza institucional y línea temática vinculada.
            </p>
          </div>

          {/* Contenedor Persistente con Animación Tipo PowerPoint Morph */}
          <div className="relative overflow-hidden min-h-[560px] md:h-[560px]">
            {/* VISTA 1: 3 TARJETAS INICIALES (Cuando activeCouncil === null) */}
            <div
              className={`grid md:grid-cols-3 gap-6 h-full items-stretch transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
                activeCouncil === null
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none absolute inset-0 -translate-x-12"
              }`}
            >
              {council.map((c, i) => (
                <div
                  key={c.name}
                  onClick={() => setActiveCouncil(i)}
                  className="relative rounded-3xl overflow-hidden shadow-lg h-[460px] md:h-[560px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group"
                >
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient y Datos de la Tarjeta */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 text-white">
                    <div className="absolute bottom-0 inset-x-0 h-[62%] bg-gradient-to-t from-black via-black/85 to-transparent -z-10" />
                    <h3
                      className="font-display text-xl md:text-2xl text-[#85C441] font-bold mb-1 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.name}
                    </h3>
                    <p
                      className="text-white/95 text-xs md:text-sm font-medium tracking-wide mb-4 font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {c.role} • {c.area}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#85C441] group-hover:text-white transition-colors pt-3 border-t border-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      <span>Ver semblanza y línea temática</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VISTA 2: VISTA EXPANDIDA MORPH / TRANSLATE (Cuando activeCouncil !== null) */}
            <div
              className={`grid md:grid-cols-2 gap-8 h-full items-stretch transition-all duration-750 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
                activeCouncil !== null
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none absolute inset-0 translate-x-12"
              }`}
            >
              {/* Columna Izquierda: Foto Limpia del Consejero Activo + Botón Regresar */}
              {activeCouncil !== null && (
                <div className="relative rounded-3xl overflow-hidden shadow-lg h-[460px] md:h-[560px]">
                  <img
                    src={council[activeCouncil].img}
                    alt={council[activeCouncil].name}
                    className="w-full h-full object-cover"
                  />

                  {/* Botón flotante para regresar en verde claro */}
                  <button
                    type="button"
                    onClick={() => setActiveCouncil(null)}
                    className="absolute top-6 left-6 px-4 py-2.5 rounded-xl bg-[#85C441] hover:bg-[#72ad34] text-white text-xs font-bold flex items-center gap-2 transition-all duration-300 shadow-xl cursor-pointer"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Regresar</span>
                  </button>
                </div>
              )}

              {/* Columna Derecha: Panel Blanco de Semblanza y Línea Temática */}
              {activeCouncil !== null && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-200/80 flex flex-col justify-between overflow-hidden h-[460px] md:h-[560px]">
                  <div className="flex flex-col justify-between flex-1 min-h-0">
                    {/* Nombre con animación translate y color verde claro (#85C441) */}
                    <div
                      key={`council-title-${activeCouncil}`}
                      style={{
                        animation: "slideInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
                      }}
                      className="mb-3"
                    >
                      <h3
                        className="font-display text-2xl md:text-3xl text-[#85C441] font-bold mb-0.5 leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {council[activeCouncil].name}
                      </h3>
                      <p
                        className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wide font-sans"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {council[activeCouncil].role} • {council[activeCouncil].area}
                      </p>
                    </div>

                    {/* Semblanza en Verde Claro */}
                    <div
                      key={`council-bio-${activeCouncil}`}
                      style={{
                        animation: "slideInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both",
                      }}
                      className="mb-4 flex-1"
                    >
                      <h4
                        className="text-xs uppercase tracking-wider text-[#85C441] font-bold mb-1.5 font-sans"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        Semblanza Institucional
                      </h4>
                      <p
                        className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {council[activeCouncil].bio}
                      </p>
                    </div>
                  </div>

                  {/* Botón Ver Línea Temática */}
                  <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-neutral-400 font-sans">
                      Línea estratégica asociada
                    </span>
                    <Link
                      to="/lineas-estrategicas"
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#85C441] text-white rounded-xl font-semibold hover:bg-[#72ad34] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Ver línea temática</span>
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

          {/* Ficha institucional de Consejerías en Integración */}
          <div className="mt-8 p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <span
                className="font-display text-3xl md:text-4xl text-[#85C441] font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                +7
              </span>
              <div>
                <h5
                  className="font-display text-base md:text-lg text-neutral-700 font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Consejerías en Proceso de Integración
                </h5>
                <p
                  className="text-xs text-neutral-500 font-sans font-light leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  El Consejo continúa incorporando perfiles científicos y territoriales para cubrir sus 10 Líneas Estratégicas.
                </p>
              </div>
            </div>
            <Link
              to="/lineas-estrategicas"
              className="px-4 py-2 rounded-xl bg-white text-neutral-700 hover:text-[#85C441] border border-neutral-200 hover:border-neutral-300 text-xs font-semibold whitespace-nowrap transition-all shadow-xs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Explorar las 10 líneas
            </Link>
          </div>
        </div>
      </section>

      {/* Compromiso Ético Banner (SECCIÓN MEJORADA EN VERDE CLARO) */}
      <section className="pt-4 pb-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="w-12 h-1 bg-[#85C441] rounded-full mx-auto mb-6" />
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#85C441] mb-5 font-bold leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Integridad y Compromiso Público
          </h2>
          <p
            className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Cada dictamen, proyecto y acuerdo de nuestro cuerpo directivo se rige bajo los principios de máxima publicidad, imparcialidad y apego irrestricto a los Objetivos de Desarrollo Sostenible.
          </p>
          <Link
            to="/asamblea-anual"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] text-white rounded-full font-bold hover:bg-[#72ad34] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Conocer la Asamblea Anual</span>
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




