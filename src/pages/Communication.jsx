import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import Reveal from '../components/Reveal.jsx';
import NewsCard from '../components/NewsCard.jsx';
import ArticleReader from '../components/ArticleReader.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useArticles } from '../context/ArticlesContext.jsx';
import { motion } from 'framer-motion';

export default function Communication() {
  const { t } = useI18n();
  const { id: urlParamId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { articles } = useArticles();

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Sincronizar artículo seleccionado con URL param o query param
  useEffect(() => {
    const queryId = searchParams.get('articulo') || searchParams.get('id');
    const targetId = urlParamId || queryId;

    if (targetId) {
      const match = articles.find(
        (a) => a.id === targetId || a.aliasId === targetId
      );
      if (match) {
        setSelectedArticleId(match.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedArticleId(null);
    }
  }, [urlParamId, searchParams, articles]);

  const activeArticle = articles.find((a) => a.id === selectedArticleId);
  const featuredStory = articles[0] || null;
  const catalogArticles = articles.length > 1 ? articles.slice(1) : articles;

  const filters = [
    { id: 'all', label: { es: 'Todo', en: 'All' } },
    { id: 'noticias', label: { es: 'Noticias', en: 'News' } },
    { id: 'eventos', label: { es: 'Eventos', en: 'Events' } },
    { id: 'opinion', label: { es: 'Opinión', en: 'Opinion' } },
    { id: 'dialogos', label: { es: 'Diálogos', en: 'Dialogues' } },
    { id: 'publicaciones', label: { es: 'Publicaciones', en: 'Publications' } },
  ];

  const filtered = activeFilter === 'all'
    ? catalogArticles
    : catalogArticles.filter((a) => a.type === activeFilter);

  const handleSelectArticle = (article) => {
    setSelectedArticleId(article.id);
    setSearchParams({ articulo: article.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedArticleId(null);
    setSearchParams({});
    if (urlParamId) {
      navigate('/comunicacion');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Artículos relacionados
  const relatedArticles = activeArticle
    ? articles.filter((a) => a.id !== activeArticle.id).slice(0, 3)
    : [];

  return (
    <div className="w-full min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        {/* ══════════════════════════════════════════════════════════════════
            VISTA A: PÁGINA DE DETALLE CON 3 PLANTILLAS DE LECTURA
            ══════════════════════════════════════════════════════════════════ */}
        {activeArticle ? (
          <ArticleReader
            article={activeArticle}
            onBack={handleBackToCatalog}
            relatedArticles={relatedArticles}
            onSelectArticle={handleSelectArticle}
          />
        ) : (
          /* ══════════════════════════════════════════════════════════════════
              VISTA B: CATÁLOGO PRINCIPAL DE COMUNICACIÓN Y PRENSA
              ══════════════════════════════════════════════════════════════════ */
          <>
            <PageHero
              titleWhite={{ es: 'Comunicación, Medios &', en: 'Communication, Media &' }}
              titleGreen={{ es: 'Publicaciones Oficiales', en: 'Official Publications' }}
              description={{
                es: 'Difusión científica de alto impacto, posicionamientos editoriales, comunicados oficiales, producción multimedia y la memoria viva del Consejo Global Ambiental.',
                en: 'High-impact scientific dissemination, editorial essays, official press releases, multimedia productions and the living archive of the Global Environmental Council.',
              }}
              bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop&auto=format"
            />

            <main className="py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-20 max-w-7xl mx-auto space-y-16">
              {/* ARTÍCULO DE PORTADA / LEAD FEATURED STORY */}
              {featuredStory && activeFilter === 'all' && (
                <Reveal>
                  <section className="relative rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      {/* IMAGEN DE PORTADA */}
                      <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] overflow-hidden bg-[#2d2618]">
                        <img
                          src={featuredStory.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* CONTENIDO NARRATIVO */}
                      <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#4a5a22]">
                            {featuredStory.category?.es || featuredStory.category}
                          </span>

                          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#4a5a22] font-light leading-[1.18] tracking-tight">
                            {featuredStory.title?.es || featuredStory.title}
                          </h2>

                          <p className="text-[#6b6048] font-light text-sm sm:text-base leading-relaxed">
                            {featuredStory.summary?.es || featuredStory.summary}
                          </p>

                          <p className="text-xs font-sans text-[#8a7e68] font-medium tracking-wide">
                            {featuredStory.date}
                          </p>
                        </div>

                        <div className="pt-6 border-t border-[#d8ceb6]/60 flex items-center justify-between">
                          <div className="text-xs text-[#8a7e68]">
                            <span className="font-semibold text-[#2d2618] block">{featuredStory.author}</span>
                            <span>{t({ es: 'Publicación Oficial CGA', en: 'Official CGA Release' })}</span>
                          </div>

                          <button
                            onClick={() => handleSelectArticle(featuredStory)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                          >
                            <span>{t({ es: 'Leer Artículo Completo', en: 'Read Full Story' })}</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </Reveal>
              )}

              {/* BARRA DE FILTROS CATEGORIALES (SIEMPRE VISIBLE) */}
              <section className="space-y-4 max-w-7xl mx-auto w-full">
                <div className="max-w-4xl mx-auto w-full">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs">
                    {filters.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`w-full py-2.5 px-2 rounded-xl text-xs sm:text-sm font-sans font-medium text-center transition-all cursor-pointer ${
                          activeFilter === f.id
                            ? 'bg-[#4a5a22] text-[#f5efe3] shadow-md font-semibold'
                            : 'text-[#6b6048] hover:text-[#2d2618] hover:bg-[#f5efe3]/80'
                        }`}
                      >
                        {t(f.label)}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* GRILLA EDITORIAL O ESTADO VACÍO */}
              {filtered.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {filtered.map((item, idx) => (
                    <Reveal key={item.id} delay={idx * 0.04}>
                      <NewsCard
                        article={item}
                        onSelect={handleSelectArticle}
                        forcedStyle="classic"
                      />
                    </Reveal>
                  ))}
                </section>
              ) : (
                <div className="text-center py-20 px-6 rounded-3xl bg-[#eae4d2]/60 border border-[#d8ceb6] max-w-2xl mx-auto space-y-4 my-8">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                    {t({ es: 'Sala de Comunicación Oficial', en: 'Official Press Room' })}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                    {t({ es: 'Próximamente Noticias y Comunicados', en: 'Upcoming News & Press Releases' })}
                  </h3>
                  <p className="text-sm text-[#6b6048] font-light leading-relaxed">
                    {t({
                      es: 'Actualmente no hay publicaciones en esta sección. Los pronunciamientos oficiales serán emitidos a través de este canal.',
                      en: 'There are currently no publications in this section. Official releases will be published through this channel.',
                    })}
                  </p>
                </div>
              )}

            </main>
          </>
        )}
      </div>

      <FooterNav />
    </div>
  );
}
