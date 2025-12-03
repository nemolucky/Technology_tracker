import { type Film } from '@/types/film.interface'
import { useEffect, useState } from 'react'
import styles from './EditFilmForm.module.css'

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
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2>Редактировать фильм</h2>
			<div className={styles.formGroup}>
				<label htmlFor='nameRu'>Название</label>
				<input
					id='nameRu'
					name='nameRu'
					type='text'
					value={formData.nameRu}
					onChange={handleChange}
					aria-required='true'
					aria-invalid={!!errors.nameRu}
					aria-describedby={errors.nameRu ? 'nameRu-error' : undefined}
				/>
				{errors.nameRu && (
					<span id='nameRu-error' className={styles.error} role='alert'>
						{errors.nameRu}
					</span>
				)}
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='description'>Описание</label>
				<textarea
					id='description'
					name='description'
					value={formData.description}
					onChange={handleChange}
					rows={5}
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='deadline'>Дедлайн просмотра</label>
				<input
					id='deadline'
					name='deadline'
					type='date'
					value={formData.deadline}
					onChange={handleChange}
					aria-invalid={!!errors.deadline}
					aria-describedby={errors.deadline ? 'deadline-error' : undefined}
				/>
				{errors.deadline && (
					<span id='deadline-error' className={styles.error} role='alert'>
						{errors.deadline}
					</span>
				)}
			</div>
			<div className={styles.buttonGroup}>
				<button type='submit' disabled={Object.keys(errors).length > 0}>
					Сохранить
				</button>
				<button type='button' onClick={onCancel}>
					Отмена
				</button>
			</div>
		</form>
	)
}

export default EditFilmForm
