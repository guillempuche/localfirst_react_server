import cors from 'cors'
import express from 'express'

import { uploadDataHandlerEffect } from './upload_data.effect.js'

const app = express()
const PORT = 3001

app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:3000', // Only allow requests from the React web.
	}),
)

app.post('/uploadData', uploadDataHandlerEffect)

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
