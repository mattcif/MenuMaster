import { useState } from "react";
import { Ingredient } from "../../interface/Ingredient";
import "./ingredientList.css"

interface IngredientListProps {
    ingredients: Ingredient[];
    onEdit: (index: number) => void;
    onSave: (index: number, updatedIngredient: Ingredient) => void;
    onDelete: (index: number) => void;
}

interface IngredientListProps {
    ingredients: Ingredient[];
    onEdit: (index: number) => void;
    onSave: (index: number, updatedIngredient: Ingredient) => void; // Passa o ingrediente atualizado ao salvar
    onDelete: (index: number) => void;
    hideButtons?: boolean
}

export function IngredientList({ ingredients, onEdit, onSave, onDelete, hideButtons = false }: IngredientListProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedIngredient, setEditedIngredient] = useState<Ingredient | null>(null); // Estado para o ingrediente editado

    const handleEditClick = (index: number) => {
        if (editingIndex === index) {
            if (editedIngredient) {
                onSave(index, editedIngredient);
            }
            setEditingIndex(null); // Volta o botão para "Editar" (verde)
        } else {
            setEditingIndex(index);
            setEditedIngredient(ingredients[index]); // Inicializa o estado com o ingrediente atual
            onEdit(index);
        }
    };

    const handleChange = (field: keyof Ingredient, value: string | number) => {
        if (editedIngredient) {
            setEditedIngredient({
                ...editedIngredient,
                [field]: value
            });
        }
    };

    return (
        <div className="ingredient-list-container">
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                        <div className="ingredient-info">
                            {editingIndex === index ? (
                                <>
                                    {/* Campo para editar quantidade */}
                                    <input 
                                        type="number"
                                        value={editedIngredient?.quantity || ''}
                                        onChange={(e) => handleChange('quantity', Number(e.target.value))}
                                        className="edit-ingredient-quantity"
                                    />

                                    {/* Campo para selecionar o tipo de quantidade */}
                                    <select 
                                        value={editedIngredient?.typeQuantity} 
                                        onChange={(e) => handleChange('typeQuantity', e.target.value as "G" | "ML" | "UNIT")}
                                        className="edit-ingredient-typeQuantity"
                                    >
                                        <option value="G">Grams (g)</option>
                                        <option value="ML">Milliliters (ml)</option>
                                        <option value="UNIT">Units</option>
                                    </select>

                                    {/* Campo para editar o nome do ingrediente */}
                                    <input 
                                        type="text"
                                        value={editedIngredient?.name || ''}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="edit-ingredient-name"
                                    />
                                </>
                            ) : (
                                <>
                                    {/* Exibição normal dos ingredientes */}
                                    <span className="ingredient-quantity">{ingredient.quantity} {ingredient.typeQuantity}</span>
                                    <span className="ingredient-name">{ingredient.name}</span>
                                </>
                            )}
                        </div>
                        
                        {!hideButtons && (
                            <div className="ingredient-actions">
                                {/* Botão de editar ou salvar */}
                                <button 
                                    onClick={() => handleEditClick(index)} 
                                    className={editingIndex === index ? "save-button" : "edit-button"}
                                >
                                    {editingIndex === index ? "Salvar" : "Editar"}
                                </button>
                                {/* Botão de excluir, desabilitado se estiver no modo de edição */}
                                <button 
                                    onClick={() => onDelete(index)} 
                                    className={editingIndex === index ? "delete-button save-button" : "delete-button"}
                                    disabled={editingIndex === index}
                                >
                                    Excluir
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}