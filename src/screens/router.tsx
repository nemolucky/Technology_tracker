import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import { Home, Settings, Statistics, Login } from './index'
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'
import { useState, useEffect } from 'react'
import Header from '@components/ui/Header/Header'

interface User {
	id: number
	username: string
}

const AppRouter = () => {
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
		<Router>
			<Header user={user} onLogout={handleLogout} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login onLogin={handleLogin} />} />
				<Route
					path='/user/:userId/statistics'
					element={
						<ProtectedRoute user={user}>
							<Statistics />
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
					path='/statistics'
					element={
						user ? (
							<Navigate to={`/user/${user.id}/statistics`} replace />
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
