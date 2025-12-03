import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@screens': path.resolve(__dirname, 'src/screens'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@types': path.resolve(__dirname, 'src/types'),
		},
	},
})
