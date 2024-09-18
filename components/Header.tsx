"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { GithubIcon, TwitterIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react"
import HeadLinks from './header/HeadLinks'
import { headerData } from './header/HeaderData'
import { SearchCommand } from '@/components/ui/multisector'
import Tag from "@/components/ui/Tags"

const Header = () => {
  const [theme, setTheme] = useState("light")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  console.log(pathname)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
 
  const isActive = (href: string) => pathname === href;

  const SideBar = () => (
    <div className="h-full py-6 px-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Introduction */}
        <div className="py-1">
          <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">Getting Started</h2>
          <div className="space-y-1">
            <Link href="/" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive('/') ? 'text-sky-600 hover:text-sky-500' : ''}`}
              >
                Introduction
              </Button>
            </Link>
            <Link href="/docs/installation" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive('/docs/installation') ? 'text-sky-600 hover:text-sky-500' : ''}`}
              >
                Installation
              </Button>
            </Link>
            <Link href="/docs/cli" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive('/docs/cli') ? 'text-sky-600 hover:text-sky-500' : ''}`}
              >
                CLI
                <Tag text='New' />
              </Button>
            </Link>
          </div>
        </div>
        {/* Frameworks */}
        <div className="py-1">
          <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">Frameworks</h2>
          <div className="space-y-1">
            {['Next.js', 'Astro', 'Vite', 'Laravel', 'React', 'Angular', 'Svelte', 'Vue.js'].map((framework) => (
              <Link key={framework} href="/docs/frameworks" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                  {framework}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {/* Components */}
        <div className="py-1">
          <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">Components</h2>
          <div className="space-y-1">
            {['Accordion', 'Autocomplete', 'Avatar', 'Button', 'Badge', 'Calendar', 'Card', 'Checkbox'].map((component) => (
              <Button key={component} variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                {component}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-[#27272A] dark:bg-black/95 dark:supports-[backdrop-filter]:black/60">
      <div className="container flex h-14 items-center">
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
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-zinc-950 p-0">
            <SideBar />
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 dark:ring-offset-zinc-950 dark:focus:ring-zinc-50 dark:data-[state=open]:bg-zinc-800">
              <XIcon className="h-4 w-4 dark:text-white" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
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
            <Button variant="ghost" className='hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50' size="icon" onClick={toggleTheme}>
              {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
