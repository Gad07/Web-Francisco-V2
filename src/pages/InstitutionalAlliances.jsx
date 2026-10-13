import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { Link } from 'react-router-dom';

export default function InstitutionalAlliances() {
  const alliances = [
    {
      id: 'mexico-clima',
      name: 'México por el Clima',
      tag: 'Plataforma & Acción Climática',
      desc: 'Colaboración orientada a la difusión de iniciativas climáticas, sensibilización y articulación técnica para la mitigación y adaptación en el territorio nacional.',
    },
    {
      id: 'kab-prison',
      name: 'KabPrison Project',
      tag: 'Reinserción & Sostenibilidad Social',
      desc: 'Iniciativa enfocada en educación, reciclaje, derechos humanos y procesos de sensibilización socioambiental en centros de reinserción y espacios educativos en América.',
    },
    {
      id: 'expo-mujer',
      name: 'Expo México Mujer',
      tag: 'Empoderamiento & Liderazgo Multisectorial',
      desc: 'Plataforma de vinculación orientada al desarrollo socioeconómico, la participación de las mujeres y la integración de la sostenibilidad en espacios productivos y comunitarios.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="Alianzas"
        titleGreen="institucionales y cooperación"
        description="El CGA desarrolla una agenda de colaboración con plataformas, proyectos y organizaciones que aportan conocimiento, alcance sectorial y capacidades complementarias."
        bgImage="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&h=900&fit=crop&auto=format"
      />

      {/* =================================================================
          1.5 ALIANZAS INSTITUCIONALES
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
            Cooperación Estratégica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.12]">
            Colaboración multisectorial <br />
            <span className="italic text-[#4a5a22]">con objetivos definidos.</span>
          </h2>
          <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed font-light">
            El Consejo Global Ambiental desarrolla una agenda de colaboración con plataformas, proyectos y organizaciones que aportan conocimiento, alcance sectorial y capacidades complementarias. Las alianzas se orientan a objetivos concretos de cooperación técnica, articulación de proyectos y desarrollo de capacidades.
          </p>
        </div>

        {/* Directorio de Alianzas Autorizadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {alliances.map((a) => (
            <div
              key={a.id}
              className="bg-[#ece4d0]/60 rounded-3xl p-8 border border-[#d8ceb6] shadow-sm flex flex-col justify-between hover:border-[#4a5a22]/60 transition-all duration-300"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block mb-2">
                  {a.tag}
                </span>
                <h3 className="font-serif text-2xl text-[#2d2618] font-medium mb-3">
                  {a.name}
                </h3>
                <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                  {a.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs text-[#7a6e58]">
                <span>Cooperación Activa</span>
                <span className="text-[#4a5a22] font-semibold">CGA México</span>
              </div>
            </div>
          ))}
        </div>

        {/* Caja de Contacto Institucional para Nuevas Alianzas */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
              ¿Deseas proponer una agenda de cooperación institucional?
            </h4>
            <p className="text-sm text-[#6b6048] font-light">
              Para acuerdos de colaboración técnica, articulación de proyectos o desarrollo de capacidades territoriales, comunícate con la Secretaría Ejecutiva.
            </p>
          </div>
          <a
            href="mailto:alianzas@consejoglobalambiental.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider hover:bg-[#3a4a18] transition-colors shrink-0 shadow-sm"
          >
            alianzas@consejoglobalambiental.com
          </a>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
