"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { I18nProvider, useLocale } from "@react-aria/i18n";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

type CalendarSystem = 
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

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  radius?: "none" | "sm" | "md" | "full";
  readOnly?: boolean;
  minValue?: Date;
  maxValue?: Date;
  calendar?: CalendarSystem;
  locale?: string;
}

const CalendarContent: React.FC<CalendarProps> = ({
  value,
  onChange,
  className = "",
  variant = "default",
  radius = "md",
  readOnly = false,
  minValue,
  maxValue,
  calendar = "gregory",
}) => {
  const { locale } = useLocale();
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    if (readOnly) {
      const initialDate = new Date(2025, 2);
      return initialDate;
    }
    return value || new Date();
  });
  const [selectedDate, setSelectedDate] = React.useState(readOnly ? new Date() : value);

  // Función para formatear fechas según el calendario seleccionado
  const formatDate = (date: Date, formatStr: string) => {
    if (formatStr === "MMMM yyyy") {
      const formatter = new Intl.DateTimeFormat(locale, {
        calendar: calendar,
        month: 'long',
        year: 'numeric'
      });
      return formatter.format(date).replace(" de ", " ");
    }
    return new Intl.DateTimeFormat(locale, {
      calendar: calendar,
      day: 'numeric'
    }).format(date);
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleDateSelect = (date: Date) => {
    if (readOnly) return;
    if (minValue && date < minValue) return;
    if (maxValue && date > maxValue) return;
    setSelectedDate(date);
    onChange?.(date);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isDateDisabled = (date: Date) => {
    if (minValue && date < minValue) return true;
    if (maxValue && date > maxValue) return true;
    return false;
  };

  const variantClasses = {
    default: `bg-zinc-100 dark:bg-zinc-800 ${!readOnly && 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`,
    primary: `bg-blue-100 dark:bg-blue-900/30 ${!readOnly && 'hover:bg-blue-200 dark:hover:bg-blue-800/40'}`,
    secondary: `bg-purple-100 dark:bg-purple-900/30 ${!readOnly && 'hover:bg-purple-200 dark:hover:bg-purple-800/40'}`,
    success: `bg-green-100 dark:bg-green-900/30 ${!readOnly && 'hover:bg-green-200 dark:hover:bg-green-800/40'}`,
    warning: `bg-amber-100 dark:bg-amber-900/30 ${!readOnly && 'hover:bg-amber-200 dark:hover:bg-amber-800/40'}`,
    danger: `bg-red-100 dark:bg-red-900/30 ${!readOnly && 'hover:bg-red-200 dark:hover:bg-red-800/40'}`,
  };

  const selectedVariantClasses = {
    default: "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
    primary: "bg-blue-500 dark:bg-blue-400 text-white",
    secondary: "bg-purple-500 dark:bg-purple-400 text-white",
    success: "bg-green-500 dark:bg-green-400 text-white",
    warning: "bg-amber-500 dark:bg-amber-400 text-white",
    danger: "bg-red-500 dark:bg-red-400 text-white",
  };

  const radiusClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded",
    full: "rounded-lg",
  };

  const buttonClasses = `
    aspect-square flex items-center justify-center text-sm
    transition-colors duration-200
    ${!readOnly && 'hover:scale-110 active:scale-95'}
    ${radiusClasses[radius]}
  `;

  // Obtener el nombre del calendario para mostrar en el título
  const getCalendarName = () => {
    switch (calendar) {
      case "buddhist":
        return "Budista";
      case "ethiopic":
        return "Etíope";
      case "ethioaa":
        return "Etíope Amete Alem";
      case "coptic":
        return "Copto";
      case "hebrew":
        return "Hebreo";
      case "indian":
        return "Indio";
      case "islamic-civil":
        return "Islámico Civil";
      case "islamic-tbla":
        return "Islámico Tabular";
      case "islamic-umalqura":
        return "Islámico Umm al-Qura";
      case "japanese":
        return "Japonés";
      case "persian":
        return "Persa";
      case "roc":
        return "República de China";
      case "chinese":
        return "Chino";
      case "gregory":
      default:
        return "";
    }
  };

  const calendarName = getCalendarName();

  // Obtener los nombres de los días de la semana según la localización
  const weekDays = React.useMemo(() => {
    const days = [];
    const date = new Date(2024, 0, 1); // Usar una fecha fija para obtener los nombres
    for (let i = 0; i < 7; i++) {
      days.push(
        new Intl.DateTimeFormat(locale, { weekday: 'narrow', calendar }).format(date)
      );
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [locale, calendar]);

  return (
    <div className={`w-full max-w-sm p-4 ${radiusClasses[radius]} bg-white dark:bg-zinc-900 shadow-lg ${className}`}>
      {calendarName && (
        <div className="text-sm text-center mb-2 text-zinc-500 dark:text-zinc-400">
          Calendario {calendarName}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileTap={!readOnly ? { scale: 0.95 } : undefined}
          onClick={prevMonth}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <h2 className="text-lg font-semibold capitalize">
          {formatDate(currentMonth, "MMMM yyyy")}
        </h2>
        <motion.button
          whileTap={!readOnly ? { scale: 0.95 } : undefined}
          onClick={nextMonth}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.toString()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDisabled = isDateDisabled(day);

            return (
              <div
                key={day.toString()}
                className={`
                  ${buttonClasses}
                  ${isSelected 
                    ? selectedVariantClasses[variant]
                    : isCurrentMonth
                    ? isDisabled 
                      ? 'bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                      : variantClasses[variant]
                    : "text-zinc-300 dark:text-zinc-600"
                  }
                  ${!isDisabled && !readOnly ? 'cursor-pointer' : 'cursor-default'}
                `}
                {...(!readOnly && !isDisabled && {
                  onClick: () => handleDateSelect(day),
                  role: "button",
                  tabIndex: 0,
                })}
              >
                {formatDate(day, "d")}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Calendar: React.FC<CalendarProps> = (props) => {
  const localeString = `${props.locale || 'es'}-u-ca-${props.calendar || 'gregory'}`;
  
  return (
    <I18nProvider locale={localeString}>
      <CalendarContent {...props} />
    </I18nProvider>
  );
};

export default Calendar; 