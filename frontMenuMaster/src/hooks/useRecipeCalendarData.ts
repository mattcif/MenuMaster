import { useQuery } from "@tanstack/react-query";
import api from "../services/api"; // Importando o api.js
import { RecipeDateFullCalendar } from "../interface/RecipeDateFullCalendar";

const fetchData = async (): Promise<RecipeDateFullCalendar[]> => {
    const response = await api.get('/calendar');
    return response.data;
}

export function useRecipeCalendarData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['recipe-date'],
        retry: 2
    });

    return {
        ...query,
        data: query.data
    };
}
