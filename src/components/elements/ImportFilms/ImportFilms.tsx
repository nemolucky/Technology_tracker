import { type Film } from '@/types/film.interface'
import React, { useState } from 'react'
import { useFilms } from '../../../hooks/useFilm'
import styles from './ImportFilms.module.css'

const ImportFilms: React.FC = () => {
	const { addFilms } = useFilms()
	const [isImporting, setIsImporting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setIsImporting(true)
		setError(null)

		const reader = new FileReader()
		reader.onload = async e => {
			try {
				const content = e.target?.result
				if (typeof content !== 'string') {
					throw new Error('Failed to read file content.')
				}
				const filmsToImport: Film[] = JSON.parse(content)

				// Basic validation
				if (
					!Array.isArray(filmsToImport) ||
					!filmsToImport.every(film => film.kinopoiskId && film.nameRu)
				) {
					throw new Error(
						'Invalid JSON format or missing required film properties.'
					)
				}

				await addFilms(filmsToImport)
				alert(`Successfully imported ${filmsToImport.length} films!`)
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'An unknown error occurred.'
				setError(`Import failed: ${errorMessage}`)
				alert(`Import failed: ${errorMessage}`)
			} finally {
				setIsImporting(false)
			}
		}

		reader.onerror = () => {
			setError('Failed to read file.')
			setIsImporting(false)
		}

		reader.readAsText(file)
	}

	return (
		<div className={styles.importContainer}>
			<h3>Импорт фильмов из JSON</h3>
			<p>Выберите JSON-файл со списком фильмов для добавления.</p>
			<input
				type='file'
				accept='.json'
				onChange={handleFileChange}
				disabled={isImporting}
				className={styles.fileInput}
			/>
			{isImporting && <p className={styles.loading}>Импорт...</p>}
			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}

export default ImportFilms
