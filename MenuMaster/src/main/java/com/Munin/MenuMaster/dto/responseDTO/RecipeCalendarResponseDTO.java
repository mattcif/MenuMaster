package com.Munin.MenuMaster.dto.responseDTO;

import lombok.Data;

import java.util.List;

@Data
public class RecipeCalendarResponseDTO {
        private String name;
        private List<String> dates;
        private Integer quantity;
}
