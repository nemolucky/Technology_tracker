import "./App.css";
import TechnologyCard from "./components/TechnologyCard/TechnologyCard";
import ProgressHeader from "./components/ProgressHeader/ProgressHeader";
import Statistics from "./components/Statistics/Statistics";
import Filters from "./components/Filter/Filters";
import QuickActions from "./components/QuickActions/QuickActions";
import SearchBox from "./components/SearchBox/SearchBox";
import { useState } from "react";

import { useTechnologies } from "./hooks/useTechnologies";
import { useStatistics } from "./hooks/useStatistics";
import { useQuickActions } from "./hooks/useQuickActions";
import { useFilters } from "./hooks/useFilters";
import { useTechnologySearch } from "./hooks/useTechnologySearch";

function App() {
  const {
    technologies,
    handleStatusChange,
    handleMarkAllCompleted,
    handleResetAll,
    handleNotesChange,
  } = useTechnologies();

  const statistics = useStatistics(technologies);
  const { selectedFilters, onFilterChange } = useFilters();
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<
    number | null
  >(null);
  const { handleRandomSelect } = useQuickActions(
    technologies,
    setSelectedTechnologyId
  );

  const { searchQuery, setSearchQuery, filteredTechnologies, clearSearch } =
    useTechnologySearch(technologies);

  const displayedTechnologies = filteredTechnologies.filter((technology) =>
    selectedFilters.includes(technology.status)
  );

  return (
    <div className="page-content">
      <ProgressHeader
        countOfTechnology={statistics.allTechnologies}
        completedTechnologies={statistics.completed}
        percentCompleted={statistics.percentCompleted}
      />

      <main className="main-content">
        <div className="technology-tools">
          <SearchBox
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultsCount={displayedTechnologies.length}
            totalCount={technologies.length}
            onClear={clearSearch}
          />
          <Statistics
            notStarted={statistics.notStarted}
            inProgress={statistics.inProgress}
            completed={statistics.completed}
            percentCompleted={statistics.percentCompleted}
          />
          <Filters
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
          />
          <QuickActions
            chooseRandom={handleRandomSelect}
            changeAllStatusToCompleted={handleMarkAllCompleted}
            resetAllStatus={handleResetAll}
          />
        </div>

        <ul className="technology-list">
          {displayedTechnologies
            .map((technology) => (
              <li key={technology.id}>
                <TechnologyCard
                  technology={technology}
                  onStatusChange={handleStatusChange}
                  onNotesChange={handleNotesChange}
                  isSelected={selectedTechnologyId === technology.id}
                />
              </li>
            ))}
        </ul>

        {displayedTechnologies.length === 0 && (
          <div className="no-results-message">
            <h3>😕 Ничего не найдено</h3>
            <p>Попробуйте изменить поисковый запрос или фильтры</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
