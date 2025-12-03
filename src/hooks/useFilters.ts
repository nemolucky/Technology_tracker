import { useState } from 'react'

export const useFilters = () => {
	const defaultFilters: string[] = ['not-started', 'in-progress', 'viewed']

	const [selectedFilters, setSelectedFilters] =
		useState<string[]>(defaultFilters)

	const handleFilterChange = (filterValue: string) => {
		const newFilters = selectedFilters.includes(filterValue)
			? selectedFilters.filter(f => f !== filterValue)
			: [...selectedFilters, filterValue]

		onFilterChange(newFilters)
	}

	const handleResetFilters = () => {
		onFilterChange(defaultFilters)
	}

	const onFilterChange = (filters: string[]) => {
		setSelectedFilters(filters)
	}

	return {
		selectedFilters,
		handleFilterChange,
		handleResetFilters,
	}
}
