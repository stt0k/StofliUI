"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { twMerge } from "tailwind-merge";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  homeIcon?: boolean;
  className?: string;
  olClassName?: string;
  itemClassName?: string;
  separatorClassName?: string;
  homeIconClassName?: string;
  currentItemClassName?: string;
  linkClassName?: string;
  clickable?: boolean;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <ChevronRight className="h-4 w-4" />,
  homeIcon = false,
  className = "",
  olClassName = "",
  itemClassName = "",
  separatorClassName = "",
  homeIconClassName = "",
  currentItemClassName = "",
  linkClassName = "",
  clickable = false,
  variant = "default",
  size = "md",
}) => {
  const variantClasses = {
    default:
      "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
    primary:
      "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200",
    secondary:
      "text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-200",
    success:
      "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200",
    warning:
      "text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200",
    danger:
      "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200",
  };

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const currentClasses = {
    default: "text-zinc-800 dark:text-zinc-200 font-medium",
    primary: "text-blue-700 dark:text-blue-300 font-medium",
    secondary: "text-purple-700 dark:text-purple-300 font-medium",
    success: "text-green-700 dark:text-green-300 font-medium",
    warning: "text-amber-700 dark:text-amber-300 font-medium",
    danger: "text-red-700 dark:text-red-300 font-medium",
  };

  const nonCurrentClasses = {
    default: "text-zinc-500 dark:text-zinc-400",
    primary: "text-blue-500 dark:text-blue-400",
    secondary: "text-purple-500 dark:text-purple-400",
    success: "text-green-500 dark:text-green-400",
    warning: "text-amber-500 dark:text-amber-400",
    danger: "text-red-500 dark:text-red-400",
  };

  const separatorClasses = {
    default: "text-zinc-400 dark:text-zinc-600",
    primary: "text-blue-300 dark:text-blue-700",
    secondary: "text-purple-300 dark:text-purple-700",
    success: "text-green-300 dark:text-green-700",
    warning: "text-amber-300 dark:text-amber-700",
    danger: "text-red-300 dark:text-red-700",
  };

  return (
    <nav
      className={twMerge(`flex items-center ${sizeClasses[size]}`, className)}
      aria-label="Breadcrumbs"
    >
      <ol className={twMerge("flex items-center flex-wrap", olClassName)}>
        {homeIcon && (
          <li className={twMerge("flex items-center", itemClassName)}>
            {clickable ? (
              <Link
                href="/"
                className={twMerge(
                  `flex items-center ${variantClasses[variant]}`,
                  linkClassName,
                  homeIconClassName
                )}
              >
                <Home
                  className={twMerge(
                    `h-4 w-4 ${
                      sizeClasses[size] === "text-xs"
                        ? "h-3 w-3"
                        : sizeClasses[size] === "text-base"
                        ? "h-5 w-5"
                        : ""
                    }`,
                    homeIconClassName
                  )}
                />
                <span className="sr-only">Inicio</span>
              </Link>
            ) : (
              <span
                className={twMerge(
                  `flex items-center ${nonCurrentClasses[variant]}`,
                  homeIconClassName
                )}
              >
                <Home
                  className={`h-4 w-4 ${
                    sizeClasses[size] === "text-xs"
                      ? "h-3 w-3"
                      : sizeClasses[size] === "text-base"
                      ? "h-5 w-5"
                      : ""
                  }`}
                />
                <span className="sr-only">Inicio</span>
              </span>
            )}
            <div
              className={twMerge(
                `flex items-center justify-center w-8 ${separatorClasses[variant]}`,
                separatorClassName
              )}
              aria-hidden="true"
            >
              {separator}
            </div>
          </li>
        )}

        {items.map((item, index) => (
          <li
            key={index}
            className={twMerge("flex items-center", itemClassName)}
          >
            {index > 0 && (
              <div
                className={twMerge(
                  `flex items-center justify-center w-8 ${separatorClasses[variant]}`,
                  separatorClassName
                )}
                aria-hidden="true"
              >
                {separator}
              </div>
            )}
            {index === items.length - 1 ? (
              <span
                className={twMerge(
                  `${currentClasses[variant]} flex items-center`,
                  currentItemClassName,
                  item.className || ""
                )}
                aria-current="page"
              >
                {item.icon && (
                  <span className="inline-flex items-center mr-1">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
            ) : clickable && item.href ? (
              <Link
                href={item.href}
                className={twMerge(
                  `flex items-center ${variantClasses[variant]}`,
                  linkClassName,
                  item.className || ""
                )}
              >
                {item.icon && (
                  <span className="inline-flex items-center mr-1">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </Link>
            ) : (
              <span
                className={twMerge(
                  `flex items-center ${nonCurrentClasses[variant]}`,
                  item.className || ""
                )}
              >
                {item.icon && (
                  <span className="inline-flex items-center mr-1">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
