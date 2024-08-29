import "./card.css"
import { Ingredient } from "../../interface/Ingredient"
import { useNavigate } from "react-router-dom"
import { DeleteRecipe } from "../recipe-delete/deleteRecipe";
import { useState } from "react";

interface CardProps {
    id: string;
    name: string;
    preparationMethod: string;
    image?: string;
    onDelete: (id: string) => void; 
}

export function Card({ id, name, preparationMethod, image, onDelete }: CardProps) {
    const navigate = useNavigate();

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
                <button className="detail-button" onClick={handleDetailClick}>Detail</button>
                <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
}
