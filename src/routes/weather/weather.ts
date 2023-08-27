import { Request, Response } from 'express'

export const getWeather = (_req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send({
    weather: 'sunny',
  })
}
