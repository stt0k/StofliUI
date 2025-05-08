"use client";

import React from "react";
import MainLayout from "@/components/MainLayout";
import ContentComponent from "@/components/ContentComponent";
import Accordion from "@/components/sections/accordion";

export default function Introduction() {
  // Definimos los elementos de navegación para esta página
  const navItems = [{ title: "FAQ", href: "#faq" }];

  return (
    <MainLayout navItems={navItems}>
      <div className="flex flex-col flex-grow">
        <ContentComponent
          title="Introducción"
          description="Beautiful components, ready to be seamlessly integrated into your projects. Fully accessible, easily customizable, and open-source."
        />
        <div className="ms-6">
          <div className="pb-12 pt-8">
            <div className="flex flex-col gap-4 text-lg">
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                This is not a traditional component library—it&apos;s a curated
                collection of reusable components designed for direct use in
                your applications.
              </p>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                What do we mean by not a component library? Unlike conventional
                libraries, there's no need to install dependencies or use npm.
                Instead, simply select the components you need, copy the code,
                and integrate it directly into your project.
              </p>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                Each component is fully customizable, allowing you to adapt it
                to your specific needs and maintain complete control over your
                code.
              </p>
              <p className="text-lg text-zinc-500 dark:text-zinc-400">
                Leverage this collection as a flexible starting point for
                building your own component libraries, enhancing productivity
                while retaining full creative freedom.
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-auto">
            <h2
              id="faq"
              className="mt-10 scroll-m-20 border-b border-[#E4E4E7] dark:border-[#27272A] pb-2 text-2xl font-semibold tracking-tight"
            >
              FAQ
            </h2>
            <Accordion
              items={[
                {
                  title: "Why copy/paste and not packaged as a dependency?",
                  content:
                    "The idea is to give you full ownership and control over the code, allowing you to determine how the components are built and styled.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
