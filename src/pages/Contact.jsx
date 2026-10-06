import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

const SUBJECT_OPTIONS = [
  {
    id: 'alianzas',
    es: 'Alianzas institucionales y cooperación internacional.',
    en: 'Institutional alliances and international cooperation.',
  },
  {
    id: 'proyectos',
    es: 'Proyectos ambientales, territoriales, educativos y de seguridad alimentaria.',
    en: 'Environmental, territorial, educational and food security projects.',
  },
  {
    id: 'investigacion',
    es: 'Investigación aplicada, dictámenes y publicaciones científicas.',
    en: 'Applied research, expert opinions and scientific publications.',
  },
  {
    id: 'empresarial',
    es: 'Participación empresarial y estrategias de sostenibilidad ESG.',
    en: 'Corporate participation and ESG sustainability strategies.',
  },
  {
    id: 'acreditacion',
    es: 'Acreditación para la Asamblea Anual y foros públicos.',
    en: 'Accreditation for the Annual Assembly and public forums.',
  },
  {
    id: 'prensa',
    es: 'Prensa, entrevistas y solicitudes de información institucional.',
    en: 'Press, interviews and institutional information requests.',
  },
];

export default function Contact() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: 'alianzas',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Alianzas y', en: 'Alliances and' }}
          titleGreen={{ es: 'colaboración institucional', en: 'institutional collaboration' }}
          description={{
            es: 'Construimos sinergias para transformar el conocimiento en impacto territorial. Contáctanos para explorar modelos de cooperación.',
            en: 'We build synergies to turn knowledge into territorial impact. Contact us to explore cooperation models.',
          }}
          bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
        />

        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#eae4d2]/90 border border-[#d8ceb6] backdrop-blur-2xl shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mb-3">
                {t({ es: 'Enviar un mensaje al Consejo', en: 'Send a message to the Council' })}
              </h2>
              <p className="text-sm text-[#6b6048] font-light">
                {t({
                  es: 'Selecciona la modalidad de vinculación y nuestro equipo de la Secretaría Ejecutiva se pondrá en contacto a la brevedad.',
                  en: 'Choose the type of enquiry and our Executive Secretariat team will get in touch shortly.',
                })}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#4a5a22]/15 border border-[#4a5a22]/40 text-center">
                <div className="text-3xl mb-3 text-[#4a5a22]">✓</div>
                <h3 className="font-serif text-2xl text-[#2d2618] mb-2 font-light">
                  {t({ es: 'Mensaje Recibido', en: 'Message Received' })}
                </h3>
                <p className="text-sm text-[#6b6048] font-light">
                  {t({
                    es: 'Gracias por ponerte en contacto con el Consejo Global Ambiental. Tu solicitud ha sido derivada al área correspondiente.',
                    en: 'Thank you for contacting the Global Environmental Council. Your request has been forwarded to the relevant department.',
                  })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                      {t({ es: 'Nombre Completo *', en: 'Full Name *' })}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t({ es: 'Tu nombre completo', en: 'Your full name' })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                      {t({ es: 'Correo Electrónico *', en: 'Email Address *' })}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                    {t({ es: 'Institución / Organización', en: 'Institution / Organization' })}
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder={t({
                      es: 'Nombre de tu organización, universidad o empresa',
                      en: 'Name of your organization, university or company',
                    })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                    {t({ es: 'Motivo del Contacto *', en: 'Reason for Contact *' })}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {t(opt)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                    {t({ es: 'Mensaje / Detalles *', en: 'Message / Details *' })}
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t({
                      es: 'Describe brevemente la propuesta o solicitud...',
                      en: 'Briefly describe the proposal or request...',
                    })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#4a5a22] text-[#f5efe3] font-bold text-xs uppercase tracking-widest hover:bg-[#3a4a18] transition-all shadow-md"
                >
                  {t({ es: 'Enviar Mensaje Institucional', en: 'Send Institutional Message' })} &rarr;
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
