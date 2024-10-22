package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.dto.requestDTO.IngredientRequestDto;
import com.Munin.MenuMaster.dto.requestDTO.RecipeRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeResponseDTO;
import com.Munin.MenuMaster.model.Recipe;

import java.util.List;
import java.util.UUID;

public interface RecipeService {

    List<RecipeResponseDTO> getAllRecipesForUser(String username);

    RecipeResponseDTO getRecipeById(UUID id, String username);

    RecipeResponseDTO saveRecipe(RecipeRequestDTO data, String username);

    void deleteRecipeById(UUID recipeId, String username);

    void addIngredient(UUID recipeId, IngredientRequestDto ingredientDto, String username);

    void updateRecipe(UUID id, Recipe recipe, String username);
}
