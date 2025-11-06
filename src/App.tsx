import './App.css'
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

type TStatus = 'completed' | 'in-progress' | 'not-started';

interface Technology {
  id: number;
  title: string;
  description: string;
  status: TStatus;
}

function App() {

  const technologies: Technology[] = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ];

  let allTechnologies: number = technologies.length;
  let completedTechnologies: number = technologies.filter(technology => technology.status === "completed").length;
  let percentCompleted = parseInt((completedTechnologies / allTechnologies * 100).toFixed(0))
  return (
    <div className='page-content'>

      <ProgressHeader
        countOfTechnology={allTechnologies}
        completedTechnologies={completedTechnologies}
        percentCompleted={percentCompleted}        
      />

      <main className='main-content'>
        <ul>
          {technologies.map(technology => (
            <li
              key = {technology.id}
            >
                <TechnologyCard 
                  title={technology.title}
                  description={technology.description}
                  status={technology.status} 
                />
            </li>
          ))}
        </ul>        
      </main>
    </div>
  )
}

export default App
