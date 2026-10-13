import React from 'react';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { Link } from 'react-router-dom';

export default function Agenda2030() {
  const indicators = [
    {
      indicador: 'Alcance directo de actividades en PEX',
      valor: '6,890 personas reportadas',
      periodo: 'Entre 2023 y 2024',
      ods: 'ODS 4: Educación de calidad · ODS 11: Ciudades y comunidades sostenibles',
      nota: 'Personas participantes registradas en talleres, visitas y actividades comunitarias en el ANP.',
    },
    {
      indicador: 'Plantas de cempasúchil acopiadas',
      valor: '620 plantas',
      periodo: 'Noviembre de 2023',
      ods: 'ODS 12: Producción y consumo responsables',
      nota: 'Campaña de acopio posfestividad para evitar su desecho en vía pública y canalizar a compostaje.',
    },
    {
      indicador: 'Residuos orgánicos recolectados',
      valor: '557.08 kg',
      periodo: 'Noviembre de 2023',
      ods: 'ODS 12: Producción y consumo responsables (meta 12.5)',
      nota: 'Material vegetal pesado e ingresado a proceso de degradación biológica controlada.',
    },
    {
      indicador: 'Volumen reportado del acopio',
      valor: '44.14 m³',
      periodo: 'Noviembre de 2023',
      ods: 'ODS 12: Producción y consumo responsables',
      nota: 'Volumen volumétrico reportado de residuos orgánicos acopiados.',
    },
    {
      indicador: 'Semillas de especies endémicas recibidas',
      valor: '≈1,500 semillas de 25 especies',
      periodo: 'Entre 2023 y 2024',
      ods: 'ODS 15: Vida de ecosistemas terrestres (meta 15.1)',
      nota: 'Recepción y custodia en banco de germoplasma de especies del Eje Neovolcánico Transversal.',
    },
    {
      indicador: 'Recorridos de difusión del patrimonio biocultural',
      valor: '8 escuelas/empresas/instituciones y 6 internacionales',
      periodo: 'Entre 2023 y 2024',
      ods: 'ODS 4: Educación de calidad (meta 4.7)',
      nota: 'Visitas guiadas de divulgación ambiental, conservación lacustre e historia biocultural.',
    },
  ];

  const odsLinks = [
    {
      num: 'ODS 4',
      title: 'Educación de calidad',
      meta: 'Meta 4.7',
      desc: 'Talleres, conferencias, visitas y divulgación destinados a fortalecer conocimientos sobre sostenibilidad.',
    },
    {
      num: 'ODS 11',
      title: 'Ciudades y comunidades sostenibles',
      meta: 'Meta 11.7',
      desc: 'Actividades de apropiación y uso comunitario de espacios públicos verdes.',
    },
    {
      num: 'ODS 12',
      title: 'Producción y consumo responsables',
      meta: 'Meta 12.5',
      desc: 'Acopio de cempasúchil y recuperación de material orgánico para evitar su disposición inmediata como basura.',
    },
    {
      num: 'ODS 15',
      title: 'Vida de ecosistemas terrestres',
      meta: 'Meta 15.1',
      desc: 'Recepción de semillas endémicas y educación sobre conservación del patrimonio biológico.',
    },
    {
      num: 'ODS 2',
      title: 'Hambre cero',
      meta: 'Meta 2.4',
      desc: 'Vinculación temática con productores y prácticas productivas sostenibles; sin evidencia de mejora de seguridad alimentaria medida.',
    },
    {
      num: 'ODS 6',
      title: 'Agua limpia y saneamiento',
      meta: 'Meta 6.6',
      desc: 'Pertinente para el trabajo en ecosistemas lacustres; requiere evidencia específica de conservación o restauración de ecosistemas relacionados con agua.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618]">
      <PageHero
        titleWhite="Resultados, impacto y"
        titleGreen="vinculación con ODS"
        description="Los resultados institucionales se presentan con indicación de periodo, territorio, tipo de actividad y fuente documental verificable."
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop&auto=format"
      />

      {/* =================================================================
          2.3 RESULTADOS E IMPACTO TERRITORIAL
          ================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-4 mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
            Transparencia y Evidencia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2618] font-light leading-[1.12]">
            Resultados documentados <br />
            <span className="italic text-[#4a5a22]">en territorio (Xochimilco 2023–2024).</span>
          </h2>
          <p className="text-[#6b6048] font-sans text-base sm:text-lg leading-relaxed font-light">
            El expediente de Xochimilco de 2023-2024 constituye una fuente de referencia sobre educación, conservación y participación comunitaria bajo la conducción de la Presidencia y la Secretaría Ejecutiva del CGA. Las cifras aquí consignadas corresponden al periodo descrito y no representan un acumulado institucional de 2020 a 2026.
          </p>
        </div>

        {/* Tabla de Indicadores Reportados */}
        <div className="overflow-x-auto rounded-3xl border border-[#d8ceb6] bg-[#ece4d0]/60 shadow-sm mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d8ceb6] bg-[#dfd7c2]/60 text-xs uppercase tracking-wider text-[#3a3020]">
                <th className="py-4 px-6 font-semibold">Indicador reportado</th>
                <th className="py-4 px-6 font-semibold">Valor / Periodo</th>
                <th className="py-4 px-6 font-semibold">ODS Relacionado</th>
                <th className="py-4 px-6 font-semibold">Descripción Documental</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8ceb6]/60 text-sm font-light text-[#5c523e]">
              {indicators.map((ind, idx) => (
                <tr key={idx} className="hover:bg-[#f5efe3]/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#2d2618]">
                    {ind.indicador}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#4a5a22] block">{ind.valor}</span>
                    <span className="text-xs text-[#7a6e58]">{ind.periodo}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-mono px-2 py-1 rounded bg-[#4a5a22]/10 text-[#3a4a18]">
                      {ind.ods}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#6b6048] max-w-xs">
                    {ind.nota}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Criterio Editorial de Publicación */}
        <div className="p-6 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] text-xs text-[#7a6e58] font-light leading-relaxed mb-16">
          <strong className="text-[#2d2618] block mb-1 uppercase tracking-wider text-[11px]">
            Criterios de Rigor Editorial:
          </strong>
          No confundir acopio con reciclaje acreditado, semillas recibidas con plantas establecidas, personas participantes con beneficiarios únicos ni talleres con cambios de comportamiento medidos. La alineación con ODS indica correspondencia temática con metas de Naciones Unidas; no equivale a una certificación ni a medición oficial de avance nacional.
        </div>

        {/* Cómo se vincula la acción territorial con los ODS */}
        <div className="space-y-6">
          <div className="border-b border-[#d8ceb6] pb-3">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
              Cómo se vincula la acción territorial con los <span className="italic text-[#4a5a22]">ODS</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odsLinks.map((ods, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#ece4d0]/60 border border-[#d8ceb6] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-xl font-bold text-[#4a5a22]">
                      {ods.num}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#4a5a22]/10 text-[#3a4a18] font-semibold">
                      {ods.meta}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#2d2618] mb-2">
                    {ods.title}
                  </h4>
                  <p className="text-xs text-[#5c523e] font-light leading-relaxed">
                    {ods.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterNav />
    </div>
  );
}
