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

const SidebarLink = ({ href, label, isActive, tag, icon, isMainLink = false }: SidebarLinkProps) => {
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
          ? "mb-1" 
          : `border-s-[1px] py-1 ${
              isActive 
                ? "border-cyan-400 dark:border-cyan-500" 
                : "border-neutral-200 dark:border-white/20 hover:border-neutral-400 dark:hover:border-white/80"
            }`
      }`}
    >
      <Button
        variant="ghost"
        className={`w-full justify-start font-medium transition duration-200 cursor-pointer h-auto py-0 hover:bg-transparent dark:hover:bg-transparent ${
          isMainLink 
            ? "gap-2 mb-2.5 dark:text-neutral-50 text-neutral-950" 
            : ` ${
                isActive
                ? "text-cyan-400 dark:text-cyan-500 group-hover:text-cyan-400 group-hover:dark:text-cyan-500 pl-3 pr-2"
                : "pl-3 pr-2 dark:text-neutral-50/60 text-neutral-950/60 group-hover:text-neutral-950/85 group-hover:dark:text-neutral-50/90 hover:bg-transparent"
              }`
        }`}
      >
        {icon && (
          <span className={`-ml-4 ${isMainLink 
            ? "flex items-center justify-center w-8 h-8 rounded-sm border border-neutral-200 dark:border-white/20" 
            : ""}`}
          >
            {icon}
          </span>
        )}
        <span className={`truncate ${isMainLink && "group-hover:text-cyan-600 group-hover:dark:text-cyan-500"}`}>
          {tag ? truncateText(label) : label}
        </span>
        {tag && <Tag text={tag} />}
      </Button>
    </Link>
  );
};

export default SidebarLink;
