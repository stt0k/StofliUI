import React from 'react';
import MainLayout from '@/components/MainLayout';
import ContentComponent from '@/components/ContentComponent';
import BentoGrid from "@/components/BentoGrid"

const Installation = () => {
  return (
    <MainLayout>
      <ContentComponent
        title="Installation"
        description="Start with a framework"
      />
      <BentoGrid />
    </MainLayout>
  );
};

export default Installation;



