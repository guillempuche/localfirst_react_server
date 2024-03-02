import {
	ELECTRIC_DATABASE_URL,
	PUBLIC_DATABASE_URL,
	dockerCompose,
} from './util'

console.info(`Connecting to proxy at ${PUBLIC_DATABASE_URL}`)

dockerCompose('exec', [
	'-it',
	process.env.DB_HOSTNAME!,
	'psql',
	ELECTRIC_DATABASE_URL,
])
