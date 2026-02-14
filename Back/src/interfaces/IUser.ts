import { Document } from 'mongoose'

export interface IUser extends Document {
  id: string
  username: string
  email: string
  password: string
  favorites: []
  mealPlans: []
}
