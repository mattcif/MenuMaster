import { useEffect, useState } from "react"
import { useRecipeDataMutate } from "../../hooks/useRecipeDataMutate"
import { RecipeData } from "../../interface/RecipeData"
import { Ingredient } from "../../interface/Ingredient"
import InputIngredient from "./InputIngredient"
import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}


export const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}



export function CreateModal({closeModal }: ModalProps ) {
    const [name, setName] = useState("")
    const [preparationMethod, setPreparationMethod] = useState("")
    const [image, setImage] = useState("")
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const {mutate, isSuccess} = useRecipeDataMutate();

    const submit = () => {
        const recipeData: RecipeData = {
            name,
            preparationMethod,
            image,
            ingredients
        }

        mutate(recipeData)
    }

    useEffect(() => {
        if(isSuccess) 
            closeModal
    }, [isSuccess, closeModal])


    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="modal-header">
                    <h2>Cadastre uma nova Receita</h2>
                    <button className="close-button" onClick={closeModal}>X</button>
                </div>
                
                <form className="input-container" action="">
                    <Input label="title" value={name} updateValue={setName}/>
                    <Input label="preparation method" value={preparationMethod} updateValue={setPreparationMethod}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                    <InputIngredient ingredients={ingredients} setIngredients={setIngredients}/>
                </form>
                <button className="btn-secondery" type="button" onClick={submit}></button>
            </div>
        </div>
    )
}