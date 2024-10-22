import { useQuery } from '@tanstack/react-query';
import api from '../services/api'; // Importando o api.js
import { ShoppingList } from '../interface/ShoppingList';

const API_URL = '/calendar/shopping-list';

const fetchData = async (): Promise<ShoppingList[]> => {
    const response = await api.get(API_URL); // Usando o método get do api.js
    return response.data; // Retornando apenas os dados
}

export function useShoppingList() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['shoppinglist-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data // Mantém a estrutura original
    }
}
