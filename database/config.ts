import path from 'node:path'
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config({
	path: path.join(__dirname, '../.env'),
})

// export const DATABASE_URL = `postgres://${process.env.DB_USER!}:${process.env
// 	.DB_PASSWORD!}@${process.env.DB_HOSTNAME!}/${process.env.DB_DATABASE!}`

export const connnection = new Pool({
	database: process.env.DB_DATABASE as string,
	host: process.env.DB_HOST as string,
	user: process.env.DB_USERNAME as string,
	password: process.env.DB_PASSWORD as string,
	ssl: true,
})
