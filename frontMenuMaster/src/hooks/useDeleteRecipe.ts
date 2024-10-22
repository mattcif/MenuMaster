import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js

const deleteRecipe = async (recipeId: string) => {
    const response = await api.delete(`/recipe/${recipeId}`);
    return response.data;
}

export function useRecipeDeleteMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteRecipe,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['recipe-data']);
        }
    });

    return mutate;
}
