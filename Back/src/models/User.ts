import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces/IUser'

interface User extends IUser, Document {}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite',
      },
    ],
    mealPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MealPlan',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<User>('User', userSchema)
