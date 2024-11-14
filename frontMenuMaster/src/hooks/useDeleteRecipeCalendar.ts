import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js

// Função que realiza a requisição DELETE
const deleteRecipeCalendar = async (id: string) => {
  const response = await api.delete(`/calendar/delete/${id}`);
  return response;
};

export function useDeleteRecipeCalendar() {
  const queryClient = useQueryClient();
  
  // Usando useMutation para a operação de DELETE
  const mutate = useMutation({
    mutationFn: deleteRecipeCalendar,
    onSuccess: () => {
      // Após a exclusão, invalidamos a query relacionada para garantir que os dados sejam atualizados
      queryClient.invalidateQueries(['recipe-calendar']);
    },
    onError: (error: any) => {
      console.error('Erro ao excluir receita do calendário:', error);
    },
  });

  return mutate;
}
