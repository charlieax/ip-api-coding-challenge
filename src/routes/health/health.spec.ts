import request from 'supertest'
import { createServer } from '../../config/express'

describe('GET /health', function () {
  it('responds with healthy json', async function () {
    const app = createServer()

    const response = await request(app).get('/health')
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.headers['access-control-allow-origin']).toMatch('*')
    expect(response.status).toBe(200)
    expect(response.body.healthy).toBeTruthy()
  })
})
