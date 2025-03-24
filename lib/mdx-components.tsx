import type { MDXComponents } from "mdx/types";
import ButtonHome from "@/components/home/ButtonHome";
import CardSpotlight from "@/components/CardSpotlight";
import dynamic from "next/dynamic";
import CodeBlock from "@/components/mdx/CodeBlock";
import { 
  CheckIcon, 
  AlertTriangle, 
  XIcon, 
  BellIcon, 
  MessageSquareIcon, 
  ShoppingCartIcon,
  StarIcon 
} from "lucide-react";

// Importaciones dinámicas
const Accordion = dynamic(() => import("@/components/sections/accordion"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const DemoTabs = dynamic(() => import("@/components/ui/demo-tabs"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Avatar = dynamic(() => import("@/components/sections/avatar"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Checkbox = dynamic(() => import("@/components/sections/checkbox"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Calendar = dynamic(() => import("@/components/sections/calendar"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Badge = dynamic(() => import("@/components/sections/badge"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Card = dynamic(() => import("@/components/sections/card"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Button = dynamic(() => import("@/components/sections/button"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Autocomplete = dynamic(() => import("@/components/sections/autocomplete"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

// Definir los componentes base
const components: MDXComponents = {
  // Componentes básicos de Markdown
  h1: (props) => (
    <h1
      className="text-4xl font-bold mb-4 mt-8 dark:text-zinc-100 text-zinc-900 tracking-tight"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-3xl font-bold mb-3 mt-6 dark:text-zinc-100 text-zinc-900 tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-2xl font-bold mb-3 mt-5 dark:text-zinc-200 text-zinc-800 tracking-tight"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="text-xl font-bold mb-2 mt-4 dark:text-zinc-200 text-zinc-800 tracking-tight"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed dark:text-zinc-400 text-zinc-600" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-4 dark:text-zinc-400 text-zinc-600 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 dark:text-zinc-400 text-zinc-600 space-y-2" {...props} />
  ),
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 dark:border-zinc-700 border-zinc-300 pl-4 italic my-4 dark:text-zinc-400 text-zinc-600"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="dark:bg-zinc-800 bg-zinc-100 rounded px-1.5 py-0.5 text-sm font-mono dark:text-zinc-200 text-zinc-800"
      {...props}
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  a: (props) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full divide-y dark:divide-zinc-700 divide-zinc-200 border dark:border-zinc-800 border-zinc-200 rounded-lg"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="px-4 py-2 dark:bg-zinc-800 bg-zinc-100 font-semibold dark:text-zinc-200 text-zinc-800"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-2 border-t dark:border-zinc-700 border-zinc-200 dark:text-zinc-400 text-zinc-600"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 dark:border-zinc-700 border-zinc-200" />,

  // Componentes del servidor
  ButtonHome,
  CardSpotlight,
  CodeBlock,

  // Componentes del cliente
  Accordion,
  DemoTabs,
  Avatar,
  Checkbox,
  Calendar,
  Badge,
  Card,
  Button,
  Autocomplete,
  CheckIcon,
  AlertTriangle,
  XIcon,
  BellIcon,
  MessageSquareIcon,
  ShoppingCartIcon,
  StarIcon,
};

// Función para combinar componentes personalizados
export function useMDXComponents(
  customComponents: MDXComponents = {}
): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}

// Exportar los componentes directamente
export { components };
