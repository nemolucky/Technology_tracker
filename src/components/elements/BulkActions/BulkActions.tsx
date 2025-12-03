import { type TStatus } from '@/types/film.interface'
import React from 'react'
import styles from './BulkActions.module.css'

type Props = {
	selectedCount: number
	onUpdateStatus: (status: TStatus) => void
	onClearSelection: () => void
}

const BulkActions: React.FC<Props> = ({
	selectedCount,
	onUpdateStatus,
	onClearSelection,
}) => {
	return (
		<div className={styles.bulkActions}>
			<div className={styles.selectionInfo}>
				Выбрано: <strong>{selectedCount}</strong>
			</div>
			<div className={styles.actions}>
				<span>Изменить статус на:</span>
				<button
					onClick={() => onUpdateStatus('not-started')}
					className={styles.button}
				>
					Не просмотрено
				</button>
				<button
					onClick={() => onUpdateStatus('in-progress')}
					className={styles.button}
				>
					В процессе
				</button>
				<button
					onClick={() => onUpdateStatus('viewed')}
					className={styles.button}
				>
					Просмотрено
				</button>
			</div>
			<button onClick={onClearSelection} className={styles.clearButton}>
				Снять выделение
			</button>
		</div>
	)
}

export default BulkActions
