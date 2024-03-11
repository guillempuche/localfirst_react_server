import {
	type AbstractPowerSyncDatabase,
	type CrudEntry,
	type PowerSyncBackendConnector,
	type PowerSyncCredentials,
	UpdateType,
} from '@journeyapps/powersync-sdk-web'

export class FakeConnector implements PowerSyncBackendConnector {
	async fetchCredentials(): Promise<PowerSyncCredentials> {
		// Examples:
		// - Dart https://github.com/whygee-dev/expenses_tracker/blob/main/lib/powersync.dart, https://blog.stackademic.com/building-an-offline-first-mobile-app-with-powersync-40674d8b7ea1
		// - Supabase https://github.com/jeriko/nomadnotes/blob/main/src/library/powersync/SupabaseConnector.ts
		return {
			endpoint: '',
			// token: '',
			token:
				'eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiJ1c2VyX2EiLCJpYXQiOjE3MTAwNjU1NTYsImlzcyI6Imh0dHBzOi8vcG93ZXJzeW5jLWFwaS5qb3VybmV5YXBwcy5jb20iLCJhdWQiOiJodHRwczovLzY1ZWE0MzdiYWYxNjU0ODQzYWVkMTNjZC5wb3dlcnN5bmMuam91cm5leWFwcHMuY29tIiwiZXhwIjoxNzEwMTA4NzU2fQ.n3soZixoCPZME1GTvyBo9RMsy_ugkQANk6o44exU-MqSU0yUTlbWZFdwbiNBiTwAiptfYoCg2oXo55DE0rkts9sTPLpgcb54rtjHFQTcf2Dq-m3NX-s1CQGPRR3bO-MG11amh4lXecGTqlWeZocN5ad8Bn_SG3BxKySSUoyk77ioGN3lAP70NY1zStH--dQsxxQE40OhtTG5EA_sNBeGt5hqLDPig2Da9b9dpw95nVGSwm3jQ-vRHDozoo-YNJktp3nuGrH5GuZJ_o3kN9YWyF8lL9WiprEj7LPY0_5tj1UC8-URkLqqjz7OwPQ84DjPI2zP1BJlJMpDbvh1u9G9vg',
		}
	}

	async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
		console.log('uploadData')
		const transaction = await database.getNextCrudTransaction()

		if (!transaction) {
			return
		}

		try {
			// Convert your transaction CRUD operations into a format suitable for your backend
			const response = await fetch('http://localhost:3001/uploadData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ transactions: transaction.crud }),
			})

			const responseData = await response.json()
			console.log(responseData)

			await transaction.complete()
		} catch (error) {
			console.error('Error uploading data:', error)
			// Handle error, possibly retry or complete transaction based on the error type
		}
	}
}

// export class FakeConnector implements PowerSyncBackendConnector {
// 	async init() {
// 		console.log('Initializing fake Supabase connector')
// 	}

// 	async login(username: string, password: string) {
// 		console.log(`Logging in with fake Supabase connector for user ${username}`)
// 		return await fakeLogin(username, password)
// 		// After successful login, you might want to update the session or user state here
// 	}

// 	/**
// 	 * It is called every couple of minutes and is used to obtain credentials for the backend API.
// 	 */
// 	async fetchCredentials(): PowerSyncCredentials {
// 		console.log('Fetching credentials with fake Supabase connector')
// 		return await fetchFakeCredentials()
// 	}

// 	/**
// 	 * It uploads client-side changes to the backend.
// 	 */
// 	async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
// 		console.log('Fake uploadData call to Supabase')
// 		// Here you can simulate data upload. For simplicity, let's just log an action.
// 		console.log('Pretending to upload data to the fake backend')
// 		// You can manipulate the database parameter if you want to simulate specific behaviors
// 	}
// }

// // Define a fake user and session for the demonstration
// const FAKE_USER = {
// 	id: 'fake-user-id',
// 	email: 'user@example.com',
// 	password: 'password', // In a real application, passwords would not be stored or compared on the client side
// }

// const FAKE_SESSION = {
// 	accessToken: 'fake-access-token',
// 	expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Token expires in 24 hours
// }

// // Simulates logging in by checking the fake user's credentials
// const fakeLogin = async (email: string, password: string) => {
// 	if (email === FAKE_USER.email && password === FAKE_USER.password) {
// 		console.log(`Logged in as ${email}`)
// 		return FAKE_SESSION
// 	}
// 	throw new Error('Invalid email or password')
// }

// // Simulates fetching credentials for the Powersync connection
// const fetchFakeCredentials = async () => {
// 	console.log('Fetching fake credentials')
// 	return {
// 		endpoint: 'https://fakeapi.example.com',
// 		token: FAKE_SESSION.accessToken,
// 		expiresAt: FAKE_SESSION.expiresAt,
// 	}
// }
