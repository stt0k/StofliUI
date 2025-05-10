"use client";

import React from "react";
import { motion } from "framer-motion";

const GovSection = () => {
  return (
    <section className="py-24 w-full bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Etiqueta superior */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-5 py-2">
            <span className="text-sm font-medium text-white">StofliUI</span>
          </div>
        </div>

        {/* Título principal con animación */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-8 text-white max-w-4xl mx-auto"
        >
          Para Desarrolladores y Diseñadores
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-zinc-400 text-center max-w-3xl mx-auto mb-12"
        >
          StofliUI es una biblioteca avanzada que integra componentes UI
          potentes con estilos modernos para tu aplicación o sitio web.
          Ofreciendo precisión a nivel de píxel, modelos de componentes de
          última generación y una interfaz fácil de usar. Disponible para
          desarrolladores y diseñadores que buscan acelerar su flujo de trabajo.
        </motion.p>
        {/* Stats/Características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard
            number="50+"
            label="Componentes UI"
            description="Componentes interactivos listos para usar"
          />
          <StatCard
            number="100%"
            label="Personalizable"
            description="Adapta cada componente a tu marca"
          />
          <StatCard
            number="99.9%"
            label="Accesibilidad"
            description="Cumple con los estándares WCAG 2.1"
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  number,
  label,
  description,
}: {
  number: string;
  label: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-xl p-6 flex flex-col items-center text-center"
    >
      <span className="text-4xl font-bold text-white mb-2">{number}</span>
      <span className="text-sm font-medium text-white mb-1">{label}</span>
      <span className="text-xs text-zinc-400">{description}</span>
    </motion.div>
  );
};

export default GovSection;
