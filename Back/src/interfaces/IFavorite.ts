export interface RecipeDetails {
  title: string
  image: string
  sourceUrl: string
}

export interface IFavorite {
  userId: string | null
  recipeId: string
  recipeDetails: RecipeDetails
}
