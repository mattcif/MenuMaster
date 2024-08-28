import React, { useEffect } from 'react';
import { useRecipeDeleteMutate } from '../../hooks/useDeleteRecipe';
import './delete-recipe.css';

interface DeleteRecipeProps {
    recipeId: string;
    closeModal: () => void;
}

export function DeleteRecipe({ recipeId, closeModal }: DeleteRecipeProps) {
    const { mutate, isPending, isError, isSuccess } = useRecipeDeleteMutate();

    const handleDelete = () => {
        mutate(recipeId);
    };

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess, closeModal]);

    return (
        <div className="delete-recipe-overlay">
            <div className="delete-recipe-body">
                <h2>Are you sure you want to delete this recipe?</h2>
                {isPending && <p>Deleting...</p>}
                {isError && <p>Error occurred while deleting the recipe.</p>}
                <div className="delete-recipe-buttons">
                    <button onClick={handleDelete} disabled={isPending}>Yes, delete it</button>
                    <button onClick={closeModal}>No, cancel</button>
                </div>
            </div>
        </div>
    );
}
