package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.requestDTO.RecipeCalendarDTO;
import com.Munin.MenuMaster.responseDTO.RecipeCalendarResponseDTO;

import java.util.List;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarDTO recipeCalendarDTO);

    List<RecipeCalendarResponseDTO> getAllRecipeCalendars();
}
