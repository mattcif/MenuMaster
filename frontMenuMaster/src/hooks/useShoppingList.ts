import { useQuery } from '@tanstack/react-query';
import api from '../services/api'; 
import { ShoppingList } from '../interface/ShoppingList';

const API_URL = '/calendar/shopping-list';

const fetchData = async (): Promise<ShoppingList[]> => {
    const response = await api.get(API_URL); 
    return response.data
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
