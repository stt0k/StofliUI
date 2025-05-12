"use client";

import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/FooterDocs";
import { ColorProvider, useColorContext } from "./components/ColorContext";
import FormatTabs from "./components/FormatTabs";
import ColorSelector from "./components/ColorSelector";
import {
  colorNames,
  decorativeColors,
  colors,
  ColorInfo,
} from "./components/ColorData";
import { LazyMotion, m, domAnimation } from "framer-motion";

// Componente interno que usa el contexto
function ColorsPageContent() {
  const { selectedFamily, setSelectedFamily } = useColorContext();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      {/* Espaciador para header fijo */}
      <div className="h-24 md:h-32"></div>

      <main className="container mx-auto px-4 pt-4 md:pt-8 pb-20 md:pb-32">
        {/* Hero Section */}
        <div className="relative mb-8 md:mb-12 pb-8 md:pb-12 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-2/3">
              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6"
              >
                Paleta de Colores
              </m.h1>
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base md:text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mb-6 md:mb-8 leading-relaxed"
              >
                Explora la paleta completa de colores de Tailwind CSS en
                diferentes formatos: HEX, RGB, HSL y OKLCH. Estos colores han
                sido cuidadosamente seleccionados para funcionar armoniosamente
                en cualquier proyecto.
              </m.p>
            </div>
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full md:w-1/3 max-w-md"
            >
              <ColorSelector
                colorNames={colorNames}
                selectedFamily={selectedFamily}
                onSelect={setSelectedFamily}
              />
            </m.div>
          </div>

          {/* Decorativo - círculos de color */}
          <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 flex space-x-1 md:space-x-2">
            {decorativeColors.map((color, i) => (
              <m.div
                key={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1 - Math.abs(i - 4) * 0.1, opacity: 0.8 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                style={{
                  backgroundColor:
                    colors.find((c: ColorInfo) => c.name === color)?.shades[5]
                      .hex || "#000",
                }}
              ></m.div>
            ))}
          </div>
        </div>

        {/* Sección de Pestañas */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FormatTabs />
        </m.div>
      </main>

      <Footer />
    </div>
  );
}

// Componente principal que provee el contexto
export default function ColorsPage() {
  return (
    <ColorProvider>
      <LazyMotion features={domAnimation}>
        <ColorsPageContent />
      </LazyMotion>
    </ColorProvider>
  );
}
