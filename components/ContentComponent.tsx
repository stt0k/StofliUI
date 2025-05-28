"use client";

import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "./sections/Breadcrumbs";

interface ContentComponentProps {
  title: string;
  description: string;
}

const ContentComponent: React.FC<ContentComponentProps> = ({
  title,
  description,
}) => {
  // Configurar según la ruta
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Docs", href: "/docs/introduccion" },
  ];

  breadcrumbItems.push({
    label: title,
    className: "!text-cyan-600 dark:!text-cyan-500",
  });

  return (
    <div className="flex flex-col ms-6">
      <div className="mb-4 mt-11">
        <Breadcrumbs
          items={breadcrumbItems}
          variant="default"
          size="lg"
          clickable={true}
        />
      </div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ContentComponent;
