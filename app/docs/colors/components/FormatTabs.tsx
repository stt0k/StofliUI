"use client";

import React, { memo } from "react";
import { useColorContext } from "./ColorContext";
import ColorGrid from "./ColorGrid";
import { formats, ColorFormat } from "./ColorData";
import TabsWrapper from "./TabsWrapper";

const FormatTabs: React.FC = memo(() => {
  const {
    colors,
    selectedFamily,
    copiedColor,
    activeFormat,
    setActiveFormat,
    handleCopy,
  } = useColorContext();

  // Preparar las pestañas con sus contenidos
  const formatTabs = formats.map((format) => ({
    label: format.toUpperCase(),
    content: (
      <ColorGrid
        colors={colors}
        selectedFamily={selectedFamily}
        format={format}
        copiedColor={copiedColor}
        onCopy={handleCopy}
      />
    ),
  }));

  // Encontrar el índice de la pestaña activa
  const activeTabIndex = formats.findIndex((format) => format === activeFormat);

  // Manejar el cambio de pestaña
  const handleTabChange = (index: number) => {
    setActiveFormat(formats[index] as ColorFormat);
  };

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 md:p-6 backdrop-blur-sm shadow-lg overflow-hidden">
      <TabsWrapper
        tabs={formatTabs}
        defaultTab={activeTabIndex}
        variant="primary"
        size="lg"
        radius="md"
        fullWidth
        className="mb-4 md:mb-8"
        contentClassName="pt-4 md:pt-8"
        onTabChange={handleTabChange}
      />
    </div>
  );
});

FormatTabs.displayName = "FormatTabs";

export default FormatTabs;
