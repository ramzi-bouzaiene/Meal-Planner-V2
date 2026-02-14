import User from '../models/User'

export const CheckUser = async (userId: string): Promise<boolean> => {
  try {
    return !!(await User.exists({ _id: userId }))
  } catch (error) {
    console.error('Error checking user existence:', error.message)
    return false
  }
}
