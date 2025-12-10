import { type TStatus } from '@/types/film.interface'
import { Paper, Typography, Button, Box } from '@mui/material'
import React from 'react'

type Props = {
	selectedCount: number
	onUpdateStatus: (status: TStatus) => void
	onClearSelection: () => void
}

const BulkActions: React.FC<Props> = ({
	selectedCount,
	onUpdateStatus,
	onClearSelection,
}) => {
	return (
		<Paper
			elevation={4}
			sx={{
				position: 'fixed',
				bottom: 20,
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 1001,
				p: 2,
				display: 'flex',
				alignItems: 'center',
				gap: 2,
			}}
		>
			<Typography variant='body1'>
				Выбрано: <strong>{selectedCount}</strong>
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography variant='body2'>Изменить статус на:</Typography>
				<Button
					size='small'
					variant='contained'
					onClick={() => onUpdateStatus('not-started')}
				>
					Не просмотрено
				</Button>
				<Button
					size='small'
					variant='contained'
					onClick={() => onUpdateStatus('in-progress')}
				>
					В процессе
				</Button>
				<Button
					size='small'
					variant='contained'
					onClick={() => onUpdateStatus('viewed')}
				>
					Просмотрено
				</Button>
			</Box>
			<Button
				size='small'
				variant='outlined'
				color='error'
				onClick={onClearSelection}
			>
				Снять выделение
			</Button>
		</Paper>
	)
}

export default BulkActions
