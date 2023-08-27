import { type Express } from 'express'

import { getWeather } from './weather'

export const configureExpressRoutes = (app: Express) => {
  app.get('/weather', getWeather)
}
