import "./TechnologyNotes.css";

interface TechnologyNotesProps {
  notes: string;
  onNotesChange: (newNotes: string) => void;
}

function TechnologyNotes({ notes, onNotesChange }: TechnologyNotesProps) {
  return (
    <div className="notes-section">
      <h4 className="notes-section__title">📝 Мои заметки</h4>
      <textarea
        className="notes-section__textarea"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Записывайте сюда важные моменты, идеи, примеры кода..."
        rows={4}
      />
      <div className={`notes-section__hint ${notes.length > 0 ? "notes-section__hint--active" : ""}`}>
        {notes.length > 0
          ? `✅ Заметка сохранена (${notes.length} символов)`
          : "💡 Добавьте заметку..."}
      </div>
    </div>
  );
}

export default TechnologyNotes;