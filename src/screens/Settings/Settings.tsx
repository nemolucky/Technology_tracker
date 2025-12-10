import { useFilms } from '@/hooks/useFilm'
import ExportFilms from '@/components/elements/ExportFilms/ExportFilms'
import ImportFilms from '@components/elements/ImportFilms/ImportFilms'
import { useNotification } from '@/context/NotificationContext'
import {
	Container,
	Paper,
	Typography,
	Button,
	Box,
	Divider,
} from '@mui/material'

const Settings = () => {
	const { resetAllStatuses } = useFilms()
	const { showNotification } = useNotification()

	const handleClearLocalStorage = () => {
		if (
			window.confirm(
				'Вы уверены, что хотите полностью очистить локальное хранилище? Это удалит все данные приложения.'
			)
		) {
			localStorage.clear()
			showNotification(
				'Локальное хранилище очищено! Приложение будет перезагружено.',
				'success'
			)
			setTimeout(() => window.location.reload(), 2000)
		}
	}

	const handleResetFilmStatuses = () => {
		if (
			window.confirm('Вы уверены, что хотите сбросить статусы всех фильмов?')
		) {
			resetAllStatuses()
			showNotification('Статусы всех фильмов сброшены!', 'success')
		}
	}

	const handlePrintLocalStorage = () => {
		console.log('--- Local Storage Contents ---')
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			if (key) {
				const value = localStorage.getItem(key)
				console.log(`${key}:`, value)
			}
		}
		console.log('------------------------------')
		showNotification(
			'Содержимое локального хранилища выведено в консоль разработчика.',
			'info'
		)
	}

	return (
		<Container maxWidth='md' sx={{ mt: 12, mb: 4 }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Paper elevation={2} sx={{ p: 3 }}>
					<ImportFilms />
					<Divider sx={{ my: 3 }} />
					<ExportFilms />
				</Paper>
				<Paper elevation={2} sx={{ p: 3 }}>
					<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
						Управление данными
					</Typography>
					<Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
						Здесь вы можете управлять данными вашего приложения. Будьте
						осторожны, некоторые действия необратимы.
					</Typography>
					<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
						<Button
							variant='contained'
							onClick={handleResetFilmStatuses}
						>
							Сбросить статусы фильмов
						</Button>
						<Button
							variant='outlined'
							color='secondary'
							onClick={handlePrintLocalStorage}
						>
							Показать данные в консоли
						</Button>
						<Button
							variant='contained'
							color='error'
							onClick={handleClearLocalStorage}
						>
							Очистить все данные
						</Button>
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}

export default Settings
