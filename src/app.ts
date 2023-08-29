import { createServer } from './config/express'
import { logger } from './config/logger'

const PORT = 3001

const app = createServer()

app.listen(PORT, '127.0.0.1', () => {
  logger.info(`Server listening on port ${PORT}`)
})
