import React, { useState } from 'react';
import "./card.css";
import { useNavigate } from 'react-router-dom';
import { MiniCalendar } from '../calendar-mini/MiniCalendar';

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
        // Lógica para lidar com a data selecionada
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
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <h3>{preparationMethod}</h3>
            <div className="card-buttons">
                <button className="choose-date" onClick={handleChooseDateClick}>
                    Choose Date
                </button>
                <button className="detail-button" onClick={handleDetailClick}>
                    Detail
                </button>
                <button className="delete-button" onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>
            {isCalendarVisible && (
                <div className="calendar-container">
                    <MiniCalendar closeCalendar={handleChooseDateClick} onDateSelect={handleDateSelect} recipeName={name} recipeId={id} />
                </div>
            )}
        </div>
    );
}
