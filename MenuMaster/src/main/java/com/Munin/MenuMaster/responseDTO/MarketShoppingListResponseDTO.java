package com.Munin.MenuMaster.responseDTO;

import com.Munin.MenuMaster.model.Ingredient;
import lombok.Data;

import java.util.List;

@Data
public class MarketShoppingListResponseDTO {
    private String startDate;
    private String endDate;
    private List<Ingredient> shoppingList;
}
