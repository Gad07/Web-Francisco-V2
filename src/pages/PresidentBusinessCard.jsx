import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';
import { DEFAULT_GOVERNANCE_MEMBERS } from '../data/governanceData.js';
import { formatDriveUrl } from '../utils/imageUtils.js';

/**
 * PÁGINA: Semblanza, Perfil e Información Directiva
 * Soporta de manera fluida y monográfica:
 * - Mtro. Luis García González (/luis-garcia, /presidencia)
 * - Mtro. Francisco Solorio (/francisco-solorio, /secretaria-ejecutiva)
 */
export default function PresidentBusinessCard({ memberId }) {
  const { t } = useI18n();
  const location = useLocation();
  const { governanceMembers = [] } = useSiteSettings();

  const currentPath = (location.pathname || '').toLowerCase();
  const isSolorio = memberId === 'francisco-solorio' || currentPath.includes('solorio');

  const sourceMembers = governanceMembers && governanceMembers.length > 0
    ? governanceMembers
    : DEFAULT_GOVERNANCE_MEMBERS;

  const member = sourceMembers.find(
    (m) => isSolorio
      ? m.id === 'francisco-solorio'
      : (m.id === 'luis-garcia' || (typeof m.role?.es === 'string' && m.role.es.toLowerCase().includes('presidente')))
  ) || (isSolorio ? sourceMembers.find(m => m.id === 'francisco-solorio') : sourceMembers[0]);

  const phoneMx = member.social?.phoneMx || '+52 55 3083 1032';
  const phoneCa = member.social?.phoneCa || '+1 437 290 8820';
  const rawEmails = member.social?.emails || member.social?.email || (isSolorio ? 'secretaria@consejocga.org' : 'presidencia@consejocga.org');
  const emailList = (Array.isArray(rawEmails) ? rawEmails : String(rawEmails).split(/[\n,;]+/))
    .map(e => e.trim())
    .filter(Boolean);
  const primaryEmail = emailList[0] || (isSolorio ? 'secretaria@consejocga.org' : 'presidencia@consejocga.org');
  const email = primaryEmail;
  const whatsappUrl = member.social?.whatsapp || 'https://wa.me/525530831032';
  const roleName = member.displayRole ? t(member.displayRole) : (member.role ? t(member.role) : (isSolorio ? 'Secretario Ejecutivo' : 'Consejero Presidente'));

  // ─── DATOS PERSONALIZADOS POR PERFIL ───
  const quoteData = isSolorio
    ? {
        quote: {
          es: '“La acción ambiental solo es legítima cuando echa raíces en el territorio: dialogando de frente con las comunidades, respaldando a los núcleos agrarios y convirtiendo la técnica en bienestar y sustentabilidad tangible.”',
          en: '“Environmental action is only legitimate when it takes root in the territory: engaging directly with communities, supporting agrarian nuclei, and turning technical rigor into tangible sustainability and well-being.”'
        },
        author: 'Mtro. Francisco Solorio — Secretario Ejecutivo y Fundador'
      }
    : {
        quote: {
          es: '“Nuestra misión trasciende las fronteras geográficas: consolidar una gobernanza territorial rigurosa, científica y solidaria que vincule a productores, comunidades y organismos multilaterales en favor de la soberanía alimentaria y la conservación de nuestros ecosistemas.”',
          en: '“Our mission transcends geographical boundaries: to consolidate rigorous, scientific and supportive territorial governance that links producers, communities and multilateral bodies in favor of food sovereignty and ecosystem conservation.”'
        },
        author: 'Mtro. Luis García González — Consejero Presidente'
      };

  const bioSectionData = isSolorio
    ? {
        title: { es: 'Semblanza', en: 'Biographical' },
        titleHighlight: { es: 'Operativa & Territorial.', en: 'Operations & Leadership.' },
        subtitle: {
          es: 'Especialista en gestión técnica, despliegue en campo y concertación comunitaria.',
          en: 'Specialist in technical management, field deployment, and community consensus.'
        },
        paragraphs: [
          {
            es: 'El Mtro. Francisco Solorio cuenta con una sólida trayectoria en el diseño, instrumentación y supervisión de proyectos de restauración socioambiental, articulación comunitaria y gestión de recursos naturales. Como Secretario Ejecutivo y Fundador del Consejo Global Agroalimentario, encabeza la dirección ejecutiva y el despliegue técnico del Consejo en territorio.',
            en: 'Mtro. Francisco Solorio has a solid track record in designing, executing, and supervising socio-environmental restoration projects, community liaison, and natural resource management. As Executive Secretary and Founder of the Global Agri-Food Council, he leads executive direction and technical deployment in the field.'
          },
          {
            es: 'Ha encabezado brigadas de intervención bioambiental, programas de capacitación en conservación y modelos de coinversión sostenible con ejidos, núcleos agrarios y cooperativas productivas. Destacan sus labores de educación ambiental, conservación y divulgación comunitaria en el Área Natural Protegida Ejidos de Xochimilco y San Gregorio Atlapulco en la Ciudad de México, así como en corredores prioritarios de Norteamérica.',
            en: 'He has headed bio-environmental intervention crews, conservation training programs, and sustainable co-investment models with communal landholdings, agrarian nuclei, and productive cooperatives. Notable projects include environmental education, conservation, and community outreach in the Protected Natural Area of Ejidos de Xochimilco and San Gregorio Atlapulco in Mexico City, as well as in priority North American corridors.'
          },
          {
            es: 'Su labor articula la interlocución técnica con organismos públicos, agencias de cooperación internacional y el sector privado, asegurando que cada iniciativa cuente con rigurosos protocolos de seguimiento, sustentabilidad económica y beneficio directo para las comunidades locales.',
            en: 'His work bridges technical dialogue with public bodies, international cooperation agencies, and the private sector, ensuring that each initiative adheres to rigorous monitoring protocols, economic sustainability, and direct benefit for local communities.'
          }
        ]
      }
    : {
        title: { es: 'Semblanza', en: 'Biographical' },
        titleHighlight: { es: 'Biográfica & Conducción.', en: 'Background & Leadership.' },
        subtitle: {
          es: 'Experiencia multisectorial en articulación de políticas ambientales y cooperación transnacional.',
          en: 'Multisectoral experience in environmental policy coordination and transnational cooperation.'
        },
        paragraphs: [
          {
            es: 'El Mtro. Luis García González ha dedicado más de dos décadas al diseño, articulación y conducción de marcos normativos, ambientales y de gobernanza territorial. Su liderazgo al frente del Consejo Global Agroalimentario ha consolidado un modelo de gestión basado en la evidencia científica, el diálogo institucional de alto nivel y la inclusión comunitaria.',
            en: 'Mtro. Luis García González has dedicated more than two decades to designing, articulating and leading regulatory, environmental and territorial governance frameworks. His leadership at the Global Agri-Food Council has consolidated a management model based on scientific evidence, high-level institutional dialogue and community inclusion.'
          },
          {
            es: 'Ha encabezado delegaciones en foros multilaterales de desarrollo sostenible, biodiversidad y soberanía agroalimentaria en América del Norte y Europa, promoviendo acuerdos interinstitucionales entre agencias gubernamentales, organismos de financiamiento verde, universidades y confederaciones de productores.',
            en: 'He has headed delegations in multilateral forums on sustainable development, biodiversity and agri-food sovereignty across North America and Europe, promoting inter-institutional agreements among government agencies, green financing bodies, universities, and producer confederations.'
          },
          {
            es: 'Como fundador del CGA, impulsó la estructura estatutaria que garantiza la independencia técnica del Consejo y la integración de investigadores de prestigio en la toma de decisiones territoriales.',
            en: 'As founder of the CGA, he spearheaded the statutory structure ensuring the Council’s technical independence and the integration of prestigious researchers in territorial decision-making.'
          }
        ]
      };

  const milestonesData = isSolorio
    ? [
        {
          period: '2024 — ACTUALIDAD',
          location: 'México · Sede Operativa',
          title: { es: 'Despliegue Territorial del Modelo de Gestión Bioambiental', en: 'Territorial Deployment of the Bio-Environmental Model' },
          desc: {
            es: 'Coordinación directa de brigadas técnicas de monitoreo, tecnificación de riego eficiente y capacitación comunitaria en parcelas demostrativas para la adopción de prácticas agroecológicas.',
            en: 'Direct coordination of technical monitoring crews, efficient irrigation technification, and community training in demonstration plots for the adoption of agroecological practices.'
          }
        },
        {
          period: '2022 — 2024',
          location: 'Valle de México · Corredores Productivos',
          title: { es: 'Conservación Comunitaria en Humedales y Áreas Naturales', en: 'Community Conservation in Wetlands and Natural Areas' },
          desc: {
            es: 'Implementación de esquemas de remediación ambiental, participación comunitaria y preservación de zonas lacustres en colaboración con núcleos ejidales y autoridades ambientales.',
            en: 'Implementation of environmental remediation schemes, community participation, and wetland preservation in collaboration with ejidal nuclei and environmental authorities.'
          }
        },
        {
          period: '2020 — 2022',
          location: 'Institucional',
          title: { es: 'Cofundación e Integración de la Estructura Operativa del CGA', en: 'Co-founding and Integration of CGA Operational Structure' },
          desc: {
            es: 'Estructuración de los reglamentos técnicos de operación, mesas de trabajo con confederaciones productoras y conformación de la Secretaría Ejecutiva del Consejo.',
            en: 'Structuring technical operational regulations, working tables with producer confederations, and establishment of the Council’s Executive Secretariat.'
          }
        }
      ]
    : [
        {
          period: '2024 — ACTUALIDAD',
          location: 'México · Canadá · Suiza',
          title: { es: 'Despliegue del Corredor Binacional de Gobernanza Agroalimentaria', en: 'Deployment of the Binational Agri-Food Governance Corridor' },
          desc: {
            es: 'Articulación de acuerdos de cooperación técnica e intercambio científico entre instituciones productivas de México y Canadá, con enlace permanente en Ginebra para la armonización de estándares ambientales.',
            en: 'Articulation of technical cooperation and scientific exchange agreements between productive institutions in Mexico and Canada, with permanent liaison in Geneva for environmental standard harmonization.'
          }
        },
        {
          period: '2022 — 2024',
          location: 'América Latina',
          title: { es: 'Consolidación de las Redes Territoriales Comunitarias', en: 'Consolidation of Community Territorial Networks' },
          desc: {
            es: 'Supervisión del despliegue en campo con núcleos ejidales, comunidades locales y cooperativas agropecuarias para la adopción de esquemas de agricultura regenerativa y protección hídrica.',
            en: 'Oversight of field deployment with ejidal nuclei, local communities, and agricultural cooperatives for the adoption of regenerative agriculture and watershed protection frameworks.'
          }
        },
        {
          period: '2020 — 2022',
          location: 'Institucional',
          title: { es: 'Fundación Estatutaria del Consejo Global Agroalimentario', en: 'Statutory Foundation of the Global Agri-Food Council' },
          desc: {
            es: 'Redacción y promulgación de los estatutos fundacionales, instalación de la primera Asamblea Anual y constitución del Consejo Honorífico con destacados científicos del sector.',
            en: 'Drafting and promulgation of the founding bylaws, installation of the first Annual Assembly, and establishment of the Honorary Council with leading sector scientists.'
          }
        }
      ];

  const pillarsData = isSolorio
    ? {
        title: { es: 'Pilares Estratégicos', en: 'Strategic Pillars' },
        titleHighlight: { es: 'de la Secretaría Ejecutiva.', en: 'of the Executive Secretariat.' },
        subtitle: {
          es: 'Ejes rectores del despliegue operativo y la gestión comunitaria coordinada por el Mtro. Francisco Solorio.',
          en: 'Guiding axes of operational deployment and community management coordinated by Mtro. Francisco Solorio.'
        },
        items: [
          {
            title: { es: 'Despliegue en Territorio', en: 'Field Deployment' },
            desc: {
              es: 'Presencia permanente en comunidades agrícolas, supervisión técnica en campo y articulación directa con productores y núcleos ejidales.',
              en: 'Permanent presence in agricultural communities, on-site technical supervision, and direct liaison with producers and ejidal nuclei.'
            }
          },
          {
            title: { es: 'Concertación Multiactor', en: 'Multi-Stakeholder Consensus' },
            desc: {
              es: 'Mesas de diálogo y alianzas público-privadas que alinean los objetivos de desarrollo sustentable con las necesidades económicas de los productores.',
              en: 'Dialogue tables and public-private alliances aligning sustainable development goals with the economic needs of producers.'
            }
          },
          {
            title: { es: 'Rigor Técnico Operativo', en: 'Operational Technical Rigor' },
            desc: {
              es: 'Metodologías comprobadas de restauración ecológica, monitoreo de bioindicadores y optimización eficiente de recursos en cada intervención.',
              en: 'Proven ecological restoration methodologies, bioindicator monitoring, and efficient resource optimization in each intervention.'
            }
          }
        ]
      }
    : {
        title: { es: 'Pilares Estratégicos', en: 'Strategic Pillars' },
        titleHighlight: { es: 'de la Agenda de Presidencia.', en: 'of Presidency Agenda.' },
        subtitle: {
          es: 'Ejes rectores de la agenda de trabajo impulsada por el Mtro. Luis García González ante la comunidad internacional.',
          en: 'Guiding axes of the working agenda driven by Mtro. Luis García González before the international community.'
        },
        items: [
          {
            title: { es: 'Diplomacia Agroalimentaria', en: 'Agri-Food Diplomacy' },
            desc: {
              es: 'Articulación de alto nivel con agencias internacionales, organismos multilaterales y representaciones diplomáticas para consolidar alianzas estratégicas.',
              en: 'High-level coordination with international agencies, multilateral bodies, and diplomatic missions to consolidate strategic alliances.'
            }
          },
          {
            title: { es: 'Gobernanza & Soberanía', en: 'Governance & Sovereignty' },
            desc: {
              es: 'Orientación de marcos normativos y modelos de gestión territorial que aseguren la sustentabilidad de los ecosistemas y la producción agroalimentaria.',
              en: 'Guidance of regulatory frameworks and territorial management models ensuring ecosystem sustainability and agri-food production.'
            }
          },
          {
            title: { es: 'Rigor & Agenda 2030', en: 'Rigor & 2030 Agenda' },
            desc: {
              es: 'Integración de investigación científica aplicada, monitoreo bioambiental y cumplimiento de metas internacionales de desarrollo sostenible.',
              en: 'Integration of applied scientific research, bio-environmental monitoring, and compliance with international sustainable development goals.'
            }
          }
        ]
      };

  const officeData = isSolorio
    ? {
        title: { es: 'Secretaría', en: 'Executive' },
        titleHighlight: { es: 'Ejecutiva & Operación.', en: 'Secretariat & Operations.' },
        desc: {
          es: 'Atención y enlace oficial para comités técnicos, núcleos agrarios, delegaciones operativas y alianzas institucionales en campo.',
          en: 'Official contact and liaison for technical committees, agrarian nuclei, operational delegations, and field institutional partnerships.'
        }
      }
    : {
        title: { es: 'Despacho', en: 'Presidency' },
        titleHighlight: { es: 'de Presidencia.', en: 'Office.' },
        desc: {
          es: 'Atención y enlace oficial para comisiones gubernamentales, delegaciones internacionales, organismos multilaterales y representaciones territoriales.',
          en: 'Official liaison for government commissions, international delegations, multilateral bodies, and territorial representations.'
        }
      };

  const defaultImgFallback = isSolorio
    ? '/imports/Perfiles/FranciscoSolorio.png'
    : '/imports/Perfiles/LuisGarcia.png';

  return (
    <div className="min-h-screen bg-[#f7f4ec] text-[#282216] font-sans selection:bg-[#4a5a22] selection:text-white flex flex-col justify-between">
      {/* ─── NAVBAR SUPERIOR ─── */}
      <HeaderNav />

      {/* ─── CONTENIDO EDITORIAL (ABIERTO, LIMPIO Y SIN ETIQUETAS TÉCNICAS) ─── */}
      <main className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full">

        {/* ─── 1. HERO MONOGRÁFICO: RETRATO Y ENCABEZADO ABIERTO ─── */}
        <section className="pb-16 sm:pb-20 border-b border-[#ded7c8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Retrato Oficial limpio */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5.2] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(40,34,22,0.12)] border border-[#d8ceb6] bg-white group">
                <img
                  src={formatDriveUrl(member.img)}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const currentSrc = e.currentTarget.src || '';
                    if (currentSrc.includes('googleusercontent.com/d/') && !e.currentTarget.dataset.retried) {
                      e.currentTarget.dataset.retried = 'true';
                      const idMatch = currentSrc.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
                      if (idMatch && idMatch[1]) {
                        e.currentTarget.src = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
                        return;
                      }
                    }
                    e.currentTarget.src = defaultImgFallback;
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>
            </div>

            {/* Datos y Títulos */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#221c12] tracking-tight leading-[1.04]">
                  {member.name}
                </h1>

                <p className="font-serif italic text-xl sm:text-2xl text-[#4a5a22]">
                  {roleName}
                </p>

                <p className="text-xs sm:text-sm text-[#7a6e58] font-mono uppercase tracking-wider">
                  {t(member.tag || (isSolorio
                    ? { es: 'Dirección Ejecutiva & Alianzas Territoriales', en: 'Executive Leadership & Territorial Alliances' }
                    : { es: 'Presidencia & Estrategia Multilateral', en: 'Presidency & Multilateral Strategy' }))} · {t(member.country || { es: 'México / Internacional', en: 'Mexico / International' })}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#4a4030] leading-relaxed font-light text-justify">
                {t(member.bio)}
              </p>

              {/* Canales Directos y Teléfonos sin cajitas */}
              <div className="pt-6 border-t border-[#ded7c8] space-y-4">
                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7a6e58] block">
                      {t({ es: 'Línea Directa México', en: 'Mexico Direct Line' })}
                    </span>
                    <a
                      href={`tel:${phoneMx.replace(/\s+/g, '')}`}
                      className="font-mono text-sm sm:text-base font-semibold text-[#282216] hover:text-[#4a5a22] transition-colors block mt-1 tracking-tight"
                    >
                      {phoneMx}
                    </a>
                  </div>

                  <div className="border-l border-[#ded7c8] pl-6">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7a6e58] block">
                      {t({ es: 'Línea Directa Canadá', en: 'Canada Direct Line' })}
                    </span>
                    <a
                      href={`tel:${phoneCa.replace(/\s+/g, '')}`}
                      className="font-mono text-sm sm:text-base font-semibold text-[#282216] hover:text-[#4a5a22] transition-colors block mt-1 tracking-tight"
                    >
                      {phoneCa}
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-xs flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7a6e58] block">
                      {t(isSolorio 
                        ? { es: emailList.length > 1 ? 'Secretaría Ejecutiva (Correos Oficiales)' : 'Secretaría Ejecutiva', en: emailList.length > 1 ? 'Executive Secretariat (Official Emails)' : 'Executive Secretariat' } 
                        : { es: emailList.length > 1 ? 'Despacho Institucional (Correos Oficiales)' : 'Despacho Institucional', en: emailList.length > 1 ? 'Institutional Office (Official Emails)' : 'Institutional Office' }
                      )}
                    </span>
                    <div className="space-y-1 mt-0.5">
                      {emailList.map((em, idx) => (
                        <a
                          key={idx}
                          href={`mailto:${em}`}
                          className="font-mono text-xs sm:text-sm font-semibold text-[#282216] hover:text-[#4a5a22] transition-colors block leading-tight"
                        >
                          {em}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Redes Sociales y Canales Directos Unificados en Iconos */}
                  <div className="flex items-center gap-4 text-[#554e40]">
                    <a
                      href={`mailto:${email}`}
                      className="text-[#554e40] hover:text-[#4a5a22] hover:scale-115 transition-all"
                      title={t(isSolorio ? { es: 'Escribir a Secretaría Ejecutiva', en: 'Write to Executive Secretariat' } : { es: 'Escribir a Presidencia', en: 'Write to Presidency' })}
                      aria-label="Email"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#554e40] hover:text-[#25d366] hover:scale-115 transition-all"
                      title="WhatsApp Directo"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </a>

                    <a
                      href={member.social?.linkedin || 'https://www.linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#554e40] hover:text-[#0077b5] hover:scale-115 transition-all"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                      </svg>
                    </a>

                    <a
                      href={member.social?.facebook || 'https://www.facebook.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#554e40] hover:text-[#1877f2] hover:scale-115 transition-all"
                      title="Facebook"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    <a
                      href={member.social?.instagram || 'https://www.instagram.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#554e40] hover:text-[#e4405f] hover:scale-115 transition-all"
                      title="Instagram"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. MANIFIESTO Y DECLARACIÓN DE LIDERAZGO (PULL-QUOTE ABIERTO) ─── */}
        <section className="py-16 sm:py-20 border-b border-[#ded7c8]">
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#221c12] leading-snug">
              {t(quoteData.quote)}
            </p>
            <div className="pt-2 text-sm font-serif italic text-[#4a5a22]">
              {quoteData.author}
            </div>
          </div>
        </section>

        {/* ─── 3. TRAYECTORIA Y FORMACIÓN (DOS COLUMNAS EDITORIALES ABIERTAS) ─── */}
        <section className="py-16 sm:py-20 border-b border-[#ded7c8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-light text-[#221c12] leading-[1.1] tracking-tight">
                {t(bioSectionData.title)}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t(bioSectionData.titleHighlight)}
                </span>
              </h2>
              <p className="text-sm sm:text-[15px] text-[#6b6048] font-light leading-relaxed pt-1">
                {t(bioSectionData.subtitle)}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-[#4a4030] leading-relaxed font-light text-justify">
              {bioSectionData.paragraphs.map((p, idx) => (
                <p key={idx}>{t(p)}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. HITOS DE GESTIÓN Y ACUERDOS (CRONOLOGÍA EDITORIAL ABIERTA) ─── */}
        <section className="py-16 sm:py-20 border-b border-[#ded7c8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-light text-[#221c12] leading-[1.1] tracking-tight">
                {t({ es: 'Hitos de Gestión', en: 'Leadership Milestones' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: '& Acuerdos.', en: '& Agreements.' })}
                </span>
              </h2>
              <p className="text-sm sm:text-[15px] text-[#6b6048] font-light leading-relaxed pt-1">
                {t({
                  es: 'Principales iniciativas de vinculación multilateral y territorial bajo su encargo institucional.',
                  en: 'Key multilateral and territorial liaison initiatives under his institutional tenure.'
                })}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {milestonesData.map((hito, idx) => (
                <div
                  key={idx}
                  className={`${idx < milestonesData.length - 1 ? 'pb-6 border-b border-[#e5decb]' : ''} space-y-2`}
                >
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[#4a5a22] font-semibold tracking-wide">{hito.period}</span>
                    <span className="text-[#7a6e58]">{hito.location}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#221c12]">
                    {t(hito.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a4030] font-light leading-relaxed">
                    {t(hito.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. ATRIBUCIONES ESTATUTARIAS (NUMERACIÓN ROMANA EDITORIAL ABIERTA) ─── */}
        <section className="py-16 sm:py-20 border-b border-[#ded7c8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-light text-[#221c12] leading-[1.1] tracking-tight">
                {t({ es: 'Responsabilidades', en: 'Statutory' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'Estatutarias.', en: 'Responsibilities.' })}
                </span>
              </h2>
              <p className="text-sm sm:text-[15px] text-[#6b6048] font-light leading-relaxed pt-1">
                {t({
                  es: 'Facultades conferidas por el Estatuto General del Consejo Global Agroalimentario.',
                  en: 'Powers conferred by the General Bylaws of the Global Agri-Food Council.'
                })}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {member.responsibilities && member.responsibilities.map((resp, idx) => {
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
                return (
                  <div
                    key={idx}
                    className="py-4 border-b border-[#e5decb] flex items-start gap-5"
                  >
                    <span className="font-serif text-xl sm:text-2xl text-[#4a5a22] font-semibold w-8 shrink-0">
                      {romanNumerals[idx] || `0${idx + 1}`}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base text-[#282216] font-normal leading-relaxed">
                        {t(resp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 6. EJES RECTORES DE LA AGENDA DIRECTIVA (COLUMNAS ABIERTAS) ─── */}
        <section className="py-16 sm:py-20 border-b border-[#ded7c8]">
          <div className="mb-12 max-w-3xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#221c12] leading-[1.1] tracking-tight">
              {t(pillarsData.title)}{' '}
              <span className="italic text-[#4a5a22] font-normal">
                {t(pillarsData.titleHighlight)}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed">
              {t(pillarsData.subtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {pillarsData.items.map((item, idx) => (
              <div key={idx} className="space-y-3 pt-4 border-t-2 border-[#4a5a22]">
                <h3 className="font-serif text-xl text-[#221c12]">
                  {t(item.title)}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#4a4030] font-light leading-relaxed">
                  {t(item.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 7. DESPACHO OFICIAL / ENLACE DIRECTO ─── */}
        <section className="py-12 sm:py-16">
          <div className="rounded-2xl bg-[#efe9dc]/70 border border-[#ded7c8] p-8 sm:p-12 shadow-[0_10px_30px_rgba(40,34,22,0.04)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#221c12] leading-[1.1] tracking-tight">
                  {t(officeData.title)}{' '}
                  <span className="italic text-[#4a5a22] font-normal">
                    {t(officeData.titleHighlight)}
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-[#5c503d] font-light leading-relaxed">
                  {t(officeData.desc)}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>{t({ es: 'Canal Oficial WhatsApp', en: 'Official WhatsApp' })}</span>
                </a>
              </div>
            </div>

            {/* Enlace de navegación cruzada entre semblanzas */}
            <div className="mt-8 pt-6 border-t border-[#ded7c8] flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
              <Link
                to={isSolorio ? '/luis-garcia' : '/francisco-solorio'}
                className="inline-flex items-center gap-2 text-[#4a5a22] hover:text-[#2d2618] font-semibold transition-colors"
              >
                <span>
                  {isSolorio
                    ? t({ es: '← Ver perfil y semblanza del Mtro. Luis García González', en: '← View profile of Mtro. Luis García González' })
                    : t({ es: 'Ver perfil y semblanza del Mtro. Francisco Solorio →', en: 'View profile of Mtro. Francisco Solorio →' })}
                </span>
              </Link>

              <Link
                to="/gobernanza"
                className="text-[#7a6e58] hover:text-[#2d2618] transition-colors"
              >
                {t({ es: 'Explorar Consejo Colegiado de Gobernanza', en: 'Explore Collegial Governance Council' })}
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER NAV ─── */}
      <FooterNav />
    </div>
  );
}
