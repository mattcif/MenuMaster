import { useState } from "react";
import { Ingredient } from "../../interface/Ingredient";
import styles from './IngredientList.module.css';

interface IngredientListProps {
    ingredients: Ingredient[];
    onEdit: (index: number) => void;
    onSave: (index: number, updatedIngredient: Ingredient) => void;
    onDelete: (index: number) => void;
    hideButtons?: boolean;
}

export function IngredientList({ ingredients, onEdit, onSave, onDelete, hideButtons = false }: IngredientListProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedIngredient, setEditedIngredient] = useState<Ingredient | null>(null);

    const handleEditClick = (index: number) => {
        if (editingIndex === index) {
            if (editedIngredient) {
                onSave(index, editedIngredient);
            }
            setEditingIndex(null);
        } else {
            setEditingIndex(index);
            setEditedIngredient(ingredients[index]);
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
        <div className={styles.ingredientListContainer}>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index} className={styles.ingredientItem}>
                        <div className={styles.ingredientInfo}>
                            {editingIndex === index ? (
                                <>
                                    <input 
                                        type="number"
                                        value={editedIngredient?.quantity || ''}
                                        onChange={(e) => handleChange('quantity', Number(e.target.value))}
                                        className={styles.editIngredientQuantity}
                                    />
                                    <select 
                                        value={editedIngredient?.typeQuantity} 
                                        onChange={(e) => handleChange('typeQuantity', e.target.value as "G" | "ML" | "UNIT")}
                                        className={styles.editIngredientTypeQuantity}
                                    >
                                        <option value="G">Grams (g)</option>
                                        <option value="ML">Milliliters (ml)</option>
                                        <option value="UNIT">Units</option>
                                    </select>
                                    <input 
                                        type="text"
                                        value={editedIngredient?.name || ''}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className={styles.editIngredientName}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className={styles.ingredientQuantity}>{ingredient.quantity} {ingredient.typeQuantity}</span>
                                    <span className={styles.ingredientName}>{ingredient.name}</span>
                                </>
                            )}
                        </div>

                        {!hideButtons && (
                            <div className={styles.ingredientActions}>
                                <button 
                                    onClick={() => handleEditClick(index)} 
                                    className={editingIndex === index ? styles.saveButton : styles.editButton}
                                >
                                    {editingIndex === index ? "Salvar" : "Editar"}
                                </button>
                                <button 
                                    onClick={() => onDelete(index)} 
                                    className={editingIndex === index ? `${styles.deleteButton} ${styles.saveButton}` : styles.deleteButton}
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
