"use client";
import { CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command";
import { frameworks } from "@/components/search/search-data";
import Link from 'next/link';

export function Frameworks() {
  return (
    <CommandGroup heading="Frameworks">
      {frameworks.map((item, index) => (
        <Link href={item.link} key={index}>
          <CommandItem className="cursor-pointer" key={index}>
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
            <CommandShortcut>{item.shortcut}</CommandShortcut>
          </CommandItem>
        </Link>
      ))}
    </CommandGroup>
  );
}
