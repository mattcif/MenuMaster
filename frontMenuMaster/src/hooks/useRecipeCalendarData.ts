import { useQuery } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; 
import { RecipeDateFullCalendar } from "../interface/RecipeDateFullCalendar";

const fetchData = async (): Promise<RecipeDateFullCalendar[]> => {
    const response = await request(
        'GET', // Método HTTP
        '/menu-master/calendar' // URL
    );
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
