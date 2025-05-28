"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "none" | "sm" | "md" | "full";
  border?: boolean;
  borderColor?: string;
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  statusClassName?: string;
  ariaLabel?: string;
  statusLabel?: {
    online?: string;
    offline?: string;
    away?: string;
    busy?: string;
  };
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  radius = "full",
  border = false,
  borderColor = "border-zinc-200 dark:border-zinc-800",
  status,
  className = "",
  imageClassName = "",
  fallbackClassName = "",
  statusClassName = "",
  ariaLabel,
  statusLabel = {
    online: "En línea",
    offline: "Desconectado",
    away: "Ausente",
    busy: "Ocupado"
  }
}) => {
  const [imageError, setImageError] = React.useState(!src);

  const baseClasses = [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "overflow-hidden",
    "bg-zinc-100",
    "dark:bg-zinc-800",
  ];

  const sizeClasses = {
    sm: ["h-8", "w-8", "text-xs"],
    md: ["h-10", "w-10", "text-sm"],
    lg: ["h-12", "w-12", "text-base"],
    xl: ["h-16", "w-16", "text-lg"],
  };

  const radiusClasses = {
    none: ["rounded-none"],
    sm: ["rounded-[0.25rem]"],
    md: ["rounded-[0.375rem]"],
    full: ["rounded-full"],
  };

  const statusColors = {
    online: ["bg-green-500"],
    offline: ["bg-zinc-400"],
    away: ["bg-yellow-500"],
    busy: ["bg-red-500"],
  };

  const classes = cn(
    baseClasses.join(" "),
    sizeClasses[size].join(" "),
    radiusClasses[radius].join(" "),
    border && `border-2 ${borderColor}`,
    className
  );

  const handleImageError = () => setImageError(true);

  const getAriaLabel = () => {
    const parts = [];
    if (ariaLabel) {
      parts.push(ariaLabel);
    } else {
      parts.push(alt || fallback || "Avatar");
    }
    if (status && statusLabel[status]) {
      parts.push(statusLabel[status]);
    }
    return parts.join(", ");
  };

  return (
    <div 
      className="relative inline-block"
      role="img"
      aria-label={getAriaLabel()}
    >
      <div 
        className={classes}
        aria-hidden="true"
      >
        {!imageError && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn("object-cover", imageClassName)}
            onError={handleImageError}
            role="presentation"
            aria-hidden="true"
          />
        ) : (
          <span
            className={cn(
              "font-medium text-zinc-500 dark:text-zinc-400",
              fallbackClassName
            )}
            aria-hidden="true"
          >
            {fallback || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white dark:border-zinc-900",
            statusColors[status].join(" "),
            statusClassName
          )}
          role="status"
          aria-label={statusLabel[status]}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Avatar;
