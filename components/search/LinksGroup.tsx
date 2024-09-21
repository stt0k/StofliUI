"use client";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { links } from "@/components/search/search-data";
import Link from 'next/link';

export function Links() {
  return (
    <CommandGroup heading="Links">
      {links.map((item, index) => (
        <Link href={item.link} key={index}>
          <CommandItem
            key={index}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </CommandItem>
        </Link>
      ))}
    </CommandGroup>
  );
}

