"use client";
import * as React from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";

// Componentes
import { Links } from "@/components/search/LinksGroup";
import { Frameworks } from "@/components/search/FrameworksGroup";
import { ComponentsGroup } from "@/components/search/ComponentsGroup";

interface SearchCommandProps extends DialogProps {
  isDocsRoute?: boolean;
}

export function SearchCommand({ isDocsRoute, ...props }: SearchCommandProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isInDocsPage = isDocsRoute || pathname.includes("/docs/");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isXsMobile = useMediaQuery("(max-width: 380px)");

  // Efecto para controlar la clase del scrollbar
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("search-dialog-open");
    } else {
      document.body.classList.remove("search-dialog-open");
    }
  }, [open]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {isInDocsPage ? (
        <Button
          variant="outline"
          className="w-full h-8 sm:h-9 px-2 sm:px-4 justify-between text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 hover:bg-transparent dark:hover:bg-transparent hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors rounded-lg sm:rounded-xl"
          onClick={() => setOpen(true)}
          {...props}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isXsMobile ? "12" : "16"}
              height={isXsMobile ? "12" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 sm:mr-2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <span>{isXsMobile ? "" : isMobile ? "Buscar" : "Search..."}</span>
          </div>
          <kbd className="pointer-events-none inline-flex h-4 sm:h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1 sm:px-1.5 font-mono text-[8px] sm:text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
            <span className="text-[8px] sm:text-xs">⌘</span>K
          </kbd>
        </Button>
      ) : (
        <Button
          variant="ghost"
          className={cn(
            "relative justify-center h-9 w-9 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-950/90 dark:text-zinc-50 p-0"
          )}
          onClick={() => setOpen(true)}
          {...props}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-950 dark:text-white"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <span className="sr-only">Buscar</span>
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogTitle className="sr-only">Buscador</DialogTitle>
          <DialogDescription className="sr-only">
            Buscar componentes y documentación
          </DialogDescription>
          <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Buscar componentes, frameworks, etc..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {/* Renderizar el grupo del apartado de links */}
              <Links />

              <CommandSeparator />

              {/* Renderizar el grupo del apartado de frameworks */}
              <Frameworks />

              <CommandSeparator />

              {/* Renderizar el grupo del apartado de componentes */}
              <ComponentsGroup />
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
