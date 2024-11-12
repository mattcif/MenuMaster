import { useNavigate } from "react-router-dom";
import { RecipeData } from "../../interface/RecipeData";
import { Button, Card } from "react-bootstrap";
import DeleteShoppingListBtn from "../delete-shoppinglist-btn/DeleteShoppingListBtn";
import styles from './cardShoppingList.module.css'; // Importando o módulo CSS

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

interface CardProps {
    id: string;
    startDate: string;
    endDate: string;
    recipeList: RecipeData[];
}

export function CardShoppingList({ id, startDate, endDate, recipeList }: CardProps) {
    const navigate = useNavigate();

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const handleDetailClick = () => {
        navigate(`/shopping-list/${id}`);
    };

    return (
        <div className={styles.card}>
            <Card>
                <Card.Body>
                    <Card.Title>Lista de Compras de:</Card.Title>
                    <Card.Subtitle>{formattedStartDate} - {formattedEndDate}</Card.Subtitle>
                    <div className={styles.buttonsCardShopping}>
                        <Button className={styles.detailButton} onClick={handleDetailClick}>
                            Exibir
                        </Button>
                        <DeleteShoppingListBtn shoppingListId={id} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
