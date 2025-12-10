import { useNotification } from '@/context/NotificationContext'
import { useFilms } from '@/hooks/useFilm'
import styles from './ExportFilms.module.css'

const ExportFilms: React.FC = () => {
	const { films } = useFilms()
	const { showNotification } = useNotification()

	const exportToJSON = () => {
		if (films.length === 0) {
			showNotification('Нет данных для экспорта.', 'warning')
			return
		}

		try {
			const dataStr = JSON.stringify(films, null, 2)
			const dataBlob = new Blob([dataStr], { type: 'application/json' })
			const url = URL.createObjectURL(dataBlob)
			const link = document.createElement('a')
			link.href = url
			link.download = `films_${new Date().toISOString().split('T')[0]}.json`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			URL.revokeObjectURL(url)
			showNotification('Данные успешно экспортированы.', 'success')
		} catch (error) {
			showNotification('Ошибка при экспорте данных.', 'error')
			console.error('Export error:', error)
		}
	}

	return (
		<div className={styles.exportContainer}>
			<h3>Экспорт фильмов в JSON</h3>
			<p>Нажмите кнопку для скачивания .json файла со списком фильмов.</p>
			<button
				onClick={exportToJSON}
				className={styles.exportButton}
				disabled={films.length === 0}
			>
				Экспортировать
			</button>
		</div>
	)
}

export default ExportFilms
