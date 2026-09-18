import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: 'Alianzas institucionales y cooperación internacional.',
    message: ''
  });

  const options = [
    "Alianzas institucionales y cooperación internacional.",
    "Proyectos ambientales, territoriales, educativos y de seguridad alimentaria.",
    "Investigación aplicada, dictámenes y publicaciones científicas.",
    "Participación empresarial y estrategias de sostenibilidad ESG.",
    "Acreditación para la Asamblea Anual y foros públicos.",
    "Prensa, entrevistas y solicitudes de información institucional."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          tag="Canal Institucional"
          titleWhite="Alianzas y"
          titleGreen="colaboración institucional"
          description="Construimos sinergias para transformar el conocimiento en impacto territorial. Contáctanos para explorar modelos de cooperación."
          bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
        />

        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#eae4d2]/90 border border-[#d8ceb6] backdrop-blur-2xl shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light mb-3">Enviar un mensaje al Consejo</h2>
              <p className="text-sm text-[#6b6048] font-light">Selecciona la modalidad de vinculación y nuestro equipo de la Secretaría Ejecutiva se pondrá en contacto a la brevedad.</p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#4a5a22]/15 border border-[#4a5a22]/40 text-center">
                <div className="text-3xl mb-3 text-[#4a5a22]">✓</div>
                <h3 className="font-serif text-2xl text-[#2d2618] mb-2 font-light">Mensaje Recibido</h3>
                <p className="text-sm text-[#6b6048] font-light">Gracias por ponerte en contacto con el Consejo Global Ambiental. Tu solicitud ha sido derivada al área correspondiente.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">Correo Electrónico *</label>
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
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">Institución / Organización</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Nombre de tu organización, universidad o empresa"
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">Motivo del Contacto *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  >
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3a3020] font-medium mb-2">Mensaje / Detalles *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe brevemente la propuesta o solicitud..."
                    className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#d8ceb6] text-[#2d2618] placeholder-[#7a6e58] focus:outline-none focus:border-[#4a5a22] text-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#4a5a22] text-[#f5efe3] font-bold text-xs uppercase tracking-widest hover:bg-[#3a4a18] transition-all shadow-md"
                >
                  Enviar Mensaje Institucional &rarr;
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
