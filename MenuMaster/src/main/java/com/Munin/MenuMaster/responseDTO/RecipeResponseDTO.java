package com.Munin.MenuMaster.responseDTO;

import com.Munin.MenuMaster.model.Ingredient;
import com.Munin.MenuMaster.model.Recipe;

import java.util.List;
import java.util.UUID;

public record RecipeResponseDTO(
        UUID id,
        String name,
        String preparationMethod,
        String image,
        List<Ingredient> ingredients) {
    public RecipeResponseDTO(Recipe recipe) {
        this(
                recipe.getId(),
                recipe.getName(),
                recipe.getPreparationMethod(),
                recipe.getImage(),
                recipe.getIngredients()
        );
    }
}
