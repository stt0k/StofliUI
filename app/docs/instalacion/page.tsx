import React from "react";
import MainLayout from "@/components/MainLayout";
import ContentComponent from "@/components/ContentComponent";
import BentoGrid from "@/components/BentoGrid";

const Installation = () => {
  const navItems = [{ title: "Instalación", href: "#instalacion" }];
  return (
    <MainLayout navItems={navItems}>
      <ContentComponent
        title="Instalación"
        description="Start with a framework"
      />
      <h1 id="instalacion"></h1>
      <BentoGrid />
    </MainLayout>
  );
};

export default Installation;
