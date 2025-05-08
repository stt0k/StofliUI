export const headerData = [
  {
    title: "Docs",
    link: "/docs/introduccion",
    relatedPaths: [
      "/docs/introduccion",
      "/docs/instalacion",
      //"/docs/frameworks/nextjs",
      "/docs/frameworks*", // Comodín para futuras frameworks
    ],
  },
  {
    title: "Componentes",
    link: "/docs/componentes/accordion",
    relatedPaths: [
      //"/docs/componentes/accordion",
      "/docs/componentes*", // Comodín para cualquier ruta de componentes
    ],
  },
  {
    title: "Ejemplos",
    link: "/docs/ejemplos",
    hidden: true,
    relatedPaths: ["/docs/ejemplos"],
  },
  {
    title: "Changelog",
    link: "/docs/changelog",
    hidden: true,
    relatedPaths: ["/docs/changelog"],
  },
  {
    title: "Colores",
    link: "/docs/colores",
    hidden: true,
    relatedPaths: ["/docs/colores"],
  },
];
