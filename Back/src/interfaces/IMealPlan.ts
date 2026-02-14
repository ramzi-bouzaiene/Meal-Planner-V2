import { DayEnum } from '../enums/DaysOfWeek'
import { MealType } from '../enums/MealType'

export interface RecipeDetails {
  title: string
  image: string
  sourceUrl: string
}

export interface RecipeInMealPlan {
  recipeId: string
  day: DayEnum
  mealType: MealType
  recipeDetails: RecipeDetails
}

export interface IMealPlan {
  userId: string | null
  week: string
  recipes: RecipeInMealPlan[]
}
