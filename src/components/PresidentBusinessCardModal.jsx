import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/index.jsx';

/**
 * Modal de Business Card (Tarjeta de Presentación Ejecutiva / Corporativa)
 * para la Presidencia del Consejo Global Agroalimentario.
 *
 * Incluye:
 * 1. Tarjeta Interactiva 3D con giro (Frente y Reverso).
 * 2. Código QR dinámico de contacto directo.
 * 3. Descargador automático de vCard (.vcf) para iOS / Android / Outlook.
 * 4. Plantilla de Imprenta de alta resolución con guías de corte (85x55 mm) y modo imprimir/PDF.
 * 5. Copiado rápido de datos institucionales al portapapeles.
 */
export default function PresidentBusinessCardModal({ isOpen, onClose, member }) {
  const { t, lang } = useI18n();
  const logoSrc = lang === 'en' ? '/logos/Logo%20EN.svg' : '/logos/Logo%20ES.svg';
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' | 'print'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !member) return null;

  const phoneMx = member.social?.phoneMx || '+52 55 3083 1032';
  const phoneCa = member.social?.phoneCa || '+1 437 290 8820';
  const rawEmails = member.social?.emails || member.social?.email || 'presidencia@consejocga.org';
  const emailList = (Array.isArray(rawEmails) ? rawEmails : String(rawEmails).split(/[\n,;]+/))
    .map(e => e.trim())
    .filter(Boolean);
  const email = emailList[0] || 'presidencia@consejocga.org';
  const whatsappUrl = member.social?.whatsapp || 'https://wa.me/525530831032';
  const website = 'www.consejocga.org';
  const roleName = member.displayRole ? t(member.displayRole) : (member.role ? t(member.role) : 'Consejero Presidente');

  // Generador de archivo vCard (.vcf) compatible con iOS, Android, Google Contacts y Outlook
  const handleDownloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:García González;Luis;Mtro.;;',
      'FN:Mtro. Luis García González',
      'ORG:Consejo Global Agroalimentario;Presidencia del Consejo Directivo',
      `TITLE:${roleName}`,
      ...emailList.map((em, idx) => `EMAIL;TYPE=INTERNET${idx === 0 ? ',PREF' : ''}:${em}`),
      `TEL;TYPE=WORK,VOICE:${phoneMx}`,
      `TEL;TYPE=CELL,VOICE:${phoneCa}`,
      `URL;TYPE=WORK:https://${website}`,
      'ADR;TYPE=WORK:;;Sede Central;Ciudad de México;;;México',
      `NOTE:Presidencia del Consejo Global Agroalimentario (CGA). WhatsApp: ${whatsappUrl}`,
      'REV:' + new Date().toISOString(),
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Luis_Garcia_Presidente_CGA.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copiar datos institucionales al portapapeles
  const handleCopyDetails = () => {
    const emailStr = emailList.length > 1 ? `Correos:\n${emailList.map(e => ` - ${e}`).join('\n')}` : `Correo: ${email}`;
    const textToCopy = `Mtro. Luis García González\n${roleName}\nConsejo Global Agroalimentario (CGA)\n\nTeléfono México: ${phoneMx}\nTeléfono Canadá: ${phoneCa}\n${emailStr}\nWeb: https://${website}\nWhatsApp: ${whatsappUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  // Imprimir ficha de tarjetas corporativas
  const handlePrint = () => {
    window.print();
  };

  // URL del QR de alta resolución hacia el WhatsApp directo institucional
  const qrTargetUrl = whatsappUrl.startsWith('http')
    ? whatsappUrl
    : `https://wa.me/${phoneMx.replace(/\D/g, '')}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrTargetUrl)}&color=242018&bgcolor=fcfbf8&margin=1`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Fondo oscuro institucional con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0d120a]/80 backdrop-blur-md"
        />

        {/* Modal Contenedor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#fdfbf7] rounded-3xl border border-[#d8ceb6] shadow-[0_30px_90px_rgba(15,20,10,0.45)] overflow-hidden z-10 flex flex-col my-auto max-h-[94vh]"
        >
          {/* ─── ENCABEZADO DEL MODAL ─── */}
          <div className="px-6 py-4.5 sm:px-8 sm:py-5 border-b border-[#e5decb] flex items-center justify-between bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#3a4a18]/10 border border-[#3a4a18]/25 flex items-center justify-center text-[#3a4a18]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
                  <circle cx="9" cy="10" r="2" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="M15 8h2M15 12h2M7 16h10" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#242018]">
                    {t({ es: 'Tarjeta de Presentación Oficial', en: 'Official Business Card' })}
                  </h3>
                  <span className="hidden sm:inline-block text-[10px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#4a5a22]/10 text-[#4a5a22] border border-[#4a5a22]/20">
                    {t({ es: 'Presidencia', en: 'Presidency' })}
                  </span>
                </div>
                <p className="text-xs text-[#7a6e58] font-sans">
                  {t({
                    es: 'Plantilla diplomática y corporativa para Mtro. Luis García González',
                    en: 'Diplomatic & corporate template for Mtro. Luis García González'
                  })}
                </p>
              </div>
            </div>

            {/* Pestañas de Vista & Botón Cerrar */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-[#ede6d8] p-1 rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('interactive')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'interactive'
                      ? 'bg-white text-[#242018] shadow-xs font-semibold'
                      : 'text-[#6f6452] hover:text-[#242018]'
                  }`}
                >
                  {t({ es: 'Vista Digital 3D', en: '3D Digital View' })}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('print')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'print'
                      ? 'bg-white text-[#242018] shadow-xs font-semibold'
                      : 'text-[#6f6452] hover:text-[#242018]'
                  }`}
                >
                  {t({ es: 'Ficha de Imprenta (PDF)', en: 'Print Sheet (PDF)' })}
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#ede6d8]/70 hover:bg-[#e0d6c2] text-[#554e40] hover:text-[#242018] flex items-center justify-center transition-colors"
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* ─── SELECTOR MÓVIL DE PESTAÑAS ─── */}
          <div className="sm:hidden px-6 pt-3 flex border-b border-[#e5decb] bg-[#fbf9f5]">
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`flex-1 py-2 text-xs font-medium text-center border-b-2 transition-all ${
                activeTab === 'interactive'
                  ? 'border-[#3a4a18] text-[#3a4a18] font-semibold'
                  : 'border-transparent text-[#7a6e58]'
              }`}
            >
              {t({ es: 'Vista Digital 3D', en: '3D Digital View' })}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('print')}
              className={`flex-1 py-2 text-xs font-medium text-center border-b-2 transition-all ${
                activeTab === 'print'
                  ? 'border-[#3a4a18] text-[#3a4a18] font-semibold'
                  : 'border-transparent text-[#7a6e58]'
              }`}
            >
              {t({ es: 'Ficha de Imprenta', en: 'Print Sheet' })}
            </button>
          </div>

          {/* ─── CUERPO PRINCIPAL DEL MODAL ─── */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {activeTab === 'interactive' ? (
              /* ─── VISTA 1: TARJETA DIGITAL 3D CON GIRO INTERACTIVO ─── */
              <div className="flex flex-col items-center">
                {/* Instrucción visual */}
                <div className="flex items-center gap-2 mb-4 text-xs text-[#7a6e58]">
                  <span>
                    {isFlipped
                      ? t({ es: 'Mostrando: Reverso Institucional (Foil Dorado & Sede)', en: 'Showing: Institutional Back (Gold Foil & HQ)' })
                      : t({ es: 'Mostrando: Anverso Oficial (Datos & Código QR)', en: 'Showing: Official Front (Contact & QR Code)' })}
                  </span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="text-[#3a4a18] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t({ es: 'Voltear tarjeta', en: 'Flip card' })}
                  </button>
                </div>

                {/* Contenedor 3D con perspectiva */}
                <div
                  className="w-full max-w-[500px] aspect-[85/55] cursor-pointer"
                  style={{ perspective: '1200px' }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                    className="relative w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(25,20,10,0.18)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* ═════════════════════════════════════════════════════════
                        CARA FRONTAL (ANVERSO - ESTILO EDITORIAL MARFIL DE LUJO)
                       ═════════════════════════════════════════════════════════ */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-7 bg-[#fcfbf8] border-2 border-[#d8ceb6] flex flex-col justify-between overflow-hidden select-none"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Textura sutil y marca de agua institucional */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40"
                        style={{
                          backgroundImage: 'radial-gradient(#d8ceb6 0.75px, transparent 0.75px)',
                          backgroundSize: '12px 12px'
                        }}
                      />
                      {/* Línea dorada en esquina superior izquierda */}
                      <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-[#b39556] to-transparent" />
                      <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-[#b39556] to-transparent" />

                      {/* Fila Superior: Logotipo y membrete oficial */}
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={logoSrc}
                            alt="CGA"
                            className="h-8 sm:h-9 w-auto object-contain"
                          />
                          <div className="border-l border-[#d8ceb6] pl-2.5">
                            <span className="block text-[8px] sm:text-[9px] font-sans font-bold tracking-widest text-[#4a5a22] uppercase">
                              Consejo Global
                            </span>
                            <span className="block text-[8px] sm:text-[9px] font-sans font-light tracking-widest text-[#7a6e58] uppercase">
                              Agroalimentario
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-block text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#7a6e58] border border-[#d8ceb6] px-2 py-0.5 rounded-full bg-white/70">
                            PRESIDENCIA
                          </span>
                        </div>
                      </div>

                      {/* Centro: Nombre del Presidente & Cargo */}
                      <div className="relative z-10 my-auto py-1">
                        <h4 className="font-serif text-lg sm:text-2xl font-light text-[#221e16] tracking-tight leading-none mb-1.5">
                          {member.name}
                        </h4>
                        <div className="text-xs sm:text-[13px] font-serif italic text-[#4a5a22]">
                          {roleName}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-wider text-[#7a6e58] mt-0.5">
                          {t(member.tag || { es: 'Presidencia & Estrategia Multilateral', en: 'Presidency & Multilateral Strategy' })}
                        </div>
                      </div>

                      {/* Fila Inferior: Teléfonos, Email y Código QR */}
                      <div className="relative z-10 pt-2 border-t border-[#e8e2d4] flex items-end justify-between gap-3">
                        {/* Datos de Contacto */}
                        <div className="space-y-1 text-[10px] sm:text-[11px] font-mono text-[#3a352a]">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-sans font-semibold uppercase text-[#7a6e58] w-6">MX</span>
                            <span className="font-semibold">{phoneMx}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-sans font-semibold uppercase text-[#7a6e58] w-6">CA</span>
                            <span className="font-semibold">{phoneCa}</span>
                          </div>
                          <div className="flex items-start gap-2 text-[9px] sm:text-[10px] text-[#554e40]">
                            <span className="text-[8px] font-sans font-semibold uppercase text-[#7a6e58] w-6 shrink-0 mt-0.5">MAIL</span>
                            <div className="flex flex-col gap-0.5">
                              {emailList.map((em, idx) => (
                                <span key={idx} className="truncate max-w-[160px] sm:max-w-[200px] block">{em}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Código QR oficial escaneable */}
                        <div className="flex flex-col items-center flex-shrink-0 bg-white p-1 rounded-lg border border-[#d8ceb6] shadow-2xs">
                          <img
                            src={qrImageUrl}
                            alt="QR Contacto Directo"
                            className="w-13 h-13 sm:w-15 sm:h-15 object-contain"
                          />
                          <span className="text-[7px] font-mono uppercase text-[#7a6e58] mt-0.5 tracking-tight">
                            ESCANEAR
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ═════════════════════════════════════════════════════════
                        CARA TRASERA (REVERSO - VERDE BOSQUE & FOIL DORADO MATE)
                       ═════════════════════════════════════════════════════════ */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#12190f] via-[#1a2314] to-[#0d130a] border-2 border-[#b89f66]/60 flex flex-col justify-between overflow-hidden select-none text-white shadow-inner"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Marco perimetral decorativo dorado */}
                      <div className="absolute inset-2 sm:inset-3 border border-[#b89f66]/35 rounded-xl pointer-events-none" />

                      {/* Encabezado del Reverso: Sede & Credencial */}
                      <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-widest text-[#d8eb96]/70 uppercase">
                        <span>CONSEJO GLOBAL AGROALIMENTARIO</span>
                        <span>SEDE CENTRAL CGA</span>
                      </div>

                      {/* Centro: Logotipo blanco/dorado y Manifiesto */}
                      <div className="relative z-10 my-auto text-center py-2 flex flex-col items-center">
                        <img
                          src={logoSrc}
                          alt="CGA Crest"
                          className="h-10 sm:h-12 w-auto object-contain mb-3 drop-shadow-[0_2px_10px_rgba(216,235,150,0.25)]"
                        />
                        <p className="font-serif italic text-xs sm:text-sm text-[#f5efe3] max-w-xs leading-snug">
                          {t({
                            es: '“Liderazgo institucional, soberanía agroalimentaria y gobernanza ambiental para las generaciones futuras.”',
                            en: '“Institutional leadership, agri-food sovereignty and environmental governance for future generations.”'
                          })}
                        </p>
                      </div>

                      {/* Pie del Reverso: Diplomacia Internacional */}
                      <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-[8px] sm:text-[9px] font-sans tracking-wider text-white/60">
                        <span>CIUDAD DE MÉXICO • TORONTO</span>
                        <span className="font-mono text-[#d8eb96]/80">{website}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Barra de Acciones de la Tarjeta Digital */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
                  {/* Botón Voltear */}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-4 py-2.5 rounded-xl border border-[#c4baa2] bg-white hover:bg-[#f5efe3] text-[#242018] text-xs font-medium inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#4a5a22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{t({ es: 'Girar Tarjeta (3D)', en: 'Flip Card (3D)' })}</span>
                  </button>

                  {/* Botón Descargar vCard (.vcf) */}
                  <button
                    type="button"
                    onClick={handleDownloadVCard}
                    className="px-4 py-2.5 rounded-xl bg-[#3a4a18] hover:bg-[#2d3a12] text-white text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{t({ es: 'Guardar en Contactos (.vcf)', en: 'Save to Contacts (.vcf)' })}</span>
                  </button>

                  {/* Botón Copiar Datos */}
                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="px-3.5 py-2.5 rounded-xl border border-[#c4baa2] bg-white hover:bg-[#f5efe3] text-[#242018] text-xs font-medium inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-[#25d366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#25d366] font-semibold">{t({ es: '¡Copiado!', en: 'Copied!' })}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-[#554e40]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>{t({ es: 'Copiar Datos', en: 'Copy Details' })}</span>
                      </>
                    )}
                  </button>

                  {/* Botón Imprimir / PDF */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('print');
                      setTimeout(() => window.print(), 350);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-[#c4baa2] bg-white hover:bg-[#f5efe3] text-[#242018] text-xs font-medium inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#554e40]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>{t({ es: 'Imprimir / PDF', en: 'Print / PDF' })}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ─── VISTA 2: PLANTILLA CORPORATIVA DE IMPRENTA CON GUÍAS DE CORTE ─── */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e5decb]">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-[#242018]">
                      {t({ es: 'Ficha Técnica para Imprenta & Producción', en: 'Technical Sheet for Print & Production' })}
                    </h4>
                    <p className="text-xs text-[#7a6e58] font-sans">
                      {t({
                        es: 'Formato estándar 85 x 55 mm con sangrado de 3 mm y marcas de corte.',
                        en: 'Standard format 85 x 55 mm with 3 mm bleed and crop marks.'
                      })}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-5 py-2 rounded-xl bg-[#3a4a18] hover:bg-[#2d3a12] text-white text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-xs self-start sm:self-auto cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>{t({ es: 'Imprimir Pliego / Exportar PDF', en: 'Print Sheet / Export PDF' })}</span>
                  </button>
                </div>

                {/* Pliego de Producción: Frente y Reverso lado a lado con guías de corte */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#d8ceb6] shadow-xs space-y-8">
                  {/* ANVERSO (FRENTE) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4a5a22]">
                        1. ANVERSO (FRENTE) — TINTAS CORPORATIVAS & QR
                      </span>
                      <span className="text-[10px] font-mono text-[#7a6e58]">85 x 55 mm</span>
                    </div>

                    <div className="relative p-3 bg-[#ede6d8]/40 border border-dashed border-[#c4baa2] rounded-xl flex items-center justify-center">
                      {/* Marcas de corte (Crop marks visuales) */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#3a4a18]" />
                      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#3a4a18]" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#3a4a18]" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#3a4a18]" />

                      {/* Tarjeta Anverso */}
                      <div className="w-full max-w-[440px] aspect-[85/55] bg-[#fcfbf8] border border-[#d8ceb6] rounded-lg p-5 flex flex-col justify-between shadow-xs">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <img src={logoSrc} alt="CGA" className="h-7 w-auto object-contain" />
                            <div className="border-l border-[#d8ceb6] pl-2">
                              <span className="block text-[7.5px] font-sans font-bold tracking-widest text-[#4a5a22] uppercase">Consejo Global</span>
                              <span className="block text-[7.5px] font-sans font-light tracking-widest text-[#7a6e58] uppercase">Agroalimentario</span>
                            </div>
                          </div>
                          <span className="text-[8px] font-mono text-[#7a6e58] border border-[#d8ceb6] px-1.5 py-0.5 rounded bg-white">
                            PRESIDENCIA
                          </span>
                        </div>

                        <div className="my-auto py-1">
                          <h5 className="font-serif text-lg font-light text-[#221e16] tracking-tight leading-none mb-1">
                            {member.name}
                          </h5>
                          <div className="text-xs font-serif italic text-[#4a5a22]">
                            {roleName}
                          </div>
                          <div className="text-[8.5px] font-sans uppercase tracking-wider text-[#7a6e58]">
                            Presidencia & Estrategia Multilateral
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#e8e2d4] flex items-end justify-between">
                          <div className="space-y-0.5 text-[9px] font-mono text-[#3a352a]">
                            <div>MX: {phoneMx}</div>
                            <div>CA: {phoneCa}</div>
                            <div className="text-[#554e40] space-y-0.5">
                              {emailList.map((em, idx) => (
                                <div key={idx} className="truncate max-w-[200px]">{em}</div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white p-1 rounded border border-[#d8ceb6]">
                            <img src={qrImageUrl} alt="QR" className="w-10 h-10 object-contain" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REVERSO (VUELTA) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4a5a22]">
                        2. REVERSO (VUELTA) — VERDE BOSQUE & FOIL DORADO
                      </span>
                      <span className="text-[10px] font-mono text-[#7a6e58]">85 x 55 mm</span>
                    </div>

                    <div className="relative p-3 bg-[#ede6d8]/40 border border-dashed border-[#c4baa2] rounded-xl flex items-center justify-center">
                      {/* Marcas de corte (Crop marks visuales) */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#3a4a18]" />
                      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#3a4a18]" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#3a4a18]" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#3a4a18]" />

                      {/* Tarjeta Reverso */}
                      <div className="w-full max-w-[440px] aspect-[85/55] bg-gradient-to-br from-[#12190f] via-[#1a2314] to-[#0d130a] border border-[#b89f66]/60 rounded-lg p-5 flex flex-col justify-between text-white shadow-xs">
                        <div className="flex items-center justify-between text-[7.5px] font-mono tracking-widest text-[#d8eb96]/70 uppercase">
                          <span>CONSEJO GLOBAL AGROALIMENTARIO</span>
                          <span>SEDE CENTRAL CGA</span>
                        </div>

                        <div className="my-auto text-center py-1 flex flex-col items-center">
                          <img src={logoSrc} alt="CGA Crest" className="h-9 w-auto object-contain mb-2" />
                          <p className="font-serif italic text-xs text-[#f5efe3] max-w-xs leading-snug">
                            “Liderazgo institucional, soberanía agroalimentaria y gobernanza ambiental para las generaciones futuras.”
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[7.5px] font-sans tracking-wider text-white/60">
                          <span>CIUDAD DE MÉXICO • TORONTO</span>
                          <span className="font-mono text-[#d8eb96]/80">{website}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ficha de Especificaciones de Producción */}
                  <div className="p-4 rounded-xl bg-[#fbf9f5] border border-[#e5decb] text-xs space-y-2 text-[#554e40]">
                    <div className="font-bold text-[#242018] uppercase tracking-wider text-[11px] font-mono">
                      {t({ es: 'Especificaciones Técnicas para Impresión', en: 'Print Technical Specifications' })}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1 text-[11px]">
                      <div>
                        <span className="block text-[#7a6e58] font-semibold">{t({ es: 'Papel Sugerido', en: 'Suggested Paper' })}:</span>
                        <span>Algodón Marfil 350g / Tintoretto Gesso</span>
                      </div>
                      <div>
                        <span className="block text-[#7a6e58] font-semibold">{t({ es: 'Dimensiones', en: 'Dimensions' })}:</span>
                        <span>85 x 55 mm (+ 3mm sangrado)</span>
                      </div>
                      <div>
                        <span className="block text-[#7a6e58] font-semibold">{t({ es: 'Acabados Especiales', en: 'Special Finishes' })}:</span>
                        <span>Hot Stamping Oro Mate + Barniz UV a registro</span>
                      </div>
                      <div>
                        <span className="block text-[#7a6e58] font-semibold">{t({ es: 'Perfil de Color', en: 'Color Profile' })}:</span>
                        <span>CMYK / Pantone Verde Bosque #1A2314</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
