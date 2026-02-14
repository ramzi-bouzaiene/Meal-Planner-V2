import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/winston'
import * as mealService from '../services/MealPlan'

/**
 * @function addMeal
 * @description Controller to handle adding a meal plan
 */
export const AddMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, week, recipes } = req.body
    const savedMeal = await mealService.AddMeal(userId, week, recipes)

    res.status(201).json({
      message: 'Meal Plan successfully created',
      meal: savedMeal,
    })
    logger.info('Meal Plan successfully created')
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateMeal
 * @description Controller to handle updating a meal plan
 */
export const UpdateMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { userId, week, recipes } = req.body
    const updatedMeal = await mealService.UpdateMeal(id, userId, week, recipes)

    res.status(200).json({
      message: 'Meal Plan successfully updated',
      meal: updatedMeal,
    })
    logger.info('Meal Plan successfully updated')
  } catch (error) {
    next(error)
  }
}

/**
 * @function getAllMeals
 * @description Controller to fetch all meal plans
 */
export const GetAllMeals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mealPlans = await mealService.GetAllMeals()

    res.status(200).json({
      message: 'Meal Plans fetched successfully',
      meals: mealPlans,
    })
    logger.info('Meal Plans fetched successfully')
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteMeal
 * @description Controller to delete a meal plan
 */
export const DeleteMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    await mealService.DeleteMeal(id)

    res.status(203).json({
      message: 'Meal Plan successfully deleted',
    })
    logger.info('Meal Plan successfully deleted')
  } catch (error) {
    next(error)
  }
}
