import React from "react";
import SidebarLink from "./SidebarLink";

type SidebarSectionProps = {
  title?: string;
  links: {
    href: string;
    label: string;
    tag?: string;
    icon?: React.ReactNode;
    isMainLink?: boolean;
  }[];
  currentPath: string;
};

const SidebarSection = ({ title, links, currentPath }: SidebarSectionProps) => (
  <div className="py-1">
    {title && (
      <h2 className="mb-3 text-sm font-medium tracking-tight text-neutral-950/90 dark:text-neutral-50">
        {title}
      </h2>
    )}
    <div className="flex flex-col">
      {links.map((link) => (
        <SidebarLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={currentPath === link.href}
          tag={link.tag}
          icon={link.icon}
          isMainLink={link.isMainLink}
        />
      ))}
    </div>
  </div>
);

export default SidebarSection;
