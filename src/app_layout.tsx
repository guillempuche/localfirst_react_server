// import { StytchProvider } from '@stytch/react'
// import { StytchUIClient } from '@stytch/vanilla-js'
import type { ReactNode } from 'react'

// import { TokenAuthenticator } from './common_ui/authenticator'
import { PowerSyncProvider } from './powersync_provider'

// // We initialize the Stytch client using our project's public token which can be found in the Stytch dashboard
// const stytch = new StytchUIClient(import.meta.env.VITE_AUTH_PUBLIC_TOKEN)

export const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		// <StytchProvider stytch={stytch}>
		// 	<TokenAuthenticator>
		// 	</TokenAuthenticator>
		// </StytchProvider>
		<PowerSyncProvider>
			<div className='flex flex-col grow h-screen max-w-lg mx-auto px-6 pt-3 space-y-4 bg-white dark:bg-black dark:text-white'>
				{children}
			</div>
		</PowerSyncProvider>
	)
}
