import { useState, useEffect } from 'react';

export function useSettings() {
  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hymn_font_size');
      return saved ? parseInt(saved, 10) : 22;
    }
    return 22;
  });

  useEffect(() => {
    localStorage.setItem('hymn_font_size', fontSize.toString());
  }, [fontSize]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 40)); 
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 14)); 

  return { fontSize, increaseFontSize, decreaseFontSize };
}