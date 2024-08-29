import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useRecipeDataDetails } from "../../hooks/useRecipeDataDetails";
import { IngredientList } from '../../components/ingredient-list/IngredientList'; 
import './recipeDetail.css';
import { AddIngredient } from '../add-ingredient/addIngredient';
import { Ingredient } from '../../interface/Ingredient';
import { useRecipeUpdate } from '../../hooks/useRecipeUpdate';
import { RecipeData } from '../../interface/RecipeData';

export function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: recipe, isLoading, error, refetch } = useRecipeDataDetails(id as string);
    const { mutate: updateRecipe, isPending: isUpdating, isError } = useRecipeUpdate();

    const [isEditing, setIsEditing] = useState(false);
    const [isAddingIngredients, setIsAdding] = useState(false);
    const [editedName, setEditedName] = useState<string>('');
    const [editedImage, setEditedImage] = useState<string>('');
    const [editedPreparationMethod, setEditedPreparationMethod] = useState<string>('');
    const [ingredients, setIngredients] = useState<Ingredient[]>(recipe?.ingredients || []);

    useEffect(() => {
        setIngredients(recipe?.ingredients || []);
    }, [recipe]);

    const handleAddIngredient = (newIngredient: Ingredient) => {
        setIngredients([...ingredients, newIngredient]);
    };

    const handleEditIngredient = (index: number) => {
    };

    const handleSaveIngredient = (index: number, updatedIngredient: Ingredient) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = updatedIngredient;
        setIngredients(updatedIngredients);


    };

    const handleDeleteIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleEditClick = () => {
        if (!isEditing && recipe) {
            setEditedName(recipe.name);
            setEditedImage(recipe.image || '');
            setEditedPreparationMethod(recipe.preparationMethod);
        }
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        const updatedRecipe : RecipeData = {
            id: id as string,
            name: editedName,
            image: editedImage,
            preparationMethod: editedPreparationMethod,
            ingredients: ingredients
        };
        updateRecipe(updatedRecipe, {
            onSuccess: () => {
                refetch();
                setIsEditing(false);
                
            }
        });
    };

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar detalhes da receita</p>;

    return (
        <div className="container">
            <button className="edit-save-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? 'Salvar' : 'Editar'}
            </button>
            <div className="recipe-card-container">
                {isEditing ? (
                    <>
                        <input 
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="edit-recipe-name"
                        />
                        <input 
                            type="text"
                            value={editedImage}
                            onChange={(e) => setEditedImage(e.target.value)}
                            className="edit-recipe-image"
                        />
                        <textarea
                            value={editedPreparationMethod}
                            onChange={(e) => setEditedPreparationMethod(e.target.value)}
                            className="edit-recipe-method"
                        />
                    </>
                ) : (
                    <>
                        <h1>{recipe?.name}</h1>
                        <div className="img-container">
                            {recipe?.image ? (
                                <img src={recipe.image} alt={recipe.name} />
                            ) : (
                                <p>Imagem não disponível.</p>
                            )}
                        </div>
                        <h2>Modo de Preparo</h2>
                        <p>{recipe?.preparationMethod}</p>
                    </>
                )}
            </div>

            <div className="ingredients-container">
                <h2>Ingredientes</h2>
                {recipe?.ingredients && (
                    <IngredientList
                        ingredients={ingredients}
                        onEdit={handleEditIngredient}
                        onSave={handleSaveIngredient}
                        onDelete={handleDeleteIngredient}
                        hideButtons={!isEditing}
                    />
                )}
                <div className="add-ingredient">
                    <button onClick={() => setIsAdding(!isAddingIngredients)}>
                        {isAddingIngredients ? 'Cancelar' : 'Adicionar Ingrediente'}
                    </button>
                    {isAddingIngredients && (
                        <AddIngredient
                            recipeId={id as string}
                            onIngredientAdded={handleAddIngredient}
                        />
                    )}
                </div>
                {isError && <p>Error updating recipe</p>}
                {isUpdating && <p>Updating recipe...</p>}
            </div>
        </div>
    );
}
