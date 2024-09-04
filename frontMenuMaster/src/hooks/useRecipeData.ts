// userRecipeData.ts

import { AxiosPromise } from "axios";
import { RecipeData } from "../interface/RecipeData";
import { useQuery } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; // Importe a função request

const API_URL = '/menu-master/recipe'; // O baseURL já está configurado no axios_helper.ts

const fetchData = async (): AxiosPromise<RecipeData[]> => {
    // Utilize a função request para realizar a requisição
    return request('GET', API_URL);
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
