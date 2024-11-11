import React, { useEffect, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import './delete-shopping-list-btn.css';
import { RecipeDate } from '../../interface/RecipeDate';
import { useRecipeCalendarMutate } from '../../hooks/useRecipeCalendarMutate';
import { Button, Container, Form } from 'react-bootstrap';

import { AiOutlineClear } from "react-icons/ai";
import { useShoppingListDeleteMutate } from '../../hooks/useDeleteShoppingList';

interface DeleteShoppingListBtnProps {
  shoppingListId: string;

}

export const DeleteShoppingListBtn: React.FC<DeleteShoppingListBtnProps> = ({shoppingListId}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const {mutate , isPending, isSuccess} = useShoppingListDeleteMutate();

  const handleConfirmDeleteBtnClick = () => {
    mutate(shoppingListId);
  }

  useEffect(() => {
    if (isSuccess) {
      setIsContentVisible(false)
    }
  }, [isSuccess])

  const handleCancelDeleteBtnClick = () => {
    setIsContentVisible(false)
  }

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <Container>
      {!isContentVisible && (
        <Button variant="danger" onClick={toggleContentVisibility}>Deletar</Button>
      )}

      {isContentVisible && (
        <div className="mini-delete-container">
          <div className="mini-delete-header">
            <h1>Tem Certeza que deseja deletar a lista de compras?</h1>
          </div>
          <div className="buttons">
            <Button variant="success" onClick={handleConfirmDeleteBtnClick}>Sim</Button>
            <Button variant="danger" onClick={handleCancelDeleteBtnClick}>Cancelar</Button>
          </div>
        </div>
      )}
    </Container>

  );
};

export default DeleteShoppingListBtn;