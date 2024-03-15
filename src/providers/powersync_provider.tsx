import { PowerSyncContext } from '@journeyapps/powersync-react'
import type { AbstractPowerSyncDatabase } from '@journeyapps/powersync-sdk-web'
import { type ReactNode, useEffect, useState } from 'react'

import { useStytch } from '@stytch/react'
import { powerSyncFactory } from '../db'
import { Connector } from '../powersync_connector'

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
	const { session } = useStytch()
	const [powerSync, setPowerSync] = useState<AbstractPowerSyncDatabase | null>(
		null,
	)

	useEffect(() => {
		const initPowerSync = async () => {
			try {
				console.debug('⏳ Initializing the PowerSync instance...')

				const powerSyncInstance = powerSyncFactory.getInstance()
				await powerSyncInstance.init()

				console.debug('⏳ PowerSync is verifying the session...')

				// Try and connect, this will setup shared sync workers. This will fail due
				// to not having a valid endpoint, but it will try, which is all that matters.
				await powerSyncInstance.connect(new Connector(session))

				setPowerSync(powerSyncInstance)
				console.debug('✅ PowerSync connected')
			} catch (err) {
				console.error(err)
			}
		}

		initPowerSync()
	}, [session])

	if (!powerSync) {
		return <div>Loading PowerSync...</div>
	}

	return (
		<PowerSyncContext.Provider value={powerSync}>
			{children}
		</PowerSyncContext.Provider>
	)
}
