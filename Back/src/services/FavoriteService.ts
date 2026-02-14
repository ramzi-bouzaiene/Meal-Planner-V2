import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { ValidationError } from '../errors/ValidationError'
import { CheckUser } from '../utils/checkUser'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import FavoriteModel from '../models/Favorite'
import { IFavorite } from '../interfaces/IFavorite'
import { ServerError } from '../errors/ServerError'

/**
 * Adds a new favorite to the database
 * @param {string} userId - The ID of the user
 * @param {object} recipeDetails - The recipe details to be added to favorites
 * @returns {Promise<IFavorite>} - The saved favorite
 * @throws {ValidationError} - If the user ID is invalid
 * @throws {ResourceNotFoundError} - If the user is not found
 */
export const AddFavorite = async (
  userId: string,
  recipeDetails: object
): Promise<IFavorite> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ValidationError('Invalid User ID')
  }

  const existingUser = await CheckUser(userId)
  if (!existingUser) {
    throw new ResourceNotFoundError('User not found')
  }

  const recipeId = uuidv4()

  const newFavorite = new FavoriteModel({
    recipeId,
    userId,
    recipeDetails,
  })

  return await newFavorite.save()
}

/**
 * Updates an existing favorite in the database
 * @param {string} id - The ID of the favorite to update
 * @param {object} updateData - The data to update in the favorite
 * @returns {Promise<IFavorite>} - The updated favorite
 * @throws {ResourceNotFoundError} - If the favorite is not found
 */
export const UpdateFavorite = async (
  id: string,
  updateData: object
): Promise<IFavorite> => {
  const favorite = await FavoriteModel.findById(id)

  if (!favorite) {
    throw new ResourceNotFoundError('Favorite not found')
  }

  const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )

  if (!updatedFavorite) {
    throw new ServerError('Favorite update failed')
  }

  return updatedFavorite
}

/**
 * Fetches all favorites from the database
 * @returns {Promise<IFavorite[]>} - The list of all favorites
 */
export const GetAllFavorites = async (): Promise<IFavorite[]> => {
  return await FavoriteModel.find()
}

/**
 * Deletes a specific favorite from the database
 * @param {string} id - The ID of the favorite to delete
 * @returns {Promise<void>} - A promise indicating the completion of the operation
 * @throws {ResourceNotFoundError} - If the favorite is not found
 */
export const DeleteFavorite = async (id: string): Promise<void> => {
  const favorite = await FavoriteModel.findByIdAndDelete(id)
  if (!favorite) {
    throw new ResourceNotFoundError('Favorite not found')
  }
}

/**
 * Fetches a specific favorite by ID from the database
 * @param {string} id - The ID of the favorite to fetch
 * @returns {Promise<IFavorite>} - The favorite details
 * @throws {ResourceNotFoundError} - If the favorite is not found
 */
export const GetFavoriteById = async (id: string): Promise<IFavorite> => {
  const favorite = await FavoriteModel.findById(id)
  if (!favorite) {
    throw new ResourceNotFoundError('Favorite not found')
  }

  return favorite
}
