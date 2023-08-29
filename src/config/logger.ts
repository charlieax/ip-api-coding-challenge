import winston from 'winston'

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    levels: { ...winston.config.npm.levels, request: -1 },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        level: 'request',
        filename: 'logs/requests.log',
      }),
    ],
    exitOnError: false,
  })
}

export const logger = LoggerWrapper()
