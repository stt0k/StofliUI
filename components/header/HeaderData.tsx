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
          title: "Primeros pasos",
          items: [
            {
              title: "Sobre nosotros",
              href: "/docs/introduccion",
            },
            {
              title: "Guia",
              href: "/docs/instalacion",
            },
          ],
        },
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
          title: "Plantillas",
          items: [
            {
              title: "Dashboard",
              description: "Panel de análisis y monitoreo",
              href: "/docs/ejemplos/#dashboard",
            },
            {
              title: "Authentication",
              description: "Sistema de inicio de sesión",
              href: "/docs/ejemplos/#authentication",
            },
            {
              title: "Cards",
              description: "Diseños con tarjetas interactivas",
              href: "/docs/ejemplos/#cards",
            },
            {
              title: "Perfil Social",
              description: "Perfiles de usuario y redes sociales",
              href: "/docs/ejemplos/#perfil-social",
            },
            {
              title: "FAQ",
              description: "Preguntas frecuentes expansibles",
              href: "/docs/ejemplos/#faq",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Ejemplos populares",
          items: [
            { title: "Dashboard", href: "/docs/ejemplos/#dashboard" },
            { title: "Authentication", href: "/docs/ejemplos/#authentication" },
            { title: "Cards", href: "/docs/ejemplos/#cards" },
            { title: "Perfil Social", href: "/docs/ejemplos/#perfil-social" },
            { title: "FAQ", href: "/docs/ejemplos/#faq" },
          ],
        },
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
