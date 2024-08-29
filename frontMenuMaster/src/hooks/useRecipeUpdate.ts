import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { RecipeData } from '../interface/RecipeData'; 

const API_URL = 'http://localhost:8080';

// Função para atualizar a receita
const updateRecipe = async (data: RecipeData) => {
    const response = await axios.put(`${API_URL}/menu-master/recipe/${data.id}`, data);
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
            
        }
    });
}
