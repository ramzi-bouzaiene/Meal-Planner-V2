import { Favorite } from '../types/favoriteTypes'

const API_URL = 'http://localhost:5000/api/favorites'

export const addFavorite = async (
  favariteData: Favorite
): Promise<{ message: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favariteData),
    })
    if (!response.ok) {
      throw new Error('Error while creating new favorite')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateFavorite = async (
  favariteData: Favorite
): Promise<{ message: string }> => {
  try {
    console.log('service favariteData', favariteData)
    const response = await fetch(`${API_URL}/${favariteData._id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favariteData),
    })
    if (!response.ok) {
      throw new Error('Error while updating favorite ')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getAllFavorites = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Error while getting all favorite')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteFavorite = async (
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
      throw new Error('Error while deleting favorite')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getFavoriteById = async (
  recipeId: string
): Promise<{ favorite: Favorite }> => {
  try {
    const response = await fetch(`${API_URL}/${recipeId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Error while getting favorite details ')
    }
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}
