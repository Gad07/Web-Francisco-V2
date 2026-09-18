import React from 'react';
import { motion } from 'framer-motion';

export function PageHero({ tag = "Consejo Global Ambiental", titleWhite, titleGreen, description, bgImage }) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-[#f5efe3] border-b border-[#e0d4ba]">
      {/* Background Image with Light Vignette */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-15 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5efe3]/80 via-[#f5efe3]/90 to-[#f5efe3]" />
        </div>
      )}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,107,42,0.06)_0,transparent_70%)] pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eae4d2] border border-[#a0a870]/30 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#6b7c3a] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#4a5a22] font-sans font-bold">{tag}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.1] mb-6 tracking-tight text-[#2d2618] font-light"
        >
          {titleWhite} <br className="hidden sm:inline" />
          <span className="text-[#5a6b2a] font-normal italic">{titleGreen}</span>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-xl text-[#6b6048] font-sans font-light leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
