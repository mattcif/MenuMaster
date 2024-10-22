import { useMutation } from '@tanstack/react-query';
import api from '../services/api'; // Importando o api.js
import { RecipeData } from '../interface/RecipeData';

// Função para atualizar a receita
const updateRecipe = async (data: RecipeData) => {
    const response = await api.put(`/recipe/${data.id}`, data); // URL e dados para o corpo da requisição
    return response.data; // Retorna apenas os dados
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
