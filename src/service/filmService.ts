import { type Film, type Genre } from '../types/film.interface'

interface ApiCountry {
	country: string
}

interface ApiFilm {
	kinopoiskId: number
	kinopoiskHDId?: string
	imdbId?: string
	nameRu?: string
	nameEn?: string
	nameOriginal?: string
	posterUrl: string
	posterUrlPreview: string
	coverUrl?: string
	logoUrl?: string
	reviewsCount: number
	ratingGoodReview?: number
	ratingGoodReviewVoteCount?: number
	ratingKinopoisk?: number
	ratingKinopoiskVoteCount?: number
	ratingImdb?: number
	ratingImdbVoteCount?: number
	ratingFilmCritics?: number
	ratingFilmCriticsVoteCount?: number
	ratingAwait?: number
	ratingAwaitCount?: number
	ratingRfCritics?: number
	ratingRfCriticsVoteCount?: number
	webUrl: string
	year?: number
	filmLength?: number
	slogan?: string
	description?: string
	shortDescription?: string
	editorAnnotation?: string
	isTicketsAvailable: boolean
	productionStatus?: string
	type: string
	ratingMpaa?: string
	ratingAgeLimits?: string
	hasImax?: boolean
	has3D?: boolean
	lastSync: string
	countries: ApiCountry[]
	genres?: Genre[]
	startYear?: number
	endYear?: number
	serial?: boolean
	shortFilm?: boolean
	completed?: boolean
}

interface FilmsResponse {
	total: number
	totalPages: number
	items: ApiFilm[]
	page?: number
}

export const fetchFilms = async (): Promise<Film[]> => {
	const response = await fetch(import.meta.env.VITE_API_URL + '/films', {
		method: 'GET',
		headers: {
			'X-API-KEY': import.meta.env.VITE_API_KEY,
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const data: FilmsResponse = await response.json()

	const filmsWithStatus = data.items.map(apiFilm => ({
		kinopoiskId: apiFilm.kinopoiskId,
		nameRu: apiFilm.nameRu || '',
		posterUrl: apiFilm.posterUrl,
		ratingKinopoisk: apiFilm.ratingKinopoisk || 0,
		description: apiFilm.description || null,
		countries: apiFilm.countries.map(c => c.country),
		year: apiFilm.year || null,
		status: 'not-started' as const,
		isFavorite: false,
		notes: '',
		slogan: apiFilm.slogan,
		filmLength: apiFilm.filmLength,
		genres: apiFilm.genres,
	}))

	return filmsWithStatus
}

export const fetchFilmById = async (id: number): Promise<Film> => {
	const response = await fetch(import.meta.env.VITE_API_URL + `/films/${id}`, {
		method: 'GET',
		headers: {
			'X-API-KEY': import.meta.env.VITE_API_KEY,
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const apiFilm: ApiFilm = await response.json()

	const film: Film = {
		kinopoiskId: apiFilm.kinopoiskId,
		nameRu: apiFilm.nameRu || '',
		posterUrl: apiFilm.posterUrl,
		ratingKinopoisk: apiFilm.ratingKinopoisk || 0,
		description: apiFilm.description || null,
		countries: apiFilm.countries.map(c => c.country),
		year: apiFilm.year || null,
		status: 'not-started' as const, // Default status
		isFavorite: false, // Default value
		notes: '', // Default value
		slogan: apiFilm.slogan,
		filmLength: apiFilm.filmLength,
		genres: apiFilm.genres,
	}

	return film
}
