import React from "react";

interface HeadingAnchorProps {
  id: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const HeadingAnchor: React.FC<HeadingAnchorProps> = ({
  id,
  level = 2,
  children,
  className = "",
}) => {
  // Base classes without layout properties
  const baseClasses =
    "scroll-m-20 pb-2 font-semibold tracking-tight dark:text-neutral-100 text-neutral-900";

  // Classes specific to heading level
  const levelClasses = {
    1: "mt-8 mb-4 text-4xl",
    2: "mt-8 text-[1.675rem]",
    3: "mt-6 text-xl",
    4: "mt-4 text-lg",
    5: "mt-4 text-base",
    6: "mt-4 text-sm",
  };

  // Determine the size of the hash symbol based on heading level
  const hashSizes = {
    1: "text-3xl",
    2: "text-xl",
    3: "text-lg",
    4: "text-base",
    5: "text-sm",
    6: "text-xs",
  };

  return (
    <div
      id={id}
      className={`${baseClasses} ${levelClasses[level]} ${className}`}
    >
      <a
        href={`#${id}`}
        className="group no-underline inline-flex items-center"
      >
        <span className="inline-block">{children}</span>
        <span
          className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium text-blue-600 dark:text-blue-400 ${hashSizes[level]}`}
        >
          #
        </span>
      </a>
    </div>
  );
};

export default HeadingAnchor;
