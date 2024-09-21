"use client";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { components } from "@/components/search/search-data";
import Link from 'next/link';

export function ComponentsGroup() {
  return (
    <CommandGroup heading="Components">
      {components.map((item, index) => (
        <Link href={item.link} key={index}>
            <CommandItem className="cursor-pointer" key={index}>
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
            </CommandItem>
        </Link>
      ))}
    </CommandGroup>
  );
}

