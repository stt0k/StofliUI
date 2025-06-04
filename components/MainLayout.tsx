"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import FooterDocs from "@/components/footer/FooterDocs";
import Pagination from "@/components/sections/Pagination";
import { useRouter, usePathname } from "next/navigation";
import PageNav from "@/components/docs/PageNav";

interface NavItem {
  title: string;
  href: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  toc?: NavItem[];
}

// Secciones principales y frameworks en orden predefinido
const mainPages = [
  { name: "introducción", path: "/docs/introduccion", section: "main" },
  { name: "instalación", path: "/docs/instalacion", section: "main" },
];

const frameworkPages = [
  { name: "next.js", path: "/docs/frameworks/nextjs", section: "frameworks" },
  { name: "astro", path: "/docs/frameworks/astro", section: "frameworks" },
  { name: "vite", path: "/docs/frameworks/vite", section: "frameworks" },
  { name: "laravel", path: "/docs/frameworks/laravel", section: "frameworks" },
];

// Componentes (se ordenarán alfabéticamente)
const componentPages = [
  {
    name: "accordion",
    path: "/docs/componentes/accordion",
    section: "componentes",
  },
  {
    name: "autocomplete",
    path: "/docs/componentes/autocomplete",
    section: "componentes",
  },
  { name: "avatar", path: "/docs/componentes/avatar", section: "componentes" },
  { name: "badge", path: "/docs/componentes/badge", section: "componentes" },
  {
    name: "breadcrumbs",
    path: "/docs/componentes/breadcrumbs",
    section: "componentes",
  },
  { name: "button", path: "/docs/componentes/button", section: "componentes" },
  {
    name: "calendar",
    path: "/docs/componentes/calendar",
    section: "componentes",
  },
  { name: "card", path: "/docs/componentes/card", section: "componentes" },
  {
    name: "checkbox",
    path: "/docs/componentes/checkbox",
    section: "componentes",
  },
  {
    name: "circular-progress",
    path: "/docs/componentes/circular-progress",
    section: "componentes",
  },
  {
    name: "date-picker",
    path: "/docs/componentes/date-picker",
    section: "componentes",
  },
  {
    name: "dropdown",
    path: "/docs/componentes/dropdown",
    section: "componentes",
  },
  { name: "input", path: "/docs/componentes/input", section: "componentes" },
  {
    name: "number-input",
    path: "/docs/componentes/number-input",
    section: "componentes",
  },
  {
    name: "pagination",
    path: "/docs/componentes/pagination",
    section: "componentes",
  },
  {
    name: "progress",
    path: "/docs/componentes/progress",
    section: "componentes",
  },
  {
    name: "spinner",
    path: "/docs/componentes/spinner",
    section: "componentes",
  },
  { name: "switch", path: "/docs/componentes/switch", section: "componentes" },
  { name: "tabs", path: "/docs/componentes/tabs", section: "componentes" },
  { name: "toast", path: "/docs/componentes/toast", section: "componentes" },
  {
    name: "tooltip",
    path: "/docs/componentes/tooltip",
    section: "componentes",
  },
].sort((a, b) => a.name.localeCompare(b.name));

// Crear estructura unificada de todas las páginas para la navegación
const allPages = [...mainPages, ...frameworkPages, ...componentPages];

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  navItems = [],
  toc = [],
}) => {
  const hasNavItems = navItems.length > 0 || toc.length > 0;
  const itemsToDisplay = toc.length > 0 ? toc : navItems;
  const router = useRouter();
  const pathname = usePathname();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const totalPages = allPages.length;

  useEffect(() => {
    // Encontrar el índice de la página actual en nuestra lista unificada
    const currentIndex = allPages.findIndex((page) => {
      // Coincidencia exacta con la ruta
      if (pathname === page.path) {
        return true;
      }

      // Verificar si termina con el nombre pero con una coincidencia más precisa
      // Asegurarse que sea el final del pathname o precedido por una barra
      const pageNameAtEnd = new RegExp(`/(${page.name})$`);
      return pageNameAtEnd.test(pathname);
    });

    setCurrentPageIndex(currentIndex !== -1 ? currentIndex + 1 : 0);
  }, [pathname]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      const targetPage = allPages[page - 1];
      router.push(targetPage.path);
    }
  };

  // Obtener títulos para los botones de navegación
  const getPrevNextTitles = () => {
    const prevIndex = currentPageIndex - 2; // -2 porque currentPageIndex empieza en 1
    const nextIndex = currentPageIndex;

    const prevTitle = prevIndex >= 0 ? allPages[prevIndex].name : "";
    const nextTitle = nextIndex < totalPages ? allPages[nextIndex].name : "";

    // Capitalizar primera letra y reemplazar guiones por espacios
    const formatTitle = (title: string) => {
      if (!title) return "";
      return title
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    return {
      previous: formatTitle(prevTitle),
      next: formatTitle(nextTitle),
    };
  };

  const { previous, next } = getPrevNextTitles();

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-50">
      <Header />
      <div className="flex-1 min-h-[calc(100vh-4.5rem)] pt-8">
        <div className="container mx-auto">
          <Sidebar />
          <div className="md:ml-[255px] lg:ml-[275px] px-4 md:px-6">
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
              <div className="mx-auto max-w-2xl min-w-0 min-h-[calc(100vh-12rem)]">
                {children} {/* Aquí va el contenido dinámico que pasas */}
                {/* Paginación unificada para todas las secciones */}
                {currentPageIndex > 0 && (
                  <div className="mt-20 pb-8 px-2 ms-6">
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPageIndex}
                      onPageChange={handlePageChange}
                      variant="default"
                      withNumbers={false}
                      withText={true}
                      withEdges={false}
                      size="md"
                      siblingsCount={1}
                      fullWidth={true}
                      customText={{
                        previous: previous ? `${previous}` : "Página anterior",
                        next: next ? `${next}` : "Página siguiente",
                      }}
                      showPrevious={currentPageIndex > 1}
                      showNext={currentPageIndex < totalPages}
                    />
                  </div>
                )}
              </div>
              {hasNavItems && (
                <div className="hidden text-sm xl:block">
                  <PageNav links={itemsToDisplay} />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <FooterDocs />
    </div>
  );
};

export default MainLayout;
