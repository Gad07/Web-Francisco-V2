import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

export function OceanSection({ scrollY }: { scrollY: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView(0.15);
  const [offsetFromTop, setOffsetFromTop] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    setOffsetFromTop(el.offsetTop);
  }, []);

  const localScroll = scrollY - offsetFromTop;
  const imgParallax = localScroll * 0.2;

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-0 items-center">
        {/* Text left */}
        <div ref={ref} className="md:pr-16 pb-12 md:pb-0 order-2 md:order-1">
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
            Los Océanos
          </p>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "#18529D",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            El azul que
            <br />
            <span style={{ color: "#4892CB" }}>respira</span> por todos
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
          <p
            className="text-base leading-relaxed mb-6"
            style={{
              color: "#3A608C",
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              opacity: inView ? 1 : 0,
              transition: "all 0.7s ease 0.4s",
            }}
          >
            Los océanos absorben el 30% del CO₂ generado por humanos y producen
            la mitad del oxígeno que respiramos. Sin embargo, 8 millones de
            toneladas de plástico llegan al mar cada año.
          </p>
          <div
            className="grid grid-cols-2 gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.5s",
            }}
          >
            {[
              { num: "71%", desc: "de la Tierra cubierta por océano" },
              { num: "50%", desc: "del oxígeno que respiramos viene del mar" },
              { num: "3B", desc: "personas dependen del mar para alimentarse" },
              {
                num: "90%",
                desc: "del calor climático absorbido por los océanos",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-5 rounded-2xl"
                style={{
                  background: "#F4F8FC",
                  border: "1px solid #D0E2F4",
                  boxShadow: "0 10px 30px rgba(24,82,157,0.04)",
                }}
              >
                <div
                  className="font-display text-2xl mb-1 font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#18529D",
                  }}
                >
                  {item.num}
                </div>
                <p
                  className="text-xs"
                  style={{
                    color: "#3A608C",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image right */}
        <div className="relative h-[500px] md:h-[650px] overflow-hidden rounded-2xl order-1 md:order-2 border border-[#D0E2F4]">
          <div
            className="absolute parallax-layer"
            style={{
              transform: `translateY(${imgParallax}px)`,
              top: "-15%",
              bottom: "-15%",
              left: 0,
              right: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1767857456609-d5a4165157fd?w=900&h=1100&fit=crop&auto=format"
              alt="Aerial view of tropical island coastline with lush greenery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

