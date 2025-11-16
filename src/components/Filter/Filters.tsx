import './Filters.css'

interface FiltersProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

function Filters({ selectedFilters, onFilterChange }: FiltersProps) {
  const filters = [
    { value: 'not-started', label: 'Не начато' },
    { value: 'in-progress', label: 'В прогрессе' },
    { value: 'completed', label: 'Выполнено' }
  ];

  const handleFilterChange = (filterValue: string) => {
    const newFilters = selectedFilters.includes(filterValue)
      ? selectedFilters.filter(f => f !== filterValue)
      : [...selectedFilters, filterValue];
    
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    selectedFilters = [
      'not-started',
      'in-progress',
      'completed'
    ]
    
    onFilterChange(selectedFilters);
  };

  return (
    <div className="filters">
      <h2 className="filters__title">Фильтры</h2>
      <div className="filters__items">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filters__button ${
              selectedFilters.includes(filter.value) ? 'filters__button--active' : ''
            } filters__button--${filter.value}`}
            onClick={() => handleFilterChange(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
        <button 
          className="filters__button filters__button--reset"
          onClick={() => handleResetFilters()}
          type='button'
          >
            Сбросить
        </button>
      </div>
    </div>
  );
}

export default Filters;