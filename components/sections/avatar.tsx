"use client";

import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

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
    none: [],
    sm: ["rounded"],
    md: ["rounded-md"],
    full: ["rounded-full"],
  };

  const statusColors = {
    online: ["bg-green-500"],
    offline: ["bg-zinc-400"],
    away: ["bg-yellow-500"],
    busy: ["bg-red-500"],
  };

  const classes = twMerge(
    baseClasses.join(" "),
    sizeClasses[size].join(" "),
    radiusClasses[radius].join(" "),
    border && `border-2 ${borderColor}`,
    className
  );

  const handleImageError = () => setImageError(true);

  return (
    <div className="relative inline-block">
      <div className={classes}>
        {!imageError && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={twMerge("object-cover", imageClassName)}
            onError={handleImageError}
          />
        ) : (
          <span
            className={twMerge(
              "font-medium text-zinc-500 dark:text-zinc-400",
              fallbackClassName
            )}
          >
            {fallback || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {status && (
        <span
          className={twMerge(
            `absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${statusColors[
              status
            ].join(" ")}`,
            statusClassName
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
