"use client"

import Sidebar from "@/components/Sidebar"
import  Header  from "@/components/Header"
import BentoGrid from "@/components/ui/BentoGrid";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="mb-4 flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
              <ChevronRightIcon className="h-4 w-4" />
              <div className="font-medium text-zinc-950 dark:text-zinc-50">Frameworks</div>
            </div>
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Frameworks</h1>
              <BentoGrid />
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
