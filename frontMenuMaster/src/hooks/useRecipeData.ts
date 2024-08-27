import axios, { AxiosPromise } from "axios"
import { RecipeData } from "../interface/RecipeData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<RecipeData[]> => {
    const response = axios.get(API_URL + '/menu-master/recipe') // primeiro parametro é a url e o outro é o body
    return response;
}

export function useRecipeData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['recipe-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}