"use client";

import React from "react";
import { motion } from "framer-motion";

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
  radius?: "none" | "sm" | "md" | "full";
  striped?: boolean;
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
  radius = "md",
  striped = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
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
    sm: "rounded-sm",
    md: "rounded",
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

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span
              className={`${labelSizeClasses[size]} font-medium dark:text-zinc-200 text-zinc-800`}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              className={`${labelSizeClasses[size]} dark:text-zinc-400 text-zinc-600`}
            >
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden ${radiusClasses[radius]} ${sizeClasses[size]} ${className}`}
      >
        <motion.div
          className={`h-full ${variantClasses[variant]} ${radiusClasses[radius]}`}
          initial={animate ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animate ? 0.5 : 0,
            ease: "easeOut",
          }}
          style={stripedStyle}
        />
      </div>
      <style jsx global>{`
        @keyframes progress-stripes {
          from {
            background-position: 1rem 0;
          }
          to {
            background-position: 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Progress;
