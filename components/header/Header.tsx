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
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import HeadLinks from "./HeadLinks";
import { headerData } from "./HeaderData";
import { SearchCommand } from "@/components/search/Search";
import Tag from "@/components/Tags";
import { ModeToggle } from "@/components/change-theme";
import { sections } from "@/components/sidebar/sectionsData";
import { RemoveScroll } from "react-remove-scroll";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
  const SideBar = () => (
    <div className="h-full py-6 px-4 overflow-y-auto">
      <div className="space-y-4">
        <div className="w-fit">
          <Link href="/">
            <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950/90 dark:text-zinc-50">
              Stofli/UI
            </h2>
          </Link>
        </div>
        {sections.map((section) => (
          <div key={section.title} className="py-1">
            <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
              {section.title}
            </h2>
            <div className="space-y-1 dark:text-zinc-50/60 text-zinc-950/60">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 cursor-pointer dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60 hover:text-zinc-950/85 ${
                      isActive(link.href)
                        ? "hover:text-zinc-950/85 text-zinc-950 dark:hover:text-zinc-50/80 dark:text-zinc-50 hover:translate-x-0"
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
            <Button variant="ghost" size="icon" className="rounded-full">
              <FaGithub className="h-5 w-5 text-zinc-950 dark:text-zinc-50" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <FaXTwitter className="h-5 w-5 text-zinc-950 dark:text-zinc-50" />
              <span className="sr-only">Twitter</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed top-6 left-0 right-0 z-50">
      <div className="mx-3">
        <header
          className={`
            container 
            bg-white/40 
            dark:bg-black/40 
            backdrop-blur-md 
            rounded-xl 
            border 
            shadow-none
            transition-all duration-300 ease-in-out
            ${RemoveScroll.classNames.zeroRight}
            ${
              isScrolled
                ? "border-neutral-200 dark:border-neutral-900 shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]"
                : "border-transparent"
            }
          `}
        >
          <div className="container flex h-16 items-center">
            <div className="2xl:m-4 m-8 hidden md:flex md:flex-1">
              <Link className="mr-8 flex items-center space-x-2" href="/">
                <span className="font-bold text-black dark:text-white">
                  Stofli/UI
                </span>
              </Link>
              <nav className="flex items-center space-x-8 text-base font-medium">
                {headerData.map((data) => (
                  <HeadLinks
                    key={data.title}
                    href={data.link}
                    title={data.title}
                    isActive={isLinkActive(data)}
                    hidden={data.hidden ? true : false}
                  />
                ))}
              </nav>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 cursor-pointer px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-zinc-950 dark:text-white"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={`w-[300px] sm:w-[400px] bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 p-0 ${RemoveScroll.classNames.zeroRight}`}
              >
                <SideBar />

                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 disabled:pointer-events-none text-zinc-950 dark:text-white">
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetContent>
            </Sheet>

            <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
              <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                <SearchCommand />
                <div className="md:hidden flex items-center">
                  <ModeToggle />
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9 mr-2 hidden md:inline-flex hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50"
                  >
                    <FaGithub className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9 mr-2 hidden md:inline-flex hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50"
                  >
                    <FaXTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>

                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
