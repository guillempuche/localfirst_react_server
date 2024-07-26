import { formatRelative } from 'date-fns'
import { pino } from 'pino'

export function stringToRelativeDate(date: string) {
	const dateObject = new Date(date)
	return dateObject ? formatRelative(new Date(date), new Date()) : ''
}

export const logger = pino({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	// Only use pretty outside browser console, as it cannot print colors.
	// transport:
	// 	process.env.NODE_ENV !== 'production'
	// 		? {
	// 				target: 'pino-pretty',
	// 				options: {
	// 					colorize: true,
	// 				},
	// 			}
	// 		: undefined,
})
