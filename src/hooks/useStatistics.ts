import { useMemo } from 'react';
import { type Technology } from './useTechnologies';

export interface StatisticsData {
  allTechnologies: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percentCompleted: number;
}

export const useStatistics = (technologies: Technology[]) => {
  return useMemo((): StatisticsData => {
    const allTechnologies = technologies.length;
    const completed = technologies.filter(
      (tech) => tech.status === "completed"
    ).length;
    const inProgress = technologies.filter(
      (tech) => tech.status === "in-progress"
    ).length;
    const notStarted = technologies.filter(
      (tech) => tech.status === "not-started"
    ).length;
    const percentCompleted = parseInt(
      ((completed / allTechnologies) * 100).toFixed(0)
    );

    return {
      allTechnologies,
      completed,
      inProgress,
      notStarted,
      percentCompleted,
    };
  }, [technologies]);
};