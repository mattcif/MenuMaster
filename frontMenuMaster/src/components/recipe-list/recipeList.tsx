import React, { useState } from 'react';
import { Card } from '../../components/card/card';
import { useRecipeData } from '../../hooks/useRecipeData';
import { CreateModal } from '../create-modal/createModal';
import { DeleteRecipe } from '../recipe-delete/deleteRecipe';
import './recipeList.css';

export function RecipeList() {
  const { data } = useRecipeData();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="container">
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
