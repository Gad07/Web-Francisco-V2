import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

const SUBJECT_OPTIONS = [
  'Consultas institucionales y alianzas',
  'Propuestas de cooperación y proyectos',
  'Actividades académicas y CGA Academy',
  'Prensa, entrevistas y divulgación',
  'Otras consultas',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: SUBJECT_OPTIONS[0],
    message: '',
    privacyAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.privacyAccepted) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite="Contacto oficial y"
          titleGreen="canales de atención"
          description="Para consultas institucionales, propuestas de cooperación, asuntos relacionados con proyectos, actividades académicas y prensa, utiliza los canales oficiales del Consejo Global Ambiental."
          bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
        />

        <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto">
          {/* Canales Oficiales por Región */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* México, Colombia, Costa Rica y España */}
            <div className="p-8 rounded-3xl bg-[#ece4d0]/60 border border-[#d8ceb6] shadow-sm">
              <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block mb-2">
                Sede Central y Latinoamérica / Europa
              </span>
              <h3 className="font-serif text-2xl text-[#2d2618] font-medium mb-4">
                México, Colombia, Costa Rica y España
              </h3>
              <div className="space-y-3 text-sm text-[#5c523e]">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-semibold text-[#3a3020] w-20">Correo:</span>
                  <a href="mailto:contacto@consejoglobalambiental.com" className="text-[#4a5a22] hover:underline font-medium">
                    contacto@consejoglobalambiental.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-semibold text-[#3a3020] w-20">Teléfono:</span>
                  <a href="tel:+525545691548" className="text-[#4a5a22] hover:underline font-medium">
                    (+52) 55 4569 1548
                  </a>
                </div>
              </div>
            </div>

            {/* Canadá */}
            <div className="p-8 rounded-3xl bg-[#ece4d0]/60 border border-[#d8ceb6] shadow-sm">
              <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block mb-2">
                Canadá
              </span>
              <h3 className="font-serif text-2xl text-[#2d2618] font-medium mb-4">
                Council for Green Action — Canada
              </h3>
              <div className="space-y-3 text-sm text-[#5c523e]">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-semibold text-[#3a3020] w-20">Correo:</span>
                  <a href="mailto:contact@councilforgreenaction.com" className="text-[#4a5a22] hover:underline font-medium">
                    contact@councilforgreenaction.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-semibold text-[#3a3020] w-20">Alianzas:</span>
                  <a href="mailto:partnerships@councilforgreenaction.com" className="text-[#4a5a22] hover:underline font-medium">
                    partnerships@councilforgreenaction.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="p-8 sm:p-14 rounded-3xl bg-[#eae4d2]/90 border border-[#d8ceb6] shadow-md max-w-3xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h3 className="font-serif text-3xl text-[#2d2618] font-light mb-2">
                Enviar mensaje institucional
              </h3>
              <p className="text-sm text-[#6b6048] font-light">
                Completa el formulario para canalizar tu solicitud al área correspondiente.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#4a5a22]/15 border border-[#4a5a22]/40 text-center">
                <div className="text-3xl mb-3 text-[#4a5a22]">✓</div>
                <h4 className="font-serif text-2xl text-[#2d2618] mb-2 font-light">
                  Mensaje Enviado
                </h4>
                <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                  Hemos recibido tu mensaje. El equipo del CGA dará seguimiento a tu consulta a través de los datos proporcionados.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre y apellidos"
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                      Correo Electrónico *
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
                    Organización o Institución
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Entidad pública, universidad, empresa o comunidad"
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                    Asunto *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  >
                    {SUBJECT_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    required
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-[#d8ceb6] text-[#4a5a22] focus:ring-[#4a5a22]"
                  />
                  <label htmlFor="privacyAccepted" className="text-xs text-[#6b6048] font-light leading-snug">
                    Acepto el tratamiento de mis datos de contacto exclusivamente para dar seguimiento institucional a esta consulta.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!formData.privacyAccepted}
                  className="w-full py-4 rounded-xl bg-[#4a5a22] text-[#f5efe3] font-bold text-xs uppercase tracking-widest hover:bg-[#3a4a18] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  Enviar Mensaje &rarr;
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
