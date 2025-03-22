import MainLayout from "@/components/MainLayout"; // Asegurate de que la ruta sea correcta
import { getFileBySlug } from "@/lib/mdx"; // Importar la función para obtener el archivo MDX
import ContentComponent from "@/components/ContentComponent"; // Importar el componente ContentComponent
import { Suspense } from "react";

interface PostProps {
  params: {
    slug: string[];
  };
}

export default async function Post({ params }: PostProps) {
  const { content, frontMatter } = await getFileBySlug({ slug: params.slug });

  return (
    <MainLayout>
      <ContentComponent
        title={frontMatter.title || "Titulo no dispo"} // Usar el título del frontMatter
        description={frontMatter.description || "Descripción no disponible"} // Usar la descripción del frontMatter
      />
      <Suspense fallback={<div>Loading...</div>}>
        <div suppressHydrationWarning className="prose prose-invert max-w-none">
          {content}
        </div>
      </Suspense>
    </MainLayout>
  );
}
