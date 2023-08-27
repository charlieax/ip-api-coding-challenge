import { type Express } from 'express'

import { getWeather } from './weather'
import { getHealth } from './health'

export const configureExpressRoutes = (app: Express) => {
  app.get('/weather', getWeather)
  app.get('/health', getHealth)
}
