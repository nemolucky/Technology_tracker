import { Brightness4, Brightness7 } from '@mui/icons-material'
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material'
import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface User {
	id: number
	username: string
}

type Props = {
	user: User | null
	onLogout?: () => void
	toggleTheme: () => void
}

const Header: FC<Props> = ({ user, onLogout, toggleTheme }) => {
	const theme = useTheme()
	const location = useLocation()

	const getActiveStyle = (path: string) => {
		return location.pathname === path
			? { textDecoration: 'underline', fontWeight: 'bold' }
			: {}
	}

	return (
		<AppBar position='fixed'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					FilmsTracker
				</Typography>
				<Box component='nav' sx={{ display: { xs: 'none', sm: 'block' } }}>
					<Button
						component={Link}
						to='/'
						sx={{ color: '#fff', ...getActiveStyle('/') }}
					>
						Главная
					</Button>
					{user && (
						<>
							<Button
								component={Link}
								to={`/user/${user.id}/dashboard`}
								sx={{
									color: '#fff',
									...getActiveStyle(`/user/${user.id}/dashboard`),
								}}
							>
								Статистика
							</Button>

							<Button
								component={Link}
								to={`/user/${user.id}/settings`}
								sx={{
									color: '#fff',
									...getActiveStyle(`/user/${user.id}/settings`),
								}}
							>
								Настройки
							</Button>
						</>
					)}
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
					<IconButton sx={{ ml: 1 }} onClick={toggleTheme} color='inherit'>
						{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
					{user ? (
						<>
							<Typography sx={{ p: 1 }}>Привет, {user.username}!</Typography>
							<Button color='inherit' onClick={onLogout}>
								Выйти
							</Button>
						</>
					) : (
						<Button
							component={Link}
							to='/login'
							sx={{ color: '#fff', ...getActiveStyle('/login') }}
						>
							Войти
						</Button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
