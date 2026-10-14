import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import { useI18n } from '../i18n/index.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AnnualAssembly() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Informes anuales y', en: 'Annual Reports and' }}
          titleGreen={{ es: 'rendición de cuentas', en: 'Accountability' }}
          description={{
            es: 'Espacio reservado para la publicación de los balances anuales, auditorías técnicas y memorias institucionales del Consejo Global Ambiental.',
            en: 'Space reserved for the publication of annual balances, technical audits, and institutional memories of the Global Environmental Council.',
          }}
          bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&auto=format"
        />

        {/* ─── SECCIÓN EDITORIAL ABIERTA (SIN CARD) ─── */}
        <section className="py-24 sm:py-36 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto w-full text-center">
          <Reveal>
            <div className="space-y-6 sm:space-y-8">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2d2618] font-light leading-[1.18] tracking-tight">
                {t({ es: 'Sección reservada para su publicación en', en: 'Section reserved for publication in' })}{' '}
                <span className="italic font-normal text-[#4a5a22]">2027</span>
              </h2>

              <p className="text-lg sm:text-xl text-[#5c523e] font-light leading-relaxed max-w-2xl mx-auto">
                {t({
                  es: 'Conforme a los criterios editoriales y directivos del Consejo Global Ambiental, este apartado permanecerá sin registros preliminares ni cifras de cierre anticipadas.',
                  en: 'Pursuant to the editorial and board criteria of the Global Environmental Council, this section will remain without preliminary records or anticipated closing figures.',
                })}
              </p>

              <p className="text-sm sm:text-base text-[#7a6e58] font-light max-w-2xl mx-auto leading-relaxed">
                {t({
                  es: 'La carga y descarga de informes anuales, memorias de actividades y estados auditados se habilitará formalmente tras el cierre del periodo y la aprobación de los órganos colegiados en 2027.',
                  en: 'The upload and download of annual reports, activity memories, and audited statements will be formally enabled following the period closing and collegiate bodies approval in 2027.',
                })}
              </p>

              <div className="pt-8 sm:pt-10 border-t border-[#d8ceb6] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
                <Link
                  to="/proyectos"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{t({ es: 'Consultar Programas y Proyectos', en: 'Explore Programs & Projects' })}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/comunicacion"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#4a5a22] text-[#4a5a22] hover:bg-[#4a5a22]/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t({ es: 'Ver Noticias y Comunicados', en: 'View News & Press Releases' })}</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
