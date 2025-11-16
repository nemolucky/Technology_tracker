import { useState, useEffect } from 'react';

export type TStatus = "completed" | "in-progress" | "not-started";

export interface Technology {
  id: number;
  title: string;
  description: string;
  status: TStatus;
  notes: string;
}

const initialTechnologies: Technology[] = [
  {
    id: 1,
    title: "React Components",
    description: "Изучение базовых компонентов",
    status: "completed",
    notes: "",
  },
  {
    id: 2,
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX",
    status: "in-progress",
    notes: "",
  },
  {
    id: 3,
    title: "State Management",
    description: "Работа с состоянием компонентов",
    status: "not-started",
    notes: "",
  },
];

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      const saved = localStorage.getItem("techTrackerData");
      if (saved) {
        setTechnologies(JSON.parse(saved));
      } else {
        setTechnologies(initialTechnologies);
      }
      setIsLoaded(true);
      return;
    }

    localStorage.setItem("techTrackerData", JSON.stringify(technologies));
  }, [technologies, isLoaded]);

  const handleStatusChange = (id: number) => {
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) => {
        if (technology.id === id) {
          const statusOrder: TStatus[] = [
            "not-started",
            "in-progress",
            "completed",
          ];
          const currentIndex = statusOrder.indexOf(technology.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          const nextStatus = statusOrder[nextIndex];

          return {
            ...technology,
            status: nextStatus,
          };
        }
        return technology;
      })
    );
  };

  const handleMarkAllCompleted = () => {
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) => {
        if (technology.status !== "completed") {
          return {
            ...technology,
            status: "completed",
          };
        }
        return technology;
      })
    );
  };

  const handleResetAll = () => {
    setTechnologies((prevTechnologies) =>
      prevTechnologies.map((technology) => {
        if (technology.status !== "not-started") {
          return {
            ...technology,
            status: "not-started",
          };
        }
        return technology;
      })
    );
  };

  const handleNotesChange = (techId: number, newNotes: string) => {
    setTechnologies((prevTech) =>
      prevTech.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  return {
    technologies,
    handleStatusChange,      
    handleMarkAllCompleted,  
    handleResetAll,          
    handleNotesChange,
  };
};