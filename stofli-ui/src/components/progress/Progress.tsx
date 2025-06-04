"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  showValue?: boolean;
  animate?: boolean;
  label?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  progressBarClassName?: string;
  radius?: "none" | "sm" | "md" | "full";
  striped?: boolean;
  indeterminate?: boolean;
  description?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  valueText?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  size = "md",
  variant = "default",
  showValue = false,
  animate = true,
  label,
  className = "",
  containerClassName = "",
  labelClassName = "",
  valueClassName = "",
  progressBarClassName = "",
  radius = "md",
  striped = false,
  indeterminate = false,
  description,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  id,
  valueText,
}) => {
  const percentage = indeterminate
    ? null
    : Math.min(100, Math.max(0, (value / max) * 100));
  const [announcement, setAnnouncement] = useState<string>("");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const uniqueIdBase = useId();
  const uniqueId = `progress-${uniqueIdBase.replace(/:/g, "")}`;
  const progressId = id || uniqueId;
  const labelId = `${progressId}-label`;
  const descriptionId = `${progressId}-description`;
  const valueId = `${progressId}-value`;

  // Anunciar cambios significativos en el valor
  useEffect(() => {
    if (
      prevValue !== null &&
      percentage !== null &&
      Math.abs(percentage - prevValue) >= 10
    ) {
      // Sólo anunciar cuando hay un cambio significativo (10% o más)
      if (valueText) {
        setAnnouncement(valueText);
      } else {
        setAnnouncement(`Progreso: ${percentage.toFixed(0)} por ciento`);
      }
    }
    setPrevValue(percentage === null ? null : percentage);
  }, [percentage, prevValue, valueText]);

  // Limpiar anuncios después de ser leídos
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  const sizeClasses = {
    sm: "h-1 min-h-[4px]",
    md: "h-2 min-h-[8px]",
    lg: "h-3 min-h-[12px]",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const variantClasses = {
    default: "bg-zinc-600 dark:bg-zinc-400",
    primary: "bg-blue-500 dark:bg-blue-400",
    secondary: "bg-purple-500 dark:bg-purple-400",
    success: "bg-green-500 dark:bg-green-400",
    warning: "bg-amber-500 dark:bg-amber-400",
    danger: "bg-red-500 dark:bg-red-400",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-[0.25rem]",
    md: "rounded-[0.375rem]",
    full: "rounded-full",
  };

  const stripedStyle = striped
    ? {
        backgroundImage:
          "linear-gradient(45deg, rgba(255,255,255,0.5) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.5) 75%, transparent 75%, transparent)",
        backgroundSize: "1rem 1rem",
        animation: "progress-stripes 1s linear infinite",
      }
    : {};

  const indeterminateAnimation = indeterminate
    ? {
        width: "50%",
        left: "-50%",
        animation:
          "indeterminate-progress 1.5s infinite cubic-bezier(0.65, 0.815, 0.735, 0.395)",
      }
    : {};

  // Determinar las descripciones accesibles
  const getAriaDescribedby = () => {
    const ids = [];
    if (description) ids.push(descriptionId);
    if (ariaDescribedby) ids.push(ariaDescribedby);
    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  // Determinar role y estados ARIA
  const getAriaProps = () => {
    if (indeterminate) {
      return {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-busy": true,
        "aria-valuetext": valueText || "Cargando...",
      };
    } else {
      return {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-valuetext": valueText || `${percentage?.toFixed(0)} por ciento`,
      };
    }
  };

  // Definir los keyframes como una constante en lugar de usar style jsx
  const animationKeyframes = `
    @keyframes progress-stripes {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 1rem 0;
      }
    }
    
    @keyframes indeterminate-progress {
      0% {
        left: -50%;
      }
      100% {
        left: 100%;
      }
    }
  `;

  return (
    <div
      id={progressId}
      className={cn("w-full", containerClassName)}
      aria-label={ariaLabel || label || "Barra de progreso"}
      aria-labelledby={label ? labelId : ariaLabelledby}
      aria-describedby={getAriaDescribedby()}
    >
      {/* Agregar el estilo para las animaciones */}
      <style>{animationKeyframes}</style>

      {/* Región live para anuncios de accesibilidad */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      {/* Descripción accesible si existe */}
      {description && (
        <div id={descriptionId} className="sr-only">
          {description}
        </div>
      )}

      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span
              id={labelId}
              className={cn(
                labelSizeClasses[size],
                "font-medium dark:text-neutral-200 text-neutral-800",
                labelClassName
              )}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              id={valueId}
              className={cn(
                labelSizeClasses[size],
                "dark:text-neutral-400 text-neutral-600",
                valueClassName
              )}
            >
              {percentage !== null ? `${percentage.toFixed(0)}%` : ""}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden relative",
          radiusClasses[radius],
          sizeClasses[size],
          className
        )}
        {...getAriaProps()}
      >
        {indeterminate ? (
          <motion.div
            className={cn(
              "h-full absolute",
              variantClasses[variant],
              radiusClasses[radius],
              progressBarClassName
            )}
            style={{
              ...stripedStyle,
              ...indeterminateAnimation,
            }}
          />
        ) : (
          <motion.div
            className={cn(
              "h-full",
              variantClasses[variant],
              radiusClasses[radius],
              progressBarClassName
            )}
            initial={animate ? { width: 0 } : { width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{
              duration: animate ? 0.5 : 0,
              ease: "easeOut",
            }}
            style={stripedStyle}
          />
        )}
      </div>
    </div>
  );
};

export default Progress;
