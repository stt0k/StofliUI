"use client";

import React from "react";
import Image from "next/image";

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

  const classes = [
    ...baseClasses,
    ...sizeClasses[size],
    ...radiusClasses[radius],
    border && `border-2 ${borderColor}`,
    className,
  ].filter(Boolean).join(" ");

  const handleImageError = () => setImageError(true);

  return (
    <div className="relative inline-block">
      <div className={classes}>
        {!imageError && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={handleImageError}
          />
        ) : (
          <span className="font-medium text-zinc-500 dark:text-zinc-400">
            {fallback || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${
            statusColors[status]
          }`}
        />
      )}
    </div>
  );
};

export default Avatar; 