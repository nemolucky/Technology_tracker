import '@/assets/global.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AppRouter from '@screens/router'
import { useState } from 'react'
import { NotificationProvider } from './context/NotificationContext'
import { darkTheme, lightTheme } from './themes'

function App() {
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
		return (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light'
	})

	const toggleTheme = () => {
		const newThemeMode = themeMode === 'light' ? 'dark' : 'light'
		setThemeMode(newThemeMode)
		localStorage.setItem('themeMode', newThemeMode)
	}

	const theme = themeMode === 'light' ? lightTheme : darkTheme

	return (
		<ThemeProvider theme={theme}>
			<NotificationProvider>
				<CssBaseline />
				<div className='App'>
					<AppRouter toggleTheme={toggleTheme} />
				</div>
			</NotificationProvider>
		</ThemeProvider>
	)
}

export default App
