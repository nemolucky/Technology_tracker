import { useNotification } from '@/context/NotificationContext'
import {
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	Box,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
	onLogin: (username: string) => void
}

function Login({ onLogin }: Props) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { showNotification } = useNotification()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// In a real app, you'd send credentials to a server for validation
		if (username === 'admin' && password === 'password') {
			onLogin(username)
			navigate('/')
		} else {
			showNotification('Неверные данные для входа', 'error')
		}
	}

	return (
		<Container
			component='main'
			maxWidth='xs'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
			}}
		>
			<Paper elevation={3} sx={{ p: 4, mt: 8 }}>
				<Typography component='h1' variant='h5' sx={{ mb: 2 }}>
					Вход в систему
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Имя пользователя'
						name='username'
						autoComplete='username'
						autoFocus
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Пароль'
						type='password'
						id='password'
						autoComplete='current-password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Войти
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}

export default Login
