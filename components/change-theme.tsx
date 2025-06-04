"use client";

import * as React from "react";
import { Monitor, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative z-10 space-x-0 focus:outline-none cursor-pointer bg-transparent hover:text-neutral-950/70 text-neutral-950/90 dark:hover:text-neutral-50/80 dark:text-neutral-50",
            className
          )}
          aria-label="Change theme"
          name="Change theme"
        >
          <SunIcon
            size={20}
            strokeWidth={1.5}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            size={20}
            strokeWidth={1.5}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none">Theme</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun size={16} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon size={16} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <Monitor size={16} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
