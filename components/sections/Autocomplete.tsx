"use client";

import React, { useState, useRef, useCallback, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AutocompleteOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  title?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  sectionTitleClassName?: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

interface AutocompleteSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

interface AutocompleteItemProps {
  option: AutocompleteOption;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export const AutocompleteSection: React.FC<AutocompleteSectionProps> = ({
  title,
  children,
  className = "",
  titleClassName = "",
}) => {
  return (
    <div className={cn("py-2", className)}>
      <div
        className={cn(
          "px-3 py-1.5 text-sm font-medium text-neutral-400 dark:text-neutral-500",
          titleClassName
        )}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

export const AutocompleteItem: React.FC<AutocompleteItemProps> = ({
  option,
  isSelected,
  onSelect,
  className = "",
}) => {
  // Determinar las clases según el estado
  const getItemClasses = () => {
    if (option.disabled) {
      return "opacity-50 bg-zinc-50 dark:bg-zinc-800/30 text-neutral-400 dark:text-neutral-500 cursor-not-allowed";
    }

    if (isSelected) {
      return "bg-zinc-100 dark:bg-zinc-800 text-neutral-900 dark:text-neutral-100 font-medium cursor-pointer";
    }

    return "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-neutral-700 dark:text-neutral-300 cursor-pointer";
  };

  // Manejar el clic solo si la opción no está deshabilitada
  const handleClick = () => {
    if (!option.disabled) {
      onSelect();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className={cn(
        "flex items-center justify-between px-3 py-2 text-sm transition-colors",
        getItemClasses(),
        className
      )}
      onClick={handleClick}
    >
      <span>{option.label}</span>
      {isSelected && !option.disabled && (
        <Check className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
      )}
    </motion.div>
  );
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción...",
  title,
  required = false,
  className = "",
  containerClassName = "",
  inputClassName = "",
  dropdownClassName = "",
  itemClassName = "",
  iconClassName = "",
  sectionTitleClassName = "",
  disabled = false,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(value); // Valor interno para mayor control
  const [isSearching, setIsSearching] = useState(false); // Flag para indicar si el usuario está buscando activamente
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(
    (opt) => opt.value === (value || internalValue)
  );

  // Colores base para cada variante
  const borderColors = {
    default: "border-zinc-200 dark:border-zinc-800",
    primary: "border-blue-200 dark:border-blue-800",
    secondary: "border-purple-200 dark:border-purple-800",
    success: "border-green-200 dark:border-green-800",
    warning: "border-amber-200 dark:border-amber-800",
    danger: "border-red-200 dark:border-red-800",
  };

  // Colores de hover/focus para cada variante
  const hoverColors = {
    default: "hover:border-zinc-300 dark:hover:border-zinc-700",
    primary: "hover:border-blue-300 dark:hover:border-blue-700",
    secondary: "hover:border-purple-300 dark:hover:border-purple-700",
    success: "hover:border-green-300 dark:hover:border-green-700",
    warning: "hover:border-amber-300 dark:hover:border-amber-700",
    danger: "hover:border-red-300 dark:hover:border-red-700",
  };

  // Colores de anillo para cada variante
  const ringColors = {
    default: "ring-zinc-500/20",
    primary: "ring-blue-500/30",
    secondary: "ring-purple-500/30",
    success: "ring-green-500/30",
    warning: "ring-amber-500/30",
    danger: "ring-red-500/30",
  };

  // Agregar estado para el índice actualmente enfocado
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Función auxiliar para encontrar la siguiente opción habilitada
  const findNextEnabledOption = (
    currentIndex: number,
    direction: "next" | "prev",
    options: AutocompleteOption[]
  ): number => {
    let nextIndex = currentIndex;
    const increment = direction === "next" ? 1 : -1;

    while (true) {
      nextIndex += increment;

      // Verificar límites
      if (nextIndex < 0 || nextIndex >= options.length) {
        return currentIndex;
      }

      // Si encontramos una opción habilitada, la retornamos
      if (!options[nextIndex].disabled) {
        return nextIndex;
      }
    }
  };

  // Sincronizar valor externo con interno
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Al hacer clic fuera, cerramos el menú
        setIsOpen(false);

        // Reseteamos el estado de búsqueda
        setIsSearching(false);

        // Si hay una opción seleccionada, restauramos su texto
        if (selectedOption) {
          setQuery(selectedOption.label);
        }
        // Si no hay opción seleccionada pero había texto de búsqueda, lo limpiamos
        else if (
          query &&
          !options.some(
            (opt) => opt.label.toLowerCase() === query.toLowerCase()
          )
        ) {
          setQuery("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, options, query, selectedOption]);

  // Inicializar el query con el valor seleccionado
  useEffect(() => {
    if (selectedOption) {
      setQuery(selectedOption.label);
    }
  }, [selectedOption]);

  useEffect(() => {
    // Si el usuario está escribiendo algo claramente diferente a la opción seleccionada,
    // podemos considerar limpiar la selección interna para facilitar la elección de nueva opción
    if (
      query &&
      selectedOption &&
      !selectedOption.label.toLowerCase().startsWith(query.toLowerCase()) &&
      !query.toLowerCase().startsWith(selectedOption.label.toLowerCase())
    ) {
      // No limpiamos inmediatamente para no perder el estado en caso de regreso
    }
  }, [query, selectedOption]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Cualquier cambio en el input activa la búsqueda
    setIsSearching(true);

    // Siempre abrimos el menú al escribir
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      // Al abrir con el botón, mostramos todas las opciones
      setIsOpen(true);
      setIsSearching(false);

      if (selectedOption) {
        // Restauramos el texto de la opción seleccionada
        setQuery(selectedOption.label);
      }
    } else {
      // Si el menú ya está abierto, lo cerramos
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) => {
    // Si hay texto de búsqueda, filtramos por ese texto
    if (isSearching && query && query.trim() !== "") {
      return option.label.toLowerCase().includes(query.toLowerCase());
    }

    // Si el menú está abierto (y no estamos buscando activamente), mostramos todas las opciones
    if (isOpen) {
      return true;
    }

    // Si el menú está cerrado y hay una opción seleccionada, solo mostrar esa
    if (selectedOption) {
      return option.value === selectedOption.value;
    }

    // Caso por defecto, mostrar todas
    return true;
  });

  const groupedOptions = filteredOptions.reduce<
    Record<string, AutocompleteOption[]>
  >((acc, option) => {
    const group = option.group || "default";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {});

  const handleSelect = useCallback(
    (option: AutocompleteOption) => {
      // No seleccionar opciones deshabilitadas
      if (option.disabled) {
        return;
      }

      // Primero actualizar el query para que no haya cambios visuales bruscos
      setQuery(option.label);
      setIsSearching(false); // Ya no estamos buscando al seleccionar

      // Actualizar el valor interno
      setInternalValue(option.value);

      // Cerrar el menú con una pequeña demora para que la transición sea suave
      setTimeout(() => {
        setIsOpen(false);

        // Notificar el cambio después de cerrar el menú
        onChange?.(option.value);
      }, 50);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setInternalValue("");
      onChange?.("");
      setQuery("");
      setIsSearching(false); // Reseteamos el estado de búsqueda
      setIsOpen(false);
      inputRef.current?.focus();
    },
    [onChange]
  );

  // Definir colores por variante
  const getVariantClasses = () => {
    const baseClasses = "border rounded-lg shadow-sm will-change-transform";
    const variants = {
      default: `${baseClasses}`,
      primary: `${baseClasses}`,
      secondary: `${baseClasses}`,
      success: `${baseClasses}`,
      warning: `${baseClasses}`,
      danger: `${baseClasses}`,
    };
    return variants[variant];
  };

  // Obtener clases adicionales para estados (hover, focus, etc)
  const getStateClasses = () => {
    // Clase base con colores de borde
    const baseClass = `${borderColors[variant]} transition-all duration-300 ${hoverColors[variant]}`;

    if (isOpen) {
      return `${baseClass} ring-2 ${ringColors[variant]}`;
    }

    return baseClass;
  };

  // Obtener colores del título por variante
  const getTitleColorClasses = () => {
    const colors = {
      default: "text-neutral-700 dark:text-neutral-300",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-purple-600 dark:text-purple-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-amber-600 dark:text-amber-400",
      danger: "text-red-600 dark:text-red-400",
    };
    return colors[variant];
  };

  // Generar IDs únicos para los elementos
  const uniqueIdBase = useId();
  const inputId = `autocomplete-${uniqueIdBase.replace(/:/g, "")}`;
  const listboxId = `listbox-${uniqueIdBase.replace(/:/g, "")}`;

  // Manejar navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const filteredOptionsArray = Object.values(groupedOptions).flat();

    if (
      !isOpen &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setIsOpen(true);

      // Si abrimos con flecha abajo, focalizamos la primera opción no deshabilitada
      if (e.key === "ArrowDown") {
        const firstEnabledIndex = filteredOptionsArray.findIndex(
          (opt) => !opt.disabled
        );
        setFocusedIndex(firstEnabledIndex >= 0 ? firstEnabledIndex : -1);
      }
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;

        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((current) => {
            // Si no hay opción focada, empezar por la primera habilitada
            if (current === -1) {
              const firstEnabledIndex = filteredOptionsArray.findIndex(
                (opt) => !opt.disabled
              );
              return firstEnabledIndex >= 0 ? firstEnabledIndex : -1;
            }
            // Encontrar la siguiente opción habilitada
            return findNextEnabledOption(current, "next", filteredOptionsArray);
          });
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((current) => {
            if (current === -1) {
              // Si no hay opción focada, empezar por la última habilitada
              const lastEnabledIndex = filteredOptionsArray.length - 1;
              return lastEnabledIndex >= 0 ? lastEnabledIndex : -1;
            }
            // Encontrar la opción habilitada anterior
            return findNextEnabledOption(current, "prev", filteredOptionsArray);
          });
          break;

        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptionsArray.length) {
            const selectedOption = filteredOptionsArray[focusedIndex];
            if (!selectedOption.disabled) {
              handleSelect(selectedOption);
              setFocusedIndex(-1);
              setIsOpen(false);
            }
          }
          break;

        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    }
  };

  // Modificar el renderizado de las opciones para incluir el estado de foco
  const renderOption = (option: AutocompleteOption, index: number) => (
    <div
      key={option.value}
      role="option"
      id={`option-${option.value}`}
      aria-selected={option.value === (value || internalValue)}
      aria-disabled={option.disabled}
    >
      <AutocompleteItem
        option={option}
        isSelected={option.value === (value || internalValue)}
        onSelect={() => handleSelect(option)}
        className={cn(
          itemClassName,
          focusedIndex === index &&
            !option.disabled &&
            "bg-zinc-100 dark:bg-zinc-800"
        )}
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn(`relative w-full max-w-sm`, className)}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-owns={listboxId}
    >
      <div
        className={cn(
          `relative flex flex-col group bg-white dark:bg-black`,
          getVariantClasses(),
          getStateClasses(),
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          containerClassName
        )}
      >
        {title && (
          <div className="px-3 pt-1.5 pb-0 rounded-lg">
            <label
              htmlFor={inputId}
              className={cn(
                `text-xs font-medium ${getTitleColorClasses()}`,
                sectionTitleClassName
              )}
            >
              {title}
              {required && (
                <span className="text-red-500 ml-0.5" aria-label="requerido">
                  *
                </span>
              )}
            </label>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          id={inputId}
          className={cn(
            `w-full px-3 pr-20`,
            title ? "pt-0 pb-1.5" : "py-2",
            `rounded-lg text-sm text-neutral-900 dark:text-neutral-100 
            placeholder-neutral-600 dark:placeholder-neutral-400 outline-none disabled:cursor-not-allowed`,
            inputClassName
          )}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          role="textbox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            selectedOption ? `option-${selectedOption.value}` : undefined
          }
          aria-required={required}
          aria-disabled={disabled}
        />
        <div className="absolute right-0 flex items-center h-full">
          <div className="w-6 h-full flex items-center justify-center">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  `h-4 w-4 text-${
                    variant === "default" ? "zinc" : variant
                  }-400 hover:text-${
                    variant === "default" ? "zinc" : variant
                  }-600 
                  dark:text-${
                    variant === "default" ? "zinc" : variant
                  }-500 dark:hover:text-${
                    variant === "default" ? "zinc" : variant
                  }-300 
                  opacity-0 group-hover:opacity-100 transition-opacity`,
                  iconClassName
                )}
                disabled={disabled}
                aria-label="Limpiar selección"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <button
            type="button"
            className={cn(
              `flex items-center justify-center w-8 h-full`,
              `text-${variant === "default" ? "zinc" : variant}-500 dark:text-${
                variant === "default" ? "zinc" : variant
              }-400 transition-colors`,
              `hover:text-${
                variant === "default" ? "zinc" : variant
              }-700 dark:hover:text-${
                variant === "default" ? "zinc" : variant
              }-300`,
              iconClassName
            )}
            onClick={toggleDropdown}
            disabled={disabled}
            aria-label={
              isOpen ? "Cerrar lista de opciones" : "Abrir lista de opciones"
            }
            aria-expanded={isOpen}
          >
            <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              `absolute z-50 w-full mt-1 bg-white dark:bg-black 
              rounded-lg shadow-lg overflow-hidden max-h-60
              border border-zinc-200 dark:border-zinc-800`,
              dropdownClassName
            )}
            role="listbox"
            id={listboxId}
            aria-label="Lista de opciones"
          >
            <div
              className={cn(
                "overflow-y-auto max-h-60",
                "scrollbar-none",
                "no-scrollbar",
                "overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              )}
            >
              {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <React.Fragment key={group}>
                  {group !== "default" && (
                    <AutocompleteSection
                      title={group}
                      titleClassName={sectionTitleClassName}
                    >
                      {groupOptions.map((option, index) =>
                        renderOption(option, index)
                      )}
                    </AutocompleteSection>
                  )}
                  {group === "default" &&
                    groupOptions.map((option, index) =>
                      renderOption(option, index)
                    )}
                </React.Fragment>
              ))}
              {filteredOptions.length === 0 && (
                <div
                  className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400"
                  role="alert"
                >
                  No se encontraron resultados
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Autocomplete;
