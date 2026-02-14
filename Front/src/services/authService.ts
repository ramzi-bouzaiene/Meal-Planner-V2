import { LoginData, RegisterData } from '../types/authTypes'

const API_URL = 'http://localhost:5000/api/auth'

export const loginUser = async (
  loginData: LoginData
): Promise<{ accessToken: string; userId: string }> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const registerUser = async (
  registerData: RegisterData
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  } catch (error) {
    throw new Error('Registration failed: ' + error.message)
  }
}

export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
