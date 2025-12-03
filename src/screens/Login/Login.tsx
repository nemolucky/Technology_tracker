import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

type Props = {
	onLogin: (username: string) => void
}

function Login({ onLogin }: Props) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// In a real app, you'd send credentials to a server for validation
		if (username === 'admin' && password === 'password') {
			onLogin(username)
			navigate('/')
		} else {
			alert('Неверные данные для входа')
		}
	}

	return (
		<div className={styles.loginPage}>
			<h1>Вход в систему</h1>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<div className={styles.formGroup}>
					<label>Имя пользователя:</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Пароль:</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Войти</button>
			</form>
		</div>
	)
}

export default Login
