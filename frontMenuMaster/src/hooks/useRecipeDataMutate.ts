import axios, { AxiosPromise } from "axios"
import { RecipeData } from "../interface/RecipeData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async (data: RecipeData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/menu-master/recipe/register', data) 
    return response;
}

export function useRecipeDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['recipe-data'])
        }
    })

    return mutate
}