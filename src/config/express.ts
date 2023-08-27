import express from 'express'

import { configureExpressRoutes } from '../routes'

export const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.disable('x-powered-by')

  configureExpressRoutes(app)

  return app
}
