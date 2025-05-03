"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  defaultTab?: number;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "full";
  fullWidth?: boolean;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  hoverEffect?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab = 0,
  variant = "default",
  size = "md",
  radius = "md",
  fullWidth = false,
  className = "",
  tabClassName = "",
  contentClassName = "",
  hoverEffect = false,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [hoverTab, setHoverTab] = useState<number | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  // Referencia para el contenedor de pestañas
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  // Actualizar la posición del indicador cuando cambia la pestaña activa o hover
  useEffect(() => {
    const tabIndex = hoverEffect && hoverTab !== null ? hoverTab : activeTab;
    if (tabsRef.current[tabIndex]) {
      const tabElement = tabsRef.current[tabIndex];
      const container = scrollContainerRef.current;

      if (container) {
        // Calcular la posición relativa al contenedor visible
        setIndicatorStyle({
          left: tabElement.offsetLeft,
          width: tabElement.offsetWidth,
        });
      }
    }
  }, [activeTab, hoverTab, hoverEffect]);

  // Manejar el desplazamiento cuando cambia la pestaña activa
  useEffect(() => {
    if (!tabsRef.current[activeTab] || !scrollContainerRef.current) return;

    const tabElement = tabsRef.current[activeTab];
    const container = scrollContainerRef.current;
    const tabLeft = tabElement.offsetLeft;
    const tabWidth = tabElement.offsetWidth;
    const containerWidth = container.offsetWidth;
    const containerScrollLeft = container.scrollLeft;
    const containerScrollRight = containerScrollLeft + containerWidth;

    // Verificar si el tab necesita desplazamiento
    const needsScroll =
      tabLeft + tabWidth > containerScrollRight ||
      tabLeft < containerScrollLeft;

    if (needsScroll) {
      // Si el tab está parcial o totalmente fuera de la vista por la derecha
      if (tabLeft + tabWidth > containerScrollRight) {
        // Scroll para mostrar el tab en el lado derecho
        container.scrollTo({
          left: tabLeft - containerWidth + tabWidth,
          behavior: "smooth",
        });
      }
      // Si el tab está parcial o totalmente fuera de la vista por la izquierda
      else if (tabLeft < containerScrollLeft) {
        // Scroll para mostrar el tab en el lado izquierdo
        container.scrollTo({
          left: tabLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  const variantClasses = {
    default:
      "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
    primary:
      "bg-transparent text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    secondary:
      "bg-transparent text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300",
    success:
      "bg-transparent text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300",
    warning:
      "bg-transparent text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300",
    danger:
      "bg-transparent text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300",
  };

  const activeVariantClasses = {
    default: "text-zinc-900 dark:text-zinc-100",
    primary: "text-blue-700 dark:text-blue-300",
    secondary: "text-purple-700 dark:text-purple-300",
    success: "text-green-700 dark:text-green-300",
    warning: "text-amber-700 dark:text-amber-300",
    danger: "text-red-700 dark:text-red-300",
  };

  const indicatorBgClasses = {
    default: "bg-zinc-200/80 dark:bg-zinc-700/80",
    primary: "bg-blue-100/80 dark:bg-blue-900/30",
    secondary: "bg-purple-100/80 dark:bg-purple-900/30",
    success: "bg-green-100/80 dark:bg-green-900/30",
    warning: "bg-amber-100/80 dark:bg-amber-900/30",
    danger: "bg-red-100/80 dark:bg-red-900/30",
  };

  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={`${className} flex flex-col w-full`}>
      {/* Contenedor de los tabs con ancho adaptativo */}
      <div className="w-full flex">
        <div
          className={`relative p-1 bg-zinc-100/60 dark:bg-zinc-800/20 backdrop-blur-sm ${
            radiusClasses[radius]
          } overflow-hidden ${fullWidth ? "w-full" : "inline-block"}`}
        >
          {/* Contenedor con scroll horizontal */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {/* Contenedor para las pestañas */}
            <div
              ref={tabsContainerRef}
              className={`flex ${fullWidth ? "w-full" : "min-w-max"} relative`}
            >
              {/* Indicador de la pestaña activa/hover */}
              <motion.div
                className={`absolute ${radiusClasses[radius]} z-0 ${indicatorBgClasses[variant]} shadow-sm`}
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 26,
                }}
                style={{
                  top: 0,
                  bottom: 0,
                  height: "100%",
                }}
              />

              {/* Pestañas */}
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  onClick={() => handleTabClick(index)}
                  onMouseEnter={() => hoverEffect && setHoverTab(index)}
                  onMouseLeave={() => hoverEffect && setHoverTab(null)}
                  className={`
                    relative z-10 font-medium whitespace-nowrap flex-shrink-0
                    ${sizeClasses[size]}
                    ${fullWidth ? "flex-1" : ""}
                    ${radiusClasses[radius]}
                    ${
                      activeTab === index
                        ? activeVariantClasses[variant]
                        : variantClasses[variant]
                    }
                    transition-colors duration-200
                    flex items-center justify-center gap-2
                    ${tabClassName}
                  `}
                >
                  {tab.icon && (
                    <span className="flex-shrink-0">{tab.icon}</span>
                  )}
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de las pestañas separado completamente */}
      <div
        className={`mt-4 relative w-full overflow-hidden ${contentClassName}`}
      >
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab, index) =>
              activeTab === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                  className="w-full"
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
