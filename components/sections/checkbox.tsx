"use client";

import React from "react";
import { motion } from "framer-motion";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  name?: string;
  value?: string;
  size?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  onChange?: (checked: boolean) => void;
  radius?: "none" | "sm" | "md" | "full";
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  required = false,
  label,
  name,
  value,
  size = "md",
  variant = "default",
  className = "",
  onChange,
  radius = "md",
}) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const newChecked = event.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    }
  };

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const variantClasses = {
    default:
      "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600",
    primary:
      "border-blue-400 dark:border-blue-400 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-300",
    secondary:
      "border-purple-400 dark:border-purple-400 bg-white dark:bg-zinc-900 hover:border-purple-500 dark:hover:border-purple-300",
    success:
      "border-green-400 dark:border-green-400 bg-white dark:bg-zinc-900 hover:border-green-500 dark:hover:border-green-300",
    warning:
      "border-amber-400 dark:border-amber-400 bg-white dark:bg-zinc-900 hover:border-amber-500 dark:hover:border-amber-300",
    danger:
      "border-red-400 dark:border-red-400 bg-white dark:bg-zinc-900 hover:border-red-500 dark:hover:border-red-300",
  };

  const checkedClasses = {
    default: "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white",
    primary:
      "bg-blue-500 dark:bg-blue-400 border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-500/20",
    secondary:
      "bg-purple-500 dark:bg-purple-400 border-purple-500 dark:border-purple-400 ring-2 ring-purple-100 dark:ring-purple-500/20",
    success:
      "bg-green-500 dark:bg-green-400 border-green-500 dark:border-green-400 ring-2 ring-green-100 dark:ring-green-500/20",
    warning:
      "bg-amber-500 dark:bg-amber-400 border-amber-500 dark:border-amber-400 ring-2 ring-amber-100 dark:ring-amber-500/20",
    danger:
      "bg-red-500 dark:bg-red-400 border-red-500 dark:border-red-400 ring-2 ring-red-100 dark:ring-red-500/20",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    full: "rounded-full",
  };

  const checkboxVariants = {
    checked: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3, ease: "easeOut" },
    },
    unchecked: {
      scale: 1,
    },
  };

  const pathVariants = {
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    unchecked: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <label
      className={`inline-flex items-center ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked ?? isChecked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          onChange={handleChange}
        />
        <motion.div
          className={`
            ${sizeClasses[size]}
            border-2 
            ${radiusClasses[radius]}
            flex items-center justify-center
            ${
              checked ?? isChecked
                ? checkedClasses[variant]
                : variantClasses[variant]
            }
            ${className}
          `}
          variants={checkboxVariants}
          initial="unchecked"
          animate={checked ?? isChecked ? "checked" : "unchecked"}
          whileTap={!disabled ? { scale: 0.95 } : undefined}
        >
          <motion.svg
            className={`w-[80%] h-[80%] ${
              variant === "default"
                ? "text-white dark:text-zinc-900"
                : "text-white"
            }`}
            viewBox="0 0 24 24"
          >
            <motion.path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M4 12l5 5L20 7"
              variants={pathVariants}
              initial="unchecked"
              animate={checked ?? isChecked ? "checked" : "unchecked"}
            />
          </motion.svg>
        </motion.div>
      </div>
      {label && (
        <span
          className={`ml-2 ${labelSizeClasses[size]} ${
            disabled
              ? "text-zinc-400 dark:text-zinc-600"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
