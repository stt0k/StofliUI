"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Definición de clases para las diferentes variantes
const variantClasses = {
  default:
    "bg-zinc-400 text-neutral-50 dark:bg-zinc-800 dark:text-neutral-200 hover:bg-zinc-800 dark:hover:bg-zinc-600",
  primary:
    "bg-blue-400 text-white dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-500",
  secondary:
    "bg-purple-400 text-white dark:bg-purple-800 hover:bg-purple-600 dark:hover:bg-purple-500",
  success:
    "bg-green-400 text-white dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-500",
  warning:
    "bg-amber-400 text-white dark:bg-amber-800 hover:bg-amber-600 dark:hover:bg-amber-500",
  danger:
    "bg-red-400 text-white dark:bg-red-800 hover:bg-red-600 dark:hover:bg-red-500",
  outline:
    "border-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

const sizeClasses = {
  sm: "h-5 px-2 text-xs",
  md: "h-6 px-2.5",
  lg: "h-7 px-3",
};

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-[0.25rem]",
  md: "rounded-[0.375rem]",
  full: "rounded-full",
};

const withDotClasses = {
  true: "pl-1.5",
  false: "",
};

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  dotClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  dotColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  dismissible?: boolean;
  ariaLabel?: string;
  dotAriaLabel?: string;
  dismissAriaLabel?: string;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  radius?: keyof typeof radiusClasses;
  withDot?: boolean;
  id?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      className = "",
      dotClassName = "",
      iconClassName = "",
      contentClassName = "",
      variant = "default",
      size = "md",
      radius = "full",
      withDot = false,
      dotColor,
      icon,
      onClick,
      dismissible = false,
      ariaLabel,
      dotAriaLabel = "Indicador de estado",
      dismissAriaLabel = "Eliminar badge",
      id,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    // Generar IDs únicos usando useId
    const uniqueId = useId();
    const baseId = id || `badge-${uniqueId.replace(/:/g, "")}`;
    const dotId = withDot ? `${baseId}-dot` : undefined;
    const iconId = icon ? `${baseId}-icon` : undefined;
    const contentId = `${baseId}-content`;
    const dismissId = dismissible ? `${baseId}-dismiss` : undefined;

    if (!isVisible) return null;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (dismissible) {
        e.preventDefault();
        setIsVisible(false);
      }
      onClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(e as unknown as React.MouseEvent<HTMLElement>);
      }
    };

    const getAriaAttributes = () => {
      if (dismissible || onClick) {
        return {
          role: "button",
          tabIndex: 0,
          "aria-label":
            ariaLabel || (typeof children === "string" ? children : undefined),
          "aria-pressed": undefined,
          onKeyDown: handleKeyDown,
          id: baseId,
          "aria-controls": dismissible ? dismissId : undefined,
        };
      }
      return {
        role: "status",
        "aria-label": ariaLabel,
        id: baseId,
      };
    };

    const ariaAttributes = getAriaAttributes();

    // Clases base para el badge
    const baseClasses =
      "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";

    // Clases condicionales para el cursor
    const cursorClasses = dismissible || onClick ? "cursor-pointer" : "";

    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          radiusClasses[radius],
          withDot ? withDotClasses.true : withDotClasses.false,
          cursorClasses,
          className
        )}
        onClick={onClick || dismissible ? handleClick : undefined}
        {...ariaAttributes}
      >
        {withDot && (
          <div
            id={dotId}
            className={cn(
              "w-2 h-2 rounded-full mr-1.5",
              dotColor ||
                (variant === "outline"
                  ? "bg-zinc-500 dark:bg-zinc-400"
                  : "bg-white dark:bg-white"),
              dotClassName
            )}
            role="presentation"
            aria-label={dotAriaLabel}
            aria-hidden="true"
          />
        )}
        {icon && (
          <span
            id={iconId}
            className={cn("mr-1", iconClassName)}
            role="presentation"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span id={contentId} className={cn(contentClassName)}>
          {children}
        </span>
        {dismissible && (
          <span
            id={dismissId}
            className="sr-only"
            role="alert"
            aria-live="polite"
          >
            {dismissAriaLabel}
          </span>
        )}
      </motion.div>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
