import { usePowerSync } from '@powersync/react'
import { useStytch, useStytchUser } from '@stytch/react'
import { type ReactNode, Suspense, lazy, useEffect, useState } from 'react'
import {
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

import { Button, PageHome, PageLogin } from '~components'
import { TokenAuthenticator } from '~providers'

const PageProfile = lazy(() =>
	import('~components').then(module => ({ default: module.PageProfile })),
)

export const App = () => {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Navigate to='/home' replace />} />
					<Route path='/authenticate' element={<TokenAuthenticator />} />
					<Route path='/login' element={<PageLogin />} />
					<Route
						path='/home'
						element={
							<RequireAuth>
								<PageHome />
							</RequireAuth>
						}
					/>
					<Route
						path='/profile'
						element={
							<RequireAuth>
								<Suspense fallback={<div>Loading...</div>}>
									<PageProfile />
								</Suspense>
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
			<Tooltip id='tooltip' />
		</>
	)
}

function Layout() {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { session } = useStytch()
	const { user } = useStytchUser()
	const powerSync = usePowerSync()
	const [connected, setConnected] = useState(powerSync.connected)
	const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(new Date())
	const lastSyncedTimeAgo = useTimeAgo(lastSyncedAt)

	useEffect(() => {
		// Register listener for changes made to the powersync status
		return powerSync.registerListener({
			statusChanged: status => {
				setConnected(status.connected)
				setLastSyncedAt(status.lastSyncedAt ?? null)
			},
		})
	}, [powerSync])

	const handleLogout = async () => {
		try {
			await session.revoke()
			navigate('/login')
		} catch (error) {
			console.error('Logout failed', error)
		}
	}

	return (
		<div className='flex flex-col grow h-screen max-w-lg mx-auto px-6 pt-3 space-y-4 bg-white dark:bg-black dark:text-white'>
			<nav className='flex justify-end space-x-4'>
				<span>PowerSync {connected ? 'connected' : 'not connected'}</span>
				<span>Last synced {lastSyncedTimeAgo}</span>
				{user && (
					<>
						{pathname !== '/home' && (
							<Button onClick={() => navigate('/home')}>Home</Button>
						)}
						{pathname !== '/profile' && (
							<Button onClick={() => navigate('/profile')}>Profile</Button>
						)}
						<Button
							onClick={handleLogout}
							className='text-white bg-red-500 hover:bg-red-400'
						>
							Log out
						</Button>
					</>
				)}
			</nav>
			<Outlet />
		</div>
	)
}

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const location = useLocation()
	const { user } = useStytchUser()

	if (!user) {
		console.debug('User not logged. Redirecting to the login page...')

		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return children
}

/**
 * Encapsulates the logic for updating the `X seconds/minutes/hours ago`.
 */
function useTimeAgo(date: Date | null): string {
	const [timeAgo, setTimeAgo] = useState<string>('')

	useEffect(() => {
		if (!date) {
			setTimeAgo('never')
			return
		}

		const update = () => {
			const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
			if (seconds < 60) setTimeAgo(`${seconds} seconds ago`)
			else if (seconds < 3600)
				setTimeAgo(`${Math.floor(seconds / 60)} minutes ago`)
			else setTimeAgo(`${Math.floor(seconds / 3600)} hours ago`)
		}

		// Initial update
		update()

		// Update every second
		const intervalId = setInterval(update, 1000)

		return () => clearInterval(intervalId)
	}, [date])

	return timeAgo
}
