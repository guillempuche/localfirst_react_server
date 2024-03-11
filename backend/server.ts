import express from 'express'
import { uploadDataHandler } from './upload_data'

const app = express()
const PORT = 3001

app.use(express.json())

app.post('/uploadData', uploadDataHandler)

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
