import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { Link } from 'react-router-dom';

export default function AnnualAssembly() {
  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite="Informes anuales y"
          titleGreen="rendición de cuentas"
          description="Espacio reservado para la publicación de los balances anuales, auditorías técnicas y memorias institucionales del Consejo Global Ambiental."
          bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&auto=format"
        />

        {/* =================================================================
            1.6 INFORMES ANUALES [RESERVADO PARA PUBLICACIÓN EN 2027]
            ================================================================= */}
        <section className="py-24 sm:py-36 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto w-full text-center">
          <div className="bg-[#ece4d0]/60 border border-[#d8ceb6] rounded-3xl p-10 sm:p-16 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4a5a22]/10 border border-[#4a5a22]/20 text-[#4a5a22] text-xs font-semibold tracking-wider uppercase">
              Transparencia Institucional
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light">
              Sección reservada para su publicación en <span className="italic text-[#4a5a22]">2027</span>
            </h2>

            <p className="text-[#5c523e] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Conforme a los criterios editoriales y directivos del Consejo Global Ambiental, este apartado permanecerá sin registros preliminares ni cifras de cierre anticipadas.
            </p>

            <p className="text-sm text-[#7a6e58] font-light max-w-2xl mx-auto leading-relaxed">
              La carga y descarga de informes anuales, memorias de actividades y estados auditados se habilitará formalmente tras el cierre del periodo y la aprobación de los órganos colegiados en 2027.
            </p>

            <div className="pt-8 border-t border-[#d8ceb6]/60 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-medium uppercase tracking-wider text-[#4a5a22]">
              <Link
                to="/proyectos"
                className="px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] hover:bg-[#3a4a18] transition-colors"
              >
                Consultar Programas y Proyectos
              </Link>
              <Link
                to="/comunicacion"
                className="px-6 py-3 rounded-full border border-[#4a5a22] text-[#4a5a22] hover:bg-[#4a5a22]/10 transition-colors"
              >
                Ver Noticias y Comunicados
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
