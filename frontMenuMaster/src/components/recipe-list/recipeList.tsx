import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/card';
import { useRecipeData } from '../../hooks/useRecipeData';
import { CreateModal } from '../create-modal/createModal';
import { DeleteRecipe } from '../recipe-delete/deleteRecipe';
import styles from './RecipeList.module.css'; // Importando o módulo CSS
import RecipeCalendar from "../calendar/Calendar";
import ShoppingListInterval from '../shopping-list-interval/ShoppingListInterval';

export function RecipeList() {
  const { data } = useRecipeData();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const handleOpenDeleteModal = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className={styles.containerRl}>
      <h1>Receitas</h1>
      <div className={styles.cardGridRl}>
        {data?.map(recipeData => 
          <Card
            key={recipeData.id}
            id={recipeData.id!}
            name={recipeData.name}
            preparationMethod={truncateText(recipeData.preparationMethod, 50)}
            image={recipeData.image}
            onDelete={handleOpenDeleteModal} // Passa a função para abrir o modal de deleção
          />
        )}
      </div>
    </div>
  );
}
