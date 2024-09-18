"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { GithubIcon, TwitterIcon, MoonIcon, SunIcon } from "lucide-react"
import HeadLinks from './header/HeadLinks'
import { headerData } from './header/HeaderData'

const Header = () => {
  const [theme, setTheme] = useState("light")

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
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            
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
      </header>
  )
}

export default Header
