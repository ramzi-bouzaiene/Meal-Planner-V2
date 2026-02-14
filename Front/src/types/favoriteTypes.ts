export interface RecipeDetails {
  title: string
  image: string
  sourceUrl: string
}

export interface Favorite {
  _id?: string
  userId: string | null
  recipeId: string
  recipeDetails: RecipeDetails
}
