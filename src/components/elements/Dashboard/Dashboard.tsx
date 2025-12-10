import { useFilms } from '@/hooks/useFilm'
import {
	CheckCircle as CheckCircleIcon,
	Schedule as ScheduleIcon,
	TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import {
	AppBar,
	Box,
	Card,
	CardContent,
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	Tab,
	Tabs,
	Toolbar,
	Typography,
} from '@mui/material'
import React from 'react'

// КОМПОНЕНТ ДЛЯ СОДЕРЖИМОГО ВКЛАДКИ
function TabPanel({
	children,
	value,
	index,
}: {
	children: React.ReactNode
	value: number
	index: number
}) {
	return (
		<div role='tabpanel' hidden={value !== index}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

function Dashboard() {
	const { films } = useFilms()
	const [tabValue, setTabValue] = React.useState(0)

	// расчет статистики на основе массива films
	const stats = {
		total: films.length,
		completed: films.filter(t => t.status === 'viewed').length,
		inProgress: films.filter(t => t.status === 'in-progress').length,
		notStarted: films.filter(t => t.status === 'not-started').length,
	}

	// расчет процента выполнения
	const completionPercentage =
		stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

	// обработчик переключения вкладок
	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			{/* шапка приложения */}
			<AppBar position='static' color='default' elevation={1}>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Панель управления фильмами
					</Typography>
				</Toolbar>
			</AppBar>

			{/* вкладки */}
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label='Обзор' />
					<Tab label='Статистика' />
				</Tabs>
			</Box>

			{/* вкладка обзора */}
			<TabPanel value={tabValue} index={0}>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 3,
					}}
				>
					{/* статистические карточки */}
					<Box sx={{ flex: '1 1 200px' }}>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<CheckCircleIcon color='success' sx={{ mr: 1 }} />
									<Typography color='text.secondary' variant='body2'>
										Просмотрено
									</Typography>
								</Box>
								<Typography variant='h4'>{stats.completed}</Typography>
							</CardContent>
						</Card>
					</Box>

					<Box sx={{ flex: '1 1 200px' }}>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<ScheduleIcon color='warning' sx={{ mr: 1 }} />
									<Typography color='text.secondary' variant='body2'>
										В процессе
									</Typography>
								</Box>
								<Typography variant='h4'>{stats.inProgress}</Typography>
							</CardContent>
						</Card>
					</Box>

					<Box sx={{ flex: '1 1 200px' }}>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<TrendingUpIcon color='info' sx={{ mr: 1 }} />
									<Typography color='text.secondary' variant='body2'>
										Не начато
									</Typography>
								</Box>
								<Typography variant='h4'>{stats.notStarted}</Typography>
							</CardContent>
						</Card>
					</Box>

					<Box sx={{ flex: '1 1 200px' }}>
						<Card>
							<CardContent>
								<Typography color='text.secondary' variant='body2' gutterBottom>
									Общий прогресс
								</Typography>
								<Typography variant='h4' gutterBottom>
									{completionPercentage}%
								</Typography>
								<LinearProgress
									variant='determinate'
									value={completionPercentage}
									sx={{ height: 8, borderRadius: 4 }}
								/>
							</CardContent>
						</Card>
					</Box>

					{/* недавно добавленные фильмы */}
					<Box sx={{ flex: '1 1 45%' }}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Недавно добавленные
								</Typography>
								<List>
									{films.slice(0, 5).map(film => (
										<ListItem key={film.kinopoiskId}>
											<ListItemText
												primary={film.nameRu}
												secondary={
													film.genres?.map(g => g.genre).join(', ') || ''
												}
											/>
										</ListItem>
									))}
								</List>
							</CardContent>
						</Card>
					</Box>

					{/* распределение по жанрам */}
					<Box sx={{ flex: '1 1 45%' }}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									По жанрам
								</Typography>
								<List>
									{Array.from(
										new Set(
											films.flatMap(f => f.genres?.map(g => g.genre) || [])
										)
									).map(genre => {
										const count = films.filter(f =>
											f.genres?.some(g => g.genre === genre)
										).length
										return count > 0 ? (
											<ListItem key={genre}>
												<ListItemText
													primary={genre}
													secondary={`${count} фильмов`}
												/>
											</ListItem>
										) : null
									})}
								</List>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</TabPanel>

			{/* вкладка статистики */}
			<TabPanel value={tabValue} index={1}>
				<Typography variant='h4' gutterBottom>
					Детальная статистика
				</Typography>
				<Card>
					<CardContent>
						<Typography variant='h6' gutterBottom>
							Общая информация
						</Typography>
						<Typography>Всего фильмов: {stats.total}</Typography>
						<Typography>Просмотрено: {stats.completed}</Typography>
						<Typography>В процессе: {stats.inProgress}</Typography>
						<Typography>Не начато: {stats.notStarted}</Typography>
						<Typography sx={{ mt: 2 }}>
							Процент выполнения: {completionPercentage}%
						</Typography>
					</CardContent>
				</Card>
			</TabPanel>
		</Box>
	)
}

export default Dashboard
