import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	server: {
		open: false,
		port: 3000,
	},
	build: {
		outDir: 'build',
		sourcemap: true,
	},
})
