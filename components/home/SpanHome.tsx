import React, { ReactNode } from 'react';

interface SpanHomeProps {
  children: ReactNode;
}

const SpanHome: React.FC<SpanHomeProps> = ({ children }) => {
  return (
           
    <span className="relative inline-block">
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-full bg-gradient-to-r from-[#0072F5] to-[#0072F5] opacity-70 blur-3xl rounded-full"></span>
          </span>
          <span className="tracking-tight inline font-semibold from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b">
            {children}
          </span>
        </span>
  );
};

export default SpanHome;

