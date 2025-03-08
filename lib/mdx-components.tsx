import type { MDXComponents } from "mdx/types";
import ButtonHome from "@/components/home/ButtonHome";
import CardSpotlight from "@/components/CardSpotlight";
import dynamic from "next/dynamic";
import CodeBlock from "@/components/mdx/CodeBlock";

// Importar el Accordion de forma dinámica
const Accordion = dynamic(() => import("@/components/sections/accordion"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    // Componentes básicos de Markdown
    h1: (props) => (
      <h1
        className="text-4xl font-bold mb-4 mt-8 text-zinc-100 tracking-tight"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-3xl font-bold mb-3 mt-6 text-zinc-100 tracking-tight"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-2xl font-bold mb-3 mt-5 text-zinc-200 tracking-tight"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="text-xl font-bold mb-2 mt-4 text-zinc-200 tracking-tight"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mb-4 leading-relaxed text-zinc-400" {...props} />
    ),
    ul: (props) => (
      <ul className="list-disc pl-6 mb-4 text-zinc-400 space-y-2" {...props} />
    ),
    ol: (props) => (
      <ol
        className="list-decimal pl-6 mb-4 text-zinc-400 space-y-2"
        {...props}
      />
    ),
    li: (props) => <li className="mb-1" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-zinc-700 pl-4 italic my-4 text-zinc-400"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="bg-zinc-800 rounded px-1.5 py-0.5 text-sm font-mono text-zinc-200"
        {...props}
      />
    ),
    pre: (props) => <CodeBlock {...props} />,
    a: (props) => (
      <a
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    table: (props) => (
      <div className="overflow-x-auto mb-4">
        <table
          className="min-w-full divide-y divide-zinc-700 border border-zinc-800 rounded-lg"
          {...props}
        />
      </div>
    ),
    th: (props) => (
      <th
        className="px-4 py-2 bg-zinc-800 font-semibold text-zinc-200"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-2 border-t border-zinc-700 text-zinc-400"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-zinc-700" />,

    // Componentes del servidor
    ButtonHome,
    CardSpotlight,

    // Componentes del cliente
    Accordion,

    // Combinar con cualquier componente personalizado pasado
    ...components,
  };
}

// Exportar también los componentes directamente para compatibilidad
export const components = useMDXComponents();
