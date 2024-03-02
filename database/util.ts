//.mjs

// import { spawn } from 'child_process';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// dotenv.config({
// 	path: path.join(dirname(fileURLToPath(import.meta.url)), '../.env'),
// });

// // If we are running the docker compose file, the container running ElectricSQL
// // service will be exposing the proxy port which should be used for all DB connections
// // that intend to use the DDLX syntax extension of SQL.
// const appName = process.env.APP_NAME || 'electric';
// const proxyPort = process.env.POSTGRES_PROXY_PORT || 65432;
// const dbUser = process.env.DB_USERNAME || 'postgres';
// const proxyPassword = process.env.POSTGRES_PROXY_PASSWORD || 'proxy_password';

// // URL to use when connecting to the proxy from the host OS
// const PROXY_DATABASE_URL = buildDatabaseURL(
// 	dbUser,
// 	proxyPassword,
// 	'localhost',
// 	proxyPort,
// 	appName
// );

// // URL to use when connecting to the proxy from a Docker container. This is used
// // when `psql` is exec'd inside the `postgres` service's container to connect to
// // the poxy running in the `electric` service's container.
// const ELECTRIC_DATABASE_URL = buildDatabaseURL(
// 	dbUser,
// 	proxyPassword,
// 	'electric_sql',
// 	65432,
// 	appName
// );

// const PUBLIC_DATABASE_URL = buildDatabaseURL(
// 	dbUser,
// 	null,
// 	'localhost',
// 	proxyPort,
// 	appName
// );

// /**
//  * @param {string} user
//  * @param {string | null} password
//  * @param {string} host
//  * @param {string | number} port
//  * @param {string} dbName
//  */
// function buildDatabaseURL(user, password, host, port, dbName) {
// 	let url = `postgresql://${user}`;
// 	if (password) {
// 		url += `:${password}`;
// 	}
// 	url += `@${host}:${port}/${dbName}`;
// 	return url;
// }

// const composeFile = fileURLToPath(
// 	new URL('../docker-compose.yaml', import.meta.url)
// );
// const envFile = fileURLToPath(new URL('../.env', import.meta.url));

// /**
//  * Executes a Docker Compose command with the specified options.
//  *
//  * @param {string} command The Docker Compose command to execute (e.g., 'up', 'down').
//  * @param {string[]} userArgs Additional arguments to pass to the Docker Compose command.
//  * @param {Function} [callback] Optional callback to execute when the process exits. It receives the exit code as its argument.
//  */
// function dockerCompose(command, userArgs, callback) {
// 	const args = [
// 		'compose',
// 		'--ansi',
// 		'always',
// 		'--env-file',
// 		envFile,
// 		'-f',
// 		composeFile,
// 		command,
// 		...userArgs,
// 	];
// 	const proc = spawn('docker', args, { stdio: 'inherit' });
// 	if (callback) {
// 		proc.on('exit', (code) => callback(code));
// 	}
// }

// export {
// 	dockerCompose,
// 	PROXY_DATABASE_URL,
// 	ELECTRIC_DATABASE_URL,
// 	PUBLIC_DATABASE_URL,
// };

import { spawn } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
	path: path.join(__dirname, '../.env'),
})

const appName = process.env.APP_NAME!
const dbUser = process.env.DB_USERNAME!
const proxyPort = process.env.POSTGRES_PROXY_PORT!
const proxyPassword = process.env.POSTGRES_PROXY_PASSWORD!

export const DATABASE_URL = buildDatabaseURL(
	dbUser,
	process.env.DB_PASSWORD!,
	// process.env.DB_HOSTNAME!,
	'localhost',
	process.env.DB_PORT!,
	appName,
)

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

const composeFile = path.join(__dirname, '../docker-compose.yaml')
const envFile = path.join(__dirname, '../.env')

function dockerCompose(
	command: string,
	userArgs: string[],
	callback?: (code: number | null) => void,
): void {
	const args = [
		'compose',
		'--ansi',
		'always',
		'--env-file',
		envFile,
		'-f',
		composeFile,
		command,
		...userArgs,
	]
	const proc = spawn('docker', args, { stdio: 'inherit' })
	if (callback) {
		proc.on('exit', callback)
	}
}

export { dockerCompose }
