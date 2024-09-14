import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import Tag from "@/components/ui/Tags"

const Sidebar = () => {
   // Hook para obtener la ruta actual
   const pathname = usePathname();

   // Función para verificar si la ruta actual es igual al href
   const isActive = (href: string) => pathname === href;

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <div className="space-y-4">
              {/* Introduction */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">Getting Started</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Link href="/">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive('/') ? 'hover:text-sky-500 text-sky-600 dark:hover:text-zinc-50/80 dark:text-zinc-50 hover:translate-x-0' : ''}`}
                    >
                      Introduction
                    </Button>
                  </Link>
                  <Link href="/docs/installation">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive('/docs/installation') ? 'hover:text-sky-500 text-sky-600 dark:hover:text-zinc-50/80 dark:text-zinc-50 hover:translate-x-0' : ''}`}
                    >
                      Installation
                    </Button>
                  </Link>
                  <Link href="/docs/cli">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 ${isActive('/docs/cli') ? 'hover:text-sky-500 text-sky-600 dark:hover:text-zinc-50/80 dark:text-zinc-50 hover:translate-x-0' : ''}`}
                    >
                      CLI
                      <Tag text='New' />
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Frameworks */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">Frameworks</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Next.js
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Astro
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Vite
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Laravel
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      React
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Angular
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Svelte
                    </Button>
                  </Link>
                  <Link href="/docs/frameworks">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Vue.js
                    </Button>
                  </Link>
                </div>
                
              </div>
              {/* Components */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">Components</h2>
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
                <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">Components</h2>
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
            </div>
          </div>
        </aside>
  )
}

export default Sidebar