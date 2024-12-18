import React from 'react'

// icons
import { HiArrowRight } from 'react-icons/hi2'
import { HiOutlineSparkles } from "react-icons/hi2";

const TagHome = () => {
  return (
    <div>
      <button className='flex justify-center items-center mb-8 gap-x-2 rounded-full dark:bg-emerald-900/20 dark:hover:bg-emerald-800/30 bg-emerald-600/20 hover:bg-emerald-500/40 px-4 py-1 text-lg transition-all duration-300 ease-in-out border dark:border-emerald-900 border-emerald-600'>
        <span className='text-lg dark:text-emerald-400 text-emerald-700'>
            <HiOutlineSparkles />
        </span>
        <span className='text-sm dark:text-emerald-400 text-emerald-700'>Learn what's new</span>
        <span className='text-lg dark:text-emerald-400 text-emerald-700'>
            <HiArrowRight />
        </span>
      </button>
    </div>
  )
}

export default TagHome
