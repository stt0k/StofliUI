import React from 'react'
import Link from 'next/link'

type HeadLinkProps = {
    href: string;
    title: string;
    isActive: boolean;
    hidden: boolean;
  };

const HeadLinks = ({ href, title, isActive, hidden }: HeadLinkProps) => {
  return (
    <Link
        href={href}
        className={`transition-colors ${hidden ? 'hidden xl:block' : ''} ${isActive ? 'text-emerald-600 hover:text-emerald-500 dark:hover:text-emerald-700 dark:text-emerald-500' : 'hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50'}`}>
        {title}
    </Link>
  )
}

export default HeadLinks
