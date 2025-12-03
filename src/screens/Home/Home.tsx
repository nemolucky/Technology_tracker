import FilmsList from '@/components/elements/FilmsList/FilmsList'
import Filters from '@/components/elements/Filters/Filters'
import QuickActions from '@/components/elements/QuickActions/QuickActions'
import SearchField from '@/components/elements/SearchField/SearchField'
import Modal from '@/components/ui/Modal/Modal'
import { useFilms } from '@/hooks/useFilm'
import { useFilters } from '@/hooks/useFilters'
import { useQuickActions } from '@/hooks/useQuickActions'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
	const { selectedFilters, handleFilterChange, handleResetFilters } =
		useFilters()
	const { films, markAllAsViewed, resetAllStatuses } = useFilms()

	const {
		highlightedFilmId,
		isModalOpen,
		selectNextFilm,
		handleMarkAllAsViewed,
		handleResetAllStatuses,
		exportData,
		closeModal,
	} = useQuickActions({
		films,
		markAllAsViewed,
		resetAllStatuses,
	})

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery)
		}, 500) // 500ms debounce delay

		return () => {
			clearTimeout(handler)
		}
	}, [searchQuery])

	const handleSearch = (query: string) => {
		setSearchQuery(query)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.sidebar}>
						<SearchField onSearch={handleSearch} />
						<Filters
							selectedFilters={selectedFilters}
							handleFilterChange={handleFilterChange}
							handleResetFilters={handleResetFilters}
						/>
						<QuickActions
							onSelectNext={selectNextFilm}
							onMarkAllViewed={handleMarkAllAsViewed}
							onResetAll={handleResetAllStatuses}
							onExport={exportData}
						/>
					</div>
					<FilmsList
						selectedFilters={selectedFilters}
						highlightedFilmId={highlightedFilmId}
						searchQuery={debouncedSearchQuery}
					/>
				</div>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h2>Экспорт данных</h2>
				<p>Данные о фильмах были успешно скачаны в файл films-data.json.</p>
			</Modal>
		</>
	)
}

export default Home
