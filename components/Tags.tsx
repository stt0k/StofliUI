import React from "react";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="ml-2 rounded-full dark:bg-cyan-900/20 dark:hover:bg-cyan-800/30 px-2 py-0.5 text-xs font-semibold dark:text-cyan-500 bg-cyan-600/20 hover:bg-cyan-500/40 text-cyan-600 transition-all duration-300 ease-in-out">
      {text}
    </span>
  );
};

export default Tag;
