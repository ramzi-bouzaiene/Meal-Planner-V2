import mongoose, { Document, Schema } from 'mongoose'
import { IMealPlan } from '../interfaces/IMealPlan'
import { DayEnum } from '../enums/DaysOfWeek'
import { MealType } from '../enums/MealType'

interface MealPlan extends IMealPlan, Document {}

const mealPlanSchema = new Schema<MealPlan>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    week: {
      type: String,
      required: true,
    },
    recipes: [
      {
        recipeId: { type: String, required: true },
        day: {
          type: String,
          enum: Object.values(DayEnum),
          required: true,
        },
        mealType: {
          type: String,
          enum: Object.values(MealType),
          required: true,
        },
        recipeDetails: {
          title: { type: String, required: true },
          image: { type: String },
          sourceUrl: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<MealPlan>('MealPlan', mealPlanSchema)
