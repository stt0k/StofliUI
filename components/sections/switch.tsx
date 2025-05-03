"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  id?: string;
  icon?: boolean;
  iconType?: "check" | "cross" | "none";
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
  id,
  icon = false,
  iconType = "check",
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const uniqueId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

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
      activeCircle: "bg-white",
      icon: "text-zinc-700 dark:text-zinc-300",
      hover: "hover:border-zinc-300 dark:hover:border-zinc-700",
      activeHover: "hover:bg-zinc-700 dark:hover:bg-zinc-500",
      label: "text-zinc-700 dark:text-zinc-300",
    },
    primary: {
      bg: "bg-blue-200 dark:bg-blue-800",
      activeBg: "bg-blue-500 dark:bg-blue-600",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white",
      icon: "text-blue-600 dark:text-blue-400",
      hover: "hover:border-blue-300 dark:hover:border-blue-700",
      activeHover: "hover:bg-blue-600 dark:hover:bg-blue-500",
      label: "text-blue-600 dark:text-blue-400",
    },
    secondary: {
      bg: "bg-purple-200 dark:bg-purple-800",
      activeBg: "bg-purple-500 dark:bg-purple-600",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white",
      icon: "text-purple-600 dark:text-purple-400",
      hover: "hover:border-purple-300 dark:hover:border-purple-700",
      activeHover: "hover:bg-purple-600 dark:hover:bg-purple-500",
      label: "text-purple-600 dark:text-purple-400",
    },
    success: {
      bg: "bg-green-200 dark:bg-green-800",
      activeBg: "bg-green-500 dark:bg-green-600",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white",
      icon: "text-green-600 dark:text-green-400",
      hover: "hover:border-green-300 dark:hover:border-green-700",
      activeHover: "hover:bg-green-600 dark:hover:bg-green-500",
      label: "text-green-600 dark:text-green-400",
    },
    warning: {
      bg: "bg-amber-200 dark:bg-amber-800",
      activeBg: "bg-amber-500 dark:bg-amber-600",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white",
      icon: "text-amber-600 dark:text-amber-400",
      hover: "hover:border-amber-300 dark:hover:border-amber-700",
      activeHover: "hover:bg-amber-600 dark:hover:bg-amber-500",
      label: "text-amber-600 dark:text-amber-400",
    },
    danger: {
      bg: "bg-red-200 dark:bg-red-800",
      activeBg: "bg-red-500 dark:bg-red-600",
      circle: "bg-white dark:bg-zinc-200",
      activeCircle: "bg-white",
      icon: "text-red-600 dark:text-red-400",
      hover: "hover:border-red-300 dark:hover:border-red-700",
      activeHover: "hover:bg-red-600 dark:hover:bg-red-500",
      label: "text-red-600 dark:text-red-400",
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
          className={`${sizeClasses[size].iconSize} ${
            isChecked ? variantClasses[variant].icon : "text-transparent"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isChecked ? 1 : 0,
            scale: isChecked ? 1 : 0,
            rotate: isChecked ? 0 : -45,
          }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 700,
            damping: 30,
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
        className={`${sizeClasses[size].iconSize} ${
          !isChecked ? variantClasses[variant].icon : "text-transparent"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: !isChecked ? 1 : 0,
          scale: !isChecked ? 1 : 0,
          rotate: !isChecked ? 0 : 45,
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </motion.svg>
    );
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        labelPosition === "left" ? "flex-row-reverse" : "flex-row"
      } ${className}`}
    >
      {label && (
        <label
          htmlFor={uniqueId}
          className={`${sizeClasses[size].label} ${
            variantClasses[variant].label
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative inline-flex flex-shrink-0 items-center">
        <input
          type="checkbox"
          id={uniqueId}
          name={name}
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-checked={isChecked}
        />

        <div
          className={`
            ${sizeClasses[size].wrapper} 
            rounded-full 
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
            ${
              isChecked
                ? `${variantClasses[variant].activeBg} ${
                    !disabled && variantClasses[variant].activeHover
                  }`
                : `${variantClasses[variant].bg} ${
                    !disabled && variantClasses[variant].hover
                  }`
            }
            transition-all duration-300 ease-out relative overflow-hidden
          `}
          onClick={handleChange}
        >
          {/* Fondo animado que se desplaza */}
          <motion.div
            className={`absolute inset-0 ${variantClasses[variant].activeBg}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isChecked ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            className={`
              ${sizeClasses[size].circle} 
              rounded-full shadow-md flex items-center justify-center z-10
              ${
                isChecked
                  ? variantClasses[variant].activeCircle
                  : variantClasses[variant].circle
              }
              absolute top-1/2 transform -translate-y-1/2
            `}
            initial={false}
            animate={{
              left: isChecked ? "calc(100% - 4px)" : "4px",
              translateX: isChecked ? "-100%" : "0%",
              scale: isChecked ? 1.05 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
              mass: 1,
            }}
          >
            {renderIcon()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Switch;
