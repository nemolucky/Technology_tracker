import {
	Paper,
	Typography,
	Button,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material'

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

	const handleToggleButtonChange = (
		newFilters: string[]
	) => {
		// This is a workaround to make ToggleButtonGroup work with our single-selection-at-a-time logic
		const latestFilter = newFilters.find(f => !selectedFilters.includes(f))
		if (latestFilter) {
			handleFilterChange(latestFilter)
		} else {
			// When deselecting
			const removedFilter = selectedFilters.find(f => !newFilters.includes(f))
			if (removedFilter) {
				handleFilterChange(removedFilter)
			}
		}
	}

	return (
		<Paper elevation={2} sx={{ p: 2 }}>
			<Typography variant='h6' component='h2' sx={{ mb: 2 }}>
				Фильтры
			</Typography>
			<ToggleButtonGroup
				orientation='vertical'
				value={selectedFilters}
				onChange={(_e, newFilters) => handleToggleButtonChange(newFilters)}
				fullWidth
			>
				{filters.map(filter => (
					<ToggleButton
						key={filter.value}
						value={filter.value}
						aria-label={filter.label}
					>
						{filter.label}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
			<Button
				fullWidth
				variant='outlined'
				onClick={handleResetFilters}
				sx={{ mt: 2 }}
			>
				Сбросить все
			</Button>
		</Paper>
	)
}

export default Filters
