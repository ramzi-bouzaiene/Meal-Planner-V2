import dotenv from 'dotenv'

dotenv.config()

interface Config {
  nodeEnv: string
  port: number | string
  mongoURI: string
  jwtSecret: string
}

export const config: Config = {
  mongoURI: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
}
