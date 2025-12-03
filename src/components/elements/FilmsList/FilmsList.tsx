import { type Film } from '@/types/film.interface'
import { useEffect } from 'react'
import { useFilms } from '../../../hooks/useFilm'
import FilmCard from '../FilmCard/FilmCard'
import styles from './FilmsList.module.css'

type Props = {
	selectedFilters: string[]
	highlightedFilmId: number | null
	searchQuery: string
	selectedFilmIds: number[]
	onSelectFilm: (filmId: number, isSelected: boolean) => void
	onEdit: (film: Film) => void
}

const FilmsList: React.FC<Props> = ({
	selectedFilters,
	highlightedFilmId,
	searchQuery,
	selectedFilmIds,
	onSelectFilm,
	onEdit,
}) => {
	const { films, loading, error, updateFilm } = useFilms()

	useEffect(() => {
		if (highlightedFilmId) {
			const element = document.getElementById(`film-card-${highlightedFilmId}`)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		}
	}, [highlightedFilmId])

	if (loading) return <div className={styles.loading}>Loading films...</div>
	if (error) return <div className={styles.error}>Error: {error}</div>

	const noPoster: string =
		'https://kinopoiskapiunofficial.tech/images/posters/kp/no-poster.png'

	const filteredFilms = films
		.filter(
			film => film.nameRu && film.posterUrl && film.posterUrl !== noPoster
		)
		.filter(film => selectedFilters.includes(film.status))
		.filter(film => {
			const query = searchQuery.toLowerCase()
			return (
				film.nameRu.toLowerCase().includes(query) ||
				(film.description && film.description.toLowerCase().includes(query))
			)
		})

	if (!filteredFilms.length) {
		return <div className={styles.empty}>Фильмы не найдены</div>
	}

	return (
		<div className={styles.films}>
			{filteredFilms.map(film => (
				<FilmCard
					key={film.kinopoiskId}
					film={film}
					updateFilm={updateFilm}
					isHighlighted={film.kinopoiskId === highlightedFilmId}
					isSelected={selectedFilmIds.includes(film.kinopoiskId)}
					onSelectFilm={onSelectFilm}
					onEdit={onEdit}
				/>
			))}
		</div>
	)
}

export default FilmsList
