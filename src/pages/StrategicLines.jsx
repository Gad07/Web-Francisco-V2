import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';

export default function StrategicLines() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    { id: "ALL", label: "Todas las Líneas" },
    { id: "CLIMA", label: "Clima & Ecosistemas" },
    { id: "GOBERNANZA", label: "Gobernanza & Legalidad" },
    { id: "PRODUCCION", label: "Producción & Bienestar" },
  ];

  const lines = [
    {
      id: "01",
      category: "GOBERNANZA",
      title: "Gobernanza ambiental y política pública",
      desc: "Agendas estratégicas, marcos de coordinación institucional, análisis regulatorio, dictámenes técnicos e incidencia pública ante los tres órdenes de gobierno, alineada a los ODS 16 y 17.",
      scope: ["Análisis regulatorio y normativo", "Incidencia ante poderes públicos", "Dictámenes técnicos vinculantes"],
      img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "02",
      category: "CLIMA",
      title: "Cambio climático, resiliencia y transición sostenible",
      desc: "Mitigación, adaptación territorial, soluciones basadas en la naturaleza, gestión integral de riesgos y fortalecimiento de capacidades climáticas vinculadas a los ODS 7, 11 y 13.",
      scope: ["Modelos de adaptación climática", "Soluciones basadas en la naturaleza", "Gestión territorial del riesgo"],
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "03",
      category: "CLIMA",
      title: "Conservación, restauración y biodiversidad",
      desc: "Protección de ecosistemas prioritarios, regeneración de suelos, cuencas hídricas, corredores biológicos y preservación de especies nativas bajo los ODS 6, 14 y 15.",
      scope: ["Restauración integral de cuencas", "Custodia de corredores biológicos", "Protección de flora y fauna nativa"],
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "04",
      category: "GOBERNANZA",
      title: "Territorio, legalidad y cohesión social",
      desc: "Defensa del suelo de conservación, ordenamiento territorial ecológico, prevención de delitos ambientales y apropiación comunitaria en el marco de los ODS 11 y 16.",
      scope: ["Defensa del suelo de conservación", "Ordenamiento ecológico comunitario", "Prevención de ilícitos ambientales"],
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "05",
      category: "GOBERNANZA",
      title: "Agenda 2030 y Objetivos de Desarrollo Sostenible",
      desc: "Integración transversal de los ODS en planes de desarrollo, sistemas de monitoreo, indicadores verificables y rendición de cuentas con enfoque transversal en el ODS 17.",
      scope: ["Alineación transversal de planes", "Sistemas de monitoreo e indicadores", "Auditoría de cumplimiento ODS"],
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "06",
      category: "PRODUCCION",
      title: "Sistemas agroalimentarios y soberanía alimentaria",
      desc: "Prácticas sustentables, protección de semillas nativas, bioinsumos, circuitos cortos y fortalecimiento de la producción local alineados con el ODS 2.",
      scope: ["Bancos de semillas criollas", "Producción de bioinsumos agrícolas", "Circuitos cortos de comercio justo"],
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "07",
      category: "PRODUCCION",
      title: "Bienestar animal y enfoque Una Salud",
      desc: "Protección a la fauna silvestre, manejo ético de animales de trabajo y compañía, y bioseguridad comunitaria respondiendo a los ODS 3 y 15.",
      scope: ["Programas de Una Salud en territorio", "Protección de fauna silvestre", "Manejo ético y bioseguridad"],
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "08",
      category: "CLIMA",
      title: "Educación ambiental y cultura de la sostenibilidad",
      desc: "Formación de capacidades, campañas socioambientales, ciencia ciudadana y participación activa de juventudes vinculadas a los ODS 4 y 12.",
      scope: ["Programas de ciencia ciudadana", "Talleres de formación técnica", "Campañas masivas socioambientales"],
      img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "09",
      category: "GOBERNANZA",
      title: "Investigación, innovación y transferencia de conocimiento",
      desc: "Generación de datos científicos, diagnóstico socioambiental, publicaciones técnicas y soluciones tecnológicas abiertas respondiendo al ODS 9.",
      scope: ["Monitoreo satelital en tiempo real", "Dictámenes y reportes científicos", "Plataformas abiertas de datos"],
      img: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&h=600&fit=crop&auto=format",
    },
    {
      id: "10",
      category: "GOBERNANZA",
      title: "Alianzas estratégicas y cooperación internacional",
      desc: "Vinculación multinivel con organismos globales, universidades, sociedad civil y sector privado para potenciar recursos alineados con el ODS 17.",
      scope: ["Mesas de trabajo multilateral", "Fondos de cooperación internacional", "Redes globales de conocimiento"],
      img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800&h=600&fit=crop&auto=format",
    }
  ];

  const filteredLines = selectedCategory === "ALL"
    ? lines
    : lines.filter(l => l.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <PageHero
        tag="Marco de Acción Institucional"
        titleWhite="Ejes de intervención y"
        titleGreen="Líneas Estratégicas"
        description="Nuestras 10 líneas de trabajo responden de forma directa a las emergencias socioambientales y a las metas de la Agenda 2030."
        bgImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&h=900&fit=crop"
      />

      {/* Categorías Filter */}
      <section className="py-12 px-6 border-b border-white/10 sticky top-20 bg-neutral-950/90 backdrop-blur-xl z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#85C441] text-black shadow-[0_0_20px_rgba(133,196,65,0.4)]'
                  : 'bg-neutral-900 border border-white/15 text-slate-300 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Líneas */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLines.map(l => (
            <div
              key={l.id}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-white/10 hover:border-[#85C441]/50 transition-all duration-500 flex flex-col justify-between shadow-2xl group hover:-translate-y-1"
            >
              <div>
                <div className="h-48 rounded-2xl overflow-hidden border border-white/10 mb-6 relative">
                  <img src={l.img} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#85C441] text-[11px] font-bold uppercase tracking-wider border border-white/10">
                    Línea {l.id}
                  </div>
                </div>

                <h3 className="font-serif text-xl text-white font-light mb-3 leading-snug">{l.title}</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">{l.desc}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="text-[11px] uppercase tracking-widest text-[#85C441] font-bold mb-2">Alcance Específico</div>
                <div className="space-y-1.5">
                  {l.scope.map((s, idx) => (
                    <div key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#85C441]" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
