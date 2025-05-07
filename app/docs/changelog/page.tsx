"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Rocket,
  Stars,
  Sparkles,
  ArrowRight,
  Zap,
  Palette,
  Code,
} from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/FooterDocs";

type Author = {
  name: string;
  image: string;
  role: string;
};

type Release = {
  title: string;
  version: string;
  date: string;
  description: string;
  features: string[];
  image: string;
  author: Author;
  icon?: React.ReactNode;
  backgroundGradient?: string;
  accent?: string;
};

export default function ChangelogPage() {
  const releases: Release[] = [
    {
      title: "stofli/ui",
      version: "v1.3.0",
      date: "Octubre 5, 2023",
      description:
        "Incorporamos controles de accesibilidad avanzados y mejoramos el sistema de temas personalizable",
      features: [
        "Mejoras ARIA en todos los componentes",
        "Sistema de tokens CSS extendido",
        "Soporte para modo de alto contraste",
        "Nuevas variantes para Inputs y Buttons",
        "Optimización del bundle size (reducción del 12%)",
      ],
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop",
      backgroundGradient: "from-slate-950 to-slate-900",
      accent: "blue",
      author: {
        name: "Miguel Ángel Durán",
        image:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Lead UI Engineer",
      },
      icon: <Palette className="w-5 h-5" />,
    },
    {
      title: "Sistema de Diseño",
      version: "v1.2.0",
      date: "Julio 17, 2023",
      description:
        "Presentamos una completa revisión de nuestro sistema de diseño con nueva documentación interactiva y componentes totalmente actualizados.",
      features: [
        "Nueva documentación interactiva",
        "Playground de componentes en vivo",
        "Guías detalladas de implementación",
        "Ejemplos de patrones de diseño",
        "Integración con Figma mejorada",
      ],
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1074&auto=format&fit=crop",
      backgroundGradient: "from-blue-950 to-indigo-900",
      accent: "blue",
      author: {
        name: "Sara Rodríguez",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Design Systems Lead",
      },
      icon: <Stars className="w-5 h-5" />,
    },
    {
      title: "Componentes Core",
      version: "v1.1.5",
      date: "Mayo 28, 2023",
      description:
        "Lanzamos nuevos componentes esenciales y mejoramos el rendimiento de la biblioteca para proyectos Next.js y React.",
      features: [
        "Nuevo componente DataTable con ordenación",
        "Mejoras en DatePicker con localizaciones",
        "Nuevo sistema de notificaciones",
        "Reducción de dependencias externas",
        "Actualización a React 18.2 y soporte mejorado",
      ],
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1170&auto=format&fit=crop",
      backgroundGradient: "from-indigo-950 to-purple-900",
      accent: "indigo",
      author: {
        name: "Pablo Villoslada",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Frontend Developer",
      },
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Optimización",
      version: "v1.1.0",
      date: "Abril 10, 2023",
      description:
        "Mejoramos drásticamente el rendimiento y optimizamos todos los componentes para una experiencia más fluida y responsiva.",
      features: [
        "Virtualización para listas largas",
        "Optimización de renderizado condicional",
        "Reducción de re-renders innecesarios",
        "Lazy loading integrado en componentes pesados",
        "Mejoras en SSR y SSG para Next.js",
      ],
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop",
      backgroundGradient: "from-purple-950 to-violet-900",
      accent: "purple",
      author: {
        name: "Elena Fernández",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Performance Engineer",
      },
      icon: <Code className="w-5 h-5" />,
    },
    {
      title: "Temas y Accesibilidad",
      version: "v1.0.5",
      date: "Marzo 15, 2023",
      description:
        "Implementamos un sistema de temas completo con soporte para modo oscuro y claro, junto con mejoras significativas de accesibilidad.",
      features: [
        "Sistema de temas light/dark con transiciones",
        "Soporte total para alto contraste",
        "Mejoras en navegación por teclado",
        "Cumplimiento de WCAG 2.1 AA",
        "APIs personalizadas para color y tipografía",
      ],
      image:
        "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1032&auto=format&fit=crop",
      backgroundGradient: "from-cyan-950 to-blue-900",
      accent: "cyan",
      author: {
        name: "Javier Torres",
        image:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Accessibility Specialist",
      },
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "Lanzamiento Inicial",
      version: "v1.0.0",
      date: "Febrero 8, 2023",
      description:
        "El primer lanzamiento público de stofli/ui: una librería de componentes moderna para React y Next.js con Tailwind CSS.",
      features: [
        "25+ componentes esenciales",
        "Zero-runtime CSS con Tailwind",
        "100% compatible con TypeScript",
        "Diseño responsive en todos los componentes",
        "Documentación completa y ejemplos",
      ],
      image:
        "https://images.unsplash.com/photo-1631116617822-e100bd3a89e6?q=80&w=1170&auto=format&fit=crop",
      backgroundGradient: "from-emerald-950 to-teal-900",
      accent: "emerald",
      author: {
        name: "Alejandro Sanz",
        image:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        role: "Founder & Lead Developer",
      },
      icon: <Rocket className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Header />

      {/* Espaciador para header fijo */}
      <div className="h-32"></div>

      <main className="container mx-auto px-4 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
            Changelog
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto">
            Sigue la evolución de stofli/ui, descubre las novedades mejoras y
            características que hemos ido incorporando a nuestra biblioteca de
            componentes.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {releases.map((release, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 hover:border-blue-300 dark:hover:border-blue-800"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={release.image}
                      alt={`${release.title} ${release.version}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-black via-gray-900/70 dark:via-black/70 to-gray-900/20 dark:to-black/20 z-10" />
                  </div>
                  <div className="absolute z-20 p-5 flex items-start justify-between w-full">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center rounded-full border border-gray-300 dark:border-zinc-700 bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-sm px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:text-white">
                        {release.version}
                      </span>
                      <h3 className="text-xl font-bold mt-2 text-white drop-shadow-md">
                        {release.title}
                      </h3>
                    </div>
                    {release.icon && (
                      <div className="w-8 h-8 rounded-full bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-gray-800 dark:text-white">
                        {release.icon}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
                    {release.date}
                  </p>
                  <p className="text-gray-800 dark:text-white mb-4">
                    {release.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {release.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-700">
                        <Image
                          src={release.author.image}
                          alt={release.author.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {release.author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">
                          {release.author.role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/docs/changelog/${release.version
                        .toLowerCase()
                        .replace("v", "")}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                    >
                      <span className="text-sm">Leer más</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
