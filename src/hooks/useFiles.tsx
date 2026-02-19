import { useState, useEffect } from 'react';

export interface FileHimno {
  id: string;
  title: string;
  content: string[];
  number: number;
}

const himnosModulos = import.meta.glob<string>('../assets/himnos/*.txt', { 
  query: '?raw', import: 'default', eager: true 
});

const folderModules = import.meta.glob<string>('../assets/folder/*.txt', { 
  query: '?raw', import: 'default', eager: true 
});

export function useFiles(type: 'himnos' | 'folder') {
  const [files, setFiles] = useState<FileHimno[]>([]);

  useEffect(() => {
    const sourceModules = type === 'folder' ? folderModules : himnosModulos;

    const loadedFiles: FileHimno[] = Object.entries(sourceModules).map(([path, content]) => {
      // OBTENER NOMBRE
      let fileName = path.split('/').pop()?.replace('.txt', '') || 'Sin Titulo';
      
      // EXTRAER NUMERO
      const numberMatch = fileName.match(/^(\d+)/);
      const number = numberMatch ? parseInt(numberMatch[1], 10) : 0;

      // 3. LIMPIEZA PROFUNDA DEL TÍTULO 
      let cleanTitle = fileName
        .replace(/^\d+[\.\-\s]*/, '') // Borra "1.", "05 -", "10 "
        .trim(); // QUITA ESPACIOS

      if (!cleanTitle) cleanTitle = fileName;
      const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim() !== '');

      return {
        id: path,
        title: cleanTitle, //ENVIAR TITULO LIMPIO
        content: paragraphs,
        number
      };
    });

    // ORDENAR POR NUMERO
    loadedFiles.sort((a, b) => {
        if (a.number !== 0 && b.number !== 0) {
            return a.number - b.number;
        }
        return a.title.localeCompare(b.title);
    });

    setFiles(loadedFiles);
  }, [type]);

  return { files };
}