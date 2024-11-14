import React, { useState } from 'react';
import { Card } from '../../components/card/card';
import { useRecipeData } from '../../hooks/useRecipeData';
import { DeleteRecipe } from '../recipe-delete/deleteRecipe';
import styles from './RecipeList.module.css';
import toast from "react-hot-toast";
import { useRecipeDeleteMutate } from '../../hooks/useDeleteRecipe';

export function RecipeList() {
  const { data } = useRecipeData();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const { mutate: deleteRecipe } = useRecipeDeleteMutate();

  const handleOpenDeleteModal = (recipeId: string) => {
    setSelectedRecipeId(recipeId); // Abre o modal com o ID da receita selecionada
  };

  const handleConfirmDelete = () => {
    if (selectedRecipeId) {
      deleteRecipe(selectedRecipeId, {
        onSuccess: () => {
          toast.success("Receita deletada com sucesso!");
          setSelectedRecipeId(null); // Fecha o modal após a exclusão
        },
        onError: () => {
          toast.error("Erro ao deletar a receita.");
        }
      });
    }
  };

  const handleCancelDelete = () => {
    setSelectedRecipeId(null); // Fecha o modal sem deletar
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className={styles.containerRl}>
      <h1>Minhas Receitas</h1>
      <div className={styles.cardGridRl}>
        {data?.map(recipeData => (
          <Card
            key={recipeData.id}
            id={recipeData.id!}
            name={recipeData.name}
            preparationMethod={truncateText(recipeData.preparationMethod, 50)}
            image={recipeData.image}
            onDelete={handleOpenDeleteModal} // Passa a função para abrir o modal de deleção
          />
        ))}
      </div>

      {selectedRecipeId && (
        <DeleteRecipe
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
