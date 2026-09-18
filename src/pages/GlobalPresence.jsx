import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';

export default function GlobalPresence() {
  const [activeCountry, setActiveCountry] = useState(0);

  const countries = [
    {
      num: "01",
      country: "México",
      flag: "🇲🇽",
      role: "Sede Central & Núcleo Operativo",
      desc: "Coordinación central, gobernanza territorial, suelo de conservación, áreas naturales protegidas, dictámenes técnicos de política pública, acción climática y articulación multisectorial.",
      scope: "Sede Global & Proyectos en Campo",
      img: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "02",
      country: "Colombia",
      flag: "🇨🇴",
      role: "Cooperación Regional y Biodiversidad",
      desc: "Intercambio técnico latinoamericano, conservación de ecosistemas andino-amazónicos, alianzas académicas e institucionales y desarrollo de iniciativas comunitarias sostenibles.",
      scope: "América del Sur",
      img: "https://images.unsplash.com/photo-1583531172005-827ed04c7949?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "03",
      country: "Canadá",
      flag: "🇨🇦",
      role: "Alianzas Norteamericanas & Ciencia",
      desc: "Cooperación científica para el monitoreo de biomas boreales, articulación con redes internacionales de investigación y gobernanza climática continental.",
      scope: "América del Norte",
      img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=900&fit=crop&auto=format",
    },
    {
      num: "04",
      country: "España",
      flag: "🇪🇸",
      role: "Enlace Euro-Iberoamericano",
      desc: "Vinculación con instituciones europeas, cooperación internacional para el desarrollo, foros globales de sostenibilidad y difusión del conocimiento ambiental.",
      scope: "Europa & Red Iberoamericana",
      img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&h=900&fit=crop&auto=format",
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <PageHero
        tag="Red Multilateral"
        titleWhite="Alcance internacional y"
        titleGreen="presencia global"
        description="El Consejo Global Ambiental articula esfuerzos multilaterales conectando el conocimiento científico global con la acción territorial en diferentes continentes."
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop"
      />

      {/* Grid de Países y Nodos */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Lista de Nodos */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold mb-2">Nodos Institucionales</div>
            {countries.map((c, idx) => (
              <div
                key={c.num}
                onClick={() => setActiveCountry(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeCountry === idx
                    ? 'bg-neutral-900 border-[#85C441] shadow-2xl scale-[1.02]'
                    : 'bg-neutral-950 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-xs font-bold text-[#85C441] uppercase tracking-wider">{c.scope}</span>
                </div>
                <h3 className="font-serif text-xl text-white font-light mb-1">{c.country}</h3>
                <p className="text-xs text-slate-400 font-light">{c.role}</p>
              </div>
            ))}
          </div>

          {/* Tarjeta Visual del Nodo */}
          <div className="lg:col-span-7 relative h-[520px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <img src={countries[activeCountry].img} alt={countries[activeCountry].country} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{countries[activeCountry].flag}</span>
                <h3 className="font-serif text-3xl text-white font-light">{countries[activeCountry].country}</h3>
              </div>
              <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold mb-3">{countries[activeCountry].role}</div>
              <p className="text-sm text-slate-300 font-light leading-relaxed">{countries[activeCountry].desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
