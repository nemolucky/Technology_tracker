import { type FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

interface User {
	id: number
	username: string
}

type Props = {
	children: React.ReactNode
	user: User | null
}

const ProtectedRoute: FC<Props> = ({ children, user }) => {
	const { userId } = useParams<{ userId: string }>()

	if (!user) {
		// User not logged in, redirect to login
		return <Navigate to='/login' replace />
	}

	if (user.id !== Number(userId)) {
		// Logged in user is trying to access another user's page
		// Redirect to their own dashboard or home
		return <Navigate to='/' replace />
	}

	return children
}

export default ProtectedRoute
