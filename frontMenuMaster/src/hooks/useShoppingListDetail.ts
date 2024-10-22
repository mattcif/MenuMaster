import { useQuery } from '@tanstack/react-query';
import api from '../services/api'; // Importando o api.js
import { ShoppingList } from '../interface/ShoppingList';

const API_URL = '/calendar/shopping-list';

const fetchShoppingListDetail = async (id: string): Promise<ShoppingList> => {
    const response = await api.get(`${API_URL}/${id}`); // Usando o método get do api.js
    return response.data; // Retornando apenas os dados
};

export function useShoppingListDetail(id: string) {
    const query = useQuery({
        queryFn: () => fetchShoppingListDetail(id),
        queryKey: ['shoppinglist-detail', id],
        retry: 2,
        enabled: !!id, // Habilita a consulta somente se o id estiver presente
    });

    return {
        ...query,
        data: query.data // Mantém a estrutura original
    };
}
