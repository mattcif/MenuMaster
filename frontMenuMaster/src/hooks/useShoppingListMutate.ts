import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../helpers/axios_helper'; 
import { ShoppingListToSave } from '../interface/ShoppingListToSave';

const API_URL = '/menu-master/calendar/shopping-list/create';

const postData = async (data: ShoppingListToSave) => {
    const response = await request('POST', API_URL, data);
    return response.data;
};

export function useShoppingListMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['shopping-data']);
        }
    });

    return mutate;
}
