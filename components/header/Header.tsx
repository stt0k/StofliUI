"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { GithubIcon, TwitterIcon, MenuIcon, XIcon } from "lucide-react";
import HeadLinks from "./HeadLinks";
import { headerData } from "./HeaderData";
import { SearchCommand } from "@/components/search/Search";
import Tag from "@/components/Tags";
import { ModeToggle } from "@/components/change-theme";
import { sections } from "@/components/sidebar/sectionsData";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (href: string) => pathname === href;

  //ponerlo en componente y pasarle los links
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
        {/* Mapear secciones desde sectionsData */}
        {sections.map((section) => (
          <div key={section.title} className="py-1">
            <h2 className="mb-2 px-2 text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50">
              {section.title}
            </h2>
            <div className="space-y-1 dark:hover:text-zinc-50/80 dark:text-zinc-50/60 text-zinc-950/60">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-normal transition duration-200 hover:translate-x-1 cursor-pointer ${
                      isActive(link.href)
                        ? "hover:text-cyan-500 text-cyan-600 dark:hover:text-zinc-50/80 dark:text-zinc-50"
                        : ""
                    }`}
                  >
                    {link.label}
                    {link.tag && <Tag text={link.tag} />}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="sticky top-3 z-50">
      <div className="mx-3">
        <header className="container border border-gray-200 dark:border-zinc-800 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-xl">
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
                    isActive={pathname === data.link ? true : false}
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
                  className="mr-2 cursor-pointer px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-white"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-black border-r border-zinc-800 p-0"
              >
                <SideBar />
                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 disabled:pointer-events-none text-white">
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetContent>
            </Sheet>
            <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
              <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                <SearchCommand />

                <div className="hidden md:flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9 mr-2 hidden md:inline-flex hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50"
                  >
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9 mr-2 hidden md:inline-flex hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50"
                  >
                    <TwitterIcon className="h-5 w-5" />
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
