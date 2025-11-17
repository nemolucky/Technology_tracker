import { useState } from 'react';
import './QuickActions.css';
import Modal from '../Modal/Modal';
import { type Technology } from '../../hooks/useTechnologies';

interface QuickActionsProps {
  changeAllStatusToCompleted: () => void;
  resetAllStatus: () => void;
  chooseRandom: () => void;
  technologies: Technology[];
}

function QuickActions({ 
  chooseRandom, 
  changeAllStatusToCompleted, 
  resetAllStatus, 
  technologies 
}: QuickActionsProps) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalTechnologies: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length,
      technologies: technologies.map(tech => ({
        id: tech.id,
        title: tech.title,
        description: tech.description,
        status: tech.status,
        notes: tech.notes,
      }))
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(true);
  };

  const handleCloseModal = () => {
    setShowExportModal(false);
  };

  return (
    <>
      <div className="quick-actions">
        <h2 className="quick-actions__title">
          Быстрые действия
        </h2>
        <div className="quick-actions__items">
          <button 
            className="quick-actions__button quick-actions__button--to-random"
            onClick={chooseRandom}
          >
            🎯 Случайный выбор следующей технологии
          </button>
          <button 
            className="quick-actions__button quick-actions__button--to-completed"
            onClick={changeAllStatusToCompleted}
          >
            ✅ Отметить все как выполненные
          </button>
          <button 
            className="quick-actions__button quick-actions__button--to-not-started"
            onClick={resetAllStatus}
          >
            🔄 Сбросить все статусы
          </button>
          <button 
            className="quick-actions__button quick-actions__button--export"
            onClick={handleExport}
          >
            📤 Экспорт данных
          </button>
        </div>
      </div>

      {/* Модальное окно  */}
      <Modal
        isOpen={showExportModal}
        onClose={handleCloseModal}
        title="✅ Экспорт данных завершен"
      >
        <div className="export-modal-content">
          <p>Данные вашего трекера успешно экспортированы!</p>
          <div className="export-stats">
            <p><strong>Статистика экспорта:</strong></p>
            <ul>
              <li>Всего технологий: {technologies.length}</li>
              <li>Завершено: {technologies.filter(t => t.status === 'completed').length}</li>
              <li>В процессе: {technologies.filter(t => t.status === 'in-progress').length}</li>
              <li>Не начато: {technologies.filter(t => t.status === 'not-started').length}</li>
            </ul>
          </div>
          <p>Файл сохранен в вашей папке загрузок.</p>
          <button 
            className="quick-actions__button quick-actions__button--export"
            onClick={handleCloseModal}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </>
  );
}

export default QuickActions;