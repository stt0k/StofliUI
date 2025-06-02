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
              title: "Guía de instalación",
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
    link: "/ejemplos",
    relatedPaths: ["/ejemplos"],
    hidden: true,
    submenu: {
      columns: [
        {
          title: "Plantillas",
          items: [
            {
              title: "Dashboard",
              description: "Panel de análisis y monitoreo",
              href: "/ejemplos/#dashboard",
            },
            {
              title: "Autenticación",
              description: "Sistemas de login y registro",
              href: "/ejemplos/#autenticacion",
            },
            {
              title: "Cards",
              description: "Diseños con tarjetas interactivas",
              href: "/ejemplos/#cards",
            },
            {
              title: "Perfil Social",
              description: "Perfiles de usuario y redes sociales",
              href: "/ejemplos/#perfil-social",
            },
            {
              title: "FAQ",
              description: "Preguntas frecuentes expansibles",
              href: "/ejemplos/#faq",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Ejemplos populares",
          items: [
            { title: "Dashboard", href: "/ejemplos/#dashboard" },
            { title: "Authentication", href: "/ejemplos/#authentication" },
            { title: "Cards", href: "/ejemplos/#cards" },
            { title: "Perfil Social", href: "/ejemplos/#perfil-social" },
            { title: "FAQ", href: "/ejemplos/#faq" },
          ],
        },
      ],
    },
  },
  {
    title: "Changelog",
    link: "/changelog",
    relatedPaths: ["/changelog"],
  },
  {
    title: "Pricing",
    link: "/pricing",
    relatedPaths: ["/pricing"],
  },
  {
    title: "Colores",
    link: "/colores",
    hidden: true,
    relatedPaths: ["/colores"],
  },
];
