import { useNotification } from '@/context/NotificationContext'
import { type Film } from '@/types/film.interface'
import { useState } from 'react'
import { useFilms } from '../../../hooks/useFilm'
import {
	Paper,
	Typography,
	Button,
	Box,
	CircularProgress,
} from '@mui/material'

const ImportFilms: React.FC = () => {
	const { addFilms } = useFilms()
	const { showNotification } = useNotification()
	const [isImporting, setIsImporting] = useState(false)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setIsImporting(true)

		const reader = new FileReader()
		reader.onload = async e => {
			try {
				const content = e.target?.result
				if (typeof content !== 'string') {
					throw new Error('Не удалось прочитать содержимое файла.')
				}
				const filmsToImport: Film[] = JSON.parse(content)

				// Basic validation
				if (
					!Array.isArray(filmsToImport) ||
					!filmsToImport.every(film => film.kinopoiskId && film.nameRu)
				) {
					throw new Error(
						'Неверный формат JSON или отсутствуют необходимые свойства фильма.'
					)
				}

				await addFilms(filmsToImport)
				showNotification(
					`Успешно импортировано ${filmsToImport.length} фильмов!`,
					'success'
				)
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Произошла неизвестная ошибка.'
				showNotification(`Ошибка импорта: ${errorMessage}`, 'error')
			} finally {
				setIsImporting(false)
				// Clear the file input value to allow re-uploading the same file
				event.target.value = ''
			}
		}

		reader.onerror = () => {
			showNotification('Не удалось прочитать файл.', 'error')
			setIsImporting(false)
		}

		reader.readAsText(file)
	}

	return (
		<Paper elevation={2} sx={{ p: 2 }}>
			<Typography variant='h6' component='h3' sx={{ mb: 1 }}>
				Импорт фильмов из JSON
			</Typography>
			<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
				Выберите JSON-файл со списком фильмов для добавления.
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Button
					variant='contained'
					component='label'
					disabled={isImporting}
				>
					Выбрать файл
					<input
						type='file'
						hidden
						accept='.json'
						onChange={handleFileChange}
					/>
				</Button>
				{isImporting && <CircularProgress size={24} />}
			</Box>
		</Paper>
	)
}

export default ImportFilms
