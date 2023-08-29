import { type Express } from 'express'

import { getLocation } from './location'
import { getHealth } from './health'

export const configureExpressRoutes = (app: Express) => {
  app.get('/health', getHealth)
  app.get('/location', getLocation)
}
