import React from 'react';
import { useI18n } from '../i18n/index.jsx';
import { ArrowRight, Clock, User } from 'lucide-react';

/**
 * Componente modular de tarjeta de noticia con 2 estilos visuales aprobados:
 * 1. 'classic': Editorial Clásico Vertical (Imagen Superior limpia, cuerpo beige)
 * 2. 'dark-overlay': Inmersivo Oscuro de Lujo (Fotografía completa, tipografía clara)
 * 
 * NOTA: Las imágenes se mantienen 100% limpias sin ningún label ni cápsula encima.
 */
export default function NewsCard({
  article,
  onSelect,
  forcedStyle = null, // 'classic' | 'dark-overlay'
}) {
  const { t } = useI18n();

  if (!article) return null;

  const rawStyle = forcedStyle || article.cardStyle || 'classic';
  const style = rawStyle === 'dark-overlay' ? 'dark-overlay' : 'classic';

  const categoryText = t(article.category || { es: 'Comunicado Oficial', en: 'Press Release' });
  const titleText = t(article.title || { es: 'Sin título', en: 'Untitled' });
  const summaryText = t(article.summary || { es: '', en: '' });
  const dateText = article.date || '';
  const authorText = article.author || 'Consejo Global Ambiental';
  const readTimeText = article.readTime || '4 min de lectura';
  const isPublication = article.type === 'publicaciones';

  // ══════════════════════════════════════════════════════════════════
  // OPCIÓN 2 (CARD 3): INMERSIVO OSCURO DE LUJO (HERO CARD)
  // ══════════════════════════════════════════════════════════════════
  if (style === 'dark-overlay') {
    return (
      <article className="rounded-3xl bg-[#1c170e] text-[#f5efe3] border border-[#3d3422] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-end min-h-[440px] group h-full">
        {/* Imagen Inmersiva de Fondo (Limpia) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out opacity-40 group-hover:opacity-55"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141009] via-[#1c170e]/85 to-transparent" />
        </div>

        {/* Contenido en Capa Superior */}
        <div className="relative z-10 p-6 sm:p-8 space-y-4 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8bc65]">
              {categoryText}
            </span>
            <span className="text-[11px] font-mono text-[#cdd2a6]">
              {dateText}
            </span>
          </div>

          <div className="space-y-2.5 mt-auto">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug group-hover:text-[#cdd2a6] transition-colors">
              {titleText}
            </h3>

            <p className="text-[#d8ceb6]/90 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
              {summaryText}
            </p>
          </div>

          <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
            <div className="text-xs text-[#cdd2a6] font-medium flex items-center gap-1.5 truncate">
              <User className="w-3.5 h-3.5 opacity-70" />
              <span className="truncate">{authorText}</span>
            </div>

            <button
              onClick={() => onSelect(article)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20 cursor-pointer shrink-0"
            >
              <span>{isPublication ? t({ es: 'Ver documento', en: 'View' }) : t({ es: 'Leer', en: 'Read' })}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // OPCIÓN 1 (CARD 1): EDITORIAL CLÁSICO VERTICAL (PREDETERMINADO)
  // ══════════════════════════════════════════════════════════════════
  return (
    <article className="rounded-3xl bg-[#f5efe3] border border-[#d8ceb6] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full group">
      <div>
        {/* Imagen Panorámica Superior (Limpia) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2d2618]">
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Cuerpo Editorial */}
        <div className="p-6 sm:p-7 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-[#4a5a22] tracking-wider block">
              {categoryText}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#8a7e68]">
              <span>{dateText}</span>
              <span>•</span>
              <span>{readTimeText}</span>
            </div>
          </div>

          <h3 className="font-serif text-2xl text-[#2d2618] font-medium leading-snug group-hover:text-[#4a5a22] transition-colors">
            {titleText}
          </h3>

          <p className="text-[#6b6048] text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
            {summaryText}
          </p>
        </div>
      </div>

      {/* Pie de Tarjeta */}
      <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#eae4d2] flex items-center justify-between">
        <span className="text-xs text-[#8a7e68] font-medium">{authorText}</span>

        <button
          onClick={() => onSelect(article)}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4a5a22] hover:text-[#2d2618] transition-colors cursor-pointer group-hover:underline"
        >
          <span>{isPublication ? t({ es: 'Ver documento', en: 'View document' }) : t({ es: 'Leer artículo', en: 'Read article' })}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
