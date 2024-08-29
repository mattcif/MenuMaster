package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.model.Ingredient;
import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.requestDTO.IngredientRequestDto;
import com.Munin.MenuMaster.requestDTO.RecipeRequestDTO;
import com.Munin.MenuMaster.responseDTO.RecipeResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu-master/recipe")
public class RecipeController {
    private final RecipeRepository recipeRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<RecipeResponseDTO> getAllRecipes() {
        return recipeRepository.findAll().stream().map(RecipeResponseDTO::new).toList();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public RecipeResponseDTO getRecipeById(@PathVariable UUID id) {
        return recipeRepository.findById(id)
                .map(RecipeResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody RecipeRequestDTO data) {
        Recipe recipeData = new Recipe(data);
        recipeRepository.save(recipeData);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipeById(@PathVariable UUID id) {
        recipeRepository.deleteById(id);
    }

    @PatchMapping("{id}/add-ingredient")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addIngredient(@PathVariable UUID id, @RequestBody IngredientRequestDto ingredientDto) {
        Ingredient ingredient = new Ingredient(ingredientDto);
        recipeRepository.findById(id).map(recipe -> {
            recipe.getIngredients().add(ingredient);
            return recipeRepository.save(recipe);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe Not Found"));

    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateRecipe(@PathVariable UUID id, @RequestBody Recipe recipe) {
        recipeRepository.findById(id)
                .map(recipeExist -> {
                   recipe.setId(recipeExist.getId());
                   recipeRepository.save(recipe);
                   return recipeExist;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe Not Found"));

    }
}
