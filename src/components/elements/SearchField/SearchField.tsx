import { Paper, TextField } from '@mui/material'
import { useState, type ChangeEvent, type FC } from 'react'

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
		<Paper elevation={2} sx={{ p: 2 }}>
			<TextField
				fullWidth
				type='text'
				value={query}
				onChange={handleChange}
				placeholder='Поиск по названию или описанию...'
				variant='outlined'
				label='Поиск'
			/>
		</Paper>
	)
}

export default SearchField
