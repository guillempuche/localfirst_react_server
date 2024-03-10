import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
	path: path.join(__dirname, '../.env'),
})

const appName = 'none'
const dbUser = process.env.DB_USERNAME!
const proxyPort = process.env.POSTGRES_PROXY_PORT!
const proxyPassword = process.env.POSTGRES_PROXY_PASSWORD!

export const DATABASE_URL = ''

export const ELECTRIC_PROXY_DATABASE_URL = buildDatabaseURL(
	dbUser,
	process.env.POSTGRES_PROXY_PASSWORD!,
	'localhost',
	process.env.POSTGRES_PROXY_PORT!,
	appName,
)

export const ELECTRIC_MIGRATION_PROXY = buildDatabaseURL(
	dbUser,
	process.env.POSTGRES_PROXY_PASSWORD!,
	'localhost',
	process.env.POSTGRES_PROXY_PORT!,
	'electric',
)

export const ELECTRIC_SYNC_URL = ` http://localhost:${process.env
	.ELECTRIC_PORT!}`

// const PUBLIC_DATABASE_URL = buildDatabaseURL(
// 	dbUser,
// 	null,
// 	'localhost',
// 	proxyPort,
// 	appName,
// )

function buildDatabaseURL(
	user: string,
	password: string | null,
	host: string,
	port: string | number,
	dbName?: string,
	options?: Record<string, string>,
): string {
	let url = `postgresql://${user}`
	if (password) url += `:${password}`
	url += `@${host}:${port}`
	if (dbName) url += `/${dbName}`

	if (options && Object.keys(options).length > 0) {
		const queryParams = new URLSearchParams(options).toString()
		url += `?${queryParams}` // Append options as query parameters
	}

	return url
}
