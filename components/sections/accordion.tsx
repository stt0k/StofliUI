"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  buttonClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  id: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
  className = "",
  buttonClassName = "",
  titleClassName = "",
  contentClassName = "",
  iconClassName = "",
  id,
}) => {
  const headingId = `accordion-header-${id}`;
  const contentId = `accordion-content-${id}`;

  return (
    <div
      className={cn(
        "border-b border-zinc-200 dark:border-zinc-800 p-3 last:border-0",
        className
      )}
    >
      <h3>
        <button
          className={cn(
            "flex w-full items-center justify-between py-4 text-left",
            buttonClassName
          )}
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headingId}
          type="button"
        >
          <span
            className={cn(
              "text-sm font-medium text-zinc-900 dark:text-zinc-100",
              titleClassName
            )}
          >
            {title}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-zinc-500 transition-transform duration-200",
              isOpen && "rotate-180",
              iconClassName
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            role="region"
            aria-labelledby={headingId}
            id={contentId}
          >
            <div
              className={cn(
                "pb-4 text-sm text-zinc-600 dark:text-zinc-400",
                contentClassName
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  defaultOpen?: number;
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpen = -1,
  allowMultiple = false,
  className = "",
  itemClassName = "",
  buttonClassName = "",
  titleClassName = "",
  contentClassName = "",
  iconClassName = "",
}) => {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>(
    defaultOpen >= 0 ? [defaultOpen] : []
  );

  const handleClick = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div
      className={cn(
        "divide-y divide-zinc-200 dark:divide-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800",
        className
      )}
      role="presentation"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={`accordion-${index}`}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleClick(index)}
          className={itemClassName}
          buttonClassName={buttonClassName}
          titleClassName={titleClassName}
          contentClassName={contentClassName}
          iconClassName={iconClassName}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion; 
