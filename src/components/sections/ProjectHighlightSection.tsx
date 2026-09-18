import { useInView } from "../../hooks/useInView";
import { Link } from "react-router-dom";

export function ProjectHighlightSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="py-24 px-6 relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden shadow-md group bg-neutral-50/80 border border-neutral-200/80 grid lg:grid-cols-12 min-h-[480px]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Contenido (lado izquierdo) */}
          <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#85C441]/30 text-[#85C441] font-sans font-bold text-xs md:text-sm tracking-wide uppercase mb-6 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#85C441] animate-pulse"></span>
              <span>Ganador Reconocimiento Internacional WESS 2026</span>
            </div>

            <h3
              className="text-3xl md:text-5xl font-display text-neutral-700 mb-4 leading-tight font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gobernanza Ambiental para el Hambre Cero
            </h3>

            <p
              className="text-neutral-600 font-sans text-base md:text-lg leading-relaxed mb-8 font-light"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Proyecto emblemático que integra conservación ecosistémica, participación comunitaria, educación ambiental, cooperación interinstitucional y seguridad alimentaria en los territorios más vulnerables.
            </p>

            <Link
              to="/proyectos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#85C441] hover:bg-[#72ad34] text-white rounded-full font-bold transition-all w-fit shadow-md hover:shadow-lg text-sm md:text-base group/btn"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span>Conocer el proyecto galardonado</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          {/* Imagen (lado derecho, visible y destacada) */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&h=1200&fit=crop&auto=format"
              alt="Gobernanza ambiental y agricultura comunitaria"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-50/90 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

