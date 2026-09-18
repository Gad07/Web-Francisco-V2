import { PageHero } from "../components/layout/PageHero";
import { useInView } from "../hooks/useInView";

export default function Contact() {
  const { ref: introRef, inView: introInView } = useInView(0.1);
  const { ref: formRef, inView: formInView } = useInView(0.1);

  const options = [
    "Alianzas institucionales y cooperación internacional.",
    "Proyectos ambientales, territoriales, educativos y de seguridad alimentaria.",
    "Investigación aplicada, dictámenes y publicaciones científicas.",
    "Participación empresarial y estrategias de sostenibilidad ESG.",
    "Acreditación para la Asamblea Anual y foros públicos.",
    "Prensa, entrevistas y solicitudes de información institucional."
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        titleWhite="Alianzas y"
        titleGreen="colaboración institucional"
        description="Construimos sinergias para transformar el conocimiento en impacto territorial. Contáctanos para explorar modelos de cooperación."
        bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
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
              Conectar voluntades para <br />
              <span className="text-neutral-700">proteger el territorio.</span>
            </h2>
            <div className="w-16 h-1 bg-[#85C441] rounded-full mx-auto mb-8" />
            <p
              className="text-neutral-600 text-lg md:text-xl font-sans font-normal leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              El Consejo Global Ambiental construye alianzas para convertir acuerdos en transformaciones tangibles. Te invitamos a establecer comunicación directa con nuestro equipo técnico.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido Formulario & Datos */}
      <section className="py-8 px-6 bg-white" ref={formRef}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Columna Izquierda: Información */}
          <div 
            className="lg:col-span-2 space-y-8"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div>
              <h3
                className="font-display text-2xl md:text-3xl text-neutral-700 mb-6 font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Modalidades de Vinculación
              </h3>

              <div className="space-y-4">
                {options.map((opt, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-[#85C441] mt-2 flex-shrink-0" />
                    <p className="text-neutral-600 text-sm font-sans font-normal leading-relaxed">
                      {opt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ficha Sede */}
            <div className="p-8 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs">
              <span className="text-xs uppercase tracking-wider font-bold text-[#85C441] block mb-2">
                Sede Central
              </span>
              <h4
                className="font-display text-2xl text-neutral-700 mb-2 font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ciudad de México
              </h4>
              <p className="text-neutral-600 text-sm font-sans font-normal mb-6">
                Presidencia y Secretaría Ejecutiva
              </p>
              <a
                href="https://www.consejoglobalambiental.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#85C441] hover:text-[#72ad34] transition-colors flex items-center gap-1.5"
              >
                <span>www.consejoglobalambiental.com</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div 
            className="lg:col-span-3 p-8 md:p-12 rounded-3xl bg-white border border-neutral-200/80 shadow-lg relative"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <div className="absolute top-0 left-12 w-16 h-1 bg-[#85C441] rounded-b-md"></div>

            <h3
              className="font-display text-2xl md:text-3xl text-neutral-700 mb-8 font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Iniciar Comunicación
            </h3>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-neutral-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Dra. María Hernández"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 placeholder-neutral-400 text-sm outline-none focus:border-[#85C441] transition-colors bg-neutral-50/50"
                    style={{ fontFamily: "var(--font-sans)" }}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-neutral-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                    Institución u Organización
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Universidad / Secretaría / ONG"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 placeholder-neutral-400 text-sm outline-none focus:border-[#85C441] transition-colors bg-neutral-50/50"
                    style={{ fontFamily: "var(--font-sans)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-neutral-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                  Correo electrónico institucional
                </label>
                <input
                  type="email"
                  required
                  placeholder="nombre@institucion.org"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 placeholder-neutral-400 text-sm outline-none focus:border-[#85C441] transition-colors bg-neutral-50/50"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-neutral-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                  Tipo de vinculación solicitada
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm outline-none focus:border-[#85C441] transition-colors bg-white cursor-pointer"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <option value="convenio">Convenio de Cooperación Técnica</option>
                  <option value="dictamen">Solicitud de Dictamen o Asesoría Científica</option>
                  <option value="territorial">Acompañamiento en Proyecto Territorial</option>
                  <option value="editorial">Propuesta Editorial o Publicación</option>
                  <option value="acreditacion">Acreditación para la Asamblea Anual</option>
                  <option value="otro">Otro asunto institucional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-neutral-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                  Mensaje o Planteamiento
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe brevemente los objetivos de la vinculación, territorio de interés o propuesta institucional..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 placeholder-neutral-400 text-sm outline-none focus:border-[#85C441] transition-colors resize-none bg-neutral-50/50"
                  style={{ fontFamily: "var(--font-sans)" }}
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <span>Enviar mensaje institucional</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
