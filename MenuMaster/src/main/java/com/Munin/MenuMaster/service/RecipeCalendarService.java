package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.requestDTO.RecipeCalendarDTO;
import org.springframework.stereotype.Service;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarDTO recipeCalendarDTO);
}
