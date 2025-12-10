import { Alert, Snackbar } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'

type NotificationSeverity = 'success' | 'error' | 'warning' | 'info'

interface NotificationContextType {
	showNotification: (message: string, severity: NotificationSeverity) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
)

export const NotificationProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [severity, setSeverity] =
		useState<NotificationSeverity>('info')

	const showNotification = (
		newMessage: string,
		newSeverity: NotificationSeverity
	) => {
		setMessage(newMessage)
		setSeverity(newSeverity)
		setOpen(true)
	}

	const handleClose = (reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={(_event, reason) => handleClose(reason)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={() => handleClose()}
					severity={severity}
					sx={{ width: '100%' }}
				>
					{message}
				</Alert>
			</Snackbar>
		</NotificationContext.Provider>
	)
}

export const useNotification = () => {
	const context = useContext(NotificationContext)
	if (context === undefined) {
		throw new Error(
			'useNotification must be used within a NotificationProvider'
		)
	}
	return context
}
