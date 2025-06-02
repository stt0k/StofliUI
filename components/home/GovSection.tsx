"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { DatabaseZap, Code, Zap, Sparkles } from "lucide-react";

const GovSection = () => {
  return (
    <section className="py-16 md:py-28 w-full bg-zinc-50 dark:bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-50 dark:from-black to-transparent z-[1]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 dark:from-black to-transparent z-[1]"></div>

      {/* Círculos de luz/gradiente */}
      <div className="absolute left-1/4 top-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/10 blur-[120px] -z-10"></div>
      <div className="absolute right-1/4 bottom-1/3 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-100/40 dark:bg-purple-900/10 blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 relative z-[2]">
        {/* Título principal con animación */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-6 text-zinc-800 dark:text-white max-w-3xl mx-auto leading-tight tracking-tight px-2"
        >
          Diseñado para desarrolladores y diseñadores
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2"
        >
          StofliUI es una biblioteca moderna que integra componentes UI potentes
          con estilos avanzados, ofreciendo precisión a nivel de píxel y una
          interfaz intuitiva para acelerar tu flujo de trabajo.
        </motion.p>

        {/* Sección adicional con stats más pequeños */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            <CardSpotlight
              icon={<Zap className="w-4 h-4" />}
              label="100%"
              sublabel="Speed Insights"
            />
            <CardSpotlight
              icon={<DatabaseZap className="w-4 h-4" />}
              label="68,8kb "
              sublabel="Min + Gzip"
            />
            <CardSpotlight
              icon={<Sparkles className="w-4 h-4" />}
              label="Server Side"
              sublabel="Rendering"
            />
            <CardSpotlight
              icon={<Code className="w-4 h-4" />}
              label="TypeScript"
              sublabel="Soportado"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const CardSpotlight = ({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFocused) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      viewport={{ once: true }}
      className="relative w-full"
    >
      {/* Card principal */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-white shadow-sm dark:shadow-none dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/50 rounded-lg p-3 md:p-4 flex items-center cursor-default transition-colors duration-500"
        tabIndex={0}
      >
        <div className="mr-3 p-1.5 md:p-2 rounded-md bg-zinc-100 dark:bg-black/50 text-zinc-600 dark:text-zinc-400">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {label}
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-500">
            {sublabel}
          </div>
        </div>
      </div>

      {/* Capa de spotlight exactamente igual al ejemplo */}
      <div
        ref={borderRef}
        aria-hidden="true"
        style={{
          opacity,
          WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-lg border border-black/40 dark:border-white/30 bg-transparent opacity-0 transition-opacity duration-500"
      ></div>
    </motion.div>
  );
};

export default GovSection;
