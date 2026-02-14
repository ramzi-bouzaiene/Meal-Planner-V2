import { MealPlan } from '../types/mealPlanTypes'

const API_URL = 'http://localhost:5000/api/mealPlans'

export const addMealPlan = async (
  mealPlanData: MealPlan
): Promise<{ message: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealPlanData),
    })
    if (!response.ok) {
      throw new Error(
        `Error while creating MealPlan. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to create MealPlan: ${error.message}`)
  }
}

export const updateMealPlan = async (
  mealPlanData: MealPlan
): Promise<{ message: string }> => {
  try {
    const response = await fetch(
      `${API_URL}/${mealPlanData._id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlanData),
      }
    )
    if (!response.ok) {
      throw new Error(
        `Error while updating MealPlan. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to update MealPlan: ${error.message}`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllMealPlans = async (): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(
        `Error while fetching MealPlans. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to fetch MealPlans: ${error.message}`)
  }
}

export const deleteMealPlan = async (
  recipeId: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/${recipeId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(
        `Error while deleting MealPlan. Status: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Failed to delete MealPlan: ${error.message}`)
  }
}
