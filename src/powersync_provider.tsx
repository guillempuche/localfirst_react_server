import { PowerSyncContext } from '@journeyapps/powersync-react'
import type { AbstractPowerSyncDatabase } from '@journeyapps/powersync-sdk-web'
import { type ReactNode, useEffect, useState } from 'react'

import { powerSyncFactory } from './db'
import { FakeConnector } from './powersync_connector'

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
	const [powerSync, setPowerSync] = useState<AbstractPowerSyncDatabase | null>(
		null,
	)

	useEffect(() => {
		const initPowerSync = async () => {
			try {
				console.log('⏳ Initializing the PowerSync instance...')

				const powerSyncInstance = powerSyncFactory.getInstance()
				await powerSyncInstance.init()

				console.log('✅ Initializing done')

				// Try and connect, this will setup shared sync workers. This will fail due
				// to not having a valid endpoint, but it will try, which is all that matters.
				await powerSyncInstance.connect(new FakeConnector())
				setPowerSync(powerSyncInstance)
			} catch (err) {
				console.error(err)
			}
		}

		initPowerSync()
	}, [])

	if (!powerSync) {
		return <div>Loading...</div>
	}

	return (
		<PowerSyncContext.Provider value={powerSync}>
			{children}
		</PowerSyncContext.Provider>
	)
}
