import { useStytch, useStytchSession, useStytchUser } from '@stytch/react'

import { Button } from '.'

/*
The Profile component is shown to a user that is logged in.

This component renders the full User and Session object for education. 

This component also includes a log out button which is accomplished by making a method call to revoking the existing session
*/
export const PageProfile = () => {
	const stytch = useStytch()
	const { user } = useStytchUser()
	const { session } = useStytchSession()

	return (
		<div className='flex flex-col grow h-screen max-w-lg mx-auto px-6 pt-3 space-y-4 bg-white dark:bg-black dark:text-white'>
			<div className='card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<h1 className='text-xl font-bold text-gray-900 dark:text-white'>
					Profile
				</h1>
				<div className='mt-4'>
					<h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
						User object
					</h2>
					<pre className='code-block mt-2 bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded p-4 overflow-x-auto'>
						<code>{JSON.stringify(user, null, 2)}</code>
					</pre>
				</div>

				<div className='mt-4'>
					<h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
						Session object
					</h2>
					<pre className='code-block mt-2 bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded p-4 overflow-x-auto'>
						<code>{JSON.stringify(session, null, 2)}</code>
					</pre>
				</div>

				<p className='mt-4 text-sm text-gray-600 dark:text-gray-300'>
					You are logged in, and a Session has been created. The SDK stores the
					Session as a token and a JWT in the browser cookies as{' '}
					<span className='code inline-block bg-gray-200 dark:bg-gray-600 rounded px-2'>
						stytch_session
					</span>{' '}
					and{' '}
					<span className='code inline-block bg-gray-200 dark:bg-gray-600 rounded px-2'>
						stytch_session_jwt
					</span>{' '}
					respectively.
				</p>

				{/* Revoking the session results in the session being revoked and cleared from browser storage. The user will return to Login */}
				<div className='mt-4'>
					<Button
						onClick={() => stytch.session.revoke()}
						className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
					>
						Log out
					</Button>
				</div>
			</div>
		</div>
	)
}
