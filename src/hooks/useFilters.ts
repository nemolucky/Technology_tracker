import { useState } from 'react';

export const useFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "not-started",
    "in-progress",
    "completed",
  ]);

  const onFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  return {
    selectedFilters,
    onFilterChange,
  };
};