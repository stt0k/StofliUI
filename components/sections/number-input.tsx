"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  radius?: "none" | "sm" | "md" | "full";
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  controlsLayout?: "default" | "compact" | "split";
  controlsPosition?: "right" | "both";
  showControls?: boolean;
  iconSet?: "chevron" | "plusminus";
  required?: boolean;
  name?: string;
  id?: string;
  animationStyle?: "slide" | "pulse" | "scale" | "bounce";
  format?: "default" | "percentage" | "currency" | "signed";
  formatOptions?: {
    symbol?: string;
    position?: "prefix" | "suffix";
  };
  onChange?: (value: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  defaultValue,
  min,
  max,
  step = 1,
  disabled = false,
  readonly = false,
  label,
  placeholder,
  error,
  size = "md",
  variant = "default",
  radius = "md",
  fullWidth = false,
  className = "",
  inputClassName = "",
  controlsLayout = "default",
  controlsPosition = "right",
  showControls = true,
  iconSet = "chevron",
  required = false,
  name,
  id,
  animationStyle = "slide",
  format = "default",
  formatOptions = {},
  onChange,
  onFocus,
  onBlur,
}) => {
  // Estado para el valor del input (controlado vs no controlado)
  const [inputValue, setInputValue] = useState<number | undefined>(
    value !== undefined ? value : defaultValue
  );
  const [isFocused, setIsFocused] = useState(false);
  const [lastChangeDirection, setLastChangeDirection] = useState<
    "up" | "down" | null
  >(null);
  const [animationActive, setAnimationActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : inputValue;

  const uniqueId =
    id || `number-input-${Math.random().toString(36).substring(2, 9)}`;

  // Sincronizar con el prop value
  useEffect(() => {
    if (isControlled) {
      setInputValue(value);
    }
  }, [isControlled, value]);

  // Función para incrementar el valor
  const increment = () => {
    if (disabled || readonly) return;

    // Si no hay valor actual, comenzar desde 0 o min (si está definido)
    let startValue = 0;
    if (min !== undefined && min > 0) {
      startValue = min;
    }

    const newValue =
      (currentValue !== undefined ? currentValue : startValue) + step;
    if (max !== undefined && newValue > max) return;

    updateValue(newValue, "up");
  };

  // Función para decrementar el valor
  const decrement = () => {
    if (disabled || readonly) return;

    // Si no hay valor actual, comenzar desde 0 o max (si está definido)
    let startValue = 0;
    if (max !== undefined && max < 0) {
      startValue = max;
    }

    const newValue =
      (currentValue !== undefined ? currentValue : startValue) - step;
    if (min !== undefined && newValue < min) return;

    updateValue(newValue, "down");
  };

  // Actualizar el valor con animación
  const updateValue = (newValue: number, direction: "up" | "down") => {
    const validatedValue = validateValue(newValue);

    if (isControlled) {
      onChange?.(validatedValue);
    } else {
      setInputValue(validatedValue);
      onChange?.(validatedValue);
    }

    setLastChangeDirection(direction);
    triggerAnimation();
  };

  // Disparar la animación
  const triggerAnimation = () => {
    setAnimationActive(true);
    setTimeout(() => setAnimationActive(false), 300);
  };

  // Validar el valor dentro de los límites
  const validateValue = (value: number): number => {
    let validValue = value;

    if (min !== undefined && value < min) {
      validValue = min;
    } else if (max !== undefined && value > max) {
      validValue = max;
    }

    return validValue;
  };

  // Formatear el valor para mostrar en el input
  const formatValue = (value: number | undefined): string => {
    if (value === undefined) return "";

    switch (format) {
      case "percentage":
        return `${value}${formatOptions.position === "prefix" ? "%" : ""} ${
          formatOptions.position === "suffix" ? "%" : ""
        }`.trim();

      case "currency":
        const symbol = formatOptions.symbol || "€";
        return `${
          formatOptions.position === "prefix" ? symbol : ""
        } ${value.toFixed(2)} ${
          formatOptions.position === "suffix" ? symbol : ""
        }`.trim();

      case "signed":
        return value > 0 ? `+${value}` : value.toString();

      case "default":
      default:
        return value.toString();
    }
  };

  // Parsear el valor del input al manejar cambios
  const parseFormattedValue = (inputValue: string): number | undefined => {
    if (inputValue === "") return undefined;

    let numericValue: string = inputValue;

    // Eliminar símbolos según el formato
    switch (format) {
      case "percentage":
        numericValue = inputValue.replace(/%/g, "");
        break;

      case "currency":
        const symbol = formatOptions.symbol || "€";
        numericValue = inputValue
          .replace(new RegExp(`[${symbol}]`, "g"), "")
          .trim();
        break;

      case "signed":
        // + ya es permitido en la entrada
        break;
    }

    const parsed = parseFloat(numericValue);
    return isNaN(parsed) ? undefined : parsed;
  };

  // Manejar cambios directos en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readonly) return;

    const stringValue = e.target.value;

    // Permitir caracteres especiales según el formato
    let isValidInput = true;
    if (format === "default") {
      isValidInput =
        !isNaN(Number(stringValue)) ||
        stringValue === "-" ||
        stringValue === "";
    } else if (format === "percentage") {
      isValidInput = /^-?\d*\.?\d*%?$/.test(stringValue) || stringValue === "";
    } else if (format === "currency") {
      const symbol = formatOptions.symbol || "€";
      const regexPattern = new RegExp(
        `^[${symbol}]?\\s?-?\\d*\\.?\\d*\\s?[${symbol}]?$`
      );
      isValidInput = regexPattern.test(stringValue) || stringValue === "";
    } else if (format === "signed") {
      isValidInput = /^[+-]?\d*\.?\d*$/.test(stringValue) || stringValue === "";
    }

    if (!isValidInput) return;

    const newValue = parseFormattedValue(stringValue);

    if (isControlled) {
      onChange?.(newValue !== undefined ? validateValue(newValue) : 0);
    } else {
      setInputValue(newValue);
      if (newValue !== undefined) {
        onChange?.(validateValue(newValue));
      }
    }
  };

  // Manejar el evento blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = inputValue;

    // Solo validamos y establecemos a 0 si hay un valor o si el campo es requerido
    if (value !== undefined || required) {
      const validatedValue = validateValue(value ?? 0);

      if (!isControlled) {
        setInputValue(validatedValue);
      }

      if (validatedValue !== inputValue && !isControlled) {
        onChange?.(validatedValue);
      }
    }

    setIsFocused(false);
    onBlur?.(e);
  };

  // Manejar el evento focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Manejar eventos de teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readonly) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  };

  // Animaciones según el tipo seleccionado
  const getAnimation = () => {
    const baseTransition = {
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    };

    switch (animationStyle) {
      case "pulse":
        return {
          scale: [1, 1.05, 1],
          transition: { ...baseTransition, times: [0, 0.5, 1] },
        };
      case "scale":
        return {
          scale: [1, lastChangeDirection === "up" ? 1.1 : 0.9, 1],
          transition: { ...baseTransition, times: [0, 0.5, 1] },
        };
      case "bounce":
        return {
          y: lastChangeDirection === "up" ? [-3, 0] : [3, 0],
          transition: { ...baseTransition, times: [0, 1] },
        };
      case "slide":
      default:
        return {
          x: lastChangeDirection === "up" ? [-5, 0] : [5, 0],
          opacity: [0.7, 1],
          transition: { ...baseTransition, times: [0, 1] },
        };
    }
  };

  // Tamaños para los diferentes elementos
  const sizeClasses = {
    sm: {
      input: "h-8 text-xs",
      button: "w-6 h-6",
      icon: 12,
      paddingControls: "pr-12",
      paddingBoth: "px-12",
      paddingSides: "px-8",
      label: "text-xs",
    },
    md: {
      input: "h-10 text-sm",
      button: "w-8 h-8",
      icon: 14,
      paddingControls: "pr-16",
      paddingBoth: "px-16",
      paddingSides: "px-10",
      label: "text-sm",
    },
    lg: {
      input: "h-12 text-base",
      button: "w-10 h-10",
      icon: 16,
      paddingControls: "pr-20",
      paddingBoth: "px-20",
      paddingSides: "px-12",
      label: "text-base",
    },
  };

  // Clases para los estilos de variantes
  const variantClasses = {
    default: {
      input:
        "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 text-zinc-900 dark:text-zinc-100",
      button:
        "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700",
      active: "bg-zinc-200 dark:bg-zinc-700",
      text: "text-zinc-700 dark:text-zinc-300",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
      focus:
        "ring-zinc-500/30 dark:ring-zinc-400/30 border-zinc-500 dark:border-zinc-400",
    },
    primary: {
      input:
        "bg-white dark:bg-zinc-900 border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 text-zinc-900 dark:text-zinc-100",
      button:
        "bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-700",
      active: "bg-blue-100 dark:bg-blue-800/50",
      text: "text-blue-700 dark:text-blue-300",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
      focus:
        "ring-blue-500/30 dark:ring-blue-400/30 border-blue-500 dark:border-blue-400",
    },
    secondary: {
      input:
        "bg-white dark:bg-zinc-900 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 text-zinc-900 dark:text-zinc-100",
      button:
        "bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-800/50 text-purple-600 dark:text-purple-300 border-purple-300 dark:border-purple-700",
      active: "bg-purple-100 dark:bg-purple-800/50",
      text: "text-purple-700 dark:text-purple-300",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
      focus:
        "ring-purple-500/30 dark:ring-purple-400/30 border-purple-500 dark:border-purple-400",
    },
    success: {
      input:
        "bg-white dark:bg-zinc-900 border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 text-zinc-900 dark:text-zinc-100",
      button:
        "bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-800/50 text-green-600 dark:text-green-300 border-green-300 dark:border-green-700",
      active: "bg-green-100 dark:bg-green-800/50",
      text: "text-green-700 dark:text-green-300",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
      focus:
        "ring-green-500/30 dark:ring-green-400/30 border-green-500 dark:border-green-400",
    },
    warning: {
      input:
        "bg-white dark:bg-zinc-900 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-400 text-zinc-900 dark:text-zinc-100",
      button:
        "bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-800/50 text-amber-600 dark:text-amber-300 border-amber-300 dark:border-amber-700",
      active: "bg-amber-100 dark:bg-amber-800/50",
      text: "text-amber-700 dark:text-amber-300",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
      focus:
        "ring-amber-500/30 dark:ring-amber-400/30 border-amber-500 dark:border-amber-400",
    },
    danger: {
      input:
        "bg-white dark:bg-zinc-900 border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 text-zinc-900 dark:text-zinc-100",
      button:
        "bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-800/50 text-red-600 dark:text-red-300 border-red-300 dark:border-red-700",
      active: "bg-red-100 dark:bg-red-800/50",
      text: "text-red-700 dark:text-red-300",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
      focus:
        "ring-red-500/30 dark:ring-red-400/30 border-red-500 dark:border-red-400",
    },
  };

  // Clases para los diferentes radios de borde
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    full: "rounded-xl",
  };

  // Determinar las clases para los controles según la posición
  let paddingClass = "";
  if (showControls) {
    switch (controlsPosition) {
      case "right":
        paddingClass = sizeClasses[size].paddingControls;
        break;
      case "both":
        paddingClass = sizeClasses[size].paddingBoth;
        break;
    }
  }

  // Renderizar los iconos según el conjunto elegido
  const renderIcon = (direction: "up" | "down") => {
    if (iconSet === "chevron") {
      return direction === "up" ? (
        <ChevronUp size={sizeClasses[size].icon} className="stroke-[2.5px]" />
      ) : (
        <ChevronDown size={sizeClasses[size].icon} className="stroke-[2.5px]" />
      );
    } else {
      return direction === "up" ? (
        <Plus size={sizeClasses[size].icon} className="stroke-[2.5px]" />
      ) : (
        <Minus size={sizeClasses[size].icon} className="stroke-[2.5px]" />
      );
    }
  };

  // Renderizar los controles según la posición y diseño
  const renderControls = () => {
    if (!showControls) return null;

    const controlButton = (direction: "up" | "down") => (
      <button
        type="button"
        onClick={direction === "up" ? increment : decrement}
        disabled={
          disabled ||
          readonly ||
          (direction === "up" &&
            max !== undefined &&
            currentValue !== undefined &&
            currentValue >= max) ||
          (direction === "down" &&
            min !== undefined &&
            currentValue !== undefined &&
            currentValue <= min)
        }
        className={cn(
          "flex items-center justify-center border transition-all duration-200",
          variantClasses[variant].button,
          "focus:outline-none hover:scale-105 active:scale-95",
          `active:${variantClasses[variant].active}`,
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100",
          // No cambiar el tamaño del botón en el layout compacto
          sizeClasses[size].button,
          iconSet === "plusminus" ? "rounded-full" : "rounded-md",
          "shadow-sm hover:shadow"
        )}
        aria-label={direction === "up" ? "Aumentar valor" : "Disminuir valor"}
      >
        {renderIcon(direction)}
      </button>
    );

    // Controles en un layout compacto (apilados)
    if (
      controlsLayout === "compact" &&
      (controlsPosition === "right" || controlsPosition === "both")
    ) {
      return (
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center gap-1 mr-1 py-1.5">
          {controlButton("up")}
          {controlButton("down")}
        </div>
      );
    }

    // Controles en la derecha (default)
    if (controlsPosition === "right") {
      return (
        <div className="absolute right-0 inset-y-0 flex items-center gap-1 pr-1 my-1.5">
          {controlButton("down")}
          {controlButton("up")}
        </div>
      );
    }

    // Controles en ambos lados (derecha e izquierda)
    if (controlsPosition === "both") {
      return (
        <>
          <div className="absolute left-0 inset-y-0 flex items-center pl-1 my-1.5">
            {controlButton("down")}
          </div>
          <div className="absolute right-0 inset-y-0 flex items-center pr-1 my-1.5">
            {controlButton("up")}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>
      {label && (
        <label
          htmlFor={uniqueId}
          className={cn(
            "block mb-1 font-medium",
            sizeClasses[size].label,
            variantClasses[variant].text
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <motion.div
          animate={animationActive ? getAnimation() : {}}
          className="relative"
        >
          <input
            ref={inputRef}
            id={uniqueId}
            type="text"
            inputMode="numeric"
            value={
              currentValue !== undefined
                ? format !== "default"
                  ? formatValue(currentValue)
                  : currentValue.toString()
                : ""
            }
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            readOnly={readonly}
            name={name}
            placeholder={placeholder}
            required={required}
            className={cn(
              "block border px-3 w-full",
              paddingClass,
              sizeClasses[size].input,
              radiusClasses[radius],
              error
                ? variantClasses[variant].error
                : variantClasses[variant].input,
              "transition-all duration-200",
              disabled && "opacity-60 cursor-not-allowed",
              readonly && "opacity-80 cursor-default",
              isFocused && `ring ${variantClasses[variant].focus}`,
              "focus:outline-none",
              inputClassName
            )}
            aria-invalid={!!error}
            aria-labelledby={label ? uniqueId : undefined}
          />
        </motion.div>

        {renderControls()}
      </div>

      {error && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default NumberInput;
