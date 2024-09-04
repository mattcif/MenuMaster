import { useQuery } from '@tanstack/react-query';
import { request } from '../helpers/axios_helper'; // Ajustado o caminho conforme solicitado
import { ShoppingList } from '../interface/ShoppingList';

const API_URL = '/menu-master/calendar/shopping-list';

const fetchData = async (): Promise<ShoppingList[]> => {
    const response = await request('GET', API_URL);
    return response.data;
}

export function useShoppingList() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['shoppinglist-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data
    }
}
