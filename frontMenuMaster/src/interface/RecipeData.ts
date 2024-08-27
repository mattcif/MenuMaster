import { Ingredient } from "./Ingredient";

export interface RecipeData {
    id?: string; 
    name: string;
    preparationMethod: string;
    image?: string;
    ingredients: Ingredient[];
}