import type { MDXComponents } from "mdx/types";
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
  StarIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronDown,
  MailIcon,
  SearchIcon,
  LockIcon,
  LinkIcon,
  AlertCircleIcon,
  PhoneIcon,
  BookIcon,
  LayoutIcon,
  ListIcon,
  HomeIcon,
  BarChartIcon,
  LineChartIcon,
  PieChartIcon,
  FileTextIcon,
  FileIcon,
} from "lucide-react";

// Importaciones dinámicas
const HeadingAnchor = dynamic(() => import("@/components/docs/HeadingAnchor"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const HeadingLink = dynamic(() => import("@/components/docs/HeadingLink"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const PageNav = dynamic(() => import("@/components/docs/PageNav"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

// Importar componentes Steps y Step
const Steps = dynamic(() => import("../components/docs/Steps"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Step = dynamic(() => import("../components/docs/Step"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const BentoGrid = dynamic(() => import("@/components/BentoGrid"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Accordion = dynamic(() => import("@/components/sections/Accordion"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const DemoTabs = dynamic(() => import("@/components/ui/demo-tabs"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Avatar = dynamic(() => import("@/components/sections/Avatar"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Checkbox = dynamic(() => import("@/components/sections/Checkbox"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Calendar = dynamic(() => import("@/components/sections/Calendar"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Badge = dynamic(() => import("@/components/sections/Badge"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Card = dynamic(() => import("@/components/sections/Card"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Button = dynamic(() => import("@/components/sections/Button"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Autocomplete = dynamic(
  () => import("@/components/sections/Autocomplete"),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const Tabs = dynamic(() => import("@/components/sections/Tabs"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Tooltip = dynamic(() => import("@/components/sections/Tooltip"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Dropdown = dynamic(() => import("@/components/sections/Dropdown"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const Progress = dynamic(() => import("@/components/sections/Progress"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const CircularProgress = dynamic(
  () => import("@/components/sections/Circular-progress"),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const Input = dynamic(() => import("@/components/sections/Input"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

const ToastWrapper = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastWrapper,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastVariantsDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastVariantsDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastPositionsDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastPositionsDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastIconsDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastIconsDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastDurationDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastDurationDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastMultipleDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastMultipleDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ToastCustomDemo = dynamic(
  () =>
    import("@/components/docs/toast-wrapper").then((mod) => ({
      default: mod.ToastCustomDemo,
    })),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const Breadcrumbs = dynamic(() => import("@/components/sections/Breadcrumbs"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});

// Spinner
const Spinner = dynamic(() => import("@/components/sections/Spinner"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

// Pagination
const Pagination = dynamic(() => import("@/components/sections/Pagination"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

// DatePicker
const DatePicker = dynamic(() => import("@/components/sections/Date-picker"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

// Switch
const Switch = dynamic(() => import("@/components/sections/Switch"), {
  ssr: false,
  loading: () => <p>Cargando...</p>,
});

// NumberInput
const NumberInput = dynamic(
  () => import("@/components/sections/Number-input"),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

// SwitchControlledDemo
const SwitchControlledDemo = dynamic(
  () =>
    import("@/components/docs/switch-wrapper").then((mod) => ({
      default: mod.SwitchControlledDemo,
    })),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

// Importar los componentes de demostración de NumberInput
const NumberInputControlledDemo = dynamic(
  () =>
    import("@/components/docs/number-input-wrapper").then((mod) => ({
      default: mod.NumberInputControlledDemo,
    })),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

const NumberInputPercentageDemo = dynamic(
  () =>
    import("@/components/docs/number-input-wrapper").then((mod) => ({
      default: mod.NumberInputPercentageDemo,
    })),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

const NumberInputCurrencyDemo = dynamic(
  () =>
    import("@/components/docs/number-input-wrapper").then((mod) => ({
      default: mod.NumberInputCurrencyDemo,
    })),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

const NumberInputSignedDemo = dynamic(
  () =>
    import("@/components/docs/number-input-wrapper").then((mod) => ({
      default: mod.NumberInputSignedDemo,
    })),
  {
    ssr: false,
    loading: () => <p>Cargando...</p>,
  }
);

// Tabs demostraciones
const TabsCustomClassDemo = dynamic(
  () =>
    import("@/components/docs/tabs-wrapper").then(
      (mod) => mod.TabsCustomClassDemo
    ),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

const ModernTabsDemo = dynamic(
  () =>
    import("@/components/docs/tabs-wrapper").then((mod) => mod.ModernTabsDemo),
  {
    ssr: false,
    loading: () => <div>Cargando...</div>,
  }
);

// Definir los componentes base
const components: MDXComponents = {
  // Componentes básicos de Markdown
  h1: (props) => (
    <h1
      className="mt-8 mb-4 text-4xl font-bold tracking-tight dark:text-zinc-100 text-zinc-900"
      {...props}
    />
  ),
  h2: (props) => (
    <HeadingLink
      as="h2"
      className="mt-6 mb-3 text-3xl font-bold tracking-tight dark:text-zinc-100 text-zinc-900"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-5 mb-3 text-2xl font-bold tracking-tight dark:text-zinc-200 text-zinc-800"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-4 mb-2 text-xl font-bold tracking-tight dark:text-zinc-200 text-zinc-800"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-4 leading-relaxed dark:text-zinc-400 text-zinc-600"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="pl-6 mb-4 space-y-2 list-disc dark:text-zinc-400 text-zinc-600"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="pl-6 mb-4 space-y-2 list-decimal dark:text-zinc-400 text-zinc-600"
      {...props}
    />
  ),
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="pl-4 my-4 italic border-l-4 dark:border-zinc-700 border-zinc-300 dark:text-zinc-400 text-zinc-600"
      {...props}
    />
  ),
  code: (props) => {
    // Si el elemento tiene atributos de rehype-pretty-code, no aplicar clases adicionales
    const hasLanguage = 'data-language' in props;
    const hasTheme = 'data-theme' in props;
    
    if (hasLanguage || hasTheme) {
      return <code {...props} />;
    }
    // Aplicar clases solo para código inline que no sea procesado por rehype-pretty-code
    return (
      <code
        className="dark:bg-zinc-800 bg-zinc-100 rounded px-1.5 py-0.5 text-sm font-mono dark:text-zinc-200 text-zinc-800"
        {...props}
      />
    );
  },
  pre: (props) => <CodeBlock {...props} />,
  a: (props) => (
    <a
      className="text-blue-600 underline transition-colors duration-200 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full rounded-lg border divide-y dark:divide-zinc-700 divide-zinc-200 dark:border-zinc-800 border-zinc-200"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="px-4 py-2 font-semibold dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-200 text-zinc-800"
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
  CardSpotlight,
  CodeBlock,

  // Componentes del cliente
  HeadingAnchor,
  HeadingLink,
  PageNav,
  Steps,
  Step,
  BentoGrid,
  Accordion,
  DemoTabs,
  Avatar,
  Checkbox,
  Calendar,
  Badge,
  Card,
  Button,
  Autocomplete,
  Tabs,
  Dropdown,
  Input,
  Progress,
  CircularProgress,
  Tooltip,
  Breadcrumbs,
  ToastWrapper,
  ToastDemo,
  ToastVariantsDemo,
  ToastPositionsDemo,
  ToastIconsDemo,
  ToastDurationDemo,
  ToastMultipleDemo,
  ToastCustomDemo,
  TabsCustomClassDemo,
  ModernTabsDemo,
  CheckIcon,
  AlertTriangle,
  XIcon,
  BellIcon,
  MessageSquareIcon,
  ShoppingCartIcon,
  StarIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronDown,
  MailIcon,
  SearchIcon,
  LockIcon,
  LinkIcon,
  AlertCircleIcon,
  PhoneIcon,
  BookIcon,
  LayoutIcon,
  ListIcon,
  HomeIcon,
  BarChartIcon,
  LineChartIcon,
  PieChartIcon,
  FileTextIcon,
  FileIcon,
  Spinner,
  Pagination,
  DatePicker,
  Switch,
  SwitchControlledDemo,
  NumberInput,
  NumberInputControlledDemo,
  NumberInputPercentageDemo,
  NumberInputCurrencyDemo,
  NumberInputSignedDemo,
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
