import React from "react";

// icons
import { HiArrowRight } from "react-icons/hi2";
import { HiOutlineSparkles } from "react-icons/hi2";

const TagHome = () => {
  return (
    <div>
      <button className="flex justify-center items-center mb-8 gap-x-2 rounded-full dark:bg-[#00D1FF]/10 dark:hover:bg-[#00D1FF]/20 bg-[#00D1FF]/10 hover:bg-[#00D1FF]/40 px-4 py-1 text-lg transition-all duration-300 ease-in-out border dark:border-[#00D1FF]/20 border-[#00D1FF]/60 cursor-pointer">
        <span className="text-lg dark:text-[#00D1FF] text-[#00D1FF]">
          <HiOutlineSparkles />
        </span>
        <span className="text-sm dark:text-[#00D1FF] text-[#00D1FF]">
          Learn what's new
        </span>
        <span className="text-lg dark:text-[#00D1FF] text-[#00D1FF]">
          <HiArrowRight />
        </span>
      </button>
    </div>
  );
};

export default TagHome;
