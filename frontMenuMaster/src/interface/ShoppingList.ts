import { Ingredient } from "./Ingredient"

export interface ShoppingList {
    id: string,
    startDate: string
    endDate: string
    shoppingList: Ingredient[]
}