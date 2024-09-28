import fs from 'fs/promises'; // Usar la versión de promesas de fs
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc'; // Importar compileMDX para manejar el contenido y frontmatter

const root = process.cwd();

// Definir los tipos para el archivo
export type FrontMatter = {
  [key: string]: unknown;
  title?: string;
  date?: string;
  slug?: string;
};

// Tipo para el retorno de la función getFileBySlug
type FileBySlugReturn = {
  content: JSX.Element; // Cambiar a JSX.Element en lugar de string
  frontMatter: FrontMatter; // Los metadatos extraídos
};

// Función que obtiene los archivos
export const getFiles = async (): Promise<string[]> => {
  return fs.readdir(path.join(root, 'data')); // Usamos fs.readdir de forma asíncrona
};

// Función que obtiene un archivo por su slug
export const getFileBySlug = async ({ slug }: { slug: string }): Promise<FileBySlugReturn> => {
  const filePath = path.join(root, 'data', `${slug}.mdx`);

  // Verifica que el archivo existe y se puede leer
  try {
    const mdxSource = await fs.readFile(filePath, 'utf8'); // Usa fs.readFile de forma asíncrona

    // Compilar el contenido y extraer el frontmatter
    const { content, frontmatter } = await compileMDX({
      source: mdxSource,
      options: { parseFrontmatter: true },
    });

    return {
      content, // Retornar el contenido compilado
      frontMatter: {
        slug,
        ...frontmatter, // Cambiar 'data' a 'frontmatter' para acceder correctamente a los metadatos
      },
    };
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    throw new Error(`No se pudo leer el archivo: ${slug}`);
  }
};

// Función que obtiene todos los metadatos de los archivos
export const getAllFilesMetadata = async (): Promise<FrontMatter[]> => {
  const files = await getFiles(); // Llamamos a la función asíncrona getFiles

  const allPosts = await Promise.all(
    files.map(async (postSlug) => {
      const filePath = path.join(root, 'data', postSlug);
      const mdxSource = await fs.readFile(filePath, 'utf8'); // Usamos fs.readFile de forma asíncrona

      const { data } = matter(mdxSource); // Extraer los metadatos

      return {
        ...data,
        slug: postSlug.replace('.mdx', ''), // Extraer slug del nombre del archivo
      };
    })
  );

  return allPosts; // Retornar todos los metadatos
};
