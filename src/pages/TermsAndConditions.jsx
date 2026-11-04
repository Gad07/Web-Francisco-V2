import React, { useEffect } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Scale, Compass, Mail, ExternalLink } from 'lucide-react';

export default function TermsAndConditions() {
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      id: 'identidad',
      number: '01',
      title: {
        es: 'Identidad Institucional y Aceptación de los Términos',
        en: 'Institutional Identity and Acceptance of Terms',
      },
      content: {
        es: `El presente documento constituye un acuerdo legal vinculante entre cualquier persona física o moral que acceda, navegue o utilice este portal (en adelante, el "Usuario") y el Consejo Global Ambiental (en adelante, el "CGA" o el "Consejo"), organismo internacional fundado el 4 de febrero de 2020 en la Ciudad de México, con representaciones y nodos de vinculación en Canadá (Council for Green Action), Colombia, Costa Rica y España.

Al acceder, consultar o interactuar con el sitio web oficial (consejoglobalambiental.com, councilforgreenaction.com y sus subdominios asociados), el Usuario declara haber leído, comprendido y aceptado en su totalidad estos Términos y Condiciones, así como nuestro Aviso de Privacidad y Política de Cookies. Si el Usuario no está de acuerdo con alguna de las disposiciones aquí establecidas, deberá abstenerse de continuar navegando y utilizando los servicios de la plataforma.`,
        en: `This document constitutes a legally binding agreement between any natural or legal entity accessing, browsing, or utilizing this portal (hereinafter, the "User") and the Global Environmental Council (hereinafter, the "CGA" or the "Council"), an international body founded on February 4, 2020, in Mexico City, with representations and bilateral liaisons across Canada (Council for Green Action), Colombia, Costa Rica, and Spain.

By accessing, consulting, or interacting with the official website (consejoglobalambiental.com, councilforgreenaction.com, and associated subdomains), the User declares to have read, understood, and agreed in full to these Terms and Conditions, as well as our Privacy Policy and Cookie Policy. If the User does not agree with any provision herein, they must cease use and browsing immediately.`,
      },
    },
    {
      id: 'objeto',
      number: '02',
      title: {
        es: 'Objeto de la Plataforma y Alcance de los Servicios',
        en: 'Platform Purpose and Scope of Services',
      },
      content: {
        es: `La plataforma digital del CGA tiene como propósito primordial la divulgación científica, la promoción de la gobernanza territorial, la custodia biocultural, la vinculación interinstitucional y la formación académica a través de la CGA Academy. 

A través de este sitio, el CGA pone a disposición del público:
1. Información oficial sobre los diez ejes de acción institucionales alineados con la Agenda 2030 y los Objetivos de Desarrollo Sostenible (ODS).
2. Publicaciones científicas, artículos de divulgación, análisis normativo y comunicados de prensa.
3. Catálogo de programas territoriales, proyectos de restauración ecológica y bancos de germoplasma.
4. Convocatorias de formación, diplomados, cursos y talleres impartidos por cuadros docentes y especialistas.
5. Canales de vinculación y registro para alianzas estratégicas, cooperación internacional y voluntariado.`,
        en: `The primary purpose of the CGA digital platform is scientific dissemination, territorial governance promotion, biocultural custody, inter-institutional liaison, and academic training via the CGA Academy.

Through this portal, the CGA provides:
1. Official information regarding the ten institutional action axes aligned with the 2030 Agenda and the Sustainable Development Goals (SDGs).
2. Scientific papers, editorial articles, policy analysis, and institutional press releases.
3. Catalog of territorial programs, ecological restoration initiatives, and germplasm banks.
4. Educational calls, diplomas, specialized courses, and workshops led by academic fellows and experts.
5. Official engagement channels for strategic partnerships, international cooperation, and biocultural stewardship.`,
      },
    },
    {
      id: 'propiedad-intelectual',
      number: '03',
      title: {
        es: 'Propiedad Intelectual y Derechos de Autor',
        en: 'Intellectual Property and Copyright',
      },
      content: {
        es: `Todos los elementos presentes en esta plataforma, incluyendo sin limitación: textos, investigaciones, metodologías de gobernanza, nombres institucionales, logotipos, emblemas visuales, fotografías del acervo territorial, archivos audiovisuales, animaciones 3D, elementos interactivos y el código fuente, son propiedad exclusiva del Consejo Global Ambiental o de sus respectivos titulares licenciantes, encontrándose protegidos por las leyes de propiedad intelectual de los Estados Unidos Mexicanos, tratados internacionales (Convenio de Berna, Tratado de la OMPI) y la legislación aplicable en los países donde el CGA tiene presencia.

Queda estrictamente prohibida la reproducción total o parcial, distribución, comunicación pública, transformación, ingeniería inversa o explotación con fines comerciales sin la autorización previa, expresa y por escrito de la Presidencia o la Secretaría General del CGA. Las citas de artículos y documentos científicos están permitidas exclusivamente bajo propósitos de investigación o difusión académica, siempre y cuando se otorgue el crédito explícito al Consejo Global Ambiental y al autor correspondiente.`,
        en: `All materials on this platform, including without limitation: texts, scientific research, governance methodologies, institutional trademarks, logos, visual emblems, territorial photographs, audiovisual assets, 3D animations, interactive modules, and source code, are the exclusive property of the Global Environmental Council or its licensed contributors, protected under Mexican copyright and intellectual property laws, international treaties (Berne Convention, WIPO Copyright Treaty), and applicable international jurisdictions.

Any total or partial reproduction, distribution, public transmission, transformation, reverse engineering, or commercial exploitation without prior written consent from the CGA Presidency or General Secretariat is strictly prohibited. Citation of research and policy papers is permitted solely for non-profit academic or research purposes, provided explicit credit is given to the Global Environmental Council and the respective author.`,
      },
    },
    {
      id: 'uso-correcto',
      number: '04',
      title: {
        es: 'Uso Autorizado y Conducta del Usuario',
        en: 'Authorized Use and User Conduct',
      },
      content: {
        es: `El Usuario se compromete a hacer un uso lícito, diligente y ético de la plataforma. Queda terminantemente prohibido:
• Utilizar mecanismos automatizados (bots, crawlers, scrapers o scripts masivos) para extraer bases de datos, perfiles o contenidos sin autorización expresa.
• Intentar vulnerar o eludir medidas de seguridad, autenticación o restricciones del servidor del CGA.
• Introducir virus, troyanos, código malicioso o ejecutar ataques de denegación de servicio (DDoS).
• Proporcionar datos falsos o suplantar la identidad de terceros en los formularios de contacto, postulación a CGA Academy o solicitudes de alianzas.
• Usar el nombre, emblemas o prestigio del Consejo Global Ambiental para respaldar actividades políticas partidistas o proyectos no avalados formalmente.`,
        en: `The User commits to a lawful, ethical, and diligent use of the platform. The following actions are strictly prohibited:
• Deploying automated systems (bots, crawlers, scrapers, or bulk harvesting scripts) to extract databases, leadership profiles, or content without authorization.
• Attempting to circumvent or breach authentication protocols, firewalls, or security infrastructure of the CGA servers.
• Injecting viruses, malware, trojans, or launching denial-of-service (DDoS) attacks.
• Submitting false records or impersonating third parties in contact forms, CGA Academy applications, or alliance solicitations.
• Using the name, badges, or institutional standing of the Council to endorse partisan political campaigns or unverified initiatives.`,
      },
    },
    {
      id: 'cga-academy',
      number: '05',
      title: {
        es: 'CGA Academy y Postulaciones Académicas',
        en: 'CGA Academy and Academic Applications',
      },
      content: {
        es: `La postulación a diplomados, seminarios y programas de posgrado a través del portal no garantiza automáticamente la admisión del aspirante. La selección se realiza con base en los cupos disponibles, la revisión de perfiles por parte del Comité Académico y el cumplimiento de los requisitos establecidos en cada convocatoria.

El CGA se reserva el derecho de ajustar calendarios, claustro docente o modalidades de impartición cuando causas de fuerza mayor o mejoras pedagógicas así lo requieran, notificando oportunamente a los participantes inscritos.`,
        en: `Application to diplomas, seminars, and postgraduate executive modules via this portal does not automatically guarantee enrollment. Admissions are granted based on seat availability, academic committee review, and compliance with the requirements set forth in each specific call.

The CGA reserves the right to adjust schedules, guest lecturers, or delivery modalities due to operational reasons or educational optimizations, with timely notice delivered to enrolled participants.`,
      },
    },
    {
      id: 'alianzas-terceros',
      number: '06',
      title: {
        es: 'Enlaces a Terceros y Red de Alianzas',
        en: 'Third-Party Links and Alliance Network',
      },
      content: {
        es: `Este sitio web contiene hipervínculos hacia portales externos de aliados institucionales (como el Decenio de la ONU sobre la Restauración de Ecosistemas, WESS Ginebra, IIES UNAM, CECG Biosfera, Alas Metropolitanas, entre otros). Dichos enlaces se ofrecen únicamente como referencia informativa y de cooperación.

El CGA no ejerce control editorial sobre plataformas externas y no asume responsabilidad alguna respecto a las políticas de privacidad, exactitud de contenidos o prácticas comerciales de dichos terceros.`,
        en: `This website contains hyperlinks to external portals of institutional partners (such as the UN Decade on Ecosystem Restoration, WESS Geneva, IIES UNAM, CECG Biosphere, Alas Metropolitanas, among others). Such links are provided strictly for informational and cooperative reference.

The CGA exerts no editorial control over external platforms and assumes no liability regarding the privacy policies, accuracy, or business practices of such third parties.`,
      },
    },
    {
      id: 'responsabilidad',
      number: '07',
      title: {
        es: 'Exclusión de Garantías y Limitación de Responsabilidad',
        en: 'Disclaimer of Warranties and Limitation of Liability',
      },
      content: {
        es: `El CGA realiza esfuerzos continuos para asegurar que la información publicada sea precisa, verídica y actualizada. No obstante, el contenido se proporciona "tal cual" y "según disponibilidad", sin garantías expresas ni implícitas de infalibilidad técnica, ausencia de interrupciones temporales o absoluta exactitud en proyecciones ambientales.

En ningún caso el Consejo, sus consejeros, directivos, investigadores o colaboradores serán responsables por daños directos, indirectos, incidentales o consecuenciales derivados del uso, imposibilidad de uso o decisiones adoptadas a partir de la información contenida en esta plataforma.`,
        en: `The CGA makes continuous efforts to ensure all published materials are accurate, truthful, and up-to-date. However, content is provided "as is" and "as available", without explicit or implicit warranties regarding continuous technical uptime, uninterrupted availability, or total precision of environmental projections.

Under no circumstances shall the Council, its board members, directors, researchers, or collaborators be held liable for any direct, indirect, incidental, or consequential damages resulting from the use, inability to use, or decisions made based on information presented on this platform.`,
      },
    },
    {
      id: 'legislacion',
      number: '08',
      title: {
        es: 'Legislación Aplicable y Jurisdicción',
        en: 'Applicable Law and Jurisdiction',
      },
      content: {
        es: `Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes vigentes de los Estados Unidos Mexicanos. Para cualquier controversia, conflicto o reclamación derivada de la interpretación o ejecución de este acuerdo, las partes se someten expresamente a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.

Para los asuntos vinculados a representaciones bilaterales en Canadá o la Unión Europea, se observarán de manera complementaria los tratados y convenios internacionales pertinentes en materia de comercio digital, propiedad intelectual y derechos humanos.`,
        en: `These Terms and Conditions are governed by and construed in accordance with the laws of the United Mexican States. For any dispute or claim arising from the interpretation or execution of this agreement, the parties expressly submit to the jurisdiction of the competent courts of Mexico City, waiving any other jurisdiction to which they might be entitled by virtue of their present or future domiciles.

For matters involving bilateral liaisons across Canada or the European Union, relevant international conventions regarding digital commerce, intellectual property, and human rights shall apply complimentarily.`,
      },
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite={{ es: 'Términos y', en: 'Terms and' }}
        titleGreen={{ es: 'Condiciones de Uso', en: 'Conditions of Use' }}
        description={{
          es: 'Marco normativo institucional que rige el acceso, consulta, investigación y uso de la plataforma digital del Consejo Global Ambiental.',
          en: 'Institutional regulatory framework governing access, consultation, research, and use of the Global Environmental Council digital platform.',
        }}
        bgImage="https://images.unsplash.com/photo-1511497584788-87676104235f?w=1920&q=80&fit=crop&auto=format"
      />

      <main className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto font-sans">
        {/* Cabecera de metadatos */}
        <Reveal>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ece4d0]/70 border border-[#d8ceb6] shadow-sm mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#4a5a22]/15 border border-[#4a5a22]/30 flex items-center justify-center text-[#4a5a22] shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4a5a22] block font-semibold">
                  {t({ es: 'Gobernanza Digital Institucional', en: 'Institutional Digital Governance' })}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
                  {t({ es: 'Acuerdo de Términos de Servicio', en: 'Terms of Service Agreement' })}
                </h2>
              </div>
            </div>
            <div className="text-right sm:border-l sm:border-[#d8ceb6] sm:pl-6 text-xs text-[#6b6048]">
              <span className="block font-mono text-[11px] text-[#4a5a22] font-semibold">
                {t({ es: 'Vigencia oficial:', en: 'Official validity:' })} 2026–2027
              </span>
              <span>{t({ es: 'Última actualización: Noviembre 2026', en: 'Last updated: November 2026' })}</span>
            </div>
          </div>
        </Reveal>

        {/* Índice de navegación rápida */}
        <Reveal delay={0.05}>
          <div className="mb-14 p-6 rounded-2xl bg-white/60 border border-[#d8ceb6]/80">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22] mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>{t({ es: 'Índice de Cláusulas', en: 'Table of Clauses' })}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center gap-2 text-[#5c523e] hover:text-[#4a5a22] hover:underline underline-offset-4 py-1 transition-colors"
                >
                  <span className="font-mono text-[10px] text-[#4a5a22]/80 font-bold">{sec.number}.</span>
                  <span className="truncate">{t(sec.title)}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Secciones detalladas */}
        <div className="space-y-12">
          {sections.map((sec, idx) => (
            <Reveal key={sec.id} delay={0.06 * Math.min(idx, 4)}>
              <section id={sec.id} className="scroll-mt-28 p-8 sm:p-10 rounded-3xl bg-white/80 border border-[#d8ceb6] shadow-sm space-y-4">
                <div className="flex items-baseline gap-3 border-b border-[#e6decb] pb-3">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#4a5a22]">
                    {sec.number}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
                    {t(sec.title)}
                  </h3>
                </div>
                <div className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed whitespace-pre-line space-y-3 font-sans">
                  {t(sec.content)}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Tarjeta de contacto legal */}
        <Reveal delay={0.2}>
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#1e1910] text-[#f5efe3] border border-[#443824] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#cdd2a6] font-semibold">
                {t({ es: 'Consejería Jurídica & Transparencia', en: 'Legal Counsel & Transparency' })}
              </span>
              <h4 className="font-serif text-2xl font-light text-white">
                {t({ es: '¿Consultas sobre nuestros términos?', en: 'Questions regarding our terms?' })}
              </h4>
              <p className="text-xs sm:text-sm text-[#d8d2c2]/80 leading-relaxed font-light">
                {t({
                  es: 'Para solicitudes de convenios marco, cesión de derechos de autor o aclaraciones legales, comunícate con nuestra secretaría institucional.',
                  en: 'For institutional framework agreements, copyright clearance, or legal inquiries, please contact our institutional secretariat.',
                })}
              </p>
            </div>
            <a
              href="mailto:legal@consejoglobalambiental.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5a6b2a] hover:bg-[#6b8032] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>legal@consejoglobalambiental.com</span>
            </a>
          </div>
        </Reveal>

        {/* Enlaces relacionados */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-[#5c523e]">
          <Link to="/politica-de-privacidad" className="hover:text-[#4a5a22] underline underline-offset-4">
            {t({ es: 'Consultar Política de Privacidad →', en: 'View Privacy Policy →' })}
          </Link>
          <span>·</span>
          <Link to="/politica-de-cookies" className="hover:text-[#4a5a22] underline underline-offset-4">
            {t({ es: 'Consultar Política de Cookies →', en: 'View Cookie Policy →' })}
          </Link>
        </div>
      </main>

      <FooterNav />
    </div>
  );
}

