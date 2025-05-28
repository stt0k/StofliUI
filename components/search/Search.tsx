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
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Componentes
import { Links } from "@/components/search/LinksGroup";
import { Frameworks } from "@/components/search/FrameworksGroup";
import { ComponentsGroup } from "@/components/search/ComponentsGroup";

export function SearchCommand({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogTitle className="sr-only">Buscador</DialogTitle>
          <DialogDescription className="sr-only">Buscar componentes y documentación</DialogDescription>
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
