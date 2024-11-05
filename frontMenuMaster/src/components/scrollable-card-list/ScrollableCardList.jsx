import React from 'react';
import CardRecipeHomePage from '../card-recipe-homepage/CardRecipeHomePage'; // Assumindo que este é o componente do card
import { Container } from 'react-bootstrap';
import './ScrollableCardList.css';

const ScrollableCardList = () => {
    // Simulando uma lista de receitas (use dados reais conforme necessário)
    const recipes = Array(6).fill({ title: "Recipe Title", image: "/images/xlombada.jpg" });

    return (
        <Container className="scrollable-card-list">
            {recipes.map((recipe, index) => (
                <CardRecipeHomePage key={index} title={recipe.title} image={recipe.image} />
            ))}
        </Container>
    );
};

export default ScrollableCardList;
