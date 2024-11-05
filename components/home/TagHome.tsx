import React from 'react'

// icons
import { HiArrowRight } from 'react-icons/hi2'
import { HiOutlineSparkles } from "react-icons/hi2";

const TagHome = () => {
  return (
    <div>
      <button className='flex justify-center items-center mb-8 gap-x-2 rounded-full dark:bg-purple-900/20 dark:hover:bg-purple-800/30 bg-purple-600/20 hover:bg-purple-500/40 px-4 py-1 text-lg transition-all duration-300 ease-in-out border dark:border-purple-900 border-purple-600'>
        <span className='text-lg dark:text-purple-400 text-purple-700'>
            <HiOutlineSparkles />
        </span>
        <span className='text-sm dark:text-purple-400 text-purple-700'>Learn what's new</span>
        <span className='text-lg dark:text-purple-400 text-purple-700'>
            <HiArrowRight />
        </span>
      </button>
    </div>
  )
}

export default TagHome
