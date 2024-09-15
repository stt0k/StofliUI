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
        className={`transition-colors ${hidden ? 'hidden lg:block' : ''} ${isActive ? 'text-sky-600 hover:text-sky-500 dark:hover:text-sky-700 dark:text-sky-600' : 'hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50'}`}>
        {title}
    </Link>
  )
}

export default HeadLinks
