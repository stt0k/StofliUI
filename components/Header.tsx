import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { GithubIcon, TwitterIcon, MenuIcon, SearchIcon, MoonIcon, SunIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"


const Header = () => {
  const [theme, setTheme] = useState("light")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E4E7] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-[#27272A] dark:bg-black/95 dark:supports-[backdrop-filter]:black/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex md:flex-1">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">StokUI</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950 dark:hover:text-zinc-50/80 dark:text-zinc-50" href="/docs">
                Docs
              </Link>
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950/60 dark:hover:text-zinc-50/80 dark:text-zinc-50/60" href="/docs/components">
                Components
              </Link>
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950/60 dark:hover:text-zinc-50/80 dark:text-zinc-50/60" href="/themes">
                Themes
              </Link>
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950/60 dark:hover:text-zinc-50/80 dark:text-zinc-50/60" href="/examples">
                Examples
              </Link>
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950/60 dark:hover:text-zinc-50/80 dark:text-zinc-50/60" href="/blocks">
                Blocks
              </Link>
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950/60 hidden lg:inline-block dark:hover:text-zinc-50/80 dark:text-zinc-50/60" href="/charts">
                Charts
              </Link>
              <Link className="transition-colors hover:text-zinc-950/80 text-zinc-950/60 hidden lg:inline-block dark:hover:text-zinc-50/80 dark:text-zinc-50/60" href="/colors">
                Colors
              </Link>
            </nav>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-zinc-950">
              <nav className="flex flex-col space-y-4">
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/docs" onClick={closeMobileMenu}>
                  Docs
                </Link>
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/docs/components" onClick={closeMobileMenu}>
                  Components
                </Link>
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/themes" onClick={closeMobileMenu}>
                  Themes
                </Link>
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/examples" onClick={closeMobileMenu}>
                  Examples
                </Link>
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/blocks" onClick={closeMobileMenu}>
                  Blocks
                </Link>
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/charts" onClick={closeMobileMenu}>
                  Charts
                </Link>
                <Link className="text-lg font-medium hover:text-primary dark:text-white dark:hover:text-primary" href="/colors" onClick={closeMobileMenu}>
                  Colors
                </Link>
              </nav>
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 dark:ring-offset-zinc-950 dark:focus:ring-zinc-50 dark:data-[state=open]:bg-zinc-800">
                <XIcon className="h-4 w-4 dark:text-white" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSearch}>
                <SearchIcon className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="absolute left-0 top-full w-full bg-white p-4 md:hidden dark:bg-zinc-950">
                  <Input
                    type="search"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="mt-2 w-full">Search</Button>
                </form>
              )}
              <Input
                type="search"
                placeholder="Search documentation..."
                className="hidden h-9 md:inline-flex"
              />
            </div>
            <Button variant="ghost" size="icon" className="mr-2 hidden md:inline-flex">
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon" className="mr-2 hidden md:inline-flex">
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
  )
}

export default Header
