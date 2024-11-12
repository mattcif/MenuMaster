import { useEffect, useState } from "react";
import { useRecipeDataMutate } from "../../hooks/useRecipeDataMutate";
import { RecipeData } from "../../interface/RecipeData";
import { Ingredient } from "../../interface/Ingredient";
import InputIngredient from "./InputIngredient";
import styles from "./modal.module.css"; // Importando o módulo CSS

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void;
}

interface ModalProps {
  closeModal(): void;
}

export const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={(event) => updateValue(event.target.value)} />
    </>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [name, setName] = useState("");
  const [preparationMethod, setPreparationMethod] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { mutate, isSuccess } = useRecipeDataMutate();

  const submit = () => {
    const recipeData: RecipeData = {
      name,
      preparationMethod,
      image,
      ingredients,
    };

    mutate(recipeData);
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess, closeModal]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h2>Cadastre uma nova Receita</h2>
          <button className={styles.closeButton} onClick={closeModal}>
            X
          </button>
        </div>

        <form className={styles.inputContainer} action="">
          <Input label="title" value={name} updateValue={setName} />
          <Input label="preparation method" value={preparationMethod} updateValue={setPreparationMethod} />
          <Input label="image" value={image} updateValue={setImage} />
          <InputIngredient ingredients={ingredients} setIngredients={setIngredients} />
        </form>
        <button className={styles.btnSecondary} type="button" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}
