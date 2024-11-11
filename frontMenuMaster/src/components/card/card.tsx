import React, { useState } from 'react';
import "./card.css";
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
        setIsCalendarVisible(false);
    };

    const handleDetailClick = () => {
        navigate(`/recipe/${id}`);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center">
            <div className="card">
                <div className="img-container">
                    <img src={image} alt={name} />
                </div>
                <div className="title-container truncate" >

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="recipe-title-tooltip">{name}</Tooltip>}
                    >
                        <h3 className='truncate'>{name}</h3>

                    </OverlayTrigger>
                </div>
                <div className="card-buttons">
                    <Button onClick={handleDetailClick}>Ver mais</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>Excluir</Button>
                </div>
            </div>
        </Container>
    );
}
