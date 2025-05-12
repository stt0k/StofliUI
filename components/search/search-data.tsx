import {
  File,
  Component,
  PanelsTopLeft,
  ChartBar,
  Palette,
  DollarSign,
  Circle,
} from "lucide-react";

// Lista de Links
export const links = [
  { icon: File, label: "Docs", link: "/docs/introduccion" },
  {
    icon: Component,
    label: "Componentes",
    link: "/docs/componentes/accordion",
  },
  { icon: PanelsTopLeft, label: "Ejemplos", link: "/docs/ejemplos" },
  { icon: ChartBar, label: "Changelog", link: "/docs/changelog" },
  { icon: DollarSign, label: "Pricing", link: "/docs/pricing" },
  { icon: Palette, label: "Colores", link: "/docs/colores" },
];

// Lista de frameworks
export const frameworks = [
  {
    icon: Circle,
    label: "Next.js",
    shortcut: "⌘N",
    link: "/docs/frameworks/nextjs",
  },
  {
    icon: Circle,
    label: "Astro",
    shortcut: "⌘A",
    link: "/docs/frameworks/astro",
  },
  {
    icon: Circle,
    label: "Vite",
    shortcut: "⌘V",
    link: "/docs/frameworks/vite",
  },
  {
    icon: Circle,
    label: "Laravel",
    shortcut: "⌘L",
    link: "/docs/frameworks/laravel",
  },
  {
    icon: Circle,
    label: "React",
    shortcut: "⌘R",
    link: "/docs/frameworks/react",
  },
  {
    icon: Circle,
    label: "Angular",
    shortcut: "⌘G",
    link: "/docs/frameworks/angular",
  },
  {
    icon: Circle,
    label: "Svelte",
    shortcut: "⌘S",
    link: "/docs/frameworks/svelte",
  },
  {
    icon: Circle,
    label: "Vue.js",
    shortcut: "⌘V",
    link: "/docs/frameworks/vuejs",
  },
];

// Lista de componentes
export const components = [
  { icon: Circle, label: "Accordion", link: "/docs/componentes/accordion" },
  {
    icon: Circle,
    label: "Autocomplete",
    link: "/docs/componentes/autocomplete",
  },
  { icon: Circle, label: "Avatar", link: "/docs/componentes/avatar" },
  { icon: Circle, label: "Button", link: "/docs/componentes/button" },
  { icon: Circle, label: "Badge", link: "/docs/componentes/badge" },
  { icon: Circle, label: "Calendar", link: "/docs/componentes/calendar" },
  { icon: Circle, label: "Card", link: "/docs/componentes/card" },
  { icon: Circle, label: "Checkbox", link: "/docs/componentes/checkbox" },
  { icon: Circle, label: "Dropdown", link: "/docs/componentes/dropdown" },
  { icon: Circle, label: "Input", link: "/docs/componentes/input" },
  { icon: Circle, label: "Tabs", link: "/docs/componentes/tabs" },
];
