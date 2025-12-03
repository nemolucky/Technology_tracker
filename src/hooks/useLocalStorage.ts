import { useCallback, useEffect, useState } from 'react'

type SetValue<T> = T | ((prev: T) => T)

interface useLocalStorageReturn<T> {
	value: T
	setValue: (value: SetValue<T>) => void
}
export function useLocalStorage<T>(key: string): T | null

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): useLocalStorageReturn<T>

export function useLocalStorage<T>(
	key: string,
	initialValue?: T
): useLocalStorageReturn<T> | T | null {
	const readValue = useCallback((): T | null => {
		if (typeof window === 'undefined') {
			return initialValue ?? null
		}

		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue ?? null
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error)
			return initialValue ?? null
		}
	}, [key, initialValue])

	const [storedValue, setStoredValue] = useState<T | null>(readValue)

	const setValue = (value: SetValue<T>) => {
		if (typeof window === 'undefined') {
			console.warn('localStorage is not available')
			return
		}

		try {
			const newValue =
				value instanceof Function ? value(storedValue as T) : value
			setStoredValue(newValue)
			window.localStorage.setItem(key, JSON.stringify(newValue))
			window.dispatchEvent(new Event('localStorageChange'))
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error)
		}
	}

	useEffect(() => {
		const handleStorageChange = () => {
			setStoredValue(readValue())
		}

		window.addEventListener('storage', handleStorageChange)
		window.addEventListener('localStorageChange', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
			window.removeEventListener('localStorageChange', handleStorageChange)
		}
	}, [readValue])

	if (initialValue === undefined) {
		return storedValue
	}

	return {
		value: storedValue as T,
		setValue,
	}
}
