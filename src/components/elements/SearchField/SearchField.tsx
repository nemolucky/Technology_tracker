import React, { useState, type FC, ChangeEvent } from 'react'
import styles from './SearchField.module.css'

type Props = {
	onSearch: (query: string) => void
}

const SearchField: FC<Props> = ({ onSearch }) => {
	const [query, setQuery] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value
		setQuery(newQuery)
		onSearch(newQuery)
	}

	return (
		<div className={styles.search}>
			<input
				type='text'
				value={query}
				onChange={handleChange}
				placeholder='Поиск по названию или описанию...'
				className={styles.input}
			/>
		</div>
	)
}

export default SearchField
