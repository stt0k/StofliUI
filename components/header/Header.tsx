// components/Header.tsx
"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { GithubIcon, TwitterIcon, MenuIcon, XIcon } from "lucide-react"
import HeadLinks from './HeadLinks'
import { headerData } from './HeaderData'
import { SearchCommand } from '@/components/search/Search'
import { ModeToggle } from "@/components/change-theme"
import SideBar from '@/components/sidebar/SideBarMobile'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Navegación para pantallas grandes */}
        <div className="2xl:m-4 m-8 hidden md:flex md:flex-1">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">Stofli/UI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-base font-medium">
            {headerData.map((data) => (
              <HeadLinks
                key={data.title}
                href={data.link}
                title={data.title}
                isActive={pathname === data.link ? true : false}
                hidden={data.hidden ? true : false}
              />
            ))}
          </nav>
        </div>
        
        {/* Sidebar para pantallas móviles */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-zinc-950 p-0">
            {/* Renderiza el SideBar con el prop closeMobileMenu */}
            <SideBar closeMobileMenu={closeMobileMenu} />
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400 dark:text-white">
              <XIcon className="h-4 w-4 dark:text-white" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
        
        {/* Iconos y opciones adicionales */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <SearchCommand />
            <Button variant="ghost" size="icon" className="mr-2 hidden md:inline-flex hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50">
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon" className="mr-2 hidden md:inline-flex hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50">
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
