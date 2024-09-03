import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ShoppingListToSave } from "../interface/ShoppingListToSave";

const API_URL = 'http://localhost:8080'

const postData = async (data: ShoppingListToSave): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/menu-master/calendar/shopping-list/create', data) 
    return response;
}

export function useShoppingListMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['shopping-data'])
        }
    })

    return mutate
}

