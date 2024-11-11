import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const deleteShoppingList = async (shoppingListId: string) => {
    const response = await api.delete(`/calendar/shopping-list/${shoppingListId}`);
    return response.data;
}

export function useShoppingListDeleteMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteShoppingList,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['shoppinglist-data']);
        }
    });

    return mutate;
}
