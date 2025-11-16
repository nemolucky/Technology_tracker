import { type Technology } from './useTechnologies';

export const useQuickActions = (
  technologies: Technology[], 
  setSelectedTechnologyId: (id: number | null) => void
) => {
  const handleRandomSelect = () => {
    const notStartedTechs = technologies.filter(
      (tech) => tech.status === "not-started"
    );

    if (notStartedTechs.length === 0) {
      alert("Все технологии уже начаты или завершены!");
      setSelectedTechnologyId(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * notStartedTechs.length);
    const randomTech = notStartedTechs[randomIndex];

    setSelectedTechnologyId(randomTech.id);

    setTimeout(() => {
      const element = document.getElementById(`tech-${randomTech.id}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return {
    handleRandomSelect,
  };
};