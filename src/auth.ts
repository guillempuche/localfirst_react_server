import type {
	AbstractPowerSyncDatabase,
	PowerSyncBackendConnector,
	PowerSyncCredentials,
} from '@journeyapps/powersync-sdk-web'

export class FakeConnector implements PowerSyncBackendConnector {
	async fetchCredentials(): Promise<PowerSyncCredentials> {
		// Examples:
		// - Dart https://github.com/whygee-dev/expenses_tracker/blob/main/lib/powersync.dart, https://blog.stackademic.com/building-an-offline-first-mobile-app-with-powersync-40674d8b7ea1
		// - Supabase https://github.com/jeriko/nomadnotes/blob/main/src/library/powersync/SupabaseConnector.ts
		return {
			endpoint: '',
			token: '',
		}
	}

	async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {}
}

// // Generate an insecure authentication JWT.
// // See https://electric-sql.com/docs/usage/auth for more details.
// export const authToken = () => {
// 	const subKey = '__electric_sub'
// 	let sub = window.sessionStorage.getItem(subKey)
// 	if (!sub) {
// 		// This is just a demo. In a real app, the user ID would
// 		// usually come from somewhere else :)
// 		sub = genUUID()
// 		window.sessionStorage.setItem(subKey, sub)
// 	}
// 	const claims = { sub }
// 	return insecureAuthToken(claims)
// }

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
