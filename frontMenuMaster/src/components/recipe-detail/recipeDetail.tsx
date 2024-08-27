import { useParams } from "react-router-dom"
import { useRecipeDataDetails } from "../../hooks/useRecipeDataDetails";

export function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: recipe, isLoading, error } = useRecipeDataDetails(id as string);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading recipe details</p>;

    return (
        <div>
            <h1>{recipe?.name}</h1>
            <p>{recipe?.preparationMethod}</p>
            {recipe?.image ? (
                <img src={recipe.image} alt={recipe.name} />
            ) : (
                <p>Imagem não disponível.</p>
            )}
            <ul>
                {recipe?.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} - {ingredient.quantity} {ingredient.typeQuantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

