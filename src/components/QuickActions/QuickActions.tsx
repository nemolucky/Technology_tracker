import './QuickActions.css'

interface QuickActionsProps{
  changeAllStatusToCompleted: () => void;
  resetAllStatus: () => void;
  chooseRandom: () => void;
}

function QuickActions({chooseRandom, changeAllStatusToCompleted, resetAllStatus}: QuickActionsProps){
  return (
    <div className="quick-actions">
      <h2 className="quick-actions__title">
        Быстрые действия
      </h2>
      <div className="quick-actions__items">
        <button 
          className="quick-actions__button quick-actions__button--to-random"
          onClick={chooseRandom}
        >
          Случайный выбор следующей технологии
        </button>
        <button 
          className="quick-actions__button quick-actions__button--to-completed"
          onClick={changeAllStatusToCompleted}
        >
          Отметить все как выполненные
        </button>
        <button 
          className="quick-actions__button quick-actions__button--to-not-started"
          onClick={resetAllStatus}
        >
          Сбросить все статусы
        </button>
      </div>
    </div>
  );
}

export default QuickActions;