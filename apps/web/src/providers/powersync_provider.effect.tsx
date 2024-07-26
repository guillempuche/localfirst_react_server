import { Buffer } from 'buffer'
import { PowerSyncContext } from '@powersync/react'
import type { AbstractPowerSyncDatabase } from '@powersync/web'
import { useStytch } from '@stytch/react'

import { type ReactNode, Suspense, useEffect, useState } from 'react'

import { powerSyncInstanceEffect } from '~effect'
import { logger } from '~utils'
import { Connector } from '../powersync_connector'

// Polyfill for WebSockets https://github.com/powersync-ja/powersync-js/blob/main/demos/react-supabase-todolist/src/components/providers/SystemProvider.tsx
if (typeof self.Buffer === 'undefined') {
	self.Buffer = Buffer
}

export const PowerSyncProviderEffect = ({
	children,
}: { children: ReactNode }) => {
	const { session } = useStytch()
	const [powerSync, setPowerSync] = useState<AbstractPowerSyncDatabase | null>(
		null,
	)

	useEffect(() => {
		// For console testing purposes
		;(window as any)._powersync = powerSync

		const initPowerSync = async () => {
			try {
				logger.debug('⏳ Initializing the PowerSync instance using Effect...')

				await powerSyncInstanceEffect.init()

				logger.debug('⏳ PowerSync is verifying the session...')

				// Try and connect, this will setup shared sync workers. This will fail due
				// to not having a valid endpoint, but it will try, which is all that matters.
				await powerSyncInstanceEffect.connect(new Connector(session))

				setPowerSync(powerSyncInstanceEffect)

				logger.debug('✅ PowerSync connected using Effect')
			} catch (err) {
				logger.error(err)
			}
		}

		initPowerSync()
	}, [session, powerSync])

	if (!powerSync) {
		return <div>Loading PowerSync using Effect...</div>
	}

	return (
		<Suspense fallback={<div>Loading PowerSync...</div>}>
			<PowerSyncContext.Provider value={powerSync}>
				{children}
			</PowerSyncContext.Provider>
		</Suspense>
	)
}
