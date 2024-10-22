import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js
import { RecipeDate } from "../interface/RecipeDate";

const postData = async (_data: RecipeDate) => {
    const response = await api.post(
        '/calendar/create', // URL
        _data // Dados
    );
    return response;
}

export function useRecipeCalendarMutate() {
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
