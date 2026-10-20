import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/index.jsx';
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Clock,
  User,
  BookOpen,
  Sparkles,
  FileText,
  Download,
  Bookmark,
  ExternalLink,
  Layers,
  Award,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleBlocksRenderer from './ArticleBlocksRenderer.jsx';
import { normalizeArticleBlocks } from '../utils/articleBlocks.js';

// Mapa de clases de tamaño para el elemento PNG
const PNG_SIZE_CLASSES = {
  sm: 'w-[180px] sm:w-[240px] md:w-[300px] max-h-[70%]',
  md: 'w-[240px] sm:w-[340px] md:w-[440px] max-h-[85%]',
  lg: 'w-[300px] sm:w-[440px] md:w-[580px] max-h-[92%]',
  xl: 'w-[360px] sm:w-[540px] md:w-[700px] max-h-[100%]',
};

/**
 * Componente modular con 4 Plantillas Editoriales de Lectura Completa:
 * 1. 'classic': Editorial Clásico Tradicional (Hero beige cálido + lectura centrada)
 * 2. 'immersive': Portada Cinematográfica Inmersiva (Hero nocturno a pantalla completa)
 * 3. 'split': Revista Split (Hero 50/50 texto + foto a altura completa)
 * 4. 'story': Storytelling Visual (foto a todo el ancho, cita gigante verde, cifras grandes)
 */
const VALID_TEMPLATES = ['classic', 'immersive', 'split', 'story'];
const resolveTemplate = (layout) => {
  if (layout === 'academic') return 'split';
  return VALID_TEMPLATES.includes(layout) ? layout : 'classic';
};
export default function ArticleReader({
  article,
  onBack,
  relatedArticles = [],
  onSelectArticle,
}) {
  const { t } = useI18n();
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(() => resolveTemplate(article?.detailLayout));

  useEffect(() => {
    setActiveTemplate(resolveTemplate(article?.detailLayout));
  }, [article?.id, article?.detailLayout]);

  if (!article) return null;

  const categoryText = t(article.category || { es: 'Comunicado Oficial', en: 'Official Release' });
  const titleText = t(article.title || { es: 'Sin título', en: 'Untitled' });
  const summaryText = t(article.summary || { es: '', en: '' });
  const quoteText = article.quote ? t(article.quote) : '';
  const dateText = article.date || '';
  const authorText = article.author || 'Consejo Global Ambiental';
  const authorRoleText = t(article.authorRole || { es: 'Dirección General CGA', en: 'CGA Executive Directorate' });
  const readTimeText = article.readTime || '5 min de lectura';
  const paragraphs = article.paragraphs || [];
  const keyPoints = article.keyPoints || [];
  const isPublication = article.type === 'publicaciones';
  const blocks = article.blocks && article.blocks.length > 0
    ? article.blocks
    : normalizeArticleBlocks(article);

  // Configuración de Hero Designer
  const heroStyle = article.heroStyle || 'solid-beige';
  const heroPngPosition = article.heroPngPosition || 'right';
  const heroPngSize = article.heroPngSize || 'md';
  const heroPng = article.heroPng || '/imagenes/Rama 2.svg';
  const heroPngOpacity = article.heroPngOpacity !== undefined ? article.heroPngOpacity : 0.85;
  const heroPngHasBeigeOverlay = article.heroPngHasBeigeOverlay || false;
  const heroPngOverlayOpacity = article.heroPngOverlayOpacity !== undefined ? article.heroPngOverlayOpacity : 0.25;
  const heroBgImage = article.heroBgImage || article.image;
  const heroBgOpacity = article.heroBgOpacity !== undefined ? article.heroBgOpacity : 0.3;
  const heroBgOverlayOpacity = article.heroBgOverlayOpacity !== undefined ? article.heroBgOverlayOpacity : 0.9;

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/comunicacion?articulo=${article.id}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${titleText} - ${window.location.origin}/comunicacion?articulo=${article.id}`
  )}`;

  return (
    <div className="w-full">
      {/* ══════════════════════════════════════════════════════════════════
          PLANTILLA 2: PORTADA CINEMATOGRÁFICA INMERSIVA ('immersive')
          ══════════════════════════════════════════════════════════════════ */}
      {activeTemplate === 'immersive' && (
        <motion.div
          key="immersive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-[#f5efe3]"
        >
          {/* Hero Nocturno Inmersivo a Pantalla Completa Elevado */}
          <section
            data-nav-theme="dark"
            className="relative min-h-[85vh] flex items-end bg-[#0a0d08] text-[#f5efe3] overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24"
          >
            {/* Fotografía de fondo con alta definición y gradientes multicapa */}
            <div className="absolute inset-0">
              <img
                src={article.image}
                alt=""
                className="w-full h-full object-cover opacity-75 filter brightness-[0.78] contrast-[1.12] scale-105"
              />
              {/* Degradado superior para contraste con navbar */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
              {/* Degradado inferior cinematográfico profundo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/90 via-45% to-transparent" />
              {/* Brillo ambiental esmeralda sutil */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,188,101,0.16),transparent_65%)] pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 space-y-7 w-full">
              {/* Título Monumental */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] tracking-tight drop-shadow-md">
                {titleText}
              </h1>

              {/* Metadatos con chips translúcidos */}
              <div className="flex items-center gap-3 flex-wrap text-xs text-[#d8ceb6] font-mono">
                {categoryText && (
                  <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-xl border border-[#a8bc65]/40 text-[#d8eb96] font-bold uppercase tracking-wider text-[11px] backdrop-blur-sm">
                    {categoryText}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Calendar className="w-3.5 h-3.5 text-[#a8bc65]" />
                  <span>{dateText}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-[#a8bc65]" />
                  <span>{readTimeText}</span>
                </span>
              </div>

              {/* Tarjeta Unificada: Extracto Editorial + Ficha de Autor & Compartir */}
              <div className="relative rounded-2xl bg-gradient-to-b from-black/75 to-black/60 border border-white/15 backdrop-blur-md shadow-2xl overflow-hidden divide-y divide-white/10 max-w-4xl">
                {summaryText && (
                  <div className="p-6 sm:p-7 space-y-2 border-l-4 border-l-[#a8bc65]">
                    <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#a8bc65] font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#a8bc65]" />
                      <span>{t({ es: 'Extracto Editorial', en: 'Editorial Excerpt' })}</span>
                    </div>
                    <p className="text-base sm:text-xl text-[#f5efe3] font-light leading-relaxed font-serif italic">
                      "{summaryText}"
                    </p>
                  </div>
                )}

                <div className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4a5a22] to-[#2f3b14] text-white font-serif font-bold text-base flex items-center justify-center border-2 border-[#a8bc65]/50 shadow-md">
                      {authorText.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-white block text-sm sm:text-base leading-snug">
                        {authorText}
                      </span>
                      <span className="text-[11px] text-[#cdd2a6]/90 block">
                        {authorRoleText}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#a8bc65]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? t({ es: 'Enlace Copiado', en: 'Link Copied' }) : t({ es: 'Compartir', en: 'Share' })}</span>
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cuerpo Inmersivo */}
          <main className="max-w-4xl mx-auto px-6 sm:px-10 py-14 sm:py-20 space-y-12">
            <ArticleBlocksRenderer blocks={blocks} template="immersive" />

            {/* Barra de Acciones */}
            <div className="pt-8 border-t border-[#d8ceb6] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider hover:bg-[#384519] transition-all shadow-sm cursor-pointer"
              >
                &larr; {t({ es: 'Volver a Noticias', en: 'Back to News' })}
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>{t({ es: 'WhatsApp', en: 'WhatsApp' })}</span>
              </a>
            </div>
          </main>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PLANTILLA 3: REVISTA SPLIT ('split')
          Hero dividido 50/50: texto beige a la izquierda, foto a altura completa a la derecha
          ══════════════════════════════════════════════════════════════════ */}
      {activeTemplate === 'split' && (
        <motion.div
          key="split"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-[#f5efe3]"
        >
          {/* Hero Split 50/50 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[80vh] border-b border-[#d8ceb6] pt-20 lg:pt-0">
            {/* Columna de texto */}
            <div className="order-2 lg:order-1 flex items-center px-6 sm:px-10 lg:px-16 py-14 lg:py-24 bg-[#f5efe3]">
              <div className="max-w-xl space-y-7">
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4a5a22] hover:text-[#2d2618] transition-colors cursor-pointer group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>{t({ es: 'Volver a Comunicación', en: 'Back to Communication' })}</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#4a5a22]" />
                  <span className="text-[11px] uppercase font-semibold tracking-[0.25em] text-[#4a5a22]">
                    {categoryText}
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-[#2d2618] font-normal leading-[1.08] tracking-tight">
                  {titleText}
                </h1>

                {summaryText && (
                  <p className="text-base sm:text-lg text-[#5c523e] font-light leading-relaxed">
                    {summaryText}
                  </p>
                )}

                <div className="pt-6 border-t border-[#d8ceb6] grid grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-widest text-[#8a7e68]">
                      {t({ es: 'Autor', en: 'Author' })}
                    </span>
                    <span className="block font-semibold text-[#2d2618] leading-snug">{authorText}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-widest text-[#8a7e68]">
                      {t({ es: 'Fecha', en: 'Date' })}
                    </span>
                    <span className="block font-semibold text-[#2d2618]">{dateText}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-widest text-[#8a7e68]">
                      {t({ es: 'Lectura', en: 'Reading' })}
                    </span>
                    <span className="block font-semibold text-[#2d2618]">{readTimeText}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna de foto a altura completa */}
            <div className="order-1 lg:order-2 relative w-full h-72 sm:h-96 lg:h-auto min-h-[320px] lg:min-h-full overflow-hidden bg-[#2d2618] flex lg:self-stretch">
              <img
                src={article.image}
                alt=""
                className="w-full h-full lg:absolute lg:inset-0 lg:w-full lg:h-full object-cover"
              />
            </div>
          </section>

          {/* Lectura limpia centrada */}
          <main className="max-w-3xl mx-auto px-6 sm:px-10 py-14 sm:py-20 space-y-12">
            <ArticleBlocksRenderer blocks={blocks} template="split" />

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider hover:bg-[#384519] transition-all cursor-pointer"
              >
                &larr; {t({ es: 'Volver a Noticias', en: 'Back to News' })}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 rounded-full border border-[#d8ceb6] bg-white/70 hover:bg-white text-xs font-semibold text-[#2d2618] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? t({ es: 'Copiado', en: 'Copied' }) : t({ es: 'Copiar enlace', en: 'Copy link' })}</span>
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </main>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PLANTILLA 4: STORYTELLING VISUAL ('story')
          Foto a todo el ancho entre bloques de texto, cita gigante en verde
          y puntos clave como cifras grandes
          ══════════════════════════════════════════════════════════════════ */}
      {activeTemplate === 'story' && (
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-[#f5efe3]"
        >
          {/* Apertura tipográfica */}
          <header className="max-w-4xl mx-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4a5a22] hover:text-[#2d2618] transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>{t({ es: 'Volver a Comunicación', en: 'Back to Communication' })}</span>
              </button>
            </div>
            <span className="text-[11px] uppercase font-semibold tracking-[0.3em] text-[#4a5a22]">
              {categoryText}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2d2618] font-normal leading-[1.1] tracking-tight">
              {titleText}
            </h1>
            {summaryText && (
              <p className="text-base sm:text-lg text-[#5c523e] font-light leading-relaxed max-w-2xl mx-auto">
                {summaryText}
              </p>
            )}
            <div className="flex items-center justify-center gap-3 text-xs text-[#7a6e58] pt-2">
              <span className="font-semibold text-[#2d2618]">{authorText}</span>
              <span className="w-1 h-1 rounded-full bg-[#8a7e68]" />
              <span>{dateText}</span>
              <span className="w-1 h-1 rounded-full bg-[#8a7e68]" />
              <span>{readTimeText}</span>
            </div>
          </header>

          {/* Foto a todo el ancho */}
          {article.image && (
            <div className="w-full h-[50vh] sm:h-[70vh] overflow-hidden bg-[#2d2618]">
              <img src={article.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Cuerpo Narrativo Modular */}
          <section className="max-w-4xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
            <ArticleBlocksRenderer blocks={blocks} template="story" />
          </section>

          {/* Acciones */}
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider hover:bg-[#384519] transition-all cursor-pointer"
            >
              &larr; {t({ es: 'Volver a Noticias', en: 'Back to News' })}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 rounded-full border border-[#d8ceb6] bg-white/70 hover:bg-white text-xs font-semibold text-[#2d2618] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? t({ es: 'Copiado', en: 'Copied' }) : t({ es: 'Copiar enlace', en: 'Copy link' })}</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PLANTILLA 1: EDITORIAL CLÁSICO TRADICIONAL ('classic')
          ══════════════════════════════════════════════════════════════════ */}
      {activeTemplate === 'classic' && (
        <motion.div
          key="classic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {/* Hero Editorial Beige Configurable */}
          <div className="relative pt-32 pb-14 sm:pt-40 sm:pb-18 px-6 sm:px-10 md:px-16 bg-[#f5efe3] text-[#2d2618] overflow-hidden border-b border-[#d8ceb6]">
            {/* Opción Hero Image */}
            {heroStyle === 'image-bg' && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-25"
                  style={{ backgroundImage: `url(${heroBgImage})` }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#f5efe3]/90 to-[#f5efe3]" />
              </>
            )}

            {/* Opción Hero PNG */}
            {heroStyle === 'png-element' && (
              <div
                aria-hidden
                className={`pointer-events-none absolute bottom-0 select-none z-0 transition-all ${
                  PNG_SIZE_CLASSES[heroPngSize] || PNG_SIZE_CLASSES.md
                } ${heroPngPosition === 'left' ? 'left-0' : 'right-0'}`}
                style={{ opacity: heroPngOpacity }}
              >
                <img src={heroPng} alt="" className="w-full h-auto object-contain" />
              </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4a5a22] hover:text-[#2d2618] transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>{t({ es: 'Volver a Comunicación', en: 'Back to Communication' })}</span>
              </button>

              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#4a5a22] block">
                  {categoryText}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#2d2618] font-normal leading-[1.16] tracking-tight">
                  {titleText}
                </h1>
              </div>

              {summaryText && (
                <p className="text-base sm:text-lg text-[#5c523e] font-light leading-relaxed border-l-2 border-[#4a5a22] pl-4 sm:pl-5">
                  {summaryText}
                </p>
              )}

              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-[#6b6048]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4a5a22] text-[#f5efe3] font-serif font-bold text-base flex items-center justify-center border border-[#d8ceb6] shadow-sm">
                    {authorText.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-[#2d2618] block text-sm">{authorText}</span>
                    <span className="text-[11px] text-[#5c523e]">{authorRoleText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#7a6e58]">
                  <span>{dateText}</span>
                  <span>•</span>
                  <span>{readTimeText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cuerpo Central Clásico */}
          <main className="max-w-4xl mx-auto px-6 sm:px-10 py-12 sm:py-16 space-y-12">
            {/* Fotografía principal limpia */}
            {article.image && (
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#d8ceb6] bg-[#2d2618]">
                <img
                  src={article.image}
                  alt=""
                  className="w-full max-h-[520px] object-cover"
                />
              </div>
            )}

            <ArticleBlocksRenderer blocks={blocks} template="classic" />

            {/* Barra de Acciones */}
            <div className="p-6 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onBack}
                  className="px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  &larr; {t({ es: 'Volver a Artículos', en: 'Back to Articles' })}
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-full bg-[#f5efe3] border border-[#d8ceb6] hover:bg-white text-xs font-semibold text-[#2d2618] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4a5a22]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? t({ es: '¡Enlace copiado!', en: 'Link copied!' }) : t({ es: 'Copiar enlace', en: 'Copy link' })}</span>
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>{t({ es: 'Compartir en WhatsApp', en: 'Share on WhatsApp' })}</span>
              </a>
            </div>

            {/* Ficha de Autor */}
            <div className="p-8 rounded-3xl bg-[#241f16] text-[#f5efe3] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-md border border-[#3d3422]">
              <div className="w-16 h-16 rounded-2xl bg-[#4a5a22] flex items-center justify-center font-serif text-2xl font-bold text-white shrink-0 border border-white/20 shadow-inner">
                {authorText.charAt(0)}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-serif text-xl text-white font-medium">{authorText}</h4>
                  <span className="text-xs uppercase font-semibold text-[#cdd2a6]">
                    {t({ es: '· Autor Oficial', en: '· Official Author' })}
                  </span>
                </div>
                <p className="text-xs text-[#cdd2a6] font-light">{authorRoleText}</p>
                <p className="text-xs text-[#d8ceb6]/80 font-light leading-relaxed pt-1">
                  {t({
                    es: 'Miembro del cuerpo directivo y de investigación del Consejo Global Ambiental. Para consultas de prensa o derechos editoriales, contacta a la Secretaría Ejecutiva.',
                    en: 'Member of the governing and research board of the Global Environmental Council. For press or editorial rights enquiries, contact the Executive Secretariat.',
                  })}
                </p>
              </div>
            </div>
          </main>
        </motion.div>
      )}

      {/* ─── SECCIÓN DE ARTÍCULOS RELACIONADOS (COMÚN A LAS 3 PLANTILLAS) ─── */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-16 pt-8 border-t border-[#d8ceb6] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
              {t({ es: 'Otras lecturas y comunicados', en: 'Related stories and releases' })}
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-semibold uppercase tracking-wider text-[#4a5a22] hover:underline cursor-pointer"
            >
              {t({ es: 'Ver todo el catálogo', en: 'View full archive' })} &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="cursor-pointer rounded-2xl bg-[#eae4d2]/70 border border-[#d8ceb6] hover:border-[#4a5a22] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#2d2618]">
                  <img
                    src={rel.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-semibold text-[#4a5a22] tracking-wider block">
                      {t(rel.category)}
                    </span>
                    <h4 className="font-serif text-base text-[#2d2618] font-medium group-hover:text-[#4a5a22] transition-colors line-clamp-2">
                      {t(rel.title)}
                    </h4>
                  </div>
                  <div className="pt-3 border-t border-[#d8ceb6]/60 flex items-center justify-between text-[11px] text-[#7a6e58]">
                    <span>{rel.date}</span>
                    <span className="font-semibold text-[#4a5a22] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
