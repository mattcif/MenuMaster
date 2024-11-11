import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/card';
import { useRecipeData } from '../../hooks/useRecipeData';
import { CreateModal } from '../create-modal/createModal';
import { DeleteRecipe } from '../recipe-delete/deleteRecipe';
import './recipeList.css';
import RecipeCalendar  from "../calendar/Calendar"
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
    <div className="container custom-font">


      <h1>Receitas</h1>
      <div className='card-grid'>
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