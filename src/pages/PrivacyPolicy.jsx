import React, { useEffect } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, UserCheck, Mail, Compass, HelpCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      id: 'responsable',
      number: '01',
      title: {
        es: 'Identidad y Domicilio del Responsable del Tratamiento',
        en: 'Identity and Address of the Data Controller',
      },
      content: {
        es: `El Consejo Global Ambiental (en lo sucesivo, el "CGA" o el "Responsable"), organismo internacional dedicado a la gobernanza ecológica, la custodia biocultural y el desarrollo sostenible fundado en la Ciudad de México, con representaciones bilaterales en Canadá (Council for Green Action), Colombia, Costa Rica y España, es el responsable del uso, protección y tratamiento legítimo de sus datos personales.

En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de los Estados Unidos Mexicanos, su Reglamento, los Lineamientos del Aviso de Privacidad, el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la Ley de Protección de Información Personal y Documentos Electrónicos (PIPEDA) de Canadá, ponemos a su disposición este Aviso de Privacidad Integral.

Para efectos del presente aviso, el CGA señala como canal de contacto y domicilio digital oficial para la atención de datos personales el correo electrónico institucional: privacidad@consejoglobalambiental.com.`,
        en: `The Global Environmental Council (hereinafter, the "CGA" or the "Data Controller"), an international organization dedicated to ecological governance, biocultural custody, and sustainable development founded in Mexico City, with bilateral liaison nodes across Canada (Council for Green Action), Colombia, Costa Rica, and Spain, is the data controller responsible for the lawful processing and safeguarding of your personal data.

In compliance with the Mexican Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP), its Regulations, the European Union General Data Protection Regulation (GDPR), and the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA), we present this Comprehensive Privacy Policy.

For the purposes of this notice, the CGA designates as its official digital office and contact point for personal data inquiries the email address: privacidad@consejoglobalambiental.com.`,
      },
    },
    {
      id: 'datos-recabados',
      number: '02',
      title: {
        es: 'Datos Personales que Recabamos',
        en: 'Personal Data We Collect',
      },
      content: {
        es: `Para cumplir con los propósitos formativos, de divulgación científica y de cooperación institucional del CGA, podemos recabar las siguientes categorías de datos personales:

1. Datos de Identificación y Contacto: Nombre completo, correo electrónico, número telefónico (opcional), país y ciudad de residencia, idioma de preferencia.
2. Datos Académicos y Profesionales: Nivel de estudios, institución académica u organización de procedencia, cargo o especialidad, currículum vitae y carta de exposición de motivos (recabados exclusivamente cuando el titular postula a diplomados, seminarios o convocatorias de la CGA Academy).
3. Datos de Navegación Técnica: Dirección IP (anonimizada), identificadores de sesión, tipo de navegador, sistema operativo y páginas visitadas dentro del portal (a través de cookies y registros del servidor).

Nota sobre Datos Sensibles: El CGA NO solicita ni recaba datos personales sensibles (tales como origen étnico, creencias religiosas, afiliación sindical, opiniones políticas o datos biométricos) para la navegación ordinaria ni para la postulación a actividades académicas.`,
        en: `To fulfill our educational, scientific dissemination, and institutional cooperation objectives, the CGA may collect the following categories of personal data:

1. Identification and Contact Data: Full name, email address, optional telephone number, country and city of residence, preferred language.
2. Academic and Professional Records: Level of education, home institution or company, professional title or field, curriculum vitae, and statement of purpose (gathered exclusively when candidates apply for diplomas, seminars, or specialized fellowships at the CGA Academy).
3. Technical Browsing Data: Anonymized IP address, session tokens, browser configuration, operating system, and on-site behavioral metrics (via cookies and web server logs).

Note on Sensitive Data: The CGA DOES NOT request or collect sensitive personal data (such as racial origin, religious beliefs, union membership, political affiliations, or biometric credentials) for standard browsing or educational applications.`,
      },
    },
    {
      id: 'finalidades',
      number: '03',
      title: {
        es: 'Finalidades del Tratamiento de Datos',
        en: 'Purposes of Data Processing',
      },
      content: {
        es: `Los datos personales que recabamos son utilizados para las siguientes finalidades:

A. Finalidades Primarias (necesarias para el servicio solicitado):
• Atender, gestionar y dar seguimiento a las consultas, mensajes y solicitudes enviadas a través de nuestros formularios oficiales de contacto.
• Procesar solicitudes de admisión, matriculación y evaluación de expedientes para los diplomados, cursos y talleres de la CGA Academy.
• Emitir constancias, diplomas y certificados académicos con validación curricular.
• Coordinar mesas de trabajo, convenios interinstitucionales y vinculación con aliados técnicos y comunitarios.
• Garantizar la seguridad, estabilidad y funcionamiento técnico de la plataforma digital.

B. Finalidades Secundarias (opcionales):
• Envío de boletines informativos, convocatorias anuales y comunicados de prensa sobre el CGA y la Agenda 2030.
• Invitaciones a conferencias magistrales, asambleas anuales y webinars abiertos.

Si el titular no desea que sus datos personales sean tratados para finalidades secundarias, podrá manifestar su negativa enviando un correo a privacidad@consejoglobalambiental.com sin que ello condicione la atención de sus solicitudes primarias.`,
        en: `Personal data collected is used for the following purposes:

A. Primary Purposes (strictly necessary for requested services):
• Processing and responding to inquiries, institutional communications, and requests submitted via our contact forms.
• Managing candidate evaluation, admissions, and enrollment for diplomas and workshops at the CGA Academy.
• Issuing academic certificates and diplomas with curricular accreditation.
• Coordinating bilateral working groups, multi-stakeholder covenants, and technical partnerships.
• Preserving digital stability, access governance, and web platform security.

B. Secondary Purposes (optional):
• Delivering institutional newsletters, annual calls, and press releases regarding CGA projects and the 2030 Agenda.
• Sending invitations to open academic seminars, annual general assemblies, and keynote webinars.

Should you wish to opt out of secondary purposes, you may notify us anytime at privacidad@consejoglobalambiental.com without prejudice to your primary services.`,
      },
    },
    {
      id: 'transferencias',
      number: '04',
      title: {
        es: 'Transferencias de Datos Personales',
        en: 'Transfers of Personal Data',
      },
      content: {
        es: `El Consejo Global Ambiental NO comercializa, vende, alquila ni cede bases de datos personales a terceros con fines comerciales o de lucro.

Únicamente podrán efectuarse transferencias de datos sin requerir el consentimiento del titular en los supuestos previstos por el artículo 37 de la LFPDPPP y normativas internacionales equivalentes, tales como:
1. Proveedores tecnológicos de infraestructura en la nube (alojamiento de servidores y base de datos) sujetos a cláusulas de confidencialidad y medidas de seguridad homologadas.
2. Instituciones académicas aliadas (como IIES UNAM o CECG Biosfera) exclusivamente para la acreditación y expedición conjunta de certificados universitarios solicitados por el propio alumno.
3. Autoridades competentes en cumplimiento de obligaciones legales o mandamientos judiciales debidamente fundados y motivados.`,
        en: `The Global Environmental Council DOES NOT sell, rent, commercialize, or trade personal data to third parties for commercial or marketing gains.

Data transfers without the subject's prior consent may only take place in the circumstances permitted by applicable data protection legislation (such as article 37 of Mexico's LFPDPPP and GDPR standard contractual clauses), including:
1. Secure cloud infrastructure and hosting providers bound by strict confidentiality and data protection agreements.
2. Academic partner universities (such as IIES UNAM or CECG Biosphere) strictly for joint verification and accreditation of certificates requested by the candidate.
3. Law enforcement or competent judicial authorities pursuant to valid legal obligations.`,
      },
    },
    {
      id: 'derechos-arco',
      number: '05',
      title: {
        es: 'Ejercicio de Derechos ARCO y Revocación del Consentimiento',
        en: 'Exercise of ARCO Rights and Consent Revocation',
      },
      content: {
        es: `Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información en caso de que esté desactualizada o sea inexacta (Rectificación); que la eliminemos de nuestros registros cuando considere que no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición). Estos derechos se conocen como Derechos ARCO.

Para ejercer cualquiera de sus Derechos ARCO o revocar su consentimiento, deberá enviar una solicitud por escrito al correo institucional:
📧 privacidad@consejoglobalambiental.com

Su solicitud deberá contener:
1. Nombre completo del titular y correo electrónico para comunicarle la respuesta.
2. Documento oficial que acredite su identidad (o la representación legal correspondiente).
3. Descripción clara y precisa de los datos respecto de los cuales busca ejercer alguno de los derechos ARCO.
4. Cualquier elemento que facilite la localización de los datos.

Plazos de respuesta: El Comité de Privacidad del CGA emitirá una resolución en un plazo no mayor a 20 días hábiles, haciéndola efectiva, si resulta procedente, dentro de los 15 días hábiles siguientes.`,
        en: `You have the right to know what personal data we hold about you, how we use it, and the terms of its processing (Access). You are equally entitled to request the correction of your personal data if outdated or inaccurate (Rectification); to demand its erasure from our repositories when deemed unnecessary or unlawfully processed (Cancellation); and to object to the processing of your data for specific purposes (Opposition). These are known as ARCO Rights under Mexican law and GDPR Articles 15–21.

To exercise any of your ARCO Rights or to revoke previously granted consent, please email a formal petition to:
📧 privacidad@consejoglobalambiental.com

Your petition must include:
1. Full name of the data subject and a return email address.
2. Official identification proving your identity (or authorized proxy).
3. Clear and concise description of the personal data and the specific right you seek to exercise.
4. Any relevant contextual information assisting the retrieval of your record.

Response Timeframe: The CGA Privacy Committee will issue a determination within 20 business days, making the measure effective, if deemed admissible, within the following 15 business days.`,
      },
    },
    {
      id: 'cookies-rastreo',
      number: '06',
      title: {
        es: 'Uso de Cookies y Tecnologías de Rastreo',
        en: 'Use of Cookies and Tracking Technologies',
      },
      content: {
        es: `Le informamos que en nuestro sitio web utilizamos cookies y otras tecnologías que nos permiten monitorear su comportamiento como usuario de internet, brindar una navegación fluida, recordar sus preferencias de idioma y ofrecer contenidos adaptados a su región.

Los datos que obtenemos a través de estas tecnologías incluyen: identificadores de sesión, idioma seleccionado, navegador y páginas de destino. Puede aceptar, rechazar o configurar en cualquier momento el uso de estas cookies mediante nuestro gestor interactivo o revisando nuestra Política de Cookies detallada.`,
        en: `We inform you that our website employs cookies and related technical indicators that allow us to evaluate user navigation, maintain optimal platform stability, preserve your language settings, and tailor relevant biocultural content to your geography.

Data obtained through these technologies includes: session hashes, preferred language, browser engine, and route engagement. You may accept, reject, or customize your cookie preferences at any time using our floating cookie manager or by inspecting our dedicated Cookie Policy.`,
      },
    },
    {
      id: 'seguridad',
      number: '07',
      title: {
        es: 'Medidas de Seguridad de la Información',
        en: 'Information Security and Safeguards',
      },
      content: {
        es: `El CGA ha adoptado e implementa medidas de seguridad técnicas, administrativas y físicas con el fin de proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado. Entre estas medidas se incluyen:
• Transmisión cifrada de extremo a extremo mediante certificados SSL/TLS (HTTPS).
• Control estricto de accesos con privilegios mínimos y contraseñas robustas.
• Resguardo de bases de datos en entornos seguros protegidos contra intrusiones.
• Políticas internas de confidencialidad suscritas por el personal y colaboradores del Consejo.`,
        en: `The CGA has instituted administrative, physical, and technical safeguards to preserve your personal data against damage, loss, alteration, destruction, or unauthorized disclosure and processing. These safeguards include:
• End-to-end encrypted transmission over modern SSL/TLS (HTTPS) certificates.
• Role-based access control with least-privilege policies.
• Protected database hosting behind enterprise-grade firewalls.
• Internal non-disclosure agreements binding all Council fellows, researchers, and technical staff.`,
      },
    },
    {
      id: 'modificaciones',
      number: '08',
      title: {
        es: 'Modificaciones al Aviso de Privacidad',
        en: 'Amendments to the Privacy Notice',
      },
      content: {
        es: `El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales, de nuestras propias prácticas institucionales o de mejoras en los programas del Consejo Global Ambiental.

Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir este aviso a través de esta misma página web, indicando la fecha de última actualización. Le recomendamos visitar periódicamente esta sección.`,
        en: `This Privacy Policy may be modified, updated, or adapted in response to newly enacted legal mandates, institutional developments, or pedagogical enhancements within CGA programs.

We pledge to keep you fully apprised of any amendments directly through this web page, indicating the date of the most recent revision. We encourage periodic review of this section.`,
      },
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite={{ es: 'Aviso y Política de', en: 'Notice and Policy of' }}
        titleGreen={{ es: 'Privacidad Integral', en: 'Comprehensive Privacy' }}
        description={{
          es: 'Tratamiento ético, confidencial y transparente de sus datos personales, conforme a los más altos estándares normativos nacionales e internacionales.',
          en: 'Ethical, confidential, and transparent governance of personal data, compliant with leading national and international privacy frameworks.',
        }}
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80&fit=crop&auto=format"
      />

      <main className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto font-sans">
        {/* Cabecera de acreditación */}
        <Reveal>
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ece4d0]/70 border border-[#d8ceb6] shadow-sm mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#4a5a22]/15 border border-[#4a5a22]/30 flex items-center justify-center text-[#4a5a22] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4a5a22] block font-semibold">
                  {t({ es: 'Protección de Datos · LFPDPPP / RGPD / PIPEDA', en: 'Data Protection · LFPDPPP / GDPR / PIPEDA' })}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
                  {t({ es: 'Aviso de Privacidad Integral', en: 'Comprehensive Privacy Notice' })}
                </h2>
              </div>
            </div>
            <div className="text-right sm:border-l sm:border-[#d8ceb6] sm:pl-6 text-xs text-[#6b6048]">
              <span className="block font-mono text-[11px] text-[#4a5a22] font-semibold">
                {t({ es: 'Responsable Oficial:', en: 'Official Controller:' })} CGA
              </span>
              <span>{t({ es: 'Vigencia: Noviembre 2026', en: 'Effective: November 2026' })}</span>
            </div>
          </div>
        </Reveal>

        {/* Índice de navegación */}
        <Reveal delay={0.05}>
          <div className="mb-14 p-6 rounded-2xl bg-white/60 border border-[#d8ceb6]/80">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22] mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>{t({ es: 'Secciones del Aviso de Privacidad', en: 'Privacy Notice Sections' })}</span>
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

        {/* Secciones de política */}
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

        {/* Tarjeta de Derechos ARCO */}
        <Reveal delay={0.2}>
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#1e1910] text-[#f5efe3] border border-[#443824] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#cdd2a6] font-semibold">
                {t({ es: 'Canal Oficial de Atención ARCO', en: 'Official ARCO Rights Channel' })}
              </span>
              <h4 className="font-serif text-2xl font-light text-white">
                {t({ es: '¿Deseas ejercer tus Derechos ARCO?', en: 'Wish to exercise your ARCO Rights?' })}
              </h4>
              <p className="text-xs sm:text-sm text-[#d8d2c2]/80 leading-relaxed font-light">
                {t({
                  es: 'Puedes solicitar en cualquier momento el acceso, rectificación, cancelación u oposición al tratamiento de tus datos personales enviando un mensaje directo a nuestro Oficial de Privacidad.',
                  en: 'You may request access, rectification, cancellation, or opposition to your personal data processing at any time by contacting our designated Privacy Officer.',
                })}
              </p>
            </div>
            <a
              href="mailto:privacidad@consejoglobalambiental.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5a6b2a] hover:bg-[#6b8032] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>privacidad@consejoglobalambiental.com</span>
            </a>
          </div>
        </Reveal>

        {/* Enlaces cruzados */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-[#5c523e]">
          <Link to="/terminos-y-condiciones" className="hover:text-[#4a5a22] underline underline-offset-4">
            {t({ es: 'Ver Términos y Condiciones →', en: 'View Terms & Conditions →' })}
          </Link>
          <span>·</span>
          <Link to="/politica-de-cookies" className="hover:text-[#4a5a22] underline underline-offset-4">
            {t({ es: 'Ver Política de Cookies →', en: 'View Cookie Policy →' })}
          </Link>
        </div>
      </main>

      <FooterNav />
    </div>
  );
}

