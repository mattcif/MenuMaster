import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; 
import { RecipeDate } from "../interface/RecipeDate";

const postData = async (_data: RecipeDate) => {
    const response = await request(
        'POST', // Método HTTP
        '/menu-master/calendar/create', // URL
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
