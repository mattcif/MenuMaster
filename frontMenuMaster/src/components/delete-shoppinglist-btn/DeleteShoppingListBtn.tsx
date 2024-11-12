import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useShoppingListDeleteMutate } from '../../hooks/useDeleteShoppingList';
import styles from './DeleteShoppingListBtn.module.css';  // Importando o módulo CSS

interface DeleteShoppingListBtnProps {
  shoppingListId: string;
}

export const DeleteShoppingListBtn: React.FC<DeleteShoppingListBtnProps> = ({ shoppingListId }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { mutate, isPending, isSuccess } = useShoppingListDeleteMutate();

  const handleConfirmDeleteBtnClick = () => {
    mutate(shoppingListId);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsContentVisible(false);
    }
  }, [isSuccess]);

  const handleCancelDeleteBtnClick = () => {
    setIsContentVisible(false);
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <Container className={`${styles.customStyle} ${styles.customFont}`}>
      {!isContentVisible && (
        <Button variant="danger" onClick={toggleContentVisibility}>Deletar</Button>
      )}

      {isContentVisible && (
        <div className={styles.miniDeleteContainerDl}>
          <div className={styles.miniDeleteHeaderDl}>
            <h1>Tem Certeza que deseja deletar a lista de compras?</h1>
          </div>
          <div className={styles.buttonsDl}>
            <Button variant="success" onClick={handleConfirmDeleteBtnClick}>Sim</Button>
            <Button variant="danger" onClick={handleCancelDeleteBtnClick}>Cancelar</Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DeleteShoppingListBtn;
