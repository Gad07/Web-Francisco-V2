import React from 'react';
import { useI18n } from '../i18n/index.jsx';
import { Quote, Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

/**
 * Renderizador de bloques modulares para las 4 plantillas de lectura del CGA.
 * Procesa dinámicamente cada bloque en el orden exacto configurado por el usuario:
 * - paragraph
 * - heading
 * - quote
 * - image
 * - callout
 * - keyPoints
 * - divider
 */
export default function ArticleBlocksRenderer({ blocks = [], template = 'classic' }) {
  const { t } = useI18n();

  if (!blocks || blocks.length === 0) return null;

  let paragraphCount = 0;

  return (
    <div className="space-y-8 sm:space-y-10 w-full">
      {blocks.map((block, idx) => {
        const key = block.id || `block-${idx}`;

        // ─────────────────────────────────────────────────────────────
        // 1. PÁRRAFO
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'paragraph') {
          paragraphCount++;
          const text = t(block.text || { es: '', en: '' });
          if (!text) return null;

          const isFirst = paragraphCount === 1 || block.isLead;

          return (
            <p
              key={key}
              className={`text-[#2d2618] font-light leading-[1.85] ${
                isFirst
                  ? 'text-lg sm:text-[20px] first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:font-normal first-letter:mr-3 first-letter:float-left first-letter:text-[#4a5a22] first-letter:leading-none'
                  : 'text-base sm:text-lg'
              }`}
            >
              {text}
            </p>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 2. COLUMNAS / GRID MULTICOLUMNA (2, 3 o 4 Columnas)
        // El diseño y paleta se adapta dinámicamente según la plantilla activa
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'columns') {
          const count = Number(block.columnCount) || (block.columns ? block.columns.length : 3);
          const cols = Array.isArray(block.columns) ? block.columns : [];
          if (cols.length === 0) return null;

          let gridClass = 'grid grid-cols-1 md:grid-cols-3 gap-6';
          if (count === 2) gridClass = 'grid grid-cols-1 md:grid-cols-2 gap-8';
          else if (count === 4) gridClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5';

          return (
            <div key={key} className={`my-10 sm:my-14 ${gridClass} w-full`}>
              {cols.map((col, cIdx) => {
                const colKey = col.id || `col-${cIdx}`;
                const colTitle = t(col.title || { es: '', en: '' });
                const colText = t(col.text || { es: '', en: '' });
                const colBadge = t(col.badge || { es: '', en: '' });
                const colCaption = t(col.caption || { es: '', en: '' });
                const colType = col.type || 'text';

                // ── DISEÑO PARA PLANTILLA 2: PORTADA INMERSIVA ──
                if (template === 'immersive') {
                  return (
                    <div
                      key={colKey}
                      className="p-6 sm:p-7 rounded-3xl bg-[#1c1710] border border-[#3d3422] shadow-xl text-[#f5efe3] flex flex-col justify-between space-y-4 hover:border-[#a8bc65]/50 transition-all group"
                    >
                      <div className="space-y-3">
                        {colBadge && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8bc65] font-bold bg-[#a8bc65]/15 px-2.5 py-1 rounded-full inline-block">
                            {colBadge}
                          </span>
                        )}

                        {colType === 'stat' && col.statNumber && (
                          <div className="space-y-1">
                            <span className="font-serif text-5xl sm:text-6xl text-[#a8bc65] font-light leading-none block">
                              {col.statNumber}
                            </span>
                            {colTitle && (
                              <h4 className="text-xs uppercase font-bold tracking-widest text-[#d8ceb6] pt-1">
                                {colTitle}
                              </h4>
                            )}
                          </div>
                        )}

                        {colType === 'image' && col.image && (
                          <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/40 space-y-1">
                            <img src={col.image} alt={colCaption || ''} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                            {colCaption && (
                              <p className="text-[11px] text-[#cdd2a6] italic p-2.5 text-center font-light">
                                {colCaption}
                              </p>
                            )}
                          </div>
                        )}

                        {colType === 'quote' && (
                          <div className="border-l-2 border-[#a8bc65] pl-4 py-1 space-y-2">
                            <p className="font-serif italic text-base sm:text-lg text-white font-light leading-snug">
                              “{colText}”
                            </p>
                            {col.author && (
                              <span className="text-[11px] uppercase tracking-wider text-[#a8bc65] font-bold block">
                                — {col.author}
                              </span>
                            )}
                          </div>
                        )}

                        {(colType === 'text' || colType === 'card') && (
                          <>
                            {colTitle && (
                              <h4 className="font-serif text-xl font-light text-white leading-snug">
                                {colTitle}
                              </h4>
                            )}
                            {colText && (
                              <p className="text-sm text-[#d8ceb6] font-light leading-relaxed">
                                {colText}
                              </p>
                            )}
                          </>
                        )}

                        {colType === 'stat' && colText && (
                          <p className="text-xs text-[#d8ceb6]/90 font-light leading-relaxed pt-1">
                            {colText}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }

                // ── DISEÑO PARA PLANTILLA 3: REVISTA SPLIT ──
                if (template === 'split') {
                  return (
                    <div
                      key={colKey}
                      className="p-6 border-t-2 md:border-t-0 md:border-l-2 border-[#4a5a22]/30 flex flex-col justify-between space-y-3.5 bg-transparent group"
                    >
                      <div className="space-y-3">
                        {colBadge && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8a7e68] font-bold block">
                            {colBadge}
                          </span>
                        )}

                        {colType === 'stat' && col.statNumber && (
                          <div className="space-y-1">
                            <span className="font-serif text-5xl sm:text-6xl text-[#2d2618] font-light leading-none block">
                              {col.statNumber}
                            </span>
                            {colTitle && (
                              <h4 className="text-xs uppercase font-bold tracking-widest text-[#4a5a22] pt-1">
                                {colTitle}
                              </h4>
                            )}
                          </div>
                        )}

                        {colType === 'image' && col.image && (
                          <div className="rounded-xl overflow-hidden border border-[#d8ceb6] bg-[#2d2618]">
                            <img src={col.image} alt={colCaption || ''} className="w-full h-40 object-cover" />
                            {colCaption && (
                              <p className="text-[11px] text-[#7a6e58] italic p-2 text-center">
                                {colCaption}
                              </p>
                            )}
                          </div>
                        )}

                        {colType === 'quote' && (
                          <div className="border-l-2 border-[#4a5a22] pl-3 py-1 space-y-1">
                            <p className="font-serif italic text-base text-[#4a5a22] leading-snug">
                              “{colText}”
                            </p>
                            {col.author && (
                              <span className="text-[10px] uppercase tracking-wider text-[#8a7e68] font-semibold block">
                                — {col.author}
                              </span>
                            )}
                          </div>
                        )}

                        {(colType === 'text' || colType === 'card') && (
                          <>
                            {colTitle && (
                              <h4 className="font-serif text-xl font-normal text-[#2d2618] leading-tight">
                                {colTitle}
                              </h4>
                            )}
                            {colText && (
                              <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                                {colText}
                              </p>
                            )}
                          </>
                        )}

                        {colType === 'stat' && colText && (
                          <p className="text-xs text-[#6b6048] font-light leading-relaxed">
                            {colText}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }

                // ── DISEÑO PARA PLANTILLA 4: STORYTELLING VISUAL ──
                if (template === 'story') {
                  return (
                    <div
                      key={colKey}
                      className="p-7 rounded-3xl bg-[#f5efe3] border-2 border-[#d8ceb6] hover:border-[#4a5a22] shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 transition-all relative overflow-hidden group"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          {colBadge ? (
                            <span className="px-3 py-1 rounded-full bg-[#4a5a22] text-[#f5efe3] text-[10px] font-mono font-bold tracking-widest uppercase">
                              {colBadge}
                            </span>
                          ) : (
                            <span className="w-7 h-7 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] font-serif text-xs font-bold flex items-center justify-center">
                              0{cIdx + 1}
                            </span>
                          )}
                        </div>

                        {colType === 'stat' && col.statNumber && (
                          <div className="space-y-1.5">
                            <span className="font-serif text-5xl sm:text-6xl text-[#4a5a22] font-normal leading-none block">
                              {col.statNumber}
                            </span>
                            {colTitle && (
                              <h4 className="font-serif text-base text-[#2d2618] font-medium leading-snug">
                                {colTitle}
                              </h4>
                            )}
                          </div>
                        )}

                        {colType === 'image' && col.image && (
                          <div className="rounded-2xl overflow-hidden border border-[#d8ceb6] shadow-2xs">
                            <img src={col.image} alt={colCaption || ''} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                            {colCaption && (
                              <p className="text-[11px] text-[#7a6e58] italic p-2 text-center bg-[#eae4d2]/50">
                                {colCaption}
                              </p>
                            )}
                          </div>
                        )}

                        {colType === 'quote' && (
                          <div className="p-4 rounded-2xl bg-[#4a5a22] text-[#f5efe3] space-y-2">
                            <p className="font-serif italic text-base leading-snug">
                              “{colText}”
                            </p>
                            {col.author && (
                              <span className="text-[10px] uppercase tracking-wider text-[#cdd2a6] font-semibold block">
                                — {col.author}
                              </span>
                            )}
                          </div>
                        )}

                        {(colType === 'text' || colType === 'card') && (
                          <>
                            {colTitle && (
                              <h4 className="font-serif text-xl text-[#2d2618] font-medium leading-snug">
                                {colTitle}
                              </h4>
                            )}
                            {colText && (
                              <p className="text-sm sm:text-base text-[#3d3422] font-light leading-relaxed">
                                {colText}
                              </p>
                            )}
                          </>
                        )}

                        {colType === 'stat' && colText && (
                          <p className="text-xs sm:text-sm text-[#4a402d] font-light leading-relaxed">
                            {colText}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }

                // ── DISEÑO POR DEFECTO / PLANTILLA 1: EDITORIAL CLÁSICO ──
                return (
                  <div
                    key={colKey}
                    className="p-6 rounded-2xl bg-[#eae4d2]/70 border border-[#d8ceb6] shadow-2xs flex flex-col justify-between space-y-3.5 transition-all hover:border-[#4a5a22]/60 hover:bg-[#eae4d2] group"
                  >
                    <div className="space-y-3">
                      {colBadge && (
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a5a22] font-bold bg-[#4a5a22]/10 px-2.5 py-1 rounded-full inline-block">
                          {colBadge}
                        </span>
                      )}

                      {colType === 'stat' && col.statNumber && (
                        <div className="space-y-1">
                          <span className="font-serif text-4xl sm:text-5xl text-[#4a5a22] font-normal leading-none block">
                            {col.statNumber}
                          </span>
                          {colTitle && (
                            <h4 className="font-serif text-base text-[#2d2618] font-semibold leading-snug pt-1">
                              {colTitle}
                            </h4>
                          )}
                        </div>
                      )}

                      {colType === 'image' && col.image && (
                        <div className="rounded-xl overflow-hidden border border-[#d8ceb6] bg-[#2d2618] shadow-xs">
                          <img src={col.image} alt={colCaption || ''} className="w-full h-40 object-cover" />
                          {colCaption && (
                            <p className="text-[11px] text-[#7a6e58] italic p-2 text-center font-light">
                              {colCaption}
                            </p>
                          )}
                        </div>
                      )}

                      {colType === 'quote' && (
                        <div className="p-4 rounded-xl bg-[#f5efe3] border-l-2 border-[#4a5a22] shadow-2xs space-y-1">
                          <p className="font-serif italic text-sm text-[#2d2618] leading-snug">
                            “{colText}”
                          </p>
                          {col.author && (
                            <span className="text-[10px] uppercase tracking-wider text-[#4a5a22] font-bold block pt-1">
                              — {col.author}
                            </span>
                          )}
                        </div>
                      )}

                      {(colType === 'text' || colType === 'card') && (
                        <>
                          {colTitle && (
                            <h4 className="font-serif text-lg font-normal text-[#2d2618] leading-snug">
                              {colTitle}
                            </h4>
                          )}
                          {colText && (
                            <p className="text-sm text-[#4a402d] font-light leading-relaxed">
                              {colText}
                            </p>
                          )}
                        </>
                      )}

                      {colType === 'stat' && colText && (
                        <p className="text-xs text-[#5c523e] font-light leading-relaxed">
                          {colText}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 2. SUBTÍTULO / SECCIÓN
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'heading') {
          const headingText = t(block.text || { es: '', en: '' });
          if (!headingText) return null;

          return (
            <div key={key} className="pt-4 sm:pt-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#4a5a22]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a5a22] font-bold">
                  {t({ es: 'Sección', en: 'Section' })}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-normal leading-snug">
                {headingText}
              </h2>
            </div>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 3. CITA DESTACADA / PULL QUOTE
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'quote') {
          const quoteText = t(block.text || { es: '', en: '' });
          const author = block.author || '';
          if (!quoteText) return null;

          if (template === 'immersive') {
            return (
              <div
                key={key}
                className="my-8 sm:my-10 p-8 sm:p-10 rounded-3xl bg-[#1f1a12] text-[#f5efe3] shadow-lg border border-[#3d3422] relative overflow-hidden"
              >
                <div className="font-serif text-5xl text-[#a8bc65]/30 leading-none mb-2">“</div>
                <blockquote className="font-serif text-xl sm:text-2xl text-white italic font-light leading-snug">
                  {quoteText}
                </blockquote>
                {author && (
                  <p className="mt-4 text-xs uppercase font-bold tracking-widest text-[#a8bc65]">
                    — {author}
                  </p>
                )}
              </div>
            );
          }

          if (template === 'story') {
            return (
              <div
                key={key}
                className="my-10 -mx-4 sm:-mx-8 p-10 sm:p-14 bg-[#4a5a22] text-[#f5efe3] rounded-3xl shadow-md space-y-4"
              >
                <span className="block font-serif text-6xl text-[#cdd2a6]/40 leading-none">“</span>
                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-snug -mt-6">
                  {quoteText}
                </blockquote>
                {author && (
                  <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#cdd2a6]">
                    — {author}
                  </p>
                )}
              </div>
            );
          }

          // Plantilla Classic y Split
          return (
            <figure
              key={key}
              className="my-8 sm:my-10 p-8 sm:p-10 rounded-3xl bg-[#eae4d2]/80 border-y-2 border-x border-[#4a5a22] shadow-xs text-center relative overflow-hidden"
            >
              <div className="font-serif text-5xl text-[#4a5a22]/30 leading-none mb-2">“</div>
              <blockquote className="font-serif text-xl sm:text-2xl text-[#2d2618] italic font-light leading-snug max-w-2xl mx-auto">
                {quoteText}
              </blockquote>
              {author && (
                <figcaption className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#4a5a22]">
                  — {author}
                </figcaption>
              )}
            </figure>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 4. IMAGEN CON PIE DE FOTO
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'image') {
          if (!block.url) return null;
          const caption = t(block.caption || { es: '', en: '' });

          return (
            <figure key={key} className="my-8 sm:my-10 space-y-2.5">
              <div className="rounded-3xl overflow-hidden bg-[#2d2618] border border-[#d8ceb6] shadow-md">
                <img
                  src={block.url}
                  alt={caption || ''}
                  className="w-full max-h-[520px] object-cover"
                  loading="lazy"
                />
              </div>
              {caption && (
                <figcaption className="text-center text-xs font-sans text-[#7a6e58] font-light italic px-4">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 5. CAJA DESTACADA / CALLOUT
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'callout') {
          const title = t(block.title || { es: '', en: '' });
          const text = t(block.text || { es: '', en: '' });
          const style = block.style || 'beige';

          let bgClasses = 'bg-[#eae4d2]/80 text-[#2d2618] border-[#4a5a22]';
          if (style === 'moss') {
            bgClasses = 'bg-[#4a5a22] text-[#f5efe3] border-[#384519]';
          } else if (style === 'dark') {
            bgClasses = 'bg-[#1f1a12] text-[#f5efe3] border-[#3d3422]';
          }

          return (
            <aside
              key={key}
              className={`my-8 p-6 sm:p-8 rounded-3xl border-l-4 shadow-xs space-y-2 ${bgClasses}`}
            >
              {title && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 opacity-80" />
                  <h3 className="font-serif text-lg font-medium leading-snug">{title}</h3>
                </div>
              )}
              {text && (
                <p className="text-sm sm:text-base font-light leading-relaxed opacity-95">
                  {text}
                </p>
              )}
            </aside>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 6. PUNTOS CLAVE / HALLAZGOS
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'keyPoints') {
          const title = t(block.title || { es: 'Puntos Clave y Alcance Territorial', en: 'Key Points & Territorial Scope' });
          const items = Array.isArray(block.items) ? block.items : [];
          if (items.length === 0) return null;

          return (
            <section
              key={key}
              className="my-8 sm:my-10 p-7 sm:p-9 rounded-3xl bg-[#eae4d2]/70 border border-[#d8ceb6] shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest font-bold text-[#4a5a22]">
                <CheckCircle2 className="w-4 h-4 text-[#4a5a22]" />
                <span>{title}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {items.map((it, itIdx) => {
                  const itText = t(it);
                  if (!itText) return null;
                  return (
                    <div
                      key={itIdx}
                      className="p-4 rounded-2xl bg-white/80 border border-[#d8ceb6] flex items-start gap-3 shadow-2xs"
                    >
                      <span className="font-serif text-base font-bold text-[#4a5a22] leading-none mt-0.5">
                        {String(itIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs sm:text-sm text-[#4a402d] font-light leading-relaxed">
                        {itText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        }

        // ─────────────────────────────────────────────────────────────
        // 7. SEPARADOR EDITORIAL
        // ─────────────────────────────────────────────────────────────
        if (block.type === 'divider') {
          return (
            <div key={key} className="py-6 flex items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[#d8ceb6]" />
              <span className="w-2 h-2 rounded-full bg-[#4a5a22]/60" />
              <span className="h-px flex-1 bg-[#d8ceb6]" />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
