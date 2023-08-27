import request from 'supertest'
import { createServer } from '../../config/express'

describe('GET /weather', function () {
  it('responds with weather json', async function () {
    const app = createServer()

    const response = await request(app).get('/weather')
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.headers['access-control-allow-origin']).toMatch('*')
    expect(response.status).toBe(200)
    expect(response.body.weather).toBe('sunny')
  })
})
