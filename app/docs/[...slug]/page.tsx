import MainLayout from "@/components/MainLayout"; // Asegúrate de que la ruta sea correcta
import { getFileBySlug } from "@/lib/mdx"; // Importar la función para obtener el archivo MDX
import ContentComponent from "@/components/ContentComponent"; // Importar el componente ContentComponent

interface PostProps {
    params: {
        slug: string; // Recibir el slug como parámetro
    };
}

export default async function Post({ params }: PostProps) {
    const { content, frontMatter } = await getFileBySlug({ slug: params.slug });

    return (
        <MainLayout>
            <ContentComponent
        title={frontMatter.title || 'Titulo no dispo'} // Usar el título del frontMatter
        description={frontMatter.description || 'Descripción no disponible'} // Usar la descripción del frontMatter
      />
            {/* <h1>{frontMatter.title || "Título no disponible"}</h1>Ejemplo de como usar el frontMatter*/}
            {content} {/* Renderiza directamente el contenido devuelto por compileMDX */}
        </MainLayout>
    );
}
