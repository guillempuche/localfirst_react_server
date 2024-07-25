import { PowerSyncContext } from '@powersync/react'
import type { AbstractPowerSyncDatabase } from '@powersync/web'
import { useStytch } from '@stytch/react'
import { type ReactNode, useEffect, useState } from 'react'

import { powerSyncInstanceEffect } from '~effect'
import { Connector } from '../powersync_connector'

export const PowerSyncProviderEffect = ({
	children,
}: { children: ReactNode }) => {
	const { session } = useStytch()
	const [powerSync, setPowerSync] = useState<AbstractPowerSyncDatabase | null>(
		null,
	)

	useEffect(() => {
		const initPowerSync = async () => {
			try {
				console.debug('⏳ Initializing the PowerSync instance using Effect...')

				const powerSyncInstance = powerSyncInstanceEffect
				await powerSyncInstance.init()

				console.debug('⏳ PowerSync is verifying the session...')

				// Try and connect, this will setup shared sync workers. This will fail due
				// to not having a valid endpoint, but it will try, which is all that matters.
				await powerSyncInstance.connect(new Connector(session))

				setPowerSync(powerSyncInstance)
				console.debug('✅ PowerSync connected using Effect')
			} catch (err) {
				console.error(err)
			}
		}

		initPowerSync()
	}, [session])

	if (!powerSync) {
		return <div>Loading PowerSync using Effect...</div>
	}

	return (
		<PowerSyncContext.Provider value={powerSync}>
			{children}
		</PowerSyncContext.Provider>
	)
}
