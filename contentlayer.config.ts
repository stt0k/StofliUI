import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => {
        // Extraer el nombre del archivo sin extensión
        const fileName = doc._raw.sourceFileName.replace(/\.mdx$/, '');
        // Extraer el directorio padre (componentes, frameworks, etc.)
        const dirName = doc._raw.sourceFileDir.split('/').pop() || '';
        
        // Crear una URL más predecible basada en el directorio y nombre del archivo
        return `/docs/${dirName}/${fileName}`;
      },
    },
    // Añadir campos computados adicionales para facilitar la búsqueda
    segment: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.sourceFileName.replace(/\.mdx$/, '');
      }
    },
    directory: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.sourceFileDir.split('/').pop() || '';
      }
    }
  },
}));

// Tipos para los nodos de rehype-pretty-code
interface LineElement {
  properties: {
    className: string[];
  };
  children: Array<{type: string; value?: string}>;
}

interface CharsElement {
  properties: {
    className: string[];
  };
}

export default makeSource({ 
  contentDirPath: 'data',
  documentTypes: [Doc],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, { 
        theme: 'one-dark-pro',
        keepBackground: false,
        grid: true,
        onVisitLine(node: LineElement) {
          // Agregar espacio para líneas vacías
          if (node.children.length === 0) {
            node.children = [{type: 'text', value: ' '}];
          }
        },
        onVisitHighlightedLine(node: LineElement) {
          node.properties.className.push('highlighted-line');
        },
        onVisitHighlightedChars(node: CharsElement) {
          node.properties.className.push('highlighted-chars');
        },
      }]
    ]
  }
});
