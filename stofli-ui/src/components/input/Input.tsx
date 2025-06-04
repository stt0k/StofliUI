"use client";

import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

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
  "aria-label"?: string;
  "aria-describedby"?: string;
  description?: string;
  errorId?: string;
  descriptionId?: string;
  hideLabel?: boolean;
  autoComplete?: string;
  readOnly?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      description,
      errorId: customErrorId,
      descriptionId: customDescriptionId,
      hideLabel = false,
      autoComplete,
      readOnly = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue);
    const [validationError, setValidationError] = useState<string | undefined>(
      error
    );
    const [isValid, setIsValid] = useState(success);
    const [touched, setTouched] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);
    // Tipo de input efectivo (para alternar entre password y text)
    const effectiveType = type === "password" && showPassword ? "text" : type;

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

    // Validar el valor actual
    const validateInput = useCallback(
      (value: string) => {
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
      },
      [pattern, validate, type, required, errorIsExternal]
    );

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
      validateInput,
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
      validateInput,
    ]);

    // Generar IDs únicos para accesibilidad
    const uniqueIdBase = useId();
    const uniqueId = `input-${uniqueIdBase.replace(/:/g, "")}`;
    const inputId = id || name || uniqueId;
    const errorMessageId = customErrorId || `${inputId}-error`;
    const descriptionMessageId =
      customDescriptionId || `${inputId}-description`;
    const labelId = `${inputId}-label`;

    // Estado para manejar el anuncio de cambios para lectores de pantalla
    const [announcement, setAnnouncement] = useState<string>("");

    // Efecto para limpiar anuncios después de que sean leídos
    useEffect(() => {
      if (announcement) {
        const timer = setTimeout(() => setAnnouncement(""), 1000);
        return () => clearTimeout(timer);
      }
    }, [announcement]);

    // Función para anunciar cambios importantes
    const announceChange = (message: string) => {
      setAnnouncement(message);
    };

    // Manejar cambios con anuncios para lectores de pantalla
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInputValue(newValue);
      }

      if (!touched) {
        setTouched(true);
      }

      const hasValidationRules =
        pattern || validate || type === "email" || type === "url";
      if (!errorIsExternal || (errorIsExternal && hasValidationRules)) {
        validateInput(newValue);
      }

      // Anunciar cambios importantes
      if (validationError) {
        announceChange("Error de validación corregido");
      } else if (isValid) {
        announceChange("Campo válido");
      }

      onChange?.(e);
    };

    // Mejorar el manejo del foco
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (description) {
        announceChange(description);
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setTouched(true);

      const hasValidationRules =
        pattern || validate || type === "email" || type === "url";
      if (!errorIsExternal || (errorIsExternal && hasValidationRules)) {
        validateInput(e.target.value);
      }

      // Anunciar errores al perder el foco
      if (validationError) {
        announceChange(`Error: ${validationError}`);
      }

      onBlur?.(e);
    };

    // Determinar las descripciones accesibles
    const getAriaDescribedby = () => {
      const ids = [];
      if (description) ids.push(descriptionMessageId);
      if (validationError) ids.push(errorMessageId);
      if (ariaDescribedby) ids.push(ariaDescribedby);
      return ids.length > 0 ? ids.join(" ") : undefined;
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
      lg: icon
        ? iconPosition === "left"
          ? "pl-10 pr-5"
          : "pl-5 pr-10"
        : "px-5",
    };

    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-[0.25rem]",
      md: "rounded-[0.375rem]",
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

    // Estilos de variantes
    const variantClasses = {
      default: {
        base: "border-zinc-400 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-700 transition-colors duration-200",
        focused:
          "border-zinc-700 dark:border-zinc-300 ring-1 ring-zinc-700/30 dark:ring-zinc-300/30",
      },
      primary: {
        base: "border-blue-400 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-700 transition-colors duration-200",
        focused:
          "border-blue-700 dark:border-blue-300 ring-1 ring-blue-700/30 dark:ring-blue-300/30",
      },
      secondary: {
        base: "border-purple-400 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-700 transition-colors duration-200",
        focused:
          "border-purple-700 dark:border-purple-300 ring-1 ring-purple-700/30 dark:ring-purple-300/30",
      },
      success: {
        base: "border-green-400 dark:border-green-800 hover:border-green-500 dark:hover:border-green-700 transition-colors duration-200",
        focused:
          "border-green-700 dark:border-green-300 ring-1 ring-green-700/30 dark:ring-green-300/30",
      },
      warning: {
        base: "border-amber-400 dark:border-amber-800 hover:border-amber-500 dark:hover:border-amber-700 transition-colors duration-200",
        focused:
          "border-amber-700 dark:border-amber-300 ring-1 ring-amber-700/30 dark:ring-amber-300/30",
      },
      danger: {
        base: "border-red-400 dark:border-red-800 hover:border-red-500 dark:hover:border-red-700 transition-colors duration-200",
        focused:
          "border-red-700 dark:border-red-300 ring-1 ring-red-700/30 dark:ring-red-300/30",
      },
    };

    // Estilos de estados de validación (independientes de la variante)
    const validationClasses = {
      error:
        "border-red-500 dark:border-red-500 ring-1 ring-red-500/20 dark:ring-red-500/20",
      errorFocused:
        "border-red-700 dark:border-red-400 ring-1 ring-red-700/30 dark:ring-red-400/30",
      success:
        "border-green-500 dark:border-green-500 ring-1 ring-green-500/20 dark:ring-green-500/20",
      successFocused:
        "border-green-700 dark:border-green-300 ring-1 ring-green-700/30 dark:ring-green-300/30",
    };

    // Determinar la clase de borde a usar
    let borderClass = variantClasses[variant].base;

    // Aplicar estados de validación o focus
    if (validationError) {
      borderClass = isFocused
        ? validationClasses.errorFocused
        : validationClasses.error;
    } else if (
      isValid &&
      (pattern ||
        validate ||
        type === "email" ||
        type === "url" ||
        success !== undefined)
    ) {
      borderClass = isFocused
        ? validationClasses.successFocused
        : validationClasses.success;
    } else if (isFocused) {
      borderClass = variantClasses[variant].focused;
    }

    return (
      <div
        className={cn(
          "relative",
          fullWidth ? "w-full" : "inline-block",
          className
        )}
      >
        {/* Región live para anuncios de accesibilidad */}
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement}
        </div>

        {/* Label visible o escondido */}
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
              hideLabel ? "sr-only" : "block mb-1.5 font-medium",
              labelSizeClasses[size],
              disabled
                ? "text-neutral-400 dark:text-neutral-600"
                : "text-neutral-900 dark:text-neutral-100",
              labelClassName
            )}
          >
            {label}
            {required && (
              <>
                <span aria-hidden="true" className="text-red-500 ml-0.5">
                  *
                </span>
                <span className="sr-only">(requerido)</span>
              </>
            )}
          </label>
        )}

        {/* Descripción del campo si existe */}
        {description && (
          <div
            id={descriptionMessageId}
            className="text-sm text-neutral-500 dark:text-neutral-400 mb-1"
          >
            {description}
          </div>
        )}

        <div className="relative">
          <input
            ref={ref || inputRef}
            type={effectiveType}
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
                : "focus:outline-none ring-inset transition-all duration-200 ease-in-out",
              "min-h-[44px]",
              // Si es password, añadir padding derecho para el icono del ojo
              type === "password" ? "pr-10" : "",
              inputClassName
            )}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            autoComplete={autoComplete}
            {...(isControlled ? { value: value } : { value: inputValue })}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            pattern={pattern}
            aria-invalid={!!validationError}
            aria-required={required}
            aria-label={hideLabel ? ariaLabel || label : undefined}
            aria-labelledby={!hideLabel ? labelId : undefined}
            aria-describedby={getAriaDescribedby()}
            aria-disabled={disabled}
            role={type === "search" ? "searchbox" : undefined}
          />

          {icon && (
            <div
              className={cn(
                "absolute top-1/2 transform -translate-y-1/2",
                iconPositionClasses[size][iconPosition],
                disabled
                  ? "text-neutral-400 dark:text-neutral-600"
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
                  : "text-neutral-500 dark:text-neutral-400",
                "transition-colors duration-200"
              )}
              aria-hidden="true"
            >
              {React.cloneElement(icon as React.ReactElement, {
                className: iconSizeClasses[size],
              })}
            </div>
          )}

          {/* Icono de ojo para mostrar/ocultar contraseña */}
          {type === "password" && !disabled && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute top-1/2 transform -translate-y-1/2 right-3.5",
                "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300",
                "transition-colors duration-200 focus:outline-none"
              )}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={iconSizeClasses[size]}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={iconSizeClasses[size]}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mensaje de error con animación */}
        {validationError && (
          <motion.div
            id={errorMessageId}
            role="alert"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 dark:text-red-400 text-xs mt-1"
          >
            {validationError}
          </motion.div>
        )}

        {/* Mensaje de éxito con animación */}
        {isValid && !validationError && successMessage && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 dark:text-green-400 text-xs mt-1"
          >
            {successMessage}
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
