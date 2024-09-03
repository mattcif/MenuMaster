package com.Munin.MenuMaster.requestDTO;

import com.Munin.MenuMaster.model.Recipe;
import lombok.Data;

import java.util.List;

@Data
public class RecipeCalendarRequestDTO {
    private Recipe recipe;
    private List<String> dates;
    private Integer quantity;


}
