import './App.css'
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';
import Filters from './components/Filters';
import QuickActions from './components/QuickActions';
import { useMemo, useState } from 'react';

type TStatus = 'completed' | 'in-progress' | 'not-started';

interface Technology {
  id: number;
  title: string;
  description: string;
  status: TStatus;
}

function App() {

  const [technologies, setTechnologies] = useState<Technology[]>([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ]);

  const [selectedFilters, onFilterChange] = useState<string[]>([
    'not-started',
    'in-progress',
    'completed'
  ]);
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<number | null>(null);

  const changeStatus = (id: number) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(technology => {
        if (technology.id === id){
          const statusOrder: TStatus[] = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(technology.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          const nextStatus = statusOrder[nextIndex];

          return {
            ...technology,
            status: nextStatus
          };
        }
        return technology;
      })
    )
  }

  const handleMarkAllCompleted = () => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(technology => {
        if (technology.status != 'completed'){
          return {
            ...technology,
            status: 'completed'
          };
        }
        return technology
      })
    )
    setSelectedTechnologyId(null);
  }

  const handleResetAll = () => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(technology => {
        if (technology.status != 'not-started'){
          return {
            ...technology,
            status: 'not-started'
          };
        }
        return technology
      })
    )
    setSelectedTechnologyId(null);
  }

  const handleRandomSelect = () => {
    const notStartedTechs = technologies.filter(tech => tech.status === 'not-started');
    
    if (notStartedTechs.length === 0) {
      alert('Все технологии уже начаты или завершены!');
      setSelectedTechnologyId(null); 
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * notStartedTechs.length);
    const randomTech = notStartedTechs[randomIndex];
    
    setSelectedTechnologyId(randomTech.id);
    
    setTimeout(() => {
      const element = document.getElementById(`tech-${randomTech.id}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };



  const statistics = useMemo(() => {
    const allTechnologies = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    const percentCompleted = parseInt(((completed / allTechnologies) * 100).toFixed(0));

    return {
      allTechnologies,
      completed,
      inProgress,
      notStarted,
      percentCompleted
    };
  }, [technologies]);



  return (
    <div className='page-content'>

      <ProgressHeader
        countOfTechnology={statistics.allTechnologies}
        completedTechnologies={statistics.completed}
        percentCompleted={statistics.percentCompleted}        
      />

      <main className='main-content'>
        <div className="technology-tools">
          <Statistics
            notStarted={statistics.notStarted}
            inProgress={statistics.inProgress}
            completed={statistics.completed}
            percentCompleted={statistics.percentCompleted}
          />
          <Filters
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
          />
          <QuickActions
            chooseRandom={handleRandomSelect}
            changeAllStatusToCompleted={handleMarkAllCompleted}
            resetAllStatus={handleResetAll}
          />
        </div>
        <ul className="technology-list">
          {technologies
            .filter(technology => selectedFilters.includes(technology.status))
            .map(technology => (
            <li
              key = {technology.id}
            >
                <TechnologyCard 
                  title={technology.title}
                  description={technology.description}
                  status={technology.status}
                  onTap={() => changeStatus(technology.id)}
                  isSelected={selectedTechnologyId === technology.id}
                />
            </li>
          ))}
        </ul>        
      </main>
    </div>
  )
}

export default App
