package com.Munin.MenuMaster.requestDTO;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class RecipeCalendarDTO {
    private UUID recipeId;
    private List<String> dates;
    private Integer quantity;
}
