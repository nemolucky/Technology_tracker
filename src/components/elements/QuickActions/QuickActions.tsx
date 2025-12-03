import { type FC } from 'react'
import styles from './QuickActions.module.css'

type Props = {
	onSelectNext: () => void
	onMarkAllViewed: () => void
	onResetAll: () => void
	onExport: () => void
}

const QuickActions: FC<Props> = ({
	onSelectNext,
	onMarkAllViewed,
	onResetAll,
	onExport,
}) => {
	return (
		<div className={styles.quickActions}>
			<h2 className={styles.title}>Быстрые действия</h2>
			<div className={styles.buttons}>
				<button onClick={onSelectNext}>Выбрать следующий фильм</button>
				<button onClick={onMarkAllViewed}>
					Отметить все как просмотренные
				</button>
				<button onClick={onResetAll}>Сбросить все статусы</button>
				<button onClick={onExport}>Экспорт данных</button>
			</div>
		</div>
	)
}

export default QuickActions
