import { useState } from "react";
import { useInView } from "../../hooks/useInView";

function EcoCard({
  title,
  description,
  tag,
  img,
  alt,
  index,
  inView,
}: {
  title: string
  description: string
  tag: string
  img: string
  alt: string
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="eco-card relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        height: 480,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
        border: "1px solid rgba(74,140,63,0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={img}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(5,10,5,0.95) 0%, rgba(5,10,5,0.4) 50%, rgba(5,10,5,0.1) 100%)",
          opacity: hovered ? 1 : 0.85,
        }}
      />
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <span
          className="inline-block text-xs px-3 py-1 rounded-full mb-4 w-fit tracking-wide"
          style={{
            background: "rgba(163,230,53,0.15)",
            color: "#a3e635",
            border: "1px solid rgba(163,230,53,0.3)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {tag}
        </span>
        <h3
          className="font-display text-2xl md:text-3xl mb-3"
          style={{ fontFamily: "var(--font-display)", color: "#e8f5e0" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "rgba(212,240,192,0.7)",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            maxHeight: hovered ? "120px" : "0",
            overflow: "hidden",
            transition: "max-height 0.5s ease",
            opacity: hovered ? 1 : 0,
          }}
        >
          {description}
        </p>
        <div
          className="mt-4 flex items-center gap-2 text-sm"
          style={{
            color: "#a3e635",
            fontFamily: "var(--font-sans)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.4s ease 0.1s",
          }}
        >
          Explorar ecosistema <span>→</span>
        </div>
      </div>
    </div>
  )
}

export function EcosystemsSection() {
  const { ref, inView } = useInView(0.1)
  const ecosystems = [
    {
      title: "Bosques Amazónicos",
      tag: "Selva Tropical",
      description:
        "El pulmón verde del planeta alberga el 10% de todas las especies conocidas. Hemos establecido 47 corredores de conservación en Brasil, Colombia y Perú.",
      img: "https://images.unsplash.com/photo-1626657171364-4af23203469b?w=700&h=900&fit=crop&auto=format",
      alt: "Green trees in Amazon forest canopy",
    },
    {
      title: "Arrecifes de Coral",
      tag: "Océano Tropical",
      description:
        "Solo quedan el 50% de los arrecifes de coral que existían hace 50 años. Nuestros programas de trasplante de coral han restaurado 200 hectáreas de arrecife.",
      img: "https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=700&h=900&fit=crop&auto=format",
      alt: "Clown fish on coral reef",
    },
    {
      title: "Glaciares Polares",
      tag: "Ártico y Antártida",
      description:
        "Los glaciares retroceden al doble de velocidad respecto a hace 20 años. Documentamos y monitoreamos 3,200 glaciares en tiempo real con sensores IoT.",
      img: "https://images.unsplash.com/photo-1758794093166-271d03ffd941?w=700&h=900&fit=crop&auto=format",
      alt: "Massive glacier with turquoise water and floating icebergs",
    },
  ]

  return (
    <section className="py-24 px-6 relative">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050a05 0%, #0d1a0d 50%, #050a05 100%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#a3e635", fontFamily: "var(--font-sans)" }}
            >
              Ecosistemas en Crisis
            </p>
            <h2
              className="font-display text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-display)", color: "#e8f5e0" }}
            >
              Cada bioma cuenta
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{
              color: "rgba(212,240,192,0.55)",
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
            }}
          >
            Intervenimos en los ecosistemas más críticos y amenazados del
            planeta con ciencia y acción directa.
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ecosystems.map((eco, i) => (
            <EcoCard key={eco.title} {...eco} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
