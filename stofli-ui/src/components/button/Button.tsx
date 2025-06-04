"use client";

import React, { useRef, useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag"> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "outline"
    | "ghost"
    | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  fullWidth?: boolean;
  withRing?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  withArrow?: boolean;
  withRipple?: boolean;
  rippleColor?: string;
  className?: string;
  rippleClassName?: string;
  loaderClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  contentClassName?: string;
  arrowClassName?: string;
  loadingText?: string;
  ariaLabel?: string;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  size: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "default",
      size = "md",
      radius = "md",
      fullWidth = false,
      withRing = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      withArrow = false,
      withRipple = true,
      rippleColor,
      rippleClassName = "",
      loaderClassName = "",
      leftIconClassName = "",
      rightIconClassName = "",
      contentClassName = "",
      arrowClassName = "",
      disabled,
      onClick,
      loadingText = "Cargando...",
      ariaLabel,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Estado para controlar los efectos de ripple
    const [ripples, setRipples] = useState<RippleEffect[]>([]);
    // ID único para cada ripple
    const nextRippleId = useRef(0);

    // Referencia al botón para calcular la posición del ripple
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Determinar si el botón está deshabilitado
    const isDisabled = disabled || isLoading;

    const uniqueIdBase = useId();
    const loaderId = `loader-${uniqueIdBase.replace(/:/g, "")}`;

    // Determinar el aria-label basado en las props
    const getAriaLabel = () => {
      if (isLoading) {
        return loadingText;
      }
      if (ariaLabel) {
        return ariaLabel;
      }
      if (typeof children === "string") {
        return children;
      }
      return undefined;
    };

    // Eliminar ripples completados
    useEffect(() => {
      if (ripples.length > 0) {
        const timeoutId = setTimeout(() => {
          // Eliminar solo los ripples más antiguos si hay muchos
          if (ripples.length > 10) {
            setRipples((current) =>
              current.slice(Math.floor(current.length / 2))
            );
          } else {
            setRipples([]);
          }
        }, 800);

        return () => clearTimeout(timeoutId);
      }
    }, [ripples]);

    // Manejador de eventos de clic que agrega el efecto ripple
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (!isDisabled && withRipple) {
        const button = buttonRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Calcular tamaño del ripple para que cubra todo el botón
          const maxDimension = Math.max(rect.width, rect.height);
          const size = maxDimension * 2;

          // Crear un nuevo ripple con ID único
          const newRipple = {
            id: nextRippleId.current,
            x,
            y,
            size,
          };

          nextRippleId.current += 1;
          setRipples((current) => [...current, newRipple]);
        }
      }

      if (onClick) {
        onClick(e);
      }
    };

    // Estilos por variante
    const variantStyles = {
      default:
        "bg-zinc-600 text-neutral-50 dark:bg-zinc-800 dark:text-neutral-200 hover:bg-zinc-700 dark:hover:bg-zinc-600 focus:ring-zinc-500",
      primary:
        "bg-blue-600 text-white dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-500 focus:ring-blue-400",
      secondary:
        "bg-purple-600 text-white dark:bg-purple-800 hover:bg-purple-700 dark:hover:bg-purple-500 focus:ring-purple-400",
      success:
        "bg-green-600 text-white dark:bg-green-800 hover:bg-green-700 dark:hover:bg-green-500 focus:ring-green-400",
      warning:
        "bg-amber-600 text-white dark:bg-amber-800 hover:bg-amber-700 dark:hover:bg-amber-500 focus:ring-amber-400",
      danger:
        "bg-red-600 text-white dark:bg-red-800 hover:bg-red-700 dark:hover:bg-red-500 focus:ring-red-400",
      outline:
        "bg-transparent border-2 border-zinc-300 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800 text-neutral-900 dark:text-neutral-100",
      ghost:
        "bg-transparent border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-neutral-900 dark:text-neutral-100",
      link: "bg-transparent border-0 underline-offset-4 hover:underline text-neutral-900 dark:text-neutral-100 hover:bg-transparent dark:hover:bg-transparent p-0 h-auto",
    };

    // Estilos por tamaño
    const sizeStyles = {
      xs: "text-xs px-2.5 py-1.5",
      sm: "text-sm px-3 py-2",
      md: "text-sm px-4 py-2",
      lg: "text-base px-5 py-2.5",
      xl: "text-lg px-6 py-3",
      icon: "p-2",
    };

    // Estilos por radio
    const radiusStyles = {
      none: "rounded-none",
      sm: "rounded-[0.25rem]",
      md: "rounded-[0.375rem]",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Construir la clase CSS combinada
    const buttonClasses = cn(
      "inline-flex items-center justify-center font-medium transition-colors duration-200",
      variant !== "link" && variant !== "ghost" && "active:shadow-inner",
      "focus:outline-none focus:ring-0",
      variant !== "link" &&
        variant !== "ghost" &&
        "focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      radiusStyles[radius],
      fullWidth && "w-full",
      withRing &&
        variant !== "link" &&
        variant !== "ghost" &&
        "ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10",
      "relative overflow-hidden",
      withArrow && "group",
      className
    );

    // Esta función maneja la referencia de manera segura
    const handleRef = (node: HTMLButtonElement | null) => {
      // Usar el forwardRef para pasar la referencia al componente padre
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      // También asignamos a nuestra ref interna
      buttonRef.current = node;
    };

    // Crear un nuevo objeto sin propiedades problemáticas
    const cleanedProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith("onDrag"))
    );

    // Estilos predeterminados para ripple
    const defaultRippleClasses = cn(
      "absolute rounded-full pointer-events-none",
      !rippleColor &&
        (variant === "outline" || variant === "ghost" || variant === "link"
          ? "bg-zinc-500 dark:bg-zinc-200 opacity-15"
          : "bg-white dark:bg-zinc-200 opacity-35")
    );

    return (
      <motion.button
        ref={handleRef}
        className={buttonClasses}
        whileTap={
          isDisabled || variant === "link" || variant === "ghost"
            ? undefined
            : { scale: 0.97 }
        }
        transition={{ duration: 0.08 }}
        disabled={isDisabled}
        onClick={handleClick}
        type={type}
        role="button"
        aria-disabled={isDisabled}
        aria-label={getAriaLabel()}
        aria-busy={isLoading}
        aria-live={isLoading ? "polite" : undefined}
        {...cleanedProps}
      >
        {/* Efectos de ripple con AnimatePresence para mejor gestión */}
        <AnimatePresence>
          {withRipple &&
            ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className={cn(defaultRippleClasses, rippleClassName)}
                style={{
                  left: ripple.x - ripple.size / 2,
                  top: ripple.y - ripple.size / 2,
                  width: ripple.size,
                  height: ripple.size,
                  backgroundColor: rippleColor,
                  opacity: rippleColor ? 0.25 : undefined,
                }}
                initial={{
                  opacity: rippleColor
                    ? 0.25
                    : variant === "outline" ||
                      variant === "ghost" ||
                      variant === "link"
                    ? 0.25
                    : 0.35,
                  scale: 0,
                  zIndex: 1,
                }}
                animate={{ opacity: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                aria-hidden="true"
              />
            ))}
        </AnimatePresence>

        {isLoading && (
          <>
            <Loader2
              className={cn("mr-2 h-4 w-4 animate-spin", loaderClassName)}
              aria-hidden="true"
            />
            <span className="sr-only" role="status" id={loaderId}>
              {loadingText}
            </span>
          </>
        )}

        {!isLoading && leftIcon && (
          <span
            className={cn("mr-2 relative z-10", leftIconClassName)}
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <span
          className={cn(
            "relative z-10",
            (withArrow || rightIcon) && "mr-1",
            contentClassName
          )}
        >
          {children}
        </span>

        {!isLoading && withArrow && (
          <span
            className={cn(
              "ml-1 relative z-10 transition-transform duration-200 group-hover:translate-x-1",
              arrowClassName
            )}
            aria-hidden="true"
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        )}

        {!isLoading && rightIcon && !withArrow && (
          <span
            className={cn("ml-2 relative z-10", rightIconClassName)}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
