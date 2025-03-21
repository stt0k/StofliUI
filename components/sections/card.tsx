"use client";

import React from "react";
import { motion } from "framer-motion";

const classNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  radius?: "none" | "sm" | "md" | "full";
  hover?: "none" | "lift" | "glow" | "scale";
  animation?: "none" | "fade" | "slide" | "bounce";
  interactive?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  image?: string;
  loading?: "eager" | "lazy";
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  imageClassName?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = "",
  variant = "default",
  radius = "md",
  hover = "none",
  animation = "none",
  interactive = false,
  footer,
  header,
  image,
  loading = "lazy",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  imageClassName = "",
}) => {
  const variantClasses = {
    default: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
    primary: "bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800",
    secondary: "bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800",
    success: "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800",
    warning: "bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800",
    danger: "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800",
  };

  const radiusClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-lg",
    full: "rounded-2xl",
  };

  const hoverClasses = {
    none: "",
    lift: "hover:-translate-y-1 transition-transform",
    glow: "hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-800/50 transition-shadow",
    scale: "hover:scale-[1.02] transition-transform",
  };

  const animationVariants = {
    none: {},
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    },
    slide: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.4 },
    },
    bounce: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const cardClasses = classNames(
    "relative overflow-hidden",
    variantClasses[variant],
    radiusClasses[radius],
    hoverClasses[hover],
    interactive ? "cursor-pointer" : "",
    className
  );

  const contentClasses = classNames(
    "p-4",
    contentClassName
  );

  const titleClasses = classNames(
    "text-lg font-semibold mb-2 dark:text-zinc-100",
    titleClassName
  );

  const descriptionClasses = classNames(
    "text-zinc-600 dark:text-zinc-400 mb-4",
    descriptionClassName
  );

  const imageContainerClasses = classNames(
    "w-full overflow-hidden",
    radiusClasses[radius],
    imageClassName
  );

  return (
    <motion.div
      className={cardClasses}
      {...animationVariants[animation]}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
    >
      {header && (
        <div className="p-4">
          {header}
        </div>
      )}
      
      {image && (
        <div className={imageContainerClasses}>
          <motion.img
            src={image}
            alt={title || "Card image"}
            loading={loading}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className={contentClasses}>
        {title && (
          <motion.h3 
            className={titleClasses}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
        )}
        
        {description && (
          <motion.p 
            className={descriptionClasses}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>

      {footer && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card; 