import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import Header from '@components/ui/Header/Header'
import { useEffect, useState } from 'react'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import { Dashboard, Home, Login, Settings } from './index'

interface User {
	id: number
	username: string
}

const AppRouter = ({ toggleTheme }: { toggleTheme: () => void }) => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])

	const handleLogin = (username: string) => {
		// In a real app, you'd fetch user data from a server
		if (username === 'admin') {
			const userData = { id: 1, username: 'admin' }
			localStorage.setItem('user', JSON.stringify(userData))
			setUser(userData)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<Router basename='/technology_tracker'>
			<Header user={user} onLogout={handleLogout} toggleTheme={toggleTheme} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login onLogin={handleLogin} />} />
				<Route
					path='/user/:userId/dashboard'
					element={
						<ProtectedRoute user={user}>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/user/:userId/settings'
					element={
						<ProtectedRoute user={user}>
							<Settings />
						</ProtectedRoute>
					}
				/>
				{/* Redirect from old paths for convenience */}
				<Route
					path='/dashboard'
					element={
						user ? (
							<Navigate to={`/user/${user.id}/dashboard`} replace />
						) : (
							<Navigate to='/login' replace />
						)
					}
				/>
				<Route
					path='/settings'
					element={
						user ? (
							<Navigate to={`/user/${user.id}/settings`} replace />
						) : (
							<Navigate to='/login' replace />
						)
					}
				/>
			</Routes>
		</Router>
	)
}

export default AppRouter
