import React, { useState } from 'react';
import { useAddIngredient } from '../../hooks/useAddIngredient';
import { Ingredient } from '../../interface/Ingredient';

interface AddIngredientProps {
    recipeId: string;
    onIngredientAdded: (newIngredient: Ingredient) => void; // Adiciona a propriedade
}

export function AddIngredient({ recipeId, onIngredientAdded }: AddIngredientProps) {
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [typeQuantity, setTypeQuantity] = useState<'G' | 'ML' | 'UNIT'>('G');
    const { mutate: addIngredient, isPending, isError } = useAddIngredient();

    const handleAddIngredient = () => {
        if (ingredientName && quantity > 0) {
            const newIngredient: Ingredient = {
                name: ingredientName,
                quantity: quantity,
                typeQuantity: typeQuantity,
            };
            addIngredient({ recipeId, ingredient: newIngredient });
            onIngredientAdded(newIngredient); // Notifica o pai
            setIngredientName('');
            setQuantity(0);
            setTypeQuantity('G');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                placeholder="Ingredient Name"
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantity"
            />
            <select
                value={typeQuantity}
                onChange={(e) => setTypeQuantity(e.target.value as 'G' | 'ML' | 'UNIT')}
            >
                <option value="G">Grams (g)</option>
                <option value="ML">Milliliters (ml)</option>
                <option value="UNIT">Units</option>
            </select>
            <button onClick={handleAddIngredient} disabled={isPending}>
                Add Ingredient
            </button>
            {isError && <p>Error adding ingredient</p>}
        </div>
    );
}