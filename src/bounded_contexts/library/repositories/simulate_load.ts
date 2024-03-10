export const simulateLoad: (time?: number) => Promise<void> = async time =>
	await new Promise(r => setTimeout(r, time ?? 500))
