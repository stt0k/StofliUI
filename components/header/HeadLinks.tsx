import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  PanelLeft,
  User,
  Building2,
  Code,
  Layout,
  CreditCard,
  CheckSquare,
  TextCursorInput,
  ListFilter,
  Calendar,
  BadgeCheck,
  UserCircle,
  LucideIcon,
  LayoutTemplate,
  Lightbulb,
  Rocket,
  Compass,
  Zap,
  ArrowRight,
  Columns,
} from "lucide-react";

type NavSubmenu = {
  title: string;
  href: string;
  icon?: string;
  description?: string;
}[];

type HeadLinkProps = {
  href: string;
  title: string;
  isActive: boolean;
  hidden: boolean;
  submenu?: {
    groups?: { title?: string; items: NavSubmenu }[];
    links?: NavSubmenu;
    columns?: {
      title: string;
      items: {
        title: string;
        description?: string;
        href: string;
      }[];
    }[];
  };
};

const HeadLinks = ({
  href,
  title,
  isActive,
  hidden,
  submenu,
}: HeadLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getIconComponent = (title: string): LucideIcon => {
    const lowerTitle = title.toLowerCase();

    // UI Components
    if (lowerTitle.includes("accordion")) return PanelLeft;
    if (lowerTitle.includes("card")) return CreditCard;
    if (lowerTitle.includes("tabs")) return Columns;
    if (lowerTitle.includes("button")) return Layout;
    if (lowerTitle.includes("checkbox")) return CheckSquare;
    if (lowerTitle.includes("input")) return TextCursorInput;
    if (lowerTitle.includes("dropdown")) return ListFilter;
    if (lowerTitle.includes("calendar")) return Calendar;
    if (lowerTitle.includes("badge")) return BadgeCheck;
    if (lowerTitle.includes("avatar")) return UserCircle;

    // Company/Docs sections
    if (lowerTitle.includes("about") || lowerTitle.includes("team"))
      return User;
    if (lowerTitle.includes("career")) return Building2;
    if (lowerTitle.includes("developer") || lowerTitle.includes("api"))
      return Code;
    if (lowerTitle.includes("doc")) return BookOpen;

    // Learning sections
    if (lowerTitle.includes("quick")) return Zap;
    if (lowerTitle.includes("tutorial")) return Lightbulb;
    if (lowerTitle.includes("dashboard")) return LayoutTemplate;
    if (lowerTitle.includes("landing")) return Rocket;
    if (lowerTitle.includes("admin")) return Compass;

    return Layout; // Default icon
  };

  // Estilos base para menús
  const menuStyle = {
    container: "bg-white dark:bg-black border-gray-200 dark:border-zinc-900",
    itemHover:
      "hover:bg-gray-100 dark:hover:bg-zinc-900/70 hover:border-gray-200 dark:hover:border-zinc-800",
    iconBg:
      "bg-gray-100 dark:bg-zinc-900 group-hover:bg-gray-200 dark:group-hover:bg-zinc-800",
    iconGradient:
      "from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900",
    textHover: "group-hover:text-black dark:group-hover:text-white",
    columnDivider: "border-gray-200 dark:border-zinc-900",
    headerText: "text-black dark:text-white font-semibold",
  };

  return (
    <div
      ref={linkRef}
      className={`relative group ${hidden ? "hidden xl:block" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`transition-colors ${
          isActive
            ? "text-cyan-600 dark:text-cyan-500"
            : "hover:text-zinc-950/70 text-zinc-950/90 dark:hover:text-zinc-50/80 dark:text-zinc-50"
        }`}
      >
        <span className="flex items-center">
          {title}
          {submenu && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180"
            >
              <path
                d="M3.5 6.5L8 11L12.5 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </Link>

      {submenu && isHovered && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 w-screen max-w-3xl pt-3"
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Menú desplegable */}
          <div
            className={`${menuStyle.container} border shadow-xl rounded-xl overflow-hidden animate-in fade-in duration-200`}
          >
            {/* Diseño tipo bento específico para Docs */}
            {title === "Docs" && submenu.columns && (
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  {/* Sección superior tipo bento */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Bloque de Introducción */}
                    <div className="bg-gray-50 dark:bg-zinc-950/20 rounded-xl p-4 border border-gray-200 dark:border-zinc-800/50">
                      <h3 className="text-gray-800 dark:text-zinc-200 font-semibold text-sm mb-3 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500 dark:text-zinc-400" />
                        Introducción
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/docs/introduccion/bienvenida"
                          className="block p-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-200/50 dark:hover:bg-zinc-600/10 rounded-md text-sm transition-colors"
                        >
                          <span>Bienvenida</span>
                        </Link>
                        <Link
                          href="/docs/introduccion/primeros-pasos"
                          className="block p-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-200/50 dark:hover:bg-zinc-600/10 rounded-md text-sm transition-colors"
                        >
                          <span>Primeros pasos</span>
                        </Link>
                        <Link
                          href="/docs/introduccion/conceptos"
                          className="block p-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-200/50 dark:hover:bg-zinc-600/10 rounded-md text-sm transition-colors"
                        >
                          <span>Conceptos clave</span>
                        </Link>
                      </div>
                    </div>

                    {/* Bloque de Instalación */}
                    <div className="bg-gray-50 dark:bg-zinc-950/20 rounded-xl p-4 border border-gray-200 dark:border-zinc-800/50">
                      <h3 className="text-gray-800 dark:text-zinc-200 font-semibold text-sm mb-3 flex items-center">
                        <Code className="h-4 w-4 mr-2 text-gray-500 dark:text-zinc-400" />
                        Instalación
                      </h3>
                      <div className="space-y-2">
                        <Link
                          href="/docs/frameworks/nextjs"
                          className="block p-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-200/50 dark:hover:bg-zinc-600/10 rounded-md text-sm transition-colors"
                        >
                          <span>Next.js</span>
                        </Link>
                        <Link
                          href="/docs/frameworks/astro"
                          className="block p-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-200/50 dark:hover:bg-zinc-600/10 rounded-md text-sm transition-colors"
                        >
                          <span>Astro</span>
                        </Link>
                        <Link
                          href="/docs/frameworks/react"
                          className="block p-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-200/50 dark:hover:bg-zinc-600/10 rounded-md text-sm transition-colors"
                        >
                          <span>React</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Diseño unificado para Componentes, Ejemplos y otros menús */}
            {title !== "Docs" && submenu.columns && (
              <div
                className={`grid ${
                  title === "Ejemplos" ? "grid-cols-1" : "grid-cols-2"
                } p-0`}
              >
                {/* Renderizar columnas */}
                {submenu.columns.map((column, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${
                      colIndex === 0 &&
                      submenu.columns!.length > 1 &&
                      title !== "Ejemplos"
                        ? `border-r ${menuStyle.columnDivider}`
                        : ""
                    }`}
                  >
                    <div className="p-6">
                      <h3
                        className={`${menuStyle.headerText} text-sm mb-4 tracking-wide`}
                      >
                        {column.title}
                      </h3>
                      <div
                        className={`${
                          title === "Ejemplos"
                            ? "grid grid-cols-2 gap-3"
                            : "space-y-3"
                        }`}
                      >
                        {column.items.map((item, itemIndex) => {
                          const IconComponent = getIconComponent(item.title);
                          return (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              className={`flex items-start group p-2 ${menuStyle.itemHover} rounded-md transition-all duration-300 border border-transparent`}
                            >
                              <div
                                className={`w-10 h-10 rounded-md ${menuStyle.iconBg} flex items-center justify-center mr-3 transition-all duration-300 relative overflow-hidden`}
                              >
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${menuStyle.iconGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                ></div>
                                <IconComponent className="h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-700 dark:group-hover:text-white relative z-10 transition-colors duration-300" />
                              </div>
                              <div>
                                <p
                                  className={`text-gray-700 dark:text-zinc-200 font-medium text-sm ${menuStyle.textHover} transition-colors duration-300`}
                                >
                                  {item.title}
                                </p>
                                {item.description && (
                                  <p className="text-gray-500 dark:text-zinc-500 text-xs mt-1">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer para menús Componentes y Ejemplos */}
            {(title === "Componentes" || title === "Ejemplos") && (
              <div className="w-full border-t border-gray-200 dark:border-zinc-900 py-2 px-6">
                <Link
                  href={
                    title === "Componentes"
                      ? "/docs/componentes/accordion"
                      : "/docs/ejemplos"
                  }
                  className="text-xs text-gray-500 dark:text-zinc-400 flex items-center hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <span>
                    {title === "Componentes"
                      ? "Ver todos los componentes"
                      : "Explorar todos los ejemplos"}
                  </span>
                  <ArrowRight className="h-3 w-3 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            {/* Links cuando no hay columnas */}
            {submenu.links && !submenu.columns && (
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {submenu.links.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center p-2 rounded-md text-gray-700 dark:text-zinc-200 ${menuStyle.itemHover} transition-colors group`}
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadLinks;
