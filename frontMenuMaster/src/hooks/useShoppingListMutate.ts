import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api'; // Importando o api.js
import { ShoppingListToSave } from '../interface/ShoppingListToSave';

const API_URL = '/calendar/shopping-list/create';

const postData = async (data: ShoppingListToSave) => {
    const response = await api.post(API_URL, data); // Usando o método post do api.js
    return response.data; // Retornando os dados da resposta
};

export function useShoppingListMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['shopping-data']); // Invalida a consulta após a mutação
        }
    });

    return mutate; // Retorna a função mutate
}
