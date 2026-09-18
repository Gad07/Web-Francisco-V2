import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";
import { Link } from "react-router-dom";
import { Globe3D, CountryNode } from "../components/Globe3D";

export default function GlobalPresence() {
  const [activeCountry, setActiveCountry] = useState<string>("México");
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: globeRef, inView: globeInView } = useInView(0.05);

  const presence: CountryNode[] = [
    {
      num: "01",
      country: "México",
      flag: "🇲🇽",
      role: "Sede y Núcleo Operativo",
      desc: "Coordinación central, gobernanza territorial, suelo de conservación, áreas naturales protegidas, dictámenes técnicos de política pública, acción climática y articulación multisectorial.",
      scope: "Sede Global & Proyectos en Campo",
      lat: 23.6345,
      lon: -102.5528,
      stats: "Sede Central • CDMX & Territorio Nacional",
      img: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "02",
      country: "Colombia",
      flag: "🇨🇴",
      role: "Cooperación Regional y Biodiversidad",
      desc: "Intercambio técnico latinoamericano, conservación de ecosistemas andino-amazónicos, alianzas académicas e institucionales y desarrollo de iniciativas comunitarias sostenibles.",
      scope: "América del Sur",
      lat: 4.5709,
      lon: -74.2973,
      stats: "Nodo Andino-Amazónico",
      img: "https://images.unsplash.com/photo-1583531172005-827ed04c7949?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "03",
      country: "Canadá",
      flag: "🇨🇦",
      role: "Cooperación e Internacionalización",
      desc: "Vinculación institucional, sostenibilidad y responsabilidad corporativa, comercio justo, innovación tecnológica y empoderamiento de mujeres productoras del territorio.",
      scope: "Norteamérica",
      lat: 56.1304,
      lon: -106.3468,
      stats: "Nodo Norteamericano",
      img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "04",
      country: "España",
      flag: "🇪🇸",
      role: "Vinculación Euroiberoamericana",
      desc: "Cooperación académica, transferencia de conocimiento científico, diálogo de políticas ambientales y proyección estratégica hacia organismos del espacio europeo.",
      scope: "Europa & Espacio Iberoamericano",
      lat: 40.4637,
      lon: -3.7492,
      stats: "Nodo Europeo & Iberoamericano",
      img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "05",
      country: "Costa Rica",
      flag: "🇨🇷",
      role: "Vinculación Centroamericana",
      desc: "Alianzas en materia de conservación de biodiversidad, políticas de descarbonización, turismo sostenible y acción comunitaria con alcance para la región de Centroamérica.",
      scope: "Centroamérica",
      lat: 9.7489,
      lon: -83.7534,
      stats: "Nodo Centroamericano",
      img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=900&fit=crop&auto=format",
    },
  ];

  const activeData = presence.find((p) => p.country === activeCountry) || presence[0];

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Red global de"
        titleGreen="cooperación internacional"
        description="Una presencia estratégica que nos permite conectar agendas territoriales con capacidades técnicas y soluciones de impacto global."
        bgImage="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1600&h=900&fit=crop"
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
              Vocación internacional, <br />
              <span className="text-neutral-700">impacto en el territorio.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              El Consejo Global Ambiental tiene su origen en México y despliega una agenda de cooperación internacional estructurada. Explora el globo terráqueo 3D para conocer nuestras sedes y alcances regionales.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GLOBO TERRÁQUEO 3D REALISTA + CARD DE INFORMACIÓN
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white border-t border-neutral-100" ref={globeRef}>
        <div className="max-w-6xl mx-auto">
          {/* Selector Rápido de Países (Píldoras) */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {presence.map((p) => {
              const isSelected = activeCountry === p.country;
              return (
                <button
                  key={p.country}
                  type="button"
                  onClick={() => setActiveCountry(p.country)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#85C441] text-white shadow-lg scale-105"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <span>{p.flag}</span>
                  <span>{p.country}</span>
                  {p.country === "México" && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
                      Sede
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Master View: Globo 3D a la izquierda + Card Grande a la derecha */}
          <div
            className="grid lg:grid-cols-12 gap-10 items-center"
            style={{
              opacity: globeInView ? 1 : 0,
              transform: globeInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Columna Izquierda: Globo Terráqueo 3D Realista */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <Globe3D
                countries={presence}
                activeCountry={activeCountry}
                onSelectCountry={setActiveCountry}
              />
            </div>

            {/* Columna Derecha: Card Grande de Información (Fondo Blanco) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-xl overflow-hidden relative text-neutral-800 flex flex-col justify-between transition-all duration-500">
                {/* Cabecera con Imagen */}
                <div className="relative h-60 lg:h-64 overflow-hidden flex-shrink-0">
                  <img
                    src={activeData.img}
                    alt={`Presencia en ${activeData.country}`}
                    className="w-full h-full object-cover transition-transform duration-700 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Número de Sede */}
                  <span
                    className="absolute top-4 left-5 font-display text-4xl font-bold text-[#85C441] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {activeData.num}
                  </span>

                  {/* Scope Pill */}
                  <div className="absolute top-4 right-5">
                    <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-sans font-bold text-white tracking-wider">
                      {activeData.scope}
                    </span>
                  </div>

                  {/* Título y País */}
                  <div className="absolute bottom-4 inset-x-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{activeData.flag}</span>
                      <span className="text-xs uppercase tracking-widest text-[#85C441] font-bold font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {activeData.stats}
                      </span>
                    </div>
                    <h3
                      className="font-display text-3xl md:text-4xl text-white font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeData.country}
                    </h3>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className="text-base md:text-lg font-bold text-[#85C441] tracking-wide mb-3 font-display"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeData.role}
                    </h4>

                    <p
                      className="text-neutral-600 text-sm md:text-base font-sans font-normal leading-relaxed mb-6"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {activeData.desc}
                    </p>
                  </div>

                  {/* Acciones y Enlaces */}
                  <div className="pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to="/lineas-estrategicas"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold text-xs transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span>Líneas estratégicas asociadas</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>

                    <Link
                      to="/contacto"
                      className="text-xs font-bold text-neutral-500 hover:text-[#85C441] transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Contacto institucional →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
            Establecer un nodo o alianza internacional
          </h2>
          <p
            className="text-neutral-600 text-base md:text-lg font-sans font-normal leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Si tu organización, universidad o gobierno busca articular programas conjuntos con el Consejo Global Ambiental, contáctanos para iniciar un diálogo de cooperación formal.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Iniciar diálogo de cooperación</span>
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
