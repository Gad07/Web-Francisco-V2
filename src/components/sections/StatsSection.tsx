import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";

function StatCard({
  value,
  suffix,
  label,
  sublabel,
  delay,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  delay: number;
  active: boolean;
}) {
  const count = useCountUp(value, 1800, active);
  return (
    <div
      className="text-center p-8 lg:p-9 bg-white rounded-3xl shadow-[0_10px_30px_rgba(24,82,157,0.05)] border border-[#D0E2F4] group hover:border-[#18529D] hover:shadow-[0_20px_40px_rgba(24,82,157,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#18529D] mb-2.5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {count.toLocaleString()}
        <span className="text-[#4892CB]">{suffix}</span>
      </div>
      <h3
        className="text-base md:text-lg text-[#18529D] font-semibold font-sans mb-1.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </h3>
      {sublabel && (
        <p
          className="text-xs md:text-sm text-[#3A608C] font-sans font-light leading-relaxed"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden bg-[#F4F8FC] border-y border-[#DCE8F5]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #18529D 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#18529D] font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nuestro impacto en el territorio
          </h2>
          <p
            className="text-[#3A608C] text-base md:text-lg font-sans font-light leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Cifras que reflejan nuestro compromiso con la gobernanza ambiental, la cooperación institucional y la acción territorial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatCard
            value={16890}
            suffix="+"
            label="Personas beneficiarias"
            sublabel="Comunidades y ejidos capacitados"
            delay={0}
            active={inView}
          />
          <StatCard
            value={1500}
            suffix="+"
            label="Semillas nativas conservadas"
            sublabel="Bancos comunitarios de germoplasma"
            delay={120}
            active={inView}
          />
          <StatCard
            value={44}
            suffix=""
            label="Recorridos territoriales"
            sublabel="Inspección y dictamen en campo"
            delay={240}
            active={inView}
          />
          <StatCard
            value={31}
            suffix="k+"
            label="Alcance e impacto en medios"
            sublabel="Divulgación socioambiental activa"
            delay={360}
            active={inView}
          />
        </div>
      </div>
    </section>
  );
}

