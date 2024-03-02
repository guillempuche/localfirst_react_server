// .mjs

// import { spawn } from 'child_process';
// import { PROXY_DATABASE_URL, PUBLIC_DATABASE_URL } from './util.mjs';

// console.info(`Connecting to proxy at ${PUBLIC_DATABASE_URL}`);

// const args = [
// 	'run',
// 	'pg-migrations',
// 	'apply',
// 	'--database',
// 	PROXY_DATABASE_URL,
// 	'--directory',
// 	'./migrations',
// ];
// const proc = spawn('yarn', args, {
// 	cwd: __dirname,
// 	stdio: ['inherit', 'pipe', 'inherit'],
// });

// let newMigrationsApplied = true;

// proc.stdout.on('data', (data) => {
// 	if (data.toString().trim() === 'No migrations required') {
// 		newMigrationsApplied = false;
// 	} else {
// 		process.stdout.write(data);
// 	}
// });

// proc.on('exit', (/** @type {number} */ code) => {
// 	if (code === 0) {
// 		if (newMigrationsApplied) {
// 			console.log('⚡️ Database migrated.');
// 		} else {
// 			console.log('⚡ Database already up to date.');
// 		}
// 	} else {
// 		console.error(
// 			'\x1b[31m',
// 			`Failed to connect to the database. Exit code: ${code}`,
// 			'\x1b[0m'
// 		);
// 	}
// });

import { spawn } from 'child_process'
import { PROXY_DATABASE_URL } from './util'

console.info(`Connecting to proxy at ${PROXY_DATABASE_URL}`)

// const args = [
// 	'run',
// 	'pg-migrations',
// 	'apply',
// 	'--database',
// 	PROXY_DATABASE_URL,
// 	'--directory',
// 	'./database/migrations',
// ]
const args = [
	'run',
	'pg-migrations',
	'mark-unapplied',
	'-m',
	'1',
	'--database',
	PROXY_DATABASE_URL,
	'--directory',
	'./database/migrations',
]
const proc = spawn('yarn', args, {
	// cwd: __dirname,
	stdio: ['inherit', 'pipe', 'inherit'],
})

let newMigrationsApplied = true

proc.stdout.on('data', (data: Buffer) => {
	if (data.toString().trim() === 'No migrations required') {
		newMigrationsApplied = false
	} else {
		process.stdout.write(data)
	}
})

proc.on('exit', (code: number | null) => {
	if (code === 0) {
		if (newMigrationsApplied) {
			console.log('⚡️ Database migrated.')
		} else {
			console.log('⚡ Database already up to date.')
		}
	} else {
		console.error(
			'\x1b[31m',
			`Failed to connect to the database. Exit code: ${code}`,
			'\x1b[0m',
		)
	}
})
