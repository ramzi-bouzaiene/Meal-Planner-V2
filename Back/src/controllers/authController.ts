import { NextFunction, Request, Response } from 'express'
import { LoginData, RegisterData } from '../interfaces/Auth'
import * as authService from '../services/AuthService'
import { config } from '../config/dotenvConfig'

/**
 * Registers a new user by calling the service
 * @param {Request} req - The request object containing user data
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */
export const RegisterUser = async (
  req: Request<object, object, RegisterData>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body

  try {
    const savedUser = await authService.RegisterUser(username, email, password)

    res.status(201).json({
      message: 'User successfully created',
      success: true,
      result: savedUser,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Authenticates a user by calling the service
 * @param {Request} req - The request object containing user credentials
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */
export const LoginUser = async (
  req: Request<object, object, LoginData>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body

  try {
    const { accessToken, userId } = await authService.LoginUser(email, password)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
      path: '/',
    })

    res.status(200).json({
      message: 'Authentication Successful',
      success: true,
      userId,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Fetches all users by calling the service
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */
export const GetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await authService.GetAllUsers()

    res.status(200).json({
      data: users,
      success: true,
      message: 'Users list fetched successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const GetCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId
    const user = await authService.GetUserById(userId)

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie('accessToken', { path: '/' })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}
