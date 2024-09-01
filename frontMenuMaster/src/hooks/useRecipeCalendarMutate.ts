import axios, { AxiosPromise } from "axios"
import { RecipeDate } from "../interface/RecipeDate"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080'

const postData = async(_data: RecipeDate): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/menu-master/calendar/create', _data)
    return response;
}

export function useRecipeCalendarMutate() {
    const querryCliente = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            querryCliente.invalidateQueries(['recipe-data'])
        }
    })

    return mutate;
}