import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext.jsx';
import { useSiteSettings, POPUP_TARGET_ROUTES } from '../context/SiteSettingsContext.jsx';
import { useI18n } from '../i18n/index.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import PopUpRenderer from '../components/PopUpRenderer.jsx';
import ArticleBlockBuilder from '../components/ArticleBlockBuilder.jsx';
import { normalizeArticleBlocks, createBlock } from '../utils/articleBlocks.js';
import { getUnifiedAcademicCalendar, parseDateToISO } from '../utils/calendarSync.js';
import { formatDriveUrl } from '../utils/imageUtils.js';
import {
  Lock,
  User,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  Check,
  X,
  ArrowLeft,
  FileText,
  Layers,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Megaphone,
  Bell,
  Eye,
  Calendar,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Mail,
  HelpCircle,
  Inbox,
  CheckCircle2,
  Clock,
  Send,
  Radio,
  Sliders,
  Palette,
  EyeOff,
  MousePointerClick,
  RotateCcw,
  Compass,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Navigation,
  ArrowRight,
  Image as ImageIcon,
  Type,
  Info,
} from 'lucide-react';

const PNG_PRESETS = [
  { label: 'Rama 2 (Botánica Lateral)', path: '/imagenes/Rama 2.svg' },
  { label: 'Rama 1 (Follaje Superior)', path: '/imagenes/Rama 1.svg' },
  { label: 'Liana (Silvestre Vertical)', path: '/imagenes/Liana.png' },
];

const INITIAL_EMPTY_POPUP = {
  id: '',
  name: 'Nuevo Pop-up Informativo',
  enabled: true,
  designType: 'split-modal', // 'classic-hero' | 'split-modal' | 'botanical-solid' | 'floating-corner'
  targetRoute: 'all', // 'all', '/', '/capacitacion', '/comunicacion', etc.
  triggerType: 'time', // 'time' | 'scroll' | 'exit'
  triggerDelaySeconds: 3,
  triggerScrollPercent: 35,
  hasCtaButton: true,
  title: 'Título del Comunicado o Convocatoria',
  subtitle: 'Consejo Global Ambiental',
  message: 'Texto explicativo con los detalles y puntos clave del aviso o programa institucional.',
  image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop&auto=format',
  pngElement: '/imagenes/Rama 2.svg',
  highlightBadge: 'Aviso Institucional',
  ctaText: 'Ver Convocatoria',
  ctaLink: '/capacitacion',
  secondaryCtaText: 'Conocer Más',
  secondaryCtaLink: '/contacto',
  cornerPosition: 'bottom-right',
  oncePerSession: false,
};

const INITIAL_EMPTY_ARTICLE = {
  id: '',
  type: 'noticias',
  cardStyle: 'classic', // 'classic' | 'dark-overlay'
  detailLayout: 'classic', // 'classic' | 'immersive' | 'split' | 'story'
  heroStyle: 'png-element',
  heroPng: '/imagenes/Rama 2.svg',
  heroPngPosition: 'right',
  heroPngSize: 'md',
  heroPngOpacity: 0.85,
  heroPngHasBeigeOverlay: true,
  heroPngOverlayOpacity: 0.25,
  heroBgImage: '',
  heroBgOpacity: 0.3,
  heroBgOverlayOpacity: 0.9,
  image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&fit=crop&auto=format',
  category: { es: 'Comunicado Oficial · Ginebra / CDMX', en: 'Official Press Release · Geneva / CDMX' },
  date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
  title: {
    es: '',
    en: '',
  },
  summary: {
    es: '',
    en: '',
  },
  paragraphs: [
    {
      es: '',
      en: '',
    },
  ],
  quote: {
    es: '',
    en: '',
  },
  keyPoints: [
    { es: '', en: '' },
    { es: '', en: '' },
  ],
  blocks: [createBlock('paragraph')],
  readTime: '4 min de lectura',
  author: 'Dr. Francisco Solorio',
  authorRole: { es: 'Presidente Fundador del Consejo Global Ambiental', en: 'Founding President, Global Environmental Council' },
};

const AUTH_STORAGE_KEY = 'cga_admin_authenticated';

export default function Admin() {
  const { t } = useI18n();
  const { articles, saveArticle, deleteArticle, resetToDefaults } = useArticles();
  const {
    popups,
    savePopup,
    togglePopupStatus,
    deletePopup,
    duplicatePopup,
    resetPopupsToDefaults,
    siteSettings,
    updateBanner,
    trainingData,
    updateTrainingData,
    applications,
    updateApplicationStatus,
    deleteApplication,
    alliances = [],
    saveAlliance,
    deleteAlliance,
    resetAlliancesToDefaults,
    governanceMembers = [],
    saveGovernanceMember,
    deleteGovernanceMember,
    resetGovernanceToDefaults,
  } = useSiteSettings();

  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  // Credenciales del formulario de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // ─── NAVEGACIÓN PRINCIPAL DEL ADMIN ───
  // Módulos: 'capacitaciones' | 'comunicaciones' | 'popups'
  const [adminModule, setAdminModule] = useState('capacitaciones');

  // Sub-pestañas para cada módulo:
  // Artículos: 'lista' | 'nuevo' | 'hero'
  const [articlesSubTab, setArticlesSubTab] = useState('lista');
  
  // Capacitaciones: 'oferta' | 'diplomados' | 'cursos' | 'conferencias' | 'organizaciones' | 'especialistas' | 'calendario' | 'inscripciones'
  const [trainingSubTab, setTrainingSubTab] = useState('oferta');

  // Comunicaciones: 'todo' | 'noticias' | 'eventos' | 'opinion' | 'dialogos' | 'publicaciones' | 'prensa'
  const [commsSubTab, setCommsSubTab] = useState('todo');

  // Pop-ups & Avisos: 'popup' | 'banner' | 'convocatoria'
  const [popupsSubTab, setPopupsSubTab] = useState('popup');

  // Estados de Artículos
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleEditorTab, setArticleEditorTab] = useState('general'); // 'general' | 'content' | 'hero'

  // Estados de Capacitaciones
  const [editingDiploma, setEditingDiploma] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingWebinar, setEditingWebinar] = useState(null);
  const [editingSpecialist, setEditingSpecialist] = useState(null);
  const [editingOrgProgram, setEditingOrgProgram] = useState(null);
  const [newOrgBenefitEs, setNewOrgBenefitEs] = useState('');
  const [newOrgBenefitEn, setNewOrgBenefitEn] = useState('');
  const [editingCalendarEvent, setEditingCalendarEvent] = useState(null);
  const [adminCalYear, setAdminCalYear] = useState(2026);
  const [adminCalMonthOffset, setAdminCalMonthOffset] = useState(4); // Mayo = 4
  const [adminCalFilter, setAdminCalFilter] = useState('all');
  const [adminCalSearch, setAdminCalSearch] = useState('');

  // Estados de Gestión de Pop-ups Multiruta (Izquierda 25% Lista / Derecha 75% Info, Formulario y Preview)
  const [selectedPopupId, setSelectedPopupId] = useState(() => (popups && popups.length > 0 ? popups[0].id : 'popup-home-welcome'));
  const [editingPopup, setEditingPopup] = useState(() => (popups && popups.length > 0 ? JSON.parse(JSON.stringify(popups[0])) : null));
  const [popupViewMode, setPopupViewMode] = useState('split'); // 'split' | 'editor' | 'preview'
  const [previewingPopupItem, setPreviewingPopupItem] = useState(null);
  const [popupFilterRoute, setPopupFilterRoute] = useState('all-filters');
  const [popupSearch, setPopupSearch] = useState('');

  // Sincronizar pop-up seleccionado si el actual ya no existe tras depuración
  useEffect(() => {
    if (popups && popups.length > 0) {
      const exists = popups.some((p) => p.id === selectedPopupId);
      if (!exists) {
        setSelectedPopupId(popups[0].id);
        setEditingPopup(JSON.parse(JSON.stringify(popups[0])));
      }
    }
  }, [popups, selectedPopupId]);

  // Estados de Aliados Institucionales
  const [editingAlliance, setEditingAlliance] = useState(null);
  const [allianceSearch, setAllianceSearch] = useState('');

  // Estados de Cuerpo de Gobernanza
  const [editingGovMember, setEditingGovMember] = useState(null);
  const [govSearch, setGovSearch] = useState('');

  // Estados de Pop-up & Banner
  const [previewPopupOpen, setPreviewPopupOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newBannerText, setNewBannerText] = useState('');
  const [newBannerImgUrl, setNewBannerImgUrl] = useState('');
  const [newBannerImgLink, setNewBannerImgLink] = useState('');

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Manejador de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (
      (cleanEmail === 'admin@cga.org' || cleanEmail === 'admin@consejoparaelambienteglobal.org' || cleanEmail === 'admin') &&
      (cleanPass === 'cga2026' || cleanPass === 'admin')
    ) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Acceso concedido al panel de administración');
    } else {
      setLoginError('Credenciales incorrectas. Verifique su correo y contraseña institucional.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setEditingArticle(null);
  };

  // ─────────────────────────────────────────────────────────────
  // MANEJADORES DE ARTÍCULOS
  // ─────────────────────────────────────────────────────────────
  const filteredArticles = articles.filter((art) => {
    // Si estamos en el módulo de comunicaciones y hay un sub-tab seleccionado
    if (adminModule === 'comunicaciones') {
      if (commsSubTab !== 'todo' && commsSubTab !== 'prensa') {
        if (art.type !== commsSubTab) return false;
      }
    } else {
      if (filterType !== 'all' && art.type !== filterType) return false;
    }
    const titleEs = art.title?.es || '';
    const titleEn = art.title?.en || '';
    const author = art.author || '';
    const query = searchTerm.toLowerCase();
    return (
      titleEs.toLowerCase().includes(query) ||
      titleEn.toLowerCase().includes(query) ||
      author.toLowerCase().includes(query)
    );
  });

  const handleStartCreateArticle = (presetType = 'noticias') => {
    const newId = `articulo-${Date.now()}`;
    setEditingArticle({
      ...INITIAL_EMPTY_ARTICLE,
      id: newId,
      type: presetType,
      blocks: [createBlock('paragraph')],
    });
    setArticleEditorTab('general');
    setAdminModule('articulos');
    setArticlesSubTab('lista');
  };

  const handleStartEditArticle = (article) => {
    const cloned = JSON.parse(JSON.stringify(article));
    cloned.blocks = normalizeArticleBlocks(cloned);
    setEditingArticle(cloned);
    setArticleEditorTab('general');
    setAdminModule('articulos');
  };

  const handleDuplicateArticle = (article) => {
    const dupId = `${article.id}-copia-${Math.floor(Math.random() * 1000)}`;
    const duplicated = {
      ...JSON.parse(JSON.stringify(article)),
      id: dupId,
      title: {
        es: `[Copia] ${article.title?.es || ''}`,
        en: `[Copy] ${article.title?.en || ''}`,
      },
    };
    duplicated.blocks = normalizeArticleBlocks(duplicated);
    saveArticle(duplicated);
    showToast('Artículo duplicado con éxito');
  };

  const handleDeleteArticle = (id, title) => {
    if (window.confirm(`¿Confirmas la eliminación del artículo "${title}"?`)) {
      deleteArticle(id);
      showToast('Artículo eliminado correctamente');
      if (editingArticle?.id === id) {
        setEditingArticle(null);
      }
    }
  };

  const handleSaveArticleForm = (e) => {
    if (e) e.preventDefault();
    if (!editingArticle.id || !editingArticle.title.es) {
      alert('Por favor especifica un identificador y el título en español');
      return;
    }
    const toSave = {
      ...editingArticle,
      blocks: editingArticle.blocks && editingArticle.blocks.length > 0
        ? editingArticle.blocks
        : normalizeArticleBlocks(editingArticle),
    };
    saveArticle(toSave);
    showToast('Artículo guardado exitosamente');
    setEditingArticle(null);
  };

  const handleAddParagraph = () => {
    setEditingArticle({
      ...editingArticle,
      paragraphs: [...(editingArticle.paragraphs || []), { es: '', en: '' }],
    });
  };

  const handleUpdateParagraph = (index, lang, value) => {
    const next = [...(editingArticle.paragraphs || [])];
    next[index] = { ...next[index], [lang]: value };
    setEditingArticle({ ...editingArticle, paragraphs: next });
  };

  const handleRemoveParagraph = (index) => {
    const next = editingArticle.paragraphs.filter((_, i) => i !== index);
    setEditingArticle({ ...editingArticle, paragraphs: next });
  };

  const handleAddKeyPoint = () => {
    setEditingArticle({
      ...editingArticle,
      keyPoints: [...(editingArticle.keyPoints || []), { es: '', en: '' }],
    });
  };

  const handleUpdateKeyPoint = (index, lang, value) => {
    const next = [...(editingArticle.keyPoints || [])];
    next[index] = { ...next[index], [lang]: value };
    setEditingArticle({ ...editingArticle, keyPoints: next });
  };

  const handleRemoveKeyPoint = (index) => {
    const next = editingArticle.keyPoints.filter((_, i) => i !== index);
    setEditingArticle({ ...editingArticle, keyPoints: next });
  };

  // ─────────────────────────────────────────────────────────────
  // MANEJADORES DE CAPACITACIONES
  // ─────────────────────────────────────────────────────────────
  const handleSaveDiploma = (diploma) => {
    updateTrainingData((prev) => {
      const idx = prev.diplomados.findIndex((d) => d.id === diploma.id);
      let nextList;
      if (idx >= 0) {
        nextList = [...prev.diplomados];
        nextList[idx] = diploma;
      } else {
        nextList = [diploma, ...prev.diplomados];
      }
      return { ...prev, diplomados: nextList };
    });
    setEditingDiploma(null);
    showToast('Diplomado guardado correctamente');
  };

  const handleDeleteDiploma = (id) => {
    if (window.confirm('¿Confirmas eliminar este diplomado?')) {
      updateTrainingData((prev) => ({
        ...prev,
        diplomados: prev.diplomados.filter((d) => d.id !== id),
      }));
      showToast('Diplomado eliminado');
    }
  };

  const handleSaveCourse = (course) => {
    updateTrainingData((prev) => {
      const idx = prev.cursos.findIndex((c) => c.id === course.id);
      let nextList;
      if (idx >= 0) {
        nextList = [...prev.cursos];
        nextList[idx] = course;
      } else {
        nextList = [course, ...prev.cursos];
      }
      return { ...prev, cursos: nextList };
    });
    setEditingCourse(null);
    showToast('Curso / Taller guardado correctamente');
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('¿Confirmas eliminar este curso?')) {
      updateTrainingData((prev) => ({
        ...prev,
        cursos: prev.cursos.filter((c) => c.id !== id),
      }));
      showToast('Curso eliminado');
    }
  };

  const handleSaveWebinar = (webinar) => {
    updateTrainingData((prev) => {
      const idx = prev.webinars.findIndex((w) => w.id === webinar.id);
      let nextList;
      if (idx >= 0) {
        nextList = [...prev.webinars];
        nextList[idx] = webinar;
      } else {
        nextList = [webinar, ...prev.webinars];
      }
      return { ...prev, webinars: nextList };
    });
    setEditingWebinar(null);
    showToast('Conferencia guardada correctamente');
  };

  const handleDeleteWebinar = (id) => {
    if (window.confirm('¿Confirmas eliminar esta conferencia?')) {
      updateTrainingData((prev) => ({
        ...prev,
        webinars: prev.webinars.filter((w) => w.id !== id),
      }));
      showToast('Conferencia eliminada');
    }
  };

  const handleSaveSpecialist = (spec) => {
    updateTrainingData((prev) => {
      const idx = prev.especialistas.findIndex((s) => s.id === spec.id);
      let nextList;
      if (idx >= 0) {
        nextList = [...prev.especialistas];
        nextList[idx] = spec;
      } else {
        nextList = [spec, ...prev.especialistas];
      }
      return { ...prev, especialistas: nextList };
    });
    setEditingSpecialist(null);
    showToast('Especialista guardado correctamente');
  };

  const handleDeleteSpecialist = (id) => {
    if (window.confirm('¿Confirmas eliminar este especialista?')) {
      updateTrainingData((prev) => ({
        ...prev,
        especialistas: prev.especialistas.filter((s) => s.id !== id),
      }));
      showToast('Especialista eliminado');
    }
  };

  // ── MANEJADORES DE PROGRAMAS PARA ORGANIZACIONES ──
  const handleSaveOrgProgram = (prog) => {
    updateTrainingData((prev) => {
      const org = prev.organizaciones || {};
      const programs = org.programs || [];
      const idx = programs.findIndex((p) => p.id === prog.id);
      let nextPrograms;
      if (idx >= 0) {
        nextPrograms = [...programs];
        nextPrograms[idx] = prog;
      } else {
        nextPrograms = [prog, ...programs];
      }
      return {
        ...prev,
        organizaciones: {
          ...org,
          programs: nextPrograms,
        },
      };
    });
    setEditingOrgProgram(null);
    showToast('Programa institucional guardado correctamente');
  };

  const handleDeleteOrgProgram = (id) => {
    if (window.confirm('¿Confirmas eliminar este programa para organizaciones?')) {
      updateTrainingData((prev) => {
        const org = prev.organizaciones || {};
        return {
          ...prev,
          organizaciones: {
            ...org,
            programs: (org.programs || []).filter((p) => p.id !== id),
          },
        };
      });
      showToast('Programa eliminado');
    }
  };

  const handleAddOrgBenefit = (esText, enText) => {
    if (!esText.trim()) return;
    updateTrainingData((prev) => {
      const org = prev.organizaciones || {};
      const benefits = org.benefits || [];
      return {
        ...prev,
        organizaciones: {
          ...org,
          benefits: [...benefits, { es: esText.trim(), en: enText.trim() || esText.trim() }],
        },
      };
    });
    setNewOrgBenefitEs('');
    setNewOrgBenefitEn('');
    showToast('Beneficio institucional agregado');
  };

  const handleDeleteOrgBenefit = (index) => {
    updateTrainingData((prev) => {
      const org = prev.organizaciones || {};
      const benefits = [...(org.benefits || [])];
      benefits.splice(index, 1);
      return {
        ...prev,
        organizaciones: {
          ...org,
          benefits,
        },
      };
    });
    showToast('Beneficio eliminado');
  };

  // ── MANEJADORES DE CALENDARIO ACADÉMICO ──
  const handleSaveCalendarEvent = (event) => {
    if (event.sourceType === 'diplomado') {
      updateTrainingData((prev) => {
        const next = [...(prev.diplomados || [])];
        const idx = next.findIndex((d) => d.id === event.sourceId);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            date: event.date,
            time: event.time,
            title: event.title,
            desc: event.desc,
            duration: event.modality || next[idx].duration,
          };
        }
        return { ...prev, diplomados: next };
      });
    } else if (event.sourceType === 'curso') {
      updateTrainingData((prev) => {
        const next = [...(prev.cursos || [])];
        const idx = next.findIndex((c) => c.id === event.sourceId);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            date: event.date,
            time: event.time,
            title: event.title,
            desc: event.desc,
            hours: event.modality || next[idx].hours,
          };
        }
        return { ...prev, cursos: next };
      });
    } else if (event.sourceType === 'webinar') {
      updateTrainingData((prev) => {
        const next = [...(prev.webinars || [])];
        const idx = next.findIndex((w) => w.id === event.sourceId);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            date: event.date,
            time: event.time,
            title: event.title,
            summary: event.desc,
          };
        }
        return { ...prev, webinars: next };
      });
    } else if (event.sourceType === 'organizacion') {
      updateTrainingData((prev) => {
        const org = prev.organizaciones || {};
        const nextProgs = [...(org.programs || [])];
        const idx = nextProgs.findIndex((p) => p.id === event.sourceId);
        if (idx >= 0) {
          nextProgs[idx] = {
            ...nextProgs[idx],
            date: event.date,
            title: event.title,
            desc: event.desc,
          };
        }
        return { ...prev, organizaciones: { ...org, programs: nextProgs } };
      });
    } else {
      updateTrainingData((prev) => {
        const cal = Array.isArray(prev.calendario) ? prev.calendario : [];
        const idx = cal.findIndex((ev) => ev.id === event.id);
        let nextCal;
        if (idx >= 0) {
          nextCal = [...cal];
          nextCal[idx] = event;
        } else {
          nextCal = [event, ...cal];
        }
        return { ...prev, calendario: nextCal };
      });
    }
    setEditingCalendarEvent(null);
    showToast('Evento de calendario sincronizado y guardado');
  };

  const handleDeleteCalendarEvent = (id, event) => {
    if (window.confirm('¿Confirmas eliminar este evento del calendario?')) {
      if (event?.sourceType === 'diplomado') {
        handleDeleteDiploma(event.sourceId);
      } else if (event?.sourceType === 'curso') {
        handleDeleteCourse(event.sourceId);
      } else if (event?.sourceType === 'webinar') {
        handleDeleteWebinar(event.sourceId);
      } else if (event?.sourceType === 'organizacion') {
        handleDeleteOrgProgram(event.sourceId);
      } else {
        updateTrainingData((prev) => ({
          ...prev,
          calendario: (Array.isArray(prev.calendario) ? prev.calendario : []).filter((ev) => ev.id !== id),
        }));
      }
      showToast('Evento eliminado del calendario');
    }
  };

  const handleDuplicateCalendarEvent = (event) => {
    const newId = `cal-${Date.now()}`;
    const dup = {
      ...JSON.parse(JSON.stringify(event)),
      id: newId,
      title: {
        es: `[Copia] ${event.title?.es || ''}`,
        en: `[Copy] ${event.title?.en || ''}`,
      },
    };
    handleSaveCalendarEvent(dup);
    showToast('Evento duplicado');
  };

  // ─────────────────────────────────────────────────────────────
  // MANEJADORES DE POP-UPS MULTIRUTA & AVISOS (LISTA 25% + FORM/PREVIEW 75%)
  // ─────────────────────────────────────────────────────────────
  const handleSelectPopup = (p) => {
    setSelectedPopupId(p.id);
    setEditingPopup(JSON.parse(JSON.stringify(p)));
  };

  const handleStartCreatePopup = () => {
    const newId = `popup-${Date.now()}`;
    const newPop = {
      ...INITIAL_EMPTY_POPUP,
      id: newId,
      name: `Nuevo Pop-up #${popups.length + 1}`,
      title: 'Convocatoria o Aviso Institucional',
      subtitle: 'Consejo Global Ambiental',
      message: 'Detalla aquí la información importante, enlaces relevantes o fechas límite de la convocatoria.',
    };
    savePopup(newPop);
    setSelectedPopupId(newId);
    setEditingPopup(newPop);
    showToast('Nuevo pop-up creado y listo para editar');
  };

  const handleSavePopupForm = (e) => {
    if (e) e.preventDefault();
    if (!editingPopup) return;
    if (!editingPopup.name?.trim() || !editingPopup.title?.trim()) {
      alert('Por favor especifica un nombre interno y el título principal del pop-up.');
      return;
    }
    savePopup(editingPopup);
    showToast(`Pop-up "${editingPopup.name}" guardado exitosamente`);
  };

  const handleDeletePopup = (id, name) => {
    if (window.confirm(`¿Confirmas la eliminación del pop-up "${name || id}"?`)) {
      deletePopup(id);
      showToast('Pop-up eliminado');
      const remaining = popups.filter((p) => p.id !== id);
      if (remaining.length > 0) {
        setSelectedPopupId(remaining[0].id);
        setEditingPopup(JSON.parse(JSON.stringify(remaining[0])));
      } else {
        setSelectedPopupId('');
        setEditingPopup(null);
      }
    }
  };

  const handleDuplicatePopup = (id) => {
    const orig = popups.find((p) => p.id === id) || editingPopup;
    if (!orig) return;
    const dupId = `popup-${Date.now()}`;
    const duplicated = {
      ...JSON.parse(JSON.stringify(orig)),
      id: dupId,
      name: `[Copia] ${orig.name}`,
      enabled: false,
    };
    savePopup(duplicated);
    setSelectedPopupId(dupId);
    setEditingPopup(duplicated);
    showToast('Pop-up duplicado (creado en estado inactivo)');
  };

  const handleTogglePopup = (popupItem) => {
    const nextState = !popupItem.enabled;
    if (nextState) {
      const existingSameRoute = popups.find(
        (p) => p.id !== popupItem.id && p.enabled && p.targetRoute === popupItem.targetRoute
      );
      if (existingSameRoute) {
        showToast(
          `Activado. Nota: "${existingSameRoute.name}" también está activo en "${popupItem.targetRoute}".`,
          'info'
        );
      } else {
        showToast(`Pop-up "${popupItem.name}" activado`);
      }
    } else {
      showToast(`Pop-up "${popupItem.name}" desactivado`);
    }
    togglePopupStatus(popupItem.id);
    if (editingPopup?.id === popupItem.id) {
      setEditingPopup((prev) => (prev ? { ...prev, enabled: nextState } : null));
    }
  };

  const handleResetPopups = () => {
    if (window.confirm('¿Deseas restablecer los pop-ups a los 4 modelos de ejemplo iniciales?')) {
      resetPopupsToDefaults();
      showToast('Pop-ups restablecidos a la configuración predeterminada');
      if (popups.length > 0) {
        setSelectedPopupId(popups[0].id);
        setEditingPopup(JSON.parse(JSON.stringify(popups[0])));
      }
    }
  };

  const filteredPopups = popups.filter((p) => {
    if (popupFilterRoute !== 'all-filters' && p.targetRoute !== popupFilterRoute) {
      return false;
    }
    if (popupSearch.trim()) {
      const q = popupSearch.toLowerCase();
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchRoute = (p.targetRoute || '').toLowerCase().includes(q);
      return matchName || matchTitle || matchRoute;
    }
    return true;
  });

  // ─────────────────────────────────────────────────────────────
  // MANEJADORES DE ALIADOS INSTITUCIONALES (LOGOTIPOS)
  const handleStartCreateAlliance = () => {
    setEditingAlliance({
      id: `alliance-${Date.now()}`,
      name: '',
      logo: '',
      website: '',
      type: 'multilateral',
    });
  };

  const handleSaveAllianceForm = (e) => {
    if (e) e.preventDefault();
    if (!editingAlliance) return;
    if (!editingAlliance.logo?.trim()) {
      alert('Por favor especifica la URL del logotipo.');
      return;
    }
    saveAlliance(editingAlliance);
    setEditingAlliance(null);
    showToast('Logotipo de aliado guardado exitosamente');
  };

  const handleDeleteAllianceItem = (id) => {
    if (window.confirm('¿Confirmas eliminar este logotipo de aliado?')) {
      deleteAlliance(id);
      showToast('Logotipo eliminado');
    }
  };

  const handleResetAlliances = () => {
    if (window.confirm('¿Deseas restablecer los aliados institucionales a la lista por defecto?')) {
      resetAlliancesToDefaults();
      showToast('Aliados restablecidos por defecto');
    }
  };

  // ─── GESTIÓN DE CUERPO DE GOBERNANZA (ADMIN HANDLERS) ───
  const handleStartCreateGovMember = () => {
    setEditingGovMember({
      id: `gov-${Date.now()}`,
      num: String(governanceMembers.length + 1).padStart(2, '0'),
      name: '',
      role: { es: '', en: '' },
      displayRole: { es: '', en: '' },
      tag: { es: 'Cuerpo Directivo & Estrategia', en: 'Board & Strategic Leadership' },
      area: { es: '', en: '' },
      country: { es: 'México / Internacional', en: 'Mexico / International' },
      bio: { es: '', en: '' },
      img: '',
      category: 'consejeria',
      social: { email: '', linkedin: '', twitter: '' },
      responsibilities: [],
    });
  };

  const handleSaveGovMemberForm = (e) => {
    if (e) e.preventDefault();
    if (!editingGovMember) return;
    if (!editingGovMember.name?.trim()) {
      alert('Por favor especifica el nombre del miembro de gobernanza.');
      return;
    }
    saveGovernanceMember(editingGovMember);
    setEditingGovMember(null);
    showToast(`Miembro "${editingGovMember.name}" guardado exitosamente`);
  };

  const handleDeleteGovMemberItem = (id, name) => {
    if (window.confirm(`¿Confirmas eliminar a "${name || id}" del cuerpo de gobernanza?`)) {
      deleteGovernanceMember(id);
      showToast('Miembro eliminado');
    }
  };

  const handleResetGovMembers = () => {
    if (window.confirm('¿Deseas restablecer el cuerpo de gobernanza a la lista por defecto?')) {
      resetGovernanceToDefaults();
      showToast('Cuerpo de gobernanza restablecido por defecto');
    }
  };

  // ══════════════════════════════════════════════════════════════════
  // PANTALLA 1: INICIO DE SESIÓN INSTITUCIONAL (FONDO BEIGE)
  // ══════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex items-center justify-center p-6 relative overflow-hidden">
        <div aria-hidden className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#eae4d2] blur-3xl opacity-70 pointer-events-none" />
        <div aria-hidden className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#d8ceb6] blur-3xl opacity-50 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] shadow-xl backdrop-blur-xl space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#4a5a22] text-[#f5efe3] mx-auto flex items-center justify-center shadow-md border border-[#5a6b2a]">
              <ShieldCheck className="w-7 h-7 stroke-[1.75]" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light tracking-tight">
                Panel de Administración
              </h1>
              <p className="text-xs text-[#6b6048] font-light pt-1">
                Consejo Global Ambiental · Consola General de Gestión
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/10 border border-red-800/30 text-red-900 text-xs text-center font-medium">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22]">
                Usuario / Correo Institucional
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#7a6e58]">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@consejoparaelambienteglobal.org"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] placeholder-[#a89e88] focus:outline-none focus:border-[#4a5a22] transition-colors shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a5a22]">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#7a6e58]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] placeholder-[#a89e88] focus:outline-none focus:border-[#4a5a22] transition-colors shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Acceder al Sistema</span>
              <span>&rarr;</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#d8ceb6]/80 text-center space-y-1 text-[11px] text-[#7a6e58]">
            <p className="font-semibold text-[#4a5a22]">Credenciales de acceso rápido:</p>
            <p>Usuario: <span className="font-mono text-[#2d2618]">admin@cga.org</span></p>
            <p>Contraseña: <span className="font-mono text-[#2d2618]">cga2026</span></p>
          </div>

          <div className="text-center pt-1">
            <Link
              to="/"
              className="text-xs text-[#6b6048] hover:text-[#4a5a22] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página principal</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // PANTALLA 2: DASHBOARD ADMINISTRADOR CON NAVBAR DEDICADA
  // ══════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans pb-28 selection:bg-[#4a5a22] selection:text-white">
      {/* ─── TOAST NOTIFICATION ─── */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#4a5a22] text-[#f5efe3] font-semibold text-xs shadow-2xl border border-[#d8ceb6] flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{notification.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          NAVBAR UNIFICADA DEL ADMINISTRADOR CON LOGOTIPO OFICIAL
         ══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#f5efe3]/95 border-b border-[#d8ceb6] backdrop-blur-xl transition-all shadow-xs">
        {/* FILA PRINCIPAL: LOGO + NAVEGACIÓN EDITORIAL ESTILO SITIO PÚBLICO + CERRAR SESIÓN */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
          {/* Cluster Izquierdo: Logotipo Oficial CGA */}
          <div className="flex items-center shrink-0" style={{ height: '46px', maxHeight: '46px' }}>
            <Link
              to="/"
              className="flex items-center transition-transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              style={{ height: '44px', maxHeight: '44px', width: 'auto' }}
              title="Consejo Global Ambiental"
            >
              <img
                src="/logos/Logo%20ES.svg"
                alt="Consejo Global Ambiental"
                width="195"
                height="44"
                style={{
                  height: '44px',
                  maxHeight: '44px',
                  width: 'auto',
                  maxWidth: '210px',
                  objectFit: 'contain',
                  display: 'block'
                }}
                className="h-11 w-auto max-h-11 max-w-[210px] object-contain"
              />
            </Link>
          </div>

          {/* Cluster Central: Módulos de Navegación Estilo Sitio Público */}
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto max-w-full py-1">
            {[
              { id: 'capacitaciones', label: 'Capacitaciones & Academia' },
              { id: 'comunicaciones', label: 'Comunicaciones & Medios' },
              { id: 'popups', label: 'Pop-ups & Avisos' },
              { id: 'alianzas', label: 'Aliados & Logotipos' },
              { id: 'gobernanza', label: 'Gobierno y Estructura' },
            ].map((mod) => {
              const isActive = adminModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setAdminModule(mod.id);
                    setEditingArticle(null);
                  }}
                  className={`relative py-2 font-sans text-[13px] sm:text-[14px] font-medium tracking-[0.02em] whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-[#3a4a18] font-bold'
                      : 'text-[#5c523e] hover:text-[#2d2618]'
                  }`}
                >
                  <span>{mod.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="adminActiveTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#4a5a22] rounded-full"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Cluster Derecho: Cerrar Sesión */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-[#eae4d2] hover:bg-red-900/15 text-[#5c523e] hover:text-red-800 border border-[#d8ceb6] text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 shadow-xs"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* FILA SECUNDARIA: SUB-NAVBAR TIPO PÁGINA (ESTILO PILL EXACTO DE LAS IMÁGENES DEL USUARIO) */}
        <div className="bg-[#e4dcce]/60 border-t border-[#d8ceb6] py-2 px-4 sm:px-8 overflow-x-auto flex justify-center">
          {/* SUB-NAVBAR PARA CAPACITACIONES (IDÉNTICA A LA IMAGEN 1 DEL USUARIO) */}
          {adminModule === 'capacitaciones' && (
            <div className="inline-flex items-center p-1 rounded-full bg-[#eae4d2] border border-[#d8ceb6] shadow-xs overflow-x-auto">
              {[
                { id: 'oferta', label: 'Oferta Académica' },
                { id: 'diplomados', label: 'Diplomados' },
                { id: 'cursos', label: 'Cursos & Talleres' },
                { id: 'conferencias', label: 'Conferencias' },
                { id: 'organizaciones', label: 'Programas para Organizaciones' },
                { id: 'especialistas', label: 'Especialistas' },
                { id: 'calendario', label: 'Calendario Académico' },
                { id: 'inscripciones', label: `Inscripciones (${applications.length})` },
              ].map((sub) => {
                const isActive = trainingSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setTrainingSubTab(sub.id)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs font-semibold'
                        : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* SUB-NAVBAR PARA COMUNICACIONES (IDÉNTICA A LA IMAGEN 2 DEL USUARIO) */}
          {adminModule === 'comunicaciones' && (
            <div className="inline-flex items-center p-1 rounded-full bg-[#eae4d2] border border-[#d8ceb6] shadow-xs overflow-x-auto">
              {[
                { id: 'todo', label: 'Todo' },
                { id: 'noticias', label: 'Noticias' },
                { id: 'eventos', label: 'Eventos' },
                { id: 'opinion', label: 'Opinión' },
                { id: 'dialogos', label: 'Diálogos' },
                { id: 'publicaciones', label: 'Publicaciones' },
                { id: 'prensa', label: 'Boletín & Prensa' },
              ].map((sub) => {
                const isActive = commsSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setCommsSubTab(sub.id)}
                    className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs font-semibold'
                        : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* SUB-NAVBAR PARA POP-UPS & AVISOS */}
          {adminModule === 'popups' && (
            <div className="inline-flex items-center p-1 rounded-full bg-[#eae4d2] border border-[#d8ceb6] shadow-xs overflow-x-auto">
              {[
                { id: 'popup', label: 'Pop-up Emergente de Bienvenida' },
                { id: 'banner', label: 'Cinta de Anuncios / Marquesina' },
              ].map((sub) => {
                const isActive = popupsSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setPopupsSubTab(sub.id)}
                    className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs font-semibold'
                        : 'text-[#6b6048] hover:text-[#2d2618]'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          CONTENIDO DINÁMICO SEGÚN EL MÓDULO ACTIVO
         ══════════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* ─────────────────────────────────────────────────────────────
            MÓDULO 1: GESTIÓN DE ARTÍCULOS & HERO PERSONALIZADO
           ───────────────────────────────────────────────────────────── */}
        {adminModule === 'articulos' && (
          <div className="space-y-8">
            {/* TARJETAS DE ESTADÍSTICAS RÁPIDAS */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#4a5a22] tracking-widest">
                  Total Artículos
                </span>
                <div className="font-serif text-3xl text-[#2d2618] font-normal">{articles.length}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#4a5a22] tracking-widest">
                  Hero con Elemento PNG
                </span>
                <div className="font-serif text-3xl text-[#2d2618] font-normal">
                  {articles.filter((a) => a.heroStyle === 'png-element').length}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#4a5a22] tracking-widest">
                  Hero Beige Sólido
                </span>
                <div className="font-serif text-3xl text-[#2d2618] font-normal">
                  {articles.filter((a) => a.heroStyle === 'solid-beige' || !a.heroStyle).length}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#4a5a22] tracking-widest">
                  Hero con Imagen
                </span>
                <div className="font-serif text-3xl text-[#2d2618] font-normal">
                  {articles.filter((a) => a.heroStyle === 'image-bg').length}
                </div>
              </div>
            </section>

            {/* FORMULARIO EDITOR DE ARTÍCULO */}
            <AnimatePresence>
              {editingArticle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2] border border-[#4a5a22]/40 shadow-xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d8ceb6]">
                    <div>
                      <h2 className="font-serif text-2xl text-[#2d2618] font-normal">
                        {editingArticle.title?.es ? `Editando: ${editingArticle.title.es}` : 'Crear Nuevo Artículo'}
                      </h2>
                      <p className="text-xs text-[#6b6048] font-mono">ID: {editingArticle.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingArticle(null)}
                        className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white text-xs font-semibold text-[#6b6048] border border-[#d8ceb6] transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveArticleForm}
                        className="px-6 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Guardar Artículo</span>
                      </button>
                    </div>
                  </div>

                  {/* STEPPER WIZARD DE 2 PASOS */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 rounded-2xl bg-white/80 border border-[#d8ceb6] shadow-xs">
                    <button
                      type="button"
                      onClick={() => setArticleEditorTab('general')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                        articleEditorTab === 'general'
                          ? 'bg-[#4a5a22] text-[#f5efe3] shadow-md ring-2 ring-[#4a5a22]/30'
                          : 'bg-white/60 text-[#6b6048] hover:text-[#2d2618] hover:bg-white border border-[#d8ceb6]/60'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        articleEditorTab === 'general' ? 'bg-[#f5efe3] text-[#4a5a22]' : 'bg-[#d8ceb6] text-[#2d2618]'
                      }`}>
                        1
                      </span>
                      <span>Paso 1: Información, Portada & Plantilla</span>
                    </button>

                    <div className="hidden sm:flex items-center text-[#8a7e68]">
                      <ArrowRight className="w-4 h-4 opacity-70" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setArticleEditorTab('content')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                        articleEditorTab === 'content'
                          ? 'bg-[#4a5a22] text-[#f5efe3] shadow-md ring-2 ring-[#4a5a22]/30'
                          : 'bg-white/60 text-[#6b6048] hover:text-[#2d2618] hover:bg-white border border-[#d8ceb6]/60'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        articleEditorTab === 'content' ? 'bg-[#f5efe3] text-[#4a5a22]' : 'bg-[#d8ceb6] text-[#2d2618]'
                      }`}>
                        2
                      </span>
                      <span>Paso 2: Maquetador Drag & Drop (Bloques)</span>
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticleForm} className="space-y-6">
                    {/* PESTAÑA 1: GENERAL & METADATOS */}
                    {articleEditorTab === 'general' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Título del Artículo (Español) *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingArticle.title?.es || ''}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                title: { ...editingArticle.title, es: e.target.value },
                              })
                            }
                            placeholder="Ej. El Consejo Global Ambiental formaliza acuerdo..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#6b6048]">
                            Título en Inglés (English Title)
                          </label>
                          <input
                            type="text"
                            value={editingArticle.title?.en || ''}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                title: { ...editingArticle.title, en: e.target.value },
                              })
                            }
                            placeholder="e.g. The Global Environmental Council signs landmark agreement..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Línea Editorial / Tipo
                          </label>
                          <select
                            value={editingArticle.type}
                            onChange={(e) => setEditingArticle({ ...editingArticle, type: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          >
                            <option value="noticias">Noticias</option>
                            <option value="opinion">Opinión</option>
                            <option value="eventos">Eventos</option>
                            <option value="dialogos">Diálogos</option>
                            <option value="publicaciones">Publicaciones</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Fecha de Publicación
                          </label>
                          <input
                            type="text"
                            value={editingArticle.date || ''}
                            onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                            placeholder="Ej. 04 Abril 2026"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Categoría (Texto limpio sin cápsula)
                          </label>
                          <input
                            type="text"
                            value={editingArticle.category?.es || ''}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                category: { ...editingArticle.category, es: e.target.value },
                              })
                            }
                            placeholder="Ej. Comunicado Oficial · Ginebra / CDMX"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Autor & Tiempo de Lectura
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={editingArticle.author || ''}
                              onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                              placeholder="Autor"
                              className="px-3.5 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                            />
                            <input
                              type="text"
                              value={editingArticle.readTime || ''}
                              onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                              placeholder="Ej. 5 min de lectura"
                              className="px-3.5 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Resumen / Lead Institucional (Español)
                          </label>
                          <textarea
                            rows="3"
                            value={editingArticle.summary?.es || ''}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                summary: { ...editingArticle.summary, es: e.target.value },
                              })
                            }
                            placeholder="Breve introducción destacada del artículo..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            URL de Fotografía Principal
                          </label>
                          <input
                            type="url"
                            value={editingArticle.image || ''}
                            onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>

                        {/* SELECTOR VISUAL DE PLANTILLA DEL DETALLE / LECTURA COMPLETA (4 DISEÑOS) */}
                        <div className="sm:col-span-2 space-y-3 pt-4 border-t border-[#d8ceb6]">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                              Plantilla de Lectura del Artículo (Vista Detalle)
                            </label>
                            <span className="text-[11px] font-mono text-[#8a7e68]">
                              Plantilla: <strong className="text-[#4a5a22]">{editingArticle.detailLayout || 'classic'}</strong>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {[
                              {
                                id: 'classic',
                                name: '1. Editorial Clásico',
                                desc: 'Hero beige cálido, fotografía central panorámica y cuerpo de lectura centrado con capitular (Drop Cap).',
                                badge: 'Tradicional',
                              },
                              {
                                id: 'immersive',
                                name: '2. Portada Inmersiva',
                                desc: 'Hero cinematográfico a pantalla completa, fondo nocturno con fotografía, cita monumental y chips flotantes.',
                                badge: 'Cinematográfico',
                              },
                              {
                                id: 'split',
                                name: '3. Revista Split',
                                desc: 'Hero dividido 50/50: texto beige a la izquierda y fotografía a altura completa a la derecha, lectura limpia centrada debajo.',
                                badge: 'Magazine',
                              },
                              {
                                id: 'story',
                                name: '4. Storytelling Visual',
                                desc: 'Foto a todo el ancho entre bloques de texto, cita gigante en verde que corta la lectura y puntos clave como cifras grandes.',
                                badge: 'Narrativo',
                              },
                            ].map((tpl) => (
                              <button
                                key={tpl.id}
                                type="button"
                                onClick={() => setEditingArticle({ ...editingArticle, detailLayout: tpl.id })}
                                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                                  (editingArticle.detailLayout || 'classic') === tpl.id
                                    ? 'bg-[#eae4d2] border-[#4a5a22] shadow-md ring-2 ring-[#4a5a22]/30'
                                    : 'bg-white/70 border-[#d8ceb6] hover:border-[#8a7e68] hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-[#2d2618]">{tpl.name}</span>
                                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] font-semibold">
                                    {tpl.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#6b6048] font-light leading-relaxed">
                                  {tpl.desc}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* SELECTOR DE DISEÑO DE TARJETA EN CATÁLOGO (CARDS 1 Y 3) */}
                        <div className="sm:col-span-2 space-y-3 pt-3 border-t border-[#d8ceb6]/60">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                              Diseño de Tarjeta en el Catálogo
                            </label>
                            <span className="text-[11px] font-mono text-[#8a7e68]">
                              Tarjeta: <strong className="text-[#4a5a22]">{editingArticle.cardStyle === 'dark-overlay' ? 'dark-overlay' : 'classic'}</strong>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {[
                              {
                                id: 'classic',
                                name: '1. Clásico Vertical',
                                desc: 'Imagen panorámica 16:10 superior limpia, cuerpo beige con categoría, fecha y metadatos.',
                                badge: 'Card 1',
                              },
                              {
                                id: 'dark-overlay',
                                name: '3. Inmersivo Oscuro (Hero Card)',
                                desc: 'Fotografía completa de fondo con gradiente nocturno, tipografía blanca y acentos dorados.',
                                badge: 'Card 3',
                              },
                            ].map((style) => (
                              <button
                                key={style.id}
                                type="button"
                                onClick={() => setEditingArticle({ ...editingArticle, cardStyle: style.id })}
                                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                                  (editingArticle.cardStyle === 'dark-overlay' ? 'dark-overlay' : 'classic') === style.id
                                    ? 'bg-[#eae4d2] border-[#4a5a22] shadow-md ring-2 ring-[#4a5a22]/30'
                                    : 'bg-white/70 border-[#d8ceb6] hover:border-[#8a7e68] hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-[#2d2618]">{style.name}</span>
                                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] font-semibold">
                                    {style.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#6b6048] font-light leading-relaxed">
                                  {style.desc}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* ESTILIZADOR DEL HERO (SOLO APLICA AL MODELO CLÁSICO) */}
                        {(!editingArticle.detailLayout || editingArticle.detailLayout === 'classic') && (
                          <div className="sm:col-span-2 p-5 rounded-2xl bg-white/80 border border-[#d8ceb6] space-y-5 shadow-xs">
                            <div className="flex items-center justify-between pb-3 border-b border-[#d8ceb6]/70">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#4a5a22]/15 flex items-center justify-center text-[#4a5a22]">
                                  <Sliders className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                                    Diseñador Visual del Hero (Exclusivo Modelo Clásico)
                                  </h4>
                                  <p className="text-[11px] text-[#6b6048]">
                                    Personaliza el fondo panorámico, veladuras o añade elementos botánicos decorativos
                                  </p>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] font-semibold border border-[#4a5a22]/20">
                                Plantilla Clásica
                              </span>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                                Estilo de Fondo del Hero
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                  { id: 'solid-beige', title: '1. Beige Sólido', desc: 'Fondo beige limpio y minimalista' },
                                  { id: 'image-bg', title: '2. Fondo con Imagen', desc: 'Imagen con veladura y degradado beige' },
                                  { id: 'png-element', title: '3. Elemento PNG', desc: 'Elemento transparente sin fondo a izq/der' },
                                ].map((opt) => (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setEditingArticle({ ...editingArticle, heroStyle: opt.id })}
                                    className={`p-4 rounded-xl border text-left transition-all ${
                                      editingArticle.heroStyle === opt.id
                                        ? 'bg-[#4a5a22] text-[#f5efe3] border-[#4a5a22] shadow-sm'
                                        : 'bg-white text-[#2d2618] border-[#d8ceb6] hover:border-[#6b6048]'
                                    }`}
                                  >
                                    <div className="font-semibold text-xs">{opt.title}</div>
                                    <div className={`text-[11px] pt-1 ${editingArticle.heroStyle === opt.id ? 'text-[#e0d6be]' : 'text-[#6b6048]'}`}>
                                      {opt.desc}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* OPCIONES DE ELEMENTO PNG */}
                            {editingArticle.heroStyle === 'png-element' && (
                              <div className="pt-4 border-t border-[#d8ceb6] space-y-5">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                                  Opciones del Elemento PNG / SVG
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-[#2d2618]">Posición en Pantalla</label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {['left', 'right'].map((pos) => (
                                        <button
                                          key={pos}
                                          type="button"
                                          onClick={() => setEditingArticle({ ...editingArticle, heroPngPosition: pos })}
                                          className={`py-2.5 rounded-xl text-xs font-bold uppercase ${
                                            editingArticle.heroPngPosition === pos
                                              ? 'bg-[#4a5a22] text-[#f5efe3]'
                                              : 'bg-white text-[#6b6048] border border-[#d8ceb6]'
                                          }`}
                                        >
                                          {pos === 'left' ? '← Izquierda' : 'Derecha →'}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-[#2d2618]">Tamaño del Elemento</label>
                                    <div className="grid grid-cols-4 gap-1.5">
                                      {[
                                        { id: 'sm', label: 'SM (280px)' },
                                        { id: 'md', label: 'MD (420px)' },
                                        { id: 'lg', label: 'LG (560px)' },
                                        { id: 'xl', label: 'XL (720px)' },
                                      ].map((sz) => (
                                        <button
                                          key={sz.id}
                                          type="button"
                                          onClick={() => setEditingArticle({ ...editingArticle, heroPngSize: sz.id })}
                                          className={`py-2.5 rounded-xl text-[11px] font-bold uppercase ${
                                            editingArticle.heroPngSize === sz.id
                                              ? 'bg-[#4a5a22] text-[#f5efe3]'
                                              : 'bg-white text-[#6b6048] border border-[#d8ceb6]'
                                          }`}
                                        >
                                          {sz.id}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-xs font-semibold text-[#2d2618]">
                                    Seleccionar Gráfico PNG/SVG
                                  </label>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {PNG_PRESETS.map((p) => (
                                      <button
                                        key={p.path}
                                        type="button"
                                        onClick={() => setEditingArticle({ ...editingArticle, heroPng: p.path })}
                                        className={`p-3 rounded-xl border text-left text-xs ${
                                          editingArticle.heroPng === p.path
                                            ? 'bg-[#4a5a22] text-[#f5efe3] border-[#4a5a22] font-semibold'
                                            : 'bg-white text-[#2d2618] border-[#d8ceb6]'
                                        }`}
                                      >
                                        {p.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs text-[#2d2618]">
                                      <span>Opacidad PNG:</span>
                                      <span className="font-mono font-bold text-[#4a5a22]">
                                        {Math.round((editingArticle.heroPngOpacity ?? 0.85) * 100)}%
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0.1"
                                      max="1.0"
                                      step="0.05"
                                      value={editingArticle.heroPngOpacity ?? 0.85}
                                      onChange={(e) =>
                                        setEditingArticle({
                                          ...editingArticle,
                                          heroPngOpacity: parseFloat(e.target.value),
                                        })
                                      }
                                      className="w-full accent-[#4a5a22]"
                                    />
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-[#2d2618]">
                                      Capa Beige sobre PNG:
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                                      <input
                                        type="checkbox"
                                        checked={editingArticle.heroPngHasBeigeOverlay || false}
                                        onChange={(e) =>
                                          setEditingArticle({
                                            ...editingArticle,
                                            heroPngHasBeigeOverlay: e.target.checked,
                                          })
                                        }
                                        className="w-4 h-4 rounded text-[#4a5a22] accent-[#4a5a22]"
                                      />
                                      <span className="text-xs text-[#2d2618]">
                                        {editingArticle.heroPngHasBeigeOverlay ? 'Activada' : 'Desactivada'}
                                      </span>
                                    </label>
                                  </div>

                                  {editingArticle.heroPngHasBeigeOverlay && (
                                    <div className="space-y-1.5">
                                      <div className="flex justify-between text-xs text-[#2d2618]">
                                        <span>Intensidad Capa Beige:</span>
                                        <span className="font-mono font-bold text-[#4a5a22]">
                                          {Math.round((editingArticle.heroPngOverlayOpacity ?? 0.25) * 100)}%
                                        </span>
                                      </div>
                                      <input
                                        type="range"
                                        min="0.05"
                                        max="0.9"
                                        step="0.05"
                                        value={editingArticle.heroPngOverlayOpacity ?? 0.25}
                                        onChange={(e) =>
                                          setEditingArticle({
                                            ...editingArticle,
                                            heroPngOverlayOpacity: parseFloat(e.target.value),
                                          })
                                        }
                                        className="w-full accent-[#4a5a22]"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* OPCIONES DE FONDO CON IMAGEN */}
                            {editingArticle.heroStyle === 'image-bg' && (
                              <div className="pt-4 border-t border-[#d8ceb6] space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                                  Opciones de Fondo con Imagen
                                </h4>
                                <div className="space-y-1.5">
                                  <label className="block text-xs font-semibold text-[#2d2618]">
                                    URL de Imagen de Fondo (o se usará la imagen principal)
                                  </label>
                                  <input
                                    type="url"
                                    value={editingArticle.heroBgImage || ''}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, heroBgImage: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs text-[#2d2618]">
                                      <span>Opacidad Imagen:</span>
                                      <span className="font-mono font-bold text-[#4a5a22]">
                                        {Math.round((editingArticle.heroBgOpacity ?? 0.3) * 100)}%
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0.1"
                                      max="1.0"
                                      step="0.05"
                                      value={editingArticle.heroBgOpacity ?? 0.3}
                                      onChange={(e) =>
                                        setEditingArticle({
                                          ...editingArticle,
                                          heroBgOpacity: parseFloat(e.target.value),
                                        })
                                      }
                                      className="w-full accent-[#4a5a22]"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs text-[#2d2618]">
                                      <span>Veladura Beige:</span>
                                      <span className="font-mono font-bold text-[#4a5a22]">
                                        {Math.round((editingArticle.heroBgOverlayOpacity ?? 0.9) * 100)}%
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0.5"
                                      max="1.0"
                                      step="0.05"
                                      value={editingArticle.heroBgOverlayOpacity ?? 0.9}
                                      onChange={(e) =>
                                        setEditingArticle({
                                          ...editingArticle,
                                          heroBgOverlayOpacity: parseFloat(e.target.value),
                                        })
                                      }
                                      className="w-full accent-[#4a5a22]"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* BOTÓN NAVEGACIÓN PASO 1 -> PASO 2 */}
                        <div className="sm:col-span-2 pt-6 border-t border-[#d8ceb6] flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="text-xs text-[#6b6048] flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#4a5a22] text-[#f5efe3] flex items-center justify-center font-bold text-[10px]">
                              1
                            </span>
                            <span>Información base y plantilla configuradas. Continúa para maquetar el contenido.</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setArticleEditorTab('content')}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Continuar al Paso 2: Maquetador Drag & Drop</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* PASO 2: MAQUETADOR DE CONTENIDO DRAG & DROP */}
                    {articleEditorTab === 'content' && (
                      <div className="space-y-6">
                        <ArticleBlockBuilder
                          blocks={editingArticle.blocks || normalizeArticleBlocks(editingArticle)}
                          onChange={(newBlocks) =>
                            setEditingArticle({ ...editingArticle, blocks: newBlocks })
                          }
                          defaultTemplate={editingArticle.detailLayout || 'classic'}
                        />

                        {/* BOTONES INFERIORES DEL PASO 2 */}
                        <div className="pt-6 border-t border-[#d8ceb6] flex flex-col sm:flex-row items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setArticleEditorTab('general')}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] hover:bg-[#f5efe3] text-xs font-semibold text-[#2d2618] transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>← Volver al Paso 1: Información & Plantilla</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSaveArticleForm}
                            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Guardar y Publicar Artículo</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TABLA DE ARTÍCULOS */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-80 relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por título o autor..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] placeholder-[#a89e88] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                  />
                  <span className="absolute left-3.5 top-3 text-[#7a6e58]">
                    <Search className="w-4 h-4" />
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'noticias', label: 'Noticias' },
                    { id: 'opinion', label: 'Opinión' },
                    { id: 'eventos', label: 'Eventos' },
                    { id: 'dialogos', label: 'Diálogos' },
                    { id: 'publicaciones', label: 'Publicaciones' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterType(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filterType === f.id
                          ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs font-semibold'
                          : 'bg-white text-[#6b6048] hover:text-[#2d2618] border border-[#d8ceb6]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#e0d6be] text-[#4a5a22] uppercase tracking-wider text-[10px] border-b border-[#d8ceb6]">
                      <tr>
                        <th className="py-4 px-6 font-semibold">Artículo</th>
                        <th className="py-4 px-4 font-semibold">Línea</th>
                        <th className="py-4 px-4 font-semibold">Diseño Tarjeta</th>
                        <th className="py-4 px-4 font-semibold">Plantilla Lectura</th>
                        <th className="py-4 px-4 font-semibold">Hero</th>
                        <th className="py-4 px-4 font-semibold">Fecha / Autor</th>
                        <th className="py-4 px-6 font-semibold text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d8ceb6]/60 text-[#2d2618]">
                      {filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-white/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.image}
                                alt=""
                                className="w-12 h-12 rounded-xl object-cover border border-[#d8ceb6] shrink-0 shadow-xs"
                              />
                              <div className="max-w-md space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-[#4a5a22] block">
                                  {art.category?.es || art.category}
                                </span>
                                <span className="font-serif text-sm text-[#2d2618] font-medium line-clamp-1 block">
                                  {art.title?.es || art.title}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 uppercase text-[10px] font-semibold text-[#4a5a22]">
                            {art.type}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-[#4a5a22]/10 border border-[#4a5a22]/30 text-[#4a5a22]">
                              {art.cardStyle === 'dark-overlay' ? '3. Inmersivo Oscuro' : '1. Clásico Vertical'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#eae4d2] border border-[#d8ceb6] text-[#2d2618]">
                              {art.detailLayout === 'immersive'
                                ? '2. Inmersiva'
                                : art.detailLayout === 'split' || art.detailLayout === 'academic'
                                ? '3. Revista Split'
                                : art.detailLayout === 'story'
                                ? '4. Storytelling'
                                : '1. Clásica'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] uppercase font-mono font-semibold bg-white border border-[#d8ceb6] text-[#2d2618]">
                              {art.heroStyle === 'png-element'
                                ? `PNG (${art.heroPngPosition === 'left' ? 'Izq' : 'Der'})`
                                : art.heroStyle === 'image-bg'
                                ? 'Imagen'
                                : 'Beige'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[11px] text-[#6b6048]">
                            <div className="text-[#2d2618] font-medium">{art.date}</div>
                            <div>{art.author}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/comunicacion?articulo=${art.id}`}
                                className="p-2 rounded-lg bg-white hover:bg-[#d8ceb6] text-[#4a5a22] border border-[#d8ceb6] transition-colors"
                                title="Ver en vivo"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleStartEditArticle(art)}
                                className="px-3 py-1.5 rounded-lg bg-[#4a5a22] hover:bg-[#384519] text-white font-semibold transition-colors flex items-center gap-1"
                                title="Editar"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              <button
                                onClick={() => handleDuplicateArticle(art)}
                                className="p-2 rounded-lg bg-white hover:bg-[#d8ceb6] text-[#2d2618] border border-[#d8ceb6] transition-colors"
                                title="Duplicar"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id, art.title?.es || art.id)}
                                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MÓDULO 2: GESTIÓN DE CAPACITACIONES (CON CADA UNO DE SUS TEMAS)
           ───────────────────────────────────────────────────────────── */}
        {adminModule === 'capacitaciones' && (
          <div className="space-y-8">
            {/* SUB-TEMA: OFERTA ACADÉMICA */}
            {trainingSubTab === 'oferta' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-[#2d2618] font-medium">
                        Oferta Académica & Estadísticas de Impacto
                      </h3>
                      <p className="text-xs text-[#6b6048]">
                        Indicadores clave mostrados en la cabecera de la sección Capacitación.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {trainingData.stats?.map((stat, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-[#d8ceb6] space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#4a5a22]">
                          Indicador #{idx + 1}
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const next = [...trainingData.stats];
                            next[idx] = { ...next[idx], value: e.target.value };
                            updateTrainingData({ stats: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#f5efe3] border border-[#d8ceb6] font-serif text-lg text-[#2d2618]"
                        />
                        <textarea
                          rows="2"
                          value={stat.label.es}
                          onChange={(e) => {
                            const next = [...trainingData.stats];
                            next[idx] = { ...next[idx], label: { ...next[idx].label, es: e.target.value } };
                            updateTrainingData({ stats: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#f5efe3] border border-[#d8ceb6] text-xs text-[#2d2618]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => showToast('Estadísticas académicas actualizadas')}
                      className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm"
                    >
                      Guardar Estadísticas
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TEMA: DIPLOMADOS */}
            {trainingSubTab === 'diplomados' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                      Diplomados Internacionales ({trainingData.diplomados.length})
                    </h3>
                    <p className="text-xs text-[#6b6048]">
                      Gestión de programas de especialización de alta duración y certificación.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingDiploma({
                        id: `dip-${Date.now()}`,
                        title: { es: '', en: '' },
                        duration: '120 horas · 4 meses',
                        dates: 'Convocatoria Abierta 2026',
                        badge: 'Certificación Internacional CGA',
                        desc: { es: '', en: '' },
                        target: { es: '', en: '' },
                        modules: ['Módulo I: Introducción y Fundamentos'],
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Diplomado</span>
                  </button>
                </div>

                {/* FORMULARIO DIPLOMADO */}
                {editingDiploma && (
                  <div className="p-6 rounded-3xl bg-[#eae4d2] border border-[#4a5a22] shadow-xl space-y-4">
                    <h4 className="font-serif text-lg text-[#2d2618]">
                      {editingDiploma.title?.es ? `Editar: ${editingDiploma.title.es}` : 'Nuevo Diplomado'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Título del Diplomado</label>
                        <input
                          type="text"
                          value={editingDiploma.title.es}
                          onChange={(e) =>
                            setEditingDiploma({
                              ...editingDiploma,
                              title: { ...editingDiploma.title, es: e.target.value },
                            })
                          }
                          placeholder="Ej. Diplomado Internacional en..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Duración & Modalidad</label>
                        <input
                          type="text"
                          value={editingDiploma.duration}
                          onChange={(e) => setEditingDiploma({ ...editingDiploma, duration: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Fechas & Inicio</label>
                        <input
                          type="text"
                          value={editingDiploma.dates}
                          onChange={(e) => setEditingDiploma({ ...editingDiploma, dates: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Insignia / Certificación</label>
                        <input
                          type="text"
                          value={editingDiploma.badge}
                          onChange={(e) => setEditingDiploma({ ...editingDiploma, badge: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Descripción del Programa</label>
                        <textarea
                          rows="3"
                          value={editingDiploma.desc.es}
                          onChange={(e) =>
                            setEditingDiploma({
                              ...editingDiploma,
                              desc: { ...editingDiploma.desc, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Público Objetivo</label>
                        <input
                          type="text"
                          value={editingDiploma.target.es}
                          onChange={(e) =>
                            setEditingDiploma({
                              ...editingDiploma,
                              target: { ...editingDiploma.target, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        onClick={() => setEditingDiploma(null)}
                        className="px-4 py-2 rounded-xl bg-white text-[#6b6048] border border-[#d8ceb6] text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveDiploma(editingDiploma)}
                        className="px-5 py-2 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider"
                      >
                        Guardar Diplomado
                      </button>
                    </div>
                  </div>
                )}

                {/* LISTA DE DIPLOMADOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainingData.diplomados.map((dip) => (
                    <div
                      key={dip.id}
                      className="p-6 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#4a5a22]/15 text-[#4a5a22] text-[10px] font-bold uppercase tracking-wider">
                          {dip.badge}
                        </span>
                        <h4 className="font-serif text-lg text-[#2d2618] font-medium leading-snug">
                          {dip.title?.es}
                        </h4>
                        <p className="text-xs text-[#6b6048]">{dip.duration}</p>
                        <p className="text-xs text-[#2d2618] font-light line-clamp-2">{dip.desc?.es}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#d8ceb6]">
                        <span className="text-[11px] font-mono text-[#4a5a22] font-semibold">{dip.dates}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingDiploma(JSON.parse(JSON.stringify(dip)))}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#d8ceb6] text-xs font-semibold text-[#2d2618] border border-[#d8ceb6]"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteDiploma(dip.id)}
                            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TEMA: CURSOS & TALLERES */}
            {trainingSubTab === 'cursos' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                      Cursos & Talleres Prácticos ({trainingData.cursos.length})
                    </h3>
                    <p className="text-xs text-[#6b6048]">
                      Gestión de talleres intensivos y cursos técnicos de campo y laboratorio.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingCourse({
                        id: `cur-${Date.now()}`,
                        title: { es: '', en: '' },
                        hours: '30 horas · Virtual en Vivo',
                        dates: 'Próximamente',
                        desc: { es: '', en: '' },
                        instructor: 'CGA Claustro Docente',
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Curso / Taller</span>
                  </button>
                </div>

                {editingCourse && (
                  <div className="p-6 rounded-3xl bg-[#eae4d2] border border-[#4a5a22] shadow-xl space-y-4">
                    <h4 className="font-serif text-lg text-[#2d2618]">Editar Curso / Taller</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Título del Curso</label>
                        <input
                          type="text"
                          value={editingCourse.title.es}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              title: { ...editingCourse.title, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Horas & Modalidad</label>
                        <input
                          type="text"
                          value={editingCourse.hours}
                          onChange={(e) => setEditingCourse({ ...editingCourse, hours: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Fechas</label>
                        <input
                          type="text"
                          value={editingCourse.dates}
                          onChange={(e) => setEditingCourse({ ...editingCourse, dates: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Instructor / Facilitador</label>
                        <input
                          type="text"
                          value={editingCourse.instructor}
                          onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Descripción del Contenido</label>
                        <textarea
                          rows="3"
                          value={editingCourse.desc.es}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              desc: { ...editingCourse.desc, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        onClick={() => setEditingCourse(null)}
                        className="px-4 py-2 rounded-xl bg-white text-[#6b6048] border border-[#d8ceb6] text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveCourse(editingCourse)}
                        className="px-5 py-2 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider"
                      >
                        Guardar Taller
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainingData.cursos.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-[#4a5a22] uppercase tracking-wider">
                          {c.hours}
                        </span>
                        <h4 className="font-serif text-base text-[#2d2618] font-medium leading-snug">
                          {c.title?.es}
                        </h4>
                        <p className="text-xs text-[#6b6048]">Instructor: {c.instructor}</p>
                        <p className="text-xs text-[#2d2618] font-light line-clamp-2">{c.desc?.es}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#d8ceb6]">
                        <span className="text-[11px] font-mono text-[#6b6048]">{c.dates}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingCourse(JSON.parse(JSON.stringify(c)))}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#d8ceb6] text-xs font-medium text-[#2d2618]"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(c.id)}
                            className="p-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TEMA: CONFERENCIAS */}
            {trainingSubTab === 'conferencias' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                      Conferencias Magistrales & Foros Globales ({trainingData.webinars.length})
                    </h3>
                    <p className="text-xs text-[#6b6048]">
                      Gestión de ciclos de webinars internacionales y ponencias científicas.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingWebinar({
                        id: `web-${Date.now()}`,
                        title: { es: '', en: '' },
                        speaker: 'Dra. / Dr. Invitado',
                        date: '2026',
                        type: 'Webinar Abierto · Transmisión Global',
                        summary: { es: '', en: '' },
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Conferencia</span>
                  </button>
                </div>

                {editingWebinar && (
                  <div className="p-6 rounded-3xl bg-[#eae4d2] border border-[#4a5a22] shadow-xl space-y-4">
                    <h4 className="font-serif text-lg text-[#2d2618]">Editar Conferencia</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Título de la Conferencia</label>
                        <input
                          type="text"
                          value={editingWebinar.title.es}
                          onChange={(e) =>
                            setEditingWebinar({
                              ...editingWebinar,
                              title: { ...editingWebinar.title, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Ponente / Conferencista</label>
                        <input
                          type="text"
                          value={editingWebinar.speaker}
                          onChange={(e) => setEditingWebinar({ ...editingWebinar, speaker: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Fecha & Horario</label>
                        <input
                          type="text"
                          value={editingWebinar.date}
                          onChange={(e) => setEditingWebinar({ ...editingWebinar, date: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Tipo de Evento</label>
                        <input
                          type="text"
                          value={editingWebinar.type}
                          onChange={(e) => setEditingWebinar({ ...editingWebinar, type: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Resumen</label>
                        <textarea
                          rows="3"
                          value={editingWebinar.summary.es}
                          onChange={(e) =>
                            setEditingWebinar({
                              ...editingWebinar,
                              summary: { ...editingWebinar.summary, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        onClick={() => setEditingWebinar(null)}
                        className="px-4 py-2 rounded-xl bg-white text-[#6b6048] border border-[#d8ceb6] text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveWebinar(editingWebinar)}
                        className="px-5 py-2 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider"
                      >
                        Guardar Conferencia
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainingData.webinars.map((w) => (
                    <div
                      key={w.id}
                      className="p-5 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#4a5a22] uppercase tracking-wider">
                          {w.type}
                        </span>
                        <h4 className="font-serif text-base text-[#2d2618] font-medium leading-snug">
                          {w.title?.es}
                        </h4>
                        <p className="text-xs text-[#6b6048] font-medium">{w.speaker}</p>
                        <p className="text-xs text-[#2d2618] font-light line-clamp-2">{w.summary?.es}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#d8ceb6]">
                        <span className="text-[11px] font-mono text-[#4a5a22]">{w.date}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingWebinar(JSON.parse(JSON.stringify(w)))}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#d8ceb6] text-xs font-medium text-[#2d2618]"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteWebinar(w.id)}
                            className="p-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TEMA: PROGRAMAS PARA ORGANIZACIONES (100% CONFIGURABLE) */}
            {trainingSubTab === 'organizaciones' && (() => {
              const org = trainingData.organizaciones || {
                subtitle: { es: 'Soluciones Institucionales a Medida', en: 'Tailored Institutional Solutions' },
                title: { es: 'Programas para Organizaciones, Gobiernos y Empresas', en: 'Custom Programs for Organizations, Governments & Corporations' },
                description: {
                  es: 'Diseñamos diagnósticos integrales de madurez ecológica y capacitamos a gabinetes ministeriales, equipos de sostenibilidad corporativa (ESG), operadores de agua y comunidades territoriales mediante currículas cerradas in-situ o en campus virtual exclusivo.',
                  en: 'We design comprehensive ecological maturity assessments and train ministerial cabinets, corporate sustainability teams, water operators and community councils with private on-site or online curricula.',
                },
                ctaText: { es: 'Solicitar Propuesta para mi Organización', en: 'Request Proposal for my Organization' },
                programs: [],
                benefits: [],
              };

              const programs = org.programs || [];
              const benefits = org.benefits || [];

              return (
                <div className="space-y-8">
                  {/* HEADER & ACCIÓN RÁPIDA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] text-[10px] font-bold uppercase tracking-wider font-sans">
                          Módulo B2B / Institucional
                        </span>
                        <span className="text-xs text-[#6b6048]">
                          ({programs.length} programas configurados)
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                        Programas para Organizaciones & Gobiernos
                      </h3>
                      <p className="text-xs text-[#6b6048]">
                        Administra los textos institucionales, el catálogo de programas cerrados y las ventajas operativas.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditingOrgProgram({
                          id: `org-prog-${Date.now()}`,
                          sector: 'In-Company Corporativo',
                          tag: 'Capacitación Ejecutiva',
                          badge: 'Certificación Oficial CGA',
                          title: { es: '', en: '' },
                          desc: { es: '', en: '' },
                          modalities: ['In-Company', 'Virtual Sincrónico', 'Talleres In-Situ'],
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Programa Institucional</span>
                    </button>
                  </div>

                  {/* MODAL / FORMULARIO EDICIÓN DE PROGRAMA INSTITUCIONAL */}
                  {editingOrgProgram && (
                    <div className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2] border border-[#4a5a22] shadow-xl space-y-6">
                      <div className="flex items-center justify-between border-b border-[#d8ceb6] pb-4">
                        <h4 className="font-serif text-xl text-[#2d2618]">
                          {editingOrgProgram.title?.es
                            ? `Editar: ${editingOrgProgram.title.es}`
                            : 'Nuevo Programa para Organizaciones'}
                        </h4>
                        <button
                          onClick={() => setEditingOrgProgram(null)}
                          className="p-1.5 rounded-full hover:bg-[#d8ceb6] text-[#6b6048]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Sector / Público</label>
                          <input
                            type="text"
                            value={editingOrgProgram.sector || ''}
                            onChange={(e) =>
                              setEditingOrgProgram({ ...editingOrgProgram, sector: e.target.value })
                            }
                            placeholder="Ej. Sector Público & Cuencas"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Etiqueta / Categoría</label>
                          <input
                            type="text"
                            value={editingOrgProgram.tag || ''}
                            onChange={(e) =>
                              setEditingOrgProgram({ ...editingOrgProgram, tag: e.target.value })
                            }
                            placeholder="Ej. Formatos Cerrados / In-Situ"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Insignia / Badge</label>
                          <input
                            type="text"
                            value={editingOrgProgram.badge || ''}
                            onChange={(e) =>
                              setEditingOrgProgram({ ...editingOrgProgram, badge: e.target.value })
                            }
                            placeholder="Ej. Certificación Oficial CGA"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-[#4a5a22]">Título del Programa (Español)</label>
                            <input
                              type="text"
                              value={editingOrgProgram.title?.es || ''}
                              onChange={(e) =>
                                setEditingOrgProgram({
                                  ...editingOrgProgram,
                                  title: { ...editingOrgProgram.title, es: e.target.value },
                                })
                              }
                              placeholder="Ej. Formación de Gabinetes en Gobernanza Territorial"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-[#4a5a22]">Título del Programa (Inglés)</label>
                            <input
                              type="text"
                              value={editingOrgProgram.title?.en || ''}
                              onChange={(e) =>
                                setEditingOrgProgram({
                                  ...editingOrgProgram,
                                  title: { ...editingOrgProgram.title, en: e.target.value },
                                })
                              }
                              placeholder="Ej. Cabinet Training in Territorial Governance"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-[#4a5a22]">Descripción (Español)</label>
                            <textarea
                              rows={3}
                              value={editingOrgProgram.desc?.es || ''}
                              onChange={(e) =>
                                setEditingOrgProgram({
                                  ...editingOrgProgram,
                                  desc: { ...editingOrgProgram.desc, es: e.target.value },
                                })
                              }
                              placeholder="Detalla los alcances, temáticas y valor institucional..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-[#4a5a22]">Descripción (Inglés)</label>
                            <textarea
                              rows={3}
                              value={editingOrgProgram.desc?.en || ''}
                              onChange={(e) =>
                                setEditingOrgProgram({
                                  ...editingOrgProgram,
                                  desc: { ...editingOrgProgram.desc, en: e.target.value },
                                })
                              }
                              placeholder="Describe scopes and institutional value..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="font-bold text-[#4a5a22]">
                            Modalidades / Formatos (Separados por coma)
                          </label>
                          <input
                            type="text"
                            value={(editingOrgProgram.modalities || []).join(', ')}
                            onChange={(e) =>
                              setEditingOrgProgram({
                                ...editingOrgProgram,
                                modalities: e.target.value
                                  .split(',')
                                  .map((m) => m.trim())
                                  .filter(Boolean),
                              })
                            }
                            placeholder="Ej. In-Company, Virtual Sincrónico, Talleres In-Situ"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#d8ceb6]">
                        <button
                          onClick={() => setEditingOrgProgram(null)}
                          className="px-4 py-2 rounded-full border border-[#d8ceb6] text-xs font-semibold text-[#6b6048] hover:bg-white transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveOrgProgram(editingOrgProgram)}
                          className="px-6 py-2 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          Guardar Programa
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 1. CONFIGURACIÓN DE TEXTOS GENERALES & CTA */}
                  <div className="p-6 rounded-3xl bg-white border border-[#d8ceb6] space-y-6 shadow-xs">
                    <div className="border-b border-[#eae4d2] pb-3">
                      <h4 className="font-serif text-lg text-[#2d2618]">
                        Textos Principales del Encabezado & Llamado a la Acción
                      </h4>
                      <p className="text-xs text-[#6b6048]">
                        Personaliza los títulos, subtítulos y descripción que ven los visitantes al entrar a esta sección.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Subtítulo (Español)</label>
                        <input
                          type="text"
                          value={org.subtitle?.es || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                subtitle: { ...(prev.organizaciones?.subtitle || {}), es: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Subtítulo (Inglés)</label>
                        <input
                          type="text"
                          value={org.subtitle?.en || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                subtitle: { ...(prev.organizaciones?.subtitle || {}), en: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Título Principal (Español)</label>
                        <input
                          type="text"
                          value={org.title?.es || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                title: { ...(prev.organizaciones?.title || {}), es: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Título Principal (Inglés)</label>
                        <input
                          type="text"
                          value={org.title?.en || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                title: { ...(prev.organizaciones?.title || {}), en: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Descripción Institucional (Español)</label>
                        <textarea
                          rows={2}
                          value={org.description?.es || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                description: { ...(prev.organizaciones?.description || {}), es: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Texto del Botón CTA (Español)</label>
                        <input
                          type="text"
                          value={org.ctaText?.es || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                ctaText: { ...(prev.organizaciones?.ctaText || {}), es: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Texto del Botón CTA (Inglés)</label>
                        <input
                          type="text"
                          value={org.ctaText?.en || ''}
                          onChange={(e) =>
                            updateTrainingData((prev) => ({
                              ...prev,
                              organizaciones: {
                                ...(prev.organizaciones || {}),
                                ctaText: { ...(prev.organizaciones?.ctaText || {}), en: e.target.value },
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. CATÁLOGO DE PROGRAMAS INSTITUCIONALES (CARDS CRUD) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg text-[#2d2618]">
                        Catálogo de Programas Disponibles ({programs.length})
                      </h4>
                      <span className="text-xs text-[#6b6048]">
                        Organizaciones, Empresas y Gabinetes de Gobierno
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {programs.map((p) => (
                        <div
                          key={p.id}
                          className="p-5 rounded-2xl bg-white border border-[#d8ceb6] shadow-xs flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] text-[10px] font-bold uppercase tracking-wider font-sans">
                                {p.sector || 'Sector Especializado'}
                              </span>
                              {p.badge && (
                                <span className="text-[10px] font-mono text-[#8c6818] font-semibold">
                                  {p.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-[#6b6048] block uppercase">
                              {p.tag}
                            </span>
                            <h5 className="font-serif text-base text-[#2d2618] font-medium leading-snug">
                              {p.title?.es || p.title}
                            </h5>
                            <p className="text-xs text-[#5c523e] line-clamp-2">
                              {p.desc?.es || p.desc}
                            </p>

                            {p.modalities && p.modalities.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {p.modalities.map((m, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="px-2 py-0.5 rounded-md bg-[#eae4d2] text-[#4a5a22] text-[10px] font-medium"
                                  >
                                    • {m}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eae4d2]">
                            <button
                              onClick={() => setEditingOrgProgram(JSON.parse(JSON.stringify(p)))}
                              className="px-3 py-1.5 rounded-lg bg-[#eae4d2] hover:bg-[#d8ceb6] text-[#2d2618] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => handleDeleteOrgProgram(p.id)}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
                              title="Eliminar programa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. BENEFICIOS Y VALOR INSTITUCIONAL (LISTA DE PUNTOS) */}
                  <div className="p-6 rounded-3xl bg-white border border-[#d8ceb6] space-y-6 shadow-xs">
                    <div>
                      <h4 className="font-serif text-lg text-[#2d2618]">
                        Ventajas y Beneficios de los Programas Institucionales ({benefits.length})
                      </h4>
                      <p className="text-xs text-[#6b6048]">
                        Puntos clave que diferencian las soluciones a medida del Centro de Gobernanza Ambiental.
                      </p>
                    </div>

                    {/* Lista actual de beneficios */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {benefits.map((b, bIdx) => (
                        <div
                          key={bIdx}
                          className="p-3 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#4a5a22] shrink-0" />
                            <span className="text-[#2d2618] font-medium">
                              {typeof b === 'string' ? b : b.es || b.en}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteOrgBenefit(bIdx)}
                            className="p-1 rounded-lg hover:bg-red-100 text-red-700 transition-colors shrink-0"
                            title="Eliminar beneficio"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Agregar nuevo beneficio */}
                    <div className="p-4 rounded-2xl bg-[#eae4d2]/70 border border-[#d8ceb6] space-y-3">
                      <span className="text-xs font-bold text-[#4a5a22] uppercase tracking-wider block">
                        + Agregar Nuevo Beneficio / Ventaja
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={newOrgBenefitEs}
                          onChange={(e) => setNewOrgBenefitEs(e.target.value)}
                          placeholder="Descripción del beneficio (Español)..."
                          className="px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs"
                        />
                        <input
                          type="text"
                          value={newOrgBenefitEn}
                          onChange={(e) => setNewOrgBenefitEn(e.target.value)}
                          placeholder="Benefit description (English)..."
                          className="px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleAddOrgBenefit(newOrgBenefitEs, newOrgBenefitEn)}
                          disabled={!newOrgBenefitEs.trim()}
                          className="px-5 py-2 rounded-full bg-[#4a5a22] hover:bg-[#384519] disabled:opacity-50 text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                        >
                          Agregar Beneficio
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SUB-TEMA: ESPECIALISTAS */}
            {trainingSubTab === 'especialistas' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                      Claustro de Especialistas & Profesores ({trainingData.especialistas.length})
                    </h3>
                    <p className="text-xs text-[#6b6048]">
                      Gestión de científicos, catedráticos y líderes territoriales de la Academia.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingSpecialist({
                        id: `esp-${Date.now()}`,
                        name: '',
                        role: { es: '', en: '' },
                        credentials: '',
                        expertise: { es: '', en: '' },
                        origin: 'México',
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Especialista</span>
                  </button>
                </div>

                {editingSpecialist && (
                  <div className="p-6 rounded-3xl bg-[#eae4d2] border border-[#4a5a22] shadow-xl space-y-4">
                    <h4 className="font-serif text-lg text-[#2d2618]">Editar Especialista</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Nombre Completo</label>
                        <input
                          type="text"
                          value={editingSpecialist.name}
                          onChange={(e) => setEditingSpecialist({ ...editingSpecialist, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">País / Sede</label>
                        <input
                          type="text"
                          value={editingSpecialist.origin}
                          onChange={(e) => setEditingSpecialist({ ...editingSpecialist, origin: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Cargo Institucional</label>
                        <input
                          type="text"
                          value={editingSpecialist.role.es}
                          onChange={(e) =>
                            setEditingSpecialist({
                              ...editingSpecialist,
                              role: { ...editingSpecialist.role, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#4a5a22]">Credenciales Académicas</label>
                        <input
                          type="text"
                          value={editingSpecialist.credentials}
                          onChange={(e) =>
                            setEditingSpecialist({ ...editingSpecialist, credentials: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[#4a5a22]">Áreas de Especialidad</label>
                        <textarea
                          rows="3"
                          value={editingSpecialist.expertise.es}
                          onChange={(e) =>
                            setEditingSpecialist({
                              ...editingSpecialist,
                              expertise: { ...editingSpecialist.expertise, es: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        onClick={() => setEditingSpecialist(null)}
                        className="px-4 py-2 rounded-xl bg-white text-[#6b6048] border border-[#d8ceb6] text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveSpecialist(editingSpecialist)}
                        className="px-5 py-2 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider"
                      >
                        Guardar Especialista
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainingData.especialistas.map((s) => (
                    <div
                      key={s.id}
                      className="p-5 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#6b6048]">{s.origin}</span>
                        </div>
                        <h4 className="font-serif text-base text-[#2d2618] font-medium">{s.name}</h4>
                        <p className="text-xs text-[#4a5a22] font-medium">{s.role?.es}</p>
                        <p className="text-[11px] text-[#6b6048] font-mono">{s.credentials}</p>
                        <p className="text-xs text-[#2d2618] font-light line-clamp-3 pt-1">{s.expertise?.es}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#d8ceb6]">
                        <button
                          onClick={() => setEditingSpecialist(JSON.parse(JSON.stringify(s)))}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#d8ceb6] text-xs font-medium text-[#2d2618]"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteSpecialist(s.id)}
                          className="p-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TEMA: CALENDARIO ACADÉMICO INTERACTIVO (CRUD & VISTA VISUAL DE CALENDARIO) */}
            {trainingSubTab === 'calendario' && (() => {
              const eventsList = getUnifiedAcademicCalendar(trainingData);

              const MONTH_NAMES = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
              ];
              const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

              const daysInMonth = new Date(adminCalYear, adminCalMonthOffset + 1, 0).getDate();
              const firstDayIndex = (new Date(adminCalYear, adminCalMonthOffset, 1).getDay() + 6) % 7; // Lunes = 0
              const monthPrefix = `${adminCalYear}-${String(adminCalMonthOffset + 1).padStart(2, '0')}`;

              // Filtrado de eventos para la lista
              const filteredEvents = eventsList.filter((ev) => {
                const matchCategory = adminCalFilter === 'all' || ev.category === adminCalFilter;
                const q = adminCalSearch.toLowerCase();
                const titleEs = ev.title?.es || (typeof ev.title === 'string' ? ev.title : '');
                const titleEn = ev.title?.en || '';
                const matchSearch =
                  !q ||
                  titleEs.toLowerCase().includes(q) ||
                  titleEn.toLowerCase().includes(q) ||
                  (ev.date || '').includes(q) ||
                  (ev.modality || '').toLowerCase().includes(q);
                return matchCategory && matchSearch;
              });

              // Color badges por categoría
              const getCategoryStyle = (cat) => {
                switch (cat) {
                  case 'Diplomado':
                    return 'bg-[#4a5a22] text-[#f5efe3]';
                  case 'Cursos & Talleres':
                  case 'Curso / Taller':
                    return 'bg-[#8c4a2f] text-[#f5efe3]';
                  case 'Conferencia':
                    return 'bg-[#205466] text-[#f5efe3]';
                  case 'Beca & Convocatoria':
                    return 'bg-[#8c6818] text-[#f5efe3]';
                  case 'In-Company':
                    return 'bg-[#5c3d75] text-[#f5efe3]';
                  default:
                    return 'bg-[#4a5a22] text-[#f5efe3]';
                }
              };

              return (
                <div className="space-y-8">
                  {/* HEADER & ACCIÓN RÁPIDA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] text-[10px] font-bold uppercase tracking-wider font-sans">
                          Agenda Académica Dinámica
                        </span>
                        <span className="text-xs text-[#6b6048]">
                          ({eventsList.length} eventos registrados)
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                        Calendario Académico & Fechas Clave
                      </h3>
                      <p className="text-xs text-[#6b6048]">
                        Gestiona inicios de diplomados, talleres, conferencias magistrales y cierres de postulaciones.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditingCalendarEvent({
                          id: `cal-${Date.now()}`,
                          date: `${adminCalYear}-${String(adminCalMonthOffset + 1).padStart(2, '0')}-15`,
                          time: '17:00 hrs CDMX',
                          category: 'Diplomado',
                          modality: 'Modalidad Híbrida',
                          title: { es: '', en: '' },
                          desc: { es: '', en: '' },
                          link: '/capacitacion',
                          featured: false,
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Evento en Calendario</span>
                    </button>
                  </div>

                  {/* FORMULARIO / MODAL DE EDICIÓN DE EVENTO */}
                  {editingCalendarEvent && (
                    <div className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2] border border-[#4a5a22] shadow-xl space-y-6">
                      <div className="flex items-center justify-between border-b border-[#d8ceb6] pb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-[#4a5a22]" />
                          <h4 className="font-serif text-xl text-[#2d2618]">
                            {editingCalendarEvent.title?.es
                              ? `Editar Evento: ${editingCalendarEvent.title.es}`
                              : 'Registrar Nuevo Evento en Calendario'}
                          </h4>
                        </div>
                        <button
                          onClick={() => setEditingCalendarEvent(null)}
                          className="p-1.5 rounded-full hover:bg-[#d8ceb6] text-[#6b6048]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Fecha del Evento</label>
                          <input
                            type="date"
                            value={editingCalendarEvent.date || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({ ...editingCalendarEvent, date: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Horario / Hora</label>
                          <input
                            type="text"
                            value={editingCalendarEvent.time || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({ ...editingCalendarEvent, time: e.target.value })
                            }
                            placeholder="Ej. 17:00 hrs CDMX / 18:00 hrs CET"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Categoría</label>
                          <select
                            value={editingCalendarEvent.category || 'Diplomado'}
                            onChange={(e) =>
                              setEditingCalendarEvent({ ...editingCalendarEvent, category: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          >
                            <option value="Diplomado">Diplomado</option>
                            <option value="Cursos & Talleres">Cursos & Talleres</option>
                            <option value="Conferencia">Conferencia</option>
                            <option value="Beca & Convocatoria">Beca & Convocatoria</option>
                            <option value="In-Company">In-Company</option>
                            <option value="General">General</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-[#4a5a22]">Modalidad</label>
                          <input
                            type="text"
                            value={editingCalendarEvent.modality || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({ ...editingCalendarEvent, modality: e.target.value })
                            }
                            placeholder="Ej. Virtual en Vivo / Híbrido"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="font-bold text-[#4a5a22]">Título del Evento (Español)</label>
                          <input
                            type="text"
                            value={editingCalendarEvent.title?.es || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({
                                ...editingCalendarEvent,
                                title: { ...editingCalendarEvent.title, es: e.target.value },
                              })
                            }
                            placeholder="Ej. Inicio de Clases: Diplomado en Gobernanza Socioambiental"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="font-bold text-[#4a5a22]">Título del Evento (Inglés)</label>
                          <input
                            type="text"
                            value={editingCalendarEvent.title?.en || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({
                                ...editingCalendarEvent,
                                title: { ...editingCalendarEvent.title, en: e.target.value },
                              })
                            }
                            placeholder="Ej. Classes Begin: Socio-Environmental Governance Diploma"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="font-bold text-[#4a5a22]">Descripción Breve (Español)</label>
                          <textarea
                            rows={2}
                            value={editingCalendarEvent.desc?.es || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({
                                ...editingCalendarEvent,
                                desc: { ...editingCalendarEvent.desc, es: e.target.value },
                              })
                            }
                            placeholder="Detalles sobre sesión inaugural, temario o link de sala..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="font-bold text-[#4a5a22]">Descripción Breve (Inglés)</label>
                          <textarea
                            rows={2}
                            value={editingCalendarEvent.desc?.en || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({
                                ...editingCalendarEvent,
                                desc: { ...editingCalendarEvent.desc, en: e.target.value },
                              })
                            }
                            placeholder="Brief description of the event..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="font-bold text-[#4a5a22]">Enlace de Registro o Destino</label>
                          <input
                            type="text"
                            value={editingCalendarEvent.link || ''}
                            onChange={(e) =>
                              setEditingCalendarEvent({ ...editingCalendarEvent, link: e.target.value })
                            }
                            placeholder="Ej. /capacitacion o enlace externo de registro"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6]"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2d2618]">
                            <input
                              type="checkbox"
                              checked={!!editingCalendarEvent.featured}
                              onChange={(e) =>
                                setEditingCalendarEvent({
                                  ...editingCalendarEvent,
                                  featured: e.target.checked,
                                })
                              }
                              className="rounded text-[#4a5a22] focus:ring-[#4a5a22]"
                            />
                            <span>Destacar evento en portada</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#d8ceb6]">
                        <button
                          onClick={() => setEditingCalendarEvent(null)}
                          className="px-4 py-2 rounded-full border border-[#d8ceb6] text-xs font-semibold text-[#6b6048] hover:bg-white transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveCalendarEvent(editingCalendarEvent)}
                          className="px-6 py-2 rounded-full bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          Guardar Evento
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 1. VISTA VISUAL DE CALENDARIO MENSUAL */}
                  <div className="p-6 rounded-3xl bg-white border border-[#d8ceb6] space-y-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eae4d2] pb-4">
                      <div>
                        <h4 className="font-serif text-lg text-[#2d2618]">
                          Vista Interactiva de Calendario
                        </h4>
                        <p className="text-xs text-[#6b6048]">
                          Haz clic en cualquier día para crear un evento en esa fecha o inspeccionar sus actividades.
                        </p>
                      </div>

                      {/* Navegador de Mes */}
                      <div className="flex items-center gap-2 bg-[#eae4d2] p-1.5 rounded-full border border-[#d8ceb6]">
                        <button
                          onClick={() => {
                            if (adminCalMonthOffset === 0) {
                              setAdminCalMonthOffset(11);
                              setAdminCalYear(adminCalYear - 1);
                            } else {
                              setAdminCalMonthOffset(adminCalMonthOffset - 1);
                            }
                          }}
                          className="p-1.5 rounded-full hover:bg-white text-[#2d2618] transition-colors"
                        >
                          &larr;
                        </button>
                        <span className="text-xs font-serif font-semibold text-[#2d2618] px-3 min-w-[130px] text-center">
                          {MONTH_NAMES[adminCalMonthOffset]} {adminCalYear}
                        </span>
                        <button
                          onClick={() => {
                            if (adminCalMonthOffset === 11) {
                              setAdminCalMonthOffset(0);
                              setAdminCalYear(adminCalYear + 1);
                            } else {
                              setAdminCalMonthOffset(adminCalMonthOffset + 1);
                            }
                          }}
                          className="p-1.5 rounded-full hover:bg-white text-[#2d2618] transition-colors"
                        >
                          &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Matriz 7 Días */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {WEEKDAYS.map((w, idx) => (
                        <div
                          key={idx}
                          className="py-2 text-center text-[11px] font-mono font-bold uppercase text-[#6b6048] bg-[#f5efe3] rounded-lg"
                        >
                          {w}
                        </div>
                      ))}

                      {/* Espacios vacíos antes del día 1 */}
                      {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="min-h-[85px] p-2 bg-[#fcfaf7] rounded-xl border border-dashed border-[#eae4d2]/70 opacity-40"
                        />
                      ))}

                      {/* Celdas de los días del mes */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const dateStr = `${adminCalYear}-${String(adminCalMonthOffset + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                        const dayEvents = eventsList.filter((ev) => ev.date === dateStr);
                        const hasEvents = dayEvents.length > 0;

                        return (
                          <div
                            key={`day-${dayNum}`}
                            onClick={() => {
                              setEditingCalendarEvent({
                                id: `cal-${Date.now()}`,
                                date: dateStr,
                                time: '17:00 hrs CDMX',
                                category: 'Diplomado',
                                modality: 'Modalidad Híbrida',
                                title: { es: '', en: '' },
                                desc: { es: '', en: '' },
                                link: '/capacitacion',
                                featured: false,
                              });
                            }}
                            className={`min-h-[90px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                              hasEvents
                                ? 'bg-[#f5efe3] border-[#4a5a22]/50 shadow-xs hover:border-[#4a5a22]'
                                : 'bg-white border-[#eae4d2] hover:bg-[#faf6ee] hover:border-[#d8ceb6]'
                            }`}
                            title="Haz clic para registrar un evento en esta fecha"
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-serif font-bold ${
                                  hasEvents ? 'text-[#4a5a22]' : 'text-[#6b6048]'
                                }`}
                              >
                                {dayNum}
                              </span>
                              {hasEvents && (
                                <span className="w-2 h-2 rounded-full bg-[#4a5a22]" />
                              )}
                            </div>

                            <div className="space-y-1 mt-1">
                              {dayEvents.slice(0, 2).map((ev) => (
                                <div
                                  key={ev.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingCalendarEvent(JSON.parse(JSON.stringify(ev)));
                                  }}
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-medium truncate ${getCategoryStyle(
                                    ev.category
                                  )}`}
                                  title={`${ev.time || ''} - ${ev.title?.es || ev.title}`}
                                >
                                  {ev.title?.es || ev.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <span className="text-[9px] text-[#6b6048] font-mono block text-center">
                                  +{dayEvents.length - 2} más
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. TABLA / LISTA DE EVENTOS REGISTRADOS */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h4 className="font-serif text-lg text-[#2d2618]">
                        Listado de Eventos ({filteredEvents.length})
                      </h4>

                      {/* Buscador y Filtros */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6048]" />
                          <input
                            type="text"
                            value={adminCalSearch}
                            onChange={(e) => setAdminCalSearch(e.target.value)}
                            placeholder="Buscar en calendario..."
                            className="pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#d8ceb6] text-xs w-44"
                          />
                        </div>

                        <select
                          value={adminCalFilter}
                          onChange={(e) => setAdminCalFilter(e.target.value)}
                          className="px-3 py-1.5 rounded-full bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                        >
                          <option value="all">Todas las categorías</option>
                          <option value="Diplomado">Diplomados</option>
                          <option value="Cursos & Talleres">Cursos & Talleres</option>
                          <option value="Conferencia">Conferencias</option>
                          <option value="Beca & Convocatoria">Becas & Convocatorias</option>
                          <option value="In-Company">In-Company</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#d8ceb6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-full bg-[#eae4d2] text-[#4a5a22] font-mono text-[11px] font-bold">
                                {ev.date || 'Sin fecha'}
                              </span>
                              {ev.time && (
                                <span className="text-[11px] text-[#6b6048] font-mono flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {ev.time}
                                </span>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryStyle(
                                  ev.category
                                )}`}
                              >
                                {ev.category || 'General'}
                              </span>
                              {ev.modality && (
                                <span className="text-[11px] text-[#8a7e68]">
                                  • {ev.modality}
                                </span>
                              )}
                              {ev.autoGenerated && (
                                <span className="px-2 py-0.5 rounded-full bg-[#4a5a22]/15 text-[#4a5a22] text-[10px] font-bold font-sans">
                                  Sincronizado de {ev.category}
                                </span>
                              )}
                            </div>

                            <h5 className="font-serif text-base text-[#2d2618] font-medium">
                              {ev.title?.es || ev.title}
                            </h5>

                            {ev.desc?.es && (
                              <p className="text-xs text-[#5c523e] line-clamp-1 max-w-3xl">
                                {ev.desc.es}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setEditingCalendarEvent(JSON.parse(JSON.stringify(ev)))}
                              className="px-3 py-1.5 rounded-lg bg-[#eae4d2] hover:bg-[#d8ceb6] text-[#2d2618] text-xs font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => handleDuplicateCalendarEvent(ev)}
                              className="p-1.5 rounded-lg bg-[#eae4d2] hover:bg-[#d8ceb6] text-[#2d2618] transition-colors"
                              title="Duplicar evento"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCalendarEvent(ev.id, ev)}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
                              title="Eliminar evento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {filteredEvents.length === 0 && (
                        <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#d8ceb6] text-xs text-[#6b6048]">
                          No se encontraron eventos con los filtros seleccionados.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SUB-TEMA: INSCRIPCIONES (BANDEJA DE SOLICITUDES) */}
            {trainingSubTab === 'inscripciones' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                      Bandeja de Inscripciones & Solicitudes ({applications.length})
                    </h3>
                    <p className="text-xs text-[#6b6048]">
                      Registro en tiempo real de postulantes a diplomados y solicitudes de becas.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#e0d6be] text-[#4a5a22] uppercase tracking-wider text-[10px] border-b border-[#d8ceb6]">
                      <tr>
                        <th className="py-4 px-6 font-semibold">Postulante</th>
                        <th className="py-4 px-4 font-semibold">Programa Elegido</th>
                        <th className="py-4 px-4 font-semibold">Organización / Contacto</th>
                        <th className="py-4 px-4 font-semibold">Beca</th>
                        <th className="py-4 px-4 font-semibold">Estado</th>
                        <th className="py-4 px-6 font-semibold text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d8ceb6]/60 text-[#2d2618]">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-medium text-sm text-[#2d2618]">{app.name}</div>
                            <div className="text-[11px] text-[#6b6048]">{app.date}</div>
                          </td>
                          <td className="py-4 px-4 font-serif text-xs text-[#2d2618] max-w-xs">
                            {app.program}
                          </td>
                          <td className="py-4 px-4 text-[11px] text-[#6b6048]">
                            <div className="text-[#2d2618] font-medium">{app.org || 'Independiente'}</div>
                            <div>{app.email}</div>
                            <div>{app.phone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                app.scholarship === 'si'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-stone-200 text-stone-700'
                              }`}
                            >
                              {app.scholarship === 'si' ? 'Solicita Beca' : 'Ordinario'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-[#d8ceb6] text-[11px] font-semibold text-[#4a5a22]"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En Revisión">En Revisión</option>
                              <option value="Aprobada">Aprobada</option>
                              <option value="Rechazada">Rechazada</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Eliminar la solicitud de ${app.name}?`)) {
                                  deleteApplication(app.id);
                                  showToast('Solicitud eliminada');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800"
                              title="Eliminar solicitud"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MÓDULO 3: GESTIÓN DE COMUNICACIONES & SALA DE PRENSA
           ───────────────────────────────────────────────────────────── */}
        {adminModule === 'comunicaciones' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                  Línea Editorial: {commsSubTab === 'todo' ? 'Todas las Publicaciones' : commsSubTab.toUpperCase()}
                </h3>
                <p className="text-xs text-[#6b6048]">
                  Administración de noticias, eventos, opiniones, diálogos y boletines de prensa.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartCreateArticle(commsSubTab === 'todo' ? 'noticias' : commsSubTab)}
                  className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar en {commsSubTab === 'todo' ? 'Noticias' : commsSubTab}</span>
                </button>
              </div>
            </div>

            {commsSubTab === 'prensa' ? (
              <div className="p-8 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-6">
                <div>
                  <h4 className="font-serif text-xl text-[#2d2618]">
                    Gestor del Boletín Institucional & Sala de Prensa
                  </h4>
                  <p className="text-xs text-[#6b6048]">
                    Configuración de despacho para corresponsales ambientales y kit de medios descargable.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-3">
                    <span className="text-xs font-bold text-[#4a5a22] uppercase tracking-wider">
                      Boletín Quincenal CGA
                    </span>
                    <p className="text-xs text-[#5a503a]">
                      Los usuarios suscritos desde el portal reciben automáticamente resúmenes ejecutivos de los últimos artículos publicados con Hero personalizado.
                    </p>
                    <button
                      onClick={() => showToast('Despacho de prueba enviado con éxito')}
                      className="px-4 py-2 rounded-xl bg-[#4a5a22] text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Boletín de Prueba</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-3">
                    <span className="text-xs font-bold text-[#4a5a22] uppercase tracking-wider">
                      Kit de Prensa & Recursos Institucionales
                    </span>
                    <p className="text-xs text-[#5a503a]">
                      Descargas oficiales para medios: logotipos en alta resolución, dossier de gobernanza y comunicados en PDF.
                    </p>
                    <div className="text-xs font-mono text-[#4a5a22]">
                      Estado: Activo y enlazado en portal de comunicación.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#e0d6be] text-[#4a5a22] uppercase tracking-wider text-[10px] border-b border-[#d8ceb6]">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Publicación</th>
                      <th className="py-4 px-4 font-semibold">Tipo</th>
                      <th className="py-4 px-4 font-semibold">Hero</th>
                      <th className="py-4 px-4 font-semibold">Fecha</th>
                      <th className="py-4 px-6 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d8ceb6]/60 text-[#2d2618]">
                    {filteredArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-white/40 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-serif text-sm font-medium text-[#2d2618] line-clamp-1">
                            {art.title?.es}
                          </div>
                          <div className="text-[10px] uppercase font-bold text-[#4a5a22]">
                            {art.category?.es || art.category}
                          </div>
                        </td>
                        <td className="py-4 px-4 uppercase text-[10px] font-semibold text-[#4a5a22]">
                          {art.type}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-white border border-[#d8ceb6] text-[10px] font-mono">
                            {art.heroStyle || 'solid-beige'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[11px] text-[#6b6048]">{art.date}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/comunicacion?articulo=${art.id}`}
                              className="p-1.5 rounded bg-white text-[#4a5a22] border border-[#d8ceb6]"
                              title="Ver en vivo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleStartEditArticle(art)}
                              className="px-2.5 py-1 rounded bg-[#4a5a22] text-white font-semibold text-xs"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id, art.title?.es || art.id)}
                              className="p-1.5 rounded bg-red-100 text-red-800"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MÓDULO 4: GESTIÓN DE POP-UPS & BANNERS DE AVISO
           ───────────────────────────────────────────────────────────── */}
        {adminModule === 'popups' && (
          <div className="space-y-8">
            {/* SUB-TEMA: POP-UPS MULTIRUTA & AVISOS (LAYOUT: 25% LISTA IZQ / 75% INFO, FORM Y PREVIEW DER) */}
            {popupsSubTab === 'popup' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* ─── COLUMNA IZQUIERDA: 25% (LISTA VERTICAL DE POP-UPS) ─── */}
                  <div className="lg:col-span-3 xl:col-span-3 space-y-4">
                    <div className="p-5 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] shadow-sm space-y-4">
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#d8ceb6]">
                        <div>
                          <h3 className="font-serif text-lg text-[#2d2618] font-medium">
                            Pop-ups Guardados
                          </h3>
                          <span className="text-[11px] text-[#6b6048]">
                            {popups.length} configurados
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleStartCreatePopup}
                          className="px-3 py-1.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                          title="Crear nuevo pop-up"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Nuevo</span>
                        </button>
                      </div>

                      {/* Buscador y Filtro por Ruta */}
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-[#6b6048] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={popupSearch}
                            onChange={(e) => setPopupSearch(e.target.value)}
                            placeholder="Buscar pop-up..."
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                          />
                        </div>
                        <select
                          value={popupFilterRoute}
                          onChange={(e) => setPopupFilterRoute(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                        >
                          <option value="all-filters">Todas las rutas ({popups.length})</option>
                          {POPUP_TARGET_ROUTES.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Lista de Tarjetas de Pop-ups */}
                      <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
                        {filteredPopups.length === 0 ? (
                          <div className="p-4 text-center text-xs text-[#6b6048] bg-white rounded-2xl border border-[#d8ceb6]">
                            No hay pop-ups que coincidan con la búsqueda.
                          </div>
                        ) : (
                          filteredPopups.map((p) => {
                            const isSelected = editingPopup?.id === p.id || selectedPopupId === p.id;
                            const routeLabel = p.targetRoute === 'all' ? 'Global' : p.targetRoute;

                            return (
                              <div
                                key={p.id}
                                onClick={() => handleSelectPopup(p)}
                                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                                  isSelected
                                    ? 'bg-white border-[#4a5a22] shadow-md ring-2 ring-[#4a5a22]/25'
                                    : 'bg-white/75 hover:bg-white border-[#d8ceb6] hover:border-[#6b6048]'
                                }`}
                              >
                                {/* Parte Superior: Título y Subtítulo */}
                                <div className="space-y-1">
                                  <h4 className="font-bold text-sm text-[#2d2618] leading-snug">
                                    {p.name || 'Sin nombre'}
                                  </h4>
                                  {p.title && p.title !== p.name && (
                                    <p className="text-xs text-[#6b6048] line-clamp-1 font-serif">
                                      {p.title}
                                    </p>
                                  )}
                                </div>

                                {/* Parte Inferior: Detalles de Estado (izq) y Acciones (der) */}
                                <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#eae4d2]">
                                  {/* Estado Activo / Inactivo sin cápsula (solo texto) */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTogglePopup(p);
                                    }}
                                    className="flex items-center gap-1.5 text-xs text-left cursor-pointer transition-colors py-0.5 hover:opacity-80"
                                    title={p.enabled ? 'Click para desactivar pop-up' : 'Click para activar pop-up'}
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        p.enabled ? 'bg-emerald-600' : 'bg-[#a89e88]'
                                      }`}
                                    />
                                    <span
                                      className={`font-semibold ${
                                        p.enabled ? 'text-emerald-700' : 'text-[#8c8068]'
                                      }`}
                                    >
                                      {p.enabled ? 'Activo' : 'Inactivo'}
                                    </span>
                                  </button>

                                  {/* Botones de Acción */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDuplicatePopup(p.id);
                                      }}
                                      className="px-2.5 py-1 rounded-lg hover:bg-[#eae4d2] text-[#6b6048] hover:text-[#2d2618] text-xs font-medium transition-colors flex items-center gap-1"
                                      title="Duplicar pop-up"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copiar</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePopup(p.id, p.name);
                                      }}
                                      className="px-2 py-1 rounded-lg hover:bg-red-50 text-[#8c8068] hover:text-red-700 text-xs font-medium transition-colors flex items-center gap-1"
                                      title="Eliminar pop-up"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Eliminar</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Botón de Restablecimiento */}
                      <div className="pt-2 border-t border-[#d8ceb6]">
                        <button
                          type="button"
                          onClick={handleResetPopups}
                          className="w-full py-2 rounded-xl bg-white hover:bg-[#f5efe3] border border-[#d8ceb6] text-xs font-semibold text-[#6b6048] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restablecer Pop-ups de Demostración</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ─── COLUMNA DERECHA: 75% (FORMULARIO EDITORIAL & BOTÓN PREVIEW) ─── */}
                  <div className="lg:col-span-9 xl:col-span-9 space-y-6">
                    {editingPopup ? (
                      <form
                        onSubmit={handleSavePopupForm}
                        className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-6 shadow-sm"
                      >
                        {/* Cabecera Superior del Formulario */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#d8ceb6]">
                          <div>
                            <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                              {editingPopup.name || 'Pop-up sin título'}
                            </h3>
                            <p className="text-xs text-[#6b6048] mt-1">
                              Ruta: <span className="font-mono text-[#4a5a22] font-bold">{editingPopup.targetRoute}</span> · Disparador:{' '}
                              <span className="font-semibold text-[#2d2618]">
                                {editingPopup.triggerType === 'time' && `Por Tiempo (${editingPopup.triggerDelaySeconds || 3}s)`}
                                {editingPopup.triggerType === 'scroll' && `Por Scroll (${editingPopup.triggerScrollPercent || 35}%)`}
                                {editingPopup.triggerType === 'exit' && 'Intención de Salida'}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setPreviewingPopupItem(editingPopup)}
                              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#f5efe3] border border-[#d8ceb6] text-xs font-bold text-[#4a5a22] flex items-center gap-2 shadow-xs transition-all active:scale-95 whitespace-nowrap"
                              title="Lanzar el pop-up en pantalla completa para probarlo"
                            >
                              <Eye className="w-4 h-4 shrink-0" />
                              <span>Previsualizar Pop-up</span>
                            </button>

                            <button
                              type="submit"
                              className="px-6 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
                            >
                              <Check className="w-3.5 h-3.5 shrink-0" />
                              <span>Guardar Cambios</span>
                            </button>
                          </div>
                        </div>

                        {/* SECCIÓN 1: NOMBRE INTERNO & RUTA */}
                        <div className="p-5 rounded-2xl bg-white/70 border border-[#d8ceb6] space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22] flex items-center gap-2">
                              <Navigation className="w-4 h-4" />
                              <span>1. Identificación & Ruta de Activación</span>
                            </h4>
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-[#d8ceb6] text-xs shadow-xs">
                              <input
                                type="checkbox"
                                checked={editingPopup.enabled}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    enabled: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 accent-[#4a5a22]"
                              />
                              <span className="font-bold text-[#2d2618]">
                                {editingPopup.enabled ? 'Pop-up Activado' : 'Pop-up Desactivado'}
                              </span>
                            </label>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Nombre Interno del Pop-up *
                              </label>
                              <input
                                type="text"
                                required
                                value={editingPopup.name || ''}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Ruta de Activación (Página o Global) *
                              </label>
                              <select
                                value={editingPopup.targetRoute || 'all'}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    targetRoute: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              >
                                {POPUP_TARGET_ROUTES.map((r) => (
                                  <option key={r.id} value={r.id}>
                                    {r.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* SECCIÓN 2: DISPARADOR (MÉTODO DE SALIDA / APARICIÓN) */}
                        <div className="p-5 rounded-2xl bg-white/70 border border-[#d8ceb6] space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22] flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>2. Método de Salida & Aparición (Disparador)</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              {
                                id: 'time',
                                icon: Clock,
                                title: 'Por Tiempo (Retardo)',
                                desc: 'Se despliega tras transcurrir N segundos de navegación.',
                              },
                              {
                                id: 'scroll',
                                icon: Sliders,
                                title: 'Por Desplazamiento (Scroll)',
                                desc: 'Se activa al alcanzar un % de scroll en la página.',
                              },
                              {
                                id: 'exit',
                                icon: LogOut,
                                title: 'Intención de Salida',
                                desc: 'Se muestra cuando el cursor se mueve hacia la barra superior.',
                              },
                            ].map((trig) => {
                              const isSelected =
                                (editingPopup.triggerType || 'time') === trig.id;
                              const TrigIcon = trig.icon;
                              return (
                                <button
                                  key={trig.id}
                                  type="button"
                                  onClick={() =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      triggerType: trig.id,
                                    })
                                  }
                                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                                    isSelected
                                      ? 'bg-[#4a5a22] text-[#f5efe3] border-[#4a5a22] shadow-md ring-2 ring-[#4a5a22]/30'
                                      : 'bg-white text-[#2d2618] border-[#d8ceb6] hover:border-[#6b6048]'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 font-bold text-xs">
                                    <TrigIcon className="w-4 h-4" />
                                    <span>{trig.title}</span>
                                  </div>
                                  <p
                                    className={`text-[11px] leading-relaxed ${
                                      isSelected ? 'text-[#f5efe3]/80' : 'text-[#6b6048]'
                                    }`}
                                  >
                                    {trig.desc}
                                  </p>
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            {editingPopup.triggerType === 'time' && (
                              <div className="space-y-1.5">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider flex items-center justify-between">
                                  <span>Retardo de Aparición</span>
                                  <span className="font-mono text-[#2d2618] font-bold">
                                    {editingPopup.triggerDelaySeconds || 3} segundos
                                  </span>
                                </label>
                                <input
                                  type="range"
                                  min="1"
                                  max="20"
                                  step="1"
                                  value={editingPopup.triggerDelaySeconds || 3}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      triggerDelaySeconds: parseInt(e.target.value) || 3,
                                    })
                                  }
                                  className="w-full accent-[#4a5a22]"
                                />
                                <div className="flex justify-between text-[10px] text-[#6b6048]">
                                  <span>1 seg</span>
                                  <span>10 seg</span>
                                  <span>20 seg</span>
                                </div>
                              </div>
                            )}

                            {editingPopup.triggerType === 'scroll' && (
                              <div className="space-y-1.5">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider flex items-center justify-between">
                                  <span>Porcentaje de Desplazamiento</span>
                                  <span className="font-mono text-[#2d2618] font-bold">
                                    {editingPopup.triggerScrollPercent || 35}%
                                  </span>
                                </label>
                                <input
                                  type="range"
                                  min="10"
                                  max="90"
                                  step="5"
                                  value={editingPopup.triggerScrollPercent || 35}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      triggerScrollPercent: parseInt(e.target.value) || 35,
                                    })
                                  }
                                  className="w-full accent-[#4a5a22]"
                                />
                                <div className="flex justify-between text-[10px] text-[#6b6048]">
                                  <span>10% (Inicio)</span>
                                  <span>50% (Medio)</span>
                                  <span>90% (Final)</span>
                                </div>
                              </div>
                            )}

                            <div className="space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Frecuencia de Muestra
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-3 rounded-xl border border-[#d8ceb6] text-xs shadow-xs">
                                <input
                                  type="checkbox"
                                  checked={editingPopup.oncePerSession || false}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      oncePerSession: e.target.checked,
                                    })
                                  }
                                  className="w-4 h-4 accent-[#4a5a22]"
                                />
                                <span className="text-[#2d2618]">
                                  {editingPopup.oncePerSession
                                    ? 'Una sola vez por sesión de navegación'
                                    : 'Mostrar siempre que se cumpla la condición'}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* SECCIÓN 3: FORMATO DE DISEÑO (4 MODELOS) */}
                        <div className="p-5 rounded-2xl bg-white/70 border border-[#d8ceb6] space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22] flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            <span>3. Formato & Tipo de Diseño (4 Modelos Disponibles)</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                              {
                                id: 'classic-hero',
                                title: '1. Editorial Clásico',
                                subtitle: 'Imagen Superior + Gradiente',
                                desc: 'Modal centrado con fotografía de cabecera y fondo beige cálido.',
                              },
                              {
                                id: 'split-modal',
                                title: '2. Split Dos Columnas',
                                subtitle: '50/50 Imagen + Contenido',
                                desc: 'Estructura horizontal con fotografía inmersiva al costado.',
                              },
                              {
                                id: 'botanical-solid',
                                title: '3. Minimalista Biocultural',
                                subtitle: 'Beige + Elemento Botánico',
                                desc: 'Diseño sobrio y solemne con silueta botánica PNG/SVG y sello CGA.',
                              },
                              {
                                id: 'floating-corner',
                                title: '4. Tarjeta Flotante (Toast)',
                                subtitle: 'Esquina No Intrusiva',
                                desc: 'Flotador discreto en esquina que no bloquea la navegación.',
                              },
                            ].map((d) => {
                              const isSelected =
                                (editingPopup.designType || 'split-modal') === d.id;
                              return (
                                <button
                                  key={d.id}
                                  type="button"
                                  onClick={() =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      designType: d.id,
                                    })
                                  }
                                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                                    isSelected
                                      ? 'bg-[#4a5a22] text-[#f5efe3] border-[#4a5a22] shadow-md ring-2 ring-[#4a5a22]/30'
                                      : 'bg-white text-[#2d2618] border-[#d8ceb6] hover:border-[#6b6048]'
                                  }`}
                                >
                                  <div>
                                    <div className="font-bold text-xs">{d.title}</div>
                                    <div
                                      className={`text-[10px] uppercase font-mono font-semibold pt-0.5 ${
                                        isSelected ? 'text-[#e0d6be]' : 'text-[#4a5a22]'
                                      }`}
                                    >
                                      {d.subtitle}
                                    </div>
                                  </div>
                                  <p
                                    className={`text-[11px] leading-relaxed pt-1 ${
                                      isSelected ? 'text-[#f5efe3]/80' : 'text-[#6b6048]'
                                    }`}
                                  >
                                    {d.desc}
                                  </p>
                                </button>
                              );
                            })}
                          </div>

                          {editingPopup.designType === 'floating-corner' && (
                            <div className="pt-2 space-y-1.5 text-xs">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Posición de la Tarjeta Flotante en Pantalla
                              </label>
                              <div className="grid grid-cols-2 gap-3 max-w-md">
                                {[
                                  { id: 'bottom-right', label: 'Inferior Derecha' },
                                  { id: 'bottom-left', label: 'Inferior Izquierda' },
                                ].map((pos) => (
                                  <button
                                    key={pos.id}
                                    type="button"
                                    onClick={() =>
                                      setEditingPopup({
                                        ...editingPopup,
                                        cornerPosition: pos.id,
                                      })
                                    }
                                    className={`py-2.5 rounded-xl text-xs font-bold ${
                                      (editingPopup.cornerPosition || 'bottom-right') === pos.id
                                        ? 'bg-[#4a5a22] text-white'
                                        : 'bg-white border border-[#d8ceb6] text-[#6b6048]'
                                    }`}
                                  >
                                    {pos.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {editingPopup.designType === 'botanical-solid' && (
                            <div className="pt-3 p-5 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] space-y-5 text-xs">
                              {/* Selector de Modo de Fondo */}
                              <div className="space-y-2">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider block">
                                  Tipo de Fondo Visual
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                  {[
                                    { id: 'solid', label: 'Color Sólido / Degradado', desc: 'Fondo monocromático o gradiente con paleta institucional' },
                                    { id: 'image', label: 'Imagen de Fondo Total', desc: 'Fotografía completa con opacidad y filtro' },
                                    { id: 'element', label: 'Elemento Sin Fondo', desc: 'Ilustración PNG/SVG flotante personalizada' },
                                  ].map((m) => {
                                    const currentBgType = editingPopup.bgType || (editingPopup.bgImage ? 'image' : editingPopup.pngElement ? 'element' : 'solid');
                                    const isSelected = currentBgType === m.id;
                                    return (
                                      <button
                                        key={m.id}
                                        type="button"
                                        onClick={() =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            bgType: m.id,
                                          })
                                        }
                                        className={`p-3.5 rounded-xl border text-left transition-all ${
                                          isSelected
                                            ? 'bg-[#4a5a22] text-[#f5efe3] border-[#4a5a22] font-semibold shadow-xs'
                                            : 'bg-white text-[#2d2618] border-[#d8ceb6] hover:bg-white/80'
                                        }`}
                                      >
                                        <div className="font-bold text-xs">{m.label}</div>
                                        <div className={`text-[10px] pt-1 leading-snug ${isSelected ? 'text-[#f5efe3]/80' : 'text-[#6b6048]'}`}>
                                          {m.desc}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* MODO 1: COLOR SÓLIDO / DEGRADADO */}
                              {(editingPopup.bgType || 'solid') === 'solid' && (
                                <div className="space-y-4 pt-2 border-t border-[#d8ceb6]/80">
                                  {/* COLOR PRINCIPAL / INICIAL */}
                                  <div className="space-y-2">
                                    <label className="font-bold text-[#4a5a22] uppercase tracking-wider block">
                                      {editingPopup.hasGradient ? 'Color Inicial del Degradado' : 'Escoge el Color de Fondo'}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                                      {[
                                        { name: 'Beige Cálido', hex: '#f5efe3', text: 'text-[#2d2618]' },
                                        { name: 'Arena Institucional', hex: '#eae4d2', text: 'text-[#2d2618]' },
                                        { name: 'Blanco Puro', hex: '#ffffff', text: 'text-[#2d2618]' },
                                        { name: 'Verde Musgo', hex: '#4a5a22', text: 'text-white' },
                                        { name: 'Terracota', hex: '#8c4a2f', text: 'text-white' },
                                        { name: 'Carbón', hex: '#1f1c16', text: 'text-white' },
                                      ].map((c) => (
                                        <button
                                          key={c.hex}
                                          type="button"
                                          onClick={() =>
                                            setEditingPopup({
                                              ...editingPopup,
                                              bgColor: c.hex,
                                            })
                                          }
                                          style={{ backgroundColor: c.hex }}
                                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${c.text} ${
                                            (editingPopup.bgColor || '#eae4d2') === c.hex
                                              ? 'ring-2 ring-[#4a5a22] shadow-md border-transparent scale-105'
                                              : 'border-[#d8ceb6]'
                                          }`}
                                        >
                                          <span className="text-[10px] font-bold text-center leading-tight">
                                            {c.name}
                                          </span>
                                        </button>
                                      ))}
                                    </div>

                                    <div className="flex items-center gap-3 pt-1">
                                      <label className="text-xs font-semibold text-[#5a503a]">
                                        O Color Hexadecimal:
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <div className="relative w-9 h-9 rounded-xl border border-[#d8ceb6] overflow-hidden shadow-xs shrink-0 cursor-pointer bg-white">
                                          <input
                                            type="color"
                                            value={editingPopup.bgColor || '#eae4d2'}
                                            onChange={(e) =>
                                              setEditingPopup({
                                                ...editingPopup,
                                                bgColor: e.target.value,
                                              })
                                            }
                                            className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer border-0 p-0"
                                          />
                                        </div>
                                        <input
                                          type="text"
                                          value={editingPopup.bgColor || '#eae4d2'}
                                          onChange={(e) =>
                                            setEditingPopup({
                                              ...editingPopup,
                                              bgColor: e.target.value,
                                            })
                                          }
                                          placeholder="#eae4d2"
                                          className="w-28 px-3 py-1.5 rounded-lg bg-white border border-[#d8ceb6] text-xs font-mono text-[#2d2618]"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* TOGGLE: ACTIVAR DEGRADADO */}
                                  <div className="pt-2 border-t border-[#d8ceb6]/60">
                                    <label className="flex items-center gap-2.5 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-[#d8ceb6] shadow-xs w-fit">
                                      <input
                                        type="checkbox"
                                        checked={Boolean(editingPopup.hasGradient)}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            hasGradient: e.target.checked,
                                            gradientSecondaryColor: editingPopup.gradientSecondaryColor || '#d8ceb6',
                                            gradientDirection: editingPopup.gradientDirection || 'to-b',
                                          })
                                        }
                                        className="w-4 h-4 accent-[#4a5a22]"
                                      />
                                      <span className="text-xs font-bold text-[#2d2618]">
                                        Activar Degradado / Gradiente en el Fondo
                                      </span>
                                    </label>
                                  </div>

                                  {/* OPCIONES AVANZADAS DE DEGRADADO */}
                                  {editingPopup.hasGradient && (
                                    <div className="space-y-4 pt-1 p-4 rounded-xl bg-white border border-[#d8ceb6]">
                                      {/* Presets Rápidos de Degradados */}
                                      <div className="space-y-1.5">
                                        <label className="font-bold text-[#6b6048] uppercase tracking-wider text-[10px]">
                                          Presets de Degradados Institucionales:
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                          {[
                                            { label: 'Beige a Arena', c1: '#f5efe3', c2: '#eae4d2', dir: 'to-b' },
                                            { label: 'Verde Musgo Profundo', c1: '#4a5a22', c2: '#283311', dir: 'to-br' },
                                            { label: 'Terracota a Ocre', c1: '#8c4a2f', c2: '#572b1a', dir: 'to-b' },
                                            { label: 'Blanco a Arena', c1: '#ffffff', c2: '#eae4d2', dir: 'to-b' },
                                            { label: 'Carbón Profundo', c1: '#26221a', c2: '#12100c', dir: 'radial' },
                                          ].map((g, idx) => (
                                            <button
                                              key={idx}
                                              type="button"
                                              onClick={() =>
                                                setEditingPopup({
                                                  ...editingPopup,
                                                  bgColor: g.c1,
                                                  gradientSecondaryColor: g.c2,
                                                  gradientDirection: g.dir,
                                                })
                                              }
                                              className="p-2.5 rounded-lg border border-[#d8ceb6] text-left text-xs hover:border-[#4a5a22] transition-colors"
                                            >
                                              <div
                                                style={{
                                                  background: `linear-gradient(135deg, ${g.c1}, ${g.c2})`,
                                                }}
                                                className="w-full h-4 rounded mb-1 border border-black/10"
                                              />
                                              <span className="text-[10px] font-semibold text-[#2d2618] block leading-tight">
                                                {g.label}
                                              </span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Selector de Dirección y Color Secundario */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                        {/* Tipo / Dirección de Degradado */}
                                        <div className="space-y-1.5">
                                          <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                            Dirección del Degradado
                                          </label>
                                          <select
                                            value={editingPopup.gradientDirection || 'to-b'}
                                            onChange={(e) =>
                                              setEditingPopup({
                                                ...editingPopup,
                                                gradientDirection: e.target.value,
                                              })
                                            }
                                            className="w-full px-3 py-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] text-xs text-[#2d2618]"
                                          >
                                            <option value="to-b">Vertical (Arriba hacia Abajo)</option>
                                            <option value="to-r">Horizontal (Izquierda a Derecha)</option>
                                            <option value="to-br">Diagonal Suave (Superior Izq. a Inferior Der.)</option>
                                            <option value="radial">Radial (Centrado Suave)</option>
                                          </select>
                                        </div>

                                        {/* Color Secundario / Final */}
                                        <div className="space-y-1.5">
                                          <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                            Color Final (Secundario)
                                          </label>
                                          <div className="flex items-center gap-2">
                                            <div className="relative w-9 h-9 rounded-xl border border-[#d8ceb6] overflow-hidden shadow-xs shrink-0 cursor-pointer bg-white">
                                              <input
                                                type="color"
                                                value={editingPopup.gradientSecondaryColor || '#d8ceb6'}
                                                onChange={(e) =>
                                                  setEditingPopup({
                                                    ...editingPopup,
                                                    gradientSecondaryColor: e.target.value,
                                                  })
                                                }
                                                className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer border-0 p-0"
                                              />
                                            </div>
                                            <input
                                              type="text"
                                              value={editingPopup.gradientSecondaryColor || '#d8ceb6'}
                                              onChange={(e) =>
                                                setEditingPopup({
                                                  ...editingPopup,
                                                  gradientSecondaryColor: e.target.value,
                                                })
                                              }
                                              placeholder="#d8ceb6"
                                              className="w-full px-3 py-2 rounded-lg bg-[#f5efe3] border border-[#d8ceb6] text-xs font-mono text-[#2d2618]"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* MODO 2: IMAGEN DE FONDO TOTAL */}
                              {editingPopup.bgType === 'image' && (
                                <div className="space-y-4 pt-2 border-t border-[#d8ceb6]/80">
                                  <div className="space-y-1.5">
                                    <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                      URL de la Imagen de Fondo Completo
                                    </label>
                                    <input
                                      type="url"
                                      value={editingPopup.bgImage || editingPopup.image || ''}
                                      onChange={(e) =>
                                        setEditingPopup({
                                          ...editingPopup,
                                          bgImage: e.target.value,
                                          image: e.target.value,
                                        })
                                      }
                                      placeholder="https://images.unsplash.com/photo-..."
                                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618]"
                                    />
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                    {/* Opacidad del Fondo */}
                                    <div className="space-y-1.5">
                                      <label className="font-bold text-[#4a5a22] uppercase tracking-wider flex justify-between">
                                        <span>Opacidad</span>
                                        <span className="font-mono text-[#2d2618] font-bold">
                                          {editingPopup.bgOpacity !== undefined ? editingPopup.bgOpacity : 80}%
                                        </span>
                                      </label>
                                      <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        step="5"
                                        value={editingPopup.bgOpacity !== undefined ? editingPopup.bgOpacity : 80}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            bgOpacity: parseInt(e.target.value),
                                          })
                                        }
                                        className="w-full accent-[#4a5a22]"
                                      />
                                    </div>

                                    {/* Filtro / Tono */}
                                    <div className="space-y-1.5">
                                      <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                        Filtro Visual
                                      </label>
                                      <select
                                        value={editingPopup.bgFilter || 'normal'}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            bgFilter: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                      >
                                        <option value="normal">Color Normal / Natural</option>
                                        <option value="grayscale">Escala de Grises (Blanco y Negro)</option>
                                        <option value="blur">Desenfoque Suave (Blur)</option>
                                      </select>
                                    </div>

                                    {/* Capa de Contraste */}
                                    <div className="space-y-1.5">
                                      <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                        Capa de Legibilidad
                                      </label>
                                      <select
                                        value={editingPopup.bgOverlay || 'dark'}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            bgOverlay: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                      >
                                        <option value="dark">Filtro Oscuro (Para texto claro)</option>
                                        <option value="light">Filtro Claro (Para texto oscuro)</option>
                                        <option value="none">Sin Filtro de Contraste</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* MODO 3: ELEMENTO SIN FONDO (PNG / SVG) */}
                              {editingPopup.bgType === 'element' && (
                                <div className="space-y-4 pt-2 border-t border-[#d8ceb6]/80">
                                  <div className="space-y-1.5">
                                    <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                      URL de Ilustración / PNG Sin Fondo
                                    </label>
                                    <input
                                      type="text"
                                      value={editingPopup.pngElement || editingPopup.image || ''}
                                      onChange={(e) =>
                                        setEditingPopup({
                                          ...editingPopup,
                                          pngElement: e.target.value,
                                        })
                                      }
                                      placeholder="https://... o /imagenes/Rama 2.svg"
                                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618]"
                                    />
                                  </div>

                                  {/* Presets de Elementos Rápidos */}
                                  <div className="space-y-1.5">
                                    <label className="font-bold text-[#6b6048] uppercase tracking-wider text-[10px]">
                                      Presets Rápidos Sugeridos:
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                      {PNG_PRESETS.map((p) => (
                                        <button
                                          key={p.path}
                                          type="button"
                                          onClick={() =>
                                            setEditingPopup({
                                              ...editingPopup,
                                              pngElement: p.path,
                                            })
                                          }
                                          className={`py-2 px-3 rounded-lg border text-left text-xs transition-all ${
                                            editingPopup.pngElement === p.path
                                              ? 'bg-[#4a5a22] text-[#f5efe3] font-semibold border-[#4a5a22]'
                                              : 'bg-white border-[#d8ceb6] text-[#2d2618]'
                                          }`}
                                        >
                                          {p.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                    {/* Posicionamiento */}
                                    <div className="space-y-1.5">
                                      <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                        Posición en Pantalla
                                      </label>
                                      <select
                                        value={editingPopup.elementPosition || 'bottom-right'}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            elementPosition: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                      >
                                        <option value="bottom-right">Esquina Inferior Derecha</option>
                                        <option value="bottom-left">Esquina Inferior Izquierda</option>
                                        <option value="top-right">Esquina Superior Derecha</option>
                                        <option value="top-left">Esquina Superior Izquierda</option>
                                        <option value="center">Centro del Modal</option>
                                      </select>
                                    </div>

                                    {/* Tamaño */}
                                    <div className="space-y-1.5">
                                      <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                        Tamaño
                                      </label>
                                      <select
                                        value={editingPopup.elementSize || 'md'}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            elementSize: e.target.value,
                                          })
                                        }
                                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                      >
                                        <option value="sm">Pequeño (140px)</option>
                                        <option value="md">Mediano (200px)</option>
                                        <option value="lg">Grande (280px)</option>
                                        <option value="xl">Extra Grande (360px)</option>
                                      </select>
                                    </div>

                                    {/* Opacidad del Elemento */}
                                    <div className="space-y-1.5">
                                      <label className="font-bold text-[#4a5a22] uppercase tracking-wider flex justify-between">
                                        <span>Opacidad</span>
                                        <span className="font-mono text-[#2d2618] font-bold">
                                          {editingPopup.elementOpacity !== undefined ? editingPopup.elementOpacity : 30}%
                                        </span>
                                      </label>
                                      <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        step="5"
                                        value={editingPopup.elementOpacity !== undefined ? editingPopup.elementOpacity : 30}
                                        onChange={(e) =>
                                          setEditingPopup({
                                            ...editingPopup,
                                            elementOpacity: parseInt(e.target.value),
                                          })
                                        }
                                        className="w-full accent-[#4a5a22]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {editingPopup.designType !== 'botanical-solid' && (
                            <div className="pt-2 space-y-1.5 text-xs">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                URL de Fotografía Principal del Pop-up
                              </label>
                              <input
                                type="url"
                                value={editingPopup.image || ''}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    image: e.target.value,
                                  })
                                }
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              />
                            </div>
                          )}
                        </div>

                        {/* SECCIÓN 4: TEXTOS Y CONTENIDO EDITORIAL */}
                        <div className="p-5 rounded-2xl bg-white/70 border border-[#d8ceb6] space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22] flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>4. Textos & Contenido del Pop-up</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="sm:col-span-2 space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Título Principal *
                              </label>
                              <input
                                type="text"
                                required
                                value={editingPopup.title || ''}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Ej. Convocatoria Abierta · Posgrados 2026"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Subtítulo Institucional
                              </label>
                              <input
                                type="text"
                                value={editingPopup.subtitle || ''}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    subtitle: e.target.value,
                                  })
                                }
                                placeholder="Ej. Consejo Global Ambiental · Academia"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Badge / Etiqueta Destacada
                              </label>
                              <input
                                type="text"
                                value={editingPopup.highlightBadge || ''}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    highlightBadge: e.target.value,
                                  })
                                }
                                placeholder="Ej. Inscripciones Abiertas"
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              />
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
                              <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                Mensaje / Descripción Completa
                              </label>
                              <textarea
                                rows="3"
                                value={editingPopup.message || ''}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    message: e.target.value,
                                  })
                                }
                                placeholder="Explica detalladamente la convocatoria o aviso..."
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* SECCIÓN 5: BOTONES DE ACCIÓN (CTA) */}
                        <div className="p-5 rounded-2xl bg-white/70 border border-[#d8ceb6] space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d8ceb6]">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22] flex items-center gap-2">
                                <MousePointerClick className="w-4 h-4" />
                                <span>5. Botones de Acción (CTA)</span>
                              </h4>
                              <p className="text-[11px] text-[#6b6048] mt-0.5">
                                Puedes activar o desactivar los botones de acción para crear comunicados solemnes o pop-ups con llamados a la acción.
                              </p>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-[#d8ceb6] shadow-xs">
                              <input
                                type="checkbox"
                                checked={editingPopup.hasCtaButton !== false}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    hasCtaButton: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 accent-[#4a5a22]"
                              />
                              <span className="text-xs font-bold text-[#2d2618]">
                                {editingPopup.hasCtaButton !== false
                                  ? 'Con Botones CTA'
                                  : 'Sin Botones CTA'}
                              </span>
                            </label>
                          </div>

                          {editingPopup.hasCtaButton !== false ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                              <div className="space-y-1.5">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                  Texto del Botón Principal (CTA)
                                </label>
                                <input
                                  type="text"
                                  value={editingPopup.ctaText || ''}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      ctaText: e.target.value,
                                    })
                                  }
                                  placeholder="Ej. Ver Convocatoria & Registrarse"
                                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                  Enlace de Destino Principal
                                </label>
                                <input
                                  type="text"
                                  value={editingPopup.ctaLink || ''}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      ctaLink: e.target.value,
                                    })
                                  }
                                  placeholder="Ej. /capacitacion"
                                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                  Texto de Acción Secundaria (Opcional)
                                </label>
                                <input
                                  type="text"
                                  value={editingPopup.secondaryCtaText || ''}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      secondaryCtaText: e.target.value,
                                    })
                                  }
                                  placeholder="Ej. Conocer Más"
                                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="font-bold text-[#4a5a22] uppercase tracking-wider">
                                  Enlace de Acción Secundaria (Opcional)
                                </label>
                                <input
                                  type="text"
                                  value={editingPopup.secondaryCtaLink || ''}
                                  onChange={(e) =>
                                    setEditingPopup({
                                      ...editingPopup,
                                      secondaryCtaLink: e.target.value,
                                    })
                                  }
                                  placeholder="Ej. /contacto"
                                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] shadow-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] text-xs text-[#6b6048]">
                              <p>
                                Este pop-up se mostrará como un <strong>comunicado solemne / informativo</strong> sin botones de acción inferiores, únicamente con su botón de cierre superior.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* BARRA INFERIOR DE ACCIONES */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#d8ceb6]">
                          <button
                            type="button"
                            onClick={() => setPreviewingPopupItem(editingPopup)}
                            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#f5efe3] border border-[#d8ceb6] text-xs font-bold text-[#4a5a22] flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Previsualizar Pop-up en Vivo</span>
                          </button>

                          <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>Guardar Cambios</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-12 text-center bg-[#eae4d2]/85 rounded-3xl border border-[#d8ceb6] space-y-3">
                        <p className="text-sm text-[#6b6048]">
                          Selecciona un pop-up de la lista izquierda para editar o crea uno nuevo.
                        </p>
                        <button
                          type="button"
                          onClick={handleStartCreatePopup}
                          className="px-5 py-2.5 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-md"
                        >
                          Crear Pop-up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TEMA: BANNER SUPERIOR */}
            {popupsSubTab === 'banner' && (() => {
              const b = siteSettings.banner || {};
              const bannerStyle = b.bannerStyle || 'static';
              const showCta = b.showCta !== false;

              const BANNER_PRESETS = [
                { id: 'moss', label: 'Verde Musgo', bg: '#4a5a22', text: '#f5efe3' },
                { id: 'terracotta', label: 'Terracota', bg: '#8c4a2f', text: '#f5efe3' },
                { id: 'beige', label: 'Beige Cálido', bg: '#eae4d2', text: '#2d2618' },
                { id: 'ocean', label: 'Océano Profundo', bg: '#18529d', text: '#f5efe3' },
                { id: 'forest', label: 'Carbón Selva', bg: '#232b12', text: '#f5efe3' },
                { id: 'custom', label: 'Personalizado', bg: b.bgColor || '#4a5a22', text: b.textColor || '#f5efe3' },
              ];

              const GRADIENT_PRESETS = [
                { label: 'Bosque Profundo', from: '#4a5a22', to: '#202a0e', dir: 'to-r' },
                { label: 'Océano & Musgo', from: '#18529d', to: '#4a5a22', dir: 'to-r' },
                { label: 'Atardecer Terracota', from: '#8c4a2f', to: '#5a2818', dir: 'to-r' },
                { label: 'Arena Cálida', from: '#eae4d2', to: '#d5cbb0', dir: 'to-r' },
                { label: 'Resplandor Radial', from: '#5c7028', to: '#2d3813', dir: 'radial' },
              ];

              const BIOME_IMAGE_PRESETS = [
                { title: 'Bosques Amazónicos', url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=80&fit=crop', link: '/conocimiento' },
                { title: 'Arrecifes de Coral', url: 'https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=500&q=80&fit=crop', link: '/proyectos' },
                { title: 'Glaciares Polares', url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=500&q=80&fit=crop', link: '/lineas-estrategicas' },
                { title: 'Reforestación Comunitaria', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80&fit=crop', link: '/nosotros' },
                { title: 'Corredores Bioculturales', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80&fit=crop', link: '/agenda-2030' },
              ];

              let bgStyle = {};
              if (b.gradientEnabled) {
                const dirMap = {
                  'to-r': 'to right',
                  'to-b': 'to bottom',
                  'to-br': 'to bottom right',
                  'radial': 'radial',
                };
                const from = b.gradientFrom || '#4a5a22';
                const to = b.gradientTo || '#2d3813';
                bgStyle = {
                  background: b.gradientDirection === 'radial'
                    ? `radial-gradient(circle at center, ${from}, ${to})`
                    : `linear-gradient(${dirMap[b.gradientDirection] || 'to right'}, ${from}, ${to})`,
                  color: b.textColor || '#f5efe3',
                  borderColor: `${to}80`,
                };
              } else if (b.theme === 'custom') {
                bgStyle = {
                  backgroundColor: b.bgColor || '#4a5a22',
                  color: b.textColor || '#f5efe3',
                  borderColor: `${b.bgColor || '#4a5a22'}80`,
                };
              } else if (b.theme === 'terracotta') {
                bgStyle = { backgroundColor: '#8c4a2f', color: '#f5efe3', borderColor: '#6d3924' };
              } else if (b.theme === 'beige') {
                bgStyle = { backgroundColor: '#eae4d2', color: '#2d2618', borderColor: '#d8ceb6' };
              } else {
                bgStyle = { backgroundColor: '#4a5a22', color: '#f5efe3', borderColor: '#384519' };
              }

              const texts = b.marqueeTexts && b.marqueeTexts.length > 0
                ? b.marqueeTexts
                : [b.message || 'Inscripciones abiertas para diplomados internacionales 2026'];

              const images = b.marqueeImages && b.marqueeImages.length > 0
                ? b.marqueeImages
                : [];

              const handleAddMarqueeText = () => {
                if (!newBannerText.trim()) return;
                const updated = [...texts, newBannerText.trim()];
                updateBanner({ marqueeTexts: updated });
                setNewBannerText('');
                showToast('Frase añadida al carrusel');
              };

              const handleRemoveMarqueeText = (idx) => {
                const updated = texts.filter((_, i) => i !== idx);
                updateBanner({ marqueeTexts: updated });
                showToast('Frase eliminada');
              };

              const handleUpdateMarqueeText = (idx, val) => {
                const updated = [...texts];
                updated[idx] = val;
                updateBanner({ marqueeTexts: updated });
              };

              const handleAddMarqueeImage = () => {
                if (!newBannerImgUrl.trim()) return;
                const newImg = {
                  id: `img-${Date.now()}`,
                  url: newBannerImgUrl.trim(),
                  link: newBannerImgLink.trim() || '',
                };
                const updated = [...images, newImg];
                updateBanner({ marqueeImages: updated });
                setNewBannerImgUrl('');
                setNewBannerImgLink('');
                showToast('Imagen añadida al carrusel');
              };

              const handleAddPresetImage = (preset) => {
                const newImg = {
                  id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  url: preset.url,
                  link: preset.link || '',
                };
                const updated = [...images, newImg];
                updateBanner({ marqueeImages: updated });
                showToast(`Añadida: ${preset.title}`);
              };

              const handleUpdateImageLink = (id, newLink) => {
                const updated = images.map((img) => (img.id === id ? { ...img, link: newLink } : img));
                updateBanner({ marqueeImages: updated });
              };

              const handleRemoveMarqueeImage = (id) => {
                const updated = images.filter((img) => img.id !== id);
                updateBanner({ marqueeImages: updated });
                showToast('Imagen eliminada');
              };

              return (
                <div className="p-8 rounded-3xl bg-[#eae4d2]/85 border border-[#d8ceb6] space-y-6">
                  {/* Encabezado y Estado */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d8ceb6]">
                    <div>
                      <h3 className="font-serif text-2xl text-[#2d2618] font-normal">
                        Cinta de Anuncios Institucional
                      </h3>
                      <p className="text-xs text-[#6b6048]">
                        Cinta interactiva tras la portada con 3 estilos, degradados y enlaces individuales.
                      </p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-[#d8ceb6] shadow-xs">
                      <input
                        type="checkbox"
                        checked={b.enabled}
                        onChange={(e) => updateBanner({ enabled: e.target.checked })}
                        className="w-4 h-4 accent-[#4a5a22]"
                      />
                      <span className="text-xs font-bold text-[#2d2618]">
                        {b.enabled ? 'Cinta Activada' : 'Cinta Desactivada'}
                      </span>
                    </label>
                  </div>

                  {/* ─── 1. SELECTOR DE LOS 3 ESTILOS ─── */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      1. Selecciona el Estilo de la Cinta
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'static',
                          title: 'Estilo 1: Fijo / Editorial',
                          desc: 'Mensaje único directo y centrado con CTA opcional.',
                          icon: FileText,
                        },
                        {
                          id: 'text-marquee',
                          title: 'Estilo 2: Carrusel de Texto',
                          desc: 'Marquesina continua infinita con frases rotativas.',
                          icon: Type,
                        },
                        {
                          id: 'image-marquee',
                          title: 'Estilo 3: Carrusel de Imágenes',
                          desc: 'Franja continua sin texto, alto fijo y links por foto.',
                          icon: ImageIcon,
                        },
                      ].map((st) => {
                        const IconComp = st.icon;
                        const isSelected = bannerStyle === st.id;
                        return (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => updateBanner({ bannerStyle: st.id })}
                            className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-[#4a5a22] text-[#f5efe3] border-[#4a5a22] shadow-md ring-2 ring-[#4a5a22]/30'
                                : 'bg-white text-[#2d2618] border-[#d8ceb6] hover:border-[#6b6048]'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-bold text-xs">
                              <IconComp className="w-4 h-4 shrink-0" />
                              <span>{st.title}</span>
                            </div>
                            <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-[#e0d6be]' : 'text-[#6b6048]'}`}>
                              {st.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ─── 2. VISTA PREVIA EN VIVO ─── */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Vista Previa en Tiempo Real
                      </label>
                      <span className="text-[11px] text-[#6b6048] font-mono">
                        {bannerStyle.toUpperCase()} · {b.gradientEnabled ? 'DEGRADADO' : (b.theme || 'MOSS').toUpperCase()}
                      </span>
                    </div>

                    <div
                      style={bgStyle}
                      className="p-3.5 rounded-2xl text-xs flex items-center justify-between gap-3 border shadow-sm overflow-hidden transition-all"
                    >
                      {bannerStyle === 'static' && (
                        <div className="flex items-center justify-between w-full gap-3">
                          <span className="font-medium truncate">{b.message || 'Texto de aviso institucional'}</span>
                          {showCta && b.ctaLink && (
                            <span className="font-bold underline shrink-0 flex items-center gap-1 text-[11px]">
                              {b.ctaText || 'Ver más'} &rarr;
                            </span>
                          )}
                        </div>
                      )}

                      {bannerStyle === 'text-marquee' && (
                        <div className="flex items-center justify-between w-full gap-3 overflow-hidden">
                          <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
                            <div
                              className="cga-marquee-track flex items-center gap-6 py-0.5"
                              style={{ '--marquee-duration': `${b.marqueeSpeed || 28}s` }}
                            >
                              {[...texts, ...texts].map((txt, idx) => (
                                <div key={idx} className="flex items-center gap-4 shrink-0 whitespace-nowrap">
                                  <span className="font-medium text-[11px]">{txt}</span>
                                  <span className="opacity-40 text-[9px]">◆</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {showCta && b.ctaLink && (
                            <span className="font-bold underline shrink-0 flex items-center gap-1 text-[11px] pl-2">
                              {b.ctaText || 'Ver más'} &rarr;
                            </span>
                          )}
                        </div>
                      )}

                      {bannerStyle === 'image-marquee' && (
                        <div
                          className="flex items-center justify-between w-full overflow-hidden relative rounded-xl -my-1 -mx-1 border border-white/20"
                          style={{ height: `${Math.min(b.imageHeight || 76, 80)}px` }}
                        >
                          <div className="w-full h-full overflow-hidden relative">
                            <div
                              className="cga-marquee-track h-full flex items-center gap-0"
                              style={{ '--marquee-duration': `${b.marqueeSpeed || 28}s` }}
                            >
                              {[...images, ...images, ...images].map((img, idx) => {
                                const hasLink = Boolean(img.link && img.link.trim());
                                return (
                                  <div key={idx} className="h-full shrink-0 relative overflow-hidden group/img">
                                    <img
                                      src={img.url}
                                      alt="Visual"
                                      className="h-full w-32 object-cover transition-transform duration-300 group-hover/img:scale-105"
                                    />
                                    <div className="absolute inset-y-0 right-0 w-[1px] bg-white/20" />
                                    {hasLink && (
                                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="p-1 rounded-full bg-white/30 backdrop-blur-xs text-white">
                                          <ExternalLink className="w-3 h-3" />
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-xs p-1 rounded-full text-white/80 border border-white/20">
                            <X className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ─── 3. PERSONALIZACIÓN DE COLOR & DEGRADADO ─── */}
                  <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#eae4d2] pb-3">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#4a5a22]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                          Fondo, Color y Degradado
                        </h4>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2d2618]">
                        <input
                          type="checkbox"
                          checked={b.gradientEnabled || false}
                          onChange={(e) => updateBanner({ gradientEnabled: e.target.checked })}
                          className="w-4 h-4 accent-[#4a5a22]"
                        />
                        <span>Activar Degradado</span>
                      </label>
                    </div>

                    {/* Paleta de Presets de Color */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#6b6048]">
                        Paleta de Color Base:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                        {BANNER_PRESETS.map((p) => {
                          const isAct = !b.gradientEnabled && (b.theme === p.id || (p.id === 'custom' && b.theme === 'custom'));
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                updateBanner({
                                  theme: p.id,
                                  gradientEnabled: false,
                                  bgColor: p.bg,
                                  textColor: p.text,
                                });
                              }}
                              className={`p-2 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1.5 ${
                                isAct
                                  ? 'border-[#4a5a22] shadow-sm ring-2 ring-[#4a5a22]/20 font-bold bg-[#f5efe3]'
                                  : 'border-[#d8ceb6] hover:border-[#6b6048] bg-white'
                              }`}
                            >
                              <div
                                className="w-6 h-6 rounded-full border border-black/10 shadow-xs"
                                style={{ backgroundColor: p.bg }}
                              />
                              <span className="text-[11px] truncate w-full">{p.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Opciones de Degradado cuando está activo */}
                    {b.gradientEnabled && (
                      <div className="pt-3 border-t border-[#eae4d2] space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold text-[#6b6048]">
                            Preajustes de Degradado:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                            {GRADIENT_PRESETS.map((gp, gIdx) => (
                              <button
                                key={gIdx}
                                type="button"
                                onClick={() => {
                                  updateBanner({
                                    gradientEnabled: true,
                                    gradientFrom: gp.from,
                                    gradientTo: gp.to,
                                    gradientDirection: gp.dir,
                                  });
                                }}
                                className="p-2 rounded-xl border border-[#d8ceb6] bg-[#f5efe3]/60 hover:bg-white text-center text-[11px] transition-all font-medium text-[#2d2618]"
                              >
                                <div
                                  className="h-3.5 w-full rounded-md mb-1 border border-black/10"
                                  style={{
                                    background: gp.dir === 'radial'
                                      ? `radial-gradient(circle at center, ${gp.from}, ${gp.to})`
                                      : `linear-gradient(to right, ${gp.from}, ${gp.to})`,
                                  }}
                                />
                                <span className="truncate block">{gp.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#2d2618]">Color Inicial:</label>
                            <div className="flex items-center gap-2">
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#d8ceb6] shrink-0">
                                <input
                                  type="color"
                                  value={b.gradientFrom || '#4a5a22'}
                                  onChange={(e) => updateBanner({ gradientFrom: e.target.value })}
                                  className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer border-0 p-0"
                                />
                              </div>
                              <input
                                type="text"
                                value={b.gradientFrom || '#4a5a22'}
                                onChange={(e) => updateBanner({ gradientFrom: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-xl bg-[#f5efe3]/50 border border-[#d8ceb6] font-mono text-xs uppercase"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#2d2618]">Color Final:</label>
                            <div className="flex items-center gap-2">
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#d8ceb6] shrink-0">
                                <input
                                  type="color"
                                  value={b.gradientTo || '#2d3813'}
                                  onChange={(e) => updateBanner({ gradientTo: e.target.value })}
                                  className="absolute -top-3 -left-3 w-16 h-16 cursor-pointer border-0 p-0"
                                />
                              </div>
                              <input
                                type="text"
                                value={b.gradientTo || '#2d3813'}
                                onChange={(e) => updateBanner({ gradientTo: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-xl bg-[#f5efe3]/50 border border-[#d8ceb6] font-mono text-xs uppercase"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#2d2618]">Dirección:</label>
                            <select
                              value={b.gradientDirection || 'to-r'}
                              onChange={(e) => updateBanner({ gradientDirection: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-xl bg-[#f5efe3]/50 border border-[#d8ceb6] text-xs text-[#2d2618]"
                            >
                              <option value="to-r">Horizontal → (Izquierda a Derecha)</option>
                              <option value="to-b">Vertical ↓ (Arriba hacia Abajo)</option>
                              <option value="to-br">Diagonal ↘ (Esquina a Esquina)</option>
                              <option value="radial">Radial ◉ (Centro al Exterior)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── 4. OPCIÓN DE BOTÓN CTA (Solo para Estilos 1 y 2) ─── */}
                  {bannerStyle === 'image-marquee' ? (
                    <div className="p-4 rounded-2xl bg-white border border-[#d8ceb6] text-xs text-[#5c523e] flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-[#4a5a22] shrink-0" />
                      <span>
                        En el <strong>Carrusel de Imágenes</strong> no se utiliza botón CTA global: cada foto cuenta con su propio enlace individual al pasar el cursor o hacer clic.
                      </span>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Botón CTA / Enlace de Acción
                          </h4>
                          <p className="text-[11px] text-[#6b6048]">
                            Permite a los usuarios acceder a una página o convocatoria con un solo clic.
                          </p>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer bg-[#f5efe3] px-3.5 py-2 rounded-xl border border-[#d8ceb6]">
                          <input
                            type="checkbox"
                            checked={showCta}
                            onChange={(e) => updateBanner({ showCta: e.target.checked })}
                            className="w-4 h-4 accent-[#4a5a22]"
                          />
                          <span className="text-xs font-bold text-[#2d2618]">
                            {showCta ? 'Botón Activado' : 'Sin Botón CTA'}
                          </span>
                        </label>
                      </div>

                      {showCta && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#eae4d2]">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#2d2618]">Texto del Botón CTA:</label>
                            <input
                              type="text"
                              value={b.ctaText || ''}
                              onChange={(e) => updateBanner({ ctaText: e.target.value })}
                              placeholder="Ej. Postular ahora, Ver más, Inscribirme"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3]/40 border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#2d2618]">Enlace de Destino:</label>
                            <input
                              type="text"
                              value={b.ctaLink || ''}
                              onChange={(e) => updateBanner({ ctaLink: e.target.value })}
                              placeholder="Ej. /capacitacion, /proyectos, #contacto"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5efe3]/40 border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ─── 5. CONTENIDO SEGÚN ESTILO SELECCIONADO ─── */}
                  {/* CASO 1: ESTÁTICO */}
                  {bannerStyle === 'static' && (
                    <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Texto del Mensaje de la Cinta
                      </h4>
                      <input
                        type="text"
                        value={b.message || ''}
                        onChange={(e) => updateBanner({ message: e.target.value })}
                        placeholder="Escribe el mensaje institucional..."
                        className="w-full px-4 py-3 rounded-xl bg-[#f5efe3]/40 border border-[#d8ceb6] text-sm text-[#2d2618]"
                      />
                    </div>
                  )}

                  {/* CASO 2: CARRUSEL DE TEXTO */}
                  {bannerStyle === 'text-marquee' && (
                    <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#eae4d2] pb-3">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Frases del Carrusel de Texto
                          </h4>
                          <p className="text-[11px] text-[#6b6048]">
                            Añade múltiples frases que rotarán continuamente en la marquesina.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-xs text-[#6b6048] font-semibold">Velocidad:</label>
                          <select
                            value={b.marqueeSpeed || 28}
                            onChange={(e) => updateBanner({ marqueeSpeed: parseInt(e.target.value) || 28 })}
                            className="px-3 py-1.5 rounded-lg bg-[#f5efe3] border border-[#d8ceb6] text-xs font-semibold"
                          >
                            <option value={42}>Lento (42s)</option>
                            <option value={28}>Normal (28s)</option>
                            <option value={16}>Rápido (16s)</option>
                          </select>
                        </div>
                      </div>

                      {/* Lista de Frases */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {texts.map((txt, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#4a5a22] w-5 text-center">{idx + 1}.</span>
                            <input
                              type="text"
                              value={txt}
                              onChange={(e) => handleUpdateMarqueeText(idx, e.target.value)}
                              className="flex-1 px-3.5 py-2 rounded-xl bg-[#f5efe3]/40 border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveMarqueeText(idx)}
                              disabled={texts.length <= 1}
                              className="p-2 text-red-700 hover:text-red-900 disabled:opacity-30"
                              title="Eliminar frase"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Añadir nueva frase */}
                      <div className="flex items-center gap-2 pt-2 border-t border-[#eae4d2]">
                        <input
                          type="text"
                          value={newBannerText}
                          onChange={(e) => setNewBannerText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddMarqueeText()}
                          placeholder="Nueva frase para el carrusel..."
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                        />
                        <button
                          type="button"
                          onClick={handleAddMarqueeText}
                          className="px-4 py-2.5 rounded-xl bg-[#4a5a22] text-white text-xs font-bold hover:bg-[#384519] flex items-center gap-1.5 shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Añadir Frase</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CASO 3: CARRUSEL DE IMÁGENES (SIN TEXTO, ALTO FIJO Y ENLACES INDIVIDUALES) */}
                  {bannerStyle === 'image-marquee' && (
                    <div className="p-5 rounded-2xl bg-white border border-[#d8ceb6] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#eae4d2] pb-3">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                            Galería del Carrusel de Imágenes
                          </h4>
                          <p className="text-[11px] text-[#6b6048]">
                            Imágenes de alto continuo fijo sin texto. Cada foto puede tener su propio enlace al hacer clic.
                          </p>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-[#6b6048] font-semibold">Alto Fijo:</label>
                            <select
                              value={b.imageHeight || 76}
                              onChange={(e) => updateBanner({ imageHeight: parseInt(e.target.value) || 76 })}
                              className="px-2.5 py-1.5 rounded-lg bg-[#f5efe3] border border-[#d8ceb6] text-xs font-semibold text-[#2d2618]"
                            >
                              <option value={64}>64px (Compacto)</option>
                              <option value={76}>76px (Estándar)</option>
                              <option value={90}>90px (Medio)</option>
                              <option value={110}>110px (Grande)</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="text-xs text-[#6b6048] font-semibold">Velocidad:</label>
                            <select
                              value={b.marqueeSpeed || 28}
                              onChange={(e) => updateBanner({ marqueeSpeed: parseInt(e.target.value) || 28 })}
                              className="px-2.5 py-1.5 rounded-lg bg-[#f5efe3] border border-[#d8ceb6] text-xs font-semibold text-[#2d2618]"
                            >
                              <option value={42}>Lenta (42s)</option>
                              <option value={28}>Normal (28s)</option>
                              <option value={16}>Rápida (16s)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Tarjeta Informativa de Medidas y Recorte */}
                      <div className="p-3.5 rounded-2xl bg-[#f5efe3] border border-[#d8ceb6] text-xs text-[#5c523e] space-y-1">
                        <div className="font-bold text-[#4a5a22] flex items-center gap-1.5">
                          <Info className="w-4 h-4 shrink-0" />
                          <span>Guía de Medidas y Recorte Automático:</span>
                        </div>
                        <p className="text-[11px] text-[#6b6048] leading-relaxed">
                          • <strong>Medida óptima recomendada:</strong> 480 × 160 px (proporción 3:1) o 600 × 200 px. Alto fijo en pantalla: <strong>76px</strong>.
                        </p>
                        <p className="text-[11px] text-[#6b6048] leading-relaxed">
                          • <strong>Ajuste y Recorte:</strong> Si subes una foto cuadrada o vertical, el sistema la recortará automáticamente (<code>object-cover</code>) sin deformarla. Puedes ajustar el <em>Enfoque de recorte</em> (Centro, Superior, Inferior) en cada foto.
                        </p>
                      </div>

                      {/* Presets de Biomas para añadir rápido */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#6b6048]">
                          Añadir Preajustes de Biomas con Enlaces Listos:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {BIOME_IMAGE_PRESETS.map((p, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => handleAddPresetImage(p)}
                              className="px-3 py-1.5 rounded-lg bg-[#f5efe3] hover:bg-[#eae4d2] border border-[#d8ceb6] text-[11px] font-semibold text-[#4a5a22] flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>{p.title}</span>
                              <span className="text-[10px] text-[#8c8068] font-mono">({p.link})</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Lista de Imágenes activas con editor de link y recorte */}
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 pt-1">
                        {images.map((img) => (
                          <div
                            key={img.id}
                            className="p-3 rounded-2xl bg-[#f5efe3]/50 border border-[#d8ceb6] flex flex-col sm:flex-row sm:items-center gap-3"
                          >
                            <img
                              src={img.url}
                              alt="Visual"
                              className="w-20 h-14 rounded-xl object-cover border border-[#d8ceb6] shrink-0"
                              style={{ objectPosition: img.position || 'center' }}
                            />
                            <div className="flex-1 space-y-1.5 min-w-0">
                              <div className="text-[11px] font-mono text-[#6b6048] truncate">
                                {img.url}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="flex items-center gap-1.5">
                                  <label className="text-[10px] uppercase font-bold text-[#4a5a22] shrink-0">
                                    Enlace:
                                  </label>
                                  <input
                                    type="text"
                                    value={img.link || ''}
                                    onChange={(e) => handleUpdateImageLink(img.id, e.target.value)}
                                    placeholder="Ej. /conocimiento o https://..."
                                    className="flex-1 px-2.5 py-1 rounded-lg bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                  />
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <label className="text-[10px] uppercase font-bold text-[#4a5a22] shrink-0">
                                    Recorte:
                                  </label>
                                  <select
                                    value={img.position || 'center'}
                                    onChange={(e) => {
                                      const updated = images.map((item) =>
                                        item.id === img.id ? { ...item, position: e.target.value } : item
                                      );
                                      updateBanner({ marqueeImages: updated });
                                    }}
                                    className="flex-1 px-2 py-1 rounded-lg bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                                  >
                                    <option value="center">Centro (Recomendado)</option>
                                    <option value="top">Superior / Arriba</option>
                                    <option value="bottom">Inferior / Abajo</option>
                                    <option value="left">Izquierda</option>
                                    <option value="right">Derecha</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveMarqueeImage(img.id)}
                              className="p-2 rounded-xl text-red-700 hover:bg-red-50 hover:text-red-900 shrink-0 transition-colors self-end sm:self-center"
                              title="Eliminar imagen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Añadir imagen personalizada por URL y Enlace */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#eae4d2]">
                        <input
                          type="text"
                          value={newBannerImgUrl}
                          onChange={(e) => setNewBannerImgUrl(e.target.value)}
                          placeholder="URL de la imagen (https://...)"
                          className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                        />
                        <button
                          type="button"
                          onClick={handleAddMarqueeImage}
                          className="px-4 py-2.5 rounded-xl bg-[#4a5a22] text-white text-xs font-bold hover:bg-[#384519] flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Añadir Imagen</span>
                        </button>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={newBannerImgLink}
                            onChange={(e) => setNewBannerImgLink(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddMarqueeImage()}
                            placeholder="Enlace opcional al hacer clic (ej. /capacitacion, /nosotros o https://...)"
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón Guardar Cambios */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => showToast('Configuración de cinta de anuncios guardada')}
                      className="px-6 py-3 rounded-xl bg-[#4a5a22] text-[#f5efe3] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#384519] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Guardar Cambios de la Cinta</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MÓDULO 4: GESTIÓN DE ALIADOS INSTITUCIONALES & LOGOTIPOS
           ───────────────────────────────────────────────────────────── */}
        {adminModule === 'alianzas' && (
          <div className="space-y-6">
            {/* Header del Módulo */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#4a5a22]">
                  Directorio Institucional
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                  Gestión de Aliados y Logotipos
                </h2>
                <p className="text-xs sm:text-sm text-[#6b6048] font-light leading-relaxed">
                  Configura los logotipos oficiales y sus enlaces directos que se muestran en la sección pública (/alianzas-institucionales). Soporta enlaces directos de Google Drive, imágenes web o archivos locales.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAlliances}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] hover:bg-[#f5efe3] text-xs font-semibold text-[#6b6048] hover:text-[#2d2618] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restablecer</span>
                </button>
                <button
                  type="button"
                  onClick={handleStartCreateAlliance}
                  className="px-5 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Logotipo</span>
                </button>
              </div>
            </div>

            {/* Barra de búsqueda y conteo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7e68]" />
                <input
                  type="text"
                  value={allianceSearch}
                  onChange={(e) => setAllianceSearch(e.target.value)}
                  placeholder="Buscar por sitio web o URL de logotipo..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] placeholder-[#9a8e78] focus:outline-none focus:border-[#4a5a22] shadow-2xs"
                />
              </div>
              <span className="text-xs text-[#8a7e68] font-mono">
                Total Aliados: <strong className="text-[#4a5a22]">{alliances.length}</strong>
              </span>
            </div>

            {/* Grilla de Tarjetas de Aliados (Logotipo, Nombre y Sitio Web) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alliances
                .filter((a) => {
                  if (!allianceSearch.trim()) return true;
                  const q = allianceSearch.toLowerCase();
                  return (
                    a.name?.toLowerCase().includes(q) ||
                    a.shortName?.toLowerCase().includes(q) ||
                    a.website?.toLowerCase().includes(q) ||
                    a.logo?.toLowerCase().includes(q)
                  );
                })
                .map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-5 rounded-2xl bg-white border border-[#d8ceb6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Visualizador del Logo a tamaño completo */}
                      <div className="w-full h-44 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] p-4 flex items-center justify-center overflow-hidden relative">
                        {item.logo ? (
                          <img
                            src={formatDriveUrl(item.logo)}
                            alt={item.name || 'Logotipo de Aliado'}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const currentSrc = e.currentTarget.src || '';
                              if (currentSrc.includes('googleusercontent.com/d/') && !e.currentTarget.dataset.retried) {
                                e.currentTarget.dataset.retried = 'true';
                                const idMatch = currentSrc.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
                                if (idMatch && idMatch[1]) {
                                  e.currentTarget.src = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
                                }
                              }
                            }}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-12 h-12 rounded-xl bg-[#4a5a22]/15 border border-[#4a5a22]/30 flex items-center justify-center text-[#4a5a22]">
                              <ImageIcon className="w-6 h-6 opacity-60" />
                            </div>
                            <span className="text-xs font-sans text-[#8a7e68]">
                              Sin logotipo asignado
                            </span>
                          </div>
                        )}

                        {item.logo?.includes('drive.google.com') && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#4a5a22] text-[#f5efe3] text-[9px] font-mono font-bold tracking-wider">
                            Google Drive
                          </span>
                        )}
                      </div>

                      {/* Nombre del Aliado / Institución */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a5a22] block">
                          Institución / Aliado
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#2d2618] line-clamp-1">
                          {item.name || item.shortName || 'Aliado Institucional'}
                        </h4>
                      </div>

                      {/* Sitio Web Oficial */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7e68] block">
                          Sitio Web Oficial
                        </span>
                        {item.website ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#4a5a22] font-semibold hover:underline truncate max-w-full"
                          >
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{item.website}</span>
                          </a>
                        ) : (
                          <span className="text-xs text-[#8a7e68] italic">
                            Sin sitio web asignado
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="pt-3 border-t border-[#eae4d2] flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingAlliance(JSON.parse(JSON.stringify(item)))}
                        className="px-3.5 py-1.5 rounded-lg bg-[#eae4d2] hover:bg-[#4a5a22] hover:text-[#f5efe3] text-[#2d2618] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAllianceItem(item.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
                        title="Eliminar aliado"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            MÓDULO: CUERPO DE GOBERNANZA E INVESTIGADORES
            ══════════════════════════════════════════════════════════════════ */}
        {adminModule === 'gobernanza' && (
          <div className="space-y-6">
            {/* Header del Módulo */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#eae4d2]/80 border border-[#d8ceb6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#4a5a22]">
                  Estructura Directiva & Investigación
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2d2618] font-light">
                  Gobierno y Estructura Institucional
                </h2>
                <p className="text-xs sm:text-sm text-[#6b6048] font-light leading-relaxed">
                  Configura a los consejeros, directores y científicos colegiados mostrados en la sección pública (/gobernanza). Soporta enlaces directos de Google Drive (convertidos automáticamente con previsualización en vivo), semblanzas institucionales y atribuciones.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetGovMembers}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] hover:bg-[#f5efe3] text-xs font-semibold text-[#6b6048] hover:text-[#2d2618] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restablecer</span>
                </button>
                <button
                  type="button"
                  onClick={handleStartCreateGovMember}
                  className="px-5 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Miembro</span>
                </button>
              </div>
            </div>

            {/* Barra de búsqueda y conteo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7e68]" />
                <input
                  type="text"
                  value={govSearch}
                  onChange={(e) => setGovSearch(e.target.value)}
                  placeholder="Buscar miembro por nombre, cargo o área..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] placeholder-[#9a8e78] focus:outline-none focus:border-[#4a5a22] shadow-2xs"
                />
              </div>
              <span className="text-xs text-[#8a7e68] font-mono">
                Total Miembros: <strong className="text-[#4a5a22]">{governanceMembers.length}</strong>
              </span>
            </div>

            {/* Grilla de Tarjetas de Miembros de Gobernanza */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {governanceMembers
                .filter((m) => {
                  if (!govSearch.trim()) return true;
                  const q = govSearch.toLowerCase();
                  const name = m.name?.toLowerCase() || '';
                  const displayRole = (typeof m.displayRole === 'object' ? `${m.displayRole?.es} ${m.displayRole?.en}` : m.displayRole || '').toLowerCase();
                  const role = (typeof m.role === 'object' ? `${m.role?.es} ${m.role?.en}` : m.role || '').toLowerCase();
                  const area = (typeof m.area === 'object' ? `${m.area?.es} ${m.area?.en}` : m.area || '').toLowerCase();
                  const country = (typeof m.country === 'object' ? `${m.country?.es} ${m.country?.en}` : m.country || '').toLowerCase();
                  return name.includes(q) || displayRole.includes(q) || role.includes(q) || area.includes(q) || country.includes(q);
                })
                .map((member) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl bg-white border border-[#d8ceb6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Fotografía del Miembro con Soporte Drive */}
                      <div className="w-full h-56 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] overflow-hidden relative">
                        {member.img ? (
                          <img
                            src={formatDriveUrl(member.img)}
                            alt={member.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const currentSrc = e.currentTarget.src || '';
                              if (currentSrc.includes('googleusercontent.com/d/') && !e.currentTarget.dataset.retried) {
                                e.currentTarget.dataset.retried = 'true';
                                const idMatch = currentSrc.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
                                if (idMatch && idMatch[1]) {
                                  e.currentTarget.src = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
                                  return;
                                }
                              }
                              if (member.id === 'francisco-solorio') {
                                e.currentTarget.src = '/imports/Perfiles/FranciscoSolorio.png';
                              }
                            }}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 text-[#8a7e68]">
                            <User className="w-10 h-10 opacity-30 text-[#4a5a22] mb-1" />
                            <span className="text-xs">Sin fotografía asignada</span>
                          </div>
                        )}

                        {member.num && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#1f1a12]/80 text-[#f5efe3] text-[10px] font-mono font-semibold">
                            #{member.num}
                          </span>
                        )}

                        {typeof member.img === 'string' && member.img.includes('drive.google.com') && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#4a5a22] text-[#f5efe3] text-[9px] font-mono font-bold tracking-wider">
                            Google Drive
                          </span>
                        )}
                      </div>

                      {/* Metadatos */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#4a5a22]">
                            {typeof member.area === 'object' ? member.area.es : member.area || 'Gobernanza'}
                          </span>
                          <span className="text-[10px] text-[#8a7e68]">
                            &bull; {typeof member.country === 'object' ? member.country.es : member.country || 'Internacional'}
                          </span>
                        </div>

                        <h4 className="font-serif text-base text-[#2d2618] font-bold leading-snug line-clamp-1" title={member.name}>
                          {member.name}
                        </h4>

                        <p className="text-xs font-semibold text-[#5a6b2a] line-clamp-1">
                          {typeof member.displayRole === 'object' ? member.displayRole.es : (typeof member.role === 'object' ? member.role.es : member.displayRole || member.role || 'Miembro')}
                        </p>

                        <p className="text-[11px] text-[#6b6048] font-light line-clamp-2 leading-relaxed pt-1">
                          {typeof member.bio === 'object' ? member.bio.es : member.bio}
                        </p>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="pt-3 border-t border-[#eae4d2] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7a6e58]">
                        {member.social?.email && (
                          <span className="p-1 rounded-md bg-[#eae4d2]/70 text-[#4a5a22]" title={member.social.email}>
                            <Mail className="w-3 h-3" />
                          </span>
                        )}
                        {member.responsibilities && (
                          <span className="text-[10px] font-mono text-[#8a7e68]">
                            {member.responsibilities.length} atribuciones
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingGovMember(JSON.parse(JSON.stringify(member)))}
                          className="px-3 py-1.5 rounded-lg bg-[#eae4d2] hover:bg-[#4a5a22] hover:text-[#f5efe3] text-[#2d2618] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGovMemberItem(member.id, member.name)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
                          title="Eliminar miembro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* ─── MODAL DE EDICIÓN / REGISTRO DE ALIADO ─── */}
      <AnimatePresence>
        {editingAlliance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-[#eae4d2] border-2 border-[#4a5a22] shadow-2xl overflow-hidden text-[#2d2618]"
            >
              {/* Header Modal */}
              <div className="p-5 bg-[#1f1a12] text-[#f5efe3] flex items-center justify-between border-b border-[#3d3422]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#4a5a22] text-[#f5efe3] flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span className="font-serif text-lg font-light text-white">
                    {editingAlliance.id?.startsWith('alliance-')
                      ? 'Registrar Nuevo Logotipo'
                      : 'Editar Logotipo de Aliado'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingAlliance(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulario de Aliado */}
              <form onSubmit={handleSaveAllianceForm} className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#eae4d2]">
                {/* Nombre de la Institución / Aliado */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    Nombre de la Institución / Organización
                  </label>
                  <input
                    type="text"
                    value={editingAlliance.name || ''}
                    onChange={(e) => setEditingAlliance({ ...editingAlliance, name: e.target.value })}
                    placeholder="Ej. World Environmental Sustainability Summit (WESS)"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] focus:outline-none focus:border-[#4a5a22]"
                  />
                </div>

                {/* URL del Logotipo con Helper Google Drive */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    URL del Logotipo (Google Drive, Imagen Web o Local) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAlliance.logo || ''}
                    onChange={(e) => setEditingAlliance({ ...editingAlliance, logo: e.target.value })}
                    placeholder="Pega enlace de Google Drive (https://drive.google.com/file/d/.../view) o URL de imagen"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-xs font-mono text-[#2d2618] focus:outline-none focus:border-[#4a5a22]"
                  />
                  <div className="p-3 rounded-xl bg-[#4a5a22]/10 border border-[#4a5a22]/20 text-[11px] text-[#3a4a18] flex items-start gap-2 leading-relaxed">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#4a5a22] mt-0.5" />
                    <span>
                      <strong>Soporte automático de Google Drive:</strong> Puedes pegar directamente el enlace compartido normal. El sistema detecta y convierte el ID automáticamente. (Asegúrate que el archivo esté compartido como "Cualquier persona con el enlace").
                    </span>
                  </div>
                </div>

                {/* Previsualización en Vivo del Logotipo */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b6048]">
                    Previsualización en Vivo de la Tarjeta
                  </label>
                  <div className="w-full h-40 rounded-2xl bg-white border border-[#d8ceb6] p-4 flex items-center justify-center overflow-hidden shadow-inner">
                    {editingAlliance.logo ? (
                      <img
                        src={formatDriveUrl(editingAlliance.logo)}
                        alt="Vista previa"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const currentSrc = e.currentTarget.src || '';
                          if (currentSrc.includes('googleusercontent.com/d/') && !e.currentTarget.dataset.retried) {
                            e.currentTarget.dataset.retried = 'true';
                            const idMatch = currentSrc.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
                            if (idMatch && idMatch[1]) {
                              e.currentTarget.src = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
                            }
                          }
                        }}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center space-y-1 text-xs text-[#8a7e68]">
                        <ImageIcon className="w-6 h-6 mx-auto opacity-40 text-[#4a5a22]" />
                        <span>Escribe o pega una URL para ver la previsualización</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Categoría / Tipo de Aliado */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    Categoría de Alianza
                  </label>
                  <select
                    value={editingAlliance.type || 'multilateral'}
                    onChange={(e) => setEditingAlliance({ ...editingAlliance, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] focus:outline-none focus:border-[#4a5a22]"
                  >
                    <option value="multilateral">Organismo Multilateral</option>
                    <option value="academic">Red Académica & Científica</option>
                    <option value="territorial">Organización Comunitaria / Territorial</option>
                    <option value="philanthropic">Fondo & Filantropía</option>
                  </select>
                </div>

                {/* Sitio Web Oficial */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    Sitio Web Oficial (Opcional)
                  </label>
                  <input
                    type="url"
                    value={editingAlliance.website || ''}
                    onChange={(e) => setEditingAlliance({ ...editingAlliance, website: e.target.value })}
                    placeholder="https://ejemplo.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                  />
                </div>

                {/* Botones */}
                <div className="pt-4 border-t border-[#d8ceb6] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingAlliance(null)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] hover:bg-[#f5efe3] text-xs font-semibold text-[#6b6048] transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Logotipo</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* ─── MODAL DE EDICIÓN / REGISTRO DE CUERPO DE GOBERNANZA ─── */}
        {editingGovMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-[#eae4d2] border-2 border-[#4a5a22] shadow-2xl overflow-hidden text-[#2d2618]"
            >
              {/* Header Modal */}
              <div className="p-5 bg-[#1f1a12] text-[#f5efe3] flex items-center justify-between border-b border-[#3d3422]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#4a5a22] text-[#f5efe3] flex items-center justify-center text-xs font-bold">
                    <User className="w-4 h-4" />
                  </span>
                  <span className="font-serif text-lg font-light text-white">
                    {editingGovMember.id?.startsWith('gov-')
                      ? 'Registrar Nuevo Miembro de Gobernanza'
                      : 'Editar Miembro de Gobernanza'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingGovMember(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSaveGovMemberForm} className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#eae4d2]">
                {/* Nombre Oficial & Número */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Nombre Completo y Grado Académico *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingGovMember.name || ''}
                      onChange={(e) => setEditingGovMember({ ...editingGovMember, name: e.target.value })}
                      placeholder="Ej. MTRO. LUIS GARCÍA GONZÁLEZ"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] font-bold focus:outline-none focus:border-[#4a5a22]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      N° Posición
                    </label>
                    <input
                      type="text"
                      value={editingGovMember.num || ''}
                      onChange={(e) => setEditingGovMember({ ...editingGovMember, num: e.target.value })}
                      placeholder="01"
                      className="w-full px-3 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-center font-mono font-bold text-[#2d2618]"
                    />
                  </div>
                </div>

                {/* Categoría / Sección del Colegiado */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    Sección Institucional (Pestaña en /gobernanza) *
                  </label>
                  <select
                    value={editingGovMember.category || 'consejeria'}
                    onChange={(e) => setEditingGovMember({ ...editingGovMember, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs font-semibold text-[#2d2618] focus:outline-none focus:border-[#4a5a22]"
                  >
                    <option value="gobierno">Gobierno (Presidencia & Secretaría Ejecutiva)</option>
                    <option value="direcciones">Direcciones (Dirección Nacional & Operativa)</option>
                    <option value="consejeria">Consejería (Consejo Honorífico & Científico)</option>
                  </select>
                </div>

                {/* Cargo / Rol Principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Cargo Principal (Español) *
                    </label>
                    <input
                      type="text"
                      required
                      value={
                        typeof editingGovMember.displayRole === 'object'
                          ? editingGovMember.displayRole?.es || ''
                          : editingGovMember.displayRole || ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingGovMember({
                          ...editingGovMember,
                          displayRole: typeof editingGovMember.displayRole === 'object'
                            ? { ...editingGovMember.displayRole, es: val }
                            : { es: val, en: '' },
                          role: typeof editingGovMember.role === 'object'
                            ? { ...editingGovMember.role, es: val.toUpperCase() }
                            : { es: val.toUpperCase(), en: '' },
                        });
                      }}
                      placeholder="Ej. Consejero Presidente y Fundador"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Cargo Principal (Inglés)
                    </label>
                    <input
                      type="text"
                      value={
                        typeof editingGovMember.displayRole === 'object'
                          ? editingGovMember.displayRole?.en || ''
                          : ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingGovMember({
                          ...editingGovMember,
                          displayRole: typeof editingGovMember.displayRole === 'object'
                            ? { ...editingGovMember.displayRole, en: val }
                            : { es: editingGovMember.displayRole || '', en: val },
                          role: typeof editingGovMember.role === 'object'
                            ? { ...editingGovMember.role, en: val.toUpperCase() }
                            : { es: editingGovMember.role || '', en: val.toUpperCase() },
                        });
                      }}
                      placeholder="Ej. President and Founder Councillor"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                </div>

                {/* Colegiado / Tag Superior & Área */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Colegiado / Tag Superior (ES)
                    </label>
                    <input
                      type="text"
                      value={
                        typeof editingGovMember.tag === 'object'
                          ? editingGovMember.tag?.es || ''
                          : editingGovMember.tag || ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingGovMember({
                          ...editingGovMember,
                          tag: typeof editingGovMember.tag === 'object'
                            ? { ...editingGovMember.tag, es: val }
                            : { es: val, en: '' },
                        });
                      }}
                      placeholder="Ej. Presidencia & Estrategia Multilateral"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Área / Especialidad (ES)
                    </label>
                    <input
                      type="text"
                      value={
                        typeof editingGovMember.area === 'object'
                          ? editingGovMember.area?.es || ''
                          : editingGovMember.area || ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingGovMember({
                          ...editingGovMember,
                          area: typeof editingGovMember.area === 'object'
                            ? { ...editingGovMember.area, es: val }
                            : { es: val, en: '' },
                        });
                      }}
                      placeholder="Ej. Gobernanza Institucional"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                </div>

                {/* País / Cobertura Territorial */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    País o Región Territorial
                  </label>
                  <input
                    type="text"
                    value={
                      typeof editingGovMember.country === 'object'
                        ? editingGovMember.country?.es || ''
                        : editingGovMember.country || ''
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingGovMember({
                        ...editingGovMember,
                        country: typeof editingGovMember.country === 'object'
                          ? { ...editingGovMember.country, es: val }
                          : { es: val, en: '' },
                      });
                    }}
                    placeholder="Ej. México / Internacional"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                  />
                </div>

                {/* URL de Fotografía con Helper Google Drive */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    Fotografía del Miembro (Google Drive, Web URL o Local)
                  </label>
                  <input
                    type="text"
                    value={editingGovMember.img || ''}
                    onChange={(e) => setEditingGovMember({ ...editingGovMember, img: e.target.value })}
                    placeholder="Pega enlace de Google Drive (https://drive.google.com/file/d/.../view) o enlace de imagen"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-xs font-mono text-[#2d2618] focus:outline-none focus:border-[#4a5a22]"
                  />
                  <div className="p-3 rounded-xl bg-[#4a5a22]/10 border border-[#4a5a22]/20 text-[11px] text-[#3a4a18] flex items-start gap-2 leading-relaxed">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#4a5a22] mt-0.5" />
                    <span>
                      <strong>Soporte automático de Google Drive:</strong> Puedes pegar directamente el link compartido de Drive. El sistema lo transforma al servidor de alta disponibilidad de Google sin filtros.
                    </span>
                  </div>
                </div>

                {/* Previsualización en Vivo de la Fotografía */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b6048]">
                    Previsualización en Vivo de la Foto
                  </label>
                  <div className="w-full h-44 rounded-2xl bg-white border border-[#d8ceb6] p-2 flex items-center justify-center overflow-hidden shadow-inner">
                    {editingGovMember.img ? (
                      <img
                        src={formatDriveUrl(editingGovMember.img)}
                        alt="Vista previa de perfil"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const currentSrc = e.currentTarget.src || '';
                          if (currentSrc.includes('googleusercontent.com/d/') && !e.currentTarget.dataset.retried) {
                            e.currentTarget.dataset.retried = 'true';
                            const idMatch = currentSrc.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
                            if (idMatch && idMatch[1]) {
                              e.currentTarget.src = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
                            }
                          }
                        }}
                        className="h-full w-auto object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-center space-y-1 text-xs text-[#8a7e68]">
                        <ImageIcon className="w-6 h-6 mx-auto opacity-40 text-[#4a5a22]" />
                        <span>Pega un enlace de foto para ver la previsualización</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Semblanza Institucional (Biografía) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                    Semblanza Institucional / Biografía (Español) *
                  </label>
                  <textarea
                    rows={4}
                    value={
                      typeof editingGovMember.bio === 'object'
                        ? editingGovMember.bio?.es || ''
                        : editingGovMember.bio || ''
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingGovMember({
                        ...editingGovMember,
                        bio: typeof editingGovMember.bio === 'object'
                          ? { ...editingGovMember.bio, es: val }
                          : { es: val, en: '' },
                      });
                    }}
                    placeholder="Describe la trayectoria profesional y rol en el Consejo..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] leading-relaxed"
                  />
                </div>

                {/* Atribuciones y Responsabilidades Directivas (Línea por línea) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Atribuciones y Responsabilidades Directivas
                    </label>
                    <span className="text-[11px] text-[#8a7e68] font-mono">1 atribución por línea</span>
                  </div>
                  <textarea
                    rows={3}
                    value={
                      Array.isArray(editingGovMember.responsibilities)
                        ? editingGovMember.responsibilities
                            .map((r) => (typeof r === 'object' ? r.es || r.en : r))
                            .join('\n')
                        : ''
                    }
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setEditingGovMember({
                        ...editingGovMember,
                        responsibilities: lines.map((line) => ({ es: line, en: line })),
                      });
                    }}
                    placeholder="Conducción institucional y representación...&#10;Orientación estratégica de la agenda..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618] font-sans leading-relaxed"
                  />
                </div>

                {/* Contacto & Redes Sociales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Correo(s) Institucional(es) (puedes separar varios con coma)
                    </label>
                    <input
                      type="text"
                      value={editingGovMember.social?.email || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), email: e.target.value },
                        })
                      }
                      placeholder="presidencia@consejocga.org, despacho@consejocga.org"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Perfil de LinkedIn (URL)
                    </label>
                    <input
                      type="url"
                      value={editingGovMember.social?.linkedin || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), linkedin: e.target.value },
                        })
                      }
                      placeholder="https://linkedin.com/in/usuario"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Teléfono México (con lada)
                    </label>
                    <input
                      type="text"
                      value={editingGovMember.social?.phoneMx || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), phoneMx: e.target.value },
                        })
                      }
                      placeholder="+52 55 3083 1032"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Teléfono Canadá (con lada)
                    </label>
                    <input
                      type="text"
                      value={editingGovMember.social?.phoneCa || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), phoneCa: e.target.value },
                        })
                      }
                      placeholder="+1 437 290 8820"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Facebook Personal / Institucional (URL)
                    </label>
                    <input
                      type="url"
                      value={editingGovMember.social?.facebook || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), facebook: e.target.value },
                        })
                      }
                      placeholder="https://facebook.com/usuario"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Instagram Personal / Institucional (URL)
                    </label>
                    <input
                      type="url"
                      value={editingGovMember.social?.instagram || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), instagram: e.target.value },
                        })
                      }
                      placeholder="https://instagram.com/usuario"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      WhatsApp (Enlace directo wa.me o número internacional)
                    </label>
                    <input
                      type="text"
                      value={editingGovMember.social?.whatsapp || ''}
                      onChange={(e) =>
                        setEditingGovMember({
                          ...editingGovMember,
                          social: { ...(editingGovMember.social || {}), whatsapp: e.target.value },
                        })
                      }
                      placeholder="https://wa.me/525545691548"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                    />
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="pt-4 border-t border-[#d8ceb6] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingGovMember(null)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] hover:bg-[#f5efe3] text-xs font-semibold text-[#6b6048] transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Miembro</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL DE PREVISUALIZACIÓN DEL POP-UP (TEST CON CUALQUIERA DE LOS 4 DISEÑOS EN EL ADMIN) ─── */}
      <AnimatePresence>
        {previewingPopupItem && (
          <PopUpRenderer
            popup={previewingPopupItem}
            onClose={() => setPreviewingPopupItem(null)}
            isPreview={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
