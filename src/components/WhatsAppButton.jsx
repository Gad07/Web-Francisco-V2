import React from 'react';

/**
 * WhatsAppButton — Botón flotante circular (56px) que se expande
 * suavemente a cápsula al pasar el cursor (hover).
 */
export default function WhatsAppButton({
  phoneNumber = '525545691548',
  message = 'Hola, me gustaría solicitar información sobre el Consejo Global Agroalimentario.',
}) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-floating-wrapper">
      <style>{`
        .whatsapp-floating-wrapper {
          position: fixed;
          bottom: 26px;
          right: 26px;
          z-index: 9999;
        }

        .Btn-whatsapp {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 56px;
          height: 56px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, box-shadow 0.25s ease;
          box-shadow: 0 8px 22px -3px rgba(37, 211, 102, 0.42), 0 4px 10px -2px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #25D366 0%, #1ea952 100%);
          text-decoration: none;
        }

        .sign-whatsapp {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .sign-whatsapp svg {
          width: 29px;
          height: 29px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
        }

        .sign-whatsapp svg path {
          fill: white;
        }

        .text-whatsapp {
          position: absolute;
          right: 0;
          width: 0%;
          opacity: 0;
          color: white;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          white-space: nowrap;
          overflow: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          pointer-events: none;
        }

        .Btn-whatsapp:hover {
          width: 160px;
          border-radius: 35px;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -3px rgba(37, 211, 102, 0.52), 0 6px 14px -2px rgba(0, 0, 0, 0.2);
        }

        .Btn-whatsapp:hover .sign-whatsapp {
          transform: scale(1.05);
        }

        .Btn-whatsapp:hover .text-whatsapp {
          opacity: 1;
          width: 104px;
          padding-left: 2px;
          padding-right: 18px;
        }

        .Btn-whatsapp:active {
          transform: translateY(1px) scale(0.97);
        }

        @media (max-width: 640px) {
          .whatsapp-floating-wrapper {
            bottom: 20px;
            right: 20px;
          }
          .Btn-whatsapp {
            width: 50px;
            height: 50px;
          }
          .sign-whatsapp {
            width: 50px;
            height: 50px;
          }
          .sign-whatsapp svg {
            width: 26px;
            height: 26px;
          }
          .Btn-whatsapp:hover {
            width: 150px;
          }
          .Btn-whatsapp:hover .text-whatsapp {
            width: 100px;
            font-size: 14px;
          }
        }
      `}</style>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="Btn-whatsapp"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <div className="sign-whatsapp">
          <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
            <path
              d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
            />
          </svg>
        </div>

        <div className="text-whatsapp">WhatsApp</div>
      </a>
    </div>
  );
}
