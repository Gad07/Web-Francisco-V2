import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

const EASE = [0.22, 1, 0.36, 1];

export default function Agenda2030() {
  const { t } = useI18n();
  const [activeOdsIndex, setActiveOdsIndex] = useState(null);

  // Sincronizar evento para ocultar / mostrar la barra de navegación automáticamente al abrir modal
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('cga:modal', { detail: { open: activeOdsIndex !== null } })
    );
  }, [activeOdsIndex]);

  // Indicadores territoriales documentados (Xochimilco 2023–2024)
  const indicators = [
    {
      indicador: {
        es: 'Alcance directo de actividades en PEX',
        en: 'Direct reach of activities in PEX',
      },
      valor: '6,890',
      unidad: { es: 'personas reportadas', en: 'reported persons' },
      periodo: { es: 'Entre 2023 y 2024', en: 'Between 2023 and 2024' },
      ods: 'ODS 4: Educación de calidad · ODS 11: Ciudades y comunidades sostenibles',
      nota: {
        es: 'Personas participantes registradas en talleres, visitas y actividades comunitarias en el ANP.',
        en: 'Registered attendees in workshops, visits and community activities in the NPA.',
      },
    },
    {
      indicador: {
        es: 'Plantas de cempasúchil acopiadas',
        en: 'Collected marigold plants',
      },
      valor: '620',
      unidad: { es: 'plantas', en: 'plants' },
      periodo: { es: 'Noviembre de 2023', en: 'November 2023' },
      ods: 'ODS 12: Producción y consumo responsables',
      nota: {
        es: 'Campaña de acopio posfestividad para evitar su desecho en vía pública y canalizar a compostaje.',
        en: 'Post-holiday collection campaign to avoid street dumping and channel to composting.',
      },
    },
    {
      indicador: {
        es: 'Residuos orgánicos recolectados',
        en: 'Collected organic waste',
      },
      valor: '557.08',
      unidad: { es: 'kg pesados', en: 'kg weighed' },
      periodo: { es: 'Noviembre de 2023', en: 'November 2023' },
      ods: 'ODS 12: Producción y consumo responsables (meta 12.5)',
      nota: {
        es: 'Material vegetal pesado e ingresado a proceso de degradación biológica controlada.',
        en: 'Vegetal material weighed and admitted to controlled biological composting process.',
      },
    },
    {
      indicador: {
        es: 'Volumen reportado del acopio',
        en: 'Reported collection volume',
      },
      valor: '44.14',
      unidad: { es: 'm³ de biomasa', en: 'm³ biomass' },
      periodo: { es: 'Noviembre de 2023', en: 'November 2023' },
      ods: 'ODS 12: Producción y consumo responsables',
      nota: {
        es: 'Volumen volumétrico reportado de residuos orgánicos acopiados.',
        en: 'Reported volumetric bulk of collected organic residues.',
      },
    },
    {
      indicador: {
        es: 'Semillas de especies endémicas recibidas',
        en: 'Endemic species seeds received',
      },
      valor: '≈1,500',
      unidad: { es: 'semillas de 25 especies', en: 'seeds of 25 species' },
      periodo: { es: 'Entre 2023 y 2024', en: 'Between 2023 and 2024' },
      ods: 'ODS 15: Vida de ecosistemas terrestres (meta 15.1)',
      nota: {
        es: 'Recepción y custodia en banco de germoplasma de especies del Eje Neovolcánico Transversal.',
        en: 'Reception and custody in genebank of species from the Trans-Mexican Volcanic Belt.',
      },
    },
    {
      indicador: {
        es: 'Recorridos de difusión del patrimonio biocultural',
        en: 'Biocultural heritage dissemination tours',
      },
      valor: '14',
      unidad: { es: 'delegaciones atendidas (8 nac. / 6 internac.)', en: 'delegations hosted (8 nat. / 6 intl.)' },
      periodo: { es: 'Entre 2023 y 2024', en: 'Between 2023 and 2024' },
      ods: 'ODS 4: Educación de calidad (meta 4.7)',
      nota: {
        es: 'Visitas guiadas de divulgación ambiental, conservación lacustre e historia biocultural.',
        en: 'Guided visits of environmental education, lacustrine conservation and biocultural history.',
      },
    },
  ];

  // Las 6 Cards de ODS vinculados con video de fondo en pantalla completa
  const odsList = [
    {
      id: 'ods-04',
      num: '04',
      gridSpan: 'md:col-span-7 lg:col-span-8 min-h-[460px] sm:min-h-[500px]',
      badge: { es: 'Educación & Territorio', en: 'Education & Territory' },
      isWide: true,
      title: { es: 'Educación de Calidad', en: 'Quality Education' },
      meta: 'Meta 4.7',
      tagline: { es: 'Educación ambiental y valoración biocultural', en: 'Environmental education & biocultural appreciation' },
      desc: {
        es: 'Talleres formativos en campo, conferencias de agroecología lacustre y divulgación presencial destinados a fortalecer conocimientos sobre sostenibilidad y reconectar a la juventud con los humedales.',
        en: 'Field training workshops, lacustrine agroecology conferences, and on-site outreach re-engaging youth with water and soil cycles.',
      },
      metric: '6,890',
      metricLabel: { es: 'personas participantes registradas en PEX', en: 'participants registered at PEX' },
      deliverables: [
        { es: 'Talleres formativos en territorio y educación biocultural', en: 'Field training workshops and biocultural education' },
        { es: 'Recorridos guiados para 14 delegaciones e instituciones', en: 'Guided visits for 14 delegations and institutions' },
        { es: 'Divulgación escolar sobre conservación de humedales', en: 'School outreach on wetland conservation' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_04_educacion.mp4',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop&auto=format',
    },
    {
      id: 'ods-11',
      num: '11',
      gridSpan: 'md:col-span-5 lg:col-span-4 min-h-[460px] sm:min-h-[500px]',
      badge: { es: 'Espacio Público', en: 'Public Space' },
      isWide: false,
      title: { es: 'Ciudades y Comunidades Sostenibles', en: 'Sustainable Cities & Communities' },
      meta: 'Meta 11.7',
      tagline: { es: 'Apropiación comunitaria de espacios públicos verdes', en: 'Community stewardship of public green spaces' },
      desc: {
        es: 'Apropiación y custodia comunitaria de los espacios públicos verdes en el Área Natural Protegida de Xochimilco y San Gregorio Atlapulco como amortiguamiento ecológico metropolitano.',
        en: 'Community stewardship and defence of public green spaces in Xochimilco & San Gregorio NPA as metropolitan ecological buffer.',
      },
      metric: '2,657 ha',
      metricLabel: { es: 'de humedal urbano bajo custodia técnica', en: 'of urban wetland under technical stewardship' },
      deliverables: [
        { es: 'Apropiación comunitaria de espacios lacustres protegidos', en: 'Community appropriation of protected lacustrine spaces' },
        { es: 'Defensa biocultural del suelo de conservación periurbano', en: 'Biocultural defence of peri-urban conservation land' },
        { es: 'Mantenimiento participativo de canales y senderos', en: 'Participatory maintenance of canals and trails' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_11_ciudades.mp4',
      img: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1400&h=900&fit=crop&auto=format',
    },
    {
      id: 'ods-12',
      num: '12',
      gridSpan: 'md:col-span-5 lg:col-span-4 min-h-[500px] sm:min-h-[540px]',
      badge: { es: 'Economía Circular', en: 'Circular Economy' },
      isWide: false,
      title: { es: 'Producción y Consumo Responsables', en: 'Responsible Consumption & Production' },
      meta: 'Meta 12.5',
      tagline: { es: 'Valorización de biomasa floral y compostaje biológico', en: 'Floral biomass recovery & biological composting' },
      desc: {
        es: 'Acopio de flor de cempasúchil posfestividad y recuperación de residuos vegetales para evitar su disposición inmediata en vía pública, canalizándolos a compostaje biológico controlado.',
        en: 'Post-holiday marigold collection and vegetal waste recovery, avoiding public dumping and channeling biomass into soil-enriching composting.',
      },
      metric: '44.14 m³',
      metricLabel: { es: 'y 557.08 kg de biomasa compostados', en: 'and 557.08 kg of biomass composted' },
      deliverables: [
        { es: 'Campaña de acopio de 620 plantas de cempasúchil', en: 'Collection campaign of 620 marigold plants' },
        { es: 'Pesaje e ingreso a módulos de degradación biológica', en: 'Weighing and biological composting module intake' },
        { es: 'Reintegración de sustratos orgánicos a chinampas', en: 'Reincorporation of organic substrates into chinampas' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_12_produccion.mp4',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop&auto=format',
    },
    {
      id: 'ods-15',
      num: '15',
      gridSpan: 'md:col-span-7 lg:col-span-8 min-h-[500px] sm:min-h-[540px]',
      badge: { es: 'Custodia de Germoplasma', en: 'Germplasm Custody' },
      isWide: true,
      title: { es: 'Vida de Ecosistemas Terrestres', en: 'Life on Land' },
      meta: 'Meta 15.1',
      tagline: { es: 'Custodia de germoplasma y flora endémica', en: 'Germplasm custody & endemic flora' },
      desc: {
        es: 'Recepción, catalogación y resguardo de semillas endémicas en banco de germoplasma del Eje Neovolcánico Transversal, preservando el patrimonio biológico y la resiliencia vegetal.',
        en: 'Reception, cataloguing and custody of endemic seeds in Trans-Mexican Volcanic Belt genebank, preserving genetic biodiversity.',
      },
      metric: '≈1,500',
      metricLabel: { es: 'semillas de 25 especies endémicas bajo custodia', en: 'seeds of 25 endemic species under custody' },
      deliverables: [
        { es: 'Custodia en banco de germoplasma institucional', en: 'Institutional genebank custody and cataloguing' },
        { es: 'Educación comunitaria sobre flora nativa y polinizadores', en: 'Community education on native flora & pollinators' },
        { es: 'Protección biológica del suelo volcánico lacustre', en: 'Biological protection of volcanic lacustrine soils' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_15_ecosistemas.mp4',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&h=900&fit=crop&auto=format',
    },
    {
      id: 'ods-02',
      num: '02',
      gridSpan: 'md:col-span-6 lg:col-span-6 min-h-[400px] sm:min-h-[440px]',
      badge: { es: 'Agroecología Chinampera', en: 'Chinampa Agroecology' },
      isWide: false,
      title: { es: 'Hambre Cero', en: 'Zero Hunger' },
      meta: 'Meta 2.4',
      tagline: { es: 'Soberanía agroecológica y manejo chinampero', en: 'Agroecological sovereignty & chinampa farming' },
      desc: {
        es: 'Vinculación temática y técnica con productores chinamperos para impulsar prácticas sostenibles de cultivo, transición a bioinsumos libres de agroquímicos sintéticos y conservación biocultural.',
        en: 'Technical collaboration with chinampa farmers promoting sustainable practices, bio-inputs and preservation of ancestral soil fertility.',
      },
      metric: 'Bioinsumos',
      metricLabel: { es: 'prácticas sostenibles con chinamperos', en: 'sustainable practices with chinampa farmers' },
      deliverables: [
        { es: 'Acompañamiento a unidades productivas chinamperas', en: 'Technical guidance for chinampa farming units' },
        { es: 'Capacitación en biofertilizantes y bioprotectores', en: 'Training in biofertilizers and bio-defenders' },
        { es: 'Fomento a la soberanía alimentaria comunitaria', en: 'Promotion of local community food sovereignty' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_02_hambre_cero.mp4',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=800&fit=crop&auto=format',
    },
    {
      id: 'ods-06',
      num: '06',
      gridSpan: 'md:col-span-6 lg:col-span-6 min-h-[400px] sm:min-h-[440px]',
      badge: { es: 'Recarga Hídrica', en: 'Water Recharge' },
      isWide: false,
      title: { es: 'Agua Limpia y Saneamiento', en: 'Clean Water & Sanitation' },
      meta: 'Meta 6.6',
      tagline: { es: 'Monitoreo lacustre y zonas de recarga hídrica', en: 'Wetland monitoring & hydrological recharge' },
      desc: {
        es: 'Vigilancia técnica y monitoreo del equilibrio lacustre en canales patrimoniales, promoviendo la protección de las zonas de recarga del acuífero y la preservación de los humedales urbanos.',
        en: 'Technical monitoring of lacustrine balance across canals, safeguarding aquifer infiltration zones and wetland water quality.',
      },
      metric: 'Canales ANP',
      metricLabel: { es: 'monitoreo de cuenca lacustre y acuíferos', en: 'monitoring of lake basin & aquifers' },
      deliverables: [
        { es: 'Monitoreo de batimetría y salubridad de canales', en: 'Bathymetry and canal health monitoring' },
        { es: 'Protección de manantiales y flujos de infiltración', en: 'Protection of springs and deep infiltration flows' },
        { es: 'Defensa técnica contra la desecación de humedales', en: 'Technical defence against wetland desiccation' },
      ],
      mediaType: 'video',
      videoSrc: '/video/ods_06_agua.mp4',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=900&fit=crop&auto=format',
    },
  ];

  // Navegación en modal inmersivo
  const activeOds = activeOdsIndex !== null ? odsList[activeOdsIndex] : null;

  const handlePrevOds = () => {
    if (activeOdsIndex === null) return;
    setActiveOdsIndex((prev) => (prev > 0 ? prev - 1 : odsList.length - 1));
  };

  const handleNextOds = () => {
    if (activeOdsIndex === null) return;
    setActiveOdsIndex((prev) => (prev < odsList.length - 1 ? prev + 1 : 0));
  };

  // Atajos de teclado en modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeOdsIndex === null) return;
      if (e.key === 'Escape') setActiveOdsIndex(null);
      if (e.key === 'ArrowLeft') handlePrevOds();
      if (e.key === 'ArrowRight') handleNextOds();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOdsIndex]);

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between selection:bg-[#4a5a22] selection:text-white">
      <div>
        {/* =================================================================
            1. PAGE HERO BOTÁNICO
            ================================================================= */}
        <PageHero
          titleWhite={{ es: 'Resultados, impacto y', en: 'Results, impact and' }}
          titleGreen={{ es: 'vinculación con ODS', en: 'SDG alignment' }}
          description={{
            es: 'Los resultados institucionales se presentan con indicación de periodo, territorio, tipo de actividad y fuente documental verificable.',
            en: 'Institutional results are presented with verified period, territory, activity type and auditable documentary sources.',
          }}
          bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop&auto=format"
        />

        {/* =================================================================
            2. RESULTADOS DOCUMENTADOS EN TERRITORIO (XOCHIMILCO 2023–2024)
            ================================================================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl space-y-4 mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.14]">
              {t({ es: 'Resultados documentados', en: 'Documented results' })}{' '}
              <span className="italic text-[#4a5a22] block sm:inline font-normal">
                {t({ es: 'en territorio (Xochimilco 2023–2024).', en: 'in field (Xochimilco 2023–2024).' })}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#6b6048] font-light leading-relaxed">
              {t({
                es: 'El expediente de Xochimilco de 2023-2024 constituye una fuente de referencia sobre educación, conservación y participación comunitaria bajo la conducción de la Presidencia y la Secretaría Ejecutiva del CGA. Las cifras aquí consignadas corresponden al periodo descrito y no representan un acumulado institucional de 2020 a 2026.',
                en: 'The Xochimilco 2023-2024 file constitutes a benchmark on education, conservation and community engagement under CGA leadership. All figures correspond strictly to the described period and do not represent an institutional cumulative.',
              })}
            </p>
          </div>

          {/* 1. Franja Ejecutiva de Métricas Clave Documentadas */}
          <div className="py-8 sm:py-10 border-y border-[#d8ceb6] w-full mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="space-y-1.5">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#334215] tabular font-normal leading-none">
                  6,890
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#7a6e58] font-semibold leading-snug">
                  {t({ es: 'Participantes en PEX', en: 'Participants in PEX' })}
                </div>
                <p className="text-[11px] text-[#6b6048] font-light">
                  {t({ es: 'Talleres y actividades en el ANP', en: 'Workshops & activities in the NPA' })}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#334215] tabular font-normal leading-none">
                  44.14 <span className="text-xl sm:text-2xl text-[#4a5a22]">m³</span>
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#7a6e58] font-semibold leading-snug">
                  {t({ es: 'Biomasa acopiada', en: 'Biomass collected' })}
                </div>
                <p className="text-[11px] text-[#6b6048] font-light">
                  {t({ es: '557.08 kg ingresados a compostaje', en: '557.08 kg channeled into compost' })}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#334215] tabular font-normal leading-none">
                  ≈1,500
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#7a6e58] font-semibold leading-snug">
                  {t({ es: 'Semillas en custodia', en: 'Seeds in custody' })}
                </div>
                <p className="text-[11px] text-[#6b6048] font-light">
                  {t({ es: '25 especies nativas en germoplasma', en: '25 native species in genebank' })}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#334215] tabular font-normal leading-none">
                  14
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#7a6e58] font-semibold leading-snug">
                  {t({ es: 'Delegaciones vinculadas', en: 'Linked delegations' })}
                </div>
                <p className="text-[11px] text-[#6b6048] font-light">
                  {t({ es: '8 nacionales y 6 internacionales', en: '8 national and 6 international' })}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Expediente Documental Abierto (Ledger Arquitectónico sin scroll forzado) */}
          <div className="w-full mb-12">
            {/* Encabezado de Columnas (Desktop) */}
            <div className="hidden lg:grid grid-cols-12 gap-6 pb-3 border-b border-[#d8ceb6] text-[10px] uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
              <div className="col-span-4">{t({ es: 'Indicador y Periodo', en: 'Indicator & Period' })}</div>
              <div className="col-span-3">{t({ es: 'Métrica Consignada', en: 'Reported Metric' })}</div>
              <div className="col-span-2">{t({ es: 'Alineación ODS', en: 'SDG Alignment' })}</div>
              <div className="col-span-3">{t({ es: 'Descripción y Evidencia', en: 'Description & Evidence' })}</div>
            </div>

            {/* Filas del Expediente */}
            <div className="divide-y divide-[#d8ceb6]/60">
              {indicators.map((ind, idx) => (
                <div
                  key={idx}
                  className="py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start hover:bg-[#eae4d2]/30 transition-colors px-3 sm:px-4 rounded-xl"
                >
                  {/* Columna 1: Indicador y Periodo */}
                  <div className="lg:col-span-4 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif text-sm font-semibold text-[#4a5a22] tabular shrink-0">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h4 className="font-medium text-sm sm:text-base text-[#2d2618] leading-snug">
                        {t(ind.indicador)}
                      </h4>
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7a6e58] font-light block pl-7">
                      {t(ind.periodo)}
                    </span>
                  </div>

                  {/* Columna 2: Métrica Consignada */}
                  <div className="lg:col-span-3 space-y-0.5 pl-7 lg:pl-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#7a6e58] lg:hidden block font-medium">
                      {t({ es: 'Métrica:', en: 'Metric:' })}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl sm:text-3xl text-[#334215] tabular font-normal leading-none">
                        {ind.valor}
                      </span>
                      <span className="text-xs text-[#5c523e] font-light">
                        {t(ind.unidad)}
                      </span>
                    </div>
                  </div>

                  {/* Columna 3: Alineación ODS */}
                  <div className="lg:col-span-2 space-y-0.5 pl-7 lg:pl-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#7a6e58] lg:hidden block font-medium">
                      {t({ es: 'ODS:', en: 'SDG:' })}
                    </span>
                    <span className="text-xs font-medium text-[#4a5a22] leading-snug block">
                      {ind.ods}
                    </span>
                  </div>

                  {/* Columna 4: Descripción y Evidencia */}
                  <div className="lg:col-span-3 pl-7 lg:pl-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#7a6e58] lg:hidden block font-medium">
                      {t({ es: 'Evidencia:', en: 'Evidence:' })}
                    </span>
                    <p className="text-xs text-[#5c523e] font-light leading-relaxed">
                      {t(ind.nota)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Criterios de Rigor Editorial (Sello de Integridad Intelectual) */}
          <div className="relative overflow-hidden my-14 sm:my-16 rounded-2xl border border-[#d8ceb6] bg-[#f8f5ee]/90 p-7 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(45,38,24,0.04)]">
            {/* Marca de agua tipográfica sutil */}
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-6 font-serif text-[140px] sm:text-[180px] text-[#4a5a22]/10 select-none pointer-events-none leading-none font-normal"
            >
              “
            </span>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              {/* Columna Izquierda: Encabezado Editorial */}
              <div className="lg:col-span-4 space-y-2.5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-normal leading-snug">
                  {t({
                    es: 'Rigor metodológico y honestidad intelectual',
                    en: 'Methodological rigor and intellectual honesty',
                  })}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6b6048] font-light leading-relaxed">
                  {t({
                    es: 'Criterio vinculante de divulgación de impacto territorial del Consejo Global Ambiental.',
                    en: 'Binding disclosure standard for territorial impact of the Global Environmental Council.',
                  })}
                </p>
              </div>

              {/* Columna Derecha: Cita y Fuente */}
              <div className="lg:col-span-8 lg:border-l lg:border-[#d8ceb6] lg:pl-8 space-y-4">
                <blockquote className="font-serif text-base sm:text-lg lg:text-xl text-[#2d2618] font-light leading-relaxed italic">
                  {t({
                    es: '«No confundir acopio con reciclaje acreditado, semillas recibidas con plantas establecidas, personas participantes con beneficiarios únicos ni talleres con cambios de comportamiento medidos. La alineación con ODS indica correspondencia temática con metas de Naciones Unidas; no equivale a una certificación ni a medición oficial de avance nacional.»',
                    en: '“Do not confuse collection with accredited recycling, seeds received with established plants, participants with unique beneficiaries, nor workshops with measured behavioral changes. Alignment with SDGs indicates thematic correspondence with United Nations targets; it does not constitute a certification or official national measurement.”',
                  })}
                </blockquote>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-[11px] sm:text-xs text-[#7a6e58] font-sans">
                  <span className="font-medium text-[#4a5a22]">
                    {t({ es: 'Criterio Editorial de Publicación', en: 'Editorial Publication Standard' })}
                  </span>
                  <span className="text-[#8a7e68] font-light">
                    CGA · 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===============================================================
              3. CÓMO SE VINCULA LA ACCIÓN TERRITORIAL CON LOS ODS (CARDS BENTO)
              =============================================================== */}
          <div className="space-y-10 pt-4 border-t border-[#d8ceb6]">
            
            <div className="space-y-3 max-w-4xl">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2d2618] font-light leading-tight">
                {t({ es: 'Cómo se vincula la acción territorial con los', en: 'How territorial action connects with the' })}{' '}
                <span className="italic text-[#4a5a22] font-normal">
                  {t({ es: 'Objetivos de Desarrollo Sostenible.', en: 'Sustainable Development Goals.' })}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5c523e] font-light leading-relaxed max-w-3xl">
                {t({
                  es: 'La intervención en territorio del Consejo Global Ambiental aporta directamente a 6 objetivos prioritarios de la Agenda 2030, traduciendo metas globales en dinámicas concretas de restauración, pedagogía y gobernanza comunitaria.',
                  en: 'The Global Environmental Council’s field interventions contribute directly to 6 priority 2030 Agenda goals, translating global targets into tangible community restoration, pedagogy, and governance.',
                })}
              </p>
            </div>

            {/* Grilla Mosaico Dinámica de Cards ODS (Llena el 100% con alturas y anchos variados) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 w-full">
              {odsList.map((ods, i) => {
                return (
                  <motion.div
                    key={ods.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
                    onClick={() => setActiveOdsIndex(i)}
                    className={`group relative bg-[#1c1811] rounded-3xl border border-[#d8ceb6] overflow-hidden shadow-[0_10px_30px_rgba(45,38,24,0.12)] transition-all duration-500 hover:border-[#4a5a22] hover:shadow-[0_20px_45px_rgba(45,38,24,0.24)] hover:-translate-y-1 cursor-pointer flex flex-col justify-end p-6 sm:p-8 md:p-9 ${ods.gridSpan}`}
                  >
                    {/* Imagen a sangre de fondo con zoom cinemático */}
                    <img
                      src={ods.img}
                      alt={t(ods.title)}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-[1.4s] ease-out pointer-events-none"
                    />

                    {/* Degradado profundo multicapa (máxima legibilidad y contraste editorial) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(16,13,8,0.96) 0%, rgba(16,13,8,0.76) 42%, rgba(16,13,8,0.22) 75%, rgba(16,13,8,0.05) 100%)',
                      }}
                    />

                    {/* Contenido Editorial Inferior Integrado */}
                    <div className="relative z-10 space-y-2.5 max-w-2xl">
                      <h4
                        className={`font-serif text-[#f5efe3] transition-colors duration-300 group-hover:text-[#eaf0cb] leading-tight ${
                          ods.isWide
                            ? 'text-2xl sm:text-3xl lg:text-4xl'
                            : 'text-xl sm:text-2xl lg:text-[26px]'
                        }`}
                      >
                        {t(ods.title)}
                      </h4>

                      <p
                        className={`text-[#e5decf]/85 font-light leading-relaxed ${
                          ods.isWide
                            ? 'text-xs sm:text-sm max-w-2xl line-clamp-3'
                            : 'text-xs sm:text-[13px] line-clamp-3'
                        }`}
                      >
                        {t(ods.desc)}
                      </p>

                      <div className="pt-3.5 border-t border-white/20 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl sm:text-2xl text-[#b4c87b] font-normal leading-none tabular">
                            {ods.metric}
                          </span>
                          <span className="text-[10px] sm:text-xs text-[#e5decf]/75 font-sans font-light">
                            {t(ods.metricLabel)}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs text-[#f5efe3] group-hover:text-[#cddba1] transition-colors duration-300 font-sans font-medium">
                          <span>{t({ es: 'Explorar', en: 'Explore' })}</span>
                          <svg
                            className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* =================================================================
          4. EXPERIENCIA INMERSIVA FULLSCREEN CON VIDEO DE FONDO
          ================================================================= */}
      <AnimatePresence>
        {activeOds && (
          <motion.div
            id="ods-immersion-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-y-auto bg-[#0a0d0a] text-slate-100 transform-gpu"
          >
            {/* Fondo Cinemático: Video o Imagen con fade */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeOds.videoSrc || activeOds.img}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  {activeOds.mediaType === 'video' ? (
                    <video
                      src={activeOds.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={activeOds.img}
                      alt={t(activeOds.title)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Gradiente Oscuro para Legibilidad */}
            <div className="fixed inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none z-10" />

            {/* ─── BARRA SUPERIOR: SELECTOR RÁPIDO + CERRAR ─── */}
            <div className="relative z-20 w-full px-4 sm:px-8 md:px-16 py-4 sm:py-7 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg text-white font-medium">
                  CGA &middot; Agenda 2030
                </span>
              </div>

              {/* Selector Rápido de ODS en Desktop */}
              <div className="hidden lg:flex items-center gap-1 bg-black/50 p-1.5 border border-white/15 backdrop-blur-md">
                {odsList.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveOdsIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-sans transition-all duration-300 cursor-pointer ${
                      activeOdsIndex === idx
                        ? 'bg-white/20 text-white font-medium border border-white/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    ODS {item.num}
                  </button>
                ))}
              </div>

              {/* Botón Cerrar */}
              <button
                type="button"
                onClick={() => setActiveOdsIndex(null)}
                className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-black/60 hover:bg-[#f5efe3] text-[#f5efe3] hover:text-[#2d2618] backdrop-blur-xl border border-white/25 hover:border-[#f5efe3] text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.96] cursor-pointer"
                aria-label={t({ es: 'Cerrar inmersión', en: 'Close immersion' })}
              >
                <span>{t({ es: 'Cerrar', en: 'Close' })}</span>
                <span className="flex items-center justify-center w-4 h-4 bg-white/15 group-hover:bg-[#2d2618]/10 transition-colors">
                  <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            </div>

            {/* ─── CUERPO INMERSIVO EDITORIAL ─── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOds.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-8 md:px-16 py-8 md:py-16 flex-1 flex flex-col justify-end"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
                  {/* Columna Izquierda: Título y Síntesis */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-bold text-[#cdd2a6] tracking-wider">
                        ODS {activeOds.num}
                      </span>
                      <span className="text-white/40">&middot;</span>
                      <span className="text-xs uppercase tracking-widest text-[#f5efe3] font-semibold">
                        {activeOds.meta}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.05]">
                      {t(activeOds.title)}
                    </h2>

                    <p className="font-serif text-lg sm:text-xl text-[#d8ceb6] font-light italic leading-snug">
                      &ldquo;{t(activeOds.tagline)}&rdquo;
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl font-sans">
                      {t(activeOds.desc)}
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <Link
                        to="/proyectos"
                        onClick={() => setActiveOdsIndex(null)}
                        className="inline-flex items-center gap-2 py-3 px-7 bg-[#f5efe3] hover:bg-white text-[#2d2618] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group cursor-pointer"
                      >
                        <div>{t({ es: 'Ver Proyectos Territoriales', en: 'View Territorial Projects' })}</div>
                        <div className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</div>
                      </Link>

                      {/* Controles Anterior / Siguiente en Mobile */}
                      <div className="flex items-center gap-2 lg:hidden">
                        <button
                          type="button"
                          onClick={handlePrevOds}
                          className="w-10 h-10 bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                          title={t({ es: 'Anterior', en: 'Previous' })}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextOds}
                          className="w-10 h-10 bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                          title={t({ es: 'Siguiente', en: 'Next' })}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Métricas y Entregables */}
                  <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/15 lg:pl-10">
                    <div className="p-5 bg-white/5 border border-white/10 backdrop-blur-md">
                      <div className="font-serif text-4xl sm:text-5xl text-[#f5efe3] font-light mb-1 tabular">
                        {activeOds.metric}
                      </div>
                      <div className="text-xs text-[#a9bd6f] font-mono tracking-wide">
                        {t(activeOds.metricLabel)}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#d8ceb6] font-semibold">
                        {t({ es: 'Acciones clave en territorio:', en: 'Key territorial actions:' })}
                      </div>
                      {activeOds.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 font-light leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-[#a9bd6f] mt-1.5 shrink-0" />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 text-xs text-slate-400 font-light flex items-center justify-between">
                      <span className="text-[#d8ceb6] font-medium">{activeOds.meta}</span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {activeOdsIndex + 1} / {odsList.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterNav />
    </div>
  );
}
