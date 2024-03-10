import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { AppLayout } from './app_layout'
import './global.css'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppLayout>
			<App />
		</AppLayout>
	</StrictMode>,
)
