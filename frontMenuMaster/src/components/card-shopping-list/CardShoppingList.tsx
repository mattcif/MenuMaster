import { useNavigate } from "react-router-dom";
import { Ingredient } from "../../interface/Ingredient";

interface CardProps {
    id: string;
    startDate: string;
    endDate: string;
    shoppingList: Ingredient[]

}

export function CardShoppingList({ id, startDate, endDate }: CardProps) {
    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/shopping-list/${id}`);
    };

    return (
        <div className="card">
            <h2>{startDate} - {endDate}</h2>
            <div className="card-buttons">
                <button className="detail-button" onClick={handleDetailClick}>
                    Detail
                </button>
            </div>
        </div>
    );
}