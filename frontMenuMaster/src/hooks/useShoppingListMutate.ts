import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api'; // Importando o api.js
import { ShoppingListToSave } from '../interface/ShoppingListToSave';

const API_URL = '/calendar/shopping-list/create';

const postData = async (data: ShoppingListToSave) => {
    try {
        const response = await api.post(API_URL, data); 
        return response.data; 
    } catch (error: any) {
        if (error.response) {
            // Caso haja uma resposta do servidor
            console.error('Erro no servidor:', error.response.data); // Exibe a resposta do erro do servidor
            console.error('Status do erro:', error.response.status); // Exibe o status do erro (400, 404, etc.)
        } else if (error.request) {
            // Se a requisição foi feita, mas não houve resposta
            console.error('Erro de requisição:', error.request);
        } else {
            // Erro desconhecido, provavelmente algo no código
            console.error('Erro desconhecido:', error.message);
        }
        throw error; // Lança o erro para ser tratado na camada superior
    }
};

export function useShoppingListMutate() {
    const queryClient = useQueryClient();
    
    // Usando o hook de mutação do React Query
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2, // Tentativas em caso de falha
        onSuccess: (data) => {
            queryClient.invalidateQueries(['shopping-data']); 
            return data;
        }
    });

    return mutate; // Retorna a função mutate
}
