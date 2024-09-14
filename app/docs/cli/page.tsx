"use client"

import React from 'react'
import Sidebar from "@/components/Sidebar"
import  Header  from "@/components/Header"

const Cli = () => {
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
                  <div className="font-medium text-sky-600 dark:text-sky-600">CLI</div>
                </div>
                <div className="space-y-2">
                  <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI</h1>
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

export default Cli
