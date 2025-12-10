import { type Film } from '@/types/film.interface'
import { useEffect } from 'react'
import { useFilms } from '../../../hooks/useFilm'
import FilmCard from '../FilmCard/FilmCard'
import { Box, Typography, CircularProgress } from '@mui/material'

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

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		)
	}

	if (error) {
		return (
			<Typography color='error' sx={{ mt: 4 }}>
				Error: {error}
			</Typography>
		)
	}

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
		return (
			<Typography sx={{ mt: 4 }}>
				Фильмы не найдены
			</Typography>
		)
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
		</Box>
	)
}

export default FilmsList
