import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RecipeDateFullCalendar } from "../interface/RecipeDateFullCalendar";

// URL da API
const API_URL = 'http://localhost:8080';

const fetchData = async (): Promise<RecipeDateFullCalendar[]> => {
    const response = await axios.get<RecipeDateFullCalendar[]>(API_URL + '/menu-master/calendar');
    return response.data; 
};

export function useRecipeCalendarData() {
    const query = useQuery<RecipeDateFullCalendar[], Error>({
        queryFn: fetchData,
        queryKey: ['recipe-date'],
        retry: 2,
    });

    return {
        ...query,
        data: query.data || [] 
    };
}