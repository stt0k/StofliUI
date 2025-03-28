"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface DropdownItem {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "full";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  placement?: "bottom" | "top" | "left" | "right";
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  showSelectedIcon?: boolean;
  defaultValue?: string;
  value?: string;
  width?: string;
  activeColor?: string;
  checkColor?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  placeholder = "Seleccionar...",
  variant = "default",
  size = "md",
  radius = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  itemClassName = "",
  buttonClassName = "",
  placement = "bottom",
  onChange,
  icon,
  showSelectedIcon = true,
  defaultValue,
  value: controlledValue,
  width,
  activeColor,
  checkColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
    defaultValue
      ? items.find((item) => item.value === defaultValue) || null
      : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : selectedItem?.value;

  // Update selected item if controlled value changes
  useEffect(() => {
    if (isControlled && controlledValue) {
      const newSelectedItem =
        items.find((item) => item.value === controlledValue) || null;
      setSelectedItem(newSelectedItem);
    }
  }, [controlledValue, items, isControlled]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Capture button width on mount and window resize
  useEffect(() => {
    if (dropdownRef.current && !width) {
      setDropdownWidth(dropdownRef.current.offsetWidth);

      const handleResize = () => {
        if (dropdownRef.current) {
          setDropdownWidth(dropdownRef.current.offsetWidth);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [width]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    if (!isControlled) {
      setSelectedItem(item);
    }

    onChange?.(item.value);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };

  const buttonSizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  const variantClasses = {
    default:
      "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800",
    primary:
      "border border-blue-300 dark:border-blue-700 bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    secondary:
      "border border-purple-300 dark:border-purple-700 bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
    success:
      "border border-green-300 dark:border-green-700 bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20",
    warning:
      "border border-amber-300 dark:border-amber-700 bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20",
    danger:
      "border border-red-300 dark:border-red-700 bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
  };

  const placementStyles = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1",
    left: "right-full mr-1",
    right: "left-full ml-1",
  };

  const placementAnimation = {
    top: { y: -5 },
    bottom: { y: 5 },
    left: { x: -5 },
    right: { x: 5 },
  };

  // Determine width style
  const widthStyle = width
    ? { width }
    : fullWidth
    ? {}
    : { width: dropdownWidth ? `${dropdownWidth}px` : "auto" };

  // Calculate max height based on number of items
  const getMaxHeight = () => {
    // Estimate item height based on size
    const itemHeights = {
      sm: 28, // approximate height in pixels for small items
      md: 36, // approximate height for medium items
      lg: 44, // approximate height for large items
    };

    // Get estimated height plus some padding
    const contentHeight = items.length * itemHeights[size] + 10;

    // Set a maximum height if there are many items
    const maxHeight = Math.min(contentHeight, 300);

    return items.length > 6 ? `${maxHeight}px` : "auto";
  };

  // Determine list item classes
  const getItemClasses = (isSelected: boolean, isDisabled: boolean) => {
    const selectedClasses = {
      default: "bg-zinc-300/90 dark:bg-zinc-700 dark:text-white",
      primary: "bg-blue-600 dark:bg-blue-500 text-white",
      secondary: "bg-purple-600 dark:bg-purple-500 text-white",
      success: "bg-green-600 dark:bg-green-500 text-white",
      warning: "bg-amber-600 dark:bg-amber-500 text-white",
      danger: "bg-red-600 dark:bg-red-500 text-white",
    };

    return `
      flex items-center gap-3 px-3 py-2 text-sm rounded mx-1.5 my-0.5
      ${
        isSelected
          ? activeColor
            ? ""
            : selectedClasses[variant]
          : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
      }
      ${
        isDisabled
          ? "opacity-70 cursor-not-allowed pointer-events-none text-zinc-500 dark:text-zinc-500"
          : "cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800"
      }
      transition-colors duration-200
      ${itemClassName}
    `;
  };

  // Define check colors based on variant
  const checkVariantColors = {
    default: "text-blue-500 dark:text-blue-400",
    primary: "text-blue-500 dark:text-blue-400",
    secondary: "text-purple-500 dark:text-purple-400",
    success: "text-green-500 dark:text-green-400",
    warning: "text-amber-500 dark:text-amber-400",
    danger: "text-red-500 dark:text-red-400",
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative ${
        fullWidth ? "w-full" : "inline-block"
      } ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full ${buttonSizeClasses[size]}
          ${sizeClasses[size]} ${radiusClasses[radius]} ${
          variantClasses[variant]
        }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          transition-colors duration-200
          ${buttonClassName}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {selectedItem ? (
            <>
              {showSelectedIcon && selectedItem.icon && (
                <span className="flex-shrink-0 mr-2">{selectedItem.icon}</span>
              )}
              {typeof selectedItem.label === "string" ? (
                selectedItem.label
              ) : (
                <span className="flex items-center">{selectedItem.label}</span>
              )}
            </>
          ) : (
            <span className="text-zinc-500 dark:text-zinc-400">
              {placeholder}
            </span>
          )}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, ...placementAnimation[placement] }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, ...placementAnimation[placement] }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 min-w-[8rem] ${placementStyles[placement]} ${radiusClasses[radius]} border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-1 shadow-lg`}
            style={widthStyle}
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.05 }}
              role="listbox"
              tabIndex={-1}
              className="overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ maxHeight: getMaxHeight() }}
            >
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  onClick={() => !item.disabled && handleItemClick(item)}
                  role="option"
                  aria-selected={item.value === currentValue}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                  className={getItemClasses(
                    item.value === currentValue,
                    Boolean(item.disabled)
                  )}
                  style={
                    item.value === currentValue && activeColor
                      ? { background: activeColor, color: "white" }
                      : {}
                  }
                >
                  {item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  {item.label}
                  {item.value === currentValue &&
                    showSelectedIcon &&
                    !item.disabled && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`h-4 w-4 ml-auto flex-shrink-0 ${
                          checkColor ? "" : checkVariantColors[variant]
                        }`}
                        style={checkColor ? { color: checkColor } : {}}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline
                          points="20 6 9 17 4 12"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
