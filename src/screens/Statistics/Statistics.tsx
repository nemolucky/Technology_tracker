import { useFilms } from '@/hooks/useFilm'
import {
	Container,
	Paper,
	Typography,
	Card,
	CardContent,
	LinearProgress,
	Box,
} from '@mui/material'

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

	const StatCard = ({ title, value }: { title: string; value: number }) => (
		<Card>
			<CardContent>
				<Typography color='text.secondary' gutterBottom>
					{title}
				</Typography>
				<Typography variant='h4' component='div'>
					{value}
				</Typography>
			</CardContent>
		</Card>
	)

	return (
		<Container maxWidth='lg' sx={{ mt: 12, mb: 4 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				Статистика
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				<Paper elevation={2} sx={{ p: 3 }}>
					<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
						Обзор прогресса
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 3,
						}}
					>
						<Box sx={{ flex: '1 1 200px' }}>
							<StatCard title='Всего фильмов' value={totalFilms} />
						</Box>
						<Box sx={{ flex: '1 1 200px' }}>
							<StatCard title='Просмотрено' value={completedFilms} />
						</Box>
						<Box sx={{ flex: '1 1 200px' }}>
							<StatCard title='В процессе' value={inProgressFilms} />
						</Box>
						<Box sx={{ flex: '1 1 200px' }}>
							<StatCard title='Не просмотрено' value={notStartedFilms} />
						</Box>
					</Box>
				</Paper>

				<Paper elevation={2} sx={{ p: 3 }}>
					<Typography variant='h5' component='h2' sx={{ mb: 2 }}>
						Прогресс просмотра
					</Typography>
					<Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
						Общий процент завершения просмотра фильмов:
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box sx={{ width: '100%', mr: 1 }}>
							<LinearProgress
								variant='determinate'
								value={completionPercentage}
								sx={{ height: 20, borderRadius: 5 }}
							/>
						</Box>
						<Box sx={{ minWidth: 35 }}>
							<Typography
								variant='body2'
								color='text.secondary'
							>{`${Math.round(completionPercentage)}%`}</Typography>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}

export default Statistics
