import type {
	AbstractPowerSyncDatabase,
	PowerSyncBackendConnector,
	PowerSyncCredentials,
} from '@powersync/web'
import type { IHeadlessSessionClient } from '@stytch/vanilla-js'

export class Connector implements PowerSyncBackendConnector {
	constructor(private sessionToken: IHeadlessSessionClient) {}

	// Examples:
	// - Dart https://github.com/whygee-dev/expenses_tracker/blob/main/lib/powersync.dart, https://blog.stackademic.com/building-an-offline-first-mobile-app-with-powersync-40674d8b7ea1
	// - Supabase https://github.com/jeriko/nomadnotes/blob/main/src/library/powersync/SupabaseConnector.ts
	async fetchCredentials(): Promise<PowerSyncCredentials> {
		const session = this.sessionToken.getSync()
		const session_token = this.sessionToken.getTokens()?.session_token
		const session_jwt = this.sessionToken.getTokens()?.session_jwt

		if (session && session_token && session_jwt) {
			const { expires_at } = session

			return {
				endpoint: import.meta.env.VITE_POWERSYNC_INSTANCE_URL,
				token: session_jwt,
				expiresAt: new Date(expires_at),
			}
		}
		throw new Error('Authentication required - Session token is not set')
	}

	async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
		console.debug('💾 Handling operation...')
		const transaction = await database.getNextCrudTransaction()
		if (!transaction) return

		try {
			console.debug(JSON.stringify({ transactions: transaction.crud }))
			// Convert your transaction CRUD operations into a format suitable for your backend
			const response = await fetch('http://localhost:3001/uploadData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ transactions: transaction.crud }),
			})

			const responseData = await response.json()
			console.debug(responseData)

			await transaction.complete()
		} catch (error) {
			console.error('Error handling the operation:', error)
		}
	}
}
