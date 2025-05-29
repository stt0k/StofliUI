"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  label?: string;
  labelPosition?: "left" | "right";
  required?: boolean;
  name?: string;
  className?: string;
  circleClassName?: string;
  activeCircleClassName?: string;
  inactiveCircleClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  activeWrapperClassName?: string;
  inactiveWrapperClassName?: string;
  iconClassName?: string;
  id?: string;
  icon?: boolean;
  iconType?: "check" | "cross" | "none";
  ariaLabel?: string;
  description?: string;
  descriptionId?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  label,
  labelPosition = "right",
  required = false,
  name,
  className = "",
  circleClassName = "",
  activeCircleClassName = "",
  inactiveCircleClassName = "",
  labelClassName = "",
  wrapperClassName = "",
  activeWrapperClassName = "",
  inactiveWrapperClassName = "",
  iconClassName = "",
  id,
  icon = false,
  iconType = "check",
  ariaLabel,
  description,
  descriptionId,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const uniqueIdBase = useId();
  const uniqueId = id || `switch-${uniqueIdBase.replace(/:/g, "")}`;
  const uniqueDescriptionId = descriptionId || (description ? `desc-${uniqueId}` : undefined);

  // Sincronizar con el prop checked
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // Definiciones de tamaño
  const sizeClasses = {
    sm: {
      wrapper: "h-4 w-7",
      circle: "h-3 w-3",
      iconSize: "h-2 w-2",
      label: "text-sm",
    },
    md: {
      wrapper: "h-5 w-10",
      circle: "h-4 w-4",
      iconSize: "h-2.5 w-2.5",
      label: "text-base",
    },
    lg: {
      wrapper: "h-7 w-14",
      circle: "h-6 w-6",
      iconSize: "h-3.5 w-3.5",
      label: "text-lg",
    },
  };

  // Clases para los colores según la variante
  const variantClasses = {
    default: {
      bg: "bg-zinc-200 dark:bg-zinc-800",
      activeBg: "bg-zinc-600 dark:bg-zinc-400",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white dark:bg-white",
      icon: "text-zinc-700 dark:text-zinc-800",
      hover: "hover:border-zinc-300 dark:hover:border-zinc-600",
      activeHover: "hover:bg-zinc-700 dark:hover:bg-zinc-500",
      label: "text-zinc-700 dark:text-zinc-300",
    },
    primary: {
      bg: "bg-blue-200 dark:bg-blue-950",
      activeBg: "bg-blue-500 dark:bg-blue-500",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white dark:bg-white",
      icon: "text-blue-600 dark:text-blue-600",
      hover: "hover:border-blue-300 dark:hover:border-blue-700",
      activeHover: "hover:bg-blue-600 dark:hover:bg-blue-600",
      label: "text-blue-600 dark:text-blue-300",
    },
    secondary: {
      bg: "bg-purple-200 dark:bg-purple-950",
      activeBg: "bg-purple-500 dark:bg-purple-500",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white dark:bg-white",
      icon: "text-purple-600 dark:text-purple-600",
      hover: "hover:border-purple-300 dark:hover:border-purple-700",
      activeHover: "hover:bg-purple-600 dark:hover:bg-purple-600",
      label: "text-purple-600 dark:text-purple-300",
    },
    success: {
      bg: "bg-green-200 dark:bg-green-950",
      activeBg: "bg-green-500 dark:bg-green-500",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white dark:bg-white",
      icon: "text-green-600 dark:text-green-600",
      hover: "hover:border-green-300 dark:hover:border-green-700",
      activeHover: "hover:bg-green-600 dark:hover:bg-green-600",
      label: "text-green-600 dark:text-green-300",
    },
    warning: {
      bg: "bg-amber-200 dark:bg-amber-950",
      activeBg: "bg-amber-500 dark:bg-amber-500",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white dark:bg-white",
      icon: "text-amber-600 dark:text-amber-600",
      hover: "hover:border-amber-300 dark:hover:border-amber-700",
      activeHover: "hover:bg-amber-600 dark:hover:bg-amber-600",
      label: "text-amber-600 dark:text-amber-300",
    },
    danger: {
      bg: "bg-red-200 dark:bg-red-950",
      activeBg: "bg-red-500 dark:bg-red-500",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white dark:bg-white",
      icon: "text-red-600 dark:text-red-600",
      hover: "hover:border-red-300 dark:hover:border-red-700",
      activeHover: "hover:bg-red-600 dark:hover:bg-red-600",
      label: "text-red-600 dark:text-red-300",
    },
  };

  const handleChange = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    }
  };

  const renderIcon = () => {
    if (!icon || iconType === "none") return null;

    if (iconType === "check") {
      return (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            sizeClasses[size].iconSize,
            isChecked ? variantClasses[variant].icon : "text-transparent",
            iconClassName
          )}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isChecked ? 1 : 0,
            scale: isChecked ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <polyline points="20 6 9 17 4 12" />
        </motion.svg>
      );
    }

    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          sizeClasses[size].iconSize,
          !isChecked ? variantClasses[variant].icon : "text-transparent",
          iconClassName
        )}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: !isChecked ? 1 : 0,
          scale: !isChecked ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </motion.svg>
    );
  };

  // Añadir clases para el estado de foco visible
  const focusClasses = {
    sm: "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
    md: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
    lg: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
  };

  const focusRingColors = {
    default: "focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400",
    primary: "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
    secondary: "focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400",
    success: "focus-visible:ring-green-500 dark:focus-visible:ring-green-400",
    warning: "focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400",
    danger: "focus-visible:ring-red-500 dark:focus-visible:ring-red-400",
  };

  // Modificar getWrapperClasses para incluir clases de foco
  const getWrapperClasses = () => {
    // Clases base compartidas
    const baseClasses = [
      sizeClasses[size].wrapper,
      "rounded-full",
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      "transition-all duration-300 ease-out relative overflow-hidden",
    ];

    // Determinar clases según el estado
    if (isChecked) {
      // Para estado activo
      if (activeWrapperClassName) {
        // Si hay clases personalizadas para estado activo, reemplazar las predeterminadas
        return cn(...baseClasses, activeWrapperClassName);
      } else {
        // Usar las clases predeterminadas
        return cn(
          ...baseClasses,
          variantClasses[variant].activeBg,
          !disabled && variantClasses[variant].activeHover,
          wrapperClassName
        );
      }
    } else {
      // Para estado inactivo
      if (inactiveWrapperClassName) {
        // Si hay clases personalizadas para estado inactivo, reemplazar las predeterminadas
        return cn(...baseClasses, inactiveWrapperClassName);
      } else {
        // Usar las clases predeterminadas
        return cn(
          ...baseClasses,
          variantClasses[variant].bg,
          !disabled && variantClasses[variant].hover,
          wrapperClassName
        );
      }
    }
  };

  // Determinar las clases para el círculo según el estado
  const getCircleClasses = () => {
    // Clases base compartidas
    const baseClasses = [
      sizeClasses[size].circle,
      "rounded-full shadow-md flex items-center justify-center z-10",
      "absolute top-1/2 transform -translate-y-1/2",
    ];

    // Determinar clases según el estado
    if (isChecked) {
      // Para estado activo
      if (activeCircleClassName) {
        // Si hay clases personalizadas para estado activo del círculo
        return cn(...baseClasses, circleClassName, activeCircleClassName);
      } else {
        // Usar las clases predeterminadas
        return cn(
          ...baseClasses,
          variantClasses[variant].activeCircle,
          circleClassName
        );
      }
    } else {
      // Para estado inactivo
      if (inactiveCircleClassName) {
        // Si hay clases personalizadas para estado inactivo del círculo
        return cn(...baseClasses, circleClassName, inactiveCircleClassName);
      } else {
        // Usar las clases predeterminadas
        return cn(
          ...baseClasses,
          variantClasses[variant].circle,
          circleClassName
        );
      }
    }
  };

  // Calcular las posiciones del círculo según el tamaño
  const getCirclePositions = () => {
    const sizes = {
      sm: { active: "calc(100% - 2px)", inactive: "2px" },
      md: { active: "calc(100% - 2px)", inactive: "2px" },
      lg: { active: "calc(100% - 2px)", inactive: "2px" },
    };

    return {
      left: isChecked ? sizes[size].active : sizes[size].inactive,
      translateX: isChecked ? "-100%" : "0%",
    };
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        labelPosition === "left" ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {label && (
        <label
          htmlFor={uniqueId}
          className={cn(
            sizeClasses[size].label,
            variantClasses[variant].label,
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          "relative inline-flex flex-shrink-0 items-center",
          wrapperClassName
        )}
      >
        <input
          type="checkbox"
          role="switch"
          id={uniqueId}
          name={name}
          className={cn(
            "sr-only peer",
            focusClasses[size],
            focusRingColors[variant]
          )}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-checked={isChecked}
          aria-label={!label ? ariaLabel : undefined}
          aria-labelledby={label ? uniqueId : undefined}
          aria-describedby={uniqueDescriptionId}
        />

        <div 
          className={getWrapperClasses()} 
          onClick={handleChange}
          aria-hidden="true"
        >
          {/* Fondo animado que se desplaza (solo visible si no hay clases personalizadas para el wrapper) */}
          {!activeWrapperClassName && !inactiveWrapperClassName && (
            <motion.div
              className={cn(
                "absolute inset-0",
                variantClasses[variant].activeBg
              )}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isChecked ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              aria-hidden="true"
            />
          )}

          <motion.div
            className={getCircleClasses()}
            initial={false}
            animate={{
              ...getCirclePositions(),
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            aria-hidden="true"
          >
            {renderIcon()}
          </motion.div>
        </div>
      </div>
      
      {description && (
        <div id={uniqueDescriptionId} className="sr-only">
          {description}
        </div>
      )}
    </div>
  );
};

export default Switch;
