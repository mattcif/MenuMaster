import { Ingredient } from "./Ingredient"
import { RecipeData } from "./RecipeData"

export interface ShoppingList {
    id: string,
    startDate: string
    endDate: string
    shoppingList: Ingredient[]
    recipeList: RecipeData[]

}