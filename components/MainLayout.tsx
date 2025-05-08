"use client";

import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import FooterDocs from "@/components/footer/FooterDocs";

interface NavItem {
  title: string;
  href: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, navItems = [] }) => {
  const hasNavItems = navItems.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
      <Header />
      <div className="flex-1 min-h-[calc(100vh-4.5rem)] pt-16">
        <div className="container mx-auto">
          <Sidebar />
          <div className="md:ml-[220px] lg:ml-[240px] px-4 md:px-6">
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
              <div className="mx-auto w-full min-w-0 min-h-[calc(100vh-12rem)]">
                {children} {/* Aquí va el contenido dinámico que pasas */}
              </div>
              {hasNavItems && (
                <div className="hidden text-sm xl:block">
                  <div className="sticky top-25 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
                    <div className="space-y-2">
                      <p className="font-medium">En esta página</p>
                      <ul className="m-0 list-none">
                        {navItems.map((item, index) => (
                          <li key={index}>
                            <a
                              className="inline-block py-1 text-zinc-500 no-underline transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                              href={item.href}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
