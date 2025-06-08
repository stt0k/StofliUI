import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import fs from "fs";
import preserveUseClientDirective from "rollup-plugin-preserve-use-client";
import replace from "@rollup/plugin-replace";

// Leer el archivo package.json
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// Configuración de terser que no elimine los comentarios especiales
const terserConfig = {
  format: {
    comments: /use client/,
    preserve_annotations: true
  }
};

// Configuración de replace para eliminar process.env
const replaceProcessEnv = replace({
  preventAssignment: true,
  values: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    // Puedes agregar más variables de entorno que necesites reemplazar aquí
  }
});

// Función para crear configuración para un componente
const createComponentConfig = (componentName) => {
  const inputPath = `src/components/${componentName}/index.ts`;

  // Verificar si el archivo existe
  if (!fs.existsSync(inputPath)) {
    console.warn(`Advertencia: No se encontró ${inputPath}`);
    return null;
  }

  return [
    // JavaScript bundle
    {
      input: inputPath,
      output: [
        {
          file: `dist/components/${componentName}/index.js`,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: `dist/components/${componentName}/index.esm.js`,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        replaceProcessEnv,
        preserveUseClientDirective(),
        typescript({
          tsconfig: "./tsconfig.json",
          declaration: false,
        }),
        terser(terserConfig),
      ],
      external: [
        "react",
        "react-dom",
        "framer-motion",
        "lucide-react",
        "tailwindcss",
        "tailwind-merge",
        "clsx",
      ],
    },
    // Tipos
    {
      input: inputPath,
      output: {
        file: `dist/types/components/${componentName}/index.d.ts`,
        format: "esm",
      },
      plugins: [dts()],
      external: [/\.css$/],
    },
  ];
};

// Obtener todos los nombres de componentes de la carpeta src/components
const componentFolders = fs
  .readdirSync("src/components", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Crear configuración para el paquete principal
const mainConfig = [
  // JavaScript bundle principal
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      replaceProcessEnv,
      preserveUseClientDirective(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      terser(terserConfig),
    ],
    external: [
      "react",
      "react-dom",
      "framer-motion",
      "lucide-react",
      "tailwindcss",
      "tailwind-merge",
      "clsx",
    ],
  },
  // TypeScript d.ts
  {
    input: "src/index.ts",
    output: {
      file: "dist/types/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
    external: [/\.css$/],
  },
  // Lib utils
  {
    input: "src/lib/index.ts",
    output: [
      {
        file: "dist/lib/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/lib/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      replaceProcessEnv,
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      preserveUseClientDirective(),
      terser(terserConfig),
    ],
    external: ["react", "react-dom", "tailwind-merge", "clsx"],
  },
  // Tipos para lib
  {
    input: "src/lib/index.ts",
    output: {
      file: "dist/types/lib/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];

// Crear y filtrar configuraciones de componentes
const componentConfigs = componentFolders
  .map((name) => createComponentConfig(name))
  .filter(Boolean)
  .flat();

// Combinar las configuraciones en una variable
const config = [...mainConfig, ...componentConfigs];

export default config;
