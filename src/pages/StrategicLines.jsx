import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { Link } from 'react-router-dom';

export default function StrategicLines() {
  const [selectedAxis, setSelectedAxis] = useState(null);

  const axes = [
    {
      num: '01',
      title: 'Bienestar animal',
      enfoque: 'Atender las condiciones de protección y trato digno de animales, y fortalecer la relación entre bienestar animal, entorno y salud comunitaria.',
      lineas: [
        'Análisis técnico especializado',
        'Educación para la tenencia responsable',
        'Participación institucional',
        'Prevención del maltrato, formulación de iniciativas y políticas públicas',
      ],
      ods: ['ODS 3: Salud y bienestar', 'ODS 15: Vida de ecosistemas terrestres'],
      img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '02',
      title: 'Seguridad alimentaria',
      enfoque: 'Contribuir a sistemas alimentarios sostenibles en territorios donde la conservación, la producción local y el bienestar de las comunidades están vinculados.',
      lineas: [
        'Producción responsable',
        'Conocimiento agroecológico',
        'Vínculos directos con productores',
        'Protección del patrimonio biocultural',
      ],
      ods: ['ODS 2: Hambre cero', 'ODS 12: Producción y consumo responsables', 'ODS 17: Alianzas para lograr los objetivos'],
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '03',
      title: 'Cambio climático',
      enfoque: 'Fortalecer capacidades para comprender, prevenir y responder a los riesgos climáticos y promover medidas de mitigación y adaptación.',
      lineas: [
        'Formación climática',
        'Cooperación técnica',
        'Resiliencia territorial',
        'Soluciones basadas en la naturaleza',
      ],
      ods: ['ODS 13: Acción por el clima', 'ODS 11: Ciudades y comunidades sostenibles'],
      img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '04',
      title: 'Gobernanza ambiental',
      enfoque: 'Mejorar la calidad de las decisiones ambientales mediante articulación institucional, participación y análisis de política pública.',
      lineas: [
        'Diagnósticos territoriales',
        'Agendas ambientales subnacionales',
        'Revisión de instrumentos de gestión',
        'Diálogos multisectoriales vinculantes',
      ],
      ods: ['ODS 16: Paz, justicia e instituciones sólidas', 'ODS 17: Alianzas para lograr los objetivos'],
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '05',
      title: 'Biodiversidad',
      enfoque: 'Proteger la diversidad biológica y promover la conservación y el manejo responsable de hábitats y especies.',
      lineas: [
        'Conservación de especies nativas',
        'Educación biocultural',
        'Protección de hábitats críticos',
        'Acciones de restauración documentadas',
      ],
      ods: ['ODS 15: Vida de ecosistemas terrestres', 'ODS 6: Agua limpia y saneamiento'],
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '06',
      title: 'Educación ambiental',
      enfoque: 'Fortalecer capacidades de aprendizaje y participación para incorporar la sostenibilidad a decisiones personales, sociales e institucionales.',
      lineas: [
        'Talleres participativos',
        'Conferencias magistrales',
        'Divulgación científica',
        'Programas para juventudes y organizaciones',
      ],
      ods: ['ODS 4: Educación de calidad', 'ODS 13: Acción por el clima'],
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '07',
      title: 'Economía circular',
      enfoque: 'Promover el uso eficiente de materiales y la prevención, reducción, recuperación y aprovechamiento de residuos.',
      lineas: [
        'Acopio y valorización de materiales orgánicos',
        'Educación sobre consumo responsable',
        'Estrategias de circularidad territorial',
        'Trabajo con sectores productivos',
      ],
      ods: ['ODS 12: Producción y consumo responsables', 'ODS 11: Ciudades y comunidades sostenibles'],
      img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '08',
      title: 'Agua y saneamiento',
      enfoque: 'Favorecer la protección del agua y de los ecosistemas asociados, especialmente en territorios con valor ecológico y social.',
      lineas: [
        'Educación para el cuidado del agua',
        'Protección de humedales y cuencas lacustres',
        'Articulación para gestión ambiental territorial',
      ],
      ods: ['ODS 6: Agua limpia y saneamiento', 'ODS 15: Vida de ecosistemas terrestres'],
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '09',
      title: 'Ciudades sostenibles',
      enfoque: 'Promover una relación equilibrada entre naturaleza, espacio público, asentamientos humanos y calidad de vida.',
      lineas: [
        'Apropiación de espacios verdes urbanos',
        'Participación comunitaria activa',
        'Resiliencia urbana ante eventos extremos',
        'Intercambio de experiencias sobre restauración urbana',
      ],
      ods: ['ODS 11: Ciudades y comunidades sostenibles', 'ODS 13: Acción por el clima'],
      img: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&h=600&fit=crop&auto=format',
    },
    {
      num: '10',
      title: 'Justicia ambiental',
      enfoque: 'Fortalecer el acceso a información y participación en decisiones ambientales y atender las desigualdades asociadas al territorio.',
      lineas: [
        'Defensa de derechos socioambientales',
        'Cohesión comunitaria y paz territorial',
        'Prevención de conflictos socioambientales',
        'Enfoque participativo e inclusivo',
      ],
      ods: ['ODS 16: Paz, justicia e instituciones sólidas', 'ODS 10: Reducción de las desigualdades'],
      img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&auto=format',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="Ejes de acción"
        titleGreen="institucional del CGA"
        description="La acción del Consejo Global Ambiental se organiza en diez ejes institucionales. Cada eje define prioridades de conocimiento, cooperación y acción territorial."
        bgImage="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format"
      />

      {/* =================================================================
          2.1 DIEZ EJES DE ACCIÓN
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
            Nuestra Acción Territorial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.12]">
            Diez ejes estratégicos <br />
            <span className="italic text-[#4a5a22]">con correspondencia verificable.</span>
          </h2>
          <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed font-light">
            Cada eje define prioridades de conocimiento, cooperación y acción territorial. Los Objetivos de Desarrollo Sostenible se integran como referencias transversales en los ejes y proyectos, y se vinculan con resultados cuando existe evidencia documental.
          </p>
        </div>

        {/* Cuadrícula de 10 Ejes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {axes.map((axis) => (
            <div
              key={axis.num}
              className="bg-[#ece4d0]/60 rounded-3xl p-8 sm:p-10 border border-[#d8ceb6] shadow-sm flex flex-col justify-between hover:border-[#4a5a22]/60 transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-light text-[#4a5a22]">
                    {axis.num}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {axis.ods.map((o, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4a5a22]/10 text-[#3a4a18] font-semibold"
                      >
                        {o.split(':')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-[#2d2618] font-medium">
                  {axis.title}
                </h3>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                    Enfoque:
                  </span>
                  <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                    {axis.enfoque}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                    Líneas de trabajo:
                  </span>
                  <ul className="space-y-1">
                    {axis.lineas.map((line, i) => (
                      <li key={i} className="text-xs text-[#6b6048] flex items-start gap-2 font-light">
                        <span className="text-[#4a5a22] font-bold mt-0.5">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#d8ceb6]/60">
                <span className="text-xs uppercase tracking-wider text-[#7a6e58] font-semibold block mb-1">
                  Alineación Temática con ODS:
                </span>
                <div className="text-xs text-[#4a5a22] font-medium">
                  {axis.ods.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Llamado a Programas y Proyectos */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
              Conoce las iniciativas operativas del Consejo
            </h4>
            <p className="text-sm text-[#6b6048] font-light">
              Explora el portafolio de programas y proyectos emblemáticos, en desarrollo y agendas de cooperación territorial.
            </p>
          </div>
          <Link
            to="/proyectos"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider hover:bg-[#3a4a18] transition-colors shrink-0 shadow-sm"
          >
            Ver Catálogo de Proyectos &rarr;
          </Link>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
