import React from 'react';

/**
 * WhatsAppButton — Botón flotante expandible con hover animation de WhatsApp.
 */
export default function WhatsAppButton({
  phoneNumber = '5215500000000',
  message = 'Hola, me gustaría solicitar información sobre el Consejo Global Ambiental.',
}) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-floating-wrapper">
      <style>{`
        .whatsapp-floating-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
        }

        .Btn-whatsapp {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 45px;
          height: 45px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition-duration: 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
          background-color: #00d757;
          text-decoration: none;
        }

        .sign-whatsapp {
          width: 100%;
          transition-duration: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sign-whatsapp svg {
          width: 25px;
          height: 25px;
        }

        .sign-whatsapp svg path {
          fill: white;
        }

        .text-whatsapp {
          position: absolute;
          right: 0%;
          width: 0%;
          opacity: 0;
          color: white;
          font-size: 1.15em;
          font-weight: 600;
          transition-duration: 0.3s;
          white-space: nowrap;
          overflow: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .Btn-whatsapp:hover {
          width: 150px;
          border-radius: 40px;
          transition-duration: 0.3s;
        }

        .Btn-whatsapp:hover .sign-whatsapp {
          width: 30%;
          transition-duration: 0.3s;
          padding-left: 10px;
        }

        .Btn-whatsapp:hover .text-whatsapp {
          opacity: 1;
          width: 70%;
          transition-duration: 0.3s;
          padding-right: 10px;
        }

        .Btn-whatsapp:active {
          transform: translate(2px, 2px);
        }
      `}</style>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="Btn-whatsapp"
        aria-label="Whatsapp"
      >
        <div className="sign-whatsapp">
          <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
            <path
              d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
            />
          </svg>
        </div>

        <div className="text-whatsapp">Whatsapp</div>
      </a>
    </div>
  );
}
