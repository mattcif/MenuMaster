package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.model.RecipeCalendar;
import com.Munin.MenuMaster.requestDTO.RecipeCalendarDTO;

import java.util.List;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarDTO recipeCalendarDTO);

    List<RecipeCalendarDTO> getAllRecipeCalendars();
}
