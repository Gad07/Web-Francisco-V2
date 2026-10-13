import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero.jsx';
import FooterNav from '../components/FooterNav.jsx';
import { DEFAULT_GOVERNANCE_MEMBERS } from '../data/governanceData.js';

export default function Governance() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="min-h-screen bg-[#f5efe3] text-[#2d2618] font-sans flex flex-col justify-between">
      <div>
        <PageHero
          titleWhite="Gobierno y"
          titleGreen="estructura institucional"
          description="El Consejo Global Ambiental integra conducción estratégica, coordinación ejecutiva, dirección nacional de proyectos y participación honorífica especializada."
          bgImage="https://images.unsplash.com/photo-1577985051167-0d49eec21977?w=1600&h=900&fit=crop"
        />

        {/* =================================================================
            1.4 INTRODUCCIÓN EDITORIAL
            ================================================================= */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4a5a22]">
              Estructura Colegiada
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2d2618] leading-[1.12]">
              Liderazgo y articulación <br />
              <span className="italic text-[#4a5a22]">para la gobernanza ambiental.</span>
            </h2>
            <p className="text-[#6b6048] font-sans text-base sm:text-lg font-light leading-relaxed">
              El Consejo Global Ambiental integra conducción estratégica, coordinación ejecutiva, dirección nacional de proyectos y participación honorífica especializada. La Presidencia define prioridades y representa a la institución; la Secretaría Ejecutiva articula su gestión y cooperación; la Dirección Nacional de Proyectos desarrolla y da seguimiento a iniciativas; y el Consejo Honorífico incorpora perspectivas técnicas en las materias del CGA.
            </p>
          </div>

          {/* =================================================================
              ESTRUCTURA POR CUERPOS DIRECTIVOS
              ================================================================= */}
          <div className="space-y-20">
            {/* 1. PRESIDENCIA Y SECRETARÍA EJECUTIVA */}
            <div>
              <div className="border-b border-[#d8ceb6] pb-3 mb-8">
                <h3 className="font-serif text-2xl text-[#2d2618] font-light">
                  Dirección Estratégica y Coordinación Ejecutiva
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {DEFAULT_GOVERNANCE_MEMBERS.filter((m) => m.category === 'presidencia' || m.category === 'secretaria').map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#ece4d0]/50 rounded-3xl p-8 sm:p-10 border border-[#d8ceb6] shadow-sm flex flex-col justify-between hover:border-[#4a5a22]/50 transition-all duration-300"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-5">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#d8ceb6]"
                        />
                        <div>
                          <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block">
                            {member.role.es}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-medium mt-1">
                            {member.name}
                          </h4>
                          <span className="text-xs text-[#7a6e58] font-light block mt-0.5">
                            {member.area.es}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                        {member.bio.es}
                      </p>

                      <div className="pt-4 border-t border-[#d8ceb6]/60 space-y-2">
                        <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                          Responsabilidad Institucional:
                        </span>
                        <ul className="space-y-1.5">
                          {member.responsibilities.map((r, i) => (
                            <li key={i} className="text-xs text-[#6b6048] flex items-start gap-2 font-light">
                              <span className="text-[#4a5a22] font-bold mt-0.5">•</span>
                              <span>{r.es}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#d8ceb6]/40 flex items-center justify-between text-xs text-[#7a6e58]">
                      <span>Contacto oficial:</span>
                      <a href={`mailto:${member.social.email}`} className="text-[#4a5a22] hover:underline font-medium">
                        {member.social.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. DIRECCIÓN NACIONAL DE PROYECTOS */}
            <div>
              <div className="border-b border-[#d8ceb6] pb-3 mb-8">
                <h3 className="font-serif text-2xl text-[#2d2618] font-light">
                  Dirección Nacional de Proyectos
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {DEFAULT_GOVERNANCE_MEMBERS.filter((m) => m.category === 'proyectos').map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#ece4d0]/50 rounded-3xl p-8 sm:p-10 border border-[#d8ceb6] shadow-sm flex flex-col justify-between hover:border-[#4a5a22]/50 transition-all duration-300 md:col-span-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      <div className="md:col-span-4 flex items-center md:flex-col md:items-start gap-5">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border border-[#d8ceb6]"
                        />
                        <div>
                          <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block">
                            {member.role.es}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-medium mt-1">
                            {member.name}
                          </h4>
                          <span className="text-xs text-[#7a6e58] font-light block mt-0.5">
                            {member.displayRole.es}
                          </span>
                        </div>
                      </div>

                      <div className="md:col-span-8 space-y-4">
                        <p className="text-sm sm:text-base text-[#5c523e] font-light leading-relaxed">
                          {member.bio.es}
                        </p>
                        <div className="pt-4 border-t border-[#d8ceb6]/60 space-y-2">
                          <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                            Responsabilidad: Diseño, coordinación y seguimiento de proyectos; articulación con actores territoriales.
                          </span>
                          <ul className="space-y-1.5">
                            {member.responsibilities.map((r, i) => (
                              <li key={i} className="text-xs text-[#6b6048] flex items-start gap-2 font-light">
                                <span className="text-[#4a5a22] font-bold mt-0.5">•</span>
                                <span>{r.es}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#d8ceb6]/40 flex items-center justify-between text-xs text-[#7a6e58]">
                      <span>Contacto oficial:</span>
                      <a href={`mailto:${member.social.email}`} className="text-[#4a5a22] hover:underline font-medium">
                        {member.social.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. CONSEJO HONORÍFICO */}
            <div>
              <div className="border-b border-[#d8ceb6] pb-3 mb-6">
                <h3 className="font-serif text-2xl text-[#2d2618] font-light">
                  Consejo Honorífico Especializado
                </h3>
                <p className="text-xs sm:text-sm text-[#7a6e58] font-light mt-1 max-w-3xl">
                  El Consejo Honorífico integra especialistas que contribuyen, desde sus áreas de experiencia, al análisis técnico de iniciativas y a la formulación de propuestas. Su participación es consultiva y fortalece la articulación entre conocimiento especializado y acción institucional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {DEFAULT_GOVERNANCE_MEMBERS.filter((m) => m.category === 'honorifico').map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#ece4d0]/50 rounded-3xl p-8 sm:p-10 border border-[#d8ceb6] shadow-sm flex flex-col justify-between hover:border-[#4a5a22]/50 transition-all duration-300"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-5">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#d8ceb6]"
                        />
                        <div>
                          <span className="text-xs uppercase tracking-widest text-[#4a5a22] font-semibold block">
                            {member.role.es}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl text-[#2d2618] font-medium mt-1">
                            {member.name}
                          </h4>
                          <span className="text-xs text-[#7a6e58] font-light block mt-0.5">
                            {member.displayRole.es}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#5c523e] font-light leading-relaxed">
                        {member.bio.es}
                      </p>

                      <div className="pt-4 border-t border-[#d8ceb6]/60 space-y-2">
                        <span className="text-xs uppercase tracking-wider text-[#3a3020] font-semibold block">
                          Aporte Consultivo y Especializado:
                        </span>
                        <ul className="space-y-1.5">
                          {member.responsibilities.map((r, i) => (
                            <li key={i} className="text-xs text-[#6b6048] flex items-start gap-2 font-light">
                              <span className="text-[#4a5a22] font-bold mt-0.5">•</span>
                              <span>{r.es}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#d8ceb6]/40 flex items-center justify-between text-xs text-[#7a6e58]">
                      <span>Contacto institucional:</span>
                      <a href={`mailto:${member.social.email}`} className="text-[#4a5a22] hover:underline font-medium">
                        {member.social.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterNav />
    </div>
  );
}
