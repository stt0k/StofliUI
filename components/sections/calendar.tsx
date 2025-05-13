"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { I18nProvider, useLocale } from "@react-aria/i18n";
import { cn } from "@/lib/utils";
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
  headerClassName?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
  daysContainerClassName?: string;
  dayClassName?: string;
  selectedDayClassName?: string;
  disabledDayClassName?: string;
  calendarTitleClassName?: string;
  monthTitleClassName?: string;
  navigationButtonClassName?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
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
  headerClassName = "",
  weekdaysClassName = "",
  weekdayClassName = "",
  daysContainerClassName = "",
  dayClassName = "",
  selectedDayClassName = "",
  disabledDayClassName = "",
  calendarTitleClassName = "",
  monthTitleClassName = "",
  navigationButtonClassName = "",
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
  const [selectedDate, setSelectedDate] = React.useState(
    readOnly ? new Date() : value
  );

  // Función para formatear fechas según el calendario seleccionado
  const formatDate = (date: Date, formatStr: string) => {
    if (formatStr === "MMMM yyyy") {
      const formatter = new Intl.DateTimeFormat(locale, {
        calendar: calendar,
        month: "long",
        year: "numeric",
      });
      return formatter.format(date).replace(" de ", " ");
    }
    return new Intl.DateTimeFormat(locale, {
      calendar: calendar,
      day: "numeric",
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
    default: `bg-zinc-100 dark:bg-zinc-800 ${
      !readOnly && "hover:bg-zinc-300 dark:hover:bg-zinc-600"
    }`,
    primary: `bg-blue-100 dark:bg-blue-900/30 ${
      !readOnly && "hover:bg-blue-300 dark:hover:bg-blue-700"
    }`,
    secondary: `bg-purple-100 dark:bg-purple-900/30 ${
      !readOnly && "hover:bg-purple-300 dark:hover:bg-purple-700"
    }`,
    success: `bg-green-100 dark:bg-green-900/30 ${
      !readOnly && "hover:bg-green-300 dark:hover:bg-green-700"
    }`,
    warning: `bg-amber-100 dark:bg-amber-900/30 ${
      !readOnly && "hover:bg-amber-300 dark:hover:bg-amber-700"
    }`,
    danger: `bg-red-100 dark:bg-red-900/30 ${
      !readOnly && "hover:bg-red-300 dark:hover:bg-red-700"
    }`,
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
        new Intl.DateTimeFormat(locale, { weekday: "narrow", calendar }).format(
          date
        )
      );
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [locale, calendar]);

  return (
    <div
      className={cn(
        "w-full max-w-sm p-4 bg-white dark:bg-zinc-900 shadow-lg",
        radiusClasses[radius],
        className
      )}
    >
      {calendarName && (
        <div
          className={cn(
            "text-sm text-center mb-2 text-zinc-500 dark:text-zinc-400",
            calendarTitleClassName
          )}
        >
          Calendario {calendarName}
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          headerClassName
        )}
      >
        <motion.button
          whileTap={!readOnly ? { scale: 0.95 } : undefined}
          onClick={prevMonth}
          className={cn(
            "p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full",
            navigationButtonClassName
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <h2
          className={cn(
            "text-lg font-semibold capitalize",
            monthTitleClassName
          )}
        >
          {formatDate(currentMonth, "MMMM yyyy")}
        </h2>
        <motion.button
          whileTap={!readOnly ? { scale: 0.95 } : undefined}
          onClick={nextMonth}
          className={cn(
            "p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full",
            navigationButtonClassName
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className={cn("grid grid-cols-7 gap-1 mb-2", weekdaysClassName)}>
        {weekDays.map((day) => (
          <div
            key={day}
            className={cn(
              "text-center text-sm font-medium text-zinc-500 dark:text-zinc-400",
              weekdayClassName
            )}
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
          className={cn("grid grid-cols-7 gap-1", daysContainerClassName)}
        >
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDisabled = isDateDisabled(day);

            // Base classes for the day
            const baseClasses = cn(
              "aspect-square flex items-center justify-center text-sm",
              radiusClasses[radius],
              !isDisabled && !readOnly ? "cursor-pointer" : "cursor-default",
              "transition-colors duration-200",
              !isSelected &&
                !isDisabled &&
                !readOnly &&
                "hover:text-black dark:hover:text-white"
            );

            // Determine the final className based on state
            const combinedDayClassName = cn(
              baseClasses,
              dayClassName,
              isSelected
                ? cn(selectedVariantClasses[variant], selectedDayClassName)
                : isCurrentMonth
                ? isDisabled
                  ? cn(
                      "bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-600 cursor-not-allowed",
                      disabledDayClassName
                    )
                  : variantClasses[variant]
                : "text-zinc-300 dark:text-zinc-600"
            );

            return (
              <div
                key={day.toString()}
                className={combinedDayClassName}
                {...(!readOnly &&
                  !isDisabled && {
                    onClick: () => handleDateSelect(day),
                    role: "button",
                    tabIndex: 0,
                    "data-selected": isSelected ? "true" : "false",
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
  const localeString = `${props.locale || "es"}-u-ca-${
    props.calendar || "gregory"
  }`;

  return (
    <I18nProvider locale={localeString}>
      <CalendarContent {...props} />
    </I18nProvider>
  );
};

export default Calendar;
