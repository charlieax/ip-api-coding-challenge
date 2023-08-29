import express from 'express'

import { configureExpressRoutes } from '../routes'

export const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.disable('x-powered-by')
  app.set('trust proxy', true)

  configureExpressRoutes(app)

  return app
}
