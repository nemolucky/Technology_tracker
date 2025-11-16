import "./SearchBox.css";

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultsCount: number;
  totalCount: number;
  onClear: () => void;
}

function SearchBox({ 
  searchQuery, 
  onSearchChange, 
  resultsCount, 
  totalCount,
  onClear 
}: SearchBoxProps) {
  const hasSearch = searchQuery.trim().length > 0;
  const showResultsInfo = hasSearch || resultsCount !== totalCount;

  return (
    <div className="search-box">
      <div className="search-box__input-container">
        <input
          type="text"
          className="search-box__input"
          placeholder="🔍 Поиск технологий..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {hasSearch && (
          <button 
            className="search-box__clear-btn"
            onClick={onClear}
            title="Очистить поиск"
          >
            ✕
          </button>
        )}
      </div>
      
      {showResultsInfo && (
        <div className="search-box__results-info">
          <span className="search-box__results-count">
            Найдено: <strong>{resultsCount}</strong> из {totalCount}
          </span>
          {hasSearch && resultsCount === 0 && (
            <span className="search-box__no-results">
              😕 Ничего не найдено
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;