import './ProgressHeader.css'

interface ProgressHeaderProps {
  countOfTechnology: number;
  completedTechnologies: number;
  percentCompleted: number;
}

function ProgressHeader({ countOfTechnology, completedTechnologies, percentCompleted }: ProgressHeaderProps) {

  const getProgressColorClass = () => {
    if (percentCompleted < 30) return 'low';
    if (percentCompleted < 70) return 'medium';
    return 'high';
  };

  return (
    <header className="progress-header">
      <h1 className="progress-header__title">Technology Tracker</h1>
      
      <div className="progress-header__content">
        <div className="progress-header__stats">
          <div className="progress-header__progress-section">
            <div className="progress-header__progress-bar">
              <div 
                className={`progress-header__progress-fill ${getProgressColorClass()}`} 
                style={{ width: `${percentCompleted}%` }}
              ></div>
              <span className="progress-header__progress-text-overlay">
                {percentCompleted}%
              </span>
            </div>
            <div className="progress-header__count-section">
              <div className="progress-header__count-number">
                {completedTechnologies} / {countOfTechnology}
              </div>
              <div className="progress-header__count-label">
                Задач выполнено
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProgressHeader;