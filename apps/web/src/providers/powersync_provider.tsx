import { PowerSyncContext } from '@powersync/react'
import type { AbstractPowerSyncDatabase } from '@powersync/web'
import { type ReactNode, useEffect, useState } from 'react'

import { useStytch } from '@stytch/react'
import { logger } from '~utils'
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
				logger.debug('⏳ Initializing the PowerSync instance...')

				const powerSyncInstance = powerSyncFactory.getInstance()
				await powerSyncInstance.init()

				logger.debug('⏳ PowerSync is verifying the session...')

				// Try and connect, this will setup shared sync workers. This will fail due
				// to not having a valid endpoint, but it will try, which is all that matters.
				await powerSyncInstance.connect(new Connector(session))

				setPowerSync(powerSyncInstance)
				logger.debug('✅ PowerSync connected')
			} catch (err) {
				logger.error(err)
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
