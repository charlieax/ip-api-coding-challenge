import { createServer } from './config/express'

const PORT = 3001

const app = createServer()

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
