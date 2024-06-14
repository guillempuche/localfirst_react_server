import cors from 'cors'
import express from 'express'

import { uploadDataHandler } from './upload_data.js'

const app = express()
const PORT = 3001

app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:3000', // Only allow requests from the React web.
	}),
)

app.post('/uploadData', uploadDataHandler)

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
