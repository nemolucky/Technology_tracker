import { useState, useCallback } from 'react'
import { type Film } from '../types/film.interface'

type useQuickActionsProps = {
	films: Film[]
	markAllAsViewed: () => void
	resetAllStatuses: () => void
}

export const useQuickActions = ({
	films,
	markAllAsViewed,
	resetAllStatuses,
}: useQuickActionsProps) => {
	const [highlightedFilmId, setHighlightedFilmId] = useState<number | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const selectNextFilm = useCallback(() => {
		const notStartedFilms = films.filter(film => film.status === 'not-started')
		if (notStartedFilms.length > 0) {
			const randomIndex = Math.floor(Math.random() * notStartedFilms.length)
			const randomFilm = notStartedFilms[randomIndex]
			setHighlightedFilmId(randomFilm.kinopoiskId)
		} else {
			setHighlightedFilmId(null) // Or show a message that no films are left
		}
	}, [films])

	const exportData = useCallback(() => {
		const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
			JSON.stringify(films, null, 2)
		)}`
		const link = document.createElement('a')
		link.href = jsonString
		link.download = 'films-data.json'
		link.click()
		setIsModalOpen(true)
	}, [films])

	const closeModal = () => {
		setIsModalOpen(false)
	}

	return {
		highlightedFilmId,
		isModalOpen,
		selectNextFilm,
		handleMarkAllAsViewed: markAllAsViewed,
		handleResetAllStatuses: resetAllStatuses,
		exportData,
		closeModal,
	}
}
