import path, { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export default defineConfig(_ => ({
	resolve: {
		// Resolve modules for build time
		alias: {
			'@localfirst/core': resolve(__dirname, '../../packages/core/src'),
			'~components': resolve(__dirname, 'src/components/index'),
			'~effect': resolve(__dirname, 'src/db.effect'),
			'~pages': resolve(__dirname, 'src/pages/index'),
			'~providers': resolve(__dirname, 'src/providers/index'),
			'~utils': resolve(__dirname, 'src/utils'),
		},
	},
	server: {
		open: false,
		port: 3000,
		// // Enable Cross-Origin Isolation for advanced features like SharedArrayBuffer in workers used by SQLite.
		// // - COOP: Restrict document sharing across origins to enhance security.
		// // - COEP: Require all resources to include CORP headers, ensuring data isolation.
		// // https://github.com/sqlite/sqlite-wasm?tab=readme-ov-file#usage-with-vite
		// headers: {
		// 	'Cross-Origin-Opener-Policy': 'same-origin',
		// 	'Cross-Origin-Embedder-Policy': 'require-corp',
		// },
	},
	// build: {
	// 	outDir: 'dist',
	// 	sourcemap: mode !== 'production',
	// },
	optimizeDeps: {
		// Don't optimize the packages `@journeyapps/wa-sqlite`, `@powersync/web`,
		// `object-hash`, `uuid`, `event-iterator`, `js-logger`, `lodash`, `can-ndjson-stream` as
		// they contain web workers and WASM files.
		// https://github.com/vitejs/vite/issues/11672#issuecomment-1415820673
		exclude: ['@journeyapps/wa-sqlite', '@powersync/web'],

		// For PowerSync
		include: [
			'@powersync/web > event-iterator',
			'@powersync/web > js-logger',
			'@powersync/web > lodash/throttle',
			'@powersync/web > can-ndjson-stream',
			'@powersync/web > buffer',
			'@powersync/web > rsocket-core',
			'@powersync/web > rsocket-websocket-client',
			'@powersync/web > cross-fetch',
		],
	},
	plugins: [
		react(),
		wasm(),
		topLevelAwait(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['vite.svg'],
			manifest: {
				theme_color: '#c44eff',
				background_color: '#c44eff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				name: 'LocalFirst React Demo',
				short_name: 'LocalFirst React',
			},
		}),
	],
	worker: {
		format: 'es',
		plugins: () => [wasm(), topLevelAwait()],
	},
}))
