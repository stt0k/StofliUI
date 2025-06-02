"use client";

import { useEffect } from 'react';
import { Rocket, Zap } from "lucide-react";
import Head from "next/head";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/FooterDocs";
import Avatar from "@/components/sections/Avatar";
import Image from "next/image";

type Release = {
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  bugfixes?: string[];
  improvements?: string[];
  icon?: React.ReactNode;
  author: {
    name: string;
    image: string;
    role: string;
  };
};

export default function ChangelogPage() {
  // Aplicar fix para sticky
  useEffect(() => {
    // En móvil no necesitamos estas modificaciones
    if (window.innerWidth < 768) return;
    
    // Guardar estilos originales
    const originalHtmlStyles = document.documentElement.getAttribute('style') || '';
    const originalBodyStyles = document.body.getAttribute('style') || '';
    
    // Aplicar estilos necesarios usando cssText para asegurar que se apliquen correctamente
    document.documentElement.style.cssText += '; overflow: visible !important;';
    document.body.style.cssText += '; overflow: visible !important;';
    
    // Cleanup
    return () => {
      document.documentElement.setAttribute('style', originalHtmlStyles);
      document.body.setAttribute('style', originalBodyStyles);
    };
  }, []);

  const releases: Release[] = [
    {
      version: "v1.0.0",
      date: "Junio 1, 2025",
      title: "Lanzamiento Inicial",
      description:
        "El primer lanzamiento público de StofliUI: una librería de componentes moderna, personalizable y accesible.",
      features: [
        "20+ componentes esenciales",
        "Compatibles con Tailwind CSS v3 y v4",
        "100% compatible con TypeScript",
        "Diseño responsive en todos los componentes",
        "Documentación completa y ejemplos",
      ],
      icon: <Rocket className="w-5 h-5" />,
      author: {
        name: "stt0k & hctor12",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        role: "Founders & Developers"
      }
    },
    {
      version: "v1.1.0",
      date: "Agosto 15, 2025",
      title: "Mejoras de Rendimiento",
      description:
        "Importantes mejoras de rendimiento y nuevos componentes añadidos a la biblioteca.",
      features: [
        "5 nuevos componentes: Modal, Drawer, Select, Slider y Popover",
        "Soporte para React Server Components",
        "Mejoras en la accesibilidad de todos los componentes"
      ],
      improvements: [
        "Reducción del tamaño del bundle en un 30%",
        "Mejor rendimiento en dispositivos móviles",
        "Documentación mejorada con más ejemplos"
      ],
      bugfixes: [
        "Corregido problema con el componente Dropdown en Safari",
        "Solucionado error de renderizado en el tema oscuro"
      ],
      icon: <Zap className="w-5 h-5" />,
      author: {
        name: "Test Sticky",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        role: "Lead Developer"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black" style={{ overflow: 'visible !important' }}>
      {/* Añadir estilos globales para el sticky */}
      <Head>
        <style>{`
          /* Estilos globales para solucionar el problema de sticky */
          html, body, #__next, [data-nextjs-scroll-focus-boundary], 
          div, main, article, section, aside {
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
          }
        `}</style>
      </Head>
      
      <Header />

      {/* Espaciador para header fijo */}
      <div className="h-24 md:h-32"></div>

      <main className="container mx-auto px-4 pt-4 md:pt-8 pb-20 md:pb-32" style={{ overflow: 'visible !important' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col items-center pt-4 md:pt-8" style={{ overflow: 'visible !important' }}>
          {/* Header section with "What's new?" */}
          <div className="w-full max-w-6xl mb-4 text-center md:text-left">
            <span className="text-cyan-600 dark:text-cyan-500 font-medium">What's new?</span>
          </div>
          
          <h1 className="w-full max-w-6xl text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
            Changelog
          </h1>
          
          <p className="w-full max-w-6xl text-lg text-gray-600 dark:text-zinc-400 leading-relaxed mb-16 text-center md:text-left">
            Sigue la evolución de StofliUI, descubre las últimas novedades, mejoras y correcciones de errores.
          </p>

          {/* Changelog Timeline */}
          <div className="space-y-24 flex flex-col items-center" style={{ overflow: 'visible !important' }}>
            {releases.map((release, index) => (
              <div key={index} className="relative w-full max-w-6xl mb-0" style={{ overflow: 'visible !important' }}>
                {/* Contenedor para cada versión */}
                <div className="md:flex gap-12 lg:gap-16 xl:gap-24 items-start" style={{ overflow: 'visible !important' }}>
                  {/* Left column - sticky solo en desktop */}
                  <div className="w-full md:w-48 lg:w-56 static md:sticky md:top-32" style={{ 
                    overflow: 'visible !important',
                    height: 'auto',
                    marginBottom: '2rem'
                  }}>
                    <div className="pb-2 bg-white dark:bg-black z-20 transition-all duration-200">
                      <div className="flex flex-col items-start">
                        <h2 className="text-sm font-semibold mb-4">
                          StofliUI {release.version}
                        </h2>
                        
                        {/* Author info with Avatar */}
                        <div className="flex items-center">
                          <Avatar 
                            src={release.author.image}
                            alt={release.author.name}
                            size="md"
                            className="mr-3"
                          />
                          <div>
                            <p className="font-semibold">{release.author.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{release.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content section - más ancho */}
                  <div className="flex-1 max-w-3xl mt-0 md:mt-0">
                    {/* Image */}
                    <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
                      <Image 
                        src="/home.png"
                        alt="StofliUI Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* New components section */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4">{release.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {release.description}
                      </p>
                    </div>

                    {/* What's new section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Novedades en la versión {release.version}</h3>
                    </div>

                    {/* Features section */}
                    {release.features && release.features.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Características</h3>
                        <ul className="space-y-2">
                          {release.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></div>
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements section */}
                    {release.improvements && release.improvements.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Mejoras</h3>
                        <ul className="space-y-2">
                          {release.improvements.map((improvement, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                              <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bug fixes section */}
                    {release.bugfixes && release.bugfixes.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Correcciones de errores</h3>
                        <ul className="space-y-2">
                          {release.bugfixes.map((bugfix, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></div>
                              <span className="text-gray-700 dark:text-gray-300">{bugfix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider line for all but the last item */}
                {index < releases.length - 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-800 my-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Estilos globales para garantizar compatibilidad con sticky en desktop */}
      <style jsx global>{`
        @media (min-width: 768px) {
          html, body, #__next, .container, [data-nextjs-scroll-focus-boundary] {
            overflow: visible !important;
          }
          .sticky {
            position: sticky !important;
          }
        }
      `}</style>
    </div>
  );
} 