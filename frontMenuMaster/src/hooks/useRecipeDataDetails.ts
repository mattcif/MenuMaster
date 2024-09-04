import { useQuery } from "@tanstack/react-query";
import { request } from "../helpers/axios_helper"; 
import { RecipeData } from "../interface/RecipeData";

const fetchData = async (id: string) => {
    const response = await request(
        'GET', // Método HTTP
        `/menu-master/recipe/${id}` // URL
    );
    return response;
}

export function useRecipeDataDetails(id: string) {
    const query = useQuery({
        queryFn: () => fetchData(id),
        queryKey: ['recipe-detail', id],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    };
}
