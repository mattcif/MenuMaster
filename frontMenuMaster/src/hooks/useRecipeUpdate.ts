import { useMutation } from '@tanstack/react-query';
import { request } from '../helpers/axios_helper'; // Ajustado o caminho conforme solicitado
import { RecipeData } from '../interface/RecipeData';

// Função para atualizar a receita
const updateRecipe = async (data: RecipeData) => {
    const response = await request(
        'PUT', // Método HTTP
        `/menu-master/recipe/${data.id}`, // URL
        data // Dados para o corpo da requisição
    );
    return response.data;
};

export function useRecipeUpdate() {
    return useMutation({
        mutationFn: updateRecipe,
        retry: 2,
        onError: (error) => {
            console.error('Error updating recipe:', error);
        },
        onSuccess: () => {
            // Aqui você pode invalidar consultas ou atualizar o estado global, se necessário
        }
    });
}
