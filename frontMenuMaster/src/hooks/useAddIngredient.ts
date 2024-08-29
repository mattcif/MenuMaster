import axios, { AxiosPromise } from "axios";
import { Ingredient } from "../interface/Ingredient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'


const addIngredientToRecipe = async (data: { recipeId: string; ingredient: Ingredient}) : AxiosPromise<any> => {
    const response = await axios.patch(
        `${API_URL}/menu-master/recipe/${data.recipeId}/add-ingredient`,
        data.ingredient
    );
    return response
}

export function useAddIngredient() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: addIngredientToRecipe,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['recipe-data'])
        },
    })

    return mutate
}