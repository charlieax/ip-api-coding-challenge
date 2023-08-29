import axios from 'axios'
import { Request, Response } from 'express'
import NodeCache from 'node-cache'
import { Logger } from 'winston'
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http'

import { getLocation } from './location'
import { logger } from '../../config/logger'

const mockedCache: { [key: string]: Object } = {
  '1.1.1.2': { city: 'Cache City', country: 'Cache Country' },
}

jest.mock('axios', () => ({
  get: jest.fn(),
}))

jest.mock('node-cache', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn((ip: string) => mockedCache[ip]),
    set: jest.fn(),
  }))
})

const mockedResponseData = {
  data: {
    city: 'Test City',
    country: 'Test Country',
  },
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {},
}

const loggerSpy = jest
  .spyOn(logger, 'log')
  .mockReturnValue({} as unknown as Logger)

const mockedGetResponse = axios.get as jest.MockedFunction<typeof axios.get>

describe('GET /location', function () {
  let request: MockRequest<Request>
  let response: MockResponse<Response>

  beforeEach(() => {
    response = createResponse()
  })

  it('fetches response from api', async function () {
    request = createRequest({
      method: 'GET',
      url: '/location',
      ip: '1.1.1.1',
    })
    mockedGetResponse.mockResolvedValueOnce(mockedResponseData)
    await getLocation(request, response)

    expect(mockedGetResponse).toHaveBeenCalledTimes(1)
    expect(response._getStatusCode()).toBe(200)
    expect(response._getData()).toEqual({
      ip: '1.1.1.1',
      location: 'Test City, Test Country',
    })
  })

  it('returns error if api call fails', async function () {
    request = createRequest({
      method: 'GET',
      url: '/location',
      ip: '1.1.1.1',
    })
    mockedGetResponse.mockResolvedValueOnce({
      data: { status: 'fail' },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    })
    await getLocation(request, response)

    expect(mockedGetResponse).toHaveBeenCalledTimes(1)
    expect(response._getStatusCode()).toBe(500)
    expect(response._getData().error).toBeDefined()
  })

  it('uses cache if available', async function () {
    request = createRequest({
      method: 'GET',
      url: '/location',
      ip: '1.1.1.2',
    })
    await getLocation(request, response)

    expect(mockedGetResponse).toHaveBeenCalledTimes(0)
    expect(response._getData()).toEqual({
      ip: '1.1.1.2',
      location: 'Cache City, Cache Country',
    })
  })
  it('logs all requests except from localhost', async function () {
    request = createRequest({
      method: 'GET',
      url: '/location',
      ip: '1.1.1.1',
    })
    mockedGetResponse.mockResolvedValueOnce(mockedResponseData)
    await getLocation(request, response)

    expect(mockedGetResponse).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledTimes(1)
  })
  it("doesn't log requests from localhost", async function () {
    request = createRequest({
      method: 'GET',
      url: '/location',
      ip: '::ffff:127.0.0.1',
    })
    mockedGetResponse.mockResolvedValueOnce(mockedResponseData)
    await getLocation(request, response)

    expect(mockedGetResponse).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledTimes(0)
  })
})
