package com.Munin.MenuMaster.responseDTO;

import com.Munin.MenuMaster.model.Ingredient;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class MarketShoppingListResponseDTO {
    private UUID id;
    private String startDate;
    private String endDate;
    private List<Ingredient> shoppingList;
}
