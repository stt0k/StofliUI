"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

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
}) => {
  const [page, setPage] = useState(currentPage);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
  });

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

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

  const variantClasses = {
    default:
      "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700",
    primary:
      "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 active:bg-blue-100 dark:active:bg-blue-800/50",
    secondary:
      "bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 active:bg-purple-100 dark:active:bg-purple-800/50",
    success:
      "bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 active:bg-green-100 dark:active:bg-green-800/50",
    warning:
      "bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/30 active:bg-amber-100 dark:active:bg-amber-800/50",
    danger:
      "bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 active:bg-red-100 dark:active:bg-red-800/50",
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
    sm: "h-7 min-w-7 text-xs",
    md: "h-9 min-w-9 text-sm",
    lg: "h-11 min-w-11",
  };

  const buttonClasses = `
    flex items-center justify-center 
    border rounded-md transition-colors duration-200
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `;

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
            className={`${sizeClasses[size]} px-1 flex items-center justify-center`}
          >
            <MoreHorizontal size={iconSizes[size]} />
          </div>
        );
      }

      const isActive = page === item;
      const numericItem = item as number;

      return (
        <button
          key={`page-${item}`}
          ref={(el) => {
            if (typeof item === "number") buttonsRef.current[item] = el;
          }}
          type="button"
          disabled={disabled}
          onClick={() => handlePageChange(numericItem)}
          className={`${buttonClasses} ${sizeClasses[size]} px-3 relative
            ${
              isActive
                ? `${activeTextClasses[variant]} font-semibold z-20`
                : variantClasses[variant]
            }
            ${isActive ? "border-transparent bg-transparent" : ""}
          `}
          aria-current={isActive ? "page" : undefined}
        >
          {item}
        </button>
      );
    });
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={`flex flex-wrap items-center justify-center gap-1 ${className}`}
    >
      {withEdges && (
        <button
          type="button"
          disabled={page === 1 || disabled}
          className={`${buttonClasses} ${sizeClasses[size]} ${variantClasses[variant]} gap-1`}
          onClick={() => handlePageChange(1)}
          aria-label="Primera página"
        >
          <span className="flex items-center">
            <ChevronLeft size={iconSizes[size]} />
            <ChevronLeft size={iconSizes[size]} className="-ml-3" />
            {withText && <span className="mx-1">Primera</span>}
          </span>
        </button>
      )}

      <button
        type="button"
        disabled={page === 1 || disabled}
        className={`${buttonClasses} ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${withText ? "px-2" : ""}`}
        onClick={() => handlePageChange(page - 1)}
        aria-label="Página anterior"
      >
        <span className="flex items-center">
          <ChevronLeft size={iconSizes[size]} />
          {withText && <span className="ml-1">Anterior</span>}
        </span>
      </button>

      {withNumbers && (
        <div className="relative flex flex-wrap items-center gap-1">
          {/* Indicador animado que se mueve ENCIMA de los botones */}
          <motion.div
            className={`absolute rounded-md border ${indicatorBgClasses[variant]} shadow-sm ${indicatorBorderClasses[variant]} z-10`}
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
          />
          {renderPageButtons()}
        </div>
      )}

      <button
        type="button"
        disabled={page === totalPages || disabled}
        className={`${buttonClasses} ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${withText ? "px-2" : ""}`}
        onClick={() => handlePageChange(page + 1)}
        aria-label="Página siguiente"
      >
        <span className="flex items-center">
          {withText && <span className="mr-1">Siguiente</span>}
          <ChevronRight size={iconSizes[size]} />
        </span>
      </button>

      {withEdges && (
        <button
          type="button"
          disabled={page === totalPages || disabled}
          className={`${buttonClasses} ${sizeClasses[size]} ${variantClasses[variant]} gap-1`}
          onClick={() => handlePageChange(totalPages)}
          aria-label="Última página"
        >
          <span className="flex items-center">
            {withText && <span className="mx-1">Última</span>}
            <ChevronRight size={iconSizes[size]} />
            <ChevronRight size={iconSizes[size]} className="-ml-3" />
          </span>
        </button>
      )}
    </nav>
  );
};

export default Pagination;
