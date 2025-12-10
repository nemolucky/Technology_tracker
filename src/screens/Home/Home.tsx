import BulkActions from '@/components/elements/BulkActions/BulkActions'
import EditFilmForm from '@/components/elements/EditFilmForm/EditFilmForm'
import FilmsList from '@/components/elements/FilmsList/FilmsList'
import Filters from '@/components/elements/Filters/Filters'
import QuickActions from '@/components/elements/QuickActions/QuickActions'
import SearchField from '@/components/elements/SearchField/SearchField'
import Modal from '@/components/ui/Modal/Modal'
import { useFilms } from '@/hooks/useFilm'
import { useFilters } from '@/hooks/useFilters'
import { useQuickActions } from '@/hooks/useQuickActions'
import type { Film, TStatus } from '@/types/film.interface'
import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
	const [selectedFilmIds, setSelectedFilmIds] = useState<number[]>([])
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [editingFilm, setEditingFilm] = useState<Film | null>(null)

	const { selectedFilters, handleFilterChange, handleResetFilters } =
		useFilters()
	const {
		films,
		markAllAsViewed,
		resetAllStatuses,
		updateMultipleFilmStatuses,
		updateFilm,
	} = useFilms()

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

	const handleSelectFilm = (filmId: number, isSelected: boolean) => {
		setSelectedFilmIds(prevIds => {
			if (isSelected) {
				return [...prevIds, filmId]
			} else {
				return prevIds.filter(id => id !== filmId)
			}
		})
	}

	const handleUpdateStatusForSelected = (status: TStatus) => {
		updateMultipleFilmStatuses(selectedFilmIds, status)
		setSelectedFilmIds([]) // Deselect after updating
	}

	const handleClearSelection = () => {
		setSelectedFilmIds([])
	}

	const handleEdit = (film: Film) => {
		setEditingFilm(film)
		setIsEditModalOpen(true)
	}

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false)
		setEditingFilm(null)
	}

	const handleSaveFilm = (filmId: number, updatedData: Partial<Film>) => {
		updateFilm(filmId, updatedData)
		handleCloseEditModal()
	}

	return (
		<>
			<Container maxWidth='xl' sx={{ mt: 12, mb: 4 }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 4,
					}}
				>
					<Box
						sx={{
							width: { xs: '100%', md: 300 },
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
						}}
					>
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
					</Box>
					<Box sx={{ flex: 1 }}>
						<FilmsList
							selectedFilters={selectedFilters}
							highlightedFilmId={highlightedFilmId}
							searchQuery={debouncedSearchQuery}
							selectedFilmIds={selectedFilmIds}
							onSelectFilm={handleSelectFilm}
							onEdit={handleEdit}
						/>
					</Box>
				</Box>
			</Container>
			{selectedFilmIds.length > 0 && (
				<BulkActions
					selectedCount={selectedFilmIds.length}
					onUpdateStatus={handleUpdateStatusForSelected}
					onClearSelection={handleClearSelection}
				/>
			)}
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h2>Экспорт данных</h2>
				<p>Данные о фильмах были успешно скачаны в файл films-data.json.</p>
			</Modal>
			{editingFilm && (
				<Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
					<EditFilmForm
						film={editingFilm}
						onSave={handleSaveFilm}
						onCancel={handleCloseEditModal}
					/>
				</Modal>
			)}
		</>
	)
}

export default Home
