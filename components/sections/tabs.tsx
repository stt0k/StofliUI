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
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  // Actualizar la posición del indicador cuando cambia la pestaña activa o hover
  useEffect(() => {
    const tabIndex = hoverEffect && hoverTab !== null ? hoverTab : activeTab;
    if (tabsRef.current[tabIndex]) {
      const tabElement = tabsRef.current[tabIndex];
      setIndicatorStyle({
        left: tabElement?.offsetLeft || 0,
        width: tabElement?.offsetWidth || 0,
      });
    }
  }, [activeTab, hoverTab, hoverEffect]);

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

  return (
    <div
      className={`${className} ${
        fullWidth ? "w-full" : "inline-flex flex-col"
      }`}
    >
      <div
        className={`flex relative p-1 bg-zinc-100/60 dark:bg-zinc-800/20 backdrop-blur-sm ${
          radiusClasses[radius]
        } ${fullWidth ? "w-full" : "inline-flex"}`}
      >
        {/* Indicador de la pestaña activa */}
        <motion.div
          className={`absolute ${radiusClasses[radius]} z-0 ${indicatorBgClasses[variant]} shadow-sm`}
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{
            top: 4,
            bottom: 4,
            height: "calc(100% - 8px)",
          }}
        />

        {/* Pestañas */}
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            onClick={() => setActiveTab(index)}
            onMouseEnter={() => hoverEffect && setHoverTab(index)}
            onMouseLeave={() => hoverEffect && setHoverTab(null)}
            className={`
              relative z-10 font-medium whitespace-nowrap
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
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      <div
        className={`mt-4 relative ${
          fullWidth ? "w-full" : "min-w-full"
        } ${contentClassName}`}
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
