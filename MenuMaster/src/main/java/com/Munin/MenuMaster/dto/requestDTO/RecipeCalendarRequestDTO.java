package com.Munin.MenuMaster.dto.requestDTO;

import com.Munin.MenuMaster.model.Recipe;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class RecipeCalendarRequestDTO {
    private UUID recipeId;
    private List<String> dates;
    private Integer quantity;


}