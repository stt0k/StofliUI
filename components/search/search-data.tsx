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
  { icon: PanelsTopLeft, label: "Ejemplos", link: "/ejemplos" },
  { icon: ChartBar, label: "Changelog", link: "/changelog" },
  { icon: DollarSign, label: "Pricing", link: "/pricing" },
  { icon: Palette, label: "Colores", link: "/colores" },
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
  { icon: Circle, label: "Badge", link: "/docs/componentes/badge" },
  { icon: Circle, label: "Breadcrumbs", link: "/docs/componentes/breadcrumbs" },
  { icon: Circle, label: "Button", link: "/docs/componentes/button" },
  { icon: Circle, label: "Calendar", link: "/docs/componentes/calendar" },
  { icon: Circle, label: "Card", link: "/docs/componentes/card" },
  { icon: Circle, label: "Checkbox", link: "/docs/componentes/checkbox" },
  {
    icon: Circle,
    label: "Circular Progress",
    link: "/docs/componentes/circular-progress",
  },
  { icon: Circle, label: "Date Picker", link: "/docs/componentes/date-picker" },
  { icon: Circle, label: "Dropdown", link: "/docs/componentes/dropdown" },
  { icon: Circle, label: "Input", link: "/docs/componentes/input" },
  {
    icon: Circle,
    label: "Number Input",
    link: "/docs/componentes/number-input",
  },
  { icon: Circle, label: "Pagination", link: "/docs/componentes/pagination" },
  { icon: Circle, label: "Progress", link: "/docs/componentes/progress" },
  { icon: Circle, label: "Spinner", link: "/docs/componentes/spinner" },
  { icon: Circle, label: "Switch", link: "/docs/componentes/switch" },
  { icon: Circle, label: "Tabs", link: "/docs/componentes/tabs" },
  { icon: Circle, label: "Toast", link: "/docs/componentes/toast" },
  { icon: Circle, label: "Tooltip", link: "/docs/componentes/tooltip" },
];
