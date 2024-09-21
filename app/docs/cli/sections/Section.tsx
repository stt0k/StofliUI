import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="relative">
    <div className="absolute left-1 top-[7px] bottom-0 w-px dark:bg-[#001833] bg-[#CCE2FC]">
      <div className="absolute left-0 top-0 w-2 h-2 -ml-[3px] rounded-full dark:bg-[#86B1E1] bg-[#336BAD]" />
    </div>
    <div className="pl-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
      {children}
    </div>
  </section>
);

export default Section;
