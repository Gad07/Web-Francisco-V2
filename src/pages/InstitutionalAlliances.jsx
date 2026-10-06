import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { Link } from 'react-router-dom';

export default function InstitutionalAlliances() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: { es: 'Todas las Alianzas', en: 'All Alliances' } },
    { id: 'multilateral', label: { es: 'Organismos Multilaterales', en: 'Multilateral Bodies' } },
    { id: 'academic', label: { es: 'Red Académica & Científica', en: 'Academic & Science Network' } },
    { id: 'territorial', label: { es: 'Organizaciones Comunitarias', en: 'Community Organizations' } },
    { id: 'philanthropic', label: { es: 'Fondos & Filantropía', en: 'Funds & Philanthropy' } },
  ];

  const alliances = [
    {
      name: 'World Environmental Sustainability Summit (WESS)',
      type: 'multilateral',
      scope: { es: 'Global · Ginebra', en: 'Global · Geneva' },
      role: {
        es: 'Socio de gobernanza global y premiación de iniciativas de biocultura.',
        en: 'Global governance partner and bioculture initiatives awarding body.',
      },
      tag: 'Ginebra 2026',
    },
    {
      name: 'Red Iberoamericana de Restauración Biocultural',
      type: 'multilateral',
      scope: { es: 'Iberoamérica', en: 'Ibero-America' },
      role: {
        es: 'Cooperación técnica para la soberanía alimentaria y bancos de germoplasma.',
        en: 'Technical cooperation for food sovereignty and germplasm banks.',
      },
      tag: 'Cooperación Técnica',
    },
    {
      name: 'Instituto de Investigaciones en Ecosistemas y Sustentabilidad',
      type: 'academic',
      scope: { es: 'América Latina', en: 'Latin America' },
      role: {
        es: 'Monitoreo satelital conjunto, modelación climática y validación científica.',
        en: 'Joint satellite monitoring, climate modeling and scientific validation.',
      },
      tag: 'Investigación Aplicada',
    },
    {
      name: 'Centro de Estudios del Cambio Global y la Biosfera',
      type: 'academic',
      scope: { es: 'Internacional', en: 'International' },
      role: {
        es: 'Publicaciones arbitradas y capacitación de cuadros directivos ambientales.',
        en: 'Peer-reviewed publications and environmental leadership training.',
      },
      tag: 'Docencia & Ciencia',
    },
    {
      name: 'Unión de Comunidades y Ejidos Protectores de la Selva',
      type: 'territorial',
      scope: { es: 'Territorial · Corredor Biológico', en: 'Territorial · Biological Corridor' },
      role: {
        es: 'Custodia territorial de 450,000 hectáreas de bosque de niebla y selva alta.',
        en: 'Territorial custody of 450,000 hectares of cloud and tropical rainforest.',
      },
      tag: 'Custodia Territorial',
    },
    {
      name: 'Fondo Global para el Patrimonio Biocultural',
      type: 'philanthropic',
      scope: { es: 'Multilateral', en: 'Multilateral' },
      role: {
        es: 'Financiamiento directo a proyectos comunitarios y brigadas contra la deforestación.',
        en: 'Direct funding for community projects and anti-deforestation brigades.',
      },
      tag: 'Financiamiento Verde',
    },
  ];

  const filteredAlliances = activeCategory === 'all'
    ? alliances
    : alliances.filter((a) => a.type === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite={{ es: 'Alianzas y Red de', en: 'Alliances and Network of' }}
        titleGreen={{ es: 'Cooperación Institucional', en: 'Institutional Cooperation' }}
        description={{
          es: 'Construimos una red sólida de cooperación internacional con organismos multilaterales, universidades, centros de investigación y guardianes territoriales.',
          en: 'We build a robust network of international cooperation with multilateral bodies, universities, research centres and territorial guardians.',
        }}
        bgImage="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&h=900&fit=crop&auto=format"
      />

      {/* INTRO Y PRINCIPIOS DE COOPERACIÓN */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Cooperación Estratégica', en: 'Strategic Cooperation' })}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-[1.15] mt-3 mb-6">
                {t({
                  es: 'El poder de la sinergia para la gobernanza planetaria',
                  en: 'The power of synergy for planetary governance',
                })}
              </h2>
              <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed font-light mb-6">
                {t({
                  es: 'El Consejo Global Ambiental articula sus acciones mediante convenios formales de colaboración científica, técnica y comunitaria que garantizan rigor metodológico, transparencia financiera y soberanía territorial.',
                  en: 'The Global Environmental Council orchestrates its actions through formal scientific, technical and community collaboration agreements ensuring methodological rigour, financial transparency and territorial sovereignty.',
                })}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6]">
                  <p className="font-serif text-3xl text-[#2d2618] font-light">42+</p>
                  <p className="text-xs text-[#6b6048] mt-1 uppercase tracking-wider font-medium">
                    {t({ es: 'Convenios Activos', en: 'Active Agreements' })}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6]">
                  <p className="font-serif text-3xl text-[#2d2618] font-light">18</p>
                  <p className="text-xs text-[#6b6048] mt-1 uppercase tracking-wider font-medium">
                    {t({ es: 'Países en Red', en: 'Network Countries' })}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#d8ceb6]">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&fit=crop&auto=format"
                  alt={t({ es: 'Firma de Acuerdos Multilaterales', en: 'Multilateral Agreement Signing' })}
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d2618]/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <p className="text-[#f5efe3] text-sm sm:text-base font-light font-serif italic">
                    {t({
                      es: '«Ninguna institución puede restaurar la biosfera por sí sola; la cooperación es nuestra mayor fuerza ecológica.»',
                      en: '“No single institution can restore the biosphere alone; cooperation is our greatest ecological strength.”',
                    })}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIRECTORIO DE ALIANZAS CON FILTROS */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 bg-[#eae4d2]/50 border-t border-[#d8ceb6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4a5a22]">
                {t({ es: 'Ecosistema de Cooperación', en: 'Cooperation Ecosystem' })}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mt-2">
                {t({ es: 'Nuestros Aliados Institucionales', en: 'Our Institutional Partners' })}
              </h3>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#4a5a22] text-[#f5efe3] shadow-sm'
                      : 'bg-[#f5efe3] text-[#6b6048] hover:text-[#2d2618] border border-[#d8ceb6]'
                  }`}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlliances.map((item, idx) => (
              <Reveal key={item.name} delay={idx * 0.05}>
                <div className="p-6 sm:p-7 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#4a5a22]">
                        {item.tag}
                      </span>
                      <span className="text-xs text-[#8a7e68] font-light">
                        {t(item.scope)}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light leading-snug mb-3">
                      {item.name}
                    </h4>
                    <p className="text-[#6b6048] text-sm leading-relaxed font-light">
                      {t(item.role)}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#eae4d2] flex items-center justify-between text-xs font-semibold text-[#4a5a22]">
                    <span>{t({ es: 'Convenio Marco Activo', en: 'Active Framework Agreement' })}</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA PARA NUEVAS ALIANZAS */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#2d2618] text-[#f5efe3] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#cdd2a6]">
                {t({ es: 'Red Global', en: 'Global Network' })}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-light mt-2 mb-3">
                {t({
                  es: '¿Deseas sumar a tu institución a nuestra red de impacto?',
                  en: 'Would you like to join your institution to our impact network?',
                })}
              </h4>
              <p className="text-[#d8d2c2]/80 text-sm font-light leading-relaxed">
                {t({
                  es: 'Establecemos acuerdos con gobiernos, universidades, ONGs y comunidades para proyectos territoriales y formación de cuadros directivos.',
                  en: 'We establish agreements with governments, universities, NGOs and communities for territorial projects and executive training.',
                })}
              </p>
            </div>
            <Link
              to="/contacto"
              className="px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-md shrink-0"
            >
              {t({ es: 'Proponer Convenio', en: 'Propose Partnership' })} &rarr;
            </Link>
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
