import React, { ReactNode } from 'react';

interface SpanHomeProps {
  children: ReactNode;
}

const SpanHome: React.FC<SpanHomeProps> = ({ children }) => {
  return (
    <span className="tracking-tight inline font-semibold from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b">
      {children}
    </span>
  );
};

export default SpanHome;

