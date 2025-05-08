"use client";

import React, { memo, useState, useEffect } from "react";
import Tabs from "@/components/sections/tabs";

interface TabsWrapperProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  defaultTab?: number;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "full";
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
  hoverEffect?: boolean;
  onTabChange?: (index: number) => void;
}

const TabsWrapper: React.FC<TabsWrapperProps> = memo(
  ({
    tabs,
    defaultTab = 0,
    variant = "default",
    size = "md",
    radius = "md",
    fullWidth = false,
    className = "",
    contentClassName = "",
    hoverEffect = false,
    onTabChange,
  }) => {
    // Estado local para manejar la pestaña activa
    const [activeTabIndex] = useState(defaultTab);

    // Efectos para notificar cambios en la pestaña activa
    useEffect(() => {
      if (onTabChange) {
        onTabChange(activeTabIndex);
      }
    }, [activeTabIndex, onTabChange]);

    return (
      <Tabs
        tabs={tabs}
        defaultTab={activeTabIndex}
        variant={variant}
        size={size}
        radius={radius}
        fullWidth={fullWidth}
        hoverEffect={hoverEffect}
        className={className}
        contentClassName={contentClassName}
      />
    );
  }
);

TabsWrapper.displayName = "TabsWrapper";

export default TabsWrapper;
