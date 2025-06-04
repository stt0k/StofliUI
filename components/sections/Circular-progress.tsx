"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CircularProgressProps {
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
  thickness?: number;
  label?: string;
  labelPosition?: "top" | "bottom";
  className?: string;
  circleClassName?: string;
  bgCircleClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  animate?: boolean;
  spin?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-valuetext"?: string;
  indeterminate?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  max = 100,
  size = "md",
  variant = "default",
  showValue = false,
  thickness = 3,
  label,
  labelPosition = "top",
  className = "",
  circleClassName = "",
  bgCircleClassName = "",
  valueClassName = "",
  labelClassName = "",
  animate = true,
  spin = false,
  formatOptions = { style: "percent", maximumFractionDigits: 0 },
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  "aria-valuetext": ariaValuetext,
  indeterminate = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const uniqueIdBase = useId();
  const progressId = `circular-progress-${uniqueIdBase.replace(/:/g, "")}`;
  const labelId = `${progressId}-label`;
  const valueId = `${progressId}-value`;

  // Ajustamos el radio según el tamaño para mantener proporciones perfectas
  const sizes = {
    sm: { box: 32, radius: 12, fontSize: "text-[8px]", labelSize: "text-xs" },
    md: { box: 48, radius: 18, fontSize: "text-[10px]", labelSize: "text-sm" },
    lg: { box: 64, radius: 24, fontSize: "text-xs", labelSize: "text-sm" },
  };

  const { box, radius, fontSize, labelSize } = sizes[size];
  const center = box / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const variantClasses = {
    default: "stroke-zinc-600/80 dark:stroke-zinc-400/80",
    primary: "stroke-blue-500/80 dark:stroke-blue-400/80",
    secondary: "stroke-purple-500/80 dark:stroke-purple-400/80",
    success: "stroke-green-500/80 dark:stroke-green-400/80",
    warning: "stroke-amber-500/80 dark:stroke-amber-400/80",
    danger: "stroke-red-500/80 dark:stroke-red-400/80",
  };

  const bgVariantClasses = {
    default: "stroke-zinc-200/20 dark:stroke-zinc-700/20",
    primary: "stroke-blue-200/20 dark:stroke-blue-700/20",
    secondary: "stroke-purple-200/20 dark:stroke-purple-700/20",
    success: "stroke-green-200/20 dark:stroke-green-700/20",
    warning: "stroke-amber-200/20 dark:stroke-amber-700/20",
    danger: "stroke-red-200/20 dark:stroke-red-700/20",
  };

  const formattedValue = new Intl.NumberFormat(undefined, formatOptions).format(
    percentage / 100
  );

  // Configuración de la animación de rotación
  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const labelElement = label && (
    <span
      id={labelId}
      className={cn(
        "absolute",
        labelPosition === "top" ? "-top-6" : "-bottom-6",
        "left-1/2 -translate-x-1/2",
        labelSize,
        "font-medium dark:text-neutral-400 text-neutral-600 whitespace-nowrap",
        "min-contrast-[4.5]", // Asegura contraste mínimo WCAG AA
        labelClassName
      )}
    >
      {label}
    </span>
  );

  // Texto descriptivo para lectores de pantalla
  const getAriaValueText = () => {
    if (ariaValuetext) return ariaValuetext;
    if (indeterminate) return "Cargando...";
    return `${formattedValue} completado`;
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuetext={getAriaValueText()}
      aria-label={ariaLabel || label}
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={cn(showValue ? valueId : null, ariaDescribedby)}
      id={progressId}
    >
      {labelPosition === "top" && labelElement}
      <motion.svg
        className="w-full h-full"
        viewBox={`0 0 ${box} ${box}`}
        style={{ transform: "rotate(-90deg)" }}
        animate={spin || indeterminate ? "animate" : undefined}
        variants={spinVariants}
        aria-hidden="true"
      >
        {spin || indeterminate ? (
          <>
            <circle
              className={cn(
                bgVariantClasses[variant],
                "transition-colors",
                bgCircleClassName
              )}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={thickness}
            />
            <circle
              className={cn(
                variantClasses[variant],
                "transition-colors",
                circleClassName
              )}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.25} ${
                circumference * 0.75
              }`}
            />
          </>
        ) : (
          <>
            <circle
              className={cn(
                bgVariantClasses[variant],
                "transition-colors",
                bgCircleClassName
              )}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={thickness}
            />
            <motion.circle
              className={cn(
                variantClasses[variant],
                "transition-colors",
                circleClassName
              )}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeLinecap="round"
              initial={
                animate
                  ? { strokeDashoffset: circumference }
                  : { strokeDashoffset }
              }
              animate={{ strokeDashoffset }}
              transition={{
                duration: animate ? 0.8 : 0,
                ease: "easeOut",
              }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </>
        )}
      </motion.svg>
      {showValue && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          id={valueId}
          aria-hidden="true"
        >
          <span
            className={cn(
              fontSize,
              "font-medium dark:text-neutral-300 text-neutral-700",
              "min-contrast-[4.5]", // Asegura contraste mínimo WCAG AA
              valueClassName
            )}
          >
            {formattedValue}
          </span>
        </div>
      )}
      {labelPosition === "bottom" && labelElement}
    </div>
  );
};

export default CircularProgress;
