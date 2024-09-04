import { AxiosPromise } from "axios";
import { Ingredient } from "../interface/Ingredient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; // Ajuste o caminho conforme necessário

const addIngredientToRecipe = async (data: { recipeId: string; ingredient: Ingredient}): AxiosPromise<any> => {
    const response = await request(
        'PATCH', // Método HTTP
        `/menu-master/recipe/${data.recipeId}/add-ingredient`, // URL
        data.ingredient // Corpo da requisição
    );
    return response;
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
