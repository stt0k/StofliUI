"use client";

import React from "react";

interface ContentComponentProps {
  title: string;
  description: string;
}

const ContentComponent: React.FC<ContentComponentProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          Docs
        </div>
        <ChevronRightIcon className="h-4 w-4" />
        <div className="font-medium text-cyan-600 dark:text-cyan-500">
          {title}
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </>
  );
};

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default ContentComponent;
