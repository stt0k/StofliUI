"use client"

import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {children} {/* Aquí va el contenido dinámico que pasas */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
