import { Link } from "react-router-dom";

export function Hero({ scrollY }: { scrollY: number }) {
  const imgParallax = scrollY * 0.45
  const textParallax = scrollY * 0.2
  const opacity = Math.max(0, 1 - scrollY / 600)

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 parallax-layer"
        style={{
          transform: `translateY(${imgParallax}px)`,
          top: "-10%",
          height: "120%",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1759681770982-313332e7f42c?w=1920&h=1200&fit=crop&auto=format"
          alt="Trabajo técnico y conservación en el territorio"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlays para garantizar legibilidad */}
      <div className="absolute inset-0 bg-[#050a05]/50 z-10" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(24,82,157,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 parallax-layer"
        style={{ transform: `translateY(${textParallax}px)`, opacity }}
      >
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 max-w-6xl text-white"
          style={{
            fontFamily: "var(--font-display)",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            letterSpacing: "-0.01em",
          }}
        >
          Transformando el presente <br />
          <span className="text-[#85C441]">para un futuro sostenible.</span>
        </h1>

        <p
          className="max-w-3xl text-base md:text-xl leading-relaxed mb-12 text-white/90"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
          }}
        >
          Impulsamos la protección del medio ambiente, la gobernanza ambiental, la acción climática y los Objetivos de Desarrollo Sostenible mediante conocimiento, cooperación internacional y acción territorial.
        </p>


      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase text-white/60"
        >
          Descubrir
        </span>
        <div
          className="w-px h-12 relative overflow-hidden bg-white/20"
        >
          <div
            className="w-full absolute top-0"
            style={{
              height: "60%",
              background: "#85C441",
              animation: "scrollDot 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  )
}
