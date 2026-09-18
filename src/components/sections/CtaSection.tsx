import { useState } from "react";
import { useInView } from "../../hooks/useInView";

export function CtaSection({ scrollY }: { scrollY: number }) {
  const { ref, inView } = useInView(0.2);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className="relative py-24 px-6 bg-neutral-50/80 border-t border-neutral-200/80 overflow-hidden"
    >
      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#85C441]/30 text-[#85C441] font-sans font-bold text-xs md:text-sm tracking-wide uppercase mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#85C441] animate-pulse"></span>
          <span>Acción Global y Territorial</span>
        </div>

        <h2
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-[#85C441] font-bold"
          style={{
            fontFamily: "var(--font-display)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Tu acción <span className="text-neutral-700">cambia el rumbo</span>
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed mb-10 text-neutral-600 max-w-2xl mx-auto font-light"
          style={{
            fontFamily: "var(--font-sans)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s ease 0.2s",
          }}
        >
          Únete a la red de personas, especialistas e instituciones que impulsan la gobernanza ambiental. Recibe reportes técnicos, guías de acción territorial e iniciativas conjuntas.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-neutral-700 font-semibold max-w-md mx-auto shadow-sm">
            ¡Gracias por sumarte! Nos pondremos en contacto contigo.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.35s",
            }}
          >
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full text-sm outline-none bg-white border border-neutral-200 text-neutral-700 placeholder-neutral-400 focus:border-[#85C441] shadow-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 bg-[#85C441] text-white hover:bg-[#72ad34] shadow-md hover:shadow-lg"
              style={{ fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}
            >
              Unirme al movimiento
            </button>
          </form>
        )}

        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transition: "all 0.7s ease 0.5s",
          }}
        >
          {[
            { num: "2.4M+", label: "Personas alcanzadas" },
            { num: "5", label: "Países con presencia" },
            { num: "10", label: "Líneas estratégicas" },
          ].map((s) => (
            <div key={s.num} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm text-center">
              <div
                className="font-display text-3xl font-bold mb-1 text-[#85C441]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.num}
              </div>
              <p
                className="text-xs text-neutral-600 font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

