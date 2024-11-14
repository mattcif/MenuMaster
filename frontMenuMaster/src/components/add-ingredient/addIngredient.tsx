import React, { useState } from 'react';
import { useAddIngredient } from '../../hooks/useAddIngredient';
import { Ingredient } from '../../interface/Ingredient';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

interface AddIngredientProps {
    recipeId: string;
    onIngredientAdded: (newIngredient: Ingredient) => void; // Adiciona a propriedade
}

export function AddIngredient({ recipeId, onIngredientAdded }: AddIngredientProps) {
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [typeQuantity, setTypeQuantity] = useState<'G' | 'ML' | 'UNIT'>('G');
    const { mutate: addIngredient, isPending, isError } = useAddIngredient();

    const handleAddIngredient = () => {
        if (ingredientName && quantity > 0) {
            const newIngredient: Ingredient = {
                name: ingredientName,
                quantity: quantity,
                typeQuantity: typeQuantity,
            };
            addIngredient({ recipeId, ingredient: newIngredient });
            onIngredientAdded(newIngredient); // Notifica o pai
            setIngredientName('');
            setQuantity(0);
            setTypeQuantity('G');
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue >= 1 && newValue <= 10) {
            setQuantity(newValue);
        }
    };

    return (
        <div className='d-flex justify-content-center- alignt-items-center' style={{marginTop: '5px'}}>
            <FloatingLabel
                controlId="floatingInput"
                label="Nome do Ingrendiente"
                className="mb-3"
            >
                <Form.Control  type="text" placeholder="Nome do Ingrendiente" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} />
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
            style={{ width:'150px', height:'59px'}}
            value={typeQuantity}
            onChange={(e) => setTypeQuantity(e.target.value as 'G' | 'ML' | 'UNIT')}
            aria-label="Default select example">
                <option value="G">Gramas (g)</option>
                <option value="ML">Milimetros (ml)</option>
                <option value="UNIT">Unidade</option>
            </Form.Select>


            <Button style={{ width:'150px', height:'59px'}} onClick={handleAddIngredient} disabled={isPending}>Adicionar Ingrendiente</Button>

            {isError && <p>Error adding ingredient</p>}
        </div>
    );
}