import { useState } from "react";
import { Ingredient } from "../../interface/Ingredient";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import styles from './InputIngredient.module.css'

interface InputIngredientProps {
    ingredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
}

const InputIngredient = ({ ingredients, setIngredients }: InputIngredientProps) => {
    const [ingredientName, setIngredientName] = useState("")
    const [quantity, setQuantity] = useState<number>(0);
    const [typeQuantity, setTypeQuantity] = useState<"G" | "ML" | "UNIT">("G");

    const addIngredient = () => {
        if (ingredientName && quantity > 0) {
            const newIngredient: Ingredient = {
                name: ingredientName,
                quantity: quantity,
                typeQuantity: typeQuantity,
            }
            setIngredients([...ingredients, newIngredient]);
            setIngredientName("");
            setQuantity(0);
            setTypeQuantity("G");
        }
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue >= 1) {
            setQuantity(newValue);
        }
    };

    return (
        <div >
            <div className='d-flex justify-content-center- alignt-items-center' style={{ marginTop: '5px' }}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Nome do Ingrendiente"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Nome do Ingrendiente" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} />
                </FloatingLabel>

                <Form.Group className="mb-3" style={{ width: '10vw', height: '1vh', backgroundColor: '#f8f9fa' }}>
                    <Form.Floating>
                        <Form.Control
                            as="input"
                            type="number"
                            id="typeNumber"
                            min={1}
                            placeholder="Selecione a quantidade"
                            required
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <Form.Label htmlFor="typeNumber">Quantidade</Form.Label>
                    </Form.Floating>
                </Form.Group>

                <Form.Select
                    style={{ width: '150px', height: '59px' }}
                    value={typeQuantity}
                    onChange={(e) => setTypeQuantity(e.target.value as 'G' | 'ML' | 'UNIT')}
                    aria-label="Default select example">
                    <option value="G">Gramas (g)</option>
                    <option value="ML">Milimetros (ml)</option>
                    <option value="UNIT">Unidade</option>
                </Form.Select>

                <Button style={{ width: '150px', height: '59px' }} onClick={addIngredient}>Adicionar Ingrendiente</Button>



            </div>

            <div className={styles.ingredientListContainer}>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className={styles.ingredientItem}>
                            <div  className={styles.ingredientInfo}>
                            {ingredient.name} - {ingredient.quantity} {ingredient.typeQuantity}

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default InputIngredient;