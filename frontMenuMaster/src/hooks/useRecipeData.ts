import { AxiosPromise } from "axios";
import { RecipeData } from "../interface/RecipeData";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api"; // Importe a instância do Axios configurada no api.js

const API_URL = '/recipe';

const fetchData = async (): AxiosPromise<RecipeData[]> => {
    // Agora, utilizamos a instância do api.js para fazer a requisição
    return api.get(API_URL);
}

export function useRecipeData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['recipe-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}
