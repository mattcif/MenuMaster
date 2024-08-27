import "./card.css"
import { Ingredient } from "../../interface/Ingredient"
import { useNavigate } from "react-router-dom"

interface CardProps {
    id: string
    name: string,
    preparationMethod: string,
    image?: string,
}

export function Card({id, name, preparationMethod, image} : CardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${id}`)
    }


    return(
        <div className="card" onClick={handleClick}>
          <img src={image}/>
          <h2>{name}</h2>  
          <h3>{preparationMethod}</h3>
        </div>
    )
}