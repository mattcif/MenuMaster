import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './delete-recipe.css';

interface DeleteRecipeProps {
    onConfirm: () => void;
    onCancel: () => void;
    isPending?: boolean;
    isError?: boolean;
}

export function DeleteRecipe({ onConfirm, onCancel, isPending = false, isError = false }: DeleteRecipeProps) {
    return (
        <div className="delete-recipe-overlay">
            <div className="delete-recipe-modal">
                <h2>Tem certeza de que deseja deletar esta receita?</h2>
                {isPending && <p>Excluindo...</p>}
                {isError && <p>Ocorreu um erro ao excluir a receita.</p>}
                <div className="delete-recipe-buttons">
                    <Button variant="danger" onClick={onConfirm} disabled={isPending}>
                        Sim, deletar
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        Não, cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}
