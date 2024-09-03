import axios, { AxiosPromise } from "axios";
import { ShoppingList } from "../interface/ShoppingList";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchShoppingListDetail = async (id: string): AxiosPromise<ShoppingList> => {
    return axios.get(`${API_URL}/menu-master/calendar/shopping-list/${id}`);
};

export function useShoppingListDetail(id: string) {
    const query = useQuery({
        queryFn: () => fetchShoppingListDetail(id),
        queryKey: ['shoppinglist-detail', id],
        retry: 2, 
        enabled: !!id, 
    });

    return {
        ...query,
        data: query.data?.data, 
    };
}