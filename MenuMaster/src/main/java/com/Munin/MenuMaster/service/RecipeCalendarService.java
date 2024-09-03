package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.responseDTO.RecipeCalendarResponseDTO;

import java.util.List;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarRequestDTO recipeCalendarRequestDTO);

    List<RecipeCalendarResponseDTO> getAllRecipeCalendars();

    void createShoppingList(String startDate, String endDate);
}
