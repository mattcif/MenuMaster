import React, { useState } from 'react';
import { Card } from '../../components/card/card';
import { useRecipeData } from '../../hooks/useRecipeData';
import { CreateModal } from '../create-modal/createModal';
import './recipeList.css'

export function RecipeList() {
  const { data } = useRecipeData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
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
          />)}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button className="newIngredientbtn" onClick={handleOpenModal}>novo</button>
    </div>
  );
}
