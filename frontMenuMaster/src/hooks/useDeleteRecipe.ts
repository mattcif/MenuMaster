import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteRecipe = async (recipeId: string): AxiosPromise<any> => {
    const response = await axios.delete(`${API_URL}/menu-master/recipe/${recipeId}`);
    return response;
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
