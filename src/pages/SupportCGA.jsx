import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { Link } from 'react-router-dom';

export default function SupportCGA() {
  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="Apoya al Consejo"
        titleGreen="Global Ambiental"
        description="Tu aportación económica puede fortalecer el desarrollo de proyectos, actividades formativas y acciones de cooperación vinculadas con la agenda ambiental del Consejo Global Ambiental."
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop&auto=format"
      />

      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto">
        <div className="bg-[#ece4d0]/60 rounded-3xl p-8 sm:p-14 border border-[#d8ceb6] shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
              Compromiso y Transparencia
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light">
              Apoya iniciativas ambientales con una aportación económica
            </h2>
            <p className="text-base sm:text-lg text-[#5c523e] font-light leading-relaxed">
              La información de cada campaña de donación indicará el objetivo de recaudación, su destino, el periodo de aplicación y los mecanismos de seguimiento que correspondan. Los recursos recibidos se registrarán y administrarán conforme a los procedimientos vigentes de la institución.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] space-y-3 text-sm text-[#6b6048] font-light leading-relaxed">
            <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
              Nota Institucional sobre Aportaciones y Donativos:
            </span>
            <p>
              Conforme a los criterios éticos y directivos del Consejo Global Ambiental, los mecanismos de recepción digital directa se encuentran en proceso de acreditación técnica y pasarela segura. No se anuncian deducibilidades fiscales ni métodos automáticos hasta contar con la autorización legal correspondiente.
            </p>
            <p>
              Si tu institución, empresa o fundación desea apoyar iniciativas ambientales o convenios de cooperación económica y técnica, por favor ponte en contacto directamente a través de nuestros canales oficiales.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/contacto"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider hover:bg-[#3a4a18] transition-colors text-center shadow-md"
            >
              Contactar para Aportaciones Institucionales &rarr;
            </Link>
            <Link
              to="/proyectos"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#4a5a22] text-[#4a5a22] text-xs font-semibold uppercase tracking-wider hover:bg-[#4a5a22]/10 transition-colors text-center"
            >
              Conocer Proyectos del CGA
            </Link>
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
