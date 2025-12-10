import { Paper, Typography, Button, Box } from '@mui/material'
import { type FC } from 'react'

type Props = {
	onSelectNext: () => void
	onMarkAllViewed: () => void
	onResetAll: () => void
	onExport: () => void
}

const QuickActions: FC<Props> = ({
	onSelectNext,
	onMarkAllViewed,
	onResetAll,
	onExport,
}) => {
	return (
		<Paper elevation={2} sx={{ p: 2 }}>
			<Typography variant='h6' component='h2' sx={{ mb: 2 }}>
				Быстрые действия
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				<Button variant='contained' onClick={onSelectNext}>
					Выбрать следующий фильм
				</Button>
				<Button variant='contained' onClick={onMarkAllViewed}>
					Отметить все как просмотренные
				</Button>
				<Button variant='contained' onClick={onResetAll}>
					Сбросить все статусы
				</Button>
				<Button variant='contained' onClick={onExport}>
					Экспорт данных
				</Button>
			</Box>
		</Paper>
	)
}

export default QuickActions
