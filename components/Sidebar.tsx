import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Sidebar = () => {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-[#E4E4E7] md:sticky md:block dark:border-[#27272A]">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <div className="space-y-4">
              {/* Introduction */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Getting Started</h2>
                <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Introduction
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start font-normal transition duration-200 hover:translate-x-1">
                      Installation
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Frameworks */}
              <div className="py-1">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Frameworks</h2>
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
  )
}

export default Sidebar