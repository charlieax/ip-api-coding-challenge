import { Request, Response } from 'express'

export const getHealth = (_req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send({
    healthy: true,
  })
}
