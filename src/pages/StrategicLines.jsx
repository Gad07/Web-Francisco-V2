import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { useI18n } from '../i18n/index.jsx';

export default function StrategicLines() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedLine, setExpandedLine] = useState(null);

  const EASE = [0.22, 1, 0.36, 1];

  const categories = [
    { id: 'ALL', label: { es: 'Todos los Ejes', en: 'All Action Axes' } },
    { id: 'GOBERNANZA', label: { es: 'Gobernanza & Política', en: 'Governance & Policy' } },
    { id: 'CLIMA', label: { es: 'Clima & Restauración', en: 'Climate & Restoration' } },
    { id: 'TERRITORIO', label: { es: 'Territorio & Sistemas', en: 'Territory & Systems' } },
  ];

  const lines = [
    {
      id: '01',
      category: 'GOBERNANZA',
      title: {
        es: 'Gobernanza ambiental y política pública',
        en: 'Environmental governance and public policy',
      },
      desc: {
        es: 'Diseñamos propuestas de política pública, análisis normativos y mecanismos de participación para fortalecer la gobernanza ambiental, la justicia y la corresponsabilidad entre autoridades, comunidades y sectores sociales.',
        en: 'We design public policy proposals, normative analyses, and participatory mechanisms to strengthen environmental governance, justice, and shared responsibility among authorities, communities, and social sectors.',
      },
      odsDestacados: ['16', '17'],
      odsMetas: [
        {
          ods: '16',
          title: { es: 'ODS 16 · Paz, Justicia e Instituciones Sólidas', en: 'SDG 16 · Peace, Justice & Strong Institutions' },
          metas: [
            { code: '16.3', text: { es: 'Estado de derecho y acceso a la justicia', en: 'Rule of law and equal access to justice' } },
            { code: '16.6', text: { es: 'Instituciones eficaces y transparentes', en: 'Effective and transparent institutions' } },
            { code: '16.7', text: { es: 'Decisiones inclusivas y participativas', en: 'Inclusive and participatory decision-making' } },
            { code: '16.10', text: { es: 'Acceso público a la información', en: 'Public access to information' } },
          ],
        },
        {
          ods: '17',
          title: { es: 'ODS 17 · Alianzas para Lograr los Objetivos', en: 'SDG 17 · Partnerships for the Goals' },
          metas: [
            { code: '17.14', text: { es: 'Coherencia de políticas para el desarrollo sostenible', en: 'Policy coherence for sustainable development' } },
            { code: '17.17', text: { es: 'Alianzas entre sectores', en: 'Effective public-private and civil society partnerships' } },
          ],
        },
      ],
      img: '/politica-gobierno.jpg',
    },
    {
      id: '02',
      category: 'CLIMA',
      title: {
        es: 'Cambio climático, resiliencia y transición justa',
        en: 'Climate change, resilience and just transition',
      },
      desc: {
        es: 'Impulsamos la mitigación y adaptación climática, la transición energética justa y las soluciones basadas en la naturaleza para reducir riesgos, promover el uso sostenible de los recursos y fortalecer la resiliencia territorial.',
        en: 'We drive climate mitigation and adaptation, just energy transition, and nature-based solutions to reduce risks, promote sustainable resource use, and strengthen territorial resilience.',
      },
      odsDestacados: ['07', '13'],
      odsMetas: [
        {
          ods: '13',
          title: { es: 'ODS 13 · Acción por el Clima', en: 'SDG 13 · Climate Action' },
          metas: [
            { code: '13.1', text: { es: 'Resiliencia y adaptación climática', en: 'Climate resilience and adaptive capacity' } },
            { code: '13.2', text: { es: 'Integración del cambio climático en políticas', en: 'Integrating climate change measures into policies' } },
            { code: '13.3', text: { es: 'Educación y capacidades climáticas', en: 'Climate education and institutional capacity' } },
          ],
        },
        {
          ods: '07',
          title: { es: 'ODS 7 · Energía Asequible y No Contaminante', en: 'SDG 7 · Affordable & Clean Energy' },
          metas: [
            { code: '7.2', text: { es: 'Energías renovables', en: 'Substantially increase share of renewable energy' } },
            { code: '7.3', text: { es: 'Eficiencia energética', en: 'Double the global rate of energy efficiency improvement' } },
          ],
        },
        {
          ods: '08',
          title: { es: 'ODS 8 · Trabajo Decente y Crecimiento Económico', en: 'SDG 8 · Decent Work & Economic Growth' },
          metas: [
            { code: '8.4', text: { es: 'Eficiencia de recursos y reducción de la degradación ambiental', en: 'Resource efficiency and decoupling growth from environmental degradation' } },
          ],
        },
        {
          ods: '11',
          title: { es: 'ODS 11 · Ciudades y Comunidades Sostenibles', en: 'SDG 11 · Sustainable Cities & Communities' },
          metas: [
            { code: '11.b', text: { es: 'Planes integrados de acción climática y resiliencia urbana', en: 'Integrated disaster risk management and climate action plans' } },
          ],
        },
      ],
      img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '03',
      category: 'CLIMA',
      title: {
        es: 'Conservación de la biodiversidad y restauración ecológica',
        en: 'Biodiversity conservation and ecological restoration',
      },
      desc: {
        es: 'Promovemos la conservación y restauración de bosques, suelos, ríos, humedales y cuencas, integrando soluciones basadas en la naturaleza, conocimiento científico y participación comunitaria para recuperar los servicios ecosistémicos.',
        en: 'We champion the conservation and restoration of forests, soils, rivers, wetlands, and watersheds, integrating nature-based solutions, scientific knowledge, and community participation to recover ecosystem services.',
      },
      odsDestacados: ['06', '15'],
      odsMetas: [
        {
          ods: '15',
          title: { es: 'ODS 15 · Vida de Ecosistemas Terrestres', en: 'SDG 15 · Life on Land' },
          metas: [
            { code: '15.1', text: { es: 'Ecosistemas terrestres y de agua dulce', en: 'Conservation of terrestrial and inland freshwater ecosystems' } },
            { code: '15.2', text: { es: 'Restauración forestal y gestión sostenible', en: 'Sustainable forest management and reforestation' } },
            { code: '15.3', text: { es: 'Recuperación de suelos y lucha contra desertificación', en: 'Soil restoration and combat desertification' } },
            { code: '15.5', text: { es: 'Protección de hábitats y especies amenazadas', en: 'Protect natural habitats and halt biodiversity loss' } },
          ],
        },
        {
          ods: '06',
          title: { es: 'ODS 6 · Agua Limpia y Saneamiento', en: 'SDG 6 · Clean Water & Sanitation' },
          metas: [
            { code: '6.3', text: { es: 'Calidad del agua y reducción de contaminación', en: 'Improve water quality and reduce pollution' } },
            { code: '6.5', text: { es: 'Gestión integrada de recursos hídricos', en: 'Integrated water resources management' } },
            { code: '6.6', text: { es: 'Restauración de ecosistemas vinculados al agua', en: 'Protect and restore water-related ecosystems' } },
            { code: '6.b', text: { es: 'Participación comunitaria en gestión hídrica', en: 'Support local community participation in water management' } },
          ],
        },
      ],
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '04',
      category: 'TERRITORIO',
      title: {
        es: 'Ordenamiento territorial, justicia ambiental y cohesión social',
        en: 'Territorial planning, environmental justice and social cohesion',
      },
      desc: {
        es: 'Impulsamos la planificación territorial participativa, la protección del patrimonio biocultural y la justicia ambiental, fortaleciendo los derechos comunitarios, la inclusión social y el acceso equitativo a los recursos naturales.',
        en: 'We foster participatory territorial planning, biocultural heritage protection, and environmental justice, strengthening community rights, social inclusion, and equitable access to natural resources.',
      },
      odsDestacados: ['10', '11'],
      odsMetas: [
        {
          ods: '11',
          title: { es: 'ODS 11 · Ciudades y Comunidades Sostenibles', en: 'SDG 11 · Sustainable Cities & Communities' },
          metas: [
            { code: '11.3', text: { es: 'Planificación territorial participativa', en: 'Inclusive and participatory human settlement planning' } },
            { code: '11.4', text: { es: 'Protección del patrimonio natural y cultural', en: 'Safeguard cultural and natural heritage' } },
            { code: '11.a', text: { es: 'Integración urbano-rural', en: 'Positive economic, social and environmental urban-rural links' } },
          ],
        },
        {
          ods: '10',
          title: { es: 'ODS 10 · Reducción de las Desigualdades', en: 'SDG 10 · Reduced Inequalities' },
          metas: [
            { code: '10.2', text: { es: 'Inclusión social, económica y política', en: 'Empower and promote social, economic and political inclusion' } },
            { code: '10.3', text: { es: 'Igualdad de oportunidades y eliminación de discriminación', en: 'Ensure equal opportunity and reduce inequalities of outcome' } },
          ],
        },
        {
          ods: '16',
          title: { es: 'ODS 16 · Paz, Justicia e Instituciones Sólidas', en: 'SDG 16 · Peace, Justice & Strong Institutions' },
          metas: [
            { code: '16.7', text: { es: 'Participación representativa en las decisiones', en: 'Ensure responsive, inclusive and participatory decision-making' } },
          ],
        },
        {
          ods: '01',
          title: { es: 'ODS 1 · Fin de la Pobreza', en: 'SDG 1 · No Poverty' },
          metas: [
            { code: '1.4', text: { es: 'Acceso equitativo a la tierra y recursos naturales', en: 'Equal rights to economic resources, basic services and land' } },
          ],
        },
      ],
      img: '/images/wess/identidad-comunidad-territorio.webp',
    },
    {
      id: '05',
      category: 'GOBERNANZA',
      title: {
        es: 'Implementación y seguimiento de la Agenda 2030',
        en: 'Implementation and monitoring of the 2030 Agenda',
      },
      desc: {
        es: 'Acompañamos la implementación de la Agenda 2030 mediante diagnósticos, indicadores, seguimiento de metas y evaluación de políticas y proyectos, fortaleciendo la transparencia y la toma de decisiones basadas en evidencia.',
        en: 'We support 2030 Agenda implementation through diagnostics, indicator frameworks, target monitoring, and policy/project evaluations, bolstering transparency and evidence-based decision making.',
      },
      odsDestacados: ['16', '17'],
      odsMetas: [
        {
          ods: '17',
          title: { es: 'ODS 17 · Alianzas para Lograr los Objetivos', en: 'SDG 17 · Partnerships for the Goals' },
          metas: [
            { code: '17.14', text: { es: 'Coherencia de políticas para el desarrollo sostenible', en: 'Enhance policy coherence for sustainable development' } },
            { code: '17.18', text: { es: 'Disponibilidad de datos oportunos y desagregados', en: 'Enhanced data availability, timeliness and disaggregation' } },
            { code: '17.19', text: { es: 'Indicadores complementarios para medir desarrollo sostenible', en: 'Develop measurements of progress that complement GDP' } },
          ],
        },
        {
          ods: '16',
          title: { es: 'ODS 16 · Paz, Justicia e Instituciones Sólidas', en: 'SDG 16 · Peace, Justice & Strong Institutions' },
          metas: [
            { code: '16.6', text: { es: 'Transparencia y rendición de cuentas institucional', en: 'Develop effective, accountable and transparent institutions' } },
            { code: '16.10', text: { es: 'Acceso a información pública y protección de libertades', en: 'Ensure public access to information and fundamental freedoms' } },
          ],
        },
      ],
      img: '/agenda-2030-linea.jpg',
    },
    {
      id: '06',
      category: 'TERRITORIO',
      title: {
        es: 'Sistemas agroalimentarios y soberanía alimentaria',
        en: 'Agri-food systems and food sovereignty',
      },
      desc: {
        es: 'Promovemos la agroecología, la conservación de semillas nativas, la reducción de pérdidas alimentarias y los circuitos cortos de comercialización para fortalecer la producción sostenible y los medios de vida rurales.',
        en: 'We promote agroecology, native seed conservation, food loss reduction, and short commercialization circuits to empower sustainable production and rural livelihoods.',
      },
      odsDestacados: ['02', '12'],
      odsMetas: [
        {
          ods: '02',
          title: { es: 'ODS 2 · Hambre Cero', en: 'SDG 2 · Zero Hunger' },
          metas: [
            { code: '2.3', text: { es: 'Productividad e ingresos de pequeños productores', en: 'Double agricultural productivity and incomes of small-scale food producers' } },
            { code: '2.4', text: { es: 'Agricultura sostenible y resiliente', en: 'Ensure sustainable food production systems and resilient practices' } },
            { code: '2.5', text: { es: 'Diversidad genética de semillas nativas y cultivadas', en: 'Maintain genetic diversity of seeds, cultivated plants and farmed animals' } },
          ],
        },
        {
          ods: '12',
          title: { es: 'ODS 12 · Producción y Consumo Responsables', en: 'SDG 12 · Responsible Consumption & Production' },
          metas: [
            { code: '12.2', text: { es: 'Uso sostenible y eficiente de recursos naturales', en: 'Achieve sustainable management and efficient use of natural resources' } },
            { code: '12.3', text: { es: 'Reducción de pérdidas y desperdicios alimentarios', en: 'Halve per capita food waste and reduce food losses along supply chains' } },
          ],
        },
        {
          ods: '08',
          title: { es: 'ODS 8 · Trabajo Decente y Crecimiento Económico', en: 'SDG 8 · Decent Work & Economic Growth' },
          metas: [
            { code: '8.3', text: { es: 'Emprendimiento y fortalecimiento de pequeñas unidades productivas', en: 'Promote development-oriented policies supporting productive activities' } },
          ],
        },
      ],
      img: '/images/wess/milpa-chinampera.webp',
    },
    {
      id: '07',
      category: 'TERRITORIO',
      title: {
        es: 'Bienestar animal y enfoque Una Salud',
        en: 'Animal welfare and One Health approach',
      },
      desc: {
        es: 'Promovemos el bienestar de los animales domésticos y silvestres, la protección de sus hábitats y la prevención de riesgos zoonóticos mediante el enfoque Una Salud, integrando salud humana, animal y ambiental.',
        en: 'We promote the welfare of domestic and wild animals, habitat protection, and zoonotic risk prevention through the One Health framework, integrating human, animal, and environmental health.',
      },
      odsDestacados: ['03', '15'],
      odsMetas: [
        {
          ods: '03',
          title: { es: 'ODS 3 · Salud y Bienestar', en: 'SDG 3 · Good Health & Well-being' },
          metas: [
            { code: '3.3', text: { es: 'Combate a enfermedades transmisibles y zoonosis', en: 'End epidemics and combat communicable diseases, including zoonoses' } },
            { code: '3.d', text: { es: 'Fortalecimiento de capacidades de prevención sanitaria', en: 'Strengthen early warning and risk reduction for global health risks' } },
          ],
        },
        {
          ods: '15',
          title: { es: 'ODS 15 · Vida de Ecosistemas Terrestres', en: 'SDG 15 · Life on Land' },
          metas: [
            { code: '15.5', text: { es: 'Protección de hábitats y salvaguarda de especies', en: 'Halt the loss of biodiversity and protect threatened species' } },
          ],
        },
      ],
      img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '08',
      category: 'TERRITORIO',
      title: {
        es: 'Educación ambiental y cultura de la sostenibilidad',
        en: 'Environmental education and sustainability culture',
      },
      desc: {
        es: 'Desarrollamos cursos, talleres y experiencias educativas que integran ciencia, saberes ancestrales y participación comunitaria para fortalecer capacidades, promover hábitos sostenibles e impulsar el liderazgo de las juventudes.',
        en: 'We deliver courses, workshops, and educational experiences integrating science, ancestral knowledge, and community engagement to build capacities, foster sustainable habits, and empower youth leadership.',
      },
      odsDestacados: ['04', '12'],
      odsMetas: [
        {
          ods: '04',
          title: { es: 'ODS 4 · Educación de Calidad', en: 'SDG 4 · Quality Education' },
          metas: [
            { code: '4.7', text: { es: 'Educación para el desarrollo sostenible y estilos de vida responsables', en: 'Education for sustainable development, human rights and gender equality' } },
            { code: '4.4', text: { es: 'Competencias técnicas para empleo y emprendimiento verde', en: 'Technical and vocational skills for employment, decent jobs and entrepreneurship' } },
            { code: '4.5', text: { es: 'Acceso equitativo a la formación ambiental comunitaria', en: 'Eliminate gender disparities in education and ensure equal access' } },
          ],
        },
        {
          ods: '12',
          title: { es: 'ODS 12 · Producción y Consumo Responsables', en: 'SDG 12 · Responsible Consumption & Production' },
          metas: [
            { code: '12.8', text: { es: 'Información y conocimientos para estilos de vida en armonía con la naturaleza', en: 'Information and awareness for sustainable development and lifestyles' } },
          ],
        },
        {
          ods: '13',
          title: { es: 'ODS 13 · Acción por el Clima', en: 'SDG 13 · Climate Action' },
          metas: [
            { code: '13.3', text: { es: 'Educación y sensibilización frente al cambio climático', en: 'Improve education, awareness-raising and human and institutional capacity on climate mitigation' } },
          ],
        },
      ],
      img: '/images/wess/educacion-para-la-sostenibilidad.webp',
    },
    {
      id: '09',
      category: 'GOBERNANZA',
      title: {
        es: 'Investigación, innovación y transferencia de conocimiento',
        en: 'Research, innovation and knowledge transfer',
      },
      desc: {
        es: 'Impulsamos la investigación aplicada, el monitoreo ambiental y la transferencia de conocimientos y tecnologías sostenibles para desarrollar soluciones innovadoras, generar información confiable y fortalecer las decisiones basadas en evidencia.',
        en: 'We drive applied research, environmental monitoring, and sustainable technology transfer to build innovative solutions, generate reliable information, and enhance evidence-based decisions.',
      },
      odsDestacados: ['09', '17'],
      odsMetas: [
        {
          ods: '09',
          title: { es: 'ODS 9 · Industria, Innovación e Infraestructura', en: 'SDG 9 · Industry, Innovation & Infrastructure' },
          metas: [
            { code: '9.5', text: { es: 'Investigación científica y capacidades tecnológicas aplicadas', en: 'Enhance scientific research and upgrade the technological capabilities' } },
          ],
        },
        {
          ods: '17',
          title: { es: 'ODS 17 · Alianzas para Lograr los Objetivos', en: 'SDG 17 · Partnerships for the Goals' },
          metas: [
            { code: '17.6', text: { es: 'Cooperación científica y tecnológica internacional', en: 'Enhance international cooperation on and access to science, technology and innovation' } },
            { code: '17.7', text: { es: 'Transferencia y difusión de tecnologías ambientalmente adecuadas', en: 'Promote the development, transfer, dissemination and diffusion of environmentally sound technologies' } },
          ],
        },
        {
          ods: '12',
          title: { es: 'ODS 12 · Producción y Consumo Responsables', en: 'SDG 12 · Responsible Consumption & Production' },
          metas: [
            { code: '12.a', text: { es: 'Fortalecimiento de capacidades científicas para producción sostenible', en: 'Support developing countries to strengthen their scientific and technological capacity' } },
          ],
        },
      ],
      img: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&h=600&fit=crop&auto=format',
    },
    {
      id: '10',
      category: 'GOBERNANZA',
      title: {
        es: 'Alianzas estratégicas y cooperación internacional',
        en: 'Strategic alliances and international cooperation',
      },
      desc: {
        es: 'Consolidamos alianzas interinstitucionales, cooperación técnica internacional y articulación multiactor con organismos globales, academia y sociedad civil para movilizar recursos, conocimiento e incidencia efectiva.',
        en: 'We consolidate multi-actor alliances, international technical cooperation, and institutional frameworks with global organizations, academia, and civil society to mobilize resources, expertise, and effective impact.',
      },
      odsDestacados: ['16', '17'],
      odsMetas: [
        {
          ods: '17',
          title: { es: 'ODS 17 · Alianzas para Lograr los Objetivos', en: 'SDG 17 · Partnerships for the Goals' },
          metas: [
            { code: '17.9', text: { es: 'Creación de capacidad internacional para planes de desarrollo', en: 'Enhance international support for implementing effective and targeted capacity-building' } },
            { code: '17.16', text: { es: 'Alianza mundial multiactor para el desarrollo sostenible', en: 'Enhance the global partnership for sustainable development, complemented by multi-stakeholder partnerships' } },
            { code: '17.17', text: { es: 'Alianzas público-privadas y de la sociedad civil', en: 'Encourage and promote effective public, public-private and civil society partnerships' } },
          ],
        },
        {
          ods: '16',
          title: { es: 'ODS 16 · Paz, Justicia e Instituciones Sólidas', en: 'SDG 16 · Peace, Justice & Strong Institutions' },
          metas: [
            { code: '16.b', text: { es: 'Leyes y políticas no discriminatorias en favor del desarrollo sostenible', en: 'Promote and enforce non-discriminatory laws and policies for sustainable development' } },
          ],
        },
      ],
      img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800&h=600&fit=crop&auto=format',
    },
  ];

  const filteredLines = selectedCategory === 'ALL'
    ? lines
    : lines.filter((l) => l.category === selectedCategory);

  const shortDescriptions = {
    '01': {
      es: 'Propuestas normativas, participación social y justicia ambiental.',
      en: 'Normative proposals, social participation, and environmental justice.',
    },
    '02': {
      es: 'Mitigación, adaptación climática y soluciones basadas en la naturaleza.',
      en: 'Climate mitigation, adaptation, and nature-based solutions.',
    },
    '03': {
      es: 'Recuperación de bosques, cuencas, humedales y servicios ecosistémicos.',
      en: 'Restoration of forests, watersheds, wetlands, and ecosystem services.',
    },
    '04': {
      es: 'Planificación participativa y defensa del patrimonio biocultural.',
      en: 'Participatory planning and defense of biocultural heritage.',
    },
    '05': {
      es: 'Diagnósticos, indicadores y evaluación de metas basada en evidencia.',
      en: 'Diagnostics, indicators, and evidence-based target evaluation.',
    },
    '06': {
      es: 'Agroecología, resguardo de semillas nativas y medios de vida rurales.',
      en: 'Agroecology, native seed conservation, and rural livelihoods.',
    },
    '07': {
      es: 'Protección de fauna, hábitats e integración de salud ambiental.',
      en: 'Wildlife protection, habitats, and environmental health integration.',
    },
    '08': {
      es: 'Formación comunitaria, saberes ancestrales y liderazgo juvenil.',
      en: 'Community training, ancestral wisdom, and youth leadership.',
    },
    '09': {
      es: 'Ciencia aplicada, monitoreo ambiental y tecnologías sostenibles.',
      en: 'Applied science, environmental monitoring, and sustainable technologies.',
    },
    '10': {
      es: 'Cooperación técnica multilateral y articulación interinstitucional.',
      en: 'Multilateral technical cooperation and institutional alliances.',
    },
  };

  const countFor = (id) => (id === 'ALL' ? lines.length : lines.filter((l) => l.category === id).length);
  const getCategoryLabel = (catId) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.label : { es: 'Eje Estratégico', en: 'Strategic Axis' };
  };
  const activeLineObj = expandedLine ? lines.find((l) => l.id === expandedLine) : null;
  const activeLineIdx = activeLineObj ? lines.findIndex((l) => l.id === activeLineObj.id) : -1;

  const cleanOdsTitle = (rawTitle) => {
    if (!rawTitle) return '';
    return rawTitle.replace(/^(ODS|SDG)\s*\d+\s*·\s*/i, '');
  };

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('cga:modal', { detail: { open: Boolean(expandedLine) } })
    );
    if (!expandedLine) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setExpandedLine(null);
      if (e.key === 'ArrowRight') {
        const nextIdx = (activeLineIdx + 1) % lines.length;
        setExpandedLine(lines[nextIdx].id);
      }
      if (e.key === 'ArrowLeft') {
        const prevIdx = (activeLineIdx - 1 + lines.length) % lines.length;
        setExpandedLine(lines[prevIdx].id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.dispatchEvent(new CustomEvent('cga:modal', { detail: { open: false } }));
    };
  }, [expandedLine, activeLineIdx]);

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite={{ es: 'Nuestra acción por', en: 'Our action for' }}
          titleGreen={{ es: 'la sostenibilidad', en: 'sustainability' }}
          description={{
            es: 'El Consejo Global Ambiental articula soluciones a los desafíos sociales y ambientales mediante la cooperación, la participación comunitaria y el compromiso con la Agenda 2030.',
            en: 'The Global Environmental Council articulates solutions to social and environmental challenges through cooperation, community participation, and commitment to the 2030 Agenda.',
          }}
          bgImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&h=900&fit=crop"
        />

        {/* ─── CABECERA EDITORIAL + SELECTOR DE ÁMBITOS ─── */}
        <section className="pt-16 sm:pt-24 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full">
          <div className="pb-8 border-b border-[#d8ceb6]/70 mb-10 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2d2618] font-light leading-[1.14]">
              {t({ es: 'Diez ejes de acción,', en: 'Ten action axes,' })}{' '}
              <span className="italic text-[#4a5a22] font-normal">
                {t({ es: 'una visión compartida.', en: 'one shared vision.' })}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#635741] font-light leading-relaxed">
              {t({
                es: 'Nuestros ejes orientan el desarrollo de programas, proyectos y alianzas que integran conocimiento científico, saberes ancestrales y pertinencia territorial.',
                en: 'Our axes guide the development of programs, projects, and alliances that integrate scientific knowledge, ancestral wisdom, and territorial relevance.',
              })}
            </p>
          </div>

          {/* Filtros por ámbito */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#d8ceb6]/40 mb-12">
            <span className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#7a6e58] font-sans">
              <span className="w-2 h-2 rounded-full bg-[#4a5a22]" />
              {t({ es: 'Mostrando', en: 'Showing' })}{' '}
              <strong className="text-[#2d2618]">{filteredLines.length}</strong>{' '}
              {t({ es: 'de', en: 'of' })} {lines.length} {t({ es: 'ejes de acción', en: 'action axes' })}
            </span>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#eae4d2]/80 rounded-full border border-[#d8ceb6]">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative py-2 px-4 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer ${
                      active ? 'text-[#f5efe3]' : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="ambito-pill"
                        className="absolute inset-0 rounded-full bg-[#4a5a22] shadow-sm"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 font-medium">
                      {t(cat.label)}
                      <span className={`text-[10px] ${active ? 'text-[#cdd2a6]' : 'text-[#8a7e68]'}`}>
                        ({countFor(cat.id)})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── GRID MOSAICO INTERCALADO (1x1, 1x2, 2x1, 2x2) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[250px] lg:auto-rows-[255px] grid-flow-dense gap-5 lg:gap-6">
            {filteredLines.map((line, i) => {
              const isExpanded = expandedLine === line.id;
              const allOdsNums = Array.from(
                new Set([
                  ...line.odsDestacados.map((n) => n.padStart(2, '0')),
                  ...line.odsMetas.map((g) => g.ods.padStart(2, '0')),
                ])
              );

              // Patrón mosaico exacto sin huecos para 10, 4 o 2 tarjetas
              const getMosaicPattern = (idx, total) => {
                if (total === 2) {
                  return {
                    span: 'md:col-span-1 lg:col-span-2 md:row-span-2 lg:row-span-2',
                    type: '2x2',
                  };
                }
                if (total === 4) {
                  const patterns4 = [
                    { span: 'md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2', type: '2x2' },
                    { span: 'md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-1', type: '2x1' },
                    { span: 'md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1', type: '1x1' },
                    { span: 'md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1', type: '1x1' },
                  ];
                  return patterns4[idx % 4];
                }
                // Mosaico de 10 tarjetas (4 cols × 5 filas = 20 celdas exactas)
                const patterns10 = [
                  { span: 'md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2', type: '2x2' }, // 01: 2x2
                  { span: 'md:col-span-1 lg:col-span-1 md:row-span-2 lg:row-span-2', type: '1x2' }, // 02: 1x2 (alta)
                  { span: 'md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1', type: '1x1' }, // 03: 1x1
                  { span: 'md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1', type: '1x1' }, // 04: 1x1
                  { span: 'md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-1', type: '2x1' }, // 05: 2x1 (ancha)
                  { span: 'md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-1', type: '2x1' }, // 06: 2x1 (ancha)
                  { span: 'md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1', type: '1x1' }, // 07: 1x1
                  { span: 'md:col-span-1 lg:col-span-1 md:row-span-2 lg:row-span-2', type: '1x2' }, // 08: 1x2 (alta)
                  { span: 'md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2', type: '2x2' }, // 09: 2x2
                  { span: 'md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1', type: '1x1' }, // 10: 1x1
                ];
                return patterns10[idx % patterns10.length];
              };

              const { span, type } = getMosaicPattern(i, filteredLines.length);
              const isLarge = type === '2x2';
              const isCompactRow = type === '1x1' || type === '2x1';

              return (
                <motion.article
                  key={line.id}
                  onClick={() => setExpandedLine(isExpanded ? null : line.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: 0.04 * (i % 5), ease: EASE }}
                  className={`${span} min-h-[260px] md:min-h-0 group relative rounded-[24px] overflow-hidden bg-[#221c12] shadow-[0_12px_32px_-12px_rgba(45,38,24,0.18)] hover:shadow-[0_26px_50px_-12px_rgba(45,38,24,0.32)] hover:-translate-y-1 transition-all duration-500 cursor-pointer select-none flex flex-col justify-between ${
                    isLarge ? 'p-6 sm:p-7' : 'p-5'
                  }`}
                >
                  {/* Fotografía a sangre completa ocupando toda la card */}
                  <img
                    src={line.img}
                    alt={t(line.title)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.1s] ease-out"
                    loading="lazy"
                  />

                  {/* Degradado suave para proteger la foto y dar lectura al título */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(14,11,7,0.34) 0%, rgba(14,11,7,0.02) 38%, rgba(14,11,7,0.18) 58%, rgba(14,11,7,0.9) 100%)',
                    }}
                  />

                  {/* Parte Superior: Número + Íconos ODS */}
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <span
                      className={`font-serif font-light text-white/95 tabular-nums leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] ${
                        isLarge ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'
                      }`}
                    >
                      {line.id}
                    </span>

                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {allOdsNums.map((num) => (
                        <img
                          key={num}
                          src={`/images/ods/S-WEB-Goal-${num}.png`}
                          alt={`ODS ${num}`}
                          className={`${
                            isLarge ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-7 h-7 sm:w-8 sm:h-8'
                          } rounded-[6px] object-contain shadow-[0_4px_12px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300`}
                          title={`ODS ${num}`}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Parte Inferior: Título + Descripción breve */}
                  <div className="relative z-10 pt-3 space-y-1.5">
                    <h3
                      className={`font-serif text-white font-normal tracking-[-0.01em] group-hover:text-[#e5eec2] transition-colors duration-300 text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${
                        isLarge
                          ? 'text-2xl sm:text-3xl leading-[1.16]'
                          : isCompactRow
                          ? 'text-[17px] sm:text-[19px] leading-[1.2]'
                          : 'text-xl sm:text-[22px] leading-[1.2]'
                      }`}
                    >
                      {t(line.title)}
                    </h3>
                    <p
                      className={`text-[#e8e1d3]/85 font-light leading-snug drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] ${
                        isLarge ? 'text-xs sm:text-sm max-w-md' : 'text-[11.5px] sm:text-xs line-clamp-2'
                      }`}
                    >
                      {t(shortDescriptions[line.id] || line.desc)}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* ─── POP-UP MINIMALISTA CON PROTAGONISMO DE FOTO Y ODS ─── */}
          <AnimatePresence>
            {activeLineObj && (() => {
              const prevLine = lines[(activeLineIdx - 1 + lines.length) % lines.length];
              const nextLine = lines[(activeLineIdx + 1) % lines.length];

              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setExpandedLine(null)}
                  className="fixed inset-0 z-[120] bg-[#120e09]/80 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
                >
                  {/* Botón flotante izquierdo (Eje anterior) en escritorio */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedLine(prevLine.id);
                    }}
                    title={`${t({ es: 'Anterior', en: 'Previous' })}: ${t(prevLine.title)}`}
                    className="hidden lg:flex w-11 h-11 mr-4 rounded-full bg-[#faf6ec]/15 hover:bg-[#faf6ec] text-[#faf6ec] hover:text-[#2d2618] border border-white/20 items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
                  >
                    &larr;
                  </button>

                  <motion.div
                    key={activeLineObj.id}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-[920px] max-h-[90dvh] rounded-[32px] bg-[#faf6ec] text-[#2d2618] border border-[#d8ceb6] shadow-[0_32px_90px_-16px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col"
                  >
                    <div className="overflow-y-auto flex-1 [scrollbar-width:thin] [scrollbar-color:rgba(74,90,34,0.28)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-7 [&::-webkit-scrollbar-thumb]:bg-[#4a5a22]/25 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#4a5a22]/50">
                      {/* ── 1. FOTOGRAFÍA PROTAGONISTA ENMARCADA ── */}
                      <div className="p-3 pb-0">
                        <div className="relative h-56 sm:h-68 rounded-[24px] overflow-hidden bg-[#1a150e]">
                          <img
                            src={activeLineObj.img}
                            alt={t(activeLineObj.title)}
                            className="w-full h-full object-cover"
                          />

                          {/* Degradado limpio para lectura del título sobre la foto */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(14,11,7,0.35) 0%, rgba(14,11,7,0.05) 40%, rgba(14,11,7,0.88) 100%)',
                            }}
                          />

                          {/* Número del eje + Botón cerrar minimalista */}
                          <div className="absolute top-4 left-5 right-4 z-10 flex items-start justify-between">
                            <span className="font-serif text-4xl sm:text-5xl font-light text-white/95 tabular-nums leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                              {activeLineObj.id}
                            </span>

                            <button
                              type="button"
                              onClick={() => setExpandedLine(null)}
                              className="w-9 h-9 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#2d2618] backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer text-xs"
                              title={t({ es: 'Cerrar (Esc)', en: 'Close (Esc)' })}
                            >
                              ✕
                            </button>
                          </div>

                          {/* Título del eje sobre el borde inferior de la fotografía */}
                          <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:right-7 z-10">
                            <h3 className="font-serif text-2xl sm:text-3xl md:text-[32px] text-white font-normal leading-[1.15] tracking-[-0.01em] text-balance">
                              {t(activeLineObj.title)}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* ── 2. SÍNTESIS + PROTAGONISMO DE LOS ODS Y SUS METAS ── */}
                      <div className="p-6 sm:p-7 pt-5 space-y-6">
                        {/* Descripción editorial limpia */}
                        <p className="text-sm sm:text-[15px] text-[#4e4330] font-light leading-[1.68]">
                          {t(activeLineObj.desc)}
                        </p>

                        {/* Grilla limpia de ODS con íconos grandes protagonistas */}
                        <div
                          className={`grid gap-4 ${
                            activeLineObj.odsMetas.length === 3
                              ? 'grid-cols-1 md:grid-cols-3'
                              : 'grid-cols-1 sm:grid-cols-2'
                          }`}
                        >
                          {activeLineObj.odsMetas.map((group) => {
                            const odsKey = group.ods.padStart(2, '0');
                            return (
                              <div
                                key={group.ods}
                                className="rounded-2xl bg-[#f3ede0]/90 border border-[#d8ceb6]/80 p-4 sm:p-5 flex flex-col gap-3.5"
                              >
                                {/* Ícono ODS a gran escala + Nombre del Objetivo */}
                                <div className="flex items-center gap-3.5">
                                  <img
                                    src={`/images/ods/S-WEB-Goal-${odsKey}.png`}
                                    alt={`ODS ${odsKey}`}
                                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-contain shadow-sm ring-1 ring-black/10 shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <h4 className="font-serif text-[15px] sm:text-base text-[#2d2618] font-normal leading-snug">
                                      {cleanOdsTitle(t(group.title))}
                                    </h4>
                                  </div>
                                </div>

                                {/* Metas del ODS */}
                                <ul className="space-y-2 pt-3 border-t border-[#d8ceb6]/70">
                                  {group.metas.map((m) => (
                                    <li
                                      key={m.code}
                                      className="flex items-baseline gap-2.5 text-xs sm:text-[13px] leading-relaxed"
                                    >
                                      <span className="font-mono text-[11px] font-semibold text-[#4a5a22] shrink-0 tabular-nums">
                                        {m.code}
                                      </span>
                                      <span className="text-[#4e4330] font-light">
                                        {t(m.text)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navegación móvil discreta (solo en pantallas pequeñas) */}
                        <div className="flex lg:hidden items-center justify-between pt-4 border-t border-[#d8ceb6]/70 text-xs font-medium text-[#4a5a22]">
                          <button
                            type="button"
                            onClick={() => setExpandedLine(prevLine.id)}
                            className="cursor-pointer"
                          >
                            &larr; {t({ es: 'Eje', en: 'Axis' })} {prevLine.id}
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpandedLine(nextLine.id)}
                            className="cursor-pointer"
                          >
                            {t({ es: 'Eje', en: 'Axis' })} {nextLine.id} &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Botón flotante derecho (Siguiente eje) en escritorio */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedLine(nextLine.id);
                    }}
                    title={`${t({ es: 'Siguiente', en: 'Next' })}: ${t(nextLine.title)}`}
                    className="hidden lg:flex w-11 h-11 ml-4 rounded-full bg-[#faf6ec]/15 hover:bg-[#faf6ec] text-[#faf6ec] hover:text-[#2d2618] border border-white/20 items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
                  >
                    &rarr;
                  </button>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* ─── CIERRE EDITORIAL ─── */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#2d2618] text-[#f5efe3] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-snug">
                {t({
                  es: 'Un marco vivo que se traduce en proyectos territoriales verificables',
                  en: 'A living framework that translates into verifiable territorial projects',
                })}
              </h3>
              <p className="text-sm text-[#d8d2c2]/80 font-light leading-relaxed">
                {t({
                  es: 'Explora el catálogo de intervenciones activas, alianzas multilaterales y bancos de germoplasma que materializan estos 10 ejes en campo.',
                  en: 'Explore the portfolio of active interventions, multilateral partnerships and germplasm banks that ground these 10 action axes in the field.',
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/proyectos"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4a5a22] hover:bg-[#5a6b2a] text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>{t({ es: 'Catálogo de Proyectos', en: 'Project Catalogue' })}</span>
                <span className="text-sm">&rarr;</span>
              </Link>
              <Link
                to="/agenda-2030"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#f5efe3] font-sans font-semibold text-xs tracking-wider uppercase transition-all border border-white/20 text-center"
              >
                <span>{t('nav.agenda2030')}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
