import { type Film } from '@/types/film.interface'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

type Props = {
	film: Film
	onSave: (filmId: number, updatedData: Partial<Film>) => void
	onCancel: () => void
}

const EditFilmForm: React.FC<Props> = ({ film, onSave, onCancel }) => {
	const [formData, setFormData] = useState({
		nameRu: film.nameRu,
		description: film.description || '',
		deadline: film.deadline || '', // Assuming deadline is a string in 'YYYY-MM-DD' format
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const validate = () => {
		const newErrors: { [key: string]: string } = {}
		if (!formData.nameRu.trim()) {
			newErrors.nameRu = 'Название фильма обязательно'
		}
		if (formData.deadline) {
			const deadlineDate = new Date(formData.deadline)
			const today = new Date()
			today.setHours(0, 0, 0, 0) // Reset time to compare dates only
			if (deadlineDate < today) {
				newErrors.deadline = 'Дедлайн не может быть в прошлом'
			}
		}
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	useEffect(() => {
		validate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formData])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (validate()) {
			onSave(film.kinopoiskId, {
				...formData,
				deadline: formData.deadline || null,
			})
		}
	}

	return (
		<Box component='form' onSubmit={handleSubmit} sx={{ p: 2 }}>
			<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
				Редактировать фильм
			</Typography>
			<TextField
				fullWidth
				margin='normal'
				id='nameRu'
				name='nameRu'
				label='Название'
				value={formData.nameRu}
				onChange={handleChange}
				error={!!errors.nameRu}
				helperText={errors.nameRu}
				required
			/>
			<TextField
				fullWidth
				margin='normal'
				id='description'
				name='description'
				label='Описание'
				multiline
				rows={4}
				value={formData.description}
				onChange={handleChange}
			/>
			<TextField
				fullWidth
				margin='normal'
				id='deadline'
				name='deadline'
				label='Дедлайн просмотра'
				type='date'
				value={formData.deadline}
				onChange={handleChange}
				error={!!errors.deadline}
				helperText={errors.deadline}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
				<Button onClick={onCancel}>Отмена</Button>
				<Button
					type='submit'
					variant='contained'
					disabled={Object.keys(errors).length > 0}
				>
					Сохранить
				</Button>
			</Box>
		</Box>
	)
}

export default EditFilmForm
