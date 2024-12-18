import React from 'react';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="ml-2 rounded-full dark:bg-emerald-900/20 dark:hover:bg-emerald-800/30 px-2 py-0.5 text-xs font-semibold dark:emerald-400 bg-emerald-600/20 hover:bg-emerald-500/40 text-emerald-500 transition-all duration-300 ease-in-out">
      {text}
    </span>
  );
};

export default Tag;
