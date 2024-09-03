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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIntervalOpen, setIsIntervalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);




  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleOpenDeleteModal = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  const handleCloseDeleteModal = () => {
    setSelectedRecipeId(null);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const closeInterval = () => {
    setIsIntervalOpen(false);
  };


  return (
    <div className="container">
        <RecipeCalendar/>

        <div>
      <button onClick={() => setIsIntervalOpen(true)}>Abrir Intervalo de Datas</button>
      {isIntervalOpen && (
        <ShoppingListInterval 
          onIntervalSelect={(startDate, endDate) => {
            console.log('Intervalo Selecionado:', startDate, endDate);
          }} 
          closeInterval={closeInterval} // Passa a função corretamente aqui
        />
      )}
    </div>

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
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      {selectedRecipeId && (
        <DeleteRecipe 
          recipeId={selectedRecipeId} 
          closeModal={handleCloseDeleteModal} 
        />
      )}
      <button className="newIngredientbtn" onClick={handleOpenModal}>Novo</button>
    </div>
  );
}
