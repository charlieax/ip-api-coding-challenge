import request from 'supertest'
import { Logger } from 'winston'

import { createServer } from '../src/config/express'
import { logger } from '../src/config/logger'

const loggerSpy = jest
  .spyOn(logger, 'log')
  .mockReturnValue({} as unknown as Logger)

describe('GET /location', function () {
  it('fetches the correct response for Canada', async function () {
    const app = createServer()

    const response = await request(app)
      .get('/location')
      .set('X-Forwarded-For', '89.37.175.139')

    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.headers['access-control-allow-origin']).toMatch('*')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      ip: '89.37.175.139',
      location: 'London, United Kingdom',
    })
  })
  it('returns error if api call fails', async function () {
    const app = createServer()

    const response = await request(app)
      .get('/location')
      .set('X-Forwarded-For', '127.0.0.1')
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.headers['access-control-allow-origin']).toMatch('*')
    expect(response.status).toBe(500)
    expect(response.body.error).toBeDefined()
  })
})
