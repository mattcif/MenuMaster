import { useState } from "react";
import { Ingredient } from "../../interface/Ingredient";
import { Input } from "./createModal"

interface InputIngredientProps {
    ingredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
}

const inputIngredient = ({ingredients, setIngredients}: InputIngredientProps) => {
    const [ingredientName, setIngredientName] = useState("")
    const [quantity, setQuantity] = useState<number>(0);
    const [typeQuantity, setTypeQuantity] = useState<"G" | "ML" | "UNIT">("G");

    const addIngredient = () => {
        if (ingredientName && quantity > 0) {
            const newIngredient: Ingredient = {
                name: ingredientName,
                quantity: quantity,
                typeQuantity: typeQuantity,
            }
            setIngredients([...ingredients, newIngredient]); 
            setIngredientName(""); 
            setQuantity(0);
            setTypeQuantity("G");
        }
    }

    return (
        <div>
            <Input label="Ingredient Name" value={ingredientName} updateValue={setIngredientName}/>
            <Input label="Quantity" value={quantity} updateValue={setQuantity}/>
            <label>Type</label>
            <select value={typeQuantity} onChange={(event) => setTypeQuantity(event.target.value as "G" | "ML" | "UNIT")}>
                <option value={"G"}>Grams (g)</option>
                <option value={"ML"}>Milliliters (ml)</option>
                <option value={"UNIT"}>Units</option>
            </select>
            <button type="button" onClick={addIngredient}>Add Ingredient</button>

            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} - {ingredient.quantity} {ingredient.typeQuantity}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default inputIngredient;