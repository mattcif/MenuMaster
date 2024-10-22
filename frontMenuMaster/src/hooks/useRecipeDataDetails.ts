import { useQuery } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js

const fetchData = async (id: string) => {
    const response = await api.get(`/recipe/${id}`); // URL
    return response.data; // Retorna apenas os dados
}

export function useRecipeDataDetails(id: string) {
    const query = useQuery({
        queryFn: () => fetchData(id),
        queryKey: ['recipe-detail', id],
        retry: 2
    });

    return {
        ...query,
        data: query.data // Não é mais necessário acessar query.data?.data
    };
}
