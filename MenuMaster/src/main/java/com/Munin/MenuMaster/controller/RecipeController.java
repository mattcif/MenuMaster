package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.dto.requestDTO.IngredientRequestDto;
import com.Munin.MenuMaster.dto.requestDTO.RecipeRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeResponseDTO;
import com.Munin.MenuMaster.model.Ingredient;
import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public List<RecipeResponseDTO> getAllRecipes(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return recipeService.getAllRecipesForUser(username);
    }

    @GetMapping("/{id}")
    public RecipeResponseDTO getRecipeById(@PathVariable UUID id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return recipeService.getRecipeById(id, username);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeResponseDTO save(@RequestBody RecipeRequestDTO data,
                                  @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return recipeService.saveRecipe(data, username);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipeById(@PathVariable UUID id,
                                 @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        recipeService.deleteRecipeById(id, username);
    }

    @PatchMapping("{id}/add-ingredient")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addIngredient(@PathVariable UUID id,
                              @RequestBody IngredientRequestDto ingredientDto,
                              @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        recipeService.addIngredient(id, ingredientDto, username);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateRecipe(@PathVariable UUID id,
                             @RequestBody Recipe recipe,
                             @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        recipeService.updateRecipe(id, recipe, username);
    }
}
