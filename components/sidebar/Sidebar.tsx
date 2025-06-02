import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarSection from "./SidebarSection";
import { sections } from "./sectionsData";

const Sidebar = () => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Ordenar alfabéticamente los enlaces de la sección "Componentes"
  const processedSections = sections.map((section) => {
    if (section.title === "Componentes") {
      return {
        ...section,
        links: [...section.links].sort((a, b) =>
          a.label.localeCompare(b.label)
        ),
      };
    }
    return section;
  });

  // Restaurar la posición de desplazamiento cuando cambia la ruta
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="md:block hidden">
      <aside
        ref={sidebarRef}
        className={`fixed top-[6.5rem] w-[220px] lg:w-[240px] overflow-y-auto [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb] hover:[&::-webkit-scrollbar-thumb] ${
          isFooterVisible
            ? "h-[calc(100vh-6rem-7rem)]"
            : "h-[calc(100vh-10rem-2.5rem)]"
        }`}
      >
        <div className="pl-0 pr-6">
          <div className="space-y-3">
            {processedSections.map((section) => (
              <SidebarSection
                key={section.title}
                title={section.title}
                links={section.links}
                currentPath={pathname as string}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
