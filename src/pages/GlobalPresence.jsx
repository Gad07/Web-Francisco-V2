import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import RealWorldMap from '../components/RealWorldMap.jsx';
import { Link } from 'react-router-dom';

const COUNTRIES = {
  mexico: {
    id: 'mexico',
    name: 'México',
    title: 'Sede Institucional & Dirección Global',
    status: 'Sede Global y País de Origen',
    desc: 'México es el país de origen y sede institucional del CGA. Desde la Ciudad de México se articula la dirección estratégica, la coordinación de proyectos y la vinculación con actores públicos, académicos, sociales y productivos.',
    enlace: 'Mtro. Luis D. García González (Presidencia) · Mtro. Francisco Solorio (Secretaría Ejecutiva) · Lic. Verónica González (Dirección Nacional de Proyectos) · Consejo Honorífico: Dr. Carlos Esquivel Lacroix y Dra. Erika Sánchez.',
    proyectos: 'Territorios que Alimentan y antecedentes territoriales en Xochimilco; agendas ambientales estatales, estrategias ESG y reinserción socioambiental en distintas fases de desarrollo.',
    alianzas: 'México por el Clima, KabPrison Project y Expo México Mujer',
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    contactoEmail: 'info@consejoglobalambiental.com',
    noticiasLink: '/comunicacion',
  },
  canada: {
    id: 'canada',
    name: 'Canadá',
    title: 'Council for Green Action — Canada',
    status: 'Agenda de Cooperación e Intercambio',
    desc: 'La agenda de Council for Green Action — Canada concentra acciones de acercamiento, intercambio de experiencias y exploración de cooperación en conservación urbana, restauración ecológica, participación comunitaria y sostenibilidad territorial. En 2026 se realizaron actividades de vinculación en Toronto, Ottawa y Montreal.',
    enlace: null, // Dato por confirmar: oculto según criterio directivo
    proyectos: 'Vinculación con iniciativas de conservación y participación comunitaria; diálogo en espacios de cooperación México–Canadá; antecedentes de actividades territoriales y reuniones institucionales en 2026.',
    alianzas: 'Exploración de sinergias institucionales',
    alianzasEmail: 'partnerships@councilforgreenaction.com',
    contactoEmail: 'info@councilforgreenaction.com',
    noticiasLink: '/comunicacion',
  },
  colombia: {
    id: 'colombia',
    name: 'Colombia',
    title: 'Vinculación Académica & Cooperación Técnica',
    status: 'Intercambio de Conocimiento',
    desc: 'La agenda de vinculación en Colombia se orienta al intercambio de conocimiento académico y a explorar colaboraciones en sostenibilidad, cambio climático, ciencia y gobernanza ambiental.',
    enlace: null,
    proyectos: 'Participación académica prevista en Bogotá en noviembre de 2026 (programada como evento futuro).',
    alianzas: 'Diálogo con actores académicos y ambientales',
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    contactoEmail: 'info@consejoglobalambiental.com',
    noticiasLink: '/comunicacion',
  },
  costarica: {
    id: 'costarica',
    name: 'Costa Rica',
    title: 'Proyección Internacional',
    status: 'Exploración de Mecanismos de Cooperación',
    desc: 'Costa Rica forma parte de los países considerados en la proyección internacional del CGA. La información pública de esta sección se actualizará conforme se formalicen actividades, interlocuciones y mecanismos de cooperación.',
    enlace: null,
    proyectos: 'En fase de articulación institucional.',
    alianzas: 'En desarrollo',
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    contactoEmail: 'info@consejoglobalambiental.com',
    noticiasLink: '/comunicacion',
  },
  espana: {
    id: 'espana',
    name: 'España',
    title: 'Proyección Internacional',
    status: 'Interlocución Institucional',
    desc: 'España forma parte de la proyección internacional del CGA. La página reunirá información verificable sobre actividades, interlocución institucional y cooperación técnica que se desarrollen en el país.',
    enlace: null,
    proyectos: 'En fase de articulación institucional.',
    alianzas: 'En desarrollo',
    alianzasEmail: 'alianzas@consejoglobalambiental.com',
    contactoEmail: 'info@consejoglobalambiental.com',
    noticiasLink: '/comunicacion',
  },
};

export default function GlobalPresence() {
  const [activeCountryId, setActiveCountryId] = useState('mexico');
  const activeCountry = COUNTRIES[activeCountryId] || COUNTRIES.mexico;

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="Presencia global y"
        titleGreen="cooperación territorial"
        description="Con sede en México, el Consejo Global Ambiental conecta capacidades técnicas, experiencias comunitarias y espacios de diálogo en México, Canadá, Colombia, Costa Rica y España."
        bgImage="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=900&fit=crop&auto=format"
      />

      {/* =================================================================
          03 PRESENCIA GLOBAL: MAPA Y FICHAS NACIONALES
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
            Red Multilateral
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.12]">
            Cooperación entre territorios <br />
            <span className="italic text-[#4a5a22]">con base en acuerdos reales.</span>
          </h2>
          <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed font-light">
            Cada país se presenta de acuerdo con la naturaleza real de sus actividades y acuerdos, sin equiparar una visita institucional con una representación formal. Selecciona un país en el mapa o en las pestañas para consultar su ficha nacional.
          </p>
        </div>

        {/* Pestañas de Países */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#d8ceb6]">
          {Object.values(COUNTRIES).map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCountryId(c.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCountryId === c.id
                  ? 'bg-[#4a5a22] text-[#f5efe3] shadow-sm'
                  : 'bg-[#ece4d0] text-[#5c523e] hover:bg-[#dfd7c2]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Mapa Interactivo */}
        <div className="rounded-3xl overflow-hidden border border-[#d8ceb6] bg-[#141811] shadow-xl mb-12 h-[380px] sm:h-[480px]">
          <RealWorldMap activeCountry={activeCountryId} onSelectCountry={(id) => setActiveCountryId(id)} />
        </div>

        {/* Ficha Nacional Oficial */}
        <div className="bg-[#ece4d0]/60 rounded-3xl p-8 sm:p-12 border border-[#d8ceb6] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8ceb6] pb-6 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block mb-1">
                {activeCountry.status}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-medium">
                {activeCountry.name}
              </h3>
              <p className="text-sm text-[#7a6e58] font-light mt-0.5">
                {activeCountry.title}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${activeCountry.contactoEmail}`}
                className="px-5 py-2 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider hover:bg-[#3a4a18] transition-colors"
              >
                Contacto: {activeCountry.contactoEmail}
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block mb-1">
                Descripción Institucional:
              </span>
              <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed">
                {activeCountry.desc}
              </p>
            </div>

            {activeCountry.enlace && (
              <div>
                <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block mb-1">
                  Representación o Enlace Nacional:
                </span>
                <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                  {activeCountry.enlace}
                </p>
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block mb-1">
                Proyectos y Actividades:
              </span>
              <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                {activeCountry.proyectos}
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block mb-1">
                Alianzas y Vinculación Local:
              </span>
              <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                {activeCountry.alianzas} ·{' '}
                <a
                  href={`mailto:${activeCountry.alianzasEmail}`}
                  className="text-[#4a5a22] underline font-medium"
                >
                  {activeCountry.alianzasEmail}
                </a>
              </p>
            </div>

            <div className="pt-4 border-t border-[#d8ceb6]/60 flex items-center justify-between text-xs text-[#7a6e58]">
              <span>Noticias y actividades relacionadas en la sección de Comunicación:</span>
              <Link to="/comunicacion" className="text-[#4a5a22] hover:underline font-semibold">
                Ver en Comunicación &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
