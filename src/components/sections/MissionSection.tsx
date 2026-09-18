import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

export function MissionSection({ scrollY }: { scrollY: number }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView(0.15)
  const [offsetFromTop, setOffsetFromTop] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    setOffsetFromTop(el.offsetTop)
  }, [])

  const localScroll = scrollY - offsetFromTop
  const imgParallax = localScroll * 0.25

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-0 items-center min-h-[80vh]">
        {/* Image column */}
        <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 parallax-layer"
            style={{
              transform: `translateY(${imgParallax}px)`,
              top: "-15%",
              height: "130%",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1764566914660-a13daf14430d?w=900&h=1100&fit=crop&auto=format"
              alt="Dense forest canopy with tall evergreen trees"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,26,13,0.3) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Text column */}
        <div ref={ref} className="md:pl-16 pt-12 md:pt-0">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-6"
            style={{
              color: "#4892CB",
              fontFamily: "var(--font-sans)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            Nuestra Misión
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
            style={{
              fontFamily: "var(--font-display)",
              color: "#18529D",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Restaurar lo que <em style={{ color: "#4892CB" }}>juntos</em> hemos
            perdido
          </h2>
          <div
            className="h-px mb-8"
            style={{
              background:
                "linear-gradient(to right, rgba(72,146,203,0.6), transparent)",
              width: inView ? "80%" : "0%",
              transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          />
          {[
            "Trabajamos con comunidades indígenas y científicos para mapear y proteger los últimos bosques primarios de América Latina.",
            "Nuestros programas de restauración han plantado 18 millones de árboles nativos en zonas degradadas, creando corredores biológicos que conectan ecosistemas fragmentados.",
            "Mediante tecnología satelital monitoreamos en tiempo real la deforestación ilegal y alertamos a las autoridades locales.",
          ].map((text, i) => (
            <p
              key={i}
              className="text-base leading-relaxed mb-5"
              style={{
                color: "rgba(24,82,157,0.8)",
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s ease ${0.3 + i * 0.12}s`,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
