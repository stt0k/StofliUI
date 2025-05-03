"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface DemoTabsProps {
  preview: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function DemoTabs({
  preview,
  children,
  className,
}: DemoTabsProps) {
  return (
    <Tabs defaultValue="preview" className={cn("relative w-full", className)}>
      <TabsList className="inline-flex gap-x-4 bg-transparent p-0">
        <TabsTrigger
          value="preview"
          className="rounded-none border-b-2 border-transparent bg-transparent px-2 py-2 font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="rounded-none border-b-2 border-transparent bg-transparent px-2 py-2 font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="relative rounded-md border p-4 mt-2"
      >
        {preview}
      </TabsContent>
      <TabsContent value="code" className="mt-2">
        {children}
      </TabsContent>
    </Tabs>
  );
}
