import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SidebarSection from './SidebarSection';
import { sections } from './sectionsData';

const Sidebar = () => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Restaurar la posición de desplazamiento cuando cambia la ruta
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="md:block hidden">
      <aside 
        ref={sidebarRef}
        className="fixed top-[4.5rem] h-[calc(100vh-4.5rem)] w-[220px] lg:w-[240px] overflow-y-auto hide-scrollbar"
      >
        <div className="py-6 pl-8 pr-6 lg:py-8">
          <div className="space-y-4">
            {sections.map((section) => (
              <SidebarSection key={section.title} title={section.title} links={section.links} currentPath={pathname as string} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
