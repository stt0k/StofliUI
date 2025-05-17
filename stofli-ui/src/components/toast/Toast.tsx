"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {  cn  } from "../../lib/utils";

export interface ToastProps {
  id?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  duration?: number;
  showCloseButton?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  containerClassName?: string;
  toastClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconContainerClassName?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
}

const Toast: React.FC<ToastProps> = ({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  variant = "default",
  position = "bottom-right",
  duration = 5000,
  showCloseButton = true,
  className = "",
  children,
  icon,
  containerClassName = "",
  toastClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  iconContainerClassName = "",
  contentClassName = "",
  closeButtonClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMounted, setIsMounted] = useState(false);

  // Sincronizar estado controlado y no controlado
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Auto-cerrar después de duración
  useEffect(() => {
    if (!isOpen || duration === Number.POSITIVE_INFINITY) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const variantClasses = {
    default:
      "bg-gradient-to-r from-zinc-300/90 to-zinc-400/90 dark:from-zinc-800/90 dark:to-zinc-700/90 text-zinc-800 dark:text-zinc-100 border border-zinc-400/30 dark:border-zinc-600/30 backdrop-blur-sm shadow-sm",
    primary:
      "bg-gradient-to-r from-blue-400/90 to-blue-500/90 dark:from-blue-900/90 dark:to-blue-800/90 text-white dark:text-blue-50 border border-blue-500/30 dark:border-blue-700/30 backdrop-blur-sm shadow-sm",
    secondary:
      "bg-gradient-to-r from-purple-400/90 to-purple-500/90 dark:from-purple-900/90 dark:to-purple-800/90 text-white dark:text-purple-50 border border-purple-500/30 dark:border-purple-700/30 backdrop-blur-sm shadow-sm",
    success:
      "bg-gradient-to-r from-green-400/90 to-green-500/90 dark:from-green-900/90 dark:to-green-800/90 text-white dark:text-green-50 border border-green-500/30 dark:border-green-700/30 backdrop-blur-sm shadow-sm",
    warning:
      "bg-gradient-to-r from-amber-400/90 to-amber-500/90 dark:from-amber-900/90 dark:to-amber-800/90 text-white dark:text-amber-50 border border-amber-500/30 dark:border-amber-700/30 backdrop-blur-sm shadow-sm",
    danger:
      "bg-gradient-to-r from-red-400/90 to-red-500/90 dark:from-red-900/90 dark:to-red-800/90 text-white dark:text-red-50 border border-red-500/30 dark:border-red-700/30 backdrop-blur-sm shadow-sm",
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: position.includes("top") ? -20 : 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: position.includes("top") ? -20 : 20,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={containerClassName || cn("max-w-sm", className)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <div
            className={cn(
              "rounded-lg border px-4 py-3 shadow-lg",
              toastClassName ? toastClassName : variantClasses[variant]
            )}
          >
            <div className={cn("flex items-start gap-3")}>
              {icon && (
                <div className={iconContainerClassName || "shrink-0 mt-0.5"}>
                  {icon}
                </div>
              )}
              <div className={contentClassName || "flex-1 mr-2"}>
                {title && (
                  <h4 className={titleClassName || "font-medium mb-1"}>
                    {title}
                  </h4>
                )}
                {description && (
                  <p className={descriptionClassName || "text-sm opacity-90"}>
                    {description}
                  </p>
                )}
                {children}
              </div>
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className={closeButtonClassName || "shrink-0 opacity-70 hover:opacity-100 transition-opacity"}
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente de contexto y hook para facilitar el uso
interface ToastContextType {
  open: (
    props: Omit<ToastProps, "open" | "defaultOpen" | "onOpenChange" | "id">
  ) => void;
  close: (id?: string) => void;
}

interface ToastItem extends ToastProps {
  id: string;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  containerClassName?: string;
}> = ({ children, containerClassName }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    props: Omit<ToastProps, "open" | "defaultOpen" | "onOpenChange" | "id">
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...props, id, open: true }]);

    if (props.duration !== Number.POSITIVE_INFINITY) {
      const duration = props.duration || 5000;
      setTimeout(() => {
        closeToast(id);
      }, duration);
    }
  };

  const closeToast = (id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    } else {
      setToasts([]);
    }
  };

  const groupedToasts: Record<string, ToastItem[]> = {};

  toasts.forEach((toast) => {
    const position = toast.position || "bottom-right";
    if (!groupedToasts[position]) {
      groupedToasts[position] = [];
    }
    groupedToasts[position].push(toast);
  });

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <ToastContext.Provider value={{ open: showToast, close: closeToast }}>
      {children}

      {Object.entries(groupedToasts).map(([position, positionToasts]) => {
        // Reverse the array for bottom positions to ensure correct stacking
        const isBottomPosition = position.startsWith("bottom");
        const displayToasts = isBottomPosition
          ? [...positionToasts].reverse()
          : positionToasts;

        return (
          <div
            key={position}
            className={cn(
              "fixed z-50 flex flex-col gap-2",
              positionClasses[position as keyof typeof positionClasses],
              containerClassName
            )}
            style={{
              maxHeight: "100vh",
              overflow: "hidden",
            }}
          >
            {displayToasts.map((toast, index) => (
              <div
                key={toast.id}
                className="relative"
                style={{
                  zIndex: displayToasts.length - index,
                }}
              >
                <Toast
                  {...toast}
                  onOpenChange={() => closeToast(toast.id)}
                  className="shadow-lg"
                />
              </div>
            ))}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};

export default Toast;
