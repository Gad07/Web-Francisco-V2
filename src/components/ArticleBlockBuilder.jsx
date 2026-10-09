import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  AlignLeft,
  Heading,
  Quote,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Minus,
  Sparkles,
  Columns,
  Eye,
  Edit3,
  GripVertical,
  Sliders,
  Layout,
  Layers,
  X,
  Check,
  ChevronRight,
  ExternalLink,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { BLOCK_TYPES, createBlock, createColumnItem } from '../utils/articleBlocks.js';
import ArticleBlocksRenderer from './ArticleBlocksRenderer.jsx';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

/**
 * Maquetador Visual Drag & Drop Tipo Elementor para el Consejo Global Ambiental.
 * - Reordenamiento fluido con Drag & Drop (Framer Motion Reorder).
 * - Canvas visual limpio sin redundancia ni formularios saturados.
 * - Inspector lateral / emergente de propiedades para editar cualquier bloque con un clic.
 * - Selector de estructuras de columnas estilo Elementor (1 col, 2 cols 50/50, 3 cols 33/33/33, 4 cols 25x4).
 * - Previsualización reactiva en tiempo real con las 4 plantillas de lectura:
 *   (1. Editorial Clásico, 2. Portada Inmersiva, 3. Revista Split, 4. Storytelling Visual).
 */
export default function ArticleBlockBuilder({
  blocks = [],
  onChange,
  defaultTemplate = 'classic',
}) {
  const [activeTab, setActiveTab] = useState('builder'); // 'builder' | 'preview'
  const [previewTemplate, setPreviewTemplate] = useState(defaultTemplate || 'classic');
  const [editingBlockIndex, setEditingBlockIndex] = useState(null); // Índice del bloque abierto en el Inspector
  const [editingColumnIndex, setEditingColumnIndex] = useState(0); // Para bloques de columnas
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState(null); // { type, columnCount }
  const [activeDropZone, setActiveDropZone] = useState(null); // 'top' | number | 'bottom' | 'empty'

  const selectedBlock =
    editingBlockIndex !== null && blocks[editingBlockIndex]
      ? blocks[editingBlockIndex]
      : null;

  // ── MANEJADOR MAESTRO DE INSERCIÓN DRAG & DROP ──
  // Primero arrastra el elemento / widget y al soltarlo abre automáticamente el configurador
  const handleDropAtPosition = (targetIndex, widgetData = null) => {
    const data = widgetData || draggedWidget;
    if (!data) return;

    let newBlock;
    if (data.type === 'columns') {
      const colCount = data.columnCount || 3;
      newBlock = {
        id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: 'columns',
        columnCount: colCount,
        columns: Array.from({ length: colCount }, (_, i) => createColumnItem(i + 1)),
      };
    } else {
      newBlock = createBlock(data.type);
    }

    const insertIndex =
      targetIndex === null || targetIndex === undefined
        ? blocks.length
        : Math.max(0, Math.min(targetIndex, blocks.length));

    const copy = [...blocks];
    copy.splice(insertIndex, 0, newBlock);
    onChange(copy);

    // ABRE AUTOMÁTICAMENTE EL INSPECTOR PARA CONFIGURAR EL ELEMENTO RECIÉN SOLTADO
    setEditingBlockIndex(insertIndex);
    setEditingColumnIndex(0);
    setDraggedWidget(null);
    setActiveDropZone(null);
    setShowSectionPicker(false);
  };

  const handleAddBlock = (type, targetIndex = null) => {
    handleDropAtPosition(targetIndex, { type });
  };

  const handleAddColumns = (columnCount, targetIndex = null) => {
    handleDropAtPosition(targetIndex, { type: 'columns', columnCount });
  };

  const handleUpdateSelectedBlock = (patch) => {
    if (editingBlockIndex === null) return;
    const copy = [...blocks];
    copy[editingBlockIndex] = { ...copy[editingBlockIndex], ...patch };
    onChange(copy);
  };

  const handleUpdateColumnItem = (colIndex, patch) => {
    if (!selectedBlock || selectedBlock.type !== 'columns') return;
    const nextCols = [...(selectedBlock.columns || [])];
    nextCols[colIndex] = { ...nextCols[colIndex], ...patch };
    handleUpdateSelectedBlock({ columns: nextCols });
  };

  const handleUpdateColumnCount = (targetCount) => {
    if (!selectedBlock || selectedBlock.type !== 'columns') return;
    const currentCols = selectedBlock.columns || [];
    let nextCols = [...currentCols];

    if (targetCount > currentCols.length) {
      for (let i = currentCols.length + 1; i <= targetCount; i++) {
        nextCols.push(createColumnItem(i));
      }
    } else if (targetCount < currentCols.length) {
      nextCols = nextCols.slice(0, targetCount);
    }

    handleUpdateSelectedBlock({
      columnCount: targetCount,
      columns: nextCols,
    });
    if (editingColumnIndex >= targetCount) {
      setEditingColumnIndex(targetCount - 1);
    }
  };

  const handleDuplicateBlock = (index, e) => {
    if (e) e.stopPropagation();
    const target = blocks[index];
    const clone = JSON.parse(JSON.stringify(target));
    clone.id = `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const copy = [...blocks];
    copy.splice(index + 1, 0, clone);
    onChange(copy);
    setEditingBlockIndex(index + 1);
  };

  const handleRemoveBlock = (index, e) => {
    if (e) e.stopPropagation();
    if (blocks.length <= 1) {
      onChange([createBlock('paragraph')]);
      setEditingBlockIndex(0);
      return;
    }
    const copy = blocks.filter((_, i) => i !== index);
    onChange(copy);
    if (editingBlockIndex === index) {
      setEditingBlockIndex(null);
    } else if (editingBlockIndex > index) {
      setEditingBlockIndex(editingBlockIndex - 1);
    }
  };

  const handleMoveUp = (index, e) => {
    if (e) e.stopPropagation();
    if (index === 0) return;
    const copy = [...blocks];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    onChange(copy);
    if (editingBlockIndex === index) setEditingBlockIndex(index - 1);
  };

  const handleMoveDown = (index, e) => {
    if (e) e.stopPropagation();
    if (index >= blocks.length - 1) return;
    const copy = [...blocks];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    onChange(copy);
    if (editingBlockIndex === index) setEditingBlockIndex(index + 1);
  };

  const getMeta = (type) => {
    return (
      BLOCK_TYPES.find((b) => b.id === type) || {
        name: 'Elemento',
        desc: '',
        icon: 'AlignLeft',
      }
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* ══════════════════════════════════════════════════════════════════
          BARRA DE CONTROL SUPERIOR (TIPO ELEMENTOR)
         ══════════════════════════════════════════════════════════════════ */}
      <div className="p-4 rounded-3xl bg-[#1f1a12] text-[#f5efe3] border border-[#3d3422] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#4a5a22] flex items-center justify-center text-white shadow-md">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-normal text-white">
                Maquetador Visual
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#a8bc65]/20 text-[#a8bc65] border border-[#a8bc65]/30">
                Drag & Drop
              </span>
            </div>
            <p className="text-xs text-[#cdd2a6]/80 font-light">
              Arrastra y suelta elementos para reordenar tu publicación libremente
            </p>
          </div>
        </div>

        {/* MODOS: BUILDER / LIVE PREVIEW */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Selector de Plantilla de Lectura */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
            <span className="text-[10px] font-mono uppercase text-[#a8bc65] font-bold px-2 hidden md:inline">
              Estilo:
            </span>
            {[
              { id: 'classic', label: '1. Clásico' },
              { id: 'immersive', label: '2. Inmersivo' },
              { id: 'split', label: '3. Split' },
              { id: 'story', label: '4. Story' },
            ].map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setPreviewTemplate(tpl.id)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                  previewTemplate === tpl.id
                    ? 'bg-[#4a5a22] text-white shadow-xs font-semibold'
                    : 'text-[#d8ceb6] hover:text-white'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>

          {/* Toggle Builder / Vista Previa */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-[#4a5a22] text-white shadow-xs'
                  : 'text-[#d8ceb6] hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Maquetador</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[#4a5a22] text-white shadow-xs'
                  : 'text-[#d8ceb6] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          VISTA 1: MAQUETADOR DRAG & DROP + INSPECTOR ELEMENTOR
         ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── PANEL IZQUIERDO: WIDGETS Y PALETA DRAG & DROP (4 COLUMNAS) ── */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-4">
            <div className="p-5 rounded-3xl bg-white border border-[#d8ceb6] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eae4d2]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4a5a22] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4a5a22]" />
                  <span>Paleta de Elementos</span>
                </span>
                <span className="text-[10px] font-mono text-[#4a5a22] font-semibold bg-[#4a5a22]/10 px-2 py-0.5 rounded-full">
                  Arrastra al Lienzo
                </span>
              </div>

              {/* GRUPO 1: ESTRUCTURAS DE COLUMNAS DRAGGABLE */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7e68] block">
                  1. Estructuras Multicolumna
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: 'columns', columnCount: 2, label: '2 Col (50/50)', badge: '2 Cols' },
                    { type: 'columns', columnCount: 3, label: '3 Col (33%)', badge: '3 Cols' },
                    { type: 'columns', columnCount: 4, label: '4 Col (25%)', badge: '4 Cols' },
                  ].map((colW) => (
                    <div
                      key={`col-${colW.columnCount}`}
                      draggable={true}
                      onDragStart={(e) => {
                        const payload = { type: 'columns', columnCount: colW.columnCount };
                        e.dataTransfer.setData('application/json', JSON.stringify(payload));
                        e.dataTransfer.effectAllowed = 'copy';
                        setDraggedWidget(payload);
                      }}
                      onDragEnd={() => {
                        setDraggedWidget(null);
                        setActiveDropZone(null);
                      }}
                      onClick={() => handleDropAtPosition(blocks.length, colW)}
                      title="Arrastra este grid al lienzo o haz clic para insertar"
                      className="p-2.5 rounded-xl bg-[#f5efe3]/80 hover:bg-[#eae4d2] border border-[#d8ceb6] hover:border-[#4a5a22] transition-all text-center cursor-grab active:cursor-grabbing shadow-2xs group flex flex-col justify-between items-center"
                    >
                      <div className="flex items-center gap-1 text-[#4a5a22] mb-1">
                        <GripVertical className="w-3 h-3 text-[#8a7e68] group-hover:text-[#4a5a22]" />
                        <Columns className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#2d2618] block leading-tight">
                        {colW.badge}
                      </span>
                      <span className="text-[9px] text-[#7a6e58] font-light">
                        {colW.columnCount === 2 ? '50/50' : colW.columnCount === 3 ? '33/33/33' : '25x4'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GRUPO 2: WIDGETS DE CONTENIDO DRAGGABLE */}
              <div className="space-y-2 pt-2 border-t border-[#eae4d2]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7e68] block">
                  2. Bloques de Contenido
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { type: 'paragraph', label: 'Párrafo', desc: 'Con capitular Drop Cap', icon: AlignLeft },
                    { type: 'heading', label: 'Subtítulo', desc: 'Encabezado H2', icon: Heading },
                    { type: 'quote', label: 'Cita Pull', desc: 'Frase de autor', icon: Quote },
                    { type: 'image', label: 'Fotografía', desc: 'Con pie de foto', icon: ImageIcon },
                    { type: 'callout', label: 'Callout', desc: 'Caja informativa', icon: AlertCircle },
                    { type: 'keyPoints', label: 'Puntos Clave', desc: 'Hallazgos con viñetas', icon: CheckCircle2 },
                    { type: 'divider', label: 'Separador', desc: 'Línea ornamental', icon: Minus },
                  ].map((widget) => {
                    const Icon = widget.icon;
                    return (
                      <div
                        key={widget.type}
                        draggable={true}
                        onDragStart={(e) => {
                          const payload = { type: widget.type };
                          e.dataTransfer.setData('application/json', JSON.stringify(payload));
                          e.dataTransfer.effectAllowed = 'copy';
                          setDraggedWidget(payload);
                        }}
                        onDragEnd={() => {
                          setDraggedWidget(null);
                          setActiveDropZone(null);
                        }}
                        onClick={() => handleDropAtPosition(blocks.length, widget)}
                        title="Arrastra este widget al lienzo o haz clic para agregar al final"
                        className="p-2.5 rounded-xl bg-[#f5efe3]/70 hover:bg-[#eae4d2] border border-[#d8ceb6] hover:border-[#4a5a22] text-left transition-all flex items-center gap-2 cursor-grab active:cursor-grabbing shadow-2xs group"
                      >
                        <GripVertical className="w-3.5 h-3.5 text-[#8a7e68] group-hover:text-[#4a5a22] shrink-0" />
                        <div className="w-6 h-6 rounded-lg bg-white group-hover:bg-[#4a5a22] flex items-center justify-center text-[#4a5a22] group-hover:text-white transition-colors border border-[#d8ceb6] shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-[#2d2618] leading-tight truncate">
                            {widget.label}
                          </span>
                          <span className="block text-[9px] text-[#7a6e58] font-light leading-none truncate">
                            {widget.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* GUÍA DE FLUJO PASO A PASO */}
            <div className="p-4 rounded-2xl bg-[#eae4d2]/80 border border-[#d8ceb6] text-xs space-y-2 text-[#5c523e]">
              <div className="flex items-center gap-1.5 font-bold text-[#4a5a22]">
                <Layers className="w-3.5 h-3.5" />
                <span>Flujo de Trabajo:</span>
              </div>
              <ol className="text-[11px] font-light space-y-1 pl-4 list-decimal leading-relaxed">
                <li>
                  <strong>Arrastra</strong> cualquier widget o grid desde esta paleta hacia el lienzo.
                </li>
                <li>
                  <strong>Suéltalo</strong> en la posición exacta que desees.
                </li>
                <li>
                  <strong>Configura</strong> su contenido en el modal que se abrirá inmediatamente.
                </li>
              </ol>
            </div>
          </div>

          {/* ── PANEL DERECHO: LIENZO INTERACTIVO DRAG & DROP (8 COLUMNAS) ── */}
          <div className="lg:col-span-8 space-y-4">
            {/* Modal / Selector de Columnas Elementor */}
            <AnimatePresence>
              {showSectionPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-3xl bg-[#eae4d2] border-2 border-[#4a5a22] shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Elige la Estructura de Columnas
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSectionPicker(false)}
                      className="p-1 rounded-full hover:bg-black/10 text-[#6b6048]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddColumns(2)}
                      className="p-4 rounded-2xl bg-white border border-[#d8ceb6] hover:border-[#4a5a22] hover:shadow-md transition-all text-center space-y-2 cursor-pointer group"
                    >
                      <div className="grid grid-cols-2 gap-1.5 h-8">
                        <div className="bg-[#4a5a22]/20 group-hover:bg-[#4a5a22]/40 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#4a5a22] font-bold">
                          50%
                        </div>
                        <div className="bg-[#4a5a22]/20 group-hover:bg-[#4a5a22]/40 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#4a5a22] font-bold">
                          50%
                        </div>
                      </div>
                      <span className="block text-xs font-bold text-[#2d2618]">2 Columnas</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddColumns(3)}
                      className="p-4 rounded-2xl bg-white border border-[#d8ceb6] hover:border-[#4a5a22] hover:shadow-md transition-all text-center space-y-2 cursor-pointer group ring-2 ring-[#4a5a22]/20"
                    >
                      <div className="grid grid-cols-3 gap-1 h-8">
                        <div className="bg-[#4a5a22]/25 group-hover:bg-[#4a5a22]/50 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#4a5a22] font-bold">
                          33%
                        </div>
                        <div className="bg-[#4a5a22]/25 group-hover:bg-[#4a5a22]/50 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#4a5a22] font-bold">
                          33%
                        </div>
                        <div className="bg-[#4a5a22]/25 group-hover:bg-[#4a5a22]/50 rounded-lg flex items-center justify-center text-[10px] font-mono text-[#4a5a22] font-bold">
                          33%
                        </div>
                      </div>
                      <span className="block text-xs font-bold text-[#2d2618]">3 Columnas (Ideal)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddColumns(4)}
                      className="p-4 rounded-2xl bg-white border border-[#d8ceb6] hover:border-[#4a5a22] hover:shadow-md transition-all text-center space-y-2 cursor-pointer group"
                    >
                      <div className="grid grid-cols-4 gap-1 h-8">
                        <div className="bg-[#4a5a22]/20 group-hover:bg-[#4a5a22]/40 rounded-lg flex items-center justify-center text-[9px] font-mono text-[#4a5a22] font-bold">
                          25%
                        </div>
                        <div className="bg-[#4a5a22]/20 group-hover:bg-[#4a5a22]/40 rounded-lg flex items-center justify-center text-[9px] font-mono text-[#4a5a22] font-bold">
                          25%
                        </div>
                        <div className="bg-[#4a5a22]/20 group-hover:bg-[#4a5a22]/40 rounded-lg flex items-center justify-center text-[9px] font-mono text-[#4a5a22] font-bold">
                          25%
                        </div>
                        <div className="bg-[#4a5a22]/20 group-hover:bg-[#4a5a22]/40 rounded-lg flex items-center justify-center text-[9px] font-mono text-[#4a5a22] font-bold">
                          25%
                        </div>
                      </div>
                      <span className="block text-xs font-bold text-[#2d2618]">4 Columnas</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ZONA DE SOLTAR SUPERIOR (AL INICIO DEL ARTÍCULO) */}
            {blocks.length > 0 && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'copy';
                  if (activeDropZone !== 'top') setActiveDropZone('top');
                }}
                onDragLeave={(e) => {
                  if (e.currentTarget.contains(e.relatedTarget)) return;
                  if (activeDropZone === 'top') setActiveDropZone(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  let parsed = null;
                  try {
                    const raw = e.dataTransfer.getData('application/json');
                    if (raw) parsed = JSON.parse(raw);
                  } catch {}
                  handleDropAtPosition(0, parsed || draggedWidget);
                }}
                className={`py-2 px-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-2 cursor-pointer text-xs ${
                  activeDropZone === 'top'
                    ? 'border-[#4a5a22] bg-[#4a5a22]/15 text-[#4a5a22] font-bold py-3 scale-[1.01] shadow-sm'
                    : 'border-[#d8ceb6]/60 text-[#8a7e68] hover:border-[#4a5a22]/60 hover:bg-[#eae4d2]/50 hover:text-[#4a5a22]'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {activeDropZone === 'top'
                    ? '¡Soltar elemento aquí al inicio!'
                    : 'Arrastra y suelta aquí para insertar al inicio'}
                </span>
              </div>
            )}

            {/* SI NO HAY BLOQUES: ÁREA DE BIENVENIDA DRAG & DROP */}
            {blocks.length === 0 && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'copy';
                  if (activeDropZone !== 'empty') setActiveDropZone('empty');
                }}
                onDragLeave={() => setActiveDropZone(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  let parsed = null;
                  try {
                    const raw = e.dataTransfer.getData('application/json');
                    if (raw) parsed = JSON.parse(raw);
                  } catch {}
                  handleDropAtPosition(0, parsed || draggedWidget);
                }}
                className={`p-12 rounded-3xl border-2 border-dashed text-center space-y-3 transition-all cursor-pointer ${
                  activeDropZone === 'empty'
                    ? 'bg-[#4a5a22]/15 border-[#4a5a22] text-[#4a5a22] scale-[1.02] shadow-md'
                    : 'bg-white/70 hover:bg-[#eae4d2]/60 border-[#4a5a22]/40 text-[#2d2618]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#4a5a22]/15 text-[#4a5a22] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#2d2618] font-normal">
                  Lienzo de Contenido Vacío
                </h3>
                <p className="text-xs text-[#6b6048] max-w-md mx-auto leading-relaxed">
                  Arrastra cualquier elemento o grid de columnas de la paleta izquierda y suéltalo aquí para comenzar a maquetar tu artículo.
                </p>
              </div>
            )}

            {/* LISTA DRAG AND DROP (FRAMER MOTION REORDER) */}
            <Reorder.Group
              axis="y"
              values={blocks}
              onReorder={onChange}
              className="space-y-3.5"
            >
              {blocks.map((block, idx) => {
                const meta = getMeta(block.type);
                const isSelected = editingBlockIndex === idx;

                return (
                  <Reorder.Item
                    key={block.id || idx}
                    value={block}
                    className={`rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[#4a5a22] shadow-lg bg-white'
                        : 'bg-white hover:border-[#4a5a22]/70 shadow-xs'
                    }`}
                  >
                    <div
                      onClick={() => setEditingBlockIndex(idx)}
                      className="p-4 sm:p-5 rounded-2xl border border-[#d8ceb6] space-y-3 group/card"
                    >
                      {/* HEADER ELEMENTOR: GRIP DRAG + BADGE + TOOLBAR */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-[#eae4d2]">
                        <div className="flex items-center gap-2.5">
                          {/* Drag Handle con Cursor Move */}
                          <div
                            title="Arrastra para reordenar"
                            className="p-1 rounded-md text-[#8a7e68] hover:text-[#4a5a22] hover:bg-[#eae4d2] cursor-grab active:cursor-grabbing transition-colors"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          <span className="px-2 py-0.5 rounded-md bg-[#4a5a22] text-[#f5efe3] font-mono text-[10px] font-bold">
                            #{idx + 1}
                          </span>

                          <span className="text-xs font-bold text-[#2d2618] uppercase tracking-wide">
                            {meta.name}
                          </span>
                        </div>

                        {/* ACCIONES FLOTANTES ELEMENTOR */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingBlockIndex(idx);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#4a5a22]/10 hover:bg-[#4a5a22] text-[#4a5a22] hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer mr-0.5"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Configurar</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleMoveUp(idx, e)}
                            disabled={idx === 0}
                            title="Subir"
                            className="p-1.5 rounded-lg border border-[#d8ceb6] bg-white hover:bg-[#eae4d2] text-[#2d2618] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleMoveDown(idx, e)}
                            disabled={idx === blocks.length - 1}
                            title="Bajar"
                            className="p-1.5 rounded-lg border border-[#d8ceb6] bg-white hover:bg-[#eae4d2] text-[#2d2618] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDuplicateBlock(idx, e)}
                            title="Duplicar"
                            className="p-1.5 rounded-lg border border-[#d8ceb6] bg-white hover:bg-[#eae4d2] text-[#2d2618] cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveBlock(idx, e)}
                            title="Eliminar"
                            className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* SNIPPET VISUAL DEL CONTENIDO (SIN FORMULARIOS GIGANTES REDUNDANTES) */}
                      {/* 1. PÁRRAFO */}
                      {block.type === 'paragraph' && (
                        <div className="text-sm text-[#2d2618] font-light leading-relaxed line-clamp-2">
                          {block.text?.es ? (
                            <span>
                              {block.isLead && (
                                <strong className="text-[#4a5a22] font-serif mr-1">
                                  [Capitular]
                                </strong>
                              )}
                              {block.text.es}
                            </span>
                          ) : (
                            <span className="text-[#8a7e68] italic">
                              (Párrafo vacío. Haz clic para redactar...)
                            </span>
                          )}
                        </div>
                      )}

                      {/* 2. COLUMNAS GRID */}
                      {block.type === 'columns' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-[#6b6048]">
                            <span className="font-semibold text-[#4a5a22]">
                              Grid de {block.columnCount || block.columns?.length || 3} columnas:
                            </span>
                            <span className="text-[10px] font-mono">
                              Haz clic para configurar elementos
                            </span>
                          </div>
                          <div
                            className={`grid gap-2.5 ${
                              (block.columnCount || 3) === 2
                                ? 'grid-cols-2'
                                : (block.columnCount || 3) === 4
                                ? 'grid-cols-4'
                                : 'grid-cols-3'
                            }`}
                          >
                            {block.columns?.map((c, cIdx) => (
                              <div
                                key={c.id || cIdx}
                                className="p-2.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] space-y-1 text-left"
                              >
                                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-[#4a5a22]/15 text-[#4a5a22] font-bold block w-fit">
                                  Col {cIdx + 1} · {c.type || 'text'}
                                </span>
                                <p className="text-xs font-semibold text-[#2d2618] truncate">
                                  {c.type === 'stat'
                                    ? c.statNumber || '01'
                                    : c.title?.es || `Pilar ${cIdx + 1}`}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. SUBTÍTULO */}
                      {block.type === 'heading' && (
                        <div className="font-serif text-lg text-[#2d2618] font-medium leading-snug">
                          {block.text?.es || (
                            <span className="text-[#8a7e68] italic text-sm">
                              (Subtítulo de sección vacío...)
                            </span>
                          )}
                        </div>
                      )}

                      {/* 4. CITA */}
                      {block.type === 'quote' && (
                        <blockquote className="border-l-2 border-[#4a5a22] pl-3 py-1 font-serif italic text-sm text-[#4a5a22]">
                          “{block.text?.es || 'Frase o cita memorable...' }”
                          {block.author && (
                            <span className="block text-xs uppercase font-sans tracking-wider text-[#6b6048] font-semibold mt-1">
                              — {block.author}
                            </span>
                          )}
                        </blockquote>
                      )}

                      {/* 5. FOTO */}
                      {block.type === 'image' && (
                        <div className="flex items-center gap-3">
                          {block.url ? (
                            <img
                              src={block.url}
                              alt=""
                              className="w-16 h-12 rounded-lg object-cover border border-[#d8ceb6]"
                            />
                          ) : (
                            <div className="w-16 h-12 rounded-lg bg-[#eae4d2] border border-[#d8ceb6] flex items-center justify-center text-[#8a7e68]">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                          <div className="text-xs text-[#2d2618] space-y-0.5">
                            <span className="font-semibold block truncate">
                              {block.caption?.es || 'Fotografía editorial'}
                            </span>
                            <span className="text-[10px] text-[#7a6e58] font-mono block truncate">
                              {block.url || 'Sin URL asignada'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 6. CALLOUT */}
                      {block.type === 'callout' && (
                        <div className="p-3 rounded-xl bg-[#eae4d2]/80 border-l-3 border-[#4a5a22] text-xs text-[#2d2618] space-y-1">
                          <span className="font-bold block">
                            {block.title?.es || 'Nota Editorial'}
                          </span>
                          <p className="line-clamp-2 text-[#4a402d] font-light">
                            {block.text?.es || 'Texto de la caja destacada...'}
                          </p>
                        </div>
                      )}

                      {/* 7. PUNTOS CLAVE */}
                      {block.type === 'keyPoints' && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#4a5a22] block">
                            {block.title?.es || 'Puntos Clave'} ({block.items?.length || 0})
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-xs text-[#3d3422]">
                            {block.items?.slice(0, 2).map((it, itIdx) => (
                              <div key={itIdx} className="truncate bg-[#f5efe3] p-1.5 rounded-lg border border-[#d8ceb6]">
                                0{itIdx + 1}. {it.es || 'Punto clave...'}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 8. SEPARADOR */}
                      {block.type === 'divider' && (
                        <div className="py-1 flex items-center justify-center gap-2 text-xs text-[#8a7e68]">
                          <Minus className="w-6 h-3 text-[#d8ceb6]" />
                          <span className="text-[10px] font-mono">Separador de Sección</span>
                          <Minus className="w-6 h-3 text-[#d8ceb6]" />
                        </div>
                      )}

                      {/* BARRA INFERIOR DE ACCIÓN / EDITAR */}
                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#6b6048] border-t border-[#eae4d2]">
                        <span className="flex items-center gap-1 font-semibold text-[#4a5a22]">
                          <Edit3 className="w-3 h-3" />
                          <span>Haz clic para editar propiedades</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8a7e68]" />
                      </div>
                    </div>

                    {/* ZONA DE SOLTAR DEBAJO DE ESTE BLOQUE */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                        if (activeDropZone !== idx + 1) setActiveDropZone(idx + 1);
                      }}
                      onDragLeave={(e) => {
                        if (e.currentTarget.contains(e.relatedTarget)) return;
                        if (activeDropZone === idx + 1) setActiveDropZone(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        let parsed = null;
                        try {
                          const raw = e.dataTransfer.getData('application/json');
                          if (raw) parsed = JSON.parse(raw);
                        } catch {}
                        handleDropAtPosition(idx + 1, parsed || draggedWidget);
                      }}
                      className={`my-1 rounded-xl border-2 transition-all flex items-center justify-center py-1 px-3 cursor-pointer text-xs ${
                        activeDropZone === idx + 1
                          ? 'border-dashed border-[#4a5a22] bg-[#4a5a22]/15 text-[#4a5a22] font-bold py-2.5 scale-[1.01] shadow-sm'
                          : 'border-transparent text-transparent hover:text-[#8a7e68] hover:border-dashed hover:border-[#d8ceb6] hover:bg-[#eae4d2]/30'
                      }`}
                    >
                      <Plus className="w-3 h-3 mr-1 text-[#4a5a22]" />
                      <span>{activeDropZone === idx + 1 ? '¡Soltar elemento aquí!' : '+ Insertar aquí'}</span>
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            {/* ZONA DE SOLTAR INFERIOR (AL FINAL DEL ARTÍCULO) */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                if (activeDropZone !== 'bottom') setActiveDropZone('bottom');
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                if (activeDropZone === 'bottom') setActiveDropZone(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                let parsed = null;
                try {
                  const raw = e.dataTransfer.getData('application/json');
                  if (raw) parsed = JSON.parse(raw);
                } catch {}
                handleDropAtPosition(blocks.length, parsed || draggedWidget);
              }}
              onClick={() => setShowSectionPicker(true)}
              className={`p-7 rounded-3xl border-2 border-dashed text-center space-y-2 cursor-pointer transition-all ${
                activeDropZone === 'bottom'
                  ? 'bg-[#4a5a22]/15 border-[#4a5a22] text-[#4a5a22] font-bold scale-[1.01] shadow-md'
                  : 'bg-[#eae4d2]/70 hover:bg-[#eae4d2] border-[#4a5a22]/50 hover:border-[#4a5a22]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#4a5a22] text-white flex items-center justify-center mx-auto shadow-md">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-serif text-base text-[#2d2618] block font-normal">
                {activeDropZone === 'bottom'
                  ? '¡Suelta aquí para agregar al final!'
                  : 'Arrastra y suelta aquí cualquier widget'}
              </span>
              <p className="text-xs text-[#6b6048]">
                O haz clic para abrir el selector rápido de columnas y widgets
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          INSPECTOR LATERAL FLOTANTE / MODAL DE PROPIEDADES DEL WIDGET
         ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {editingBlockIndex !== null && selectedBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#eae4d2] border-2 border-[#4a5a22] shadow-2xl overflow-hidden text-[#2d2618]"
            >
              {/* Header del Inspector */}
              <div className="p-5 bg-[#1f1a12] text-[#f5efe3] flex items-center justify-between border-b border-[#3d3422]">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#4a5a22] text-white font-mono text-xs font-bold">
                    #{editingBlockIndex + 1}
                  </span>
                  <span className="font-serif text-lg font-light text-white">
                    Editar {getMeta(selectedBlock.type).name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBlockIndex(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulario Limpio según el tipo de bloque */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#eae4d2]">
                {/* 1. PÁRRAFO */}
                {selectedBlock.type === 'paragraph' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Texto del Párrafo (Español)
                      </label>
                      <textarea
                        rows="6"
                        value={selectedBlock.text?.es || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({
                            text: { ...selectedBlock.text, es: e.target.value },
                          })
                        }
                        placeholder="Redacta el contenido editorial del párrafo..."
                        className="w-full p-4 rounded-2xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618] focus:outline-none focus:border-[#4a5a22] leading-relaxed shadow-xs"
                      />
                    </div>
                    <label className="p-3.5 rounded-xl bg-white border border-[#d8ceb6] flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-bold text-[#2d2618]">
                        ¿Destacar con letra capitular inicial (Drop Cap)?
                      </span>
                      <input
                        type="checkbox"
                        checked={Boolean(selectedBlock.isLead)}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({ isLead: e.target.checked })
                        }
                        className="w-4 h-4 rounded accent-[#4a5a22]"
                      />
                    </label>
                  </div>
                )}

                {/* 2. COLUMNAS / GRID MULTICOLUMNA */}
                {selectedBlock.type === 'columns' && (
                  <div className="space-y-5">
                    {/* Selector de número de columnas */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Número de Columnas
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { count: 2, label: '2 Columnas (50/50)' },
                          { count: 3, label: '3 Columnas (33/33/33)' },
                          { count: 4, label: '4 Columnas (25x4)' },
                        ].map((opt) => (
                          <button
                            key={opt.count}
                            type="button"
                            onClick={() => handleUpdateColumnCount(opt.count)}
                            className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              (selectedBlock.columnCount || 3) === opt.count
                                ? 'bg-[#4a5a22] text-[#f5efe3] shadow-xs'
                                : 'bg-white text-[#2d2618] border border-[#d8ceb6]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selector de qué columna editar */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Selecciona Columna a Editar
                      </label>
                      <div className="flex gap-2">
                        {selectedBlock.columns?.map((_, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => setEditingColumnIndex(cIdx)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              editingColumnIndex === cIdx
                                ? 'bg-[#2d2618] text-white shadow-xs'
                                : 'bg-white/80 text-[#6b6048] border border-[#d8ceb6]'
                            }`}
                          >
                            Columna {cIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Campos de la columna seleccionada */}
                    {selectedBlock.columns && selectedBlock.columns[editingColumnIndex] && (
                      <div className="p-4 rounded-2xl bg-white border border-[#d8ceb6] space-y-4 shadow-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-[#eae4d2]">
                          <span className="text-xs font-bold text-[#4a5a22] uppercase">
                            Elemento de Columna #{editingColumnIndex + 1}
                          </span>
                          <select
                            value={selectedBlock.columns[editingColumnIndex].type || 'text'}
                            onChange={(e) =>
                              handleUpdateColumnItem(editingColumnIndex, {
                                type: e.target.value,
                              })
                            }
                            className="text-xs px-3 py-1.5 rounded-xl bg-[#f5efe3] border border-[#d8ceb6] text-[#2d2618] font-semibold focus:outline-none focus:border-[#4a5a22]"
                          >
                            <option value="text">Texto Editorial</option>
                            <option value="card">Tarjeta / Callout</option>
                            <option value="stat">Cifra / Métrica</option>
                            <option value="image">Fotografía</option>
                            <option value="quote">Cita Breve</option>
                          </select>
                        </div>

                        {/* Campos de Texto o Card */}
                        {(selectedBlock.columns[editingColumnIndex].type === 'text' ||
                          selectedBlock.columns[editingColumnIndex].type === 'card' ||
                          !selectedBlock.columns[editingColumnIndex].type) && (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={selectedBlock.columns[editingColumnIndex].badge?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  badge: {
                                    ...selectedBlock.columns[editingColumnIndex].badge,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Badge / Etiqueta (ej. 01 · Fase I)..."
                              className="w-full px-3.5 py-2 rounded-xl bg-[#f5efe3]/50 border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                            <input
                              type="text"
                              value={selectedBlock.columns[editingColumnIndex].title?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  title: {
                                    ...selectedBlock.columns[editingColumnIndex].title,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Título del elemento..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs font-bold text-[#2d2618]"
                            />
                            <textarea
                              rows="3"
                              value={selectedBlock.columns[editingColumnIndex].text?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  text: {
                                    ...selectedBlock.columns[editingColumnIndex].text,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Descripción o contenido de la columna..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                          </div>
                        )}

                        {/* Campos de Cifra / Métrica */}
                        {selectedBlock.columns[editingColumnIndex].type === 'stat' && (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={selectedBlock.columns[editingColumnIndex].statNumber || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  statNumber: e.target.value,
                                })
                              }
                              placeholder="Cifra (ej. 450k ha, +85%, 01, $4M)..."
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xl font-serif font-bold text-[#4a5a22]"
                            />
                            <input
                              type="text"
                              value={selectedBlock.columns[editingColumnIndex].title?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  title: {
                                    ...selectedBlock.columns[editingColumnIndex].title,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Etiqueta / Concepto..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs font-semibold text-[#2d2618]"
                            />
                            <textarea
                              rows="2"
                              value={selectedBlock.columns[editingColumnIndex].text?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  text: {
                                    ...selectedBlock.columns[editingColumnIndex].text,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Detalle explicativo de la métrica..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                          </div>
                        )}

                        {/* Campos de Foto */}
                        {selectedBlock.columns[editingColumnIndex].type === 'image' && (
                          <div className="space-y-3">
                            <input
                              type="url"
                              value={selectedBlock.columns[editingColumnIndex].image || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  image: e.target.value,
                                })
                              }
                              placeholder="URL de fotografía (https://images.unsplash.com/...)"
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                            <input
                              type="text"
                              value={selectedBlock.columns[editingColumnIndex].caption?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  caption: {
                                    ...selectedBlock.columns[editingColumnIndex].caption,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Pie de foto / Leyenda..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                          </div>
                        )}

                        {/* Campos de Cita */}
                        {selectedBlock.columns[editingColumnIndex].type === 'quote' && (
                          <div className="space-y-3">
                            <textarea
                              rows="3"
                              value={selectedBlock.columns[editingColumnIndex].text?.es || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  text: {
                                    ...selectedBlock.columns[editingColumnIndex].text,
                                    es: e.target.value,
                                  },
                                })
                              }
                              placeholder="Frase o cita breve..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs italic text-[#2d2618]"
                            />
                            <input
                              type="text"
                              value={selectedBlock.columns[editingColumnIndex].author || ''}
                              onChange={(e) =>
                                handleUpdateColumnItem(editingColumnIndex, {
                                  author: e.target.value,
                                })
                              }
                              placeholder="Autor de la cita..."
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SUBTÍTULO */}
                {selectedBlock.type === 'heading' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                      Texto del Subtítulo (H2)
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.text?.es || ''}
                      onChange={(e) =>
                        handleUpdateSelectedBlock({
                          text: { ...selectedBlock.text, es: e.target.value },
                        })
                      }
                      placeholder="Ej. Pilares del Mecanismo de Financiamiento..."
                      className="w-full p-4 rounded-2xl bg-white border border-[#d8ceb6] text-base font-serif font-bold text-[#2d2618]"
                    />
                  </div>
                )}

                {/* 4. CITA */}
                {selectedBlock.type === 'quote' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Frase de la Cita Destacada
                      </label>
                      <textarea
                        rows="4"
                        value={selectedBlock.text?.es || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({
                            text: { ...selectedBlock.text, es: e.target.value },
                          })
                        }
                        placeholder="Frase memorable destacada..."
                        className="w-full p-4 rounded-2xl bg-white border border-[#d8ceb6] text-base font-serif italic text-[#2d2618]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Autor o Fuente de la Cita
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.author || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({ author: e.target.value })
                        }
                        placeholder="Ej. Dr. Francisco Solorio · Presidente CGA"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                      />
                    </div>
                  </div>
                )}

                {/* 5. FOTOGRAFÍA */}
                {selectedBlock.type === 'image' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        URL de la Fotografía
                      </label>
                      <input
                        type="url"
                        value={selectedBlock.url || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({ url: e.target.value })
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-sm text-[#2d2618]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Pie de Foto / Leyenda
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.caption?.es || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({
                            caption: { ...selectedBlock.caption, es: e.target.value },
                          })
                        }
                        placeholder="Descripción o crédito de la fotografía..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                      />
                    </div>
                  </div>
                )}

                {/* 6. CALLOUT */}
                {selectedBlock.type === 'callout' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Estilo de Color
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'beige', label: 'Beige Cálido' },
                          { id: 'moss', label: 'Verde Musgo' },
                          { id: 'dark', label: 'Carbón Oscuro' },
                        ].map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => handleUpdateSelectedBlock({ style: st.id })}
                            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              (selectedBlock.style || 'beige') === st.id
                                ? 'bg-[#4a5a22] text-white shadow-xs'
                                : 'bg-white text-[#2d2618] border border-[#d8ceb6]'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Título de la Nota
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.title?.es || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({
                            title: { ...selectedBlock.title, es: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs font-bold text-[#2d2618]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Contenido
                      </label>
                      <textarea
                        rows="3"
                        value={selectedBlock.text?.es || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({
                            text: { ...selectedBlock.text, es: e.target.value },
                          })
                        }
                        className="w-full p-3 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                      />
                    </div>
                  </div>
                )}

                {/* 7. PUNTOS CLAVE */}
                {selectedBlock.type === 'keyPoints' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Título del Bloque
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.title?.es || ''}
                        onChange={(e) =>
                          handleUpdateSelectedBlock({
                            title: { ...selectedBlock.title, es: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d8ceb6] text-xs font-bold text-[#2d2618]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4a5a22]">
                        Lista de Puntos
                      </label>
                      {selectedBlock.items?.map((it, itIdx) => (
                        <div key={itIdx} className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#4a5a22]">
                            0{itIdx + 1}.
                          </span>
                          <input
                            type="text"
                            value={it.es || ''}
                            onChange={(e) => {
                              const newItems = [...(selectedBlock.items || [])];
                              newItems[itIdx] = { ...newItems[itIdx], es: e.target.value };
                              handleUpdateSelectedBlock({ items: newItems });
                            }}
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#d8ceb6] text-xs text-[#2d2618]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = selectedBlock.items.filter(
                                (_, i) => i !== itIdx
                              );
                              handleUpdateSelectedBlock({ items: newItems });
                            }}
                            className="p-1.5 text-red-700 hover:text-red-900"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = [
                            ...(selectedBlock.items || []),
                            { es: '', en: '' },
                          ];
                          handleUpdateSelectedBlock({ items: newItems });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#4a5a22] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir Punto</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer del Inspector */}
              <div className="p-4 bg-white border-t border-[#d8ceb6] flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setEditingBlockIndex(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#4a5a22] hover:bg-[#384519] text-[#f5efe3] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Aplicar & Cerrar Inspector</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          VISTA 2: PREVISUALIZACIÓN COMPLETA DEL LECTOR
         ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'preview' && (
        <div className="rounded-3xl border border-[#d8ceb6] shadow-xl overflow-hidden bg-white">
          <div className="px-5 py-3 bg-[#1f1a12] text-white flex items-center justify-between text-xs border-b border-black/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="font-mono text-[11px] text-[#cdd2a6] ml-2">
                Previsualización en tiempo real con diseño: {previewTemplate.toUpperCase()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('builder')}
              className="text-xs text-[#a8bc65] hover:underline flex items-center gap-1"
            >
              <span>Volver a Editar</span> &rarr;
            </button>
          </div>

          <div
            className={`p-6 sm:p-12 min-h-[60vh] ${
              previewTemplate === 'immersive'
                ? 'bg-[#120e09] text-[#f5efe3]'
                : 'bg-[#f5efe3] text-[#2d2618]'
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <ArticleBlocksRenderer blocks={blocks} template={previewTemplate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
