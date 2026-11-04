import React from 'react';

/**
 * FloatingSocialButtons — Redes sociales oficiales flotantes
 * organizadas verticalmente en el lateral inferior derecho,
 * con WhatsApp en la base y las redes oficiales (LinkedIn, Instagram, X, Facebook) encima,
 * expandiéndose suavemente a cápsulas elegantes con su nombre al pasar el cursor (hover).
 */

const SOCIAL_ITEMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/consejoglobalambiental/',
    bg: 'linear-gradient(135deg, #1877F2 0%, #1059b8 100%)',
    shadow: 'rgba(24, 119, 242, 0.42)',
    hoverWidth: 140,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    url: 'https://x.com/CGA_Oficial',
    bg: 'linear-gradient(135deg, #1b1e22 0%, #000000 100%)',
    shadow: 'rgba(0, 0, 0, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    hoverWidth: 146,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/consejoglobalambiental/',
    bg: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)',
    shadow: 'rgba(225, 48, 108, 0.45)',
    hoverWidth: 142,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/consejo-global-ambiental/posts/?feedView=all',
    bg: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
    shadow: 'rgba(10, 102, 194, 0.42)',
    hoverWidth: 138,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/525530831032?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20Consejo%20Global%20Ambiental.',
    bg: 'linear-gradient(135deg, #25D366 0%, #1ea952 100%)',
    shadow: 'rgba(37, 211, 102, 0.48)',
    hoverWidth: 154,
    isPrimary: true,
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
      </svg>
    ),
  },
];

export default function WhatsAppButton() {
  return (
    <div className="floating-social-wrapper" aria-label="Redes Sociales y Contacto Oficial">
      <style>{`
        .floating-social-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 9px;
          pointer-events: none;
        }

        .floating-social-btn {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.22s ease,
                      box-shadow 0.25s ease;
        }

        .floating-social-btn.primary-btn {
          width: 54px;
          height: 54px;
          margin-top: 2px;
        }

        .floating-social-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
          transition: transform 0.28s ease;
        }

        .floating-social-btn.primary-btn .floating-social-icon {
          width: 54px;
          height: 54px;
        }

        .floating-social-icon svg {
          width: 22px;
          height: 22px;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.18));
        }

        .floating-social-btn.primary-btn .floating-social-icon svg {
          width: 28px;
          height: 28px;
        }

        .floating-social-text {
          position: absolute;
          right: 0;
          width: 0%;
          opacity: 0;
          color: white;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          pointer-events: none;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
        }

        .floating-social-btn.primary-btn .floating-social-text {
          font-size: 14.5px;
        }

        .floating-social-btn:hover {
          border-radius: 30px;
          transform: translateY(-2px);
        }

        .floating-social-btn:hover .floating-social-icon {
          transform: scale(1.08);
        }

        .floating-social-btn:hover .floating-social-text {
          opacity: 1;
        }

        /* Anchos de expansión por red social en hover */
        .floating-social-btn[data-id="facebook"]:hover { width: 138px; }
        .floating-social-btn[data-id="facebook"]:hover .floating-social-text { width: 92px; padding-right: 16px; }

        .floating-social-btn[data-id="twitter"]:hover { width: 146px; }
        .floating-social-btn[data-id="twitter"]:hover .floating-social-text { width: 100px; padding-right: 16px; }

        .floating-social-btn[data-id="instagram"]:hover { width: 142px; }
        .floating-social-btn[data-id="instagram"]:hover .floating-social-text { width: 96px; padding-right: 16px; }

        .floating-social-btn[data-id="linkedin"]:hover { width: 136px; }
        .floating-social-btn[data-id="linkedin"]:hover .floating-social-text { width: 90px; padding-right: 16px; }

        .floating-social-btn[data-id="whatsapp"]:hover { width: 156px; }
        .floating-social-btn[data-id="whatsapp"]:hover .floating-social-text { width: 102px; padding-right: 18px; }

        .floating-social-btn:active {
          transform: translateY(1px) scale(0.96);
        }

        @media (max-width: 640px) {
          .floating-social-wrapper {
            bottom: 18px;
            right: 16px;
            gap: 7px;
          }
          .floating-social-btn {
            width: 40px;
            height: 40px;
          }
          .floating-social-btn.primary-btn {
            width: 48px;
            height: 48px;
          }
          .floating-social-icon {
            width: 40px;
            height: 40px;
          }
          .floating-social-btn.primary-btn .floating-social-icon {
            width: 48px;
            height: 48px;
          }
          .floating-social-icon svg {
            width: 19px;
            height: 19px;
          }
          .floating-social-btn.primary-btn .floating-social-icon svg {
            width: 25px;
            height: 25px;
          }
          .floating-social-btn[data-id="facebook"]:hover { width: 124px; }
          .floating-social-btn[data-id="twitter"]:hover { width: 134px; }
          .floating-social-btn[data-id="instagram"]:hover { width: 130px; }
          .floating-social-btn[data-id="linkedin"]:hover { width: 122px; }
          .floating-social-btn[data-id="whatsapp"]:hover { width: 144px; }
          .floating-social-text {
            font-size: 12.5px;
          }
        }
      `}</style>

      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          data-id={item.id}
          className={`floating-social-btn ${item.isPrimary ? 'primary-btn' : ''}`}
          aria-label={item.name}
          title={item.name}
          style={{
            background: item.bg,
            boxShadow: `0 8px 20px -3px ${item.shadow}, 0 4px 10px -2px rgba(0, 0, 0, 0.2)`,
            border: item.border || 'none',
          }}
        >
          <div className="floating-social-icon">
            {item.icon}
          </div>
          <div className="floating-social-text">
            {item.name}
          </div>
        </a>
      ))}
    </div>
  );
}
