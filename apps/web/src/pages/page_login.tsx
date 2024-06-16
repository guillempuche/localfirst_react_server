import { StytchLogin } from '@stytch/react'
import { Products } from '@stytch/vanilla-js'

/*
Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch

This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
https://stytch.com/docs/sdks/javascript-sdk#ui-configs
*/
export const PageLogin = () => {
	const styles = {
		container: {
			width: '100%',
		},
		buttons: {
			primary: {
				backgroundColor: '#4A37BE',
				borderColor: '#4A37BE',
			},
		},
	}
	const config = {
		products: [Products.emailMagicLinks],
		emailMagicLinksOptions: {
			loginRedirectURL: 'http://localhost:3000/authenticate',
			loginExpirationMinutes: 60 * 24 * 7, // One week
			signupRedirectURL: 'http://localhost:3000/authenticate',
			signupExpirationMinutes: 60 * 24 * 7,
		},
	}

	return (
		<StytchLogin data-component='page-login' config={config} styles={styles} />
	)
}
