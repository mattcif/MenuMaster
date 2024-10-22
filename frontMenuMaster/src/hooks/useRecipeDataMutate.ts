import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js
import { RecipeData } from "../interface/RecipeData";

const postData = async (data: RecipeData) => {
    const response = await api.post('/recipe/register', data); // URL e dados para o corpo da requisição
    return response.data; // Retorna apenas os dados
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
