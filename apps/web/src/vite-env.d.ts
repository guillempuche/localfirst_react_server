/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AUTH_PUBLIC_TOKEN: string
	readonly VITE_DATABASE_NAME: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
