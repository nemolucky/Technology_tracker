import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

interface User {
	id: number
	username: string
}

type Props = {
	user: User | null
	onLogout?: () => void
}

const Header: FC<Props> = ({ user, onLogout }) => {
	const location = useLocation()
	const activePage = location.pathname.split('/')[2] // e.g., 'settings' or 'statistics'

	const percentCompleted: number = 65 // This should probably come from props or a hook
	const getProgressColorClass = () => {
		if (percentCompleted < 30) return 'Low'
		if (percentCompleted < 70) return 'Medium'
		return 'High'
	}

	return (
		<header className={styles.header}>
			<h1 className={styles.title}>FilmsTracker</h1>
			<div className={styles.progressBar}>
				<div
					className={`${styles.progressFill} ${
						styles['progressFill' + getProgressColorClass()]
					}`}
					style={{ width: `${percentCompleted}%` }}
				></div>
				<span className={styles.progressText}>{percentCompleted}%</span>
			</div>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link
							to='/'
							className={
								location.pathname === '/' || location.pathname === '/home'
									? styles.active
									: ''
							}
						>
							Главная
						</Link>
					</li>
					{user && (
						<>
							<li>
								<Link
									to={`/user/${user.id}/statistics`}
									className={activePage === 'statistics' ? styles.active : ''}
								>
									Статистика
								</Link>
							</li>
							<li>
								<Link
									to={`/user/${user.id}/settings`}
									className={activePage === 'settings' ? styles.active : ''}
								>
									Настройки
								</Link>
							</li>
						</>
					)}
					{user ? (
						<>
							<li>
								<span className={styles.username}>Привет, {user.username}!</span>
							</li>
							<li>
								<button onClick={onLogout} className={styles.logoutButton}>
									Выйти
								</button>
							</li>
						</>
					) : (
						<li>
							<Link
								to='/login'
								className={location.pathname === '/login' ? styles.active : ''}
							>
								Войти
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header
