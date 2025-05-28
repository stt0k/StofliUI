"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";
import { es } from "date-fns/locale";
import Calendar from "../calendar/Calendar";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  className?: string;
  containerClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  calendarIconClassName?: string;
  arrowIconClassName?: string;
  calendarClassName?: string;
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
  readOnly?: boolean;
  minValue?: Date;
  maxValue?: Date;
  format?: string;
  label?: string;
  errorMessage?: string;
  required?: boolean;
  calendar?:
    | "buddhist"
    | "ethiopic"
    | "ethioaa"
    | "coptic"
    | "hebrew"
    | "indian"
    | "islamic-civil"
    | "islamic-tbla"
    | "islamic-umalqura"
    | "japanese"
    | "persian"
    | "roc"
    | "gregory"
    | "chinese";
  locale?: string;
  id?: string;
  name?: string;
  "aria-describedby"?: string;
}

// Tipo para el segmento de fecha
type DateSegment = "day" | "month" | "year";

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = "",
  containerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  calendarIconClassName = "",
  arrowIconClassName = "",
  calendarClassName = "",
  variant = "default",
  size = "md",
  radius = "md",
  disabled = false,
  readOnly = false,
  minValue,
  maxValue,
  format: dateFormat = "dd/MM/yyyy",
  label,
  errorMessage,
  required = false,
  calendar = "gregory",
  locale = "es",
  id,
  "aria-describedby": ariaDescribedby,
}) => {
  const initialDate = value || null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [day, setDay] = useState<string>(
    initialDate && isValid(initialDate) ? format(initialDate, "dd") : ""
  );
  const [month, setMonth] = useState<string>(
    initialDate && isValid(initialDate) ? format(initialDate, "MM") : ""
  );
  const [year, setYear] = useState<string>(
    initialDate && isValid(initialDate) ? format(initialDate, "yyyy") : ""
  );
  const [activeSegment, setActiveSegment] = useState<DateSegment | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Usamos useRef en lugar de useState para evitar renderizados adicionales
  const isUpdatingFromDateChangeRef = useRef(false);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  
  const segmentRefs = useMemo(() => ({
    day: dayRef,
    month: monthRef,
    year: yearRef
  }), []);

  const uniqueIdBase = useId();
  const uniqueId = `datepicker-${uniqueIdBase.replace(/:/g, "")}`;
  const componentId = id || uniqueId;
  const inputId = `${componentId}-input`;
  const labelId = `${componentId}-label`;
  const errorId = `${componentId}-error`;
  const calendarId = `${componentId}-calendar`;
  const helpTextId = `${componentId}-help`;
  const dayInputId = `${componentId}-day`;
  const monthInputId = `${componentId}-month`;
  const yearInputId = `${componentId}-year`;

  // Parsear el formato proporcionado para determinar el orden de los segmentos
  const getFormatSegments = () => {
    const format = dateFormat.toLowerCase();
    
    // Encontrar las posiciones de cada segmento en el formato
    const dayPos = format.indexOf("d");
    const monthPos = format.indexOf("m");
    const yearPos = format.indexOf("y");
    
    // Crear un array de segmentos ordenados por posición en el formato
    const positions = [
      { segment: "day", pos: dayPos },
      { segment: "month", pos: monthPos },
      { segment: "year", pos: yearPos }
    ].filter(item => item.pos !== -1);
    
    // Ordenar por posición en el formato
    positions.sort((a, b) => a.pos - b.pos);
    
    // Extraer solo los nombres de los segmentos en el orden correcto
    return positions.map(item => item.segment as DateSegment);
  };

  const formatSegments = getFormatSegments();

  // Determinar los placeholders según el formato
  const getPlaceholders = useCallback(() => {
    const format = dateFormat.toLowerCase();
    
    let dayPlaceholder = "dd";
    let monthPlaceholder = "MM";
    let yearPlaceholder = "yyyy";
    
    if (format.startsWith("yyyy") || format.includes("yyyy-")) {
      // Formato ISO: yyyy-MM-dd
      dayPlaceholder = "dd";
      monthPlaceholder = "MM";
      yearPlaceholder = "yyyy";
    } else if (format.includes("mmmm") || format.includes("'de'")) {
      // Formato de texto: dd 'de' MMMM 'de' yyyy
      dayPlaceholder = "dd";
      monthPlaceholder = "MM";
      yearPlaceholder = "yyyy";
    } else if (format.startsWith("mm") && format.includes("dd") && format.includes("yyyy")) {
      // Formato MM/dd/yyyy (americano)
      dayPlaceholder = "dd";
      monthPlaceholder = "MM";
      yearPlaceholder = "yyyy";
    }
    
    return { dayPlaceholder, monthPlaceholder, yearPlaceholder };
  }, [dateFormat]);
  
  const { dayPlaceholder, monthPlaceholder, yearPlaceholder } = getPlaceholders();

  // Función para obtener el separador del formato
  const getFormatSeparator = useCallback(() => {
    const format = dateFormat.toLowerCase();
    
    // Para formatos específicos, usar sus separadores adecuados
    if (format.startsWith("yyyy") || format.includes("yyyy-")) {
      return "-"; // Para formato ISO
    } else if (format.includes("mmmm") || format.includes("'de'")) {
      return " de "; // Para formato de texto con "de"
    } else if (format.startsWith("mm") && format.includes("dd") && format.includes("yyyy")) {
      return "/"; // Para formato MM/dd/yyyy (americano)
    }
    
    // Para otros formatos, detectar el separador automáticamente
    const separators = dateFormat.match(/[^a-zA-Z0-9']/g);
    return separators ? separators[0] : "/";
  }, [dateFormat]);

  const separator = getFormatSeparator();
  
  // Para formatos complejos, usamos un formato interno simple para el procesamiento
  const isComplexFormat = dateFormat.includes("'") || 
                         dateFormat.includes("MMMM") || 
                         dateFormat.includes("MMM") ||
                         dateFormat.includes("do");
  
  // Obtener el separador interno para parseo
  const internalSeparator = isComplexFormat ? "/" : separator;

  // Formatear fechas para lectores de pantalla
  const getFormattedDate = useCallback((date: Date | null) => {
    if (!date || !isValid(date)) return "";
    return format(date, "PPP", { locale: es });
  }, []);

  // Formatear fechas según el formato personalizado
  const getFormattedDateWithCustomFormat = useCallback((date: Date | null) => {
    if (!date || !isValid(date)) return "";
    return format(date, dateFormat, { locale: es });
  }, [dateFormat]);

  // Texto de ayuda para el rango de fechas
  const getDateRangeText = useCallback(() => {
    const parts = [];
    if (minValue) parts.push(`mínimo ${getFormattedDate(minValue)}`);
    if (maxValue) parts.push(`máximo ${getFormattedDate(maxValue)}`);
    return parts.length > 0 ? `Rango de fechas permitido: ${parts.join(", ")}` : "";
  }, [minValue, maxValue, getFormattedDate]);

  // Añadir una referencia para rastrear si estamos en el primer tecleo después de enfocar
  const firstKeyPressRef = useRef(false);

  // Manejador de clics en segmentos
  const handleSegmentClick = useCallback((segment: DateSegment) => {
    setActiveSegment(segment);
    // Al hacer clic, marcamos que sea el primer keypress para permitir reemplazo
    firstKeyPressRef.current = true;
  }, []);

  // Manejador de navegación por teclado entre segmentos
  const handleSegmentKeyDown = useCallback((e: React.KeyboardEvent, segment: DateSegment) => {
    // Navegación entre segmentos con teclas de flecha
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const currentIndex = formatSegments.indexOf(segment);
      if (currentIndex > 0) {
        setActiveSegment(formatSegments[currentIndex - 1]);
        // Reiniciamos el flag para permitir reemplazo
        firstKeyPressRef.current = true;
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const currentIndex = formatSegments.indexOf(segment);
      if (currentIndex < formatSegments.length - 1) {
        setActiveSegment(formatSegments[currentIndex + 1]);
        // Reiniciamos el flag para permitir reemplazo
        firstKeyPressRef.current = true;
      }
    } else if (e.key === "Backspace" || e.key === "Delete") {
      // Cuando se presiona Backspace o Delete, desactivamos el modo de reemplazo
      firstKeyPressRef.current = false;
      
      let currentValue = "";
      
      if (segment === "day") currentValue = day;
      else if (segment === "month") currentValue = month;
      else if (segment === "year") currentValue = year;
      
      // Si hay contenido, permitir borrar caracteres
      if (currentValue.length > 0) {
        e.preventDefault();
        const newValue = currentValue.slice(0, -1);
        
        if (segment === "day") setDay(newValue);
        else if (segment === "month") setMonth(newValue);
        else if (segment === "year") setYear(newValue);
        
        // Si hemos borrado todo, moverse al segmento anterior
        if (newValue === "") {
          const currentIndex = formatSegments.indexOf(segment);
          if (currentIndex > 0) {
            setTimeout(() => {
              setActiveSegment(formatSegments[currentIndex - 1]);
              // Marcar como primer keypress para permitir reemplazo en el segmento anterior
              firstKeyPressRef.current = true;
            }, 10);
          }
        }
      }
      // Si está vacío, moverse al segmento anterior
      else {
        const currentIndex = formatSegments.indexOf(segment);
        if (currentIndex > 0) {
          e.preventDefault();
          setActiveSegment(formatSegments[currentIndex - 1]);
          // Marcar como primer keypress para permitir reemplazo en el segmento anterior
          firstKeyPressRef.current = true;
        }
      }
    } else if (/^[0-9]$/.test(e.key)) { 
      // Solo reemplazar el contenido con el primer dígito si firstKeyPressRef.current es true
      if (firstKeyPressRef.current) {
        e.preventDefault();
        
        // Si es el primer tecleo, reemplazar todo el contenido
        if (segment === "day") {
          const numValue = parseInt(e.key, 10);
          if (numValue >= 4) {
            // Si es 4-9, añadir 0 delante y pasar al siguiente segmento
            setDay(`0${e.key}`);
            // Pasar al siguiente segmento
            const nextSegment = formatSegments[formatSegments.indexOf("day") + 1];
            if (nextSegment) {
              setTimeout(() => {
                setActiveSegment(nextSegment);
                firstKeyPressRef.current = true;
              }, 10);
            }
          } else {
            // Si es 0-3, simplemente actualizar y esperar el segundo dígito
            setDay(e.key);
          }
        } else if (segment === "month") {
          const numValue = parseInt(e.key, 10);
          if (numValue >= 2) {
            // Si es 2-9, añadir 0 delante y pasar al siguiente segmento
            const newMonth = `0${e.key}`;
            setMonth(newMonth);
            
            if (newMonth === "02" && day === "29") {
              setDay("28");
            }
            
            // Pasar al siguiente segmento
            const nextSegment = formatSegments[formatSegments.indexOf("month") + 1];
            if (nextSegment) {
              setTimeout(() => {
                setActiveSegment(nextSegment);
                firstKeyPressRef.current = true;
              }, 10);
            }
          } else {
            // Si es 0-1, simplemente actualizar y esperar el segundo dígito
            setMonth(e.key);
          }
        } else if (segment === "year") {
          setYear(e.key);
        }
        
        // Ya no es el primer tecleo
        firstKeyPressRef.current = false;
      }
    }
  }, [formatSegments, day, month, year]);

  // Anunciar fecha seleccionada para lectores de pantalla
  const announceSelectedDate = useCallback((date: Date) => {
    // Para formatos complejos, usar el formato personalizado en la visualización
    const displayDate = isComplexFormat 
      ? getFormattedDateWithCustomFormat(date) 
      : getFormattedDate(date);
      
    const announcement = `Fecha seleccionada: ${displayDate}`;
    const liveRegion = document.getElementById(`${componentId}-live`);
    if (liveRegion) {
      liveRegion.textContent = announcement;
    }
  }, [componentId, getFormattedDate, getFormattedDateWithCustomFormat, isComplexFormat]);

  const handleSegmentChange = useCallback((segment: DateSegment, value: string) => {
    // Actualizar el segmento correspondiente
    if (segment === "day") {
      // Lógica especial para el campo de día
      const numValue = parseInt(value, 10);
      
      // Si es vacío o no es un número, simplemente actualizar
      if (value === "" || isNaN(numValue)) {
        setDay(value);
        return;
      }
      
      if (value.length === 1) {
        // Si el valor es 4-9, añadir 0 delante y pasar al siguiente segmento
        if (numValue >= 4) {
          setDay(`0${value}`);
          // Pasar al siguiente segmento
          const currentIndex = formatSegments.indexOf("day");
          if (currentIndex < formatSegments.length - 1) {
            const nextSegment = formatSegments[currentIndex + 1];
            if (nextSegment) {
              setTimeout(() => {
                setActiveSegment(nextSegment);
                firstKeyPressRef.current = true;
              }, 10);
            }
          } else {
            // Si es el último segmento, quitar el foco
            setTimeout(() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              setActiveSegment(null);
              setIsFocused(false);
            }, 10);
          }
        } else {
          // Si es 0-3, simplemente actualizar y esperar el segundo dígito
          setDay(value);
        }
      } else if (value.length === 2) {
        // Validar que el día sea válido
        if (numValue > 0 && numValue <= 31) {
          // Validación adicional para febrero
          if (numValue === 29 && month === "02") {
            setDay("28");
          } else {
            setDay(value);
          }
          
          // Comprobar si es el último segmento según el formato
          const currentIndex = formatSegments.indexOf("day");
          if (currentIndex < formatSegments.length - 1) {
            // Pasar al siguiente segmento
            const nextSegment = formatSegments[currentIndex + 1];
            if (nextSegment) {
              setTimeout(() => {
                setActiveSegment(nextSegment);
                firstKeyPressRef.current = true;
              }, 10);
            }
          } else {
            // Si es el último segmento, quitar el foco
            setTimeout(() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              setActiveSegment(null);
              setIsFocused(false);
            }, 10);
          }
        } else {
          // Si el valor no es válido, mantener sólo el primer dígito
          setDay(value[0]);
        }
      }
      
      // Si se borró el último caracter y el campo está vacío, mover al anterior
      if (value === "" && day.length === 1) {
        const currentIndex = formatSegments.indexOf("day");
        if (currentIndex > 0) {
          setActiveSegment(formatSegments[currentIndex - 1]);
          firstKeyPressRef.current = true; // Reiniciar el flag para el nuevo segmento
        }
      }
    } else if (segment === "month") {
      // Lógica especial para el campo de mes
      const numValue = parseInt(value, 10);
      
      // Si es vacío o no es un número, simplemente actualizar
      if (value === "" || isNaN(numValue)) {
        setMonth(value);
        return;
      }
      
      if (value.length === 1) {
        // Si el valor es 2-9, añadir 0 delante y pasar al siguiente segmento
        if (numValue >= 2) {
          // Si este es febrero (02) y el día es 29, cambiarlo a 28
          const newMonth = `0${value}`;
          setMonth(newMonth);
          
          if (newMonth === "02" && day === "29") {
            setDay("28");
          }
          
          // Comprobar si hay siguiente segmento según el formato
          const currentIndex = formatSegments.indexOf("month");
          if (currentIndex < formatSegments.length - 1) {
            // Pasar al siguiente segmento
            const nextSegment = formatSegments[currentIndex + 1];
            if (nextSegment) {
              setTimeout(() => {
                setActiveSegment(nextSegment);
                firstKeyPressRef.current = true;
              }, 10);
            }
          } else {
            // Si es el último segmento, quitar el foco
            setTimeout(() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              setActiveSegment(null);
              setIsFocused(false);
            }, 10);
          }
        } else {
          // Si es 0-1, simplemente actualizar y esperar el segundo dígito
          setMonth(value);
        }
      } else if (value.length === 2) {
        // Validar que el mes sea válido
        if (numValue > 0 && numValue <= 12) {
          setMonth(value);
          
          // Si este es febrero (02) y el día es 29, cambiarlo a 28
          if (value === "02" && day === "29") {
            setDay("28");
          }
          
          // Comprobar si hay siguiente segmento según el formato
          const currentIndex = formatSegments.indexOf("month");
          if (currentIndex < formatSegments.length - 1) {
            // Pasar al siguiente segmento
            const nextSegment = formatSegments[currentIndex + 1];
            if (nextSegment) {
              setTimeout(() => {
                setActiveSegment(nextSegment);
                firstKeyPressRef.current = true;
              }, 10);
            }
          } else {
            // Si es el último segmento, quitar el foco
            setTimeout(() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              setActiveSegment(null);
              setIsFocused(false);
            }, 10);
          }
        } else {
          // Si el valor no es válido, mantener sólo el primer dígito
          setMonth(value[0]);
        }
      }
      
      // Si se borró el último caracter y el campo está vacío, mover al anterior
      if (value === "" && month.length === 1) {
        const currentIndex = formatSegments.indexOf("month");
        if (currentIndex > 0) {
          setActiveSegment(formatSegments[currentIndex - 1]);
          firstKeyPressRef.current = true; // Reiniciar el flag para el nuevo segmento
        }
      }
    } else if (segment === "year") {
      setYear(value);
      
      // Si se completó el año con 4 dígitos
      if (value.length === 4) {
        // Comprobar si es el último segmento según el formato
        const currentIndex = formatSegments.indexOf("year");
        if (currentIndex < formatSegments.length - 1) {
          // Si no es el último, pasar al siguiente segmento
          const nextSegment = formatSegments[currentIndex + 1];
          if (nextSegment) {
            setTimeout(() => {
              setActiveSegment(nextSegment);
              firstKeyPressRef.current = true;
            }, 10);
          }
        } else {
          // Solo si es el último segmento, quitar el foco
          setTimeout(() => {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
            setActiveSegment(null);
            setIsFocused(false);
          }, 10);
        }
      }
      
      // Si se escribió un 5º dígito en el año, hacer comportamiento circular
      if (value.length > 4) {
        setYear(value.substring(1));
      }
      
      // Si se borró el último caracter y el campo está vacío, mover al anterior
      if (value === "" && year.length === 1) {
        const currentIndex = formatSegments.indexOf("year");
        if (currentIndex > 0) {
          setActiveSegment(formatSegments[currentIndex - 1]);
          firstKeyPressRef.current = true; // Reiniciar el flag para el nuevo segmento
        }
      }
    }
  }, [formatSegments, day, month, year]);

  // Actualizamos el useEffect para manejar correctamente el foco
  useEffect(() => {
    if (activeSegment && segmentRefs[activeSegment]?.current) {
      segmentRefs[activeSegment].current?.focus();
      
      // No mostramos cursor pero el primer keypress seguirá siendo true para reemplazar
      const input = segmentRefs[activeSegment].current;
      if (input) {
        setTimeout(() => {
          const length = input.value.length;
          input.setSelectionRange(length, length);
        }, 10);
      }
    }
  }, [activeSegment, segmentRefs]);

  // Actualizamos el useEffect que actualiza segmentos cuando cambia selectedDate
  useEffect(() => {
    if (isUpdatingFromDateChangeRef.current) {
      isUpdatingFromDateChangeRef.current = false;
      return;
    }
    
    if (selectedDate && isValid(selectedDate)) {
      // Marcar que estamos actualizando desde un cambio de fecha
      isUpdatingFromDateChangeRef.current = true;
      
      // Actualizar segmentos con el formato correcto
      const formattedDay = format(selectedDate, "dd");
      const formattedMonth = format(selectedDate, "MM");
      
      // Para el año, no formateamos con ceros iniciales
      const fullYear = format(selectedDate, "yyyy");
      const yearWithoutLeadingZeros = String(parseInt(fullYear, 10));
      
      setDay(formattedDay);
      setMonth(formattedMonth);
      setYear(yearWithoutLeadingZeros);
    } else if (selectedDate === null) {
      setDay("");
      setMonth("");
      setYear("");
    }
  }, [selectedDate]);

  // Actualizamos el updateDateFromSegments para manejar formatos personalizados
  const updateDateFromSegments = useCallback(() => {
    // Si algún segmento está vacío, no hacemos nada
    if (!day || !month || !year) {
      if (day === "" && month === "" && year === "" && selectedDate !== null) {
        setSelectedDate(null);
        onChange?.(null);
      }
      return;
    }

    // Validación especial para el 29 de febrero (solo al ingresar manualmente)
    if (day === "29" && month === "02") {
      const yearNum = parseInt(year, 10);
      // Comprobar si es año bisiesto
      const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
      
      // Si no es año bisiesto, cambiar a 28 de febrero
      if (!isLeapYear) {
        setDay("28");
        return; // No continuamos con la actualización hasta que se procese este cambio
      }
    }

    // Si estamos actualizando desde un cambio de fecha, no continuamos para evitar el bucle
    if (isUpdatingFromDateChangeRef.current) {
      return;
    }

    try {
      // Completamos el año con ceros a la izquierda si es necesario
      // Solo para el procesamiento, no para la visualización
      let processedYear = year;
      if (year.length < 4) {
        processedYear = year.padStart(4, '0');
      }

      // Para formatos complejos, usar el formato interno
      const dateString = `${day}${internalSeparator}${month}${internalSeparator}${processedYear}`;
      const formatPattern = `dd${internalSeparator}MM${internalSeparator}yyyy`;
      const parsedDate = parse(dateString, formatPattern, new Date(), { locale: es });

      if (isValid(parsedDate)) {
        // Si la fecha es diferente, actualizar
        if (!selectedDate || format(parsedDate, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd')) {
          isUpdatingFromDateChangeRef.current = true;
          setSelectedDate(parsedDate);
          onChange?.(parsedDate);
          announceSelectedDate(parsedDate);
        }
      }
    } catch (error) {
      // Si no se puede parsear, no hacemos nada
    }
  }, [day, month, year, selectedDate, onChange, internalSeparator, announceSelectedDate]);

  // Efecto para actualizar la fecha cuando cambian los segmentos
  useEffect(() => {
    // Solo llamamos a updateDateFromSegments si todos los segmentos tienen valor
    // y no estamos en medio de una actualización desde el selectedDate
    if (!isUpdatingFromDateChangeRef.current && day && month && year) {
      updateDateFromSegments();
    }
  }, [day, month, year, updateDateFromSegments]);

  // Simplificamos el manejo de valores cuando cambian desde el prop value
  useEffect(() => {
    // Solo actualizar si el valor es diferente del actual
    if (value === null && selectedDate !== null) {
      setSelectedDate(null);
      // Si se limpia la fecha, no hay razón para mostrar formato complejo
      setShowingComplexFormat(false);
    } else if (value && (!selectedDate || format(value, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd'))) {
      setSelectedDate(value);
      // Al recibir una fecha nueva desde props, mostrar el formato complejo si aplica
      if (isComplexFormat) {
        setShowingComplexFormat(true);
      }
    }
  }, [value, selectedDate, isComplexFormat]);

  // Manejador para clic fuera del componente
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      datepickerRef.current &&
      !datepickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Cerrar el calendario cuando se hace clic fuera
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  
  // Optimizamos las funciones de manejo de eventos con useCallback
  const handleDateChange = useCallback((date: Date) => {
    // Establecer la fecha seleccionada directamente
    isUpdatingFromDateChangeRef.current = true;
    
    // Realizar todas las actualizaciones de estado juntas
    const formattedDay = format(date, "dd");
    const formattedMonth = format(date, "MM");
    const fullYear = format(date, "yyyy");
    const yearWithoutLeadingZeros = String(parseInt(fullYear, 10));
    
    // Cerrar el calendario inmediatamente antes de actualizar los otros estados
    setIsOpen(false);
    
    // Actualizar todos los estados sin setTimeout para evitar efectos visuales no deseados
    setSelectedDate(date);
    setDay(formattedDay);
    setMonth(formattedMonth);
    setYear(yearWithoutLeadingZeros);
    // Quitar el foco completamente
    setActiveSegment(null);
    setIsFocused(false);
    // Si hay algún elemento activo, quitarle el foco
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Si es formato complejo, mostrar el formato completo después de seleccionar
    if (isComplexFormat) {
      setShowingComplexFormat(true);
    }
    onChange?.(date);
    announceSelectedDate(date);
  }, [onChange, announceSelectedDate, isComplexFormat]);

  const toggleCalendar = () => {
    if (!disabled && !readOnly) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      
      if (newIsOpen) {
        // Si estamos abriendo el calendario, anunciar y dar foco al primer segmento
        const liveRegion = document.getElementById(`${componentId}-live`);
        if (liveRegion) {
          liveRegion.textContent = "Calendario abierto. Use las teclas de flecha para navegar por las fechas.";
        }
        
        // Activar el primer segmento si no hay ninguno activo
        if (!activeSegment && formatSegments.length > 0) {
          setActiveSegment(formatSegments[0]);
          setIsFocused(true);
        }
      } else {
        // Si estamos cerrando el calendario, quitar el foco
        setActiveSegment(null);
        setIsFocused(false);
        // Si hay algún elemento activo, quitarle el foco
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
  };

  // Clases para el tamaño del input
  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10",
    lg: "h-12 text-lg",
  };

  // Clases para el ancho del icono según el tamaño
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Clases para el radio
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-[0.25rem]",
    md: "rounded-[0.375rem]",
    full: "rounded-full",
  };

  // Clases para los colores según la variante
  const variantClasses = {
    default: `border-zinc-300 dark:border-zinc-700 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    primary: `border-blue-300 dark:border-blue-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    secondary: `border-purple-300 dark:border-purple-700 focus-within:border-purple-500 dark:focus-within:border-purple-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    success: `border-green-300 dark:border-green-700 focus-within:border-green-500 dark:focus-within:border-green-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    warning: `border-amber-300 dark:border-amber-700 focus-within:border-amber-500 dark:focus-within:border-amber-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
    danger: `border-red-300 dark:border-red-700 focus-within:border-red-500 dark:focus-within:border-red-500 ${
      errorMessage ? "border-red-500 dark:border-red-500" : ""
    }`,
  };

  // Clases para el color del ícono según la variante
  const iconColorClasses = {
    default: "text-zinc-500 dark:text-zinc-400",
    primary: "text-blue-500 dark:text-blue-400",
    secondary: "text-purple-500 dark:text-purple-400",
    success: "text-green-500 dark:text-green-400",
    warning: "text-amber-500 dark:text-amber-400",
    danger: "text-red-500 dark:text-red-400",
  };

  // Calcular la clase de ring según la variante
  const getRingClass = () => {
    if (errorMessage) {
      return "ring-red-300 dark:ring-red-700";
    }
    return `ring-${variant === "default" ? "zinc" : variant}-300 dark:ring-${
      variant === "default" ? "zinc" : variant
    }-700`;
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Al enfocar, activar el primer segmento
    if (!activeSegment && formatSegments.length > 0) {
      setActiveSegment(formatSegments[0]);
    }
  };

  // Necesitamos una variable para controlar si se está mostrando el formato completo
  const [showingComplexFormat, setShowingComplexFormat] = useState(true);
  
  // Cada vez que cambia el activeSegment, debemos mostrar los segmentos individuales
  useEffect(() => {
    if (activeSegment) {
      setShowingComplexFormat(false);
    }
  }, [activeSegment]);
  
  // Cuando se pierde el foco, volvemos a mostrar el formato complejo si corresponde
  useEffect(() => {
    if (!isFocused && isComplexFormat && selectedDate) {
      setShowingComplexFormat(true);
    }
  }, [isFocused, isComplexFormat, selectedDate]);

  const handleBlur = (e: React.FocusEvent) => {
    // Solo quitar el foco si estamos cambiando a un elemento que no es parte del datepicker
    if (!datepickerRef.current?.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
      setActiveSegment(null);
      // Al perder el foco, volver a mostrar el formato complejo si aplica
      if (isComplexFormat && selectedDate) {
        setShowingComplexFormat(true);
      }
    }
  };

  return (
    <div className={cn("w-full", className)} id={componentId}>
      {/* Región live para anuncios de accesibilidad */}
      <div
        id={`${componentId}-live`}
        className="sr-only"
        role="status"
        aria-live="polite"
      />

      {/* Texto de ayuda oculto para lectores de pantalla */}
      <div id={helpTextId} className="sr-only">
        {getDateRangeText()}
        Use las teclas de flecha para navegar por el calendario una vez abierto.
        Presione Enter para seleccionar una fecha o Escape para cerrar el calendario.
      </div>

      {label && (
        <label
          id={labelId}
          className={cn(
            "block text-sm font-medium mb-1",
            errorMessage
              ? "text-red-500 dark:text-red-400"
              : "text-zinc-700 dark:text-zinc-300",
            labelClassName
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
        ref={datepickerRef}
        className={cn(
          "relative w-full",
          disabled && "opacity-50 cursor-not-allowed",
          containerClassName
        )}
      >
        <div
          className={cn(
            "flex items-center border bg-white dark:bg-zinc-900 overflow-hidden",
            sizeClasses[size],
            radiusClasses[radius],
            variantClasses[variant],
            disabled && "bg-zinc-100 dark:bg-zinc-800",
            isFocused && "ring-2 ring-opacity-50",
            isFocused && getRingClass(),
            "transition-all duration-200",
            inputContainerClassName
          )}
          role="presentation"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div
            className={cn(
              "flex-grow flex items-center pl-3",
              // Quitamos cursor-pointer de aquí para aplicarlo solo a los iconos
            )}
          >
            <CalendarIcon
              className={cn(
                iconSizes[size],
                iconColorClasses[variant],
                "mr-2 flex-shrink-0 cursor-pointer",
                calendarIconClassName
              )}
              aria-hidden="true"
              onClick={toggleCalendar}
            />
            
            {/* Volvemos a un enfoque simple que funciona correctamente */}
            <div
              id={inputId}
              className={cn(
                "flex items-center gap-1",
                inputClassName
              )}
              role="group"
              aria-label={label || "Selector de fecha"}
              aria-describedby={cn(
                helpTextId,
                errorMessage ? errorId : null,
                ariaDescribedby
              )}
              tabIndex={-1}
            >
              {/* Si es un formato complejo, hay una fecha válida seleccionada y no estamos editando, mostrar el formato completo */}
              {isComplexFormat && selectedDate && isValid(selectedDate) && showingComplexFormat ? (
                <div 
                  id={formatSegments[0] === "day" ? dayInputId : formatSegments[0] === "month" ? monthInputId : yearInputId}
                  className={cn(
                    "px-2 py-1 w-full cursor-pointer"
                  )}
                  onClick={() => {
                    // Al hacer clic en el formato completo, activar el primer segmento y mostrar la edición segmentada
                    setShowingComplexFormat(false);
                    if (formatSegments.length > 0) {
                      setActiveSegment(formatSegments[0]);
                    }
                  }}
                >
                  {getFormattedDateWithCustomFormat(selectedDate)}
                </div>
              ) : (
                /* Si no es formato complejo o estamos editando, mostrar los segmentos individuales */
                formatSegments.map((segment, index) => {
                  // Determinamos qué valor y placeholder mostrar
                  let value = "";
                  let placeholder = "";
                  
                  if (segment === "day") {
                    value = day;
                    placeholder = dayPlaceholder;
                  } else if (segment === "month") {
                    value = month;
                    placeholder = monthPlaceholder;
                  } else if (segment === "year") {
                    value = year;
                    placeholder = yearPlaceholder;
                  }
                  
                  const isActive = activeSegment === segment;
                  
                  // Ajustamos la anchura según el segmento y el tamaño del datepicker
                  let width;
                  if (segment === "year") {
                    width = size === "lg" ? "w-16" : "w-12";
                  } else {
                    width = size === "lg" ? "w-9" : "w-7";
                  }
                  
                  // Para soportar formato yyyy-MM-dd, necesitamos mostrar segmentos en orden correcto
                  return (
                    <React.Fragment key={segment}>
                      <input
                        ref={segmentRefs[segment]}
                        type="text"
                        id={segment === "day" ? dayInputId : segment === "month" ? monthInputId : yearInputId}
                        className={cn(
                          "border-0 p-0 bg-transparent focus:ring-0 focus:outline-none",
                          width,
                          "text-center",
                          !value && "text-zinc-400 dark:text-zinc-500",
                          isActive && "bg-zinc-100 dark:bg-zinc-800 rounded",
                          "caret-transparent" // Ocultar el cursor de texto
                        )}
                        value={value}
                        placeholder={placeholder}
                        maxLength={segment === "year" ? 4 : 2}
                        onFocus={(e) => {
                          // No seleccionamos todo el contenido para permitir borrado carácter por carácter
                          const length = e.target.value.length;
                          e.target.setSelectionRange(length, length);
                          handleSegmentClick(segment);
                        }}
                        onKeyDown={(e) => handleSegmentKeyDown(e, segment)}
                        onChange={(e) => {
                          // Si es el primer keystroke después de hacer clic, ignorar el onChange
                          // porque ya lo manejamos en onKeyDown
                          if (firstKeyPressRef.current) {
                            return;
                          }
                          
                          // Capturar cambios manuales en los inputs y limitar caracteres
                          const maxLength = segment === "year" ? 4 : 2;
                          const newValue = e.target.value.replace(/\D/g, '').substring(0, maxLength);
                          
                          handleSegmentChange(segment, newValue);
                        }}
                        onClick={() => {
                          // No seleccionamos todo el contenido al hacer clic
                          // El cursor se quedará donde el usuario hizo clic
                          handleSegmentClick(segment);
                        }}
                        aria-label={
                          segment === "day" ? "Día" : segment === "month" ? "Mes" : "Año"
                        }
                        aria-invalid={!!errorMessage}
                      />
                      
                      {index < formatSegments.length - 1 && (
                        <span className={cn(
                          "text-zinc-500 dark:text-zinc-400",
                          separator.includes("de") && "px-1" // Añadir padding si el separador contiene "de"
                        )}>
                          {separator}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex items-center pr-3 flex-shrink-0 ml-auto gap-2">
            {!disabled && !readOnly && (
              <button
                type="button"
                onClick={toggleCalendar}
                className="flex-shrink-0 cursor-pointer"
                aria-label="Abrir calendario"
                tabIndex={0}
              >
                <ChevronDown
                  className={cn(
                    iconSizes[size],
                    iconColorClasses[variant],
                    "transition-transform duration-300",
                    isOpen && "transform rotate-180",
                    "flex-shrink-0",
                    arrowIconClassName
                  )}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              id={calendarId}
              role="dialog"
              aria-label="Calendario"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 350,
                duration: 0.2
              }}
              className="absolute z-50 mt-1 left-1/2 transform -translate-x-1/2 shadow-xl"
              style={{
                width: "min(100%, 320px)",
                transformOrigin: "top center",
              }}
              tabIndex={-1}
            >
              <Calendar
                value={selectedDate || undefined}
                onChange={handleDateChange}
                variant={variant}
                radius={radius}
                minValue={minValue}
                maxValue={maxValue}
                calendar={calendar}
                locale={locale}
                className={calendarClassName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {errorMessage && (
        <p
          id={errorId}
          className={cn(
            "mt-1 text-sm text-red-500 dark:text-red-400",
            errorClassName
          )}
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
