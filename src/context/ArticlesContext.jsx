import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ARTICLES, getStoredArticles, saveStoredArticles } from '../data/articlesData.js';
import { fetchAllDbData, saveDbCollection } from '../utils/api.js';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState(getStoredArticles);

  // Sincronización inicial con base de datos MySQL en Hostinger
  useEffect(() => {
    let isMounted = true;
    fetchAllDbData().then((dbData) => {
      if (!isMounted || !dbData || !dbData.success) return;
      if (Array.isArray(dbData.articles)) {
        setArticles(dbData.articles);
        saveStoredArticles(dbData.articles);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const getArticle = (id) => {
    return articles.find((a) => a.id === id || a.aliasId === id);
  };

  const saveArticle = (articleData) => {
    setArticles((prev) => {
      const index = prev.findIndex((a) => a.id === articleData.id);
      let updated;
      if (index >= 0) {
        updated = [...prev];
        updated[index] = { ...updated[index], ...articleData };
      } else {
        updated = [articleData, ...prev];
      }
      saveStoredArticles(updated);
      saveDbCollection('articles', updated);
      return updated;
    });
  };

  const deleteArticle = (id) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveStoredArticles(updated);
      saveDbCollection('articles', updated);
      return updated;
    });
  };

  const resetToDefaults = () => {
    setArticles(INITIAL_ARTICLES);
    saveStoredArticles(INITIAL_ARTICLES);
    saveDbCollection('articles', INITIAL_ARTICLES);
  };


  return (
    <ArticlesContext.Provider
      value={{
        articles,
        getArticle,
        saveArticle,
        deleteArticle,
        resetToDefaults,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
}
