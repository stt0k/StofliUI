"use client";

import React from "react";

export interface StepProps {
  title: string;
  children: React.ReactNode;
  stepNumber?: number;
  className?: string;
}

const Step: React.FC<StepProps> = ({
  title,
  children,
  stepNumber,
  className = "",
}) => {
  return (
    <div
      className={`border-l-2 border-zinc-200 dark:border-zinc-800 pl-6 relative ${className}`}
    >
      <div className="absolute -left-4 -top-0 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-neutral-800 dark:text-white text-base font-bold shadow-md border-2 border-zinc-200 dark:border-zinc-900">
        {stepNumber}
      </div>
      <div className="flex items-center min-h-[32px]">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
      </div>
      <div className="mt-2 text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </div>
  );
};

export default Step;
