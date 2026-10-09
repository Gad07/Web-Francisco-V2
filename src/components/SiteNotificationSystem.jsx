import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext.jsx';
import PopUpRenderer from './PopUpRenderer.jsx';

export default function SiteNotificationSystem() {
  const { siteSettings, getActivePopupForRoute } = useSiteSettings();
  const location = useLocation();
  const [activePopup, setActivePopup] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const popupTriggeredRef = useRef(false);

  const isAdmin = location.pathname.startsWith('/admin');

  // Evaluar pop-up activo en la ruta actual
  useEffect(() => {
    if (isAdmin) {
      setPopupOpen(false);
      setActivePopup(null);
      return;
    }

    const popup = getActivePopupForRoute(location.pathname);
    setActivePopup(popup);
    setPopupOpen(false);
    popupTriggeredRef.current = false;

    if (!popup || !popup.enabled) {
      return;
    }

    const sessionKey = `cga_popup_seen_${popup.id}`;
    if (popup.oncePerSession && sessionStorage.getItem(sessionKey)) {
      return;
    }

    const triggerPopup = () => {
      if (popupTriggeredRef.current) return;
      popupTriggeredRef.current = true;
      setPopupOpen(true);
      if (popup.oncePerSession) {
        sessionStorage.setItem(sessionKey, 'true');
      }
    };

    // DISPARADOR 1: POR TIEMPO
    if (popup.triggerType === 'time' || !popup.triggerType) {
      const delay = (popup.triggerDelaySeconds || 3) * 1000;
      const timer = setTimeout(triggerPopup, delay);
      return () => clearTimeout(timer);
    }

    // DISPARADOR 2: POR SCROLL
    if (popup.triggerType === 'scroll') {
      const threshold = (popup.triggerScrollPercent || 35) / 100;
      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const currentProgress = window.scrollY / totalHeight;
        if (currentProgress >= threshold) {
          triggerPopup();
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // DISPARADOR 3: POR INTENTO DE SALIDA (EXIT INTENT)
    if (popup.triggerType === 'exit') {
      const handleMouseLeave = (e) => {
        if (e.clientY <= 15) {
          triggerPopup();
          document.removeEventListener('mouseleave', handleMouseLeave);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [location.pathname, getActivePopupForRoute, isAdmin]);

  if (isAdmin) return null;

  return (
    <>
      {/* ─── POP-UP ACTIVO PARA LA RUTA ACTUAL (CON 1 SOLO POP-UP ACTIVO POR SECCIÓN) ─── */}
      <AnimatePresence>
        {popupOpen && activePopup && activePopup.enabled && (
          <PopUpRenderer
            popup={activePopup}
            onClose={() => setPopupOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
