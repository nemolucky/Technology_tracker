import "./Statistics.css";

interface StatisticsProps {
  notStarted: number;
  inProgress: number;
  completed: number;
  percentCompleted: number;
}

function Statistics({
  notStarted,
  inProgress,
  completed,
  percentCompleted,
}: StatisticsProps) {
  return (
    <div className="statistics">
      <h2 className="statistics__title">Статистика</h2>
      <div className="statistics__item">
        <span className="statistics__label">Не начато:</span>
        <span className="statistics__value">{notStarted}</span>
      </div>
      <div className="statistics__item">
        <span className="statistics__label">В процессе:</span>
        <span className="statistics__value">{inProgress}</span>
      </div>
      <div className="statistics__item">
        <span className="statistics__label">Выполнено:</span>
        <span className="statistics__value">{completed}</span>
      </div>
      <div className="statistics__item">
        <span className="statistics__label">Общий прогресс:</span>
        <span className="statistics__value">{percentCompleted}%</span>
      </div>
    </div>
  );
}

export default Statistics;
