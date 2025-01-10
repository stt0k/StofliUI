import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

const root = process.cwd();

// Tipos
export type FrontMatter = {
  [key: string]: unknown;
  title?: string;
  description?: string;
  date?: string;
  slug?: string;
};

type FileBySlugReturn = {
  content: JSX.Element;
  frontMatter: FrontMatter;
};

// Función auxiliar para recorrer directorios recursivamente
const getAllMdxFiles = async (dir: string): Promise<string[]> => {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getAllMdxFiles(res) : Promise.resolve(res);
    })
  );
  return Array.prototype
    .concat(...files)
    .filter((file) => file.endsWith(".mdx"));
};

// Obtener todos los archivos .mdx
export const getFiles = async (): Promise<string[]> => {
  return getAllMdxFiles(path.join(root, "data", "docs"));
};

// Importar componentes
import CustomAccordion from "@/components/sections/accordion";

// Define el objeto de componentes
const components = {
  CustomAccordion,
  // Añade más componentes según necesites
};

// Función para obtener un archivo por su slug
export const getFileBySlug = async ({
  slug,
}: {
  slug: string[] | string;
}): Promise<FileBySlugReturn> => {
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const filePath = path.join(root, "data", "docs", ...slugArray) + ".mdx";

  try {
    const mdxSource = await fs.readFile(filePath, "utf8");

    const { content, frontmatter } = await compileMDX({
      source: mdxSource,
      options: {
        parseFrontmatter: true,
        // Añade opciones de MDX aquí si las necesitas
      },
      components, // Pasa el objeto de componentes aquí
    });

    return {
      content,
      frontMatter: {
        slug: slugArray.join("/"),
        ...frontmatter,
      },
    };
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    notFound();
  }
};

// Obtener todos los metadatos de los archivos
export const getAllFilesMetadata = async (): Promise<FrontMatter[]> => {
  const files = await getFiles();

  const allPosts = await Promise.all(
    files.map(async (filePath) => {
      const mdxSource = await fs.readFile(filePath, "utf8");
      const { data } = matter(mdxSource);

      const relativePath = path
        .relative(path.join(root, "data"), filePath)
        .replace(/\\/g, "/")
        .replace(".mdx", "");

      return {
        ...data,
        slug: path.basename(filePath, ".mdx"),
        relativePath,
      } as FrontMatter;
    })
  );

  return allPosts;
};
