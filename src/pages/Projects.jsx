import React, { useState } from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filters = [
    { id: 'ALL', label: 'Todos los Proyectos' },
    { id: 'emblematico', label: 'Emblemáticos' },
    { id: 'ejecucion', label: 'En ejecución' },
    { id: 'desarrollo', label: 'En desarrollo' },
    { id: 'concluido', label: 'Concluidos' },
  ];

  const projects = [
    {
      id: 'p-01',
      type: 'emblematico',
      statusLabel: 'Proyecto Emblemático',
      statusClass: 'bg-[#4a5a22]/15 text-[#3a4a18] border-[#4a5a22]/30',
      title: 'Territorios que Alimentan: Gobernanza Ambiental para el Hambre Cero',
      period: 'Actividades documentadas en 2023 y 2024; periodo institucional 2023–2026',
      territory: 'Área Natural Protegida Ejidos de Xochimilco y San Gregorio Atlapulco, Ciudad de México',
      direction: 'Mtro. Luis D. García González y Mtro. Francisco Solorio',
      objective: 'Articular educación ambiental, conservación de la biodiversidad, participación comunitaria y seguridad alimentaria para fortalecer el vínculo entre las personas, los espacios naturales y los sistemas productivos locales.',
      description: 'La experiencia comprende actividades formativas, divulgación científica, valorización de residuos orgánicos, vinculación con productores y acciones relacionadas con especies vegetales nativas.',
      results: [
        '6,890 personas de alcance directo reportadas entre 2023 y 2024',
        '620 plantas de cempasúchil acopiadas (noviembre de 2023)',
        '557.08 kg de residuos orgánicos recolectados (noviembre de 2023)',
        '44.14 m³ reportados en acopio (noviembre de 2023)',
        'Banco de germoplasma con aprox. 1,500 semillas de 50 especies endémicas del Eje Neovolcánico Transversal',
      ],
      ods: [
        'ODS 2: Hambre cero',
        'ODS 4: Educación de calidad (4.7)',
        'ODS 11: Ciudades y comunidades sostenibles (11.7)',
        'ODS 12: Producción y consumo responsables (12.5)',
        'ODS 15: Vida de ecosistemas terrestres (15.1)',
        'ODS 6: Agua limpia y saneamiento (6.6)',
      ],
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=900&fit=crop&auto=format',
    },
    {
      id: 'p-02',
      type: 'desarrollo',
      statusLabel: 'En desarrollo',
      statusClass: 'bg-amber-500/15 text-amber-900 border-amber-500/30',
      title: 'Agendas Ambientales Estatales',
      period: 'Fase de formulación técnica',
      territory: 'México',
      direction: 'Consejo Global Ambiental',
      objective: 'Diseñar diagnósticos, prioridades y hojas de ruta para fortalecer la planeación y gobernanza ambiental subnacional.',
      description: 'Productos esperados: diagnósticos territoriales, prioridades de intervención, indicadores y propuesta de seguimiento. No se reportan resultados ejecutados hasta su debida acreditación.',
      results: [
        'Modelos de diagnóstico y planeación de política pública subnacional',
        'Indicadores de seguimiento institucional y gobernanza',
      ],
      ods: [
        'ODS 13: Acción por el clima (13.2)',
        'ODS 16: Paz, justicia e instituciones sólidas (16.7)',
        'ODS 17: Alianzas para lograr los objetivos',
      ],
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=900&fit=crop&auto=format',
    },
    {
      id: 'p-03',
      type: 'desarrollo',
      statusLabel: 'En desarrollo',
      statusClass: 'bg-amber-500/15 text-amber-900 border-amber-500/30',
      title: 'Estrategias de Sostenibilidad y Gobernanza ESG',
      period: 'Fase de diseño institucional',
      territory: 'México',
      direction: 'Consejo Global Ambiental',
      objective: 'Apoyar a organizaciones para integrar criterios ambientales, sociales y de gobernanza en sus procesos de planeación, operación y gestión de riesgos.',
      description: 'Productos propuestos: diagnósticos organizacionales, hojas de ruta y fortalecimiento de capacidades.',
      results: [
        'Metodologías de diagnóstico de riesgo y gobernanza ESG',
        'Módulos de capacitación en sostenibilidad corporativa',
      ],
      ods: [
        'ODS 12: Producción y consumo responsables (12.6)',
        'ODS 13: Acción por el clima (13.2)',
        'ODS 17: Alianzas para lograr los objetivos',
      ],
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop&auto=format',
    },
    {
      id: 'p-04',
      type: 'desarrollo',
      statusLabel: 'En desarrollo / Propuesta de política pública',
      statusClass: 'bg-blue-500/15 text-blue-900 border-blue-500/30',
      title: 'Reinserción Socioambiental',
      period: 'Propuesta de política pública',
      territory: 'México; Centros de Reinserción Social de la Ciudad de México y Área Metropolitana',
      direction: 'Lic. Verónica González — Dirección Nacional de Proyectos',
      objective: 'Articular educación ambiental, restauración ecológica y procesos de reinserción social desde un enfoque de derechos y participación voluntaria.',
      description: 'Planteamiento de política pública para integrar acciones formativas y socioambientales como herramientas de restitución del tejido social y conservación.',
      results: [
        'Planteamiento de modelo de intervención socioambiental',
        'Enfoque de derechos humanos y sostenibilidad comunitaria',
      ],
      ods: [
        'ODS 4: Educación de calidad (4.7)',
        'ODS 16: Paz, justicia e instituciones sólidas',
        'ODS 15: Vida de ecosistemas terrestres',
      ],
      img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=900&fit=crop&auto=format',
    },
    {
      id: 'p-05',
      type: 'desarrollo',
      statusLabel: 'En desarrollo / Agenda de cooperación',
      statusClass: 'bg-emerald-500/15 text-emerald-900 border-emerald-500/30',
      title: 'Cooperación Ambiental México–Canadá',
      period: 'Agenda de vinculación institucional 2026',
      territory: 'México y Canadá (Toronto, Ottawa y Montreal)',
      direction: 'Consejo Global Ambiental / Council for Green Action',
      objective: 'Intercambiar experiencias en conservación urbana, participación comunitaria, adaptación y sostenibilidad territorial entre actores mexicanos y canadienses.',
      description: 'Agenda de vinculación y diálogo institucional realizada durante 2026 en Toronto, Ottawa y Montreal para explorar sinergias en restauración y resiliencia.',
      results: [
        'Intercambio de metodologías de restauración ecológica y sostenibilidad urbana',
        'Diálogo en espacios de cooperación institucional bilateral',
      ],
      ods: [
        'ODS 11: Ciudades y comunidades sostenibles (11.7)',
        'ODS 13: Acción por el clima',
        'ODS 17: Alianzas para lograr los objetivos (17.17)',
      ],
      img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=900&fit=crop&auto=format',
    },
  ];

  const filteredProjects = selectedFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.type === selectedFilter);

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="Programas y"
        titleGreen="proyectos territoriales"
        description="Los programas y proyectos del CGA articulan capacidades técnicas, conocimientos territoriales y cooperación multisectorial con transparencia y rigor."
        bgImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&h=900&fit=crop&auto=format"
      />

      {/* =================================================================
          2.2 PROGRAMAS Y PROYECTOS DEL CGA
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
            Portafolio Institucional
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.12]">
            Iniciativas emblemáticas <br />
            <span className="italic text-[#4a5a22]">y agendas de desarrollo territorial.</span>
          </h2>
          <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed font-light">
            El portafolio distingue iniciativas emblemáticas, en ejecución, en desarrollo y concluidas, para presentar su avance y resultados documentables con absoluta transparencia.
          </p>
        </div>

        {/* Filtros del catálogo */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-[#d8ceb6]">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                selectedFilter === f.id
                  ? 'bg-[#4a5a22] text-[#f5efe3] shadow-sm'
                  : 'bg-[#ece4d0] text-[#5c523e] hover:bg-[#dfd7c2]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Listado de Proyectos */}
        <div className="space-y-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#ece4d0]/60 rounded-3xl p-8 sm:p-12 border border-[#d8ceb6] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Columna Izquierda: Información Principal */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${project.statusClass}`}>
                      {project.statusLabel}
                    </span>
                    <span className="text-xs text-[#7a6e58] font-light">
                      {project.territory}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-medium leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#4a5a22] font-medium mt-1">
                    Dirección: {project.direction} · {project.period}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                    Objetivo:
                  </span>
                  <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                    {project.objective}
                  </p>
                </div>

                <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Resultados documentados */}
                <div className="pt-4 border-t border-[#d8ceb6]/70 space-y-2">
                  <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                    Resultados e Hitos Documentados:
                  </span>
                  <ul className="space-y-1.5">
                    {project.results.map((res, i) => (
                      <li key={i} className="text-xs text-[#5c523e] flex items-start gap-2 font-light">
                        <span className="text-[#4a5a22] font-bold mt-0.5">•</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ODS Vinculados */}
                <div className="pt-4 border-t border-[#d8ceb6]/70">
                  <span className="text-xs uppercase tracking-wider text-[#7a6e58] font-semibold block mb-2">
                    Alineación Temática ODS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.ods.map((o, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#4a5a22]/10 text-[#3a4a18] font-medium"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Fotografía y Respaldo */}
              <div className="lg:col-span-5 h-full flex flex-col justify-between">
                <div className="rounded-2xl overflow-hidden border border-[#d8ceb6] h-64 sm:h-80 shadow-md">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] text-xs text-[#7a6e58] font-light">
                  <span className="font-semibold text-[#2d2618] block mb-0.5">
                    Criterio de Rigor Documental
                  </span>
                  Las iniciativas se presentan con base en registros comprobables, diferenciando el alcance de actividades de compromisos en proceso.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enlace a Resultados e Impacto */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-light">
              Consulta los indicadores territoriales y correspondencia con ODS
            </h4>
            <p className="text-sm text-[#6b6048] font-light">
              Revisa la tabla de resultados documentados en Xochimilco y la vinculación metodológica con metas de Naciones Unidas.
            </p>
          </div>
          <Link
            to="/agenda-2030"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider hover:bg-[#3a4a18] transition-colors shrink-0 shadow-sm"
          >
            Ver Resultados e Impacto ODS &rarr;
          </Link>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
