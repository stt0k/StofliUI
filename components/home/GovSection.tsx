"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Code, Zap, Sparkles, Eye } from "lucide-react";

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

        {/* Tarjetas inclinadas */}
        <div className="max-w-6xl mx-auto px-2 md:px-4">
          {/* En escritorio: display normal con altura fija */}
          <div className="hidden md:block relative h-[420px]">
            <div className="absolute inset-0 grid grid-cols-3 gap-6">
              <FeaturedCard
                title="UI/UX"
                heading="Componentes UI perfectos"
                description="Más de 50 componentes UI interactivos listos para usar con soporte para todos los estados"
                gradientFrom="#9333ea"
                gradientTo="#6366f1"
                rotation="-rotate-6"
                delay={0.1}
                image={
                  <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-300 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-4 bg-white/90 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-gradient-to-r from-pink-500 to-yellow-300 rounded-full"></div>
                      </div>
                      <span className="absolute right-8 text-xs text-white font-medium">
                        LOADING...
                      </span>
                    </div>
                  </div>
                }
                icon={<Sparkles className="w-5 h-5" />}
                tag="Components"
                lightMode={true}
              />

              <FeaturedCard
                title="Web Development"
                heading="How to Think Like an Expert Developer"
                description="Biblioteca 100% personalizable que te permite adaptar cada componente a tu marca con nuestro sistema de tokens"
                gradientFrom="#7e22ce"
                gradientTo="#a855f7"
                rotation="rotate-0"
                delay={0.2}
                image={
                  <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-purple-600 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <div className="absolute w-8 h-8 bg-purple-700 rounded-full"></div>
                        <div className="absolute w-full h-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full"></div>
                          <div className="absolute w-2 h-2 bg-purple-700 rounded-full top-1/3 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                        <div className="absolute w-10 h-10 border-4 border-purple-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                }
                icon={<Code className="w-5 h-5" />}
                tag="Expert"
                lightMode={true}
              />

              <FeaturedCard
                title="UI UX"
                heading="Mastering the Art of Visionary Design"
                description="Todos los componentes cumplen con los estándares de accesibilidad WCAG 2.1 para crear experiencias inclusivas"
                gradientFrom="#10b981"
                gradientTo="#34d399"
                rotation="rotate-6"
                delay={0.3}
                image={
                  <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-lime-300 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative">
                          <div className="w-8 h-8 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-pink-500 rounded-full"
                              style={{
                                transform: `rotate(${
                                  i * 45
                                }deg) translateX(12px)`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                icon={<Eye className="w-5 h-5" />}
                tag="Accessibility"
                lightMode={true}
              />
            </div>
          </div>

          {/* En móvil y tablet: grid simple para garantizar visualización */}
          <div className="md:hidden space-y-6 my-4">
            <div className="w-full">
              <FeaturedCard
                title="UI/UX"
                heading="Componentes UI perfectos"
                description="Más de 50 componentes UI interactivos listos para usar con soporte para todos los estados"
                gradientFrom="#9333ea"
                gradientTo="#6366f1"
                rotation="rotate-0"
                delay={0.1}
                image={
                  <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-300 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-4 bg-white/90 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-gradient-to-r from-pink-500 to-yellow-300 rounded-full"></div>
                      </div>
                      <span className="absolute right-8 text-xs text-white font-medium">
                        LOADING...
                      </span>
                    </div>
                  </div>
                }
                icon={<Sparkles className="w-5 h-5" />}
                tag="Components"
                lightMode={true}
                mobileCard={true}
              />
            </div>

            <div className="w-full">
              <FeaturedCard
                title="Web Development"
                heading="How to Think Like an Expert Developer"
                description="Biblioteca 100% personalizable que te permite adaptar cada componente a tu marca con nuestro sistema de tokens"
                gradientFrom="#7e22ce"
                gradientTo="#a855f7"
                rotation="rotate-0"
                delay={0.2}
                image={
                  <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-purple-600 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <div className="absolute w-8 h-8 bg-purple-700 rounded-full"></div>
                        <div className="absolute w-full h-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full"></div>
                          <div className="absolute w-2 h-2 bg-purple-700 rounded-full top-1/3 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                        <div className="absolute w-10 h-10 border-4 border-purple-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                }
                icon={<Code className="w-5 h-5" />}
                tag="Expert"
                lightMode={true}
                mobileCard={true}
              />
            </div>

            <div className="w-full">
              <FeaturedCard
                title="UI UX"
                heading="Mastering the Art of Visionary Design"
                description="Todos los componentes cumplen con los estándares de accesibilidad WCAG 2.1 para crear experiencias inclusivas"
                gradientFrom="#10b981"
                gradientTo="#34d399"
                rotation="rotate-0"
                delay={0.3}
                image={
                  <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-lime-300 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative">
                          <div className="w-8 h-8 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-pink-500 rounded-full"
                              style={{
                                transform: `rotate(${
                                  i * 45
                                }deg) translateX(12px)`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                icon={<Eye className="w-5 h-5" />}
                tag="Accessibility"
                lightMode={true}
                mobileCard={true}
              />
            </div>
          </div>
        </div>

        {/* Sección adicional con stats más pequeños */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            <MiniStat
              icon={<Star className="w-4 h-4" />}
              label="5 estrellas"
              sublabel="Calificación"
            />
            <MiniStat
              icon={<Zap className="w-4 h-4" />}
              label="12kb min"
              sublabel="Tamaño"
            />
            <MiniStat
              icon={<Sparkles className="w-4 h-4" />}
              label="Server Side"
              sublabel="Rendering"
            />
            <MiniStat
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

const FeaturedCard = ({
  title,
  heading,
  description,
  gradientFrom,
  gradientTo,
  rotation,
  delay,
  image,
  icon,
  tag,
  lightMode = false,
  mobileCard = false,
}: {
  title: string;
  heading: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  rotation: string;
  delay: number;
  image: React.ReactNode;
  icon: React.ReactNode;
  tag: string;
  lightMode?: boolean;
  mobileCard?: boolean;
}) => {
  return (
    <motion.div
      className={`group h-full w-full perspective`}
      initial={{ opacity: 0, y: mobileCard ? 10 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.1 + delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
    >
      <div
        className={`relative h-full w-full rounded-xl shadow-lg dark:shadow-xl transition-all duration-500 ${rotation} group-hover:rotate-0 transform-gpu`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-black"></div>
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {/* Imagen en la parte superior */}
          {image}

          {/* Contenido de la tarjeta */}
          <div className="p-5 md:p-6">
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className={`text-xs ${
                    lightMode ? "text-zinc-600" : "text-zinc-500"
                  } dark:text-zinc-500 uppercase tracking-wider`}
                >
                  {title}
                </span>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center p-1.5 rounded-md text-white`}
                    style={{
                      backgroundColor: gradientFrom,
                    }}
                  >
                    {icon}
                  </div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-zinc-800 dark:text-white mb-2 line-clamp-2 leading-tight">
                {heading}
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
                {description}
              </p>
            </div>

            {/* Etiqueta en la parte inferior */}
            <div className="absolute bottom-5 left-5 md:left-6">
              <div
                className="inline-block px-2 md:px-2.5 py-1 rounded-md text-xs font-medium text-white shadow-sm"
                style={{
                  background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                {tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MiniStat = ({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-white shadow-sm dark:shadow-none dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800/50 rounded-lg p-3 md:p-4 flex items-center"
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
    </motion.div>
  );
};

export default GovSection;
