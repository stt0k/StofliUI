import React from 'react';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="ml-2 rounded-full dark:bg-[#001833] px-2 py-0.5 text-xs font-semibold dark:text-[#86B1E1] bg-[#CCE2FC] text-[#336BAD]">
      {text}
    </span>
  );
};

export default Tag;
