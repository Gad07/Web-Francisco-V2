import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: "P-01",
      title: "Gobernanza Ambiental para el Hambre Cero",
      subtitle: "Ganador Reconocimiento Internacional WESS 2026",
      location: "Suelo de Conservación & Zonas Periurbanas",
      status: "En Ejecución",
      desc: "Proyecto emblemático que integra conservación ecosistémica, participación comunitaria, educación ambiental, cooperación interinstitucional y seguridad alimentaria en los territorios más vulnerables.",
      challenge: "Degradación acelerada de áreas agrícolas tradicionales, pérdida de biodiversidad nativa y vulnerabilidad alimentaria en comunidades rurales.",
      solution: "Construcción de módulos biointensivos agroecológicos, bancos comunitarios de semillas criollas y redes de bioinsumos sostenibles.",
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=900&fit=crop&auto=format",
      metrics: [
        { val: "16,890+", label: "Personas beneficiadas directamente" },
        { val: "1,500+", label: "Semillas nativas resguardadas" },
        { val: "8", label: "Bancos de germoplasma criollo" }
      ],
      deliverables: [
        "Manual de Producción Biointensiva en Zonas de Conservación",
        "Red Comunitaria de Custodios del Germoplasma Nactivo",
        "Diagnóstico de Salud Nutricional y Ecosistémica"
      ]
    },
    {
      id: "P-02",
      title: "Custodia Activa del Suelo de Conservación",
      subtitle: "Protección Ecosistémica & Vigilancia Territorial",
      location: "Cuencas Hídricas & Corredores Biológicos",
      status: "Permanente",
      desc: "Estrategia integral de inspección, vigilancia y restauración ecológica para frenar la expansión urbana ilegal y el cambio de uso de suelo.",
      challenge: "Tala clandestina, invasión de áreas protegidas y fragmentación de hábitats de fauna endémica.",
      solution: "Patrullajes comunitarios articulados con tecnología de monitoreo satelital e instalación de cámaras trampa.",
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900&fit=crop&auto=format",
      metrics: [
        { val: "44", label: "Recorridos de inspección en campo" },
        { val: "85,000 ha", label: "Monitoreadas continuamente" },
        { val: "100%", label: "Trazabilidad de denuncias" }
      ],
      deliverables: [
        "Sistema de Monitoreo Georreferenciado en Tiempo Real",
        "Dictámenes Técnicos de Impacto Ambiental para Autoridades",
        "Protocolo Comunitario de Prevención de Ilícitos Ambientales"
      ]
    },
    {
      id: "P-03",
      title: "Red de Salud Ecosistémica y Una Salud",
      subtitle: "Bienestar Animal & Bioseguridad Comunitaria",
      location: "Comunidades Rurales e Interfaz Fauna Silvestre",
      status: "Fase 2",
      desc: "Implementación del modelo 'Una Salud' integrando el bienestar animal, la salud pública y la conservación de la biodiversidad silvestre.",
      challenge: "Enfermedades zoonóticas, uso indiscriminado de agroquímicos y maltrato a animales de trabajo en el campo.",
      solution: "Jornadas integrales de bioseguridad, vacunación, trato digno animal y transición hacia insumos biológicos sin toxicidad.",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format",
      metrics: [
        { val: "31k+", label: "Personas informadas en campañas" },
        { val: "12", label: "Talleres de bioseguridad en ejidos" },
        { val: "0", label: "Uso de plaguicidas de alta peligrosidad en parcelas demostrativas" }
      ],
      deliverables: [
        "Guía de Trato Digno Animal y Bioseguridad Rural",
        "Informe Técnico de Salud de Ecosistemas y Fauna Nactiva",
        "Red de Promotores Comunitarios de Una Salud"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <PageHero
        tag="Acción Territorial Directa"
        titleWhite="Proyectos socioambientales e"
        titleGreen="impacto verificable"
        description="Conoce nuestras iniciativas emblemáticas en campo, diseñadas bajo estrictos indicadores de evaluación, participación comunitaria y gobernanza."
        bgImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&h=900&fit=crop"
      />

      {/* Selector de Proyectos */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Lista Lateral */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold mb-2">Iniciativas Emblemáticas</div>
            {projects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setActiveProject(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeProject === idx
                    ? 'bg-neutral-900 border-[#85C441] shadow-2xl scale-[1.02]'
                    : 'bg-neutral-950 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#85C441] uppercase tracking-wider">{p.id} — {p.status}</span>
                </div>
                <h3 className="font-serif text-lg text-white font-light mb-1">{p.title}</h3>
                <p className="text-xs text-slate-400 font-light">{p.location}</p>
              </div>
            ))}
          </div>

          {/* Consola Principal del Proyecto */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 mb-8 relative">
                <img src={projects[activeProject].img} alt={projects[activeProject].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-[#85C441] text-black font-bold text-xs uppercase tracking-wider">
                    {projects[activeProject].subtitle}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-light mt-3">{projects[activeProject].title}</h2>
                </div>
              </div>

              <p className="text-slate-300 font-light text-base leading-relaxed mb-8">
                {projects[activeProject].desc}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold mb-2">Reto Territorial</div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{projects[activeProject].challenge}</p>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="text-xs uppercase tracking-widest text-[#85C441] font-bold mb-2">Solución Aplicada</div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{projects[activeProject].solution}</p>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-2xl bg-[#85C441]/10 border border-[#85C441]/30">
                {projects[activeProject].metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="font-serif text-xl sm:text-3xl text-[#85C441] font-bold">{m.val}</div>
                    <div className="text-[11px] text-slate-300 font-light mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">Entregables y Resultados Verificables</div>
              <ul className="space-y-2">
                {projects[activeProject].deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#85C441]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
