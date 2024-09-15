import React from 'react';
import SidebarLink from './SidebarLink';

type SidebarSectionProps = {
  title: string;
  links: {
    href: string;
    label: string;
    tag?: string;
  }[];
  currentPath: string;
};

const SidebarSection = ({ title, links, currentPath }: SidebarSectionProps) => (
  <div className="py-1">
    <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">{title}</h2>
    <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
      {links.map((link) => (
        <SidebarLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={currentPath === link.href}
          tag={link.tag}
        />
      ))}
    </div>
  </div>
);

export default SidebarSection;
