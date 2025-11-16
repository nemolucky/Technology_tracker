import type { MouseEventHandler } from "react";
import TechnologyNotes from "../TechnologyNotes/TechonologyNotes";
import { type Technology } from "../../hooks/useTechnologies";
import "./TechnologyCard.css";

interface TechnologyCardProps {
  technology: Technology; 
  onStatusChange: (id: number) => void; 
  onNotesChange: (id: number, notes: string) => void; 
  isSelected?: boolean;
  className?: string;
}

const statusIcons = {
  completed: "✅",
  "in-progress": "🔄",
  "not-started": "⏳",
} as const;

const statusLabels = {
  completed: "Завершено",
  "in-progress": "В процессе",
  "not-started": "Не начато",
};

function TechnologyCard({
  technology,
  onStatusChange,
  onNotesChange,
  isSelected,
  className = "",
}: TechnologyCardProps) {

  const handleCardClick: MouseEventHandler<HTMLDivElement> = () => {
    onStatusChange(technology.id);
  };

  return (
    <div
      className={`technology-card ${technology.status} ${className} ${
        isSelected ? "technology-card--selected" : ""
      }`}
      onClick={handleCardClick}
      data-tech-id={technology.id}
    >
      {/* Заголовок и статус */}
      <div className="technology-card__header">
        <div className="technology-card__title-section">
          <h3 className="technology-card__title">{technology.title}</h3>
          {isSelected && (
            <span
              className="technology-card__badge"
              title="Выбрано случайным образом"
            >
              🎯 Выбрано
            </span>
          )}
        </div>

        <div className="technology-card__status-section">
          <span
            className={`technology-card__icon technology-card__icon--${technology.status}`}
            title={statusLabels[technology.status]}
          >
            {statusIcons[technology.status]}
          </span>

          <span className="technology-card__status">
            {statusLabels[technology.status]}
          </span>
        </div>
      </div>

      {/* Описание */}
      <p className="technology-card__description">{technology.description}</p>

      {/* Заметки (внутри карточки) */}
      <TechnologyNotes
        notes={technology.notes}
        onNotesChange={(newNotes) => onNotesChange(technology.id, newNotes)}
      />
    </div>
  );
}

export default TechnologyCard;
