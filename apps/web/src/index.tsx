import { StytchProvider } from '@stytch/react'
import { StytchUIClient } from '@stytch/vanilla-js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'
import './global.css'
import { PowerSyncProvider } from './providers/powersync_provider'
import { PowerSyncProviderEffect } from './providers/powersync_provider.effect'

// We initialize the Stytch client using our project's public token which can be found in the Stytch dashboard
const stytch = new StytchUIClient(import.meta.env.VITE_AUTH_PUBLIC_TOKEN)

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<StytchProvider stytch={stytch}>
				{/* <PowerSyncProvider> */}
				<PowerSyncProviderEffect>
					<App />
				</PowerSyncProviderEffect>
				{/* </PowerSyncProvider> */}
			</StytchProvider>
		</BrowserRouter>
	</StrictMode>,
)
