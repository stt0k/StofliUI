"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { GithubIcon, TwitterIcon, MenuIcon, SearchIcon, MoonIcon, SunIcon, XIcon } from "lucide-react"

export function FullComponent() {
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
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
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
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-[#E4E4E7] md:sticky md:block dark:border-[#27272A]">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <div className="space-y-4">
              {/* Introduction */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Getting Started</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Introduction
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Installation
                  </Button>
                </div>
              </div>
              {/* Frameworks */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Frameworks</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Next.js
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Astro
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Vite
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Laravel
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    React
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Angular
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Svelte
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Vue.js
                  </Button>
                </div>
                
              </div>
              {/* Components */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Components</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Accordion
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Autocomplete
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Avatar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Button
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Badge
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Calendar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Card
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Checkbox
                  </Button>
                </div>
              </div>
              {/* Components */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Components</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Accordion
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Autocomplete
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Avatar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Button
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Badge
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Calendar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Card
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Checkbox
                  </Button>
                </div>
              </div>
              {/* Components */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Components</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Accordion
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Autocomplete
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Avatar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Button
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Badge
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Calendar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Card
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                    Checkbox
                  </Button>
                </div>
              </div>
              {/* Components */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Components</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Accordion
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Autocomplete
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Avatar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Button
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Badge
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Calendar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Card
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    Checkbox
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="mb-4 flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
              <ChevronRightIcon className="h-4 w-4" />
              <div className="font-medium text-zinc-950 dark:text-zinc-50">Introduction</div>
            </div>
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Introduction</h1>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
              </p>
            </div>
            <div className="pb-12 pt-8">
              <div className="flex flex-col gap-4 text-lg">
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  This is NOT a component library. It&apos;s a collection of re-usable components that you can copy and paste into your apps.
                </p>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  What do you mean by not a component library? I mean you do not install it as a dependency. It is not available or distributed via npm.
                </p>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.
                </p>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  Use this as a reference to build your own component libraries.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="mt-10 scroll-m-20 border-b border-[#E4E4E7] dark:border-[#27272A] pb-2 text-2xl font-semibold tracking-tight">FAQ</h2>
              <div className="space-y-4">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-4 shadow-md bg-zinc-100 hover:bg-zinc-200/80 dark:bg-[#18181B] dark:hover:bg-[#18181B]/80">
                    <h3 className="text-lg font-medium">Why copy/paste and not packaged as a dependency?</h3>
                    <ChevronDownIcon className="h-5 w-5 transition duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.
                  </div>
                </details>
                {/* FAQ items */}
              </div>
            </div>
          </div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
              <div className="space-y-2">
                <p className="font-medium">On This Page</p>
                <ul className="m-0 list-none">
                  <li>
                    <a className="inline-block py-1 text-zinc-500 no-underline transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50" href="#faq">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
