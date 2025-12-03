import styles from './Filters.module.css'

type Props = {
	selectedFilters: string[]
	handleFilterChange: (filterValue: string) => void
	handleResetFilters: () => void
}

const Filters = ({
	selectedFilters,
	handleFilterChange,
	handleResetFilters,
}: Props) => {
	const filters = [
		{ value: 'not-started', label: 'Не просмотрено' },
		{ value: 'in-progress', label: 'В процессе' },
		{ value: 'viewed', label: 'Просмотрено' },
	]

	return (
		<div className={styles.filters}>
			<h2 className={styles.title}>Фильтры</h2>
			<div className={styles.items}>
				{filters.map(filter => (
					<button
						key={filter.value}
						className={`${styles.button} ${
							selectedFilters.includes(filter.value) ? styles.active : ''
						} ${styles[filter.value.replace('-', '').replace('-', '')] || ''}`}
						onClick={() => handleFilterChange(filter.value)}
						type='button'
					>
						{filter.label}
					</button>
				))}
				<button
					className={`${styles.button} ${styles.reset}`}
					onClick={handleResetFilters}
					type='button'
				>
					Сбросить все
				</button>
			</div>
		</div>
	)
}

export default Filters
