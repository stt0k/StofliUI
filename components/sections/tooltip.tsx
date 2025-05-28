"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  delay?: number;
  maxWidth?: string;
  showArrow?: boolean;
  className?: string;
  tooltipClassName?: string;
  contentClassName?: string;
  arrowClassName?: string;
  radius?: "none" | "sm" | "md" | "full";
  id?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  variant = "default",
  delay = 300,
  maxWidth = "200px",
  showArrow = false,
  className = "",
  tooltipClassName = "",
  contentClassName = "",
  arrowClassName = "",
  radius = "md",
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  
  const uniqueIdBase = useId();
  const tooltipId = id || `tooltip-${uniqueIdBase.replace(/:/g, "")}`;

  // Calcular posición
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const gap = showArrow ? 8 : 4; // Espacio reducido cuando no hay flecha

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        top = triggerRect.top - tooltipRect.height - gap;
        break;
      case "right":
        left = triggerRect.right + gap;
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "bottom":
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        top = triggerRect.bottom + gap;
        break;
      case "left":
        left = triggerRect.left - tooltipRect.width - gap;
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Ajustar posición para que no se salga de la pantalla
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 10) left = 10;
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }

    if (top < 10) top = 10;
    if (top + tooltipRect.height > viewportHeight - 10) {
      top = viewportHeight - tooltipRect.height - 10;
    }

    setTooltipPosition({ top, left });
  }, [position, showArrow]);

  // Función para mostrar y ocultar tooltip
  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  // Actualizar visibilidad basada en hover y focus (pero no cuando hacemos clic)
  useEffect(() => {
    // Solo mostrar si tenemos hover o focus (pero no mouseDown que indica click)
    if ((isHovered || (isFocused && !mouseDown))) {
      showTooltip();
    } else {
      hideTooltip();
    }
  }, [isHovered, isFocused, mouseDown, showTooltip, hideTooltip]);

  // Manejadores de eventos
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Para soporte de teclado (WCAG)
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setMouseDown(false);
  };
  
  // Detectar clicks para ocultar el tooltip
  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => {
    // Pequeño retraso antes de restaurar para asegurar que el tooltip se oculta en click
    setTimeout(() => setMouseDown(false), 300);
  };
  
  // Manejar escape para cerrar el tooltip (accesibilidad)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isVisible) {
      hideTooltip();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) calculatePosition();
    };

    const handleResize = () => {
      if (isVisible) calculatePosition();
    };

    if (isVisible) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible, calculatePosition]);

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => calculatePosition());
    }
  }, [isVisible, calculatePosition]);

  const variantClasses = {
    default: "bg-zinc-800 text-zinc-100 dark:bg-zinc-700",
    primary: "bg-blue-500 text-white dark:bg-blue-600",
    secondary: "bg-purple-500 text-white dark:bg-purple-600",
    success: "bg-green-500 text-white dark:bg-green-600",
    warning: "bg-amber-500 text-white dark:bg-amber-600",
    danger: "bg-red-500 text-white dark:bg-red-600",
  };

  const arrowVariantClasses = {
    default: "after:border-zinc-800 dark:after:border-zinc-700",
    primary: "after:border-blue-500 dark:after:border-blue-600",
    secondary: "after:border-purple-500 dark:after:border-purple-600",
    success: "after:border-green-500 dark:after:border-green-600",
    warning: "after:border-amber-500 dark:after:border-amber-600",
    danger: "after:border-red-500 dark:after:border-red-600",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-[0.25rem]",
    md: "rounded-[0.375rem]",
    full: "rounded-full",
  };

  // Animaciones adaptadas para prefers-reduced-motion
  const variants = {
    hidden: (position: string) => {
      switch (position) {
        case "top":
          return { opacity: 0, y: -10 };
        case "right":
          return { opacity: 0, x: 10 };
        case "bottom":
          return { opacity: 0, y: 10 };
        case "left":
          return { opacity: 0, x: -10 };
        default:
          return { opacity: 0, y: -10 };
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: (position: string) => {
      switch (position) {
        case "top":
          return { opacity: 0, y: -5, transition: { duration: 0.1 } };
        case "right":
          return { opacity: 0, x: 5, transition: { duration: 0.1 } };
        case "bottom":
          return { opacity: 0, y: 5, transition: { duration: 0.1 } };
        case "left":
          return { opacity: 0, x: -5, transition: { duration: 0.1 } };
        default:
          return { opacity: 0, y: -5, transition: { duration: 0.1 } };
      }
    },
  };

  const getArrowPosition = () => {
    switch (position) {
      case "top":
        return "after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:rotate-45 after:border-b after:border-r";
      case "right":
        return "after:left-[-4px] after:top-1/2 after:transform after:-translate-y-1/2 after:-rotate-45 after:border-l after:border-b";
      case "bottom":
        return "after:top-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:-rotate-135 after:border-t after:border-l";
      case "left":
        return "after:right-[-4px] after:top-1/2 after:transform after:-translate-y-1/2 after:rotate-45 after:border-t after:border-r";
      default:
        return "";
    }
  };

  // Determinar si el children es un elemento que puede recibir propiedades
  const childrenWithProps = React.Children.map(children, (child) => {
    // Verificar si es un elemento válido de React para pasar props
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // Agregar o fusionar atributos aria
        "aria-describedby": isVisible ? tooltipId : undefined,
        // Preservar otros props que pueda tener el elemento
        ...child.props,
      });
    }
    return child;
  });

  return (
    <div
      ref={triggerRef}
      className={cn("inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
    >
      {childrenWithProps}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              "fixed z-50 px-3 py-2 text-sm shadow-lg pointer-events-none",
              radiusClasses[radius],
              variantClasses[variant],
              showArrow && arrowVariantClasses[variant],
              showArrow &&
                `
                after:absolute 
                after:w-2 after:h-2 
                after:bg-inherit 
                after:border-[1px]
                ${getArrowPosition()}
                ${arrowClassName}
              `,
              tooltipClassName
            )}
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
              maxWidth: maxWidth,
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            custom={position}
          >
            <div className={cn("", contentClassName)}>{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
