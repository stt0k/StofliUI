import React from 'react';
import { usePathname } from 'next/navigation';
import SidebarSection from './SidebarSection';
import { sections } from './sectionsData';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
      <div className="h-full py-6 pl-8 pr-6 lg:py-8">
        <div className="space-y-4">
          {sections.map((section) => (
            <SidebarSection key={section.title} title={section.title} links={section.links} currentPath={pathname} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
