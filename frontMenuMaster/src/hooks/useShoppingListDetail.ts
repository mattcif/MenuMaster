import { useQuery } from '@tanstack/react-query';
import { request } from '../helpers/axios_helper'; 
import { ShoppingList } from '../interface/ShoppingList';

const API_URL = '/menu-master/calendar/shopping-list';

const fetchShoppingListDetail = async (id: string): Promise<ShoppingList> => {
    const response = await request('GET', `${API_URL}/${id}`);
    return response.data;
};

export function useShoppingListDetail(id: string) {
    const query = useQuery({
        queryFn: () => fetchShoppingListDetail(id),
        queryKey: ['shoppinglist-detail', id],
        retry: 2, 
        enabled: !!id, 
    });

    return {
        ...query,
        data: query.data
    };
}
