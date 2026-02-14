import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { logger } from '../config/winston'
import { config } from '../config/dotenvConfig'

interface JwtPayload {
  userId: string
  [key: string]: string
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token =
    req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1]

  if (!token) {
    logger.error('No token provided')
    res.status(401).json({ message: 'No token provided, authorization denied' })
    return
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    logger.error('Invalid token from middleware')
    res.status(400).json({ message: 'Invalid token : ', error })
  }
}
