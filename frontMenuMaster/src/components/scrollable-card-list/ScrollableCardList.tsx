import React, { useState } from 'react';
import CardRecipeHomePage from '../card-recipe-homepage/CardRecipeHomePage';
import { Col, Container, Row } from 'react-bootstrap';
import './ScrollableCardList.css';
import { useRecipeData } from '../../hooks/useRecipeData';
import SearchBar from '../SearchBar/SearchBar';

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
        <Container fluid >

            <div className="d-flex justify-content-center align-items-center scroll-container" style={{ }}>

                <Row>
                    <Col>
                        <div className="fixed-search-bar">
                            <SearchBar onSearch={setSearchTerm} />

                        </div>

                        <div className="scrollable-card-list">

                            {filteredRecipes.length > 0 ? (
                                filteredRecipes?.map(recipeData =>
                                    <CardRecipeHomePage
                                        key={recipeData.id}
                                        id={recipeData.id!}
                                        name={recipeData.name}
                                        image={recipeData.image} />
                                )

                            ) : (
                                <h1>Nenhuma Receita Encontrada :'</h1>
                            )
                            }


                        </div>

                    </Col>
                </Row>



            </div>


        </Container>
    );
};

