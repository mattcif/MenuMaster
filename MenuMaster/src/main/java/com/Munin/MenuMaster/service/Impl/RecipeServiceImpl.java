package com.Munin.MenuMaster.service.Impl;

import com.Munin.MenuMaster.dto.requestDTO.IngredientRequestDto;
import com.Munin.MenuMaster.dto.requestDTO.RecipeRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeResponseDTO;
import com.Munin.MenuMaster.model.Ingredient;
import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
}
