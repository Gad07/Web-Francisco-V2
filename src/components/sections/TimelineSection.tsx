import { useInView } from "../../hooks/useInView";

export function TimelineSection() {
  const { ref, inView } = useInView(0.1);
  const events = [
    {
      year: "1972",
      event: "Conferencia de Estocolmo",
      desc: "Primera cumbre medioambiental de la ONU. 113 países reconocen la crisis ecológica global.",
    },
    {
      year: "1987",
      event: "Informe Brundtland",
      desc: "Se define 'desarrollo sostenible'. Un hito que cambió el lenguaje político internacional.",
    },
    {
      year: "1997",
      event: "Protocolo de Kioto",
      desc: "Los países industrializados se comprometen a reducir emisiones de gases de efecto invernadero.",
    },
    {
      year: "2015",
      event: "Acuerdo de París",
      desc: "195 naciones firman el primer acuerdo climático universal. Objetivo: +1.5°C máximo.",
    },
    {
      year: "2030",
      event: "Meta Global",
      desc: "Restaurar 350 millones de hectáreas degradadas. Detener la pérdida de biodiversidad.",
    },
  ];

  return (
    <section className="py-24 px-6 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Columna Izquierda (Sticky) */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-32" style={{ fontFamily: "var(--font-sans)" }}>
            <p className="text-sm tracking-[0.2em] uppercase mb-4 text-[#85C441] font-bold">
              Historia del Movimiento
            </p>
            <h2 
              className="font-display text-5xl md:text-6xl text-[#85C441] mb-6 leading-tight font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Décadas de <br/><span className="text-neutral-700">lucha</span>
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-8 font-light">
              Desde las primeras advertencias científicas hasta los grandes acuerdos globales, nuestro movimiento se ha forjado en la urgencia de proteger nuestro único hogar.
            </p>
            <div className="w-16 h-1.5 bg-[#85C441] rounded-full"></div>
          </div>
        </div>

        {/* Columna Derecha (Scroll con la línea de tiempo) */}
        <div className="w-full lg:w-2/3" ref={ref}>
          <div className="relative border-l-2 border-[#85C441]/30 pl-8 md:pl-16 space-y-24 py-8">
            {events.map((evt, i) => (
              <div 
                key={evt.year} 
                className="relative group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                }}
              >
                {/* Punto en la línea de tiempo */}
                <div className="absolute -left-[41px] md:-left-[73px] top-6 w-5 h-5 rounded-full bg-white border-[4px] border-[#85C441] group-hover:scale-125 transition-all duration-500 shadow-sm z-10" />
                
                {/* Contenido del evento */}
                <div className="transform transition-transform duration-500 group-hover:translate-x-3">
                  <div className="relative">
                    {/* Año de fondo (Efecto Watermark) */}
                    <span 
                      className="block font-display text-7xl md:text-9xl font-bold opacity-15 text-[#85C441] transition-opacity duration-500 group-hover:opacity-30 select-none -ml-2 md:-ml-4 mb-[-20px] md:mb-[-40px]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {evt.year}
                    </span>
                    
                    {/* Título del Evento */}
                    <h3 
                      className="relative z-10 text-2xl md:text-3xl font-display text-neutral-700 mb-4 font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {evt.event}
                    </h3>
                  </div>
                  
                  {/* Descripción */}
                  <p 
                    className="text-neutral-600 text-base md:text-lg leading-relaxed font-sans max-w-xl font-light"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {evt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

