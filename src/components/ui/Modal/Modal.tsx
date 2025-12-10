import { Modal as MuiModal, Box, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { type FC, type ReactNode } from 'react'

type Props = {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
	return (
		<MuiModal
			open={isOpen}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<Close />
				</IconButton>
				{children}
			</Box>
		</MuiModal>
	)
}

export default Modal
