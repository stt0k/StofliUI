"use client";

import React from 'react';
import MainLayout from '@/components/MainLayout';
import ContentComponent from '@/components/ContentComponent';
import Section from '@/app/docs/cli/sections/Section';
import CommandCLI from '@/app/docs/cli/sections/CommandCLI';
import TagsCLI from '@/app/docs/cli/sections/TagsCLI';

const Cli: React.FC = () => (
  <MainLayout>
    <ContentComponent
      title="CLI" 
      description="Installing stofli/ui with the CLI"
    />

    <div className="space-y-12 mt-7">
      <Section title="Usage">
        <CommandCLI command="npx stofli-ui@latest init" />
        <p>
          <TagsCLI text="init" /> command initializes a <TagsCLI text="components.json" /> file and a <TagsCLI text="tailwind.config.js" /> file for a new project.
          It installs <TagsCLI text="framer-motion" />, <TagsCLI text="cn" /> and other dependencies, compatible with shadcnui.
        </p>
      </Section>

      <Section title="Add">
        <CommandCLI command="npx stofli-ui@latest add [component]" />
        <p>
        Adds a new component to your project.
        </p>
      </Section>

      <Section title="Example">
        <CommandCLI command="npx stofli-ui@latest add bento-grid" />
        <p className="mb-4">
          You can also use the optional <TagsCLI text="--all" /> flag to install all components:
        </p>
        <CommandCLI command="npx stofli-ui@latest add --all" />
        <p>
          You can install the related demos/examples for the related components by using the <TagsCLI text="-e" /> flag with the <TagsCLI text="add" /> command.
        </p>
      </Section>
    </div>
  </MainLayout>
);

export default Cli;
