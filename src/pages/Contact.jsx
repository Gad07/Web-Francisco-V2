import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ArrowRight,
  ChevronDown 
} from 'lucide-react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

const SUBJECT_OPTIONS = [
  'Consultas institucionales y alianzas',
  'Propuestas de cooperación y proyectos',
  'Actividades académicas y CGA Academy',
  'Prensa, entrevistas y divulgación',
  'Otras consultas',
];

function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 rounded-xl bg-[#faf7f0] border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer select-none ${
          isOpen
            ? 'border-[#4a5a22] bg-white ring-2 ring-[#4a5a22]/15 shadow-sm'
            : 'border-[#d8ceb6] hover:border-[#4a5a22]/50 hover:bg-white text-[#221e16]'
        }`}
      >
        <span className="truncate block font-normal text-[#221e16]">
          {value}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#7a6e58] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#4a5a22]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 bg-white rounded-2xl border border-[#d8ceb6] shadow-[0_12px_32px_rgba(45,38,24,0.14)] p-1.5 space-y-1 max-h-72 overflow-y-auto">
          {options.map((opt, i) => {
            const isSelected = opt === value;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4a5a22]/10 text-[#4a5a22] font-semibold'
                    : 'text-[#3a3020] hover:bg-[#faf7f0] hover:text-[#221e16]'
                }`}
              >
                <span className="whitespace-normal leading-snug break-words text-left flex-1">{opt}</span>
                {isSelected && <Check className="w-4 h-4 text-[#4a5a22] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: SUBJECT_OPTIONS[0],
    message: '',
    privacyAccepted: false,
  });

  const handleCopy = (text, key) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.privacyAccepted) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between selection:bg-[#4a5a22] selection:text-white">
      <div>
        {/* ─── HERO EDITORIAL ─── */}
        <PageHero
          titleWhite={{ es: 'Contacto oficial y', en: 'Official channels and' }}
          titleGreen={{ es: 'canales de atención', en: 'institutional contact' }}
          description={{
            es: 'Para consultas institucionales, propuestas de cooperación, asuntos relacionados con proyectos, actividades académicas y prensa, utiliza los canales oficiales del Consejo Global Ambiental.',
            en: 'For institutional inquiries, cooperation proposals, projects, academic programs, and press communications, connect via our official CGA offices.'
          }}
          bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
        />

        {/* ─── CONTENEDOR PRINCIPAL: FORMULARIO A LA IZQUIERDA Y CARDS A LA DERECHA ─── */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-14 lg:px-20 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* ════════════════════════════════════════════════════════════════
                COLUMNA IZQUIERDA: FORMULARIO DE CONTACTO (7 COLUMNAS)
            ════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="rounded-3xl bg-white border border-[#d8ceb6] p-7 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(45,38,24,0.04)] h-full flex flex-col justify-between">
                
                {/* Cabecera del Formulario */}
                <div className="mb-8 pb-6 border-b border-[#f0ece4]">
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#221e16] font-light leading-tight">
                    {t({ es: 'Enviar mensaje institucional', en: 'Submit institutional message' })}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#635741] font-light leading-relaxed">
                    {t({
                      es: 'Completa el formulario para canalizar tu solicitud formalmente al área correspondiente.',
                      en: 'Complete the dossier below to route your request directly to the authorized department.'
                    })}
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 sm:p-10 rounded-2xl bg-[#faf7f0] border-2 border-[#4a5a22]/30 text-center space-y-4 my-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#4a5a22] text-white flex items-center justify-center shadow-md">
                      <Check className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#221e16] font-light">
                      {t({ es: 'Mensaje Enviado con Éxito', en: 'Message Successfully Received' })}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#554a37] font-light max-w-md mx-auto leading-relaxed">
                      {t({
                        es: 'Hemos recibido tu comunicación. El equipo del CGA dará seguimiento a tu consulta a través de los datos proporcionados.',
                        en: 'Your inquiry has been logged. The CGA executive team will follow up via your contact information.'
                      })}
                    </p>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            organization: '',
                            subject: SUBJECT_OPTIONS[0],
                            message: '',
                            privacyAccepted: false,
                          });
                        }}
                        className="px-6 py-2.5 rounded-full border border-[#d8ceb6] hover:border-[#4a5a22] bg-white text-xs font-semibold text-[#2d2618] transition-colors cursor-pointer"
                      >
                        {t({ es: 'Enviar otro mensaje', en: 'Send another message' })}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                    {/* Fila 1: Nombre y Correo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                          {t({ es: 'Nombre Completo *', en: 'Full Name *' })}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t({ es: 'Tu nombre y apellidos', en: 'Your full name' })}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#faf7f0] border border-[#d8ceb6] text-[#221e16] placeholder-[#948873] focus:outline-none focus:border-[#4a5a22] focus:bg-white text-xs sm:text-sm transition-all"
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
                          className="w-full px-4 py-3.5 rounded-xl bg-[#faf7f0] border border-[#d8ceb6] text-[#221e16] placeholder-[#948873] focus:outline-none focus:border-[#4a5a22] focus:bg-white text-xs sm:text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Fila 2: Organización */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                        {t({ es: 'Organización o Institución', en: 'Organization or Institution' })}
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder={t({ es: 'Entidad pública, universidad, ONG o empresa', en: 'Public agency, university, NGO or company' })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#faf7f0] border border-[#d8ceb6] text-[#221e16] placeholder-[#948873] focus:outline-none focus:border-[#4a5a22] focus:bg-white text-xs sm:text-sm transition-all"
                      />
                    </div>

                    {/* Fila 3: Asunto */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                        {t({ es: 'Asunto *', en: 'Subject Matter *' })}
                      </label>
                      <CustomSelect
                        value={formData.subject}
                        onChange={(val) => setFormData({ ...formData, subject: val })}
                        options={SUBJECT_OPTIONS}
                      />
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                        {t({ es: 'Mensaje *', en: 'Message *' })}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t({ es: 'Describe brevemente el motivo de tu consulta o propuesta...', en: 'Briefly describe the purpose of your inquiry or proposal...' })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#faf7f0] border border-[#d8ceb6] text-[#221e16] placeholder-[#948873] focus:outline-none focus:border-[#4a5a22] focus:bg-white text-xs sm:text-sm transition-all resize-y"
                      />
                    </div>

                    {/* Checkbox de Privacidad */}
                    <div className="p-3.5 rounded-xl bg-[#faf7f0] border border-[#ded7c8] flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacyAccepted"
                        required
                        checked={formData.privacyAccepted}
                        onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-[#d8ceb6] text-[#4a5a22] focus:ring-[#4a5a22] cursor-pointer"
                      />
                      <label htmlFor="privacyAccepted" className="text-xs text-[#5c523e] font-light leading-snug cursor-pointer">
                        {t({
                          es: 'Acepto el tratamiento de mis datos de contacto exclusivamente para dar seguimiento institucional a esta consulta.',
                          en: 'I accept the processing of my contact data solely for the institutional follow-up of this inquiry.'
                        })}
                      </label>
                    </div>

                    {/* Botón de Envío */}
                    <button
                      type="submit"
                      disabled={!formData.privacyAccepted}
                      className="w-full py-4 px-8 rounded-full bg-[#3a4a18] hover:bg-[#2d3a12] active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed text-[#f5efe3] font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <span>{t({ es: 'Enviar Mensaje', en: 'Send Message' })}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                COLUMNA DERECHA: CARDS DE INFORMACIÓN (5 COLUMNAS)
            ════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col gap-6 h-full">

              {/* CARD 1: Sede Central y Latinoamérica / Europa */}
              <div className="rounded-3xl bg-white border border-[#d8ceb6] p-7 sm:p-8 lg:p-9 shadow-[0_6px_25px_rgba(45,38,24,0.03)] flex-1 flex flex-col justify-between transition-all duration-300">
                <div>
                  <h3 className="font-serif text-2xl text-[#221e16] font-medium leading-snug mb-1.5">
                    México, Colombia, Costa Rica y España
                  </h3>
                  <p className="text-xs text-[#7a6e58] font-light leading-relaxed">
                    {t({
                      es: 'Dirección estratégica, coordinación de proyectos y alianzas institucionales.',
                      en: 'Strategic direction, project coordination, and institutional partnerships.'
                    })}
                  </p>
                </div>

                <div className="space-y-3 pt-6 mt-auto">
                  {/* Correo General */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf7f0] border border-[#ebe5d8]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#ded7c8] flex items-center justify-center text-[#4a5a22] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs uppercase tracking-wider text-[#3a3020] font-medium block leading-tight mb-0.5">
                          {t({ es: 'Correo General', en: 'General Email' })}
                        </span>
                        <a
                          href="mailto:contacto@consejoglobalambiental.com"
                          className="text-xs sm:text-sm font-semibold text-[#221e16] hover:text-[#4a5a22] transition-colors truncate block"
                        >
                          contacto@consejoglobalambiental.com
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('contacto@consejoglobalambiental.com', 'emailMain')}
                      className="p-1.5 rounded-lg text-[#6b6048] hover:text-[#2d2618] hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                      title="Copiar correo"
                    >
                      {copiedKey === 'emailMain' ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf7f0] border border-[#ebe5d8]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#ded7c8] flex items-center justify-center text-[#4a5a22] shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs uppercase tracking-wider text-[#3a3020] font-medium block leading-tight mb-0.5">
                          {t({ es: 'Teléfono', en: 'Telephone' })}
                        </span>
                        <a
                          href="tel:+525530831032"
                          className="text-xs sm:text-sm font-semibold text-[#221e16] hover:text-[#4a5a22] transition-colors truncate block"
                        >
                          (+52) 55 3083 1032
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+52 55 3083 1032', 'phoneMx')}
                      className="p-1.5 rounded-lg text-[#6b6048] hover:text-[#2d2618] hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                      title="Copiar teléfono"
                    >
                      {copiedKey === 'phoneMx' ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: Canadá — Council for Green Action */}
              <div className="rounded-3xl bg-white border border-[#d8ceb6] p-7 sm:p-8 lg:p-9 shadow-[0_6px_25px_rgba(45,38,24,0.03)] flex-1 flex flex-col justify-between transition-all duration-300">
                <div>
                  <h3 className="font-serif text-2xl text-[#221e16] font-medium leading-snug mb-1.5">
                    Council for Green Action — Canada
                  </h3>
                  <p className="text-xs text-[#7a6e58] font-light leading-relaxed">
                    {t({
                      es: 'Ottawa · Toronto · Montreal — Enlace bilateral y cooperación técnica.',
                      en: 'Ottawa · Toronto · Montreal — Bilateral liaison & technical cooperation.'
                    })}
                  </p>
                </div>

                <div className="space-y-3 pt-6 mt-auto">
                  {/* Correo General Canadá */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf7f0] border border-[#ebe5d8]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#ded7c8] flex items-center justify-center text-[#4a5a22] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs uppercase tracking-wider text-[#3a3020] font-medium block leading-tight mb-0.5">
                          {t({ es: 'Correo General', en: 'General Email' })}
                        </span>
                        <a
                          href="mailto:contact@councilforgreenaction.com"
                          className="text-xs sm:text-sm font-semibold text-[#221e16] hover:text-[#4a5a22] transition-colors truncate block"
                        >
                          contact@councilforgreenaction.com
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('contact@councilforgreenaction.com', 'emailCa')}
                      className="p-1.5 rounded-lg text-[#6b6048] hover:text-[#2d2618] hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                      title="Copiar correo"
                    >
                      {copiedKey === 'emailCa' ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Teléfono Canadá */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf7f0] border border-[#ebe5d8]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#ded7c8] flex items-center justify-center text-[#4a5a22] shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs uppercase tracking-wider text-[#3a3020] font-medium block leading-tight mb-0.5">
                          {t({ es: 'Teléfono', en: 'Telephone' })}
                        </span>
                        <a
                          href="tel:+14372908820"
                          className="text-xs sm:text-sm font-semibold text-[#221e16] hover:text-[#4a5a22] transition-colors truncate block"
                        >
                          (+1) 437 290 8820
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+1 437 290 8820', 'phoneCa')}
                      className="p-1.5 rounded-lg text-[#6b6048] hover:text-[#2d2618] hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                      title="Copiar teléfono"
                    >
                      {copiedKey === 'phoneCa' ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* ─── FOOTER NAV ─── */}
      <FooterNav />
    </div>
  );
}
