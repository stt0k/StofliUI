export const headerData = [
  {
    title: "Docs",
    link: "/docs/introduccion",
    relatedPaths: [
      "/docs/introduccion",
      "/docs/instalacion",
      "/docs/frameworks*",
    ],
    submenu: {
      columns: [
        {
          title: "Company",
          items: [
            {
              title: "About",
              description: "Meet the team",
              href: "/docs/introduccion",
            },
            {
              title: "Careers",
              description: "We're hiring",
              href: "/docs/instalacion",
            },
          ],
        },
        {
          title: "Explore",
          items: [
            {
              title: "Next.js",
              description: "How to use in Next.js",
              href: "/docs/frameworks/nextjs",
            },
            {
              title: "React",
              description: "How to use in React",
              href: "/docs/frameworks/react",
            },
            {
              title: "Astro",
              description: "How to use in Astro",
              href: "/docs/frameworks/astro",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Documentación",
          items: [
            { title: "Introducción", href: "/docs/introduccion" },
            { title: "Instalación", href: "/docs/instalacion" },
          ],
        },
      ],
      links: [
        { title: "Guía rápida", href: "/docs/guia-rapida" },
        { title: "Recursos", href: "/docs/recursos" },
      ],
    },
  },
  {
    title: "Componentes",
    link: "/docs/componentes/accordion",
    relatedPaths: ["/docs/componentes*"],
    submenu: {
      columns: [
        {
          title: "Layout",
          items: [
            {
              title: "Accordion",
              description: "Secciones expandibles",
              href: "/docs/componentes/accordion",
            },
            {
              title: "Card",
              description: "Contenedores con estilo",
              href: "/docs/componentes/card",
            },
            {
              title: "Tabs",
              description: "Organiza contenido en pestañas",
              href: "/docs/componentes/tabs",
            },
          ],
        },
        {
          title: "Formularios",
          items: [
            {
              title: "Button",
              description: "Botones interactivos",
              href: "/docs/componentes/button",
            },
            {
              title: "Checkbox",
              description: "Selección múltiple",
              href: "/docs/componentes/checkbox",
            },
            {
              title: "Input",
              description: "Campos de texto",
              href: "/docs/componentes/input",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Populares",
          items: [
            { title: "Accordion", href: "/docs/componentes/accordion" },
            { title: "Button", href: "/docs/componentes/button" },
          ],
        },
      ],
      links: [
        { title: "Ver todos", href: "/docs/componentes" },
        { title: "Novedades", href: "/docs/componentes/nuevos" },
      ],
    },
  },
  {
    title: "Ejemplos",
    link: "/docs/ejemplos",
    relatedPaths: ["/docs/ejemplos"],
    hidden: true,
    submenu: {
      columns: [
        {
          title: "Templates",
          items: [
            {
              title: "Dashboard",
              description: "Panel de análisis y monitoreo",
              href: "/docs/ejemplos/dashboard",
            },
            {
              title: "Authentication",
              description: "Sistema de inicio de sesión",
              href: "/docs/ejemplos/authentication",
            },
            {
              title: "Cards",
              description: "Diseños con tarjetas interactivas",
              href: "/docs/ejemplos/cards",
            },
            {
              title: "Perfil Social",
              description: "Perfiles de usuario y redes sociales",
              href: "/docs/ejemplos/perfil-social",
            },
            {
              title: "FAQ",
              description: "Preguntas frecuentes expansibles",
              href: "/docs/ejemplos/faq",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Ejemplos populares",
          items: [
            { title: "Dashboard", href: "/docs/ejemplos/dashboard" },
            { title: "Authentication", href: "/docs/ejemplos/authentication" },
          ],
        },
      ],
      links: [
        { title: "Explorar todo", href: "/docs/ejemplos" },
        { title: "Recientes", href: "/docs/ejemplos/recientes" },
      ],
    },
  },
  {
    title: "Changelog",
    link: "/docs/changelog",
    relatedPaths: ["/docs/changelog"],
  },
  {
    title: "Pricing",
    link: "/docs/pricing",
    relatedPaths: ["/pricing"],
  },
  {
    title: "Colores",
    link: "/docs/colores",
    hidden: true,
    relatedPaths: ["/docs/colores"],
  },
];
