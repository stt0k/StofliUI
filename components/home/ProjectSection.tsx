"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ProjectSection = () => {
  return (
    <section className="py-24 w-full bg-zinc-50 dark:bg-black relative overflow-hidden">
      {/* Contenido principal */}
      <div className="container mx-auto relative z-10">
        {/* Bento grid */}
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Fila 1, Columna 1: Component Library */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-50 dark:bg-black border-b-2 border-r-2 border-t-2 border-gray-200 dark:border-zinc-800/50 p-6 md:p-10"
            >
              <div className="max-w-md">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white mb-3">
                  Biblioteca de componentes completa
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Accede a una colección extensa de componentes UI modernos y
                  personalizables para tu próximo proyecto web.
                </p>

                <div className="bg-white dark:bg-zinc-900/90 rounded-lg p-6 backdrop-blur-sm border border-gray-200 dark:border-zinc-800/80 shadow-sm dark:shadow-none">
                  <h4 className="text-lg font-bold text-zinc-800 dark:text-white mb-5">
                    Biblioteca Stofli
                  </h4>

                  {/* Properties Row */}
                  <div className="flex flex-col space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Categorías
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-indigo-600 dark:text-indigo-300 text-xs font-medium">
                          <span className="w-2 h-2 mr-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                          Core
                        </div>
                        <div className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-gray-700 dark:text-zinc-300 text-xs font-medium">
                          React
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-400 text-xs">
                          45
                        </div>
                      </div>
                    </div>

                    {/* Resources Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Frameworks
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-300 text-xs font-medium">
                          <span className="w-2 h-2 mr-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                          Next.js
                        </div>
                        <div className="flex items-center px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-md text-green-600 dark:text-green-300 text-xs font-medium">
                          <span className="w-2 h-2 mr-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>
                          Vue
                        </div>
                      </div>
                    </div>

                    {/* Milestones Row */}
                    <div className="flex flex-col space-y-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Estadísticas
                      </span>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-2 h-2 mr-2 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                            <span className="text-sm text-zinc-700 dark:text-zinc-200">
                              Descargas
                            </span>
                          </div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            15.4K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-2 h-2 mr-2 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                            <span className="text-sm text-zinc-700 dark:text-zinc-200">
                              Satisfacción
                            </span>
                          </div>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">
                            98% de 237
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-2 h-2 mr-2 rounded-full bg-amber-500 dark:bg-amber-400"></span>
                            <span className="text-sm text-zinc-700 dark:text-zinc-200">
                              Tamaño
                            </span>
                          </div>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">
                            12KB min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fila 1, Columna 2: Novedades y actualizaciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-50 dark:bg-black border-b-2 border-t-2 border-gray-200 dark:border-zinc-800/50 p-6 md:p-10 relative"
            >
              <div className="max-w-md">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white mb-3">
                  Actualizaciones y roadmap
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Mantente al día con las últimas mejoras y nuevas
                  características disponibles en Stofli UI.
                </p>

                {/* Tarjetas de actualización */}
                <div className="relative">
                  <div className="absolute top-5 -right-2 z-10 w-[95%] h-[90%] bg-gray-100/60 dark:bg-zinc-700/20 rounded-lg transform rotate-2"></div>

                  <div className="bg-white dark:bg-zinc-900/90 rounded-lg p-5 relative z-20 backdrop-blur-sm border border-gray-200 dark:border-zinc-800/80 shadow-sm dark:shadow-none">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Versión
                      </div>
                      <div className="flex items-center">
                        <div className="px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-md text-green-600 dark:text-green-300 text-xs font-medium mr-2">
                          <div className="flex items-center">
                            <span className="w-1.5 h-1.5 mr-1 rounded-full bg-green-500"></span>
                            Estable
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-gray-700 dark:text-zinc-300 text-xs font-medium">
                          v1.0.0
                        </div>
                      </div>
                    </div>

                    {/* Tarjeta interior con status */}
                    <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4 border border-indigo-100 dark:border-indigo-800/20">
                      <div className="flex items-start">
                        <div className="flex items-center mt-0.5">
                          <span className="w-4 h-4 mr-2 rounded-full bg-indigo-500 flex items-center justify-center">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 13L9 17L19 7"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                              Nuevos componentes
                            </span>
                          </div>
                          <p className="text-sm text-zinc-700 dark:text-zinc-100">
                            Acaba de lanzarse Tabs, Popover y Tooltip con todas
                            sus variantes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        28 Oct 2023
                      </div>
                      <button className="flex items-center text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">
                        Changelog <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fila 2, un solo elemento que ocupa ambas columnas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-zinc-50 dark:bg-black border-b-2 border-gray-200 dark:border-zinc-800/50 col-span-1 md:col-span-2 p-6 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white mb-6">
                    Construye interfaces modernas con StofliUI
                  </h3>

                  {/* Lista de características */}
                  <div className="space-y-5 pt-2">
                    <div className="flex items-center">
                      <div className="w-1 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full mr-4"></div>
                      <span className="text-md font-medium text-zinc-800 dark:text-white">
                        Componentes reutilizables
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-1 h-6 bg-purple-500 dark:bg-purple-400 rounded-full mr-4"></div>
                      <span className="text-md font-medium text-zinc-800 dark:text-white">
                        Diseño responsivo integrado
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-1 h-6 bg-green-500 dark:bg-green-400 rounded-full mr-4"></div>
                      <span className="text-md font-medium text-zinc-800 dark:text-white">
                        Modos claro y oscuro nativos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-lg">
                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800/50 rounded-lg overflow-hidden shadow-sm dark:shadow-none">
                    <div className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-zinc-800/50 bg-gray-50 dark:bg-black">
                      <div className="px-2 py-1 bg-gray-200 dark:bg-zinc-800 rounded-md text-gray-700 dark:text-zinc-300 text-xs font-medium flex items-center">
                        <svg
                          className="w-3.5 h-3.5 mr-1 text-gray-600 dark:text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 13H15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 10L12 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Componentes
                      </div>
                      <div className="text-gray-500 dark:text-zinc-400 text-xs mx-1">
                        /
                      </div>
                      <div className="px-2 py-1 bg-gray-200 dark:bg-zinc-800 rounded-md text-gray-700 dark:text-zinc-300 text-xs font-medium">
                        Buttons
                      </div>
                      <div className="ml-auto text-gray-500 dark:text-zinc-400 text-xs">
                        ···
                      </div>
                    </div>

                    <div className="p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-black">
                      <div className="w-12 h-12 mb-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12H22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div className="space-y-2 mb-3">
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-white">
                          <div className="inline-block bg-indigo-100 dark:bg-indigo-800 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-200 text-sm mr-1">
                            new
                          </div>
                          Accesibilidad incorporada
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xs mx-auto">
                          Todos los componentes cumplen con
                          <span className="inline-block bg-purple-100 dark:bg-purple-900/40 px-1.5 py-0.5 rounded text-purple-700 dark:text-purple-300 text-sm ml-1">
                            @WCAG 2.1
                          </span>
                        </p>
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <button className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 rounded-md text-xs font-medium text-white transition-colors">
                            Ver documentación
                          </button>
                          <button className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md text-xs font-medium text-gray-700 dark:text-zinc-300 transition-colors">
                            Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
