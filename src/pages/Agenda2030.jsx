import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';

export default function Agenda2030() {
  const [activeOds, setActiveOds] = useState(0);

  const odsList = [
    {
      num: "02",
      title: "Hambre Cero",
      tagline: "Soberanía alimentaria y agricultura biointensiva",
      desc: "Despliegue de agricultura biointensiva, huertos familiares y custodia de bancos de germoplasma criollo para garantizar la soberanía alimentaria comunitaria en zonas rurales y periurbanas.",
      scope: [
        "Red de 8 bancos comunitarios de semillas criollas",
        "Formación en biopreparados y manejo agroecológico",
        "Circuitos cortos de abasto y comercialización justa",
      ],
      stat: "16,890+",
      statLabel: "personas beneficiadas",
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "03",
      title: "Salud y Bienestar",
      tagline: "Enfoque integral 'Una Salud' en territorio",
      desc: "Implementación del enfoque integral 'Una Salud', vinculando la salud ecosistémica, el trato digno a la fauna silvestre y el bienestar humano libre de contaminantes tóxicos.",
      scope: [
        "Erradicación de plaguicidas de alta peligrosidad",
        "Monitoreo biológico de fuentes de agua y suelo",
        "Programas de bioseguridad y bienestar animal rural",
      ],
      stat: "44",
      statLabel: "recorridos de salud ecosistémica",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "06",
      title: "Agua Limpia y Saneamiento",
      tagline: "Protección de recarga hídrica y humedales",
      desc: "Conservación de las zonas de recarga del acuífero en el suelo de conservación, monitoreo de manantiales y soluciones de saneamiento ecológico descentralizado.",
      scope: [
        "Delimitación de 12 zonas prioritarias de recarga",
        "Sistemas comunitarios de captación pluvial",
        "Biofiltros de tratamiento en asentamientos periurbanos",
      ],
      stat: "1.2M m³",
      statLabel: "de agua infiltrada protegida",
      img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "13",
      title: "Acción por el Clima",
      tagline: "Mitigación y resiliencia en bosques nativos",
      desc: "Monitoreo satelital y terrestre para prevención de incendios, reforestación con especies nativas resilientes y fortalecimiento de capacidades climáticas locales.",
      scope: [
        "Prevención y combate comunitario de incendios",
        "Mapeo de vulnerabilidad climática micro-cuenca",
        "Brigadas comunitarias de vigilancia ambiental",
      ],
      stat: "18M",
      statLabel: "árboles nativos en corredores",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "15",
      title: "Vida de Ecosistemas Terrestres",
      tagline: "Custodia activa del suelo de conservación",
      desc: "Combate al cambio de uso de suelo, tala ilegal y degradación biológica mediante patrullajes comunitarios, ordenamiento territorial ecológico y restauración de flora nativa.",
      scope: [
        "Dictámenes jurídicos y denuncias por tala ilegal",
        "Restauración de suelos degradados por erosión",
        "Monitoreo de fauna nativa con cámaras trampa",
      ],
      stat: "85,000 ha",
      statLabel: "bajo esquema de vigilancia",
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "17",
      title: "Alianzas para lograr los Objetivos",
      tagline: "Coordinación interinstitucional y multilateral",
      desc: "Plataforma de articulación entre los tres órdenes de gobierno, la academia, el sector privado y las autoridades comunales para potenciar recursos e impacto en el territorio.",
      scope: [
        "Mecanismos de colaboración con organismos globales",
        "Convenios con instituciones de educación superior",
        "Rendición de cuentas y datos socioambientales abiertos",
      ],
      stat: "50+",
      statLabel: "instituciones aliadas",
      img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&h=900&fit=crop&auto=format",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <PageHero
        tag="Compromiso Global"
        titleWhite="Alineación con la"
        titleGreen="Agenda 2030 y los ODS"
        description="Transformamos los Objetivos de Desarrollo Sostenible de las Naciones Unidas en proyectos concretos, verificables y de alto impacto socioambiental en el territorio."
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop"
      />

      {/* Interactive ODS Showcase */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* ODS Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {odsList.map((item, idx) => (
              <div
                key={item.num}
                onClick={() => setActiveOds(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeOds === idx
                    ? 'bg-neutral-900 border-[#85C441] shadow-2xl translate-x-2'
                    : 'bg-neutral-950 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-serif text-2xl font-bold ${
                      activeOds === idx ? 'text-[#85C441]' : 'text-slate-600'
                    }`}
                  >
                    ODS {item.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-white font-light">{item.title}</h3>
                    <p className="text-xs text-slate-400 font-light">{item.tagline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ODS Detail Card */}
          <div className="lg:col-span-7 relative min-h-[500px] rounded-3xl overflow-hidden border border-white/15 bg-neutral-900/80 backdrop-blur-2xl p-8 sm:p-12 flex flex-col justify-between shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <img src={odsList[activeOds].img} alt={odsList[activeOds].title} className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#85C441]/10 border border-[#85C441]/30 text-[#85C441] text-xs uppercase font-bold tracking-widest mb-6">
                <span>Objetivo {odsList[activeOds].num}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light mb-4">
                {odsList[activeOds].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8">
                {odsList[activeOds].desc}
              </p>

              <div className="space-y-3 mb-8">
                <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold">Líneas de Acción en Campo</div>
                {odsList[activeOds].scope.map((s, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-slate-300 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#85C441]" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#85C441] font-bold">{odsList[activeOds].stat}</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-light">{odsList[activeOds].statLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
