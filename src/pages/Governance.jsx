import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import franciscoSolorioImg from '../imports/Perfiles/FranciscoSolorio.png';

export default function Governance() {
  const leadership = [
    {
      num: '01',
      name: 'Mtro. Luis García González',
      role: 'Consejero Presidente y Fundador',
      tag: 'Presidencia & Estrategia',
      bio: 'Con amplia experiencia en liderazgo institucional y gobernanza ambiental estratégica. Ha impulsado diálogos de alto nivel, articulación con organismos multilaterales y la consolidación de marcos normativos y territoriales en favor de la sostenibilidad y la regeneración ecosistémica.',
      responsibilities: [
        'Conducción institucional y representación de alto nivel ante organismos internacionales.',
        'Orientación estratégica de la agenda ambiental, científica y territorial.',
        'Presidencia de la Asamblea Anual y articulación de acuerdos multilaterales.',
        'Supervisión del cumplimiento de los principios y estatutos del Consejo.'
      ],
      social: {
        email: 'presidencia@consejocga.org'
      },
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&auto=format',
    },
    {
      num: '02',
      name: 'Mtro. Francisco Solorio',
      role: 'Secretario Ejecutivo y Fundador',
      tag: 'Dirección Ejecutiva & Alianzas',
      bio: 'Especialista en gestión técnica, cooperación territorial y alianzas público-privadas para la acción ambiental. Encabeza el despliegue operativo en campo, la articulación con ejidos y comunidades, y la implementación rigurosa de proyectos socioambientales.',
      responsibilities: [
        'Dirección ejecutiva, gestión técnica y coordinación operativa general.',
        'Cooperación institucional e internacional con aliados estratégicos.',
        'Acompañamiento en territorio y desarrollo de proyectos sostenibles.',
        'Seguimiento a resoluciones y vinculación interinstitucional.'
      ],
      social: {
        email: 'secretaria@consejocga.org'
      },
      img: franciscoSolorioImg,
    }
  ];

  const council = [
    {
      name: 'Dr. Carlos Esquivel Lacroix',
      role: 'Consejero Honorífico',
      area: 'Bienestar Animal y Una Salud',
      bio: 'Especialista en bienestar animal y medicina veterinaria con amplia trayectoria internacional. Orienta las iniciativas que vinculan el trato digno a los animales con la protección ecosistémica y la salud humana.',
      country: 'México / Internacional',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&auto=format',
    },
    {
      name: 'Dra. Elena Vance',
      role: 'Consejera Honorífica',
      area: 'Conservación Marina y Océanos',
      bio: 'Investigadora en oceanografía y arrecifes coralinos. Aporta conocimiento para los programas de conservación costera y restauración de ecosistemas marinos.',
      country: 'Internacional',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&auto=format',
    },
    {
      name: 'Mtro. Mateo Morales',
      role: 'Consejero Honorífico',
      area: 'Gobernanza Territorial y Suelo',
      bio: 'Especialista en ordenamiento territorial, derecho ambiental y protección comunitaria del suelo de conservación.',
      country: 'Latinoamérica',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&auto=format',
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          tag="Estructura e Institucionalidad"
          titleWhite="Gobernanza y"
          titleGreen="liderazgo internacional"
          description="Conoce a las personalidades, especialistas y cuerpos colegiados que dirigen el rumbo estratégico del Consejo Global Ambiental."
          bgImage="https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1600&h=900&fit=crop"
        />

        {/* Liderazgo Fundador */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] mb-3 font-bold">
              Presidencia & Dirección Ejecutiva
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2d2618]">
              Liderazgo Fundador
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadership.map((l) => (
              <div
                key={l.num}
                className="p-8 rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] hover:border-[#4a5a22]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#eae4d2] text-[#4a5a22] border border-[#d8ceb6] font-semibold">
                      {l.tag}
                    </span>
                    <span className="font-serif text-[#4a5a22] text-lg font-bold">{l.num}</span>
                  </div>

                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#d8ceb6] shrink-0 bg-[#f5efe3]">
                      <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">{l.name}</h3>
                      <p className="text-xs text-[#4a5a22] font-semibold tracking-wide mt-1">{l.role}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#6b6048] font-light leading-relaxed mb-6">
                    {l.bio}
                  </p>

                  <div className="border-t border-[#d8ceb6] pt-4 mb-6">
                    <div className="text-xs uppercase tracking-widest text-[#5a6b2a] font-bold mb-3">Responsabilidades Principales</div>
                    <ul className="space-y-2">
                      {l.responsibilities.map((r, i) => (
                        <li key={i} className="text-xs text-[#6b6048] flex items-start gap-2">
                          <span className="text-[#4a5a22] font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#d8ceb6] flex items-center justify-between">
                  <a href={`mailto:${l.social.email}`} className="text-xs text-[#7a6e58] hover:text-[#4a5a22] transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 000-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>{l.social.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejeros Honoríficos */}
        <section className="py-24 px-6 bg-[#eae4d2]/50 border-t border-[#e0d4ba]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] mb-3 font-bold">
                Cuerpo Académico y Técnico
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2d2618]">
                Consejeros Honoríficos
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {council.map((c, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-[#d8ceb6] shadow-sm">
                  <div className="h-48 rounded-2xl overflow-hidden mb-6 border border-[#d8ceb6]">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs text-[#4a5a22] font-bold uppercase tracking-wider mb-1">{c.area}</div>
                  <h3 className="font-serif text-xl text-[#2d2618] font-light mb-2">{c.name}</h3>
                  <p className="text-xs text-[#7a6e58] mb-4 font-medium">{c.role} — {c.country}</p>
                  <p className="text-xs text-[#6b6048] font-light leading-relaxed">{c.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
