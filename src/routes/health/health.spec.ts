import { Request, Response } from 'express'
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http'

import { getHealth } from './health'

describe('GET /health', function () {
  let request: MockRequest<Request>
  let response: MockResponse<Response>

  beforeEach(() => {
    request = createRequest({ method: 'GET', url: '/health' })
    response = createResponse()
  })

  it('responds with healthy json', async function () {
    await getHealth(request, response)

    expect(response._getStatusCode()).toBe(200)
    expect(response._getData().healthy).toBeTruthy()
  })
})
