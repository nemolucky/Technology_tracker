import { useCallback, useEffect, useState } from 'react'
import { fetchFilms } from '../service/filmService'
import { type Film, type TStatus } from '../types/film.interface'
import { useLocalStorage } from './useLocalStorage'

export const useFilms = (page: number = 1) => {
	const { value: films, setValue: setFilms } = useLocalStorage<Film[]>(
		'films',
		[]
	)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadFilms = async () => {
			try {
				setLoading(true)
				setError(null)
				if (films?.length === 0) {
					const response = await fetchFilms()
					setFilms(response)
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error occurred')
				console.error('Error fetching films:', err)
			} finally {
				setLoading(false)
			}
		}

		loadFilms()
	}, [page, films?.length, setFilms])

	const updateFilm = useCallback(
		(filmId: number, updatedProperties: Partial<Film>) => {
			const updatedFilms = films.map(film => {
				if (film.kinopoiskId === filmId) {
					return { ...film, ...updatedProperties }
				}
				return film
			})
			setFilms(updatedFilms)
		},
		[films, setFilms]
	)

	const addFilms = useCallback(
		(filmsToAdd: Film[]) => {
			const existingIds = new Set(films.map(f => f.kinopoiskId))
			const newFilms = filmsToAdd.filter(f => !existingIds.has(f.kinopoiskId))
			setFilms([...films, ...newFilms])
		},
		[films, setFilms]
	)

	const markAllAsViewed = useCallback(() => {
		const updatedFilms: Film[] = films.map(film => ({
			...film,
			status: 'viewed',
		}))
		setFilms(updatedFilms)
	}, [films, setFilms])

	const resetAllStatuses = useCallback(() => {
		const updatedFilms: Film[] = films.map(film => ({
			...film,
			status: 'not-started',
		}))
		setFilms(updatedFilms)
	}, [films, setFilms])

	const updateMultipleFilmStatuses = useCallback(
		(filmIds: number[], status: TStatus) => {
			const updatedFilms = films.map(film => {
				if (filmIds.includes(film.kinopoiskId)) {
					return { ...film, status }
				}
				return film
			})
			setFilms(updatedFilms)
		},
		[films, setFilms]
	)

	return {
		films,
		loading,
		error,
		updateFilm,
		addFilms,
		markAllAsViewed,
		resetAllStatuses,
		updateMultipleFilmStatuses,
		isEmpty: films?.length === 0 && !loading,
	}
}
