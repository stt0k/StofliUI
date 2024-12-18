import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Tag from '@/components/Tags';

type SidebarLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  tag?: string;
};

const SidebarLink = ({ href, label, isActive, tag }: SidebarLinkProps) => (
  <Link href={href}>
    <Button
      variant="ghost"
      className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60 ${
        isActive ? 'hover:text-emerald-500 text-emerald-600 dark:hover:text-zinc-50/80 dark:text-zinc-50 hover:translate-x-0' : ''
      }`}
    >
      {label}
      {tag && <Tag text={tag} />}
    </Button>
  </Link>
);

export default SidebarLink;
