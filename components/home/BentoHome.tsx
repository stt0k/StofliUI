'use client'

import React from 'react'
import { bentoitems } from "@/components/home/BentoData"
import CardSpotlight from "@/components/CardSpotlight"

const BentoHome = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 container mx-auto px-4 pb-16">
      {bentoitems.map((item, index) => (
        <CardSpotlight key={index}>
          <article className="flex flex-col h-full justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className='p-2 rounded-[14px] border border-[#17c9644b] dark:border-[#6fee8dac] bg-[#17c96416] dark:bg-[#17c96416] shadow-[0_0_10px_#05ff71] dark:shadow-[0_0_10px_#6FEE8D]'>
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </div>
          </article>
        </CardSpotlight>
      ))}
    </div>
  )
}

export default BentoHome

