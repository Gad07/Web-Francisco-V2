import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const principles = [
    {
      num: '01',
      title: 'Rigor científico y jurídico',
      desc: 'Todas nuestras acciones y propuestas se sustentan en evidencia empírica, análisis normativo y metodologías validadas internacionalmente.',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '02',
      title: 'Gobernanza y corresponsabilidad',
      desc: 'Fomentamos el diálogo constructivo entre gobiernos, academia, sector productivo y comunidades territoriales.',
      img: 'https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '03',
      title: 'Acción territorial medible',
      desc: 'Priorizamos el trabajo en campo con indicadores de impacto verificables, trazabilidad y resultados directos.',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '04',
      title: 'Cooperación internacional',
      desc: 'Conectamos capacidades globales con las necesidades y dinámicas socioculturales de cada territorio.',
      img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '05',
      title: 'Inclusión intergeneracional',
      desc: 'Garantizamos la participación equitativa de juventudes, pueblos originarios y sectores en situación de vulnerabilidad.',
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef2c6e1?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '06',
      title: 'Integridad y transparencia',
      desc: 'Rendición de cuentas continua, ética pública y comunicación veraz sobre cada programa desarrollado.',
      img: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=900&fit=crop&auto=format',
    },
    {
      num: '07',
      title: 'Respeto a la vida y Una Salud',
      desc: 'Defendemos el bienestar animal, la integridad ecosistémica y la salud humana como un equilibrio indivisible.',
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop&auto=format',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans">
      <PageHero
        tag="El Consejo Global Ambiental"
        titleWhite="Conocimiento, acción y"
        titleGreen="gobernanza territorial"
        description="Somos un organismo no gubernamental internacional dedicado a transformar la política pública, la ciencia aplicada y la acción en el territorio para la sostenibilidad planetaria."
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
      />

      {/* Visión e Introducción */}
      <section className="py-24 px-8 md:px-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] mb-4 font-bold">
              Nuestra Identidad
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2d2618] leading-tight mb-6">
              Impulsamos la resiliencia <br />
              <span className="text-[#4a5a22] italic font-normal">ecosistémica y comunitaria</span>
            </h2>
            <p className="text-[#6b6048] leading-relaxed font-light mb-6">
              El Consejo Global Ambiental (CGA) articula redes de conocimiento, ciencia ciudadana e innovación gubernamental para proteger los biomas más frágiles de nuestro planeta.
            </p>
            <p className="text-[#7a6e58] leading-relaxed font-light">
              Desde las altas montañas hasta la profundidad de las cuencas oceánicas, diseñamos estrategias integrales orientadas al cumplimiento de la Agenda 2030, fortaleciendo el tejido social y la justicia ambiental.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#d8ceb6] shadow-md h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&h=800&fit=crop"
              alt="Bosque nativo y conservación"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2618]/80 via-[#2d2618]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#eae4d2]/90 backdrop-blur-md border border-[#d8ceb6]">
              <div className="text-2xl font-serif text-[#4a5a22] font-bold">18M+</div>
              <div className="text-xs uppercase tracking-widest text-[#6b6048]">Árboles nativos y restauración continua</div>
            </div>
          </div>
        </div>
      </section>

      {/* Principios Institucionales */}
      <section className="py-24 px-8 md:px-20 bg-[#eae4d2]/60 border-y border-[#e0d4ba]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-[#5a6b2a] mb-3 font-bold">
              Fundamentos Éticos
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2d2618]">
              Principios de Actuación
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Lista de Principios */}
            <div className="lg:col-span-6 space-y-3">
              {principles.map((p, idx) => (
                <div
                  key={p.num}
                  onClick={() => setActivePrinciple(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activePrinciple === idx
                      ? 'bg-white border-[#4a5a22] shadow-md translate-x-2'
                      : 'bg-[#f5efe3]/80 border-[#d8ceb6] hover:border-[#a0a870]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-serif text-lg font-bold ${
                        activePrinciple === idx ? 'text-[#4a5a22]' : 'text-[#7a6e58]'
                      }`}
                    >
                      {p.num}
                    </span>
                    <h3 className="font-medium text-[#2d2618] text-base sm:text-lg">{p.title}</h3>
                  </div>
                  {activePrinciple === idx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-[#6b6048] font-light mt-3 pl-9 leading-relaxed"
                    >
                      {p.desc}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            {/* Imagen Dinámica del Principio */}
            <div className="lg:col-span-6 relative h-[480px] rounded-3xl overflow-hidden border border-[#d8ceb6] shadow-sm">
              <img
                src={principles[activePrinciple].img}
                alt={principles[activePrinciple].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d2618]/90 via-[#2d2618]/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-[#f5efe3]">
                <span className="text-xs uppercase tracking-widest text-[#a3e635] font-bold">Principio {principles[activePrinciple].num}</span>
                <h4 className="font-serif text-2xl font-light mt-1">{principles[activePrinciple].title}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
