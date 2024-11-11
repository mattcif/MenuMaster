package com.Munin.MenuMaster.dto.responseDTO;

import com.Munin.MenuMaster.model.Ingredient;
import com.Munin.MenuMaster.model.Recipe;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class MarketShoppingListResponseDTO {
    private UUID id;
    private String startDate;
    private String endDate;
    private List<Ingredient> shoppingList;
    private List<Recipe> recipeList;
}
