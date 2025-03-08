import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { components } from "./mdx-components";

const root = process.cwd();
const DOCS_DIRECTORY = path.join(root, "data", "docs");

// Tipos
export type FrontMatter = {
  [key: string]: unknown;
  title?: string;
  description?: string;
  date?: string;
  slug?: string;
  category?: string;
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
  return getAllMdxFiles(DOCS_DIRECTORY);
};

// Función para obtener un archivo por su slug y categoría
export const getFileBySlug = async ({
  slug,
}: {
  slug: string[] | string;
}): Promise<FileBySlugReturn> => {
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const filePath = path.join(DOCS_DIRECTORY, ...slugArray) + ".mdx";

  try {
    const mdxSource = await fs.readFile(filePath, "utf8");

    const { content, frontmatter } = await compileMDX({
      source: mdxSource,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypePrism],
        },
      },
    });

    return {
      content,
      frontMatter: {
        slug: slugArray.join("/"),
        category: slugArray.length > 1 ? slugArray[0] : "general",
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

      // Obtener la ruta relativa desde la carpeta docs
      const relativePath = path
        .relative(DOCS_DIRECTORY, filePath)
        .replace(/\\/g, "/")
        .replace(".mdx", "");

      // Separar la ruta en partes para obtener la categoría y el slug
      const pathParts = relativePath.split("/");
      const category = pathParts.length > 1 ? pathParts[0] : "general";
      const slug = relativePath;

      return {
        ...data,
        slug,
        category,
        relativePath,
      } as FrontMatter;
    })
  );

  return allPosts.sort((a, b) => {
    const dateA = (a.date as string) || "";
    const dateB = (b.date as string) || "";
    return dateA > dateB ? -1 : 1;
  });
};
