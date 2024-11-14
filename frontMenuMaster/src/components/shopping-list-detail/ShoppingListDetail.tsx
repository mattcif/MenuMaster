import { useParams } from "react-router-dom";
import { useShoppingListDetail } from "../../hooks/useShoppingListDetail";
import styles from "./ShoppingListDetail.module.css";
import { Carousel, Container, Image } from "react-bootstrap";
import { useState } from "react";

export function ShoppingListDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useShoppingListDetail(id || "");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading shopping list details.</p>;

  // Certifique-se de que data e shoppingList estão definidos antes de tentar usar map
  if (!data || !data.shoppingList) return <p>No shopping list details available.</p>;

  console.log(data);

  return (
    <Container className={`${styles.container} ${styles.customStyle} custom-font`}>
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>Lista de Compras</h1>
          <h3>Dia de Início: {data.startDate} | Dia Final: {data.endDate}</h3>
        </div>


        {data.recipeList.length > 0 && (
          <Carousel className={styles.fixedCarousel}>
            {data.recipeList.map((recipe) => (
              <Carousel.Item key={recipe.id}>
                <Image src={recipe.image} alt={recipe.name} rounded style={{ width: "600px", height: "400px", objectFit: "cover" }} />
                <Carousel.Caption>
                  <h3 className="text-black mb-4">{recipe.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        <div className={styles.ingredientListContainer}>
          <h3>Lista de Compras</h3>
          <ul>
            {data.shoppingList.map((item) => (
              <li key={item.id}>
                <p>{item.name} - {item.quantity} {item.typeQuantity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
