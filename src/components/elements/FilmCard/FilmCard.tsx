import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Checkbox,
	Chip,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState, type FC } from 'react'
import {
	type Film,
	type TStatus,
	type Genre,
} from '../../../types/film.interface'
import { fetchFilmById } from '../../../service/filmService'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

type Props = {
	film: Film
	updateFilm: (filmId: number, updatedProperties: Partial<Film>) => void
	isHighlighted?: boolean
	isSelected: boolean
	onSelectFilm: (filmId: number, isSelected: boolean) => void
	onEdit: (film: Film) => void
}

const getStatusColor = (
	status: TStatus
): 'success' | 'warning' | 'default' => {
	switch (status) {
		case 'viewed':
			return 'success'
		case 'in-progress':
			return 'warning'
		default:
			return 'default'
	}
}

const getStatusText = (status: TStatus): string => {
	switch (status) {
		case 'viewed':
			return 'Просмотрено'
		case 'in-progress':
			return 'В процессе'
		default:
			return 'Не просмотрено'
	}
}

const FilmCard: FC<Props> = ({
	film,
	updateFilm,
	isHighlighted = false,
	isSelected,
	onSelectFilm,
	onEdit,
}) => {
	const [notes, setNotes] = useState(film.notes || '')
	const [details, setDetails] = useState<{
		slogan?: string
		filmLength?: number
		genres?: Genre[]
	} | null>(null)
	const [isLoadingDetails, setIsLoadingDetails] = useState(false)

	const statuses: TStatus[] = ['not-started', 'in-progress', 'viewed']

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		updateFilm(film.kinopoiskId, { isFavorite: !film.isFavorite })
	}

	const handleCardClick = () => {
		const currentIndex = statuses.indexOf(film.status)
		const nextIndex = (currentIndex + 1) % statuses.length
		const nextStatus = statuses[nextIndex]
		updateFilm(film.kinopoiskId, { status: nextStatus })
	}

	const handleSaveNotes = (e: React.MouseEvent) => {
		e.stopPropagation()
		updateFilm(film.kinopoiskId, { notes })
	}

	const handleLoadDetails = async (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsLoadingDetails(true)
		try {
			const detailedFilm = await fetchFilmById(film.kinopoiskId)
			setDetails({
				slogan: detailedFilm.slogan,
				filmLength: detailedFilm.filmLength,
				genres: detailedFilm.genres,
			})
		} catch (error) {
			console.error('Failed to load film details:', error)
		} finally {
			setIsLoadingDetails(false)
		}
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation()
		onSelectFilm(film.kinopoiskId, e.target.checked)
	}

	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onEdit(film)
	}

	const cardBorderColor =
		getStatusColor(film.status) === 'success'
			? 'green'
			: getStatusColor(film.status) === 'warning'
			? 'orange'
			: '#ccc'

	return (
		<Card
			id={`film-card-${film.kinopoiskId}`}
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				mb: 2,
				border: `2px solid ${cardBorderColor}`,
				boxShadow: isHighlighted ? 3 : 1,
				transform: isHighlighted ? 'scale(1.02)' : 'none',
				transition: 'all 0.2s ease-in-out',
				outline: isSelected ? '2px solid blue' : 'none',
			}}
			onClick={handleCardClick}
		>
			<Box sx={{ position: 'relative', width: { xs: '100%', md: 250 } }}>
				<CardMedia
					component='img'
					sx={{ height: '100%', objectFit: 'cover' }}
					image={film.posterUrl}
					alt={film.nameRu}
				/>
				<Box sx={{ position: 'absolute', top: 8, left: 8 }}>
					<Checkbox
						checked={isSelected}
						onChange={handleCheckboxChange}
						onClick={e => e.stopPropagation()}
						aria-label={`Выбрать фильм ${film.nameRu}`}
						sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
					/>
				</Box>
				<Box sx={{ position: 'absolute', top: 8, right: 8 }}>
					<IconButton
						onClick={handleFavoriteClick}
						aria-label={
							film.isFavorite ? 'Remove from favorites' : 'Add to favorites'
						}
						sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
					>
						{film.isFavorite ? <Favorite color='error' /> : <FavoriteBorder />}
					</IconButton>
				</Box>
			</Box>
			<CardContent sx={{ flex: 1, p: 2 }}>
				<Typography variant='h5' component='h2' gutterBottom>
					{film.nameRu}
				</Typography>
				<Typography variant='body2' color='text.secondary' gutterBottom>
					Страна: {film.countries.map(c => c).join(', ')}
				</Typography>
				<Typography variant='body2' color='text.secondary' gutterBottom>
					Рейтинг: {film.ratingKinopoisk}
				</Typography>
				{film.deadline && (
					<Chip
						label={`Дедлайн: ${new Date(film.deadline).toLocaleDateString()}`}
						color='error'
						size='small'
						sx={{ mb: 1 }}
					/>
				)}
				<Chip
					label={getStatusText(film.status)}
					color={getStatusColor(film.status)}
					size='small'
					sx={{ mb: 1 }}
				/>
				<Typography variant='body2' sx={{ mt: 1, mb: 2 }}>
					{film.description}
				</Typography>
				{details && (
					<Box sx={{ my: 2 }}>
						{details.slogan && (
							<Typography variant='caption' display='block' gutterBottom>
								Слоган: {details.slogan}
							</Typography>
						)}
						{details.filmLength && (
							<Typography variant='caption' display='block' gutterBottom>
								Продолжительность: {details.filmLength} мин.
							</Typography>
						)}
						{details.genres && (
							<Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
								{details.genres.map(g => (
									<Chip key={g.genre} label={g.genre} size='small' />
								))}
							</Box>
						)}
					</Box>
				)}
				{isLoadingDetails && (
					<Typography sx={{ my: 2 }}>Загрузка...</Typography>
				)}
				{!details && !isLoadingDetails && (
					<Button onClick={handleLoadDetails} size='small' sx={{ my: 1 }}>
						Загрузить больше информации
					</Button>
				)}
				<Box sx={{ mt: 'auto' }}>
					<TextField
						label='Мои заметки'
						multiline
						rows={2}
						fullWidth
						value={notes}
						onChange={e => setNotes(e.target.value)}
						onClick={e => e.stopPropagation()}
						variant='outlined'
						size='small'
						sx={{ my: 2 }}
					/>
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						<Button
							onClick={handleSaveNotes}
							size='small'
							variant='contained'
						>
							Сохранить заметки
						</Button>
						<Button onClick={handleEditClick} size='small' variant='outlined'>
							Редактировать
						</Button>
					</CardActions>
				</Box>
			</CardContent>
		</Card>
	)
}

export default FilmCard
