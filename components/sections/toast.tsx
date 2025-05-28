"use client";

import React, { useState, useEffect, useRef, useCallback, useId, useContext } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  role?: "status" | "alert";
  important?: boolean;
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
  role = "status",
  important = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMounted, setIsMounted] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);

  // Memoizar la función handleClose para evitar recreaciones
  const handleClose = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

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

  // Auto-cerrar después de duración, solo si el toast no tiene foco
  useEffect(() => {
    if (!isOpen || duration === Number.POSITIVE_INFINITY) return;

    let timer: NodeJS.Timeout;
    
    const startTimer = () => {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    };

    // Iniciar temporizador
    startTimer();

    // Pausar el temporizador cuando el toast tiene foco o el mouse está encima
    const handleFocus = () => clearTimeout(timer);
    const handleBlur = () => startTimer();
    const handleMouseEnter = () => clearTimeout(timer);
    const handleMouseLeave = () => startTimer();

    const toastElement = toastRef.current;
    if (toastElement) {
      toastElement.addEventListener('focus', handleFocus, true);
      toastElement.addEventListener('blur', handleBlur, true);
      toastElement.addEventListener('mouseenter', handleMouseEnter);
      toastElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearTimeout(timer);
      if (toastElement) {
        toastElement.removeEventListener('focus', handleFocus, true);
        toastElement.removeEventListener('blur', handleBlur, true);
        toastElement.removeEventListener('mouseenter', handleMouseEnter);
        toastElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isOpen, duration, handleClose]);

  // Manejo de teclado para el toast
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  const variantClasses = {
    default:
      "bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800/90 dark:to-zinc-700/90 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700/50 backdrop-blur-sm shadow-sm",
    primary:
      "bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-800/90 dark:to-blue-700/90 text-white dark:text-blue-50 border border-blue-400 dark:border-blue-700/50 backdrop-blur-sm shadow-sm",
    secondary:
      "bg-gradient-to-r from-purple-400 to-purple-500 dark:from-purple-800/90 dark:to-purple-700/90 text-white dark:text-purple-50 border border-purple-400 dark:border-purple-700/50 backdrop-blur-sm shadow-sm",
    success:
      "bg-gradient-to-r from-green-400 to-green-500 dark:from-green-800/90 dark:to-green-700/90 text-white dark:text-green-50 border border-green-400 dark:border-green-700/50 backdrop-blur-sm shadow-sm",
    warning:
      "bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-800/90 dark:to-amber-700/90 text-white dark:text-amber-50 border border-amber-400 dark:border-amber-700/50 backdrop-blur-sm shadow-sm",
    danger:
      "bg-gradient-to-r from-red-400 to-red-500 dark:from-red-800/90 dark:to-red-700/90 text-white dark:text-red-50 border border-red-400 dark:border-red-700/50 backdrop-blur-sm shadow-sm",
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

  // Determinar título para lectores de pantalla basado en variante
  const getAriaTitle = () => {
    const baseTitle = title || "";
    const variantName = {
      "default": "",
      "primary": "Información: ",
      "secondary": "Nota: ",
      "success": "Éxito: ",
      "warning": "Advertencia: ",
      "danger": "Error: "
    };
    
    return `${variantName[variant]}${baseTitle}`;
  };

  // Dividir las clases por tipo
  const baseClasses = "rounded-lg border px-4 py-3 shadow-lg";

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
          ref={toastRef}
          tabIndex={0}
          role={role}
          aria-atomic="true"
          aria-live={important ? "assertive" : "polite"}
          aria-label={getAriaTitle()}
          onKeyDown={handleKeyDown}
        >
          <div
            className={cn(
              baseClasses,
              // Si hay toastClassName, no aplicar estilos de variante
              toastClassName ? "" : variantClasses[variant],
              toastClassName
            )}
          >
            <div className={cn("flex items-start gap-3")}>
              {icon && (
                <div className={cn("shrink-0 mt-0.5", iconContainerClassName)} aria-hidden="true">
                  {icon}
                </div>
              )}
              <div className={cn("flex-1 mr-2", contentClassName)}>
                {title && (
                  <h4 className={cn("font-medium mb-1", titleClassName)}>
                    {title}
                  </h4>
                )}
                {description && (
                  <p className={cn("text-sm opacity-90", descriptionClassName)}>
                    {description}
                  </p>
                )}
                {children}
              </div>
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className={cn(
                    "shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1 rounded-full",
                    "hover:bg-white/20",
                    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    "dark:focus-visible:ring-offset-zinc-900 focus-visible:ring-zinc-500",
                    "dark:focus-visible:ring-zinc-400 outline-none",
                    closeButtonClassName
                  )}
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
  const toastIdBase = useId();

  const showToast = (
    props: Omit<ToastProps, "open" | "defaultOpen" | "onOpenChange" | "id">
  ) => {
    const uniqueId = `toast-${toastIdBase}-${toasts.length}`;
    
    // Determinar automáticamente el role basado en la variante
    let role: "status" | "alert" = props.role || "status";
    if (!props.role) {
      if (props.variant === "danger" || props.variant === "warning") {
        role = "alert";
      }
    }
    
    setToasts((prev) => [...prev, { ...props, id: uniqueId, open: true, role }]);

    if (props.duration !== Number.POSITIVE_INFINITY) {
      const duration = props.duration || 5000;
      setTimeout(() => {
        closeToast(uniqueId);
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

  // Asegurar que los toasts no bloqueen el contenido WCAG 2.1 SC 2.2.1
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && toasts.length > 0) {
        // Cerrar el último toast
        const lastToastId = toasts[toasts.length - 1].id;
        closeToast(lastToastId);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [toasts]);

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
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};

export default Toast;
