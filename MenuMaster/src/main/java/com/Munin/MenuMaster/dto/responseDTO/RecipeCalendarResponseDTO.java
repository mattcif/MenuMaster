package com.Munin.MenuMaster.dto.responseDTO;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class RecipeCalendarResponseDTO {
        private String name;
        private List<String> dates;
        private Integer quantity;
        private UUID recipeId;
}
