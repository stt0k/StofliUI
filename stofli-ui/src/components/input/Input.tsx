"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {  cn  } from "../../lib/utils";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  value?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
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
  inputClassName?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  pattern?: string;
  validate?: string | ((value: string) => string | undefined);
  successMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  type = "text",
  defaultValue = "",
  value,
  name,
  id,
  disabled = false,
  required = false,
  error,
  success = false,
  icon,
  iconPosition = "left",
  variant = "default",
  size = "md",
  radius = "md",
  fullWidth = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  onChange,
  onFocus,
  onBlur,
  pattern,
  validate,
  successMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [validationError, setValidationError] = useState<string | undefined>(error);
  const [isValid, setIsValid] = useState(success);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Determinar si el input es controlado o no controlado - esto no debe cambiar durante el ciclo de vida
  const isControlled = value !== undefined;

  // Efecto para sincronizar defaultValue con inputValue en componentes no controlados
  useEffect(() => {
    if (!isControlled) {
      setInputValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  // Rastreamos si el error vino de una prop externa
  const [errorIsExternal, setErrorIsExternal] = useState(error !== undefined);

  useEffect(() => {
    // Actualizar el error de validación externo
    if (error !== undefined) {
      setValidationError(error);
      setErrorIsExternal(true);
    } else {
      setErrorIsExternal(false);
    }

    // Actualizar el estado de éxito externo
    // Que el prop success tenga prioridad sobre la lógica interna
    if (success !== undefined) {
      setIsValid(success);
    }
  }, [error, success]);

  // Efecto para validar valores iniciales si hay reglas de validación
  useEffect(() => {
    const hasValidationRules =
      pattern || validate || type === "email" || type === "url";

    // Si hay reglas de validación y hay un valor inicial, validarlo
    if (
      hasValidationRules &&
      inputValue &&
      !touched &&
      !validationError &&
      !isValid
    ) {
      // Establecer touched para que la validación funcione
      setTouched(true);
      // Validar el valor inicial
      validateInput(inputValue);
    }
  }, [
    pattern,
    validate,
    type,
    inputValue,
    touched,
    validationError,
    isValid,
  ]);

  useEffect(() => {
    // No realizamos validación automática si:
    // - El componente está siendo controlado externamente a través del prop success, o
    // - Es un error externo sin reglas de validación
    const hasValidationRules =
      pattern || validate || type === "email" || type === "url";
    const shouldValidate =
      success === undefined &&
      touched &&
      (!errorIsExternal || (errorIsExternal && hasValidationRules));

    if (shouldValidate) {
      validateInput(inputValue);
    }
  }, [
    inputValue,
    touched,
    success,
    errorIsExternal,
    pattern,
    validate,
    type,
  ]);

  // Función para procesar reglas de validación comunes basadas en cadenas
  const processStringValidation = (
    value: string,
    rule: string
  ): string | undefined => {
    switch (rule) {
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Introduce un correo electrónico válido"
          : undefined;
      case "url":
        return !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          value
        )
          ? "Introduce una URL válida"
          : undefined;
      case "min:8":
        return value.length < 8
          ? "Debe tener al menos 8 caracteres"
          : undefined;
      default:
        if (rule.startsWith("min:")) {
          const min = parseInt(rule.split(":")[1]);
          return value.length < min
            ? `Debe tener al menos ${min} caracteres`
            : undefined;
        }
        return undefined;
    }
  };

  // Validar el valor actual
  const validateInput = (value: string) => {
    // Eliminamos esta restricción para permitir validación en cualquier momento
    // if (!touched) return;

    // Detectar si hay reglas de validación específicas
    const hasValidationRules =
      pattern || validate || type === "email" || type === "url";

    // No reiniciar validación si es un error externo y no hay reglas de validación
    if (!(errorIsExternal && !hasValidationRules)) {
      // Reiniciar validación
      setValidationError(undefined);
      setIsValid(false);
    }

    // Validar si está requerido y está vacío
    if (required && !value) {
      setValidationError("Este campo es obligatorio");
      return;
    }

    // Si no hay reglas de validación, no marcar como válido automáticamente
    if (!hasValidationRules) {
      return;
    }

    // Si no hay valor y no es requerido, no continuar con la validación
    if (!value) {
      return;
    }

    let passedValidation = true;

    // Validar patrón si existe
    if (pattern && value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        if (type === "email") {
          setValidationError("Introduce un correo electrónico válido");
        } else if (type === "url") {
          setValidationError("Introduce una URL válida");
        } else {
          setValidationError("El formato introducido no es válido");
        }
        passedValidation = false;
        return;
      }
    }

    // Validación de tipos específicos
    if (value) {
      if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setValidationError("Introduce un correo electrónico válido");
        passedValidation = false;
        return;
      } else if (
        type === "url" &&
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          value
        )
      ) {
        setValidationError("Introduce una URL válida");
        passedValidation = false;
        return;
      }
    }

    // Función de validación personalizada o regla en cadena
    if (validate && value) {
      if (typeof validate === "string") {
        // Si es una cadena, procesamos la regla predefinida
        const stringError = processStringValidation(value, validate);
        if (stringError) {
          setValidationError(stringError);
          passedValidation = false;
          return;
        }
      } else if (typeof validate === "function") {
        // Si es una función, la ejecutamos (debe ser marcada con 'use server' en el cliente)
        try {
          const customError = validate(value);
          if (customError) {
            setValidationError(customError);
            passedValidation = false;
            return;
          }
        } catch (err) {
          console.error("Error al ejecutar la validación:", err);
          setValidationError("Error de validación");
          passedValidation = false;
          return;
        }
      }
    }

    // Solo marcar como válido si hay reglas de validación y pasaron todas
    if (hasValidationRules && passedValidation) {
      setIsValid(true);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setTouched(true);

    // Detectar si hay reglas de validación específicas
    const hasValidationRules =
      pattern || validate || type === "email" || type === "url";

    // Solo validar si:
    // - No es un error externo, o
    // - Es un error externo pero hay reglas de validación
    if (!errorIsExternal || (errorIsExternal && hasValidationRules)) {
      validateInput(e.target.value);
    }

    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInputValue(newValue);
    }

    // Marcar como touched al primer cambio
    if (!touched) {
      setTouched(true);
    }

    // Detectar si hay reglas de validación específicas
    const hasValidationRules =
      pattern || validate || type === "email" || type === "url";

    // Solo validar en cada cambio si:
    // - No es un error externo, o
    // - Es un error externo pero hay reglas de validación
    if (!errorIsExternal || (errorIsExternal && hasValidationRules)) {
      validateInput(newValue);
    }

    onChange?.(e);
  };

  // Definimos los estilos según las props
  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const paddingClasses = {
    sm: icon ? (iconPosition === "left" ? "pl-7 pr-3" : "pl-3 pr-7") : "px-3",
    md: icon ? (iconPosition === "left" ? "pl-9 pr-4" : "pl-4 pr-9") : "px-4",
    lg: icon ? (iconPosition === "left" ? "pl-10 pr-5" : "pl-5 pr-10") : "px-5",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  const iconSizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const iconPositionClasses = {
    sm: {
      left: "left-3",
      right: "right-3",
    },
    md: {
      left: "left-3.5",
      right: "right-3.5",
    },
    lg: {
      left: "left-4",
      right: "right-4",
    },
  };

  // Clases para el placeholder animado
  // const placeholderSizeClasses = {
  //   sm: "text-xs",
  //   md: "text-sm",
  //   lg: "text-base",
  // };

  const variantClasses = {
    default: {
      base: "border-zinc-400 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-700",
      focused:
        "border-zinc-500 dark:border-zinc-400 ring-2 ring-zinc-100 dark:ring-zinc-800",
      error:
        "border-red-500 dark:border-red-400 hover:border-red-600 dark:hover:border-red-300",
      success:
        "border-green-500 dark:border-green-400 hover:border-green-600 dark:hover:border-green-300",
    },
    primary: {
      base: "border-blue-400 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-700",
      focused:
        "border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-500/20",
      error:
        "border-red-500 dark:border-red-400 hover:border-red-600 dark:hover:border-red-300",
      success:
        "border-green-500 dark:border-green-400 hover:border-green-600 dark:hover:border-green-300",
    },
    secondary: {
      base: "border-purple-400 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-700",
      focused:
        "border-purple-500 dark:border-purple-400 ring-2 ring-purple-100 dark:ring-purple-500/20",
      error:
        "border-red-500 dark:border-red-400 hover:border-red-600 dark:hover:border-red-300",
      success:
        "border-green-500 dark:border-green-400 hover:border-green-600 dark:hover:border-green-300",
    },
    success: {
      base: "border-green-400 dark:border-green-800 hover:border-green-500 dark:hover:border-green-700",
      focused:
        "border-green-500 dark:border-green-400 ring-2 ring-green-100 dark:ring-green-500/20",
      error:
        "border-red-500 dark:border-red-400 hover:border-red-600 dark:hover:border-red-300",
      success:
        "border-green-500 dark:border-green-400 hover:border-green-600 dark:hover:border-green-300",
    },
    warning: {
      base: "border-amber-400 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-700",
      focused:
        "border-amber-500 dark:border-amber-400 ring-2 ring-amber-100 dark:ring-amber-500/20",
      error:
        "border-red-500 dark:border-red-400 hover:border-red-600 dark:hover:border-red-300",
      success:
        "border-green-500 dark:border-green-400 hover:border-green-600 dark:hover:border-green-300",
    },
    danger: {
      base: "border-red-400 dark:border-red-800 hover:border-red-500 dark:hover:border-red-700",
      focused:
        "border-red-500 dark:border-red-400 ring-2 ring-red-100 dark:ring-red-500/20",
      error:
        "border-red-500 dark:border-red-400 hover:border-red-600 dark:hover:border-red-300",
      success:
        "border-green-500 dark:border-green-400 hover:border-green-600 dark:hover:border-green-300",
    },
  };

  // Determinar la clase de borde a usar
  let borderClass = variantClasses[variant].base;
  if (validationError) {
    borderClass = variantClasses[variant].error;
  } else if (
    isValid &&
    (pattern ||
      validate ||
      type === "email" ||
      type === "url" ||
      success !== undefined)
  ) {
    borderClass = variantClasses[variant].success;
  } else if (isFocused) {
    borderClass = variantClasses[variant].focused;
  }

  // Transformamos el id del input - usamos una clave estable en lugar de Math.random()
  const inputId = id || name || `input-${label?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;

  return (
    <div
      className={cn(
        "relative",
        fullWidth ? "w-full" : "inline-block",
        className
      )}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "block mb-1.5 font-medium",
            labelSizeClasses[size],
            disabled
              ? "text-zinc-400 dark:text-zinc-600"
              : "text-zinc-900 dark:text-zinc-100",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <motion.div
          className={cn(
            "pointer-events-none absolute -inset-0.5",
            radiusClasses[radius],
            "opacity-0",
            isFocused ? "opacity-100" : "opacity-0",
            "transition-opacity duration-300"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 0.1 : 0 }}
          style={{
            background: `radial-gradient(
              800px circle at ${
                isFocused && inputRef.current
                  ? inputRef.current.getBoundingClientRect().width / 2
                  : 0
              }px 50%, 
              ${
                variant === "default"
                  ? "rgba(161, 161, 170, 0.15)"
                  : variant === "primary"
                  ? "rgba(59, 130, 246, 0.15)"
                  : variant === "secondary"
                  ? "rgba(168, 85, 247, 0.15)"
                  : variant === "success"
                  ? "rgba(34, 197, 94, 0.15)"
                  : variant === "warning"
                  ? "rgba(245, 158, 11, 0.15)"
                  : "rgba(239, 68, 68, 0.15)"
              })`,
          }}
        />

        <input
          ref={inputRef}
          type={type}
          id={inputId}
          name={name}
          className={cn(
            "w-full border bg-white dark:bg-zinc-900",
            sizeClasses[size],
            paddingClasses[size],
            radiusClasses[radius],
            borderClass,
            disabled
              ? "opacity-60 cursor-not-allowed"
              : "focus:outline-none focus:ring-0 transition-all duration-200",
            inputClassName
          )}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...(isControlled 
            ? { value: value } 
            : { value: inputValue })}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          pattern={pattern}
        />

        {icon && (
          <div
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2",
              iconPositionClasses[size][iconPosition],
              disabled
                ? "text-zinc-400 dark:text-zinc-600"
                : validationError
                ? "text-red-500 dark:text-red-400"
                : isValid &&
                  (pattern ||
                    validate ||
                    type === "email" ||
                    type === "url" ||
                    success !== undefined)
                ? "text-green-500 dark:text-green-400"
                : isFocused
                ? `text-${
                    variant === "default" ? "zinc" : variant
                  }-500 dark:text-${
                    variant === "default" ? "zinc" : variant
                  }-400`
                : "text-zinc-500 dark:text-zinc-400",
              "transition-colors duration-200"
            )}
          >
            {React.cloneElement(icon as React.ReactElement, {
              className: iconSizeClasses[size],
            })}
          </div>
        )}
      </div>

      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 dark:text-red-400 text-xs mt-1"
        >
          {validationError}
        </motion.div>
      )}

      {isValid && !validationError && successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500 dark:text-green-400 text-xs mt-1"
        >
          {successMessage}
        </motion.div>
      )}
    </div>
  );
};

export default Input;
