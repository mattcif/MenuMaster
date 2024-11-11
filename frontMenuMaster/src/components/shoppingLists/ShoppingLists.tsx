import { useShoppingList } from "../../hooks/useShoppingList";
import { CardShoppingList } from "../card-shopping-list/CardShoppingList";

export function ShoppingLists() {
    const {data} = useShoppingList();

    console.log("Shopping List Data:", data)

    return (
        <div className="container">
            <div className="card-shopping-list">
                {data?.map((shoppingLists) => 
                    <CardShoppingList
                        key={shoppingLists.id}
                        id={shoppingLists.id}
                        startDate={shoppingLists.startDate}
                        endDate={shoppingLists.endDate}
                        recipeList={shoppingLists.recipes}/>
                )}
            </div>
        </div>
    )
}
