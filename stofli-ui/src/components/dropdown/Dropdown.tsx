"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
  description?: string;
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
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "none" | "sm" | "md" | "full";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  placement?: "bottom" | "top" | "left" | "right";
  onChange?: (value: string | string[]) => void;
  icon?: React.ReactNode;
  showSelectedIcon?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  width?: string;
  activeColor?: string;
  showArrow?: boolean;
  multiSelect?: boolean;
  avatarSize?: "xs" | "sm" | "md" | "lg";
  avatarSrc?: string;
  avatarAlt?: string;
  selectable?: boolean;
  avatarOnly?: boolean;
  arrowIconClassName?: string;
  dropdownClassName?: string;
  listClassName?: string;
  itemContentClassName?: string;
  itemLabelClassName?: string;
  itemIconClassName?: string;
  checkIconClassName?: string;
  id?: string;
  label?: string;
  required?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  errorMessage?: string;
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
  showArrow = true,
  multiSelect = false,
  avatarSize = "md",
  avatarSrc,
  avatarAlt = "Avatar",
  selectable = true,
  avatarOnly = false,
  arrowIconClassName,
  dropdownClassName,
  listClassName,
  itemContentClassName,
  itemLabelClassName,
  itemIconClassName,
  checkIconClassName,
  id,
  label,
  required = false,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  errorMessage,
}) => {
  const uniqueIdBase = useId();
  const uniqueId = id || `dropdown-${uniqueIdBase.replace(/:/g, "")}`;
  const componentId = uniqueId;
  const buttonId = `${componentId}-button`;
  const listboxId = `${componentId}-listbox`;
  const labelId = `${componentId}-label`;
  const errorId = `${componentId}-error`;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>(() => {
    if (!defaultValue) return [];

    if (multiSelect && Array.isArray(defaultValue)) {
      return items.filter((item) => defaultValue.includes(item.value));
    }

    const singleValue = Array.isArray(defaultValue)
      ? defaultValue[0]
      : defaultValue;
    const item = items.find((item) => item.value === singleValue);
    return item ? [item] : [];
  });

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const currentValues = isControlled
    ? Array.isArray(controlledValue)
      ? controlledValue
      : controlledValue
      ? [controlledValue]
      : []
    : selectedItems.map((item) => item.value);

  // Update selected items if controlled value changes
  useEffect(() => {
    if (isControlled) {
      if (Array.isArray(controlledValue)) {
        const newSelectedItems = items.filter((item) =>
          controlledValue.includes(item.value)
        );
        setSelectedItems(newSelectedItems);
      } else if (controlledValue) {
        const newSelectedItem = items.find(
          (item) => item.value === controlledValue
        );
        setSelectedItems(newSelectedItem ? [newSelectedItem] : []);
      } else {
        setSelectedItems([]);
      }
    }
  }, [controlledValue, items, isControlled]);

  // Manejar navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => (prev + 1) % items.length);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(items.length - 1);
        } else {
          setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && activeIndex >= 0) {
          handleItemClick(items[activeIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
      case "Home":
        if (isOpen) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          e.preventDefault();
          setActiveIndex(items.length - 1);
        }
        break;
    }
  };

  // Efecto para manejar el scroll al ítem activo
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex, isOpen]);

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

    if (selectable) {
      if (!isControlled) {
        if (multiSelect) {
          const isSelected = selectedItems.some(
            (selected) => selected.value === item.value
          );
          if (isSelected) {
            setSelectedItems(
              selectedItems.filter((selected) => selected.value !== item.value)
            );
          } else {
            setSelectedItems([...selectedItems, item]);
          }
        } else {
          setSelectedItems([item]);
        }
      }

      if (onChange) {
        if (multiSelect) {
          const newValues = [...currentValues];
          const valueIndex = newValues.indexOf(item.value);

          if (valueIndex >= 0) {
            newValues.splice(valueIndex, 1);
          } else {
            newValues.push(item.value);
          }

          onChange(newValues);
        } else {
          onChange(item.value);
        }
      }

      // Anunciar selección para lectores de pantalla
      announceSelection(item);
    }

    if (!(multiSelect && selectable)) {
      setIsOpen(false);
    }
  };

  const announceSelection = (item: DropdownItem) => {
    const liveRegion = document.getElementById(`${componentId}-live`);
    if (liveRegion) {
      const message = multiSelect
        ? `${item.label} ${currentValues.includes(item.value) ? "deseleccionado" : "seleccionado"}`
        : `${item.label} seleccionado`;
      liveRegion.textContent = message;
    }
  };

  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
    xl: "text-lg py-3 px-6",
  };

  const avatarOnlySizeClasses = {
    sm: "p-0",
    md: "p-0",
    lg: "p-0",
    xl: "p-0",
  };

  const buttonSizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-14",
  };

  const avatarOnlyButtonSizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
  };

  const adjustedSize = avatarOnly
    ? avatarSize === "lg"
      ? "lg"
      : avatarSize === "md"
      ? "md"
      : "sm"
    : size;

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-[0.25rem]",
    md: "rounded-[0.375rem]",
    full: "rounded-full",
  };

  const avatarSizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const variantClasses = {
    default:
      "border border-zinc-400 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800",
    primary:
      "border border-blue-400 dark:border-blue-800 bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    secondary:
      "border border-purple-400 dark:border-purple-800 bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
    success:
      "border border-green-400 dark:border-green-800 bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20",
    warning:
      "border border-amber-400 dark:border-amber-800 bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20",
    danger:
      "border border-red-400 dark:border-red-800 bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
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

  // Para dropdown con avatares, asegurar un ancho mínimo adecuado
  const hasItemsWithAvatars = items.some((item) => item.avatarSrc);
  const minWidth = avatarOnly
    ? {
        minWidth:
          avatarSize === "lg"
            ? "220px"
            : avatarSize === "md"
            ? "200px"
            : "180px",
        width: "auto", // Asegurar que el ancho no se limite al botón cuando es avatarOnly
      }
    : hasItemsWithAvatars
    ? {
        minWidth:
          avatarSize === "lg"
            ? "200px"
            : avatarSize === "md"
            ? "180px"
            : "160px",
      }
    : {};

  // Combinar los estilos de ancho
  const dropdownWidthStyle = avatarOnly
    ? minWidth // Usar solo el minWidth para avatarOnly
    : { ...widthStyle, ...minWidth };

  // Calculate max height based on number of items
  const getMaxHeight = () => {
    // Estimate item height based on size
    const itemHeights = {
      sm: 28, // approximate height in pixels for small items
      md: 36, // approximate height for medium items
      lg: 44, // approximate height for large items
      xl: 52, // approximate height for extra large items
    };

    // Get estimated height plus some padding
    const contentHeight = items.length * itemHeights[adjustedSize] + 10;

    // Set a maximum height if there are many items
    const maxHeight = Math.min(contentHeight, 300);

    return items.length > 6 ? `${maxHeight}px` : "auto";
  };

  // Determine list item classes
  const getItemClasses = (isSelected: boolean, isDisabled: boolean) => {
    const selectedClasses = {
      default: "bg-zinc-400 dark:bg-zinc-800 text-zinc-50 dark:text-zinc-200",
      primary: "bg-blue-400 dark:bg-blue-800 text-white",
      secondary: "bg-purple-400 dark:bg-purple-800 text-white",
      success: "bg-green-400 dark:bg-green-800 text-white",
      warning: "bg-amber-400 dark:bg-amber-800 text-white",
      danger: "bg-red-400 dark:bg-red-800 text-white",
    };

    // Primero aplicamos las clases base
    const sizeTextClass = "text-sm";
    const baseClasses = "rounded mx-1.5 my-0.5 transition-colors duration-200";
    const sizeClasses = avatarOnly ? "py-2 px-3" : "py-2 px-3";

    // Luego aplicamos las clases para el estado no seleccionado
    const nonSelectedClasses =
      "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white";

    // Luego aplicamos las clases para el estado habilitado/deshabilitado
    const disabledClasses =
      "opacity-50 cursor-not-allowed pointer-events-none !text-zinc-400/70 dark:!text-zinc-600";
    const enabledClasses =
      "cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800";

    // Finalmente, aplicamos las clases de selección con la máxima prioridad
    let activeClasses = "";
    if (isSelected && selectable) {
      if (activeColor) {
        if (
          activeColor.startsWith("#") ||
          activeColor.startsWith("rgb") ||
          activeColor.startsWith("hsl")
        ) {
          // No aplicamos clases en este caso, se aplicará via style
          activeClasses = "";
        } else {
          // Si es una clase de Tailwind, la aplicamos con la mayor prioridad
          activeClasses = activeColor;
        }
      } else {
        activeClasses = selectedClasses[variant];
      }
    }

    return cn(
      sizeTextClass,
      baseClasses,
      sizeClasses,
      !isSelected && nonSelectedClasses,
      isDisabled ? disabledClasses : enabledClasses,
      itemClassName,
      // Las clases de activeColor se aplican al final para tener mayor prioridad
      activeClasses
    );
  };

  // Define check colors based on variant
  const checkVariantColors = {
    default: "text-zinc-50 dark:text-zinc-200",
    primary: "text-white",
    secondary: "text-white",
    success: "text-white",
    warning: "text-white",
    danger: "text-white",
  };

  // Renderizar contenido seleccionado
  const renderSelectedContent = () => {
    if (avatarOnly) {
      return null;
    }

    if (selectedItems.length === 0) {
      return (
        <span className="text-zinc-500 dark:text-zinc-400">{placeholder}</span>
      );
    }

    if (multiSelect) {
      return (
        <span className="flex items-center gap-1 flex-wrap">
          {selectedItems.map((item, i) => (
            <span
              key={i}
              className="bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 text-xs rounded-full inline-flex items-center gap-1"
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              {item.label}
            </span>
          ))}
        </span>
      );
    }

    // Single select
    const selectedItem = selectedItems[0];
    return (
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
    );
  };

  // Determinar qué avatar mostrar en el botón
  const selectedItemAvatar =
    !multiSelect && selectedItems.length > 0 && selectedItems[0].avatarSrc;
  const buttonAvatarSrc = selectedItemAvatar || avatarSrc;
  const buttonAvatarAlt =
    !multiSelect && selectedItems.length > 0
      ? selectedItems[0].avatarAlt ||
        selectedItems[0].label?.toString() ||
        avatarAlt
      : avatarAlt;

  return (
    <div className={cn("w-full", className)}>
      {/* Región live para anuncios de accesibilidad */}
      <div
        id={`${componentId}-live`}
        className="sr-only"
        role="status"
        aria-live="polite"
      />

      {label && (
        <label
          id={labelId}
          htmlFor={buttonId}
          className={cn(
            "block text-sm font-medium mb-1",
            errorMessage
              ? "text-red-500 dark:text-red-400"
              : "text-zinc-700 dark:text-zinc-300"
          )}
        >
          {label}
          {required && (
            <>
              <span aria-hidden="true" className="text-red-500 ml-1">*</span>
              <span className="sr-only">(requerido)</span>
            </>
          )}
        </label>
      )}

    <div
      ref={dropdownRef}
      className={cn(
        "relative",
          fullWidth && !avatarOnly ? "w-full" : "inline-block"
      )}
    >
      <button
          id={buttonId}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        className={cn(
          avatarOnly
            ? `flex items-center justify-center ${avatarOnlyButtonSizeClasses[adjustedSize]} ${avatarOnlySizeClasses[adjustedSize]}`
            : `flex items-center justify-between w-full ${buttonSizeClasses[adjustedSize]} ${sizeClasses[adjustedSize]}`,
          radiusClasses[avatarOnly ? "full" : radius],
          variantClasses[variant],
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            errorMessage && "border-red-500 dark:border-red-400",
          "transition-colors duration-200",
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
          aria-labelledby={label ? labelId : undefined}
          aria-label={!label ? (ariaLabel || "Selector desplegable") : undefined}
          aria-describedby={cn(
            errorMessage ? errorId : null,
            ariaDescribedby
          )}
          aria-invalid={!!errorMessage}
          aria-required={required}
      >
        <span
            id={`${componentId}-value`}
          className={cn(
            "flex items-center gap-2",
            avatarOnly ? "" : "truncate"
          )}
        >
            {buttonAvatarSrc && (
              <img
                src={buttonAvatarSrc}
                alt={buttonAvatarAlt}
                className={cn(
                  avatarSizeClasses[avatarSize],
                  "rounded-full"
                )}
              />
            )}
            {icon && !avatarOnly && (
              <span className="flex-shrink-0" aria-hidden="true">
                {icon}
              </span>
            )}
          {!avatarOnly && renderSelectedContent()}
        </span>

        {showArrow && !avatarOnly && (
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 flex-shrink-0 transition-transform duration-200",
              isOpen ? "rotate-180" : "",
              arrowIconClassName
            )}
              aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
              role="presentation"
            className={cn(
              "absolute z-50 min-w-[8rem]",
              placementStyles[placement],
              radiusClasses[radius],
              "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-1 shadow-lg",
              dropdownClassName
            )}
            style={dropdownWidthStyle}
              initial={{ opacity: 0, ...placementAnimation[placement] }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, ...placementAnimation[placement] }}
              transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <motion.ul
                ref={listRef}
                id={listboxId}
              role="listbox"
                aria-multiselectable={multiSelect}
                aria-labelledby={buttonId}
              className={cn(
                "overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
                listClassName
              )}
              style={{ maxHeight: getMaxHeight() }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.05 }}
            >
              {items.map((item, index) => {
                const isSelected = currentValues.includes(item.value);
                  const isHighlighted = index === activeIndex;

                return (
                  <motion.li
                    key={index}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={item.disabled}
                      aria-label={typeof item.label === 'string' ? item.label : undefined}
                      aria-describedby={item.description ? `${componentId}-desc-${index}` : undefined}
                      tabIndex={-1}
                      onClick={() => !item.disabled && handleItemClick(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      className={cn(
                        getItemClasses(isSelected, Boolean(item.disabled)),
                        isHighlighted && !item.disabled && "bg-zinc-100 dark:bg-zinc-800"
                      )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                  >
                    <div
                      className={cn(
                        "flex items-center w-full justify-between",
                        itemContentClassName
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          itemLabelClassName
                        )}
                      >
                          {item.avatarSrc && (
                            <img
                              src={item.avatarSrc}
                              alt={item.avatarAlt || ""}
                              className={cn(
                                avatarSizeClasses[avatarSize],
                                "rounded-full"
                              )}
                            />
                          )}
                        {item.icon && (
                          <span
                            className={cn("flex-shrink-0", itemIconClassName)}
                              aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                        )}
                        {item.label}
                      </div>
                      {isSelected &&
                        showSelectedIcon &&
                        !item.disabled &&
                        selectable && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={cn(
                              "flex-shrink-0",
                              checkVariantColors[variant],
                              checkIconClassName
                            )}
                              aria-hidden="true"
                          >
                            <Check size={16} />
                          </motion.div>
                        )}
                    </div>
                      {item.description && (
                        <div
                          id={`${componentId}-desc-${index}`}
                          className="text-sm text-zinc-500 dark:text-zinc-400 mt-1"
                        >
                          {item.description}
                        </div>
                      )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {errorMessage && (
        <p
          id={errorId}
          className={cn(
            "mt-1 text-sm text-red-500 dark:text-red-400"
          )}
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
