import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';

export default function AnnualAssembly() {
  const [activeItem, setActiveItem] = useState(0);

  const agendaItems = [
    {
      num: "01",
      title: "Informe Anual de Actividades",
      short: "Balance institucional y auditoría de impacto",
      desc: "Evaluación transparente, cuantitativa y cualitativa de los resultados alcanzados durante el periodo en todos los territorios de incidencia directa del Consejo.",
      details: [
        "Auditoría técnica de impacto socioambiental en los programas activos.",
        "Rendición de cuentas sobre la asignación de recursos y fondos multilaterales.",
        "Evaluación del cumplimiento de metas operativas por consejería especializada."
      ],
      metrics: [
        { label: "Transparencia", val: "100%" },
        { label: "Dictámenes", val: "24+" },
        { label: "Territorios", val: "10 Zonas" }
      ],
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=800&fit=crop&auto=format",
    },
    {
      num: "02",
      title: "Definición de Prioridades Territoriales",
      short: "Focos de emergencia y asignación directa",
      desc: "Establecimiento de las líneas de acción estratégicas, focos de emergencia ambiental y asignación de programas directos sobre el suelo de conservación.",
      details: [
        "Mapeo de zonas críticas para restauración de cuencas y biodiversidad.",
        "Asignación prioritaria de brigadas y equipos técnicos en campo.",
        "Articulación de acuerdos directos con ejidos, comunidades y custodios."
      ],
      metrics: [
        { label: "Focos de Atención", val: "12 Biomas" },
        { label: "Inversión Directa", val: "85%" },
        { label: "Ejidos Aliados", val: "30+" }
      ],
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&h=800&fit=crop&auto=format",
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <PageHero
        tag="Órgano Máximo de Decisión"
        titleWhite="Asamblea Anual e"
        titleGreen="informe de gobernanza"
        description="El encuentro anual donde se aprueban las resoluciones estratégicas, se rinden cuentas y se establecen las metas prioritarias para la protección ambiental."
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop"
      />

      {/* Secciones de la Asamblea */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold mb-2">Puntos del Orden del Día</div>
            {agendaItems.map((item, idx) => (
              <div
                key={item.num}
                onClick={() => setActiveItem(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeItem === idx
                    ? 'bg-neutral-900 border-[#85C441] shadow-2xl scale-[1.02]'
                    : 'bg-neutral-950 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-[#85C441] font-bold">{item.num}</span>
                  <h3 className="font-serif text-lg text-white font-light">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 font-light">{item.short}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="h-60 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img src={agendaItems[activeItem].img} alt={agendaItems[activeItem].title} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl text-white font-light mb-3">{agendaItems[activeItem].title}</h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">{agendaItems[activeItem].desc}</p>
            <div className="space-y-2 border-t border-white/10 pt-4">
              {agendaItems[activeItem].details.map((d, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#85C441]" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
