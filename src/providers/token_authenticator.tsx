import { useStytch, useStytchUser } from '@stytch/react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

/*
During the Magic link, Stytch will redirect the user back to your application to a specified redirect URL (see the Login component). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like: http://localhost:3000/?stytch_token_type=magic_links&token=abc123

TokenAuthenticator will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created and the user will be redirected to the home page. 
*/
export const TokenAuthenticator = () => {
	const stytch = useStytch()
	const { user } = useStytchUser()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			const token = searchParams.get('token')
			const tokenType = searchParams.get('stytch_token_type')

			// If a token is found, authenticate it with the appropriate method
			if (token && tokenType) {
				if (tokenType === 'magic_links')
					stytch.magicLinks.authenticate(token, {
						session_duration_minutes: 60 * 24 * 7, // One week, the same as in the dashboard https://stytch.com/dashboard/sdk-configuration?env=test
					})
				else console.log(`This Stytch's token '${tokenType}' isn't implemented`)
			}
		}
	}, [stytch, searchParams, user])

	useEffect(() => {
		if (user) {
			navigate('/home')
		}
	}, [navigate, user])

	return null
}
