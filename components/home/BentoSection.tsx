"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  Paintbrush,
  Code,
  Layers,
  Settings,
  BarChart,
  Users,
} from "lucide-react";
import Button from "@/components/sections/Button";

const BentoSection = () => {
  return (
    <section className="py-16 bg-zinc-50 dark:bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            Características Principales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto "
          >
            Nuestra biblioteca de componentes está diseñada con enfoque en
            accesibilidad, rendimiento y experiencia de desarrollo
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-w-5xl mx-auto">
          {/* Primera fila: tarjeta grande que ocupa todo el ancho */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 bg-white dark:bg-black rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm dark:shadow-xl"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-6 md:w-1/2 flex flex-col">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  Accesibilidad integrada desde el principio
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Todos nuestros componentes cumplen con las directrices WCAG
                  2.1 AA, incluyendo navegación por teclado, soporte para
                  lectores de pantalla y contrastes adecuados.
                </p>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium rounded-full text-sm px-4 py-1.5 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                  >
                    Ver documentación
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm group"
                    rightIcon={
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    }
                  >
                    Explorar componentes
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 p-6 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="bg-zinc-100/80 dark:bg-black/60 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors shadow-md">
                    <div className="mb-2">
                      <Users size={24} className="text-blue-400" />
                    </div>
                    <div className="text-xs font-medium text-zinc-900 dark:text-white">
                      Navegación por teclado
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Soporte completo
                    </div>
                  </div>

                  <div className="bg-zinc-100/80 dark:bg-black/60 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors shadow-md">
                    <div className="mb-2">
                      <Shield size={24} className="text-green-400" />
                    </div>
                    <div className="text-xs font-medium text-zinc-900 dark:text-white">
                      ARIA
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Atributos integrados
                    </div>
                  </div>

                  <div className="bg-zinc-100/80 dark:bg-black/60 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors shadow-md">
                    <div className="mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-purple-500"
                      >
                        <rect
                          width="20"
                          height="16"
                          x="2"
                          y="4"
                          fill="currentColor"
                          opacity="0.2"
                          rx="2"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M8 10h8M8 14h4"
                        />
                      </svg>
                    </div>
                    <div className="text-xs font-medium text-zinc-900 dark:text-white">
                      WCAG 2.1
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">Nivel AA+</div>
                  </div>

                  <div className="bg-zinc-100/80 dark:bg-black/60 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors shadow-md">
                    <div className="mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-orange-500"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="currentColor"
                          opacity="0.2"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M12 17v.01M12 7v7"
                        />
                      </svg>
                    </div>
                    <div className="text-xs font-medium text-zinc-900 dark:text-white">
                      Estados enfocados
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Visualización clara
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Segunda fila: primera posición */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1 bg-white dark:bg-black rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm dark:shadow-xl"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Rendimiento optimizado
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Componentes con código altamente optimizado y tree-shaking
                integrado para reducir significativamente el tamaño del bundle.
              </p>
              <Button
                variant="ghost"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mt-3 px-0 group"
                rightIcon={
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                }
              >
                Ver métricas de rendimiento
              </Button>
            </div>
            <div className="p-4">
              <div className="bg-zinc-100/60 dark:bg-black/40 rounded-lg p-3">
                <div className="flex items-center mb-3">
                  <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs px-2 py-0.5 rounded mr-2">
                    &lt;5KB
                  </span>
                  <span className="text-zinc-900 dark:text-white text-sm">
                    Tamaño promedio por componente
                  </span>
                </div>
                <div className="border-l-2 border-zinc-300 dark:border-zinc-800 pl-3 my-2">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 mr-2 flex items-center justify-center">
                      <span className="text-xs text-white">JS</span>
                    </div>
                    <span className="text-xs text-zinc-900 dark:text-white">
                      Tree-shaking completo
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-red-400 mr-2 flex items-center justify-center">
                      <span className="text-xs text-white">RT</span>
                    </div>
                    <span className="text-xs text-zinc-900 dark:text-white">
                      100/100 en Lighthouse
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Segunda fila: segunda posición */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 bg-white dark:bg-black rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm dark:shadow-xl transition-all duration-500"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Personalización avanzada
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Sistema de diseño flexible con variables CSS y soporte para
                temas que permite adaptar los componentes a tu marca sin
                sacrificar funcionalidad.
              </p>
              <Button
                variant="ghost"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mt-3 px-0 group"
                rightIcon={
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                }
              >
                Ver guía de estilos
              </Button>
            </div>
            <div className="p-4 flex flex-col items-center justify-center relative h-48 transition-all duration-500">
              {/* Contenedor principal del stack con mejor organización visual */}
              <div className="relative w-full mx-auto transition-all duration-500 ease-out transform group-hover:-translate-y-4 group-hover:scale-105">
                {/* Efecto de brillo al hacer hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 rounded-lg blur opacity-0 group-hover:opacity-30 group-hover:via-indigo-500/20 transition-all duration-700 -z-10"></div>

                {/* Sombra sutil para todo el stack */}
                <div className="absolute left-0 right-0 bottom-0 h-28 bg-zinc-400/10 dark:bg-black/20 blur-md rounded-xl -z-10 transition-all duration-500 group-hover:bg-zinc-400/20 dark:group-hover:bg-black/30 group-hover:h-32"></div>

                {/* Notificación 4 */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[75%] h-7 bg-zinc-200/80 dark:bg-zinc-800/60 rounded-lg shadow-sm transition-all duration-600 ease-in-out group-hover:-translate-y-2.5 group-hover:opacity-70"></div>

                {/* Notificación 3 */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[82%] h-8 bg-zinc-200/90 dark:bg-zinc-800/80 rounded-lg shadow-md transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-80"></div>

                {/* Notificación 2 */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[90%] bg-zinc-100/95 dark:bg-zinc-800/95 rounded-lg shadow-lg h-10 overflow-hidden transition-all duration-400 ease-in-out group-hover:-translate-y-1.5 group-hover:opacity-90">
                  {/* Solo mostrar una línea de contenido para la segunda notificación */}
                  <div className="h-full border-b border-zinc-300/30 dark:border-zinc-700/30 px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-sm bg-purple-500/80 flex-shrink-0"></div>
                      <div className="ml-2 h-2 bg-zinc-400/80 dark:bg-white/60 w-1/2 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Notificación principal (la que está hasta arriba del stack) */}
                <div className="relative bg-white dark:bg-zinc-800 rounded-lg border border-zinc-300/50 dark:border-zinc-700/50 shadow-2xl w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-indigo-500/20 group-hover:border-zinc-400/80 dark:group-hover:border-zinc-700/80">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-500 group-hover:bg-zinc-100/90 dark:group-hover:bg-zinc-800/90">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 rounded overflow-hidden mr-2 transition-transform duration-500 group-hover:scale-110">
                        <Paintbrush className="text-indigo-400" />
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-white text-sm group-hover:text-indigo-900 dark:group-hover:text-indigo-50 transition-colors duration-300">
                        Sistema de tokens
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-300">
                      Actualizado
                    </span>
                  </div>

                  <div className="p-3.5 group-hover:bg-zinc-50/80 dark:group-hover:bg-zinc-800/80 transition-all duration-500">
                    <p className="text-sm text-zinc-900 dark:text-white leading-snug">
                      <span className="font-medium text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
                        @tokens
                      </span>{" "}
                      Más de 150 variables CSS personalizables para crear{" "}
                      <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                        temas coherentes
                      </span>{" "}
                      en toda tu aplicación
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tercera fila: primera posición */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1 bg-white dark:bg-black rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm dark:shadow-xl"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Componentes primitivos
                  </h3>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Nuestra arquitectura se basa en componentes primitivos altamente
                personalizables que puedes combinar para crear interfaces
                complejas.
              </p>

              <div className="mt-6 space-y-3">
                <div className="p-4 rounded-md bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/60 flex items-center">
                  <div className="w-6 h-6 mr-3 flex-shrink-0 rounded flex items-center justify-center text-white">
                    <Layers className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white text-sm">
                      Componentes modulares
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                      Diseñados para funcionar juntos o por separado.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/60 flex items-center">
                  <div className="w-6 h-6 mr-3 flex-shrink-0 rounded flex items-center justify-center text-white">
                    <Code className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white text-sm">
                      API consistente
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                      Patrones predecibles a través de todos los componentes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/60 flex items-center">
                  <div className="w-6 h-6 mr-3 flex-shrink-0 rounded flex items-center justify-center text-white">
                    <Settings className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white text-sm">
                      Composables
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                      APIs de bajo nivel para máxima flexibilidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tercera fila: segunda posición */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-1 bg-white dark:bg-black rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/40 shadow-sm dark:shadow-xl relative"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Herramientas para desarrolladores
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Amplia documentación, consejos en tiempo real y utilidades que
                facilitan el uso de nuestros componentes en cualquier proyecto.
              </p>
              <Button
                variant="ghost"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mt-3 px-0 group"
                rightIcon={
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                }
              >
                Ver herramientas
              </Button>
            </div>
            <div className="p-4 relative h-48 overflow-hidden flex items-center">
              <div className="w-full">
                <div className="absolute left-0 top-4 bottom-4 w-8 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
                <div className="absolute right-0 top-4 bottom-4 w-8 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>

                <div className="flex space-x-2 overflow-hidden py-2">
                  <div className="flex space-x-2 animate-infinite-scroll whitespace-nowrap">
                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        CLI
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        IntelliSense
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        DevTools
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        Linting
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        TypeScript
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        Snippets
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        Storybook
                      </span>
                    </div>

                    {/* Duplicación exacta para asegurar continuidad en el desplazamiento */}
                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        CLI
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        IntelliSense
                      </span>
                    </div>

                    <div className="flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full py-1.5 px-3 flex items-center space-x-1.5 transition-colors">
                      <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <Zap className="h-2.5 w-2.5 text-zinc-800 dark:text-white" />
                      </div>
                      <span className="text-xs text-zinc-800 dark:text-white font-medium tracking-tight">
                        DevTools
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-4 flex items-center space-x-2.5 transition-colors">
                    <div className="w-5 h-5 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                      <BarChart className="h-3 w-3 text-zinc-800 dark:text-white" />
                    </div>
                    <span className="text-sm text-zinc-800 dark:text-white font-medium">
                      Análisis de rendimiento integrado
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <style jsx global>{`
              @keyframes slideHorizontal {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              @keyframes slideUp {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-50%);
                }
              }

              /* Animación infinita para el carrusel */
              @keyframes slide {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }

              .animate-infinite-scroll {
                animation: slide 30s linear infinite;
                width: max-content;
              }

              .animate-infinite-scroll:hover {
                animation-play-state: paused;
              }

              /* Animación para las barras del gráfico */
              @keyframes pulseSlow {
                0% {
                  opacity: 0.7;
                }
                50% {
                  opacity: 1;
                }
                100% {
                  opacity: 0.7;
                }
              }

              .animate-pulse-slow {
                animation: pulseSlow 3s ease-in-out infinite;
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
