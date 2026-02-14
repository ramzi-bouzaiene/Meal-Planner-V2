import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config/dotenvConfig'
import { IUser } from '../interfaces/IUser'
import User from '../models/User'
import { ValidationError } from '../errors/ValidationError'
import { logger } from '../config/winston'
import { UnauthorizedError } from '../errors/UnauthorizedError'

const generateAccessToken = (userId: string | unknown) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' })
}

/**
 * Registers a new user by validating email, hashing the password, and saving the user in the database
 * @param username - The username of the new user
 * @param email - The email of the new user
 * @param password - The password of the new user
 * @returns {Promise<IUser>} - The newly created user object
 * @throws {ValidationError} If the email is already in use
 */
export const RegisterUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    logger.error('Email already used')
    throw new ValidationError('Email already used')
  }

  const userId = uuidv4()
  const hash = await bcrypt.hash(password, 10)

  const user: IUser = new User({
    userId,
    username,
    email,
    password: hash,
    favorites: [],
    mealPlans: [],
  })

  const savedUser = await user.save()

  logger.info('User successfully created')
  return savedUser
}

/**
 * Authenticates a user by comparing credentials and returning a JWT token if valid
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns {Promise<{ jwtToken: string, userId: string }>} - The generated JWT token and user ID
 * @throws {UnauthorizedError} If the user is not found or credentials are invalid
 * @throws {ValidationError} If the authentication credentials are invalid
 */
export const LoginUser = async (
  email: string,
  password: string
): Promise<{
  accessToken: string
  userId: string | unknown
}> => {
  const user: IUser | null = await User.findOne({ email }).select('+password')

  if (!user) {
    logger.error('User not found')
    throw new UnauthorizedError('Authentication Failed: User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    logger.error('Invalid user credentials')
    throw new ValidationError('Authentication Failed: Invalid credentials')
  }

  const accessToken = generateAccessToken(user._id)

  logger.info('User authenticated successfully')
  return {
    accessToken: accessToken,
    userId: user._id,
  }
}

/**
 * Fetches a user by ID from the database
 * @param userId - The ID of the user
 * @returns {Promise<IUser>} - The user object
 */
export const GetUserById = async (
  userId: string
): Promise<IUser | null> => {
  const user = await User.findById(userId).select('-password')
  return user
}

/**
 * Fetches all users from the database
 * @returns {Promise<IUser[]>} - The list of users
 */
export const GetAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  logger.info('Users list fetched successfully')
  return users
}
