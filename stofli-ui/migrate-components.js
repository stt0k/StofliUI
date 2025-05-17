// migrate-components.js
const fs = require("fs");
const path = require("path");

// Rutas correctas - ajustadas para tu estructura de directorios
const sourceDir = path.resolve("../components/sections");
const targetDir = path.resolve("./src/components");
const libDir = path.resolve("./src/lib");
const sourceUtils = path.resolve("../lib/utils.ts");

// Asegúrate de que los directorios existan
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Comprobar que los archivos de origen existen
if (!fs.existsSync(sourceDir)) {
  console.error(`Error: No se encuentra el directorio de origen: ${sourceDir}`);
  process.exit(1);
}

if (!fs.existsSync(sourceUtils)) {
  console.error(`Error: No se encuentra el archivo utils.ts: ${sourceUtils}`);
  process.exit(1);
}

// Copiar función de utilidad
console.log(`Copiando ${sourceUtils} a ${path.join(libDir, "utils.ts")}`);
fs.copyFileSync(sourceUtils, path.join(libDir, "utils.ts"));

// Crear archivo index.ts para lib
fs.writeFileSync(
  path.join(libDir, "index.ts"),
  "export { cn } from './utils';\n"
);

// Procesar cada componente
fs.readdirSync(sourceDir).forEach((file) => {
  if (file.endsWith(".tsx")) {
    const componentName = file.replace(".tsx", "");
    const componentDir = path.join(targetDir, componentName);

    // Crear directorio del componente
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // Leer contenido original
    let content = fs.readFileSync(path.join(sourceDir, file), "utf8");

    // Reemplazar importaciones
    content = content.replace(
      /import\s+{(\s*cn\s*)}\s+from\s+["']@\/lib\/utils["'];/g,
      'import { $1 } from "../../lib/utils";'
    );

    // Guardar componente principal
    const componentFilename =
      componentName.charAt(0).toUpperCase() + componentName.slice(1);
    fs.writeFileSync(
      path.join(componentDir, `${componentFilename}.tsx`),
      content
    );

    // Crear index.ts
    fs.writeFileSync(
      path.join(componentDir, "index.ts"),
      `export { default } from './${componentFilename}';\nexport * from './${componentFilename}';\n`
    );

    console.log(`Migrado: ${componentName}`);
  }
});

console.log("Migración completada!");
n