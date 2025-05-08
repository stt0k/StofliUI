import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Tag from "@/components/Tags";

type SidebarLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  tag?: string;
};

const SidebarLink = ({ href, label, isActive, tag }: SidebarLinkProps) => {
  // Función para truncar el texto a 11 caracteres y añadir ...
  const truncateText = (text: string) => {
    if (text.length > 11) {
      return text.substring(0, 11) + "...";
    }
    return text;
  };

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start font-normal cursor-pointer transition duration-200 hover:translate-x-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60 hover:text-zinc-950/85 ${
          isActive
            ? "hover:text-zinc-950/85 text-zinc-950 dark:hover:text-zinc-50/80 dark:text-zinc-50 hover:translate-x-0"
            : ""
        }`}
      >
        <span className="truncate">{tag ? truncateText(label) : label}</span>
        {tag && <Tag text={tag} />}
      </Button>
    </Link>
  );
};

export default SidebarLink;
