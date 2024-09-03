import axios, { AxiosPromise } from "axios";
import { ShoppingList } from "../interface/ShoppingList";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<ShoppingList[]> => {
    const response = axios.get(API_URL + '/menu-master/calendar/shopping-list') // primeiro parametro é a url e o outro é o body
    return response;
}

export function useShoppingList() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['shoppinglist-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}