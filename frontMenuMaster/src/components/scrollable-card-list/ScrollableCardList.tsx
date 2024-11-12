import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './ScrollableCardList.module.css'; // Importando o módulo CSS
import { useRecipeData } from '../../hooks/useRecipeData';
import SearchBar from '../SearchBar/SearchBar';
import CardRecipeHomePage from '../card-recipe-homepage/CardRecipeHomePage';

interface CardRecipe {
    id: string;
    name: string;
    image?: string;
}

export function ScrollableCardList() {
    const { data: recipes, isLoading, isError } = useRecipeData();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <p>Loading...</p>;
    if (isError || !recipes) return <p>Failed to load recipes.</p>;

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <div className={`${styles.scrollContainer}`}>

                <Row>
                    <Col>
                        <div className={styles.fixedSearchBar}>
                            <SearchBar onSearch={setSearchTerm} />
                        </div>

                        <div className={styles.scrollableCardList}>
                            {filteredRecipes.length > 0 ? (
                                filteredRecipes.map(recipeData => (
                                    <CardRecipeHomePage
                                        key={recipeData.id}
                                        id={recipeData.id!}
                                        name={recipeData.name}
                                        image={recipeData.image} />
                                ))
                            ) : (
                                <h1>Nenhuma Receita Encontrada :'</h1>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
