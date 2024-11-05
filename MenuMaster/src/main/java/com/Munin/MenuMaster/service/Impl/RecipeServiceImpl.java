package com.Munin.MenuMaster.service.Impl;

import com.Munin.MenuMaster.dto.requestDTO.IngredientRequestDto;
import com.Munin.MenuMaster.dto.requestDTO.RecipeRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeResponseDTO;
import com.Munin.MenuMaster.model.Ingredient;
import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.model.TypeQuantity;
import com.Munin.MenuMaster.model.User;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    RecipeRepository recipeRepository;

    @Override
    public List<RecipeResponseDTO> getAllRecipesForUser(String username) {
        return recipeRepository.findByOwnerUsername(username).stream().map(RecipeResponseDTO::new).toList();
    }

    @Override
    public RecipeResponseDTO getRecipeById(UUID id, String username) {
        return recipeRepository.findById(id)
                .map(RecipeResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @Override
    public RecipeResponseDTO saveRecipe(RecipeRequestDTO data, String username) {
        Recipe recipeToSave = new Recipe(data);
        recipeToSave.setOwnerUsername(username);
        recipeRepository.save(recipeToSave);
        return new RecipeResponseDTO(recipeToSave);
    }

    @Override
    public void deleteRecipeById(UUID recipeId, String username) {
        recipeRepository.deleteById(recipeId);
    }

    @Override
    public void addIngredient(UUID recipeId, IngredientRequestDto ingredientDto, String username) {
        Ingredient ingredient = new Ingredient(ingredientDto);
        recipeRepository.findById(recipeId).map(recipe -> {
            recipe.getIngredients().add(ingredient);
            return recipeRepository.save(recipe);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe Not Found"));
    }

    @Override
    public void updateRecipe(UUID id, Recipe recipe, String username) {
        recipeRepository.findById(id)
                .map(recipeExist -> {
                    recipe.setId(recipeExist.getId());
                    recipe.setOwnerUsername(recipeExist.getOwnerUsername());
                    recipeRepository.save(recipe);
                    return recipeExist;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe Not Found."));
    }

    public void addDefaultRecipesForUser(User user) {
        // Ingredientes para Carbonara
        List<Ingredient> carbonaraIngredients = Arrays.asList(
                new Ingredient(null, "Pasta", new BigDecimal("200"), TypeQuantity.G),
                new Ingredient(null, "Bacon", new BigDecimal("100"), TypeQuantity.G),
                new Ingredient(null, "Eggs", new BigDecimal("2"), TypeQuantity.UNIT),
                new Ingredient(null, "Parmesan Cheese", new BigDecimal("50"), TypeQuantity.G)
        );

        // Ingredientes para Strogonoff de Frango
        List<Ingredient> strogonoffIngredients = Arrays.asList(
                new Ingredient(null, "Chicken Breast", new BigDecimal("300"), TypeQuantity.G),
                new Ingredient(null, "Mushrooms", new BigDecimal("100"), TypeQuantity.G),
                new Ingredient(null, "Onion", new BigDecimal("1"), TypeQuantity.UNIT),
                new Ingredient(null, "Tomato Sauce", new BigDecimal("100"), TypeQuantity.ML),
                new Ingredient(null, "Cream", new BigDecimal("200"), TypeQuantity.ML)
        );

        // Ingredientes para Café da Manhã (Pão com Ovo)
        List<Ingredient> breakfastIngredients = Arrays.asList(
                new Ingredient(null, "Bread", new BigDecimal("2"), TypeQuantity.UNIT),
                new Ingredient(null, "Egg", new BigDecimal("1"), TypeQuantity.UNIT),
                new Ingredient(null, "Butter", new BigDecimal("10"), TypeQuantity.G) // Aproximado para gramas
        );

        // Ingredientes para Feijoada
        List<Ingredient> feijoadaIngredients = Arrays.asList(
                new Ingredient(null, "Black Beans", new BigDecimal("500"), TypeQuantity.G),
                new Ingredient(null, "Pork", new BigDecimal("300"), TypeQuantity.G),
                new Ingredient(null, "Sausage", new BigDecimal("200"), TypeQuantity.G),
                new Ingredient(null, "Bay Leaf", new BigDecimal("2"), TypeQuantity.UNIT),
                new Ingredient(null, "Garlic", new BigDecimal("3"), TypeQuantity.UNIT),
                new Ingredient(null, "Onion", new BigDecimal("1"), TypeQuantity.UNIT)
        );

        // Ingredientes para Fricassê de Frango
        List<Ingredient> fricasseeIngredients = Arrays.asList(
                new Ingredient(null, "Chicken Breast", new BigDecimal("400"), TypeQuantity.G),
                new Ingredient(null, "Corn", new BigDecimal("200"), TypeQuantity.G),
                new Ingredient(null, "Cream Cheese", new BigDecimal("150"), TypeQuantity.G),
                new Ingredient(null, "Cream", new BigDecimal("200"), TypeQuantity.ML),
                new Ingredient(null, "Potato Sticks", new BigDecimal("100"), TypeQuantity.G)
        );

        // Cria receitas com seus respectivos ingredientes e métodos de preparo
        List<Recipe> defaultRecipes = Arrays.asList(
                new Recipe(null, "Pasta Carbonara", "Fry bacon, boil pasta, mix with egg and cheese.", "https://i.panelinha.com.br/i1/64-bk-2473-blog-ayu6706.webp", user.getUserName(), carbonaraIngredients, null),
                new Recipe(null, "Chicken Strogonoff", "Cook chicken with mushrooms, add sauce and cream.", "https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/chicken-&-other-poultry-dishes/strogonoff-de-frango/main-header.jpg", user.getUserName(), strogonoffIngredients, null),
                new Recipe(null, "Breakfast (Bread with Egg)", "Toast bread, cook egg, and assemble sandwich.", "https://blog.mantiqueirabrasil.com.br/wp-content/uploads/2023/01/pao-com-ovo.jpeg.webp", user.getUserName(), breakfastIngredients, null),
                new Recipe(null, "Feijoada", "Cook beans with pork and sausage, add spices.", "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/04/18/1061153462-feijoada-de-ogum.jpg", user.getUserName(), feijoadaIngredients, null),
                new Recipe(null, "Chicken Fricassée", "Cook chicken, blend corn with cream cheese and cream, bake with potato sticks.", "https://j6t2y8j5.rocketcdn.me/wp-content/uploads/2022/03/fricasse-de-frango-facil.png.webp", user.getUserName(), fricasseeIngredients, null)
        );

        // Salva as receitas no repositório
        recipeRepository.saveAll(defaultRecipes);
    }
}

