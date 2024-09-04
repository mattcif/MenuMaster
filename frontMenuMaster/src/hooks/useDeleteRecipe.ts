import { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; 

const deleteRecipe = async (recipeId: string): AxiosPromise<any> => {
    const response = await request(
        'DELETE', 
        `/menu-master/recipe/${recipeId}` 
    );
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
