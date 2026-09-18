export function MarqueeSection() {
  const items = [
    "Reforestación",
    "Biodiversidad",
    "Océanos Limpios",
    "Cero Emisiones",
    "Justicia Climática",
    "Energía Solar",
    "Agua Dulce",
    "Suelos Vivos",
  ]
  const doubled = [...items, ...items]
  return (
    <div
      className="py-6 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(74,140,63,0.15)",
        borderBottom: "1px solid rgba(74,140,63,0.15)",
        background: "rgba(13,26,13,0.4)",
      }}
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-xl flex items-center gap-12"
            style={{
              fontFamily: "var(--font-display)",
              color: i % 3 === 1 ? "#a3e635" : "rgba(212,240,192,0.4)",
            }}
          >
            {item}
            {i < doubled.length - 1 && (
              <span
                style={{
                  color: "rgba(74,140,63,0.4)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                }}
              >
                ◆
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
