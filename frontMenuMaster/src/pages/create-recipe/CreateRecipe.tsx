import { useEffect, useState } from "react";
import styles from "./createRecipe.module.css";
import { useRecipeDataMutate } from "../../hooks/useRecipeDataMutate";
import { Ingredient } from "../../interface/Ingredient";
import { RecipeData } from "../../interface/RecipeData";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import InputIngredient from "../../components/create-modal/InputIngredient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function CreateRecipe() {
  const [name, setName] = useState("");
  const [preparationMethod, setPreparationMethod] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { mutate, isSuccess } = useRecipeDataMutate();
  const navigate = useNavigate();

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
    if (isSuccess) {
      // Exibe toast de sucesso
      toast.success("Receita salva com sucesso!");

      // Limpa os campos do formulário
      setName("");
      setPreparationMethod("");
      setImage("");
      setIngredients([]);

    }
  }, [isSuccess]);

  return (
    <div className={styles.container}>
      <h1>Criar Receita</h1>
      <div className={styles.createRecipeContainer}>
        <FloatingLabel controlId="floatingInput" label="Nome da Receita" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nome da Receita"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="urlImagem" label="URL da Imagem">
          <Form.Control
            type="text"
            placeholder="URL da Imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="preparationMethod" label="Modo de Preparo">
          <Form.Control
            as="textarea"
            placeholder="Modo de Preparo"
            style={{ height: '100px' }}
            value={preparationMethod}
            onChange={(e) => setPreparationMethod(e.target.value)}
          />
        </FloatingLabel>

        <InputIngredient ingredients={ingredients} setIngredients={setIngredients} />

        <Button variant='success' onClick={submit}>Salvar Receita</Button>
      </div>
    </div>
  );
}
