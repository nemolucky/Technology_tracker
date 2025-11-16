import { useState, useMemo } from 'react';
import { type Technology } from './useTechnologies';

interface UseTechnologySearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredTechnologies: Technology[];
  clearSearch: () => void;
}

export const useTechnologySearch = (technologies: Technology[]): UseTechnologySearchReturn => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTechnologies = useMemo(() => {
    if (!searchQuery.trim()) {
      return technologies; 
    }

    const query = searchQuery.toLowerCase();
    return technologies.filter(tech =>
      tech.title.toLowerCase().includes(query) ||
      tech.description.toLowerCase().includes(query)
    );
  }, [technologies, searchQuery]);


  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredTechnologies,
    clearSearch,
  };
};