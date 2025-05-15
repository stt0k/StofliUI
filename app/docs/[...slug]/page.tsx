import { useMDXComponents } from '@/lib/mdx-components';
import { allDocs } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer2/hooks';
import ContentComponent from '@/components/ContentComponent';
import MainLayout from '@/components/MainLayout';
import { notFound } from 'next/navigation';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export default function DocPage({ params }: DocPageProps) {
  const slugPath = params.slug.join('/');
  
  // Extraer el directorio (primer segmento) y el nombre del archivo (último segmento)
  const directory = params.slug.length > 1 ? params.slug[0] : '';
  const segment = params.slug[params.slug.length - 1];
  
  // Primera búsqueda: usar campos computados
  const docBySegmentAndDirectory = allDocs.find(doc => 
    doc.segment === segment && doc.directory === directory
  );
  
  // Segunda búsqueda: solo por segmento
  const docBySegment = !docBySegmentAndDirectory ? 
    allDocs.find(doc => doc.segment === segment) : 
    null;
  
  // Tercera búsqueda: por URL completa
  const docByUrl = !docBySegmentAndDirectory && !docBySegment ? 
    allDocs.find(doc => doc.url === `/docs/${slugPath}`) : 
    null;
  
  // Elegir el documento encontrado
  let doc = docBySegmentAndDirectory || docBySegment || docByUrl;
  
  if (!doc) {
    // Cuarta búsqueda: búsqueda parcial por flattenedPath
    const partialMatches = allDocs.filter(d => {
      return d._raw.flattenedPath.includes(segment);
    });
    
    if (partialMatches.length > 0) {
      doc = partialMatches[0];
    }
  }
  
  const components = useMDXComponents();

  if (!doc?.body.code) {
    // Redireccionar a la página 404 personalizada
    notFound();
  }

  const Content = getMDXComponent(doc.body.code);

  return (
    <MainLayout>
      <ContentComponent
        title={doc.title || "Título no disponible"}
        description={doc.description || "Descripción no disponible"}
      />
      <div className="prose prose-invert max-w-none ms-6">
        <Content components={components} />
      </div>
    </MainLayout>
  );
}
