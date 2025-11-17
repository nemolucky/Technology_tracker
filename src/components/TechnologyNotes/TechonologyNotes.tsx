import "./TechnologyNotes.css";

interface TechnologyNotesProps {
  notes: string;
  onNotesChange: (newNotes: string) => void;
  isCompact?: boolean;
}

function TechnologyNotes({ notes, onNotesChange, isCompact = false }: TechnologyNotesProps) {
  if (isCompact) {
    return (
      <div className="notes-section notes-section--compact">
        <div className="notes-section__preview">
          <span className="notes-section__preview-icon">📝</span>
          {notes ? (
            <span className="notes-section__preview-text">
              {notes.length > 50 ? `${notes.substring(0, 50)}...` : notes}
            </span>
          ) : (
            <span className="notes-section__preview-placeholder">
              Добавить заметку...
            </span>
          )}
        </div>
      </div>
    );
  }

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