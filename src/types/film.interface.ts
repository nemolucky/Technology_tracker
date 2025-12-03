export type TStatus = 'not-started' | 'in-progress' | 'viewed'

export interface Genre {
	genre: string
}
export interface Film {
	kinopoiskId: number
	nameRu: string
	posterUrl: string
	ratingKinopoisk: number
	description: string | null
	countries: string[]
	year: number | null
	status: TStatus
	isFavorite: boolean
	notes: string
	slogan?: string
	filmLength?: number
	genres?: Genre[]
	deadline?: string | null
}
