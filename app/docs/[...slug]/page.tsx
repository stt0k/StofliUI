import { useMDXComponents } from '@/lib/mdx-components';
import { allDocs } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer2/hooks';
import ContentComponent from '@/components/ContentComponent';
import MainLayout from '@/components/MainLayout';

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
    return (
      <MainLayout>
        <div className="py-8 mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Documento no encontrado</h1>
          <p className="mb-4">No pudimos encontrar el documento: <code>{slugPath}</code></p>
          <h2 className="text-xl font-bold mt-6 mb-2">Documentos disponibles ({allDocs.length}):</h2>
          <ul className="list-disc pl-6">
            {allDocs.map(d => (
              <li key={d._raw.flattenedPath} className="mb-2">
                <div><strong>Path:</strong> <code>{d._raw.flattenedPath}</code></div>
                <div><strong>URL:</strong> <code>{d.url}</code></div>
                <div><strong>Directory:</strong> <code>{d.directory}</code></div>
                <div><strong>Segment:</strong> <code>{d.segment}</code></div>
              </li>
            ))}
          </ul>
        </div>
      </MainLayout>
    );
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
