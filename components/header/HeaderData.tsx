export const headerData = [
  {
    title: "Docs",
    link: "/docs/introduction",
    relatedPaths: [
      "/docs/introduction",
      "/docs/installation",
      //"/docs/frameworks/nextjs",
      "/docs/frameworks*", // Comodín para futuras frameworks
    ],
  },
  {
    title: "Components",
    link: "/docs/components/accordion",
    relatedPaths: [
      //"/docs/components/accordion",
      "/docs/components*", // Comodín para cualquier ruta de componentes
    ],
  },
  {
    title: "Examples",
    link: "/docs/examples",
    hidden: true,
    relatedPaths: ["/docs/examples"],
  },
  {
    title: "Changelog",
    link: "/docs/changelog",
    hidden: true,
    relatedPaths: ["/docs/changelog"],
  },
  {
    title: "Colors",
    link: "/docs/colors",
    hidden: true,
    relatedPaths: ["/docs/colors"],
  },
];
