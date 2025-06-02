"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  speed?: "slow" | "normal" | "fast";
  type?: "border" | "dots" | "grow" | "wave" | "lines";
  label?: string;
  labelPosition?: "left" | "right" | "top" | "bottom";
  className?: string;
  containerClassName?: string;
  spinnerClassName?: string;
  labelClassName?: string;
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "default",
  speed = "normal",
  type = "border",
  label,
  labelPosition = "right",
  className = "",
  containerClassName = "",
  spinnerClassName = "",
  labelClassName = "",
  ariaLabel,
  ariaLive = "polite",
}) => {
  // Tamaños para spinner tipo border
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  // Tamaños para spinner tipo lines
  const linesSizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  // Tamaños más pequeños para dots
  const dotsSizeClasses = {
    xs: "w-0.5 h-0.5",
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
    xl: "w-2.5 h-2.5",
  };

  // Tamaños más pequeños para grow
  const growSizeClasses = {
    xs: "w-2.5 h-2.5",
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-7 h-7",
    xl: "w-10 h-10",
  };

  // Tamaños más pequeños para wave
  const waveSizeClasses = {
    xs: "w-0.5 h-0.5",
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
    xl: "w-2.5 h-2.5",
  };

  // Grosores para spinner tipo border
  const borderSizeClasses = {
    xs: "border-[1px]",
    sm: "border-[1.5px]",
    md: "border-2",
    lg: "border-3",
    xl: "border-4",
  };

  // Velocidades de animación
  const speedClasses = {
    slow: "animate-spin-slow",
    normal: "animate-spin",
    fast: "animate-spin-fast",
  };

  // Velocidades para wave
  const waveSpeedClasses = {
    slow: {
      first: "animate-wave-slow-1",
      second: "animate-wave-slow-2",
      third: "animate-wave-slow-3",
    },
    normal: {
      first: "animate-wave-1",
      second: "animate-wave-2",
      third: "animate-wave-3",
    },
    fast: {
      first: "animate-wave-fast-1",
      second: "animate-wave-fast-2",
      third: "animate-wave-fast-3",
    },
  };

  // Variantes de color para diferentes tipos
  const variantBorderClasses = {
    default:
      "border-zinc-200 dark:border-zinc-700 border-t-zinc-600 dark:border-t-zinc-300",
    primary:
      "border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400",
    secondary:
      "border-purple-200 dark:border-purple-700 border-t-purple-600 dark:border-t-purple-400",
    success:
      "border-green-200 dark:border-green-700 border-t-green-600 dark:border-t-green-400",
    warning:
      "border-amber-200 dark:border-amber-700 border-t-amber-600 dark:border-t-amber-400",
    danger:
      "border-red-200 dark:border-red-700 border-t-red-600 dark:border-t-red-400",
  };

  const variantGrowClasses = {
    default: "bg-zinc-600 dark:bg-zinc-300",
    primary: "bg-blue-600 dark:bg-blue-400",
    secondary: "bg-purple-600 dark:bg-purple-400",
    success: "bg-green-600 dark:bg-green-400",
    warning: "bg-amber-600 dark:bg-amber-400",
    danger: "bg-red-600 dark:bg-red-400",
  };

  const variantDotsClasses = {
    default: "bg-zinc-600 dark:bg-zinc-300",
    primary: "bg-blue-600 dark:bg-blue-400",
    secondary: "bg-purple-600 dark:bg-purple-400",
    success: "bg-green-600 dark:bg-green-400",
    warning: "bg-amber-600 dark:bg-amber-400",
    danger: "bg-red-600 dark:bg-red-400",
  };

  const variantLinesClasses = {
    default: "stroke-zinc-600 dark:stroke-zinc-300",
    primary: "stroke-blue-600 dark:stroke-blue-400",
    secondary: "stroke-purple-600 dark:stroke-purple-400",
    success: "stroke-green-600 dark:stroke-green-400",
    warning: "stroke-amber-600 dark:stroke-amber-400",
    danger: "stroke-red-600 dark:stroke-red-400",
  };

  // Clases para el texto del label
  const labelClasses = {
    default: "text-neutral-600 dark:text-zinc-300",
    primary: "text-blue-600 dark:text-blue-400",
    secondary: "text-purple-600 dark:text-purple-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-red-600 dark:text-red-400",
  };

  // Clases para el tamaño del label
  const labelSizeClasses = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-base",
  };

  // Espaciado para el label según su posición
  const labelSpacingClasses = {
    left: "mr-2",
    right: "ml-2",
    top: "mb-1",
    bottom: "mt-1",
  };

  // Keyframes y animaciones para CSS
  const dotKeyframes = `
    @keyframes dot-animation-1 {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    @keyframes dot-animation-2 {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    @keyframes dot-animation-3 {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    
    @keyframes grow-animation {
      0% { transform: scale(0); }
      50% { transform: scale(1); }
      100% { transform: scale(0); }
    }
    
    @keyframes wave-animation-1 {
      0% { transform: translateY(0); }
      25% { transform: translateY(-3px); }
      50% { transform: translateY(0); }
      100% { transform: translateY(0); }
    }
    
    @keyframes wave-animation-2 {
      0% { transform: translateY(0); }
      25% { transform: translateY(-3px); }
      50% { transform: translateY(0); }
      100% { transform: translateY(0); }
    }
    
    @keyframes wave-animation-3 {
      0% { transform: translateY(0); }
      25% { transform: translateY(-3px); }
      50% { transform: translateY(0); }
      100% { transform: translateY(0); }
    }
    
   @keyframes lines-opacity {
  0%, 100% { opacity: 0.1; }
  10% { opacity: 0.2; }
  20% { opacity: 0.4; }
  30% { opacity: 0.6; }
  40% { opacity: 0.8; }
  50% { opacity: 1; }
  60% { opacity: 0.8; }
  70% { opacity: 0.6; }
  80% { opacity: 0.4; }
  90% { opacity: 0.2; }
}

/* Nueva animación solo para el brillo de la última línea */
@keyframes line-highlight {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.8); }
}
    
    .animate-spin-slow {
      animation: spin 1.5s linear infinite;
    }
    .animate-spin-fast {
      animation: spin 0.5s linear infinite;
    }
    
    .animate-wave-1 {
      animation: wave-animation-1 1.2s infinite cubic-bezier(0.45, 0, 0.55, 1);
    }
    .animate-wave-2 {
      animation: wave-animation-2 1.2s infinite cubic-bezier(0.45, 0, 0.55, 1);
      animation-delay: 0.2s;
    }
    .animate-wave-3 {
      animation: wave-animation-3 1.2s infinite cubic-bezier(0.45, 0, 0.55, 1);
      animation-delay: 0.4s;
    }
    
    .animate-wave-slow-1 {
      animation: wave-animation-1 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
    }
    .animate-wave-slow-2 {
      animation: wave-animation-2 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
      animation-delay: 0.3s;
    }
    .animate-wave-slow-3 {
      animation: wave-animation-3 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
      animation-delay: 0.6s;
    }
    
    .animate-wave-fast-1 {
      animation: wave-animation-1 0.8s infinite cubic-bezier(0.45, 0, 0.55, 1);
    }
    .animate-wave-fast-2 {
      animation: wave-animation-2 0.8s infinite cubic-bezier(0.45, 0, 0.55, 1);
      animation-delay: 0.1s;
    }
    .animate-wave-fast-3 {
      animation: wave-animation-3 0.8s infinite cubic-bezier(0.45, 0, 0.55, 1);
      animation-delay: 0.2s;
    }
    
    .animate-dot-1 {
      animation: dot-animation-1 1.4s infinite ease-in-out both;
    }
    .animate-dot-2 {
      animation: dot-animation-2 1.4s infinite ease-in-out both;
      animation-delay: 0.16s;
    }
    .animate-dot-3 {
      animation: dot-animation-3 1.4s infinite ease-in-out both;
      animation-delay: 0.32s;
    }
    
    .animate-grow {
      animation: grow-animation 1.8s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    
   /* Animación Normal (1.5s) */
.animate-line-1 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -1.375s; /* Línea 12 original */
}
.animate-line-2 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -1.25s; /* Línea 11 original */
}
.animate-line-3 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -1.125s;
}
.animate-line-4 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -1s;
}
.animate-line-5 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.875s;
}
.animate-line-6 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.75s;
}
.animate-line-7 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.625s;
}
.animate-line-8 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.5s;
}
.animate-line-9 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.375s;
}
.animate-line-10 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.25s;
}
.animate-line-11 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: -0.125s;
}
.animate-line-12 {
  animation: lines-opacity 1.5s infinite linear;
  animation-delay: 0s; /* Línea 1 original */
}

/* Animación Lenta (2s) */
.animate-line-slow-1 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -1.833s;
}
.animate-line-slow-2 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -1.667s;
}
.animate-line-slow-3 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -1.5s;
}
.animate-line-slow-4 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -1.333s;
}
.animate-line-slow-5 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -1.167s;
}
.animate-line-slow-6 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -1s;
}
.animate-line-slow-7 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -0.833s;
}
.animate-line-slow-8 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -0.667s;
}
.animate-line-slow-9 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -0.5s;
}
.animate-line-slow-10 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -0.333s;
}
.animate-line-slow-11 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: -0.167s;
}
.animate-line-slow-12 {
  animation: lines-opacity 2s infinite linear;
  animation-delay: 0s;
}

/* Animación Rápida (0.8s) */
.animate-line-fast-1 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.733s;
}
.animate-line-fast-2 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.667s;
}
.animate-line-fast-3 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.6s;
}
.animate-line-fast-4 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.533s;
}
.animate-line-fast-5 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.467s;
}
.animate-line-fast-6 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.4s;
}
.animate-line-fast-7 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.333s;
}
.animate-line-fast-8 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.267s;
}
.animate-line-fast-9 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.2s;
}
.animate-line-fast-10 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.133s;
}
.animate-line-fast-11 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: -0.067s;
}
.animate-line-fast-12 {
  animation: lines-opacity 0.8s infinite linear;
  animation-delay: 0s;
}
  `;

  // Velocidades para lines
  const linesSpeedClasses = {
    slow: {
      first: "animate-line-slow-1",
      second: "animate-line-slow-2",
      third: "animate-line-slow-3",
      fourth: "animate-line-slow-4",
      fifth: "animate-line-slow-5",
      sixth: "animate-line-slow-6",
      seventh: "animate-line-slow-7",
      eighth: "animate-line-slow-8",
      ninth: "animate-line-slow-9",
      tenth: "animate-line-slow-10",
      eleventh: "animate-line-slow-11",
      twelfth: "animate-line-slow-12",
    },
    normal: {
      first: "animate-line-1",
      second: "animate-line-2",
      third: "animate-line-3",
      fourth: "animate-line-4",
      fifth: "animate-line-5",
      sixth: "animate-line-6",
      seventh: "animate-line-7",
      eighth: "animate-line-8",
      ninth: "animate-line-9",
      tenth: "animate-line-10",
      eleventh: "animate-line-11",
      twelfth: "animate-line-12",
    },
    fast: {
      first: "animate-line-fast-1",
      second: "animate-line-fast-2",
      third: "animate-line-fast-3",
      fourth: "animate-line-fast-4",
      fifth: "animate-line-fast-5",
      sixth: "animate-line-fast-6",
      seventh: "animate-line-fast-7",
      eighth: "animate-line-fast-8",
      ninth: "animate-line-fast-9",
      tenth: "animate-line-fast-10",
      eleventh: "animate-line-fast-11",
      twelfth: "animate-line-fast-12",
    },
  };

  // Renderizar según el tipo
  const renderSpinner = () => {
    switch (type) {
      case "border":
        return (
          <div
            className={cn(
              "inline-block rounded-full",
              sizeClasses[size],
              borderSizeClasses[size],
              speedClasses[speed],
              variantBorderClasses[variant],
              spinnerClassName
            )}
            role="status"
            aria-busy="true"
          />
        );
      case "dots":
        return (
          <div
            className={cn("flex space-x-1", spinnerClassName)}
            role="status"
            aria-busy="true"
          >
            <style>{dotKeyframes}</style>
            <div
              className={cn(
                dotsSizeClasses[size],
                "rounded-full animate-dot-1",
                variantDotsClasses[variant]
              )}
              aria-hidden="true"
            ></div>
            <div
              className={cn(
                dotsSizeClasses[size],
                "rounded-full animate-dot-2",
                variantDotsClasses[variant]
              )}
              aria-hidden="true"
            ></div>
            <div
              className={cn(
                dotsSizeClasses[size],
                "rounded-full animate-dot-3",
                variantDotsClasses[variant]
              )}
              aria-hidden="true"
            ></div>
          </div>
        );
      case "grow":
        return (
          <div className={cn(spinnerClassName)} role="status" aria-busy="true">
            <style>{dotKeyframes}</style>
            <div
              className={cn(
                growSizeClasses[size],
                "rounded-full animate-grow",
                variantGrowClasses[variant]
              )}
              aria-hidden="true"
            ></div>
          </div>
        );
      case "wave":
        return (
          <div
            className={cn("flex space-x-1 items-end", spinnerClassName)}
            role="status"
            aria-busy="true"
          >
            <style>{dotKeyframes}</style>
            <div
              className={cn(
                waveSizeClasses[size],
                "rounded-full",
                waveSpeedClasses[speed].first,
                variantDotsClasses[variant]
              )}
              aria-hidden="true"
            ></div>
            <div
              className={cn(
                waveSizeClasses[size],
                "rounded-full",
                waveSpeedClasses[speed].second,
                variantDotsClasses[variant]
              )}
              aria-hidden="true"
            ></div>
            <div
              className={cn(
                waveSizeClasses[size],
                "rounded-full",
                waveSpeedClasses[speed].third,
                variantDotsClasses[variant]
              )}
              aria-hidden="true"
            ></div>
          </div>
        );
      case "lines":
        return (
          <div className={cn(spinnerClassName)} role="status" aria-busy="true">
            <style>{dotKeyframes}</style>
            <svg
              className={cn(
                linesSizeClasses[size],
                variantLinesClasses[variant]
              )}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
            >
              {/* Este (0°) */}
              <line
                x1="18.5"
                y1="12"
                x2="22.5"
                y2="12"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].first}
              />
              {/* 30° */}
              <line
                x1="17.6"
                y1="15.3"
                x2="21.1"
                y2="17.3"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].second}
              />
              {/* 60° */}
              <line
                x1="15.3"
                y1="17.6"
                x2="17.3"
                y2="21.1"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].third}
              />
              {/* Sur (90°) */}
              <line
                x1="12"
                y1="18.5"
                x2="12"
                y2="22.5"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].fourth}
              />
              {/* 120° */}
              <line
                x1="8.8"
                y1="17.6"
                x2="6.8"
                y2="21.1"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].fifth}
              />
              {/* 150° */}
              <line
                x1="6.4"
                y1="15.3"
                x2="2.9"
                y2="17.3"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].sixth}
              />
              {/* Oeste (180°) */}
              <line
                x1="5.5"
                y1="12"
                x2="1.5"
                y2="12"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].seventh}
              />
              {/* 210° */}
              <line
                x1="6.4"
                y1="8.8"
                x2="2.9"
                y2="6.8"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].eighth}
              />
              {/* 240° */}
              <line
                x1="8.8"
                y1="6.4"
                x2="6.8"
                y2="2.9"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].ninth}
              />
              {/* Norte (270°) */}
              <line
                x1="12"
                y1="5.5"
                x2="12"
                y2="1.5"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].tenth}
              />
              {/* 300° */}
              <line
                x1="15.3"
                y1="6.4"
                x2="17.3"
                y2="2.9"
                strokeWidth="2"
                strokeLinecap="round"
                className={linesSpeedClasses[speed].eleventh}
              />
              {/* 330° */}
              <line
                x1="17.6"
                y1="8.8"
                x2="21.1"
                y2="6.8"
                strokeWidth="2"
                strokeLinecap="round"
                className={`${linesSpeedClasses[speed].twelfth} 
             filter 
             animate-[line-highlight_1.5s_infinite_linear]`}
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // Renderizar componente completo con label
  const spinnerElement = renderSpinner();

  if (!label) {
    return (
      <div className={cn(className)} aria-live={ariaLive}>
        {spinnerElement}
        <span className="sr-only">{ariaLabel || "Cargando"}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        labelPosition === "top" || labelPosition === "bottom"
          ? "flex-col"
          : "flex-row",
        className,
        containerClassName
      )}
      role="status"
      aria-live={ariaLive}
      aria-busy="true"
    >
      {labelPosition === "top" && (
        <span
          className={cn(
            labelClasses[variant],
            labelSizeClasses[size],
            labelSpacingClasses[labelPosition],
            labelClassName
          )}
          id="spinner-label"
        >
          {label}
        </span>
      )}
      {labelPosition === "left" && (
        <span
          className={cn(
            labelClasses[variant],
            labelSizeClasses[size],
            labelSpacingClasses[labelPosition],
            labelClassName
          )}
          id="spinner-label"
        >
          {label}
        </span>
      )}
      {spinnerElement}
      {labelPosition === "right" && (
        <span
          className={cn(
            labelClasses[variant],
            labelSizeClasses[size],
            labelSpacingClasses[labelPosition],
            labelClassName
          )}
          id="spinner-label"
        >
          {label}
        </span>
      )}
      {labelPosition === "bottom" && (
        <span
          className={cn(
            labelClasses[variant],
            labelSizeClasses[size],
            labelSpacingClasses[labelPosition],
            labelClassName
          )}
          id="spinner-label"
        >
          {label}
        </span>
      )}
      <span className="sr-only">{ariaLabel || "Cargando"}</span>
    </div>
  );
};

export default Spinner;
