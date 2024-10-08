// components/SideBar.tsx
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { sections } from './sectionsData'
import Tag from "@/components/Tags"

const SideBarMobile = ({ closeMobileMenu }: { closeMobileMenu: () => void }) => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href;

  return (
    <div className="h-full py-6 px-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Título principal */}
        <div className="py-1">
          <Link href="/">
            <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">Stofli/UI</h2>
          </Link>
        </div>
        
        {/* Mapear secciones desde sectionsData */}
        {sections.map((section) => (
          <div key={section.title} className="py-1">
            <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">{section.title}</h2>
            <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
              {section.links.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive(link.href) ? 'hover:text-sky-500 text-sky-600 dark:hover:text-zinc-50/80 dark:text-zinc-50' : ''}`}
                  >
                    {link.label}
                    {link.tag && <Tag text={link.tag} />}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBarMobile
