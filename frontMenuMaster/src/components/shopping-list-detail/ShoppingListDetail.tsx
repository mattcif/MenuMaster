import { useParams } from "react-router-dom";
import { useShoppingListDetail } from "../../hooks/useShoppingListDetail";
import "./shopping-list-detail.css"

export function ShoppingListDetail() {
    const { id } = useParams();
    const { data, isLoading, error } = useShoppingListDetail(id || "");
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading shopping list details.</p>;
  
    // Certifique-se de que data e shoppingList estão definidos antes de tentar usar map
    if (!data || !data.shoppingList) return <p>No shopping list details available.</p>;
  
    return (
      <div>
        <h1>Shopping List Detail</h1>
        <p>Start Date: {data.startDate}</p>
        <p>End Date: {data.endDate}</p>
        <ul>
          {data.shoppingList.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} {item.typeQuantity}
            </li>
          ))}
        </ul>
      </div>
    );
  }