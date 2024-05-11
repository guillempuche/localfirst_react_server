import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

export default defineConfig(({ mode }) => ({
	resolve: {
		alias: {
			'@backend/*': resolve(__dirname, 'backend/*'),
			'@components': resolve(__dirname, 'src/components/index'),
			'@mock': resolve(__dirname, 'src/mock/index'),
			'@providers': resolve(__dirname, 'src/providers/index'),
		},
	},
	server: {
		open: false,
		port: 3000,
		// Enable Cross-Origin Isolation for advanced features like SharedArrayBuffer in workers used by SQLite.
		// - COOP: Restrict document sharing across origins to enhance security.
		// - COEP: Require all resources to include CORP headers, ensuring data isolation.
		// https://github.com/sqlite/sqlite-wasm?tab=readme-ov-file#usage-with-vite
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp',
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: mode !== 'production',
		// rollupOptions: {
		// 	input: resolve(__dirname, 'src/index.html'),
		// },
	},
	plugins: [react(), wasm(), topLevelAwait()],
	worker: {
		format: 'es',
		plugins: () => [wasm(), topLevelAwait()],
	},
	optimizeDeps: {
		// Don't optimize the packages `@journeyapps/wa-sqlite`, `@powersync/web`,
		// `object-hash`, `uuid`, `event-iterator`, `js-logger`, `lodash`, `can-ndjson-stream` as
		// they contain web workers and WASM files.
		// https://github.com/vitejs/vite/issues/11672#issuecomment-1415820673
		exclude: [
			'@journeyapps/wa-sqlite',
			'@powersync/web',
			'@sqlite.org/sqlite-wasm',
		],

		// For PowerSync
		include: [
			'object-hash',
			'uuid',
			'event-iterator',
			'js-logger',
			'lodash',
			'can-ndjson-stream',
		],
	},
}))
