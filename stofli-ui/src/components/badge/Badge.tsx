"use client";

import React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-400 text-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-800 dark:hover:bg-zinc-600",
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
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-2.5",
        lg: "h-7 px-3",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-[0.25rem]",
        md: "rounded-[0.375rem]",
        full: "rounded-full",
      },
      withDot: {
        true: "pl-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "full",
      withDot: false,
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
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
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

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
          "aria-label": ariaLabel || (typeof children === "string" ? children : undefined),
          "aria-pressed": undefined,
          onKeyDown: handleKeyDown,
        };
      }
      return {
        role: "status",
        "aria-label": ariaLabel,
      };
    };

    const ariaAttributes = getAriaAttributes();

    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={cn(
          badgeVariants({ variant, size, radius, withDot }),
          className,
          (dismissible || onClick) && "cursor-pointer"
        )}
        onClick={onClick || dismissible ? handleClick : undefined}
        {...ariaAttributes}
      >
        {withDot && (
          <div
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
            className={cn("mr-1", iconClassName)}
            role="presentation"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span className={contentClassName}>{children}</span>
        {dismissible && (
          <span
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
