"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Calendar as CalendarIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";
import { es } from "date-fns/locale";
import CalendarComponent from "./calendar";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  calendarIconClassName?: string;
  clearIconClassName?: string;
  arrowIconClassName?: string;
  calendarClassName?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "full";
  disabled?: boolean;
  readOnly?: boolean;
  minValue?: Date;
  maxValue?: Date;
  format?: string;
  clearable?: boolean;
  label?: string;
  errorMessage?: string;
  required?: boolean;
  calendar?:
    | "buddhist"
    | "ethiopic"
    | "ethioaa"
    | "coptic"
    | "hebrew"
    | "indian"
    | "islamic-civil"
    | "islamic-tbla"
    | "islamic-umalqura"
    | "japanese"
    | "persian"
    | "roc"
    | "gregory"
    | "chinese";
  locale?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  className = "",
  containerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  calendarIconClassName = "",
  clearIconClassName = "",
  arrowIconClassName = "",
  calendarClassName = "",
  variant = "default",
  size = "md",
  radius = "md",
  disabled = false,
  readOnly = false,
  minValue,
  maxValue,
  format: dateFormat = "dd/MM/yyyy",
  clearable = true,
  label,
  errorMessage,
  required = false,
  calendar = "gregory",
  locale = "es",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para actualizar el input cuando cambia la fecha seleccionada
  useEffect(() => {
    if (selectedDate && isValid(selectedDate)) {
      setInputValue(format(selectedDate, dateFormat, { locale: es }));
    } else {
      setInputValue("");
    }
  }, [selectedDate, dateFormat]);

  // Efecto para actualizar la fecha seleccionada cuando cambia el valor de la prop
  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  // Efecto para cerrar el calendario cuando se hace clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejador para cuando cambia el valor del input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Intentar parsear la fecha
    try {
      const parsedDate = parse(value, dateFormat, new Date(), { locale: es });

      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        onChange?.(parsedDate);
      } else if (value === "") {
        setSelectedDate(null);
        onChange?.(null);
      }
    } catch (error) {
      // Si no se puede parsear, mantener el input pero no actualizar la fecha
    }
  };

  // Manejador para cuando se selecciona una fecha del calendario
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // No cerramos el calendario al seleccionar una fecha
    onChange?.(date);
  };

  // Manejador para abrir/cerrar el calendario
  const toggleCalendar = () => {
    if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };

  // Manejador para limpiar la fecha seleccionada
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    setInputValue("");
    onChange?.(null);
    inputRef.current?.focus();
  };

  // Manejador para cuando el input gana el foco
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Manejador para cuando el input pierde el foco
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Manejador para el keydown en el input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "Enter" || e.key === " ") {
      toggleCalendar();
    }
  };

  // Clases para el tamaño del input
  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10",
    lg: "h-12 text-lg",
  };

  // Clases para el ancho del icono según el tamaño
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Clases para el radio
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    full: "rounded-lg",
  };

  // Clases para los colores según la variante
  const variantClasses = {
    default: `border-zinc-300 dark:border-zinc-700 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    primary: `border-blue-300 dark:border-blue-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    secondary: `border-purple-300 dark:border-purple-700 focus-within:border-purple-500 dark:focus-within:border-purple-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    success: `border-green-300 dark:border-green-700 focus-within:border-green-500 dark:focus-within:border-green-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    warning: `border-amber-300 dark:border-amber-700 focus-within:border-amber-500 dark:focus-within:border-amber-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    danger: `border-red-300 dark:border-red-700 focus-within:border-red-500 dark:focus-within:border-red-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
  };

  // Clases para el color del ícono según la variante
  const iconColorClasses = {
    default: "text-zinc-500 dark:text-zinc-400",
    primary: "text-blue-500 dark:text-blue-400",
    secondary: "text-purple-500 dark:text-purple-400",
    success: "text-green-500 dark:text-green-400",
    warning: "text-amber-500 dark:text-amber-400",
    danger: "text-red-500 dark:text-red-400",
  };

  // Calcular la clase de ring según la variante
  const getRingClass = () => {
    if (errorMessage) {
      return "ring-red-300 dark:ring-red-700";
    }
    return `ring-${variant === "default" ? "zinc" : variant}-300 dark:ring-${
      variant === "default" ? "zinc" : variant
    }-700`;
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          className={cn(
            "block text-sm font-medium mb-1",
            errorMessage
              ? "text-red-500 dark:text-red-400"
              : "text-zinc-700 dark:text-zinc-300",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        ref={datepickerRef}
        className={cn(
          "relative w-full",
          disabled && "opacity-50 cursor-not-allowed",
          containerClassName
        )}
      >
        <div
          className={cn(
            "flex items-center border bg-white dark:bg-zinc-900 overflow-hidden",
            sizeClasses[size],
            radiusClasses[radius],
            variantClasses[variant],
            disabled && "bg-zinc-100 dark:bg-zinc-800",
            isFocused && "ring-2 ring-opacity-50",
            isFocused && getRingClass(),
            "transition-all duration-200",
            inputContainerClassName
          )}
        >
          <div
            className={cn(
              "flex-grow flex items-center pl-3",
              !disabled && !readOnly ? "cursor-pointer" : "cursor-default"
            )}
            onClick={toggleCalendar}
          >
            <CalendarIcon
              className={cn(
                iconSizes[size],
                iconColorClasses[variant],
                "mr-2 flex-shrink-0",
                calendarIconClassName
              )}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              readOnly={readOnly}
              className={cn(
                "w-full bg-transparent border-none focus:ring-0 focus:outline-none",
                "cursor-pointer",
                (disabled || readOnly) && "cursor-not-allowed",
                inputClassName
              )}
              aria-invalid={!!errorMessage}
              aria-describedby={errorMessage ? `${label}-error` : undefined}
            />
          </div>

          <div className="flex items-center pr-3 flex-shrink-0 ml-auto gap-2">
            {clearable && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "h-4 w-4 text-zinc-400 hover:text-zinc-600",
                  "dark:text-zinc-500 dark:hover:text-zinc-300",
                  "opacity-70 hover:opacity-100 transition-opacity flex-shrink-0",
                  !selectedDate && "invisible",
                  clearIconClassName
                )}
                aria-label="Limpiar fecha"
              >
                <X size={16} />
              </button>
            )}

            {!disabled && !readOnly && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCalendar();
                }}
                className="flex-shrink-0 cursor-pointer"
              >
                <ChevronDown
                  className={cn(
                    iconSizes[size],
                    iconColorClasses[variant],
                    "transition-transform duration-300",
                    isOpen && "transform rotate-180",
                    "flex-shrink-0",
                    arrowIconClassName
                  )}
                />
              </div>
            )}
          </div>
        </div>

        {/* Calendario emergente con animación */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute z-50 mt-1 left-1/2 transform -translate-x-1/2 shadow-xl"
              style={{
                width: "min(100%, 320px)",
                transformOrigin: "top center",
              }}
            >
              <CalendarComponent
                value={selectedDate || undefined}
                onChange={handleDateChange}
                variant={variant}
                radius={radius}
                minValue={minValue}
                maxValue={maxValue}
                calendar={calendar}
                locale={locale}
                className={calendarClassName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <p
          id={`${label}-error`}
          className={cn(
            "mt-1 text-sm text-red-500 dark:text-red-400",
            errorClassName
          )}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
