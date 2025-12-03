import { useFilms } from '@/hooks/useFilm'
import styles from './Statistics.module.css'

const Statistics = () => {
	const { films } = useFilms()

	const totalFilms = films.length
	const completedFilms = films.filter(film => film.status === 'viewed').length
	const inProgressFilms = films.filter(
		film => film.status === 'in-progress'
	).length
	const notStartedFilms = films.filter(
		film => film.status === 'not-started'
	).length

	const completionPercentage =
		totalFilms > 0 ? (completedFilms / totalFilms) * 100 : 0

	return (
		<div className={styles.statisticsPage}>
			<section className={styles.section}>
				<h2>Обзор прогресса</h2>
				<div className={styles.statsGrid}>
					<div className={styles.statCard}>
						<h3>Всего фильмов</h3>
						<p>{totalFilms}</p>
					</div>
					<div className={styles.statCard}>
						<h3>Просмотрено</h3>
						<p>{completedFilms}</p>
					</div>
					<div className={styles.statCard}>
						<h3>В процессе</h3>
						<p>{inProgressFilms}</p>
					</div>
					<div className={styles.statCard}>
						<h3>Не просмотрено</h3>
						<p>{notStartedFilms}</p>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<h2>Прогресс просмотра</h2>
				<p>Общий процент завершения просмотра фильмов:</p>
				<div className={styles.progressBarContainer}>
					<div
						className={styles.progressBarFill}
						style={{ width: `${completionPercentage.toFixed(2)}%` }}
					>
						<div className={styles.progressBarText}>
							{completionPercentage.toFixed(2)}%
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Statistics
