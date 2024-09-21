import React from 'react';

interface TagsCLIProps {
  text: string;
}

const TagsCLI: React.FC<TagsCLIProps> = ({ text }) => (
  <code className="dark:bg-[#0018339e] bg-[#CCE2FC] text-gray-300 px-1 rounded">{text}</code>
);

export default TagsCLI;
