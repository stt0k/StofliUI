"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

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
        "bg-zinc-600 text-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-600 focus:ring-zinc-500",
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
        "bg-transparent border-2 border-zinc-300 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
      ghost:
        "bg-transparent border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
      link: "bg-transparent border-0 underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-100 hover:bg-transparent dark:hover:bg-transparent p-0 h-auto",
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
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: size === "icon" ? "rounded-full" : "rounded-xl",
    };

    // Construir la clase CSS combinada
    const buttonClasses = twMerge(
      `
      inline-flex items-center justify-center font-medium transition-colors duration-200
      ${variant !== "link" && variant !== "ghost" ? "active:shadow-inner" : ""}
      focus:outline-none focus:ring-0 ${
        variant !== "link" && variant !== "ghost"
          ? "focus-visible:ring-2 focus-visible:ring-offset-2"
          : ""
      }
      disabled:opacity-50 disabled:pointer-events-none
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${radiusStyles[radius]}
      ${fullWidth ? "w-full" : ""}
      ${
        withRing && variant !== "link" && variant !== "ghost"
          ? "ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10"
          : ""
      }
      relative overflow-hidden
    `,
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
    const defaultRippleClasses = !rippleColor
      ? `absolute rounded-full pointer-events-none ${
          variant === "outline" || variant === "ghost" || variant === "link"
            ? "bg-zinc-500 dark:bg-zinc-200 opacity-15"
            : "bg-white dark:bg-zinc-200 opacity-35"
        }`
      : "absolute rounded-full pointer-events-none";

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
        {...cleanedProps}
      >
        {/* Efectos de ripple con AnimatePresence para mejor gestión */}
        <AnimatePresence>
          {withRipple &&
            ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className={twMerge(defaultRippleClasses, rippleClassName)}
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
              />
            ))}
        </AnimatePresence>

        {isLoading && (
          <Loader2
            className={twMerge("mr-2 h-4 w-4 animate-spin", loaderClassName)}
          />
        )}

        {!isLoading && leftIcon && (
          <span className={twMerge("mr-2 relative z-10", leftIconClassName)}>
            {leftIcon}
          </span>
        )}

        <span
          className={twMerge(
            `${withArrow || rightIcon ? "mr-1" : ""} z-10 relative`,
            contentClassName
          )}
        >
          {children}
        </span>

        {!isLoading && withArrow && (
          <motion.span
            className={twMerge("ml-1 relative z-10", arrowClassName)}
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        )}

        {!isLoading && rightIcon && !withArrow && (
          <span className={twMerge("ml-2 relative z-10", rightIconClassName)}>
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
