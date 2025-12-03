import React, { useEffect, useState, type FC } from 'react'
import {
	type Film,
	type TStatus,
	type Genre,
} from '../../../types/film.interface'
import styles from './FilmCard.module.css'
import { fetchFilmById } from '../../../service/filmService'

type Props = {
	film: Film
	updateFilm: (filmId: number, updatedProperties: Partial<Film>) => void
	isHighlighted?: boolean
	isSelected: boolean
	onSelectFilm: (filmId: number, isSelected: boolean) => void
	onEdit: (film: Film) => void
}

const FilmCard: FC<Props> = ({
	film,
	updateFilm,
	isHighlighted = false,
	isSelected,
	onSelectFilm,
	onEdit,
}) => {
	const [notes, setNotes] = useState(film.notes)
	const [isClicked, setIsClicked] = useState(false)
	const [details, setDetails] = useState<{
		slogan?: string
		filmLength?: number
		genres?: Genre[]
	} | null>(null)
	const [isLoadingDetails, setIsLoadingDetails] = useState(false)

	const statuses: TStatus[] = ['not-started', 'in-progress', 'viewed']
	const statusLabels: Record<TStatus, string> = {
		'not-started': 'Не просмотрено',
		'in-progress': 'В процессе',
		viewed: 'Просмотрено',
	}

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		updateFilm(film.kinopoiskId, { isFavorite: !film.isFavorite })
	}

	const handleCardClick = () => {
		const currentIndex = statuses.indexOf(film.status)
		const nextIndex = (currentIndex + 1) % statuses.length
		const nextStatus = statuses[nextIndex]
		updateFilm(film.kinopoiskId, { status: nextStatus })
		setIsClicked(true)
	}

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.stopPropagation()
		setNotes(e.target.value)
	}

	const handleSaveNotes = (e: React.MouseEvent) => {
		e.stopPropagation()
		updateFilm(film.kinopoiskId, { notes })
	}

	const handleNotesClick = (e: React.MouseEvent) => {
		e.stopPropagation()
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

	useEffect(() => {
		if (isClicked) {
			const timer = setTimeout(() => setIsClicked(false), 300) // Duration of the animation
			return () => clearTimeout(timer)
		}
	}, [isClicked])

	const cardClasses = `${styles.filmCard} ${
		styles[`status_${film.status.replace('-', '')}`]
	} ${isClicked ? styles.pulse : ''} ${
		isHighlighted ? styles.highlighted : ''
	} ${isSelected ? styles.selected : ''}`

	const statusTextClasses = `${styles.status} ${
		styles[`status_text_${film.status.replace('-', '')}`]
	}`

	return (
		<div
			id={`film-card-${film.kinopoiskId}`}
			className={cardClasses}
			onClick={handleCardClick}
		>
			<div
				className={styles.selectionCheckbox}
				onClick={e => e.stopPropagation()}
			>
				<input
					type='checkbox'
					checked={isSelected}
					onChange={handleCheckboxChange}
					aria-label={`Выбрать фильм ${film.nameRu}`}
				/>
			</div>
			<button
				className={`${styles.favoriteButton} ${
					film.isFavorite ? styles.favoriteActive : ''
				}`}
				onClick={handleFavoriteClick}
				aria-label={
					film.isFavorite ? 'Remove from favorites' : 'Add to favorites'
				}
			>
				{film.isFavorite ? '❤️' : '🤍'}
			</button>
			<div className={styles.poster}>
				<img
					src={film.posterUrl}
					alt={film.nameRu}
					className={styles.posterImage}
				/>
			</div>
			<div className={styles.info}>
				<div className={styles.title}>{film.nameRu}</div>
				<div className={styles.country}>
					Страна: {film.countries.map(c => c).join(', ')}
				</div>
				<div className={styles.rating}>Рейтинг: {film.ratingKinopoisk}</div>
				<div className={statusTextClasses}>{statusLabels[film.status]}</div>
				<div className={styles.description}>{film.description}</div>
				{details && (
					<div className={styles.details}>
						{details.slogan && (
							<div className={styles.slogan}>Слоган: {details.slogan}</div>
						)}
						{details.filmLength && (
							<div className={styles.filmLength}>
								Продолжительность: {details.filmLength} мин.
							</div>
						)}
						{details.genres && (
							<div className={styles.genres}>
								Жанры:{' '}
								{details.genres.map(g => g.genre).join(', ')}
							</div>
						)}
					</div>
				)}
				{isLoadingDetails && <div className={styles.loading}>Загрузка...</div>}
				{!details && !isLoadingDetails && (
					<button
						onClick={handleLoadDetails}
						className={styles.loadDetailsButton}
					>
						Загрузить больше информации
					</button>
				)}
				<div className={styles.notes} onClick={handleNotesClick}>
					<h3 className={styles.notesTitle}>Мои заметки</h3>
					<textarea
						value={notes}
						onChange={handleNotesChange}
						placeholder='Ваши заметки...'
						className={styles.notesTextarea}
					/>
					<div className={styles.cardButtons}>
						<button onClick={handleSaveNotes} className={styles.saveButton}>
							Сохранить заметки
						</button>
						<button onClick={handleEditClick} className={styles.editButton}>
							Редактировать
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilmCard
