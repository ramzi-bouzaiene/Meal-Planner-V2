import mongoose from 'mongoose'
import { ValidationError } from '../errors/ValidationError'
import { IMealPlan, RecipeInMealPlan } from '../interfaces/IMealPlan'
import { CheckUser } from '../utils/checkUser'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import Meal from '../models/Meal'

/**
 * @function addMeal
 * @description Adds a new meal plan by validating the user and saving the meal plan
 * @param {string} userId - The user's ID
 * @param {string} week - The week of the meal plan
 * @param {Array} recipes - List of recipes in the meal plan
 * @returns {Promise<IMealPlan>} - The created meal plan
 * @throws {ValidationError} If the user ID is invalid
 * @throws {ResourceNotFoundError} If the user is not found
 */
export const AddMeal = async (
  userId: string,
  week: string,
  recipes: RecipeInMealPlan[]
): Promise<IMealPlan> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ValidationError('Invalid User ID')
  }

  const existingUser = await CheckUser(userId)
  if (!existingUser) {
    throw new ResourceNotFoundError('User not found')
  }

  const newMeal = new Meal({ userId, week, recipes })
  return await newMeal.save()
}

/**
 * @function updateMeal
 * @description Updates an existing meal plan
 * @param {string} id - The meal plan ID
 * @param {string} userId - The user's ID
 * @param {string} week - The week of the meal plan
 * @param {Array} recipes - List of recipes in the meal plan
 * @returns {Promise<IMealPlan>} - The updated meal plan
 * @throws {ValidationError} If the user ID is invalid
 * @throws {ResourceNotFoundError} If the user or meal plan is not found
 */
export const UpdateMeal = async (
  id: string,
  userId: string,
  week: string,
  recipes: RecipeInMealPlan[]
): Promise<IMealPlan> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ValidationError('Invalid User ID')
  }

  const existingUser = await CheckUser(userId)
  if (!existingUser) {
    throw new ResourceNotFoundError('User not found')
  }

  const mealPlan = await Meal.findById(id)
  if (!mealPlan) {
    throw new ResourceNotFoundError('Meal Plan not found')
  }

  mealPlan.week = week
  mealPlan.recipes = recipes
  return await mealPlan.save()
}

/**
 * @function getAllMeals
 * @description Retrieves all meal plans
 * @returns {Promise<IMealPlan[]>} - List of all meal plans
 */
export const GetAllMeals = async (): Promise<IMealPlan[]> => {
  return await Meal.find()
}

/**
 * @function deleteMeal
 * @description Deletes a meal plan by ID
 * @param {string} id - The meal plan ID
 * @throws {ResourceNotFoundError} If the meal plan is not found
 */
export const DeleteMeal = async (id: string): Promise<void> => {
  const mealPlan = await Meal.findByIdAndDelete(id)
  if (!mealPlan) {
    throw new ResourceNotFoundError('Meal Plan not found')
  }
}
