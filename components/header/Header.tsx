"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import HeadLinks from "./HeadLinks";
import { headerData } from "./HeaderData";
import Tag from "@/components/Tags";
import { ModeToggle } from "@/components/change-theme";
import { sections } from "@/components/sidebar/sectionsData";
import { RemoveScroll } from "react-remove-scroll";
import { SearchCommand } from "@/components/search/Search";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isDocsRoute = pathname.includes("/docs/");

  // Nueva función para verificar si una ruta está activa usando relatedPaths
  const isLinkActive = (item: (typeof headerData)[0]) => {
    // Comprobar si la ruta actual coincide exactamente
    if (pathname === item.link) return true;

    // Comprobar si la ruta actual coincide con cualquiera de las rutas relacionadas
    return item.relatedPaths.some((path) => {
      // Si el path termina con *, es un comodín que coincide con cualquier cosa que empiece igual
      if (path.endsWith("*")) {
        const prefix = path.slice(0, -1);
        return pathname.startsWith(prefix);
      }
      // Coincidencia exacta con la ruta relacionada
      return pathname === path;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActive = (href: string) => pathname === href;

  // Sidebar para móvil
  const SideBar = () => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (title: string) => {
      setOpenSubmenu(openSubmenu === title ? null : title);
    };

    // Filtrar los elementos que no queremos mostrar en móvil
    const filteredHeaderData = headerData.filter(
      (item) => item.title !== "Docs" && item.title !== "Componentes"
    );

    return (
      <div className="h-full py-6 px-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="w-fit">
            <Link href="/">
              <h2 className="mb-2 px-2 text-base font-bold tracking-tight text-neutral-950/90 dark:text-neutral-50">
                StofliUI
              </h2>
            </Link>
          </div>

          {/* Elementos del header en móvil */}
          <div className="py-2">
            <h2 className="mb-2 px-2 text-sm font-medium tracking-tight text-neutral-950 dark:text-neutral-50">
              Navegación
            </h2>
            <div className="space-y-1">
              {filteredHeaderData.map((data) => (
                <div key={data.title} className="w-full">
                  {data.submenu ? (
                    <div className="w-full">
                      <button
                        onClick={() => toggleSubmenu(data.title)}
                        className={`w-full flex items-center justify-between p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm ${
                          isLinkActive(data)
                            ? "text-cyan-600 dark:text-cyan-500"
                            : "text-neutral-900 dark:text-neutral-100"
                        }`}
                      >
                        <span>{data.title}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transform transition-transform ${
                            openSubmenu === data.title ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M6 8.5L2 4.5H10L6 8.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>

                      {openSubmenu === data.title && (
                        <div className="pl-4 mt-1 border-l border-zinc-200 dark:border-zinc-800 space-y-1">
                          {data.submenu.groups &&
                            data.submenu.groups.map(
                              (
                                group: {
                                  title?: string;
                                  items: { title: string; href: string }[];
                                },
                                groupIndex: number
                              ) => (
                                <div key={groupIndex} className="py-1">
                                  {group.title && (
                                    <h3 className="px-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                      {group.title}
                                    </h3>
                                  )}
                                  {group.items.map((item, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      href={item.href}
                                      onClick={closeMobileMenu}
                                      className="block p-2 rounded-md text-neutral-900 dark:text-neutral-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm"
                                    >
                                      {item.title}
                                    </Link>
                                  ))}
                                </div>
                              )
                            )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={data.link}
                      onClick={closeMobileMenu}
                      className={`block p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm ${
                        isLinkActive(data)
                          ? "text-cyan-600 dark:text-cyan-500"
                          : "text-neutral-900 dark:text-neutral-100"
                      }`}
                    >
                      {data.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Secciones del sidebar original */}
          {sections.map((section) => (
            <div key={section.title} className="py-1">
              <h2 className="mb-2 px-2 text-sm font-medium tracking-tight text-neutral-950 dark:text-neutral-50">
                {section.title}
              </h2>
              <div className="space-y-1 dark:text-neutral-50/60 text-neutral-950/60">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 cursor-pointer dark:hover:text-neutral-50/80 px-2 dark:text-neutral-50/60 text-neutral-950/60 hover:text-neutral-950/85 ${
                        isActive(link.href)
                          ? "hover:text-neutral-950/85 text-neutral-950 dark:hover:text-neutral-50/80 dark:text-neutral-50 hover:translate-x-0"
                          : ""
                      }`}
                    >
                      <span className="truncate">
                        {link.tag
                          ? link.label.length > 11
                            ? link.label.substring(0, 11) + "..."
                            : link.label
                          : link.label}
                      </span>
                      {link.tag && <Tag text={link.tag} />}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/stt0k/StofliUI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <FaGithub className="h-5 w-5 text-neutral-950 dark:text-neutral-50" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed ${isDocsRoute ? "top-0" : "top-6"} left-0 right-0 z-50`}
    >
      <div
        className={`${isDocsRoute ? "px-3 sm:px-4 w-full" : "mx-3"} ${
          !isDocsRoute ? "max-w-6xl mx-auto" : ""
        }`}
      >
        <header
          className={`
            ${
              isDocsRoute
                ? "rounded-none border-0 w-full"
                : "w-full max-w-6xl rounded-lg border"
            }
            backdrop-blur 
            flex-none 
            duration-500 
            supports-backdrop-blur:bg-background-light/60 
            dark:bg-transparent
            shadow-none
            transition-all duration-300 ease-in-out
            ${RemoveScroll.classNames.zeroRight}
            ${
              isScrolled && !isDocsRoute
                ? "border-neutral-200 dark:border-neutral-900 shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]"
                : "border-transparent"
            }
          `}
        >
          <div
            className={`${
              isDocsRoute
                ? "px-4 flex justify-between w-full max-w-7xl xl:max-w-[88rem] mx-auto"
                : "px-4 flex"
            } py-2 items-center`}
          >
            {/* Menú hamburguesa para móvil - visible solo en móvil */}
            <div className="md:hidden flex items-center">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-1 cursor-pointer px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-950 dark:text-white h-8 w-8"
                  >
                    <MenuIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className={`w-[300px] sm:w-[400px] bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 p-0 ${RemoveScroll.classNames.zeroRight}`}
                >
                  <SideBar />

                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 disabled:pointer-events-none text-neutral-950 dark:text-white">
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>

            {isDocsRoute ? (
              <>
                {/* Logo y buscador para docs */}
                <div className="flex items-center justify-between w-full">
                  {/* Logo a la izquierda */}
                  <div className="flex-shrink-0 hidden md:flex">
                    <Link className="flex items-center space-x-1" href="/">
                      <span className="font-bold text-black dark:text-white text-sm">
                        StofliUI
                      </span>
                    </Link>
                  </div>

                  {/* Buscador en el centro */}
                  <div className="flex-1 flex justify-center max-w-[150px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-auto px-1 sm:px-4">
                    <div className="w-full">
                      <SearchCommand isDocsRoute={true} />
                    </div>
                  </div>

                  {/* Área derecha - GitHub y tema */}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* GitHub - visible solo en tablet y desktop */}
                    <div className="hidden sm:flex items-center">
                      <Link
                        href="https://github.com/stt0k/StofliUI"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-md h-8 w-8 sm:h-9 sm:w-9 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <FaGithub className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-950 dark:text-white" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                      </Link>
                    </div>

                    {/* Toggle de tema */}
                    <ModeToggle className="h-8 w-8 sm:h-9 sm:w-9" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Logo a la izquierda - visible solo en desktop */}
                <div className="hidden md:flex flex-shrink-0 basis-0 mr-4">
                  <Link className="flex items-center space-x-2" href="/">
                    <span className="font-bold text-black dark:text-white text-base">
                      StofliUI
                    </span>
                  </Link>
                </div>

                {/* Espacio flexible en móvil */}
                <div className="flex md:hidden flex-1"></div>

                {/* Enlaces en el centro - solo visible en desktop */}
                <div className="hidden md:flex flex-grow basis-0 justify-center">
                  <nav className="flex items-center space-x-10 text-sm font-medium">
                    {headerData.map((data) => (
                      <HeadLinks
                        key={data.title}
                        href={data.link}
                        title={data.title}
                        isActive={isLinkActive(data)}
                        hidden={data.hidden ? true : false}
                        submenu={data.submenu}
                      />
                    ))}
                  </nav>
                </div>

                {/* Área derecha - botones de búsqueda y tema */}
                <div
                  className={`flex items-center justify-end space-x-2 flex-shrink-0 basis-0`}
                >
                  {/* Búsqueda - visible en ambos (desktop y móvil) */}
                  <div className="mr-2">
                    <SearchCommand />
                  </div>

                  {/* GitHub - visible solo en desktop */}
                  <div className="hidden md:flex items-center">
                    <Link
                      href="https://github.com/stt0k/StofliUI"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-md h-9 w-9 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <FaGithub className="h-5 w-5 text-neutral-950 dark:text-white" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                  </div>

                  {/* Toggle de tema - visible en ambos */}
                  <ModeToggle />
                </div>
              </>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
