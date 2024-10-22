import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js
import { Ingredient } from "../interface/Ingredient";

const addIngredientToRecipe = async (data: { recipeId: string; ingredient: Ingredient }) => {
    const response = await api.patch(
        `/recipe/${data.recipeId}/add-ingredient`, 
        data.ingredient
    );
    return response.data;
}

export function useAddIngredient() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: addIngredientToRecipe,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['recipe-data']);
        },
    });

    return mutate;
}
