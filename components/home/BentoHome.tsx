import React from 'react'
import { bentoitems } from "@/components/home/BentoData"

const BentoHome = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 container mx-auto px-4 pb-16">
      {bentoitems.map((item, index) => (
        <article key={index} className="flex flex-col min-h-40 justify-between space-y-4 rounded-lg dark:bg-gradient-to-b border dark:from-black dark:from-5% dark:to-[#17c96408] p-6  shadow-sm dark:border-zinc-500/20">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className='p-2 rounded-[14px] border dark:border-[#6fee8dac] border-[#17c9644b] dark:bg-[#17c96416] bg-transparent dark:shadow-[0_0_10px_#6FEE8D] shadow-[0_0_10px_#05ff71]'>
              {item.icon}
              </div>
              <h3 className="text-base font-semibold">{item.title}</h3>
            </div>
            <p className="text-base text-zinc-500 dark:text-zinc-400">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default BentoHome
