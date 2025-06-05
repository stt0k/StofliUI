import React from "react";
import Link from "next/link";
import Tag from "@/components/Tags";
import { Button } from "@/components/ui/button";

type SidebarLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  tag?: string;
  icon?: React.ReactNode;
  isMainLink?: boolean;
};

const SidebarLink = ({
  href,
  label,
  isActive,
  tag,
  icon,
  isMainLink = false,
}: SidebarLinkProps) => {
  // Función para truncar el texto a 11 caracteres y añadir ...
  const truncateText = (text: string) => {
    if (text.length > 20) {
      return text.substring(0, 20) + "...";
    }
    return text;
  };

  return (
    <Link
      href={href}
      className={`block group ${
        isMainLink
          ? "mb-1 hover:opacity-100"
          : `border-s-[1px] py-1 ${
              isActive
                ? "border-cyan-600 dark:border-cyan-500"
                : "border-neutral-200 dark:border-white/20 hover:border-neutral-400 dark:hover:border-white/80"
            }`
      }`}
    >
      <Button
        variant="ghost"
        className={`w-full justify-start font-normal transition duration-200 cursor-pointer h-auto py-0 hover:bg-transparent dark:hover:bg-transparent ${
          isMainLink
            ? "gap-3 mb-2.5 dark:text-neutral-50/60 text-neutral-950/60 group-hover:opacity-100"
            : ` ${
                isActive
                  ? "text-cyan-600 dark:text-cyan-500 0 pl-3 pr-2"
                  : "pl-3 pr-2 dark:text-neutral-50/60 text-neutral-950/60 group-hover:text-neutral-950/85 group-hover:dark:text-neutral-50/90 hover:bg-transparent"
              }`
        }`}
      >
        {icon && (
          <span
            className={`-ml-4 ${
              isMainLink
                ? "flex items-center justify-center w-6 h-6 rounded-sm p-1 shadow-sm dark:brightness-[1.35] dark:hover:brightness-150 group-hover:brightness-100 group-hover:ring-0 ring-1 ring-neutral-950/5 dark:ring-neutral-700/80 text-neutral-600 dark:text-white dark:opacity-50 opacity-70 group-hover:opacity-100 dark:group-hover:opacity-100 group-hover:text-neutral-950 dark:group-hover:text-neutral-400 transition-all duration-200"
                : ""
            }`}
          >
            {icon}
          </span>
        )}
        <span
          className={`truncate ${
            isMainLink &&
            "group-hover:text-neutral-950/85 group-hover:dark:text-neutral-50/90 transition-all duration-200"
          }`}
        >
          {tag ? truncateText(label) : label}
        </span>
        {tag && <Tag text={tag} />}
      </Button>
    </Link>
  );
};

export default SidebarLink;
