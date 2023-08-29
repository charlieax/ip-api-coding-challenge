import { Request, Response } from 'express'
import axios from 'axios'
import NodeCache from 'node-cache'
import { logger } from '../../config/logger'

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 })

type LocationInfo = {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export const getLocation = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const ip = req.ip

  if (ip !== '::ffff:127.0.0.1') logger.log('request', ip) // log all requests except from localhost

  let locationInfo: LocationInfo | undefined = cache.get(ip)

  if (!locationInfo) {
    locationInfo = await fetchIpData(ip)
  }
  if (!locationInfo || locationInfo.status === 'fail') {
    return res.status(500).send({
      error: 'Could not fetch location data',
    })
  }
  cache.set(ip, locationInfo)

  res.send({
    ip,
    location: `${locationInfo.city}, ${locationInfo.country}`,
  })
}

const fetchIpData = async (ip: string) => {
  const response = await axios.get(`http://ip-api.com/json/${ip}`)
  return response.data
}
