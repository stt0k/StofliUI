import React from "react";

// icons
import { HiArrowRight } from 'react-icons/hi2'

const ButtonHome = () => {
  return (
    <button className="sm:w-36 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-[#000001] group">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#0284c7_100%)] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#0284c7_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-[#000001] bg-[#ffffff] px-3 py-1 text-sm font-medium dark:text-white text-black backdrop-blur-3xl gap-x-2">
        Get Started
        <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
          <HiArrowRight />
        </span>
      </span>
    </button>

  )
}

export default ButtonHome