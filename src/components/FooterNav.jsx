import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterNav() {
  return (
    <footer className="border-t border-[#e0d4ba] bg-[#eae4d2] px-8 md:px-20 py-14 text-[#6b6048] text-xs font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#6b7c3a]"></span>
            <span className="text-[#2d2618] font-serif text-lg tracking-wide font-medium">Consejo Global Ambiental</span>
          </div>
          <p className="text-[#7a6e58] text-xs max-w-sm font-light">
            Organismo de gobernanza socioambiental dedicado a la conservación de biomas, resiliencia comunitaria y la Agenda 2030.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs tracking-wider uppercase font-medium">
          <Link to="/" className="hover:text-[#2d2618] transition-colors">Inicio</Link>
          <Link to="/nosotros" className="hover:text-[#2d2618] transition-colors">Quiénes Somos</Link>
          <Link to="/gobernanza" className="hover:text-[#2d2618] transition-colors">Gobernanza</Link>
          <Link to="/lineas-estrategicas" className="hover:text-[#2d2618] transition-colors">Líneas Estratégicas</Link>
          <Link to="/proyectos" className="hover:text-[#2d2618] transition-colors">Proyectos WESS</Link>
          <Link to="/agenda-2030" className="hover:text-[#2d2618] transition-colors">Agenda 2030</Link>
          <Link to="/presencia-global" className="hover:text-[#2d2618] transition-colors">Presencia</Link>
          <Link to="/conocimiento" className="hover:text-[#2d2618] transition-colors">Conocimiento</Link>
          <Link to="/asamblea-anual" className="hover:text-[#2d2618] transition-colors">Asamblea</Link>
          <Link to="/contacto" className="hover:text-[#2d2618] transition-colors font-bold text-[#4a5a22]">Contacto</Link>
        </div>

        <div className="text-[#7a6e58] text-[11px] text-right">
          &copy; 2026 Consejo Global Ambiental.<br />Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
