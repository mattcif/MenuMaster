import axios, { AxiosPromise } from "axios"
import { RecipeData } from "../interface/RecipeData"
import { useQuery } from "@tanstack/react-query"



const API_URL = 'http://localhost:8080'

const fetchData = async (id: string): AxiosPromise<RecipeData> => {
    const response = axios.get(`${API_URL}/menu-master/recipe/${id}`)
    return response;
}

export function useRecipeDataDetails(id: string) {
    const query = useQuery({
        queryFn: () => fetchData(id),
        queryKey: ['recipe-detail', id],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    };
}