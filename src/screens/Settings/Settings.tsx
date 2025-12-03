import { useFilms } from '@/hooks/useFilm'
import ImportFilms from '@components/elements/ImportFilms/ImportFilms'
import styles from './Settings.module.css'

const Settings = () => {
	const { resetAllStatuses } = useFilms()

	const handleClearLocalStorage = () => {
		if (
			window.confirm(
				'Вы уверены, что хотите полностью очистить локальное хранилище? Это удалит все данные приложения.'
			)
		) {
			localStorage.clear()
			alert('Локальное хранилище очищено! Приложение будет перезагружено.')
			window.location.reload()
		}
	}

	const handleResetFilmStatuses = () => {
		if (
			window.confirm('Вы уверены, что хотите сбросить статусы всех фильмов?')
		) {
			resetAllStatuses()
			alert('Статусы всех фильмов сброшены!')
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
		alert('Содержимое локального хранилища выведено в консоль разработчика.')
	}

	return (
		<div className={styles.settingsPage}>
			<section className={styles.section}>
				<ImportFilms />
			</section>

			<section className={styles.section}>
				<h2>Управление данными</h2>
				<p>
					Здесь вы можете управлять данными вашего приложения. Будьте осторожны,
					некоторые действия необратимы.
				</p>
				<div className={styles.buttonGroup}>
					<button
						onClick={handleResetFilmStatuses}
						className={`${styles.button} ${styles.primaryButton}`}
					>
						Сбросить статусы фильмов
					</button>
					<button
						onClick={handleClearLocalStorage}
						className={`${styles.button} ${styles.dangerButton}`}
					>
						Очистить все данные
					</button>
					<button
						onClick={handlePrintLocalStorage}
						className={`${styles.button} ${styles.secondaryButton}`}
					>
						Показать данные в консоли
					</button>
				</div>
			</section>
		</div>
	)
}

export default Settings
