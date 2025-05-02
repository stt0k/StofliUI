import React from "react";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="ml-2 rounded-full dark:bg-[#FF5733]/5 dark:hover:bg-[#FF5733]/10 px-2 py-0.5 text-xs font-semibold dark:text-[#FF5733] bg-[#FF5733]/5 hover:bg-[#FF5733]/40 text-[#FF5733] transition-all duration-300 ease-in-out">
      {text}
    </span>
  );
};

export default Tag;
