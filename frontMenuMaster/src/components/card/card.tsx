import React, { useState } from 'react';
import styles from './card.module.css';
import { useNavigate } from 'react-router-dom';
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface CardProps {
    id: string;
    name: string;
    preparationMethod: string;
    image?: string;
    onDelete: (id: string) => void;
}

export function Card({ id, name, preparationMethod, image, onDelete }: CardProps) {
    const navigate = useNavigate();
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleChooseDateClick = () => {
        setIsCalendarVisible(prev => !prev);
    };

    const handleDateSelect = (date: Date) => {
        alert(`Date selected: ${date.toDateString()}`);
        setIsCalendarVisible(false); // Oculta o calendário após a seleção
    };

    const handleDetailClick = () => {
        navigate(`/recipe/${id}`);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <Container className={styles.containerFluidRc}>
            <div className={styles.cardRc}>
                <div className={styles.imgContainerRc}>
                    <img src={image} alt={name} />
                </div>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="recipe-title-tooltip">{name}</Tooltip>}
                >
                    <h3 className={styles.truncateRc}>{name}</h3>
                </OverlayTrigger>
                <div className={styles.cardButtonsRc}>
                    <Button onClick={handleDetailClick}>Ver mais</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Excluir</Button>
                </div>
            </div>
        </Container>
    );
}
