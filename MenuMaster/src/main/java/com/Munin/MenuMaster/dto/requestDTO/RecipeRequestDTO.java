package com.Munin.MenuMaster.dto.requestDTO;

import com.Munin.MenuMaster.model.Ingredient;

import java.util.List;

public record RecipeRequestDTO(
        String name,
        String preparationMethod,
        String image,
        List<Ingredient> ingredients
) {}