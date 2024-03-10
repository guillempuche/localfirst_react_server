import type { ReactNode } from 'react'

import { PowerSyncProvider } from './powersync_provider'

export const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<PowerSyncProvider>
			<div className='flex flex-col grow h-screen max-w-lg mx-auto px-6 pt-3 space-y-4 bg-white dark:bg-black dark:text-white'>
				{children}
			</div>
		</PowerSyncProvider>
	)
}
