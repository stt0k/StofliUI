"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Tipos para las secciones
interface Section {
  id: string;
  title: string;
  description: string;
  caption: string;
  codeExample: string;
  image: string;
  color: string;
  lightColor: string;
}

const sections: Section[] = [
  {
    id: "install",
    title: "Instalación",
    description:
      "Comienza instalando StofliUI en tu proyecto mediante npm, yarn, bun o pnpm. Compatible con React, Next.js y otros frameworks modernos.",
    caption: "Instala la librería usando tu gestor de paquetes preferido",
    codeExample:
      "npm install stofli-ui\n# o\nyarn add stofli-uio\n# o\nbun add stofli-ui\n# o\npnpm add stofli-ui",
    image:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1170&auto=format&fit=crop",
    color: "#B3AEF5",
    lightColor: "#9F91F2",
  },
  {
    id: "use",
    title: "Uso básico",
    description:
      "Importa y utiliza cualquiera de nuestros componentes en tus páginas o aplicaciones. Todos los componentes están totalmente tipados y documentados.",
    caption: "Importa los componentes que necesites y personalízalos",
    codeExample:
      'import { Tabs } from "stofli-ui";\n \nexport default function TabsDemo() {\n  return (\n    <Tabs\n      tabs={[\n        {\n          label: "Cuenta",\n          content: <p className="text-zinc-600 dark:text-zinc-400">\n          Configuración de tu cuenta y preferencias.</p>\n        },\n        {\n          label: "Contraseña",\n          content: <p className="text-zinc-600 dark:text-zinc-400">\n          Gestiona la seguridad de tu cuenta.</p>\n        },\n        {\n          label: "Notificaciones",\n          content: <p className="text-zinc-600 dark:text-zinc-400">\n          Configura cómo y cuándo recibir alertas.</p>\n        }\n      ]}\n    />\n  );\n}',
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop",
    color: "#EAA879",
    lightColor: "#D89966",
  },
  {
    id: "customize",
    title: "Personalización",
    description:
      "Personaliza los componentes con tus propios estilos y temas. StofliUI se adapta perfectamente a la identidad visual de tu proyecto.",
    caption: "Adapta los componentes a tu marca con facilidad",
    codeExample:
      'import { Badge } from "stofli-ui";\n \nexport default function BadgeCustomClassesDemo() {\n  return (\n      <Badge \n        withDot \n        dotClassName="bg-yellow-300 animate-pulse h-3 w-3"\n        className="bg-zinc-800 text-white"\n      >\n        Animado\n      </Badge>\n  );\n}',
    image:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1064&auto=format&fit=crop",
    color: "#A8D5BA",
    lightColor: "#93C9A8",
  },
];

const ScrollProgressSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [hasExited, setHasExited] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Refs para cada sección
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Función para formatear el código con colores de sintaxis mejorados
  const formatCode = (code: string) => {
    const lines = code.split("\n");

    return lines.map((line, i) => {
      // Para líneas de importación
      if (line.includes("import")) {
        // Enfoque completamente nuevo para las importaciones
        return (
          <div key={i} className="mb-1">
            {(() => {
              const regex =
                /(import\s+)(\{[^}]*\}|\w+)(\s+from\s+)("[^"]+"|'[^']+')/g;
              const match = regex.exec(line);

              if (match) {
                return (
                  <>
                    <span className="text-violet-600 dark:text-[#C678DD]">
                      {match[1]}
                    </span>
                    {match[2].startsWith("{") ? (
                      <>
                        <span className="text-zinc-500 dark:text-[#ABB2BF]">
                          {"{"}
                        </span>
                        <span className="text-sky-500 dark:text-[#61AFEF]">
                          {match[2].substring(1, match[2].length - 1)}
                        </span>
                        <span className="text-zinc-500 dark:text-[#ABB2BF]">
                          {"}"}
                        </span>
                      </>
                    ) : (
                      <span className="text-sky-500 dark:text-[#61AFEF]">
                        {match[2]}
                      </span>
                    )}
                    <span className="text-violet-600 dark:text-[#C678DD]">
                      {match[3]}
                    </span>
                    <span className="text-emerald-500 dark:text-[#98C379]">
                      {match[4]}
                    </span>
                  </>
                );
              }

              // Si el regex no coincide, fallback para cualquier línea con "import"
              return (
                <span className="text-violet-600 dark:text-[#C678DD]">
                  {line}
                </span>
              );
            })()}
          </div>
        );
      }

      // Para líneas con export/function
      if (line.includes("export default") || line.includes("function")) {
        const parts = line.split(/(export default|function|\(|\)|\{)/g);
        return (
          <div key={i} className="mb-1">
            {parts.map((part, j) => {
              if (part === "export default") {
                return (
                  <span key={j} className="text-violet-600 dark:text-[#C678DD]">
                    {part}
                  </span>
                );
              } else if (part === "function") {
                return (
                  <span key={j} className="text-violet-600 dark:text-[#C678DD]">
                    {" "}
                    function
                  </span>
                );
              } else if (part === "(" || part === ")" || part === "{") {
                return (
                  <span key={j} className="text-zinc-500 dark:text-[#ABB2BF]">
                    {part}
                  </span>
                );
              } else if (
                part.trim() &&
                !part.includes("export") &&
                !part.includes("function")
              ) {
                return (
                  <span key={j} className="text-yellow-500 dark:text-[#E5C07B]">
                    {part}
                  </span>
                );
              }
              return <span key={j}>{part}</span>;
            })}
          </div>
        );
      }

      // Para líneas con return
      if (line.includes("return")) {
        return (
          <div key={i} className="mb-1">
            <span className="text-violet-600 dark:text-[#C678DD]">return</span>
            <span className="text-zinc-700 dark:text-[#ABB2BF]">
              {line.replace("return", "")}
            </span>
          </div>
        );
      }

      // Para JSX y elementos con etiquetas
      if ((line.includes("<") && line.includes(">")) || line.includes("</")) {
        // Identificar y colorear partes JSX
        const processJsxLine = (text: string) => {
          // Nueva implementación más precisa para JSX
          const parts = [];
          let currentPos = 0;

          // Regex para diferentes partes del JSX
          const tagRegex = /<\/?([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9]*)/g; // Etiquetas incluyendo componentes React con mayúscula
          const attrRegex = /\s+([a-zA-Z0-9]+)=(".*?"|{.*?})/g; // Atributos con sus valores

          // Procesar etiquetas de apertura o cierre
          let tagMatch;
          while ((tagMatch = tagRegex.exec(text)) !== null) {
            // Texto antes de la etiqueta
            if (tagMatch.index > currentPos) {
              parts.push({
                text: text.substring(currentPos, tagMatch.index),
                type: "text",
              });
            }

            // La etiqueta completa (< o </ seguido del nombre)
            parts.push({
              text: tagMatch[0],
              type: "tag",
            });

            currentPos = tagMatch.index + tagMatch[0].length;
          }

          // Resetear para otros patrones
          tagRegex.lastIndex = 0;
          currentPos = 0;

          // Procesar atributos
          let attrMatch;
          while ((attrMatch = attrRegex.exec(text)) !== null) {
            const attrName = attrMatch[1];
            const attrValue = attrMatch[2];

            // Encontrar la posición en el array parts para insertar
            let i = 0;
            let foundPos = 0;
            while (i < parts.length && foundPos < attrMatch.index) {
              foundPos += parts[i].text.length;
              i++;
            }

            // Si es un atributo className o similar
            if (attrName.toLowerCase().includes("class")) {
              parts.splice(i, 0, {
                text: attrMatch[0].substring(0, attrName.length + 1), // incluye el signo =
                type: "attr-class-name",
              });
              parts.splice(i + 1, 0, {
                text: attrValue,
                type: "attr-class-value",
              });
            } else {
              parts.splice(i, 0, {
                text: attrMatch[0].substring(0, attrName.length + 1),
                type: "attr-name",
              });
              parts.splice(i + 1, 0, {
                text: attrValue,
                type: "attr-value",
              });
            }

            currentPos = attrMatch.index + attrMatch[0].length;
          }

          // Resetear
          attrRegex.lastIndex = 0;

          // Si partes está vacío, usar un enfoque simplificado que al menos coloree bien las etiquetas
          if (parts.length === 0) {
            // Enfoque simplificado: al menos colorear las etiquetas
            return text.split(/(<\/?\w+[^>]*>)/).map((part, j) => {
              if (part.startsWith("<") && part.endsWith(">")) {
                // Intentar colorear el componente/tag
                const tagName = part.match(
                  /<\/?([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9]*)/
                )?.[1];

                if (tagName) {
                  // Es una etiqueta de React con mayúscula inicial
                  if (tagName[0] === tagName[0].toUpperCase()) {
                    return (
                      <span key={j}>
                        <span className="text-rose-500 dark:text-[#E06C75]">{`<${
                          part.includes("/") ? "/" : ""
                        }`}</span>
                        <span className="text-yellow-500 dark:text-[#E5C07B]">
                          {tagName}
                        </span>
                        {part.includes("className=") ? (
                          <span className="text-sky-400 dark:text-[#56B6C2]">
                            {part.substring(
                              tagName.length + 1 + (part.includes("/") ? 1 : 0),
                              part.length - 1
                            )}
                          </span>
                        ) : (
                          <span className="text-rose-500 dark:text-[#E06C75]">
                            {part.substring(
                              tagName.length + 1 + (part.includes("/") ? 1 : 0),
                              part.length
                            )}
                          </span>
                        )}
                      </span>
                    );
                  } else {
                    // Es una etiqueta HTML normal
                    return (
                      <span
                        key={j}
                        className="text-rose-500 dark:text-[#E06C75]"
                      >
                        {part}
                      </span>
                    );
                  }
                }

                return (
                  <span key={j} className="text-rose-500 dark:text-[#E06C75]">
                    {part}
                  </span>
                );
              }

              // Para className y su valor
              if (
                part.includes('className="') ||
                part.includes("className={")
              ) {
                const classParts = part.split(/(className=)(".*?"|{.*?})/);
                return (
                  <span key={j}>
                    {classParts.map((classPart, k) => {
                      if (classPart === "className=") {
                        return (
                          <span
                            key={k}
                            className="text-sky-400 dark:text-[#56B6C2]"
                          >
                            {classPart}
                          </span>
                        );
                      } else if (
                        (classPart.startsWith('"') &&
                          classPart.endsWith('"')) ||
                        (classPart.startsWith("{") && classPart.endsWith("}"))
                      ) {
                        return (
                          <span
                            key={k}
                            className="text-amber-500 dark:text-[#D19A66]"
                          >
                            {classPart}
                          </span>
                        );
                      }
                      return <span key={k}>{classPart}</span>;
                    })}
                  </span>
                );
              }

              // Para atributos y su valor
              if (part.includes('="') || part.includes("={")) {
                const attrParts = part.split(/([\w-]+=)(".*?"|{.*?})/g);
                return (
                  <span key={j}>
                    {attrParts.map((attrPart, k) => {
                      if (attrPart.endsWith("=")) {
                        return (
                          <span
                            key={k}
                            className="text-sky-400 dark:text-[#56B6C2]"
                          >
                            {attrPart}
                          </span>
                        );
                      } else if (
                        (attrPart.startsWith('"') && attrPart.endsWith('"')) ||
                        (attrPart.startsWith("{") && attrPart.endsWith("}"))
                      ) {
                        return (
                          <span
                            key={k}
                            className="text-amber-500 dark:text-[#D19A66]"
                          >
                            {attrPart}
                          </span>
                        );
                      }
                      return <span key={k}>{attrPart}</span>;
                    })}
                  </span>
                );
              }

              return <span key={j}>{part}</span>;
            });
          }

          // Renderizar las partes con sus estilos correspondientes
          return parts.map((part, j) => {
            switch (part.type) {
              case "tag":
                return (
                  <span key={j} className="text-rose-500 dark:text-[#E06C75]">
                    {part.text}
                  </span>
                );
              case "attr-name":
              case "attr-class-name":
                return (
                  <span key={j} className="text-sky-400 dark:text-[#56B6C2]">
                    {part.text}
                  </span>
                );
              case "attr-value":
              case "attr-class-value":
                return (
                  <span key={j} className="text-amber-500 dark:text-[#D19A66]">
                    {part.text}
                  </span>
                );
              default:
                return <span key={j}>{part.text}</span>;
            }
          });
        };

        return (
          <div key={i} className="mb-1">
            {processJsxLine(line)}
          </div>
        );
      }

      // Para comentarios
      if (line.startsWith("//") || line.startsWith("#")) {
        return (
          <div key={i} className="mb-1">
            <span className="text-zinc-500 dark:text-[#5C6370]">{line}</span>
          </div>
        );
      }

      // Para definiciones de constantes
      if (
        line.includes("const ") ||
        line.includes("let ") ||
        line.includes("var ")
      ) {
        const parts = line.split(/(const|let|var|\{|\}|=|:)/g);
        return (
          <div key={i} className="mb-1">
            {parts.map((part, j) => {
              if (part === "const" || part === "let" || part === "var") {
                return (
                  <span key={j} className="text-violet-600 dark:text-[#C678DD]">
                    {part}
                  </span>
                );
              } else if (
                part === "=" ||
                part === ":" ||
                part === "{" ||
                part === "}"
              ) {
                return (
                  <span key={j} className="text-zinc-500 dark:text-[#ABB2BF]">
                    {part}
                  </span>
                );
              } else if (
                part.includes("'") ||
                part.includes('"') ||
                part.includes("`") ||
                part.includes("#")
              ) {
                return (
                  <span
                    key={j}
                    className="text-emerald-500 dark:text-[#98C379]"
                  >
                    {part}
                  </span>
                );
              } else if (
                part.trim() &&
                !part.includes("const") &&
                !part.includes("let")
              ) {
                return (
                  <span key={j} className="text-amber-500 dark:text-[#D19A66]">
                    {part}
                  </span>
                );
              }
              return <span key={j}>{part}</span>;
            })}
          </div>
        );
      }

      // Línea normal si no coincide con ningún patrón específico
      return (
        <div key={i} className="mb-1">
          {line}
        </div>
      );
    });
  };

  // Función para asignar refs
  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  // Verificar si el dispositivo es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Efecto para manejar el scroll y actualizar la barra de progreso
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !sectionContentRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Determinar si estamos en la zona de "sticky"
      const stickyStart = containerTop - 100; // Un poco antes para suavizar la transición
      const stickyEnd = containerTop + containerHeight - viewportHeight;

      setIsSticky(scrollY >= stickyStart && scrollY < stickyEnd);
      setHasExited(scrollY >= stickyEnd);

      // Calcular el progreso del scroll dentro de la sección
      const scrollStart = containerTop;
      const scrollEnd = containerTop + containerHeight - viewportHeight;
      const progress = Math.max(
        0,
        Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart))
      );

      setScrollProgress(progress);

      // Determinar qué sección está activa basado en el progreso
      const newActiveSection = Math.min(
        sections.length - 1,
        Math.floor(progress * sections.length)
      );

      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Llamar una vez para inicializar
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-zinc-50 dark:bg-black"
      style={{ height: `${(sections.length + 1) * 100}vh` }} // Espacio para el scroll
    >
      <div
        ref={sectionContentRef}
        className={`w-full min-h-screen flex items-center transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0" : ""
        } ${hasExited ? "absolute bottom-0 left-0 right-0" : ""}`}
      >
        <div className="container mx-auto px-4 py-6 md:py-0 relative z-10">
          {/* Versión móvil completamente distinta */}
          {isMobile ? (
            <div className="flex flex-col max-w-md mx-auto">
              {/* Título y descripción */}
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  Tutorial de instalación
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  Sigue estos {sections.length} sencillos pasos para comenzar
                  con StofliUI
                </p>

                {/* Indicadores de paso en formato horizontal */}
                <div className="flex justify-center gap-1.5 mb-3">
                  {sections.map((section, index) => (
                    <div
                      key={`indicator-${section.id}`}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        activeSection === index
                          ? "bg-zinc-800 dark:bg-white w-6"
                          : "bg-zinc-400/40 dark:bg-white/40 w-3"
                      }`}
                    ></div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#EAA879]/10 to-[#B3AEF5]/10 dark:from-[#EAA879]/20 dark:to-[#B3AEF5]/20 text-zinc-800 dark:text-white/70 backdrop-blur-sm border border-zinc-300/30 dark:border-white/10">
                    Paso {activeSection + 1}/{sections.length}
                  </span>
                </div>
              </div>

              {/* Terminal con código en versión compacta */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-white/80 dark:bg-black/95 border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl">
                {/* Barra superior estilo código */}
                <div className="sticky top-0 flex items-center gap-2 z-30 px-3 py-2 bg-zinc-100 dark:bg-black border-b border-zinc-200 dark:border-zinc-800/80">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-white/70 bg-zinc-200/80 dark:bg-zinc-800/50 backdrop-blur-md rounded-md px-2 py-0.5 flex-1 text-center border border-zinc-300/30 dark:border-white/5 ml-2 truncate">
                    {sections[activeSection].id === "install"
                      ? "terminal"
                      : `${sections[activeSection].id}.tsx`}
                  </div>
                </div>

                {/* Contenido del código simplificado */}
                <div className="p-3 max-h-[200px] overflow-auto bg-zinc-100/90 dark:bg-zinc-900/70">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className="relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: activeSection === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: activeSection === index ? "block" : "none",
                      }}
                    >
                      {/* Título móvil */}
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
                        {section.title}
                      </h3>

                      {/* Código sintético más pequeño */}
                      <pre className="font-mono text-[10px] text-zinc-800 dark:text-white/90 whitespace-pre-wrap rounded p-2 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-sm overflow-auto max-h-[150px] border-l-2 border-zinc-300 dark:border-zinc-700/50">
                        <code>{formatCode(section.codeExample)}</code>
                      </pre>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-3">
                        {section.description}
                      </p>

                      {/* Enlace a documentación para móvil */}
                      <div className="mt-2">
                        <a
                          href="/docs/"
                          className="flex items-center text-[10px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          <span>Ver documentación</span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1"
                          >
                            <path
                              d="M6 12L10 8L6 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lista de pasos con indicadores activos */}
              <div className="space-y-2 pb-4">
                {sections.map((section, index) => {
                  const isActive = activeSection === index;
                  return (
                    <div
                      key={section.id}
                      className={`relative pl-8 py-3 pr-2 rounded-lg transition-all duration-300 border ${
                        isActive
                          ? "border-zinc-300 dark:border-white/20 bg-white/50 dark:bg-black/50"
                          : "border-zinc-200/60 dark:border-zinc-800/40 opacity-70 dark:opacity-60"
                      }`}
                    >
                      {/* Punto indicador del paso */}
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300 z-10`}
                        style={{
                          backgroundColor: isActive ? section.color : "#d1d5db",
                          boxShadow: isActive
                            ? `0 0 8px ${section.color}`
                            : "none",
                        }}
                      />

                      <h4
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-zinc-900 dark:text-white"
                            : "text-zinc-600 dark:text-zinc-500"
                        }`}
                      >
                        {section.title}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {/* Etiquetas compactas */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                <div className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] bg-white/20 dark:bg-black/20 backdrop-blur border border-zinc-300/30 dark:border-white/10 text-zinc-700 dark:text-white/70">
                  <div className="w-1 h-1 rounded-full mr-1 bg-[#B3AEF5]"></div>
                  5 min
                </div>
                <div className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] bg-white/20 dark:bg-black/20 backdrop-blur border border-zinc-300/30 dark:border-white/10 text-zinc-700 dark:text-white/70">
                  <div className="w-1 h-1 rounded-full mr-1 bg-[#EAA879]"></div>
                  React/Next
                </div>
                <div className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] bg-white/20 dark:bg-black/20 backdrop-blur border border-zinc-300/30 dark:border-white/10 text-zinc-700 dark:text-white/70">
                  <div className="w-1 h-1 rounded-full mr-1 bg-[#A8D5BA]"></div>
                  TypeScript
                </div>
              </div>
            </div>
          ) : (
            // Versión desktop original sin cambios
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center max-w-6xl mx-auto">
              {/* Columna izquierda - Terminal/Editor de código con pasos de instalación */}
              <div className="relative flex flex-col w-full order-2 md:order-1">
                {/* Tag superior con texto y numeración */}
                <motion.div
                  className="mb-3 z-30 pl-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#EAA879]/10 to-[#B3AEF5]/10 dark:from-[#EAA879]/20 dark:to-[#B3AEF5]/20 text-zinc-800 dark:text-white/70 backdrop-blur-sm border border-zinc-300/30 dark:border-white/10">
                      Paso {activeSection + 1}/{sections.length}
                    </span>
                    <span className="hidden xs:inline-block text-xs uppercase tracking-wider text-zinc-500 dark:text-white/60">
                      Tutorial StofliUI
                    </span>
                  </div>
                </motion.div>

                {/* Contenedor del terminal/editor de código */}
                <div className="relative h-[350px] xs:h-[400px] md:h-[520px] rounded-2xl overflow-hidden bg-white/90 dark:bg-black/95 border border-zinc-200 dark:border-white/10 shadow-lg dark:shadow-2xl group">
                  {/* Efecto de brillo en las esquinas */}
                  <div
                    className="absolute -inset-0 opacity-10 group-hover:opacity-20 dark:opacity-20 dark:group-hover:opacity-40 duration-500 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at top left, ${sections[activeSection].lightColor}, transparent 40%) var(--tw-gradient-from-position), 
                                  radial-gradient(circle at bottom right, #D89966, transparent 40%) var(--tw-gradient-to-position)`,
                      backgroundImage: `radial-gradient(circle at top left, ${sections[activeSection].lightColor}, transparent 40%), 
                                   radial-gradient(circle at bottom right, #D89966, transparent 40%)`,
                    }}
                  ></div>

                  {/* Barra superior estilo código */}
                  <div className="sticky top-0 left-0 right-0 flex items-center gap-2 z-30 px-3 py-3 bg-zinc-100 dark:bg-black border-b border-zinc-200 dark:border-zinc-800/80">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="text-xs text-zinc-700 dark:text-white/70 bg-zinc-200/80 dark:bg-zinc-800/50 backdrop-blur-md rounded-md px-2 py-1 flex-1 text-center border border-zinc-300/50 dark:border-white/5 ml-2 truncate">
                      {sections[activeSection].id === "install"
                        ? "terminal"
                        : `${sections[activeSection].id}.tsx`}
                    </div>
                  </div>

                  {/* Área de contenido del código con efecto de terminal */}
                  <div className="p-2 xs:p-4 h-[calc(100%-40px)] overflow-auto custom-scrollbar">
                    {/* Imagen de fondo sutil */}
                    <div className="absolute inset-0 opacity-5 z-0">
                      <Image
                        src={sections[activeSection].image}
                        alt="background"
                        className="object-cover object-center blur-sm"
                        fill
                      />
                    </div>

                    {/* Patrón de grid sutil */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    {/* Contenidos de código para cada sección */}
                    {sections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        className="relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: activeSection === index ? 1 : 0,
                          y: activeSection === index ? 0 : 20,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                          display: activeSection === index ? "block" : "none",
                        }}
                      >
                        {/* Título con prompt de terminal en casos de instalación */}
                        {section.id === "install" && (
                          <div className="flex items-center mb-3 font-mono text-green-600 dark:text-green-400">
                            <span className="text-zinc-500 dark:text-white/70">
                              $
                            </span>
                            <span className="ml-2">StofliUI ~</span>
                          </div>
                        )}

                        {/* Bloques de código con sintaxis coloreada */}
                        <pre className="font-mono text-xs xs:text-sm text-zinc-800 dark:text-white/90 whitespace-pre-wrap rounded p-1 xs:p-2 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-sm overflow-auto max-h-[250px] xs:max-h-[400px]">
                          <code>
                            {formatCode(section.codeExample).map((line, i) => (
                              <div
                                key={i}
                                className="mb-1 pl-2 xs:pl-4 border-l-2 border-zinc-300 dark:border-zinc-700/50"
                              >
                                {line}
                              </div>
                            ))}
                          </code>
                        </pre>

                        {/* Descripción debajo del código */}
                        <div className="mt-4 text-xs xs:text-sm text-zinc-600 dark:text-zinc-400">
                          <p>{section.description}</p>
                        </div>

                        {/* Ejemplo de salida o resultado */}
                        {(section.id === "use" ||
                          section.id === "customize") && (
                          <div className="mt-4 p-2 xs:p-3 border border-green-500/20 rounded bg-green-50/30 dark:bg-green-500/10">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-xs text-green-600 dark:text-green-500">
                                Resultado Exitoso
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Indicadores de paso en la parte inferior */}
                  <div className="absolute bottom-3 right-3 z-40 flex gap-1.5">
                    {sections.map((section, index) => (
                      <div
                        key={`indicator-${section.id}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          activeSection === index
                            ? "bg-zinc-800 dark:bg-white w-3"
                            : "bg-zinc-400/60 dark:bg-white/40"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Etiquetas informativas sobre el tutorial */}
                <div className="mt-3 xs:mt-5 pl-1 flex flex-wrap gap-1.5 xs:gap-2">
                  <div className="inline-flex items-center rounded-full px-2 py-0.5 xs:px-2.5 xs:py-1 text-[10px] xs:text-xs bg-white/50 dark:bg-black/20 backdrop-blur border border-zinc-300/30 dark:border-white/10 text-zinc-700 dark:text-white/70 hover:bg-white/70 hover:text-zinc-900 dark:hover:bg-black/40 dark:hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full mr-1 xs:mr-1.5 bg-[#B3AEF5]"></div>
                    Tiempo: 5 min
                  </div>
                  <div className="inline-flex items-center rounded-full px-2 py-0.5 xs:px-2.5 xs:py-1 text-[10px] xs:text-xs bg-white/50 dark:bg-black/20 backdrop-blur border border-zinc-300/30 dark:border-white/10 text-zinc-700 dark:text-white/70 hover:bg-white/70 hover:text-zinc-900 dark:hover:bg-black/40 dark:hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full mr-1 xs:mr-1.5 bg-[#EAA879]"></div>
                    React/Next
                  </div>
                  <div className="inline-flex items-center rounded-full px-2 py-0.5 xs:px-2.5 xs:py-1 text-[10px] xs:text-xs bg-white/50 dark:bg-black/20 backdrop-blur border border-zinc-300/30 dark:border-white/10 text-zinc-700 dark:text-white/70 hover:bg-white/70 hover:text-zinc-900 dark:hover:bg-black/40 dark:hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full mr-1 xs:mr-1.5 bg-[#A8D5BA]"></div>
                    TypeScript
                  </div>
                </div>
              </div>

              {/* Columna derecha - Barra de progreso y secciones */}
              <div className="relative w-full order-1 md:order-2">
                {/* Barra de progreso vertical */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-300 dark:bg-zinc-800/40 rounded-full">
                  <motion.div
                    className="absolute left-0 top-0 w-full rounded-full"
                    style={{
                      height: `${scrollProgress * 100}%`,
                      background: `linear-gradient(to bottom, ${
                        sections[activeSection]?.lightColor || "#9F91F2"
                      }, #D89966)`,
                    }}
                  />
                </div>

                {/* Secciones de contenido en estilo moderno */}
                <div className="pl-6 xs:pl-8 space-y-8 md:space-y-12">
                  {sections.map((section, index) => {
                    const isActive = activeSection === index;
                    return (
                      <div
                        key={section.id}
                        ref={(el) => setSectionRef(el, index)}
                        className={`transition-all duration-500 ${
                          isActive ? "" : "opacity-60 dark:opacity-50"
                        }`}
                      >
                        <div className="relative">
                          {/* Punto indicador en la barra */}
                          <div
                            className={`absolute left-0 w-3 h-3 md:w-4 md:h-4 rounded-full -translate-x-1/2 transition-all duration-500 z-10`}
                            style={{
                              top: "50%",
                              transform: "translateY(-50%) translateX(-50%)",
                              backgroundColor: isActive
                                ? section.lightColor
                                : "#d1d5db",
                              border: `2px solid ${
                                isActive ? "white" : "transparent"
                              }`,
                              boxShadow: isActive
                                ? `0 0 15px ${section.lightColor}`
                                : "none",
                            }}
                          />

                          {/* Contenedor del título y descripción con efecto de tarjeta */}
                          <div
                            className={`
                              relative pl-4 xs:pl-6 py-3 xs:py-4 pr-4 xs:pr-6 rounded-lg transition-all duration-500
                              ${
                                isActive
                                  ? "bg-gradient-to-r from-white/80 to-zinc-100/80 dark:from-black/60 dark:to-zinc-900/60 backdrop-blur-sm border border-zinc-200 dark:border-white/10 shadow-md dark:shadow-xl"
                                  : "bg-transparent border-l-2 border-zinc-300/50 dark:border-zinc-800/20"
                              }
                            `}
                          >
                            {/* Efecto de brillo en el borde cuando está activo */}
                            {isActive && (
                              <div
                                className="absolute inset-0 rounded-lg opacity-10 dark:opacity-20 blur-sm"
                                style={{
                                  background: `linear-gradient(135deg, transparent 40%, ${section.lightColor})`,
                                }}
                              />
                            )}

                            <div className="relative z-10">
                              <h3
                                className={`text-base xs:text-lg md:text-xl font-bold mb-1 xs:mb-2 transition-all duration-500 ${
                                  isActive
                                    ? "text-zinc-900 dark:text-white"
                                    : "text-zinc-600 dark:text-zinc-400"
                                }`}
                                style={{
                                  textShadow: isActive
                                    ? "0 0 20px rgba(0,0,0,0.05)"
                                    : "none",
                                }}
                              >
                                {section.title}
                              </h3>

                              {/* Descripción que solo aparece cuando está activa */}
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: isActive ? "auto" : 0,
                                  opacity: isActive ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs xs:text-sm text-zinc-700 dark:text-zinc-300 mt-1 xs:mt-2">
                                  {section.description}
                                </p>

                                {/* Línea de "Ver documentación" */}
                                {isActive && (
                                  <div className="flex items-center mt-2 xs:mt-3">
                                    <a
                                      href="/docs/"
                                      className="flex items-center text-[10px] xs:text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                    >
                                      <span>Ver documentación</span>
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1"
                                      >
                                        <path
                                          d="M6 12L10 8L6 4"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </a>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScrollProgressSection;
