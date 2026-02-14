import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../errors/ValidationError'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import { logger } from '../config/winston'
import * as favoriteService from '../services/FavoriteService'

/**
 * Adds a new favorite for a user.
 * @param {Request} req - The request object containing userId and recipeDetails.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const AddFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, recipeDetails } = req.body
    const savedFavorite = await favoriteService.AddFavorite(
      userId,
      recipeDetails
    )

    res.status(201).json({
      message: 'Favorite successfully created',
      favorite: savedFavorite,
    })
    logger.info('Favorite successfully created')
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof ResourceNotFoundError
    ) {
      res.status(400).json({ message: error.message })
    } else {
      next(error)
    }
  }
}

/**
 * Updates an existing favorite.
 * @param {Request} req - The request object containing favorite ID and updated recipeDetails.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const UpdateFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const updateData = req.body.recipeDetails

  try {
    const updatedFavorite = await favoriteService.UpdateFavorite(id, updateData)

    res.status(200).json({
      message: 'Favorite updated successfully',
      favorite: updatedFavorite,
    })
    logger.info('Favorite updated successfully')
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}

/**
 * Retrieves all favorites.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const GetAllFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const favorites = await favoriteService.GetAllFavorites()

    res.status(200).json({
      message: 'Favorites fetched successfully',
      favorite: favorites,
    })
    logger.info('Favorites fetched successfully')
  } catch (error) {
    next(error)
  }
}

/**
 * Deletes a favorite by its ID.
 * @param {Request} req - The request object containing the favorite ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const DeleteFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  try {
    await favoriteService.DeleteFavorite(id)

    res.status(203).json({
      message: 'Favorite successfully deleted',
    })
    logger.info('Favorite successfully deleted')
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}

/**
 * Retrieves a favorite by its ID.
 * @param {Request} req - The request object containing the favorite ID.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const GetFavoriteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  try {
    const favoriteDetails = await favoriteService.GetFavoriteById(id)

    res.status(200).json({
      message: 'Favorite details fetched successfully',
      favorite: favoriteDetails,
    })
    logger.info('Favorite details fetched successfully')
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}
