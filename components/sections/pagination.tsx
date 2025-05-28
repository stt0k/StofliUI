"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  siblingsCount?: number;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  withNumbers?: boolean;
  withEdges?: boolean;
  withText?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  customText?: {
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
    pageLabel?: string;
    navigationLabel?: string;
    statusText?: string;
  };
  showPrevious?: boolean;
  showNext?: boolean;
  navButtonClassName?: string;
  activePageClassName?: string;
  pageButtonClassName?: string;
  ellipsisClassName?: string;
  indicatorClassName?: string;
  numbersContainerClassName?: string;
  id?: string;
  "aria-label"?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  onPageChange,
  siblingsCount = 1,
  variant = "default",
  size = "md",
  withNumbers = true,
  withEdges = false,
  withText = false,
  disabled = false,
  className = "",
  fullWidth = false,
  customText = {
    previous: "Anterior",
    next: "Siguiente",
    first: "Primera",
    last: "Última",
    pageLabel: "Página",
    navigationLabel: "Paginación",
    statusText: "Página {current} de {total}",
  },
  showPrevious = true,
  showNext = true,
  navButtonClassName,
  activePageClassName,
  pageButtonClassName,
  ellipsisClassName,
  indicatorClassName,
  numbersContainerClassName,
  id,
  "aria-label": ariaLabel,
}) => {
  const [page, setPage] = useState(currentPage);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
  });
  const [announcement, setAnnouncement] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const uniqueIdBase = useId();
  const uniqueId = `pagination-${uniqueIdBase.replace(/:/g, "")}`;
  const instanceId = id || uniqueId;
  const liveRegionId = `${instanceId}-live`;
  const paginationLabel = ariaLabel || customText.navigationLabel || "Paginación";

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // Limpiar anuncios después de ser leídos
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  // Anunciar cambio de página
  const announcePageChange = (newPage: number) => {
    const statusText = customText.statusText || "Página {current} de {total}";
    const message = statusText
      .replace("{current}", newPage.toString())
      .replace("{total}", totalPages.toString());
    setAnnouncement(message);
  };

  // Actualizar la posición del indicador cuando cambia la página activa
  useEffect(() => {
    if (withNumbers && buttonsRef.current[page]) {
      const buttonElement = buttonsRef.current[page];
      if (buttonElement) {
        setIndicatorStyle({
          left: buttonElement.offsetLeft || 0,
          width: buttonElement.offsetWidth || 0,
          top: 0,
          height: buttonElement.offsetHeight || 0,
        });
      }
    }
  }, [page, withNumbers]);

  // Manejar navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        if (page < totalPages) {
          handlePageChange(page + 1);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (page > 1) {
          handlePageChange(page - 1);
        }
        break;
      case "Home":
        e.preventDefault();
        handlePageChange(1);
        break;
      case "End":
        e.preventDefault();
        handlePageChange(totalPages);
        break;
      case "PageUp":
        e.preventDefault();
        const prevPage = Math.max(1, page - 5);
        handlePageChange(prevPage);
        break;
      case "PageDown":
        e.preventDefault();
        const nextPage = Math.min(totalPages, page + 5);
        handlePageChange(nextPage);
        break;
    }
  };

  const variantClasses = {
    default:
      "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:bg-zinc-300 dark:active:bg-zinc-600 transition-colors duration-150",
    primary:
      "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/60 active:bg-blue-200 dark:active:bg-blue-700 transition-colors duration-150",
    secondary:
      "bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-800/60 active:bg-purple-200 dark:active:bg-purple-700 transition-colors duration-150",
    success:
      "bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-800/60 active:bg-green-200 dark:active:bg-green-700 transition-colors duration-150",
    warning:
      "bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-800/60 active:bg-amber-200 dark:active:bg-amber-700 transition-colors duration-150",
    danger:
      "bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-800/60 active:bg-red-200 dark:active:bg-red-700 transition-colors duration-150",
  };

  // Color de fondo para el indicador basado en la variante activa
  const indicatorBgClasses = {
    default: "bg-zinc-200 dark:bg-zinc-700",
    primary: "bg-blue-100 dark:bg-blue-900/50",
    secondary: "bg-purple-100 dark:bg-purple-900/50",
    success: "bg-green-100 dark:bg-green-900/50",
    warning: "bg-amber-100 dark:bg-amber-900/50",
    danger: "bg-red-100 dark:bg-red-900/50",
  };

  // Color de borde para el indicador basado en la variante activa
  const indicatorBorderClasses = {
    default: "border-zinc-400 dark:border-zinc-500",
    primary: "border-blue-400 dark:border-blue-500",
    secondary: "border-purple-400 dark:border-purple-500",
    success: "border-green-400 dark:border-green-500",
    warning: "border-amber-400 dark:border-amber-500",
    danger: "border-red-400 dark:border-red-500",
  };

  // Color de texto para la página activa según variante
  const activeTextClasses = {
    default: "text-zinc-900 dark:text-white",
    primary: "text-blue-700 dark:text-blue-300",
    secondary: "text-purple-700 dark:text-purple-300",
    success: "text-green-700 dark:text-green-300",
    warning: "text-amber-700 dark:text-amber-300",
    danger: "text-red-700 dark:text-red-300",
  };

  const sizeClasses = {
    sm: "h-7 min-w-7 min-h-[28px] text-xs",
    md: "h-9 min-w-9 min-h-[36px] text-sm",
    lg: "h-11 min-w-11 min-h-[44px]",
  };

  const buttonClasses =
    "flex items-center justify-center border rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  const handlePageChange = (newPage: number) => {
    if (disabled || newPage === page || newPage < 1 || newPage > totalPages)
      return;

    setPage(newPage);
    onPageChange?.(newPage);
    announcePageChange(newPage);
  };

  const renderPageButtons = () => {
    const range = (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(siblingsCount + 1, totalPages));
    const endPages = range(
      Math.max(totalPages - siblingsCount, siblingsCount + 2),
      totalPages
    );

    const siblingsStart = Math.max(
      Math.min(page - siblingsCount, totalPages - siblingsCount * 2 - 1),
      siblingsCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingsCount, siblingsCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 1 : totalPages
    );

    const pageNumbers = [
      1,
      ...startPages,
      ...range(siblingsStart, siblingsEnd),
      ...endPages,
      totalPages,
    ];

    const uniquePageNumbers = Array.from(new Set(pageNumbers)).sort(
      (a, b) => a - b
    );

    const items: (number | string)[] = [];
    let prev: number | null = null;

    for (const item of uniquePageNumbers) {
      if (prev !== null && item - prev > 1) {
        items.push("ellipsis");
      }
      items.push(item);
      prev = item;
    }

    return items.map((item, index) => {
      if (item === "ellipsis") {
        return (
          <div
            key={`ellipsis-${index}`}
            className={cn(
              sizeClasses[size],
              "px-1 flex items-center justify-center",
              ellipsisClassName
            )}
            aria-hidden="true"
          >
            <MoreHorizontal size={iconSizes[size]} />
          </div>
        );
      }

      const isActive = page === item;
      const numericItem = item as number;
      const pageLabel = customText.pageLabel || "Página";

      return (
        <button
          key={`page-${item}`}
          ref={(el) => {
            if (typeof item === "number") buttonsRef.current[item] = el;
          }}
          type="button"
          disabled={disabled}
          onClick={() => handlePageChange(numericItem)}
          className={cn(
            buttonClasses,
            sizeClasses[size],
            "px-3 relative",
            isActive
              ? cn(
                  activeTextClasses[variant],
                  "font-semibold z-20",
                  activePageClassName
                )
              : variantClasses[variant],
            isActive && "border-transparent bg-transparent",
            pageButtonClassName
          )}
          aria-current={isActive ? "page" : undefined}
          aria-label={`${pageLabel} ${numericItem}${isActive ? " (página actual)" : ""}`}
          tabIndex={0}
        >
          {item}
        </button>
      );
    });
  };

  // Verifica si hay contenido para mostrar
  const hasContent = withNumbers || showPrevious || showNext;

  // Determinar si se debe aplicar el espacio entre elementos
  // Solo aplicar justify-between si ambos botones de navegación están visibles
  const justifyClass = fullWidth
    ? showPrevious && showNext
      ? "justify-between"
      : showPrevious
      ? "justify-start"
      : "justify-end"
    : "justify-center";

  if (!hasContent) return null;

  const statusText = customText.statusText || "Página {current} de {total}";
  const currentStatusText = statusText
    .replace("{current}", page.toString())
    .replace("{total}", totalPages.toString());

  return (
    <nav
      ref={navRef}
      id={instanceId}
      role="navigation"
      aria-label={paginationLabel}
      className={cn(
        "flex items-center gap-1 flex-wrap",
        fullWidth && "w-full",
        justifyClass,
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {/* Región live para anuncios de accesibilidad */}
      <div
        id={liveRegionId}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      {/* Estado actual visible solo para lectores de pantalla */}
      <div className="sr-only" aria-live="polite">
        {currentStatusText}
      </div>

      {withEdges && showPrevious && (
        <button
          type="button"
          disabled={page === 1 || disabled}
          className={cn(
            buttonClasses,
            sizeClasses[size],
            variantClasses[variant],
            "gap-1",
            navButtonClassName
          )}
          onClick={() => handlePageChange(1)}
          aria-label="Primera página"
          tabIndex={0}
        >
          <span className="flex items-center">
            <ChevronLeft size={iconSizes[size]} aria-hidden="true" />
            <ChevronLeft size={iconSizes[size]} className="-ml-3" aria-hidden="true" />
            {withText && <span className="mx-1">{customText.first}</span>}
          </span>
        </button>
      )}

      {showPrevious && (
        <button
          type="button"
          disabled={page === 1 || disabled}
          className={cn(
            buttonClasses,
            sizeClasses[size],
            variantClasses[variant],
            withText && "px-2",
            navButtonClassName
          )}
          onClick={() => handlePageChange(page - 1)}
          aria-label="Página anterior"
          tabIndex={0}
        >
          <span className="flex items-center">
            <ChevronLeft size={iconSizes[size]} aria-hidden="true" />
            {withText && <span className="ml-1">{customText.previous}</span>}
          </span>
        </button>
      )}

      {withNumbers && (
        <div
          className={cn(
            "relative flex flex-wrap items-center gap-1",
            numbersContainerClassName
          )}
          role="group"
          aria-label="Páginas"
        >
          {/* Indicador animado que se mueve ENCIMA de los botones */}
          <motion.div
            className={cn(
              "absolute rounded-md border shadow-sm z-10",
              indicatorBgClasses[variant],
              indicatorBorderClasses[variant],
              indicatorClassName
            )}
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: indicatorStyle.height,
              top: indicatorStyle.top,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            aria-hidden="true"
          />
          {renderPageButtons()}
        </div>
      )}

      {showNext && (
        <button
          type="button"
          disabled={page === totalPages || disabled}
          className={cn(
            buttonClasses,
            sizeClasses[size],
            variantClasses[variant],
            withText && "px-2",
            navButtonClassName
          )}
          onClick={() => handlePageChange(page + 1)}
          aria-label="Página siguiente"
          tabIndex={0}
        >
          <span className="flex items-center">
            {withText && <span className="mr-1">{customText.next}</span>}
            <ChevronRight size={iconSizes[size]} aria-hidden="true" />
          </span>
        </button>
      )}

      {withEdges && showNext && (
        <button
          type="button"
          disabled={page === totalPages || disabled}
          className={cn(
            buttonClasses,
            sizeClasses[size],
            variantClasses[variant],
            "gap-1",
            navButtonClassName
          )}
          onClick={() => handlePageChange(totalPages)}
          aria-label="Última página"
          tabIndex={0}
        >
          <span className="flex items-center">
            {withText && <span className="mx-1">{customText.last}</span>}
            <ChevronRight size={iconSizes[size]} aria-hidden="true" />
            <ChevronRight size={iconSizes[size]} className="-ml-3" aria-hidden="true" />
          </span>
        </button>
      )}
    </nav>
  );
};

export default Pagination;
