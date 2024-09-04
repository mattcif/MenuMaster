import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; // Ajustado o caminho conforme solicitado
import { RecipeData } from "../interface/RecipeData";

const postData = async (data: RecipeData) => {
    const response = await request(
        'POST', // Método HTTP
        '/menu-master/recipe/register', // URL
        data // Dados para o corpo da requisição
    );
    return response;
}

export function useRecipeDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['recipe-data']);
        }
    });

    return mutate;
}
