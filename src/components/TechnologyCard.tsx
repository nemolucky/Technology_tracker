import './TechnologyCard.css'

interface TechnologyCardProps {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const statusIcons = {
  completed: '✅',
  'in-progress': '🔄',
  'not-started': '⏳'
} as const;

const statusLabels = {
  completed: 'Завершено',
  'in-progress': 'В процессе',
  'not-started': 'Не начато'
};

function TechnologyCard({ title, description, status }: TechnologyCardProps) {
  return (
    <div className={`technology-card ${status}`}>
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <div className="technology-card__status-section">
          <span className="technology-card__icon">{statusIcons[status]}</span>
          <span className="technology-card__status">{statusLabels[status]}</span>
        </div>
      </div>
      <p className="technology-card__description">{description}</p>
    </div>
  );
}

export default TechnologyCard;