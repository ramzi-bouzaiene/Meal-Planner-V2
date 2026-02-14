import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

export const logger = winston.createLogger({
  levels: { error: 0, info: 2, http: 3 },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
    new DailyRotateFile({
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
