package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.model.MarketShoppingList;
import com.Munin.MenuMaster.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.responseDTO.MarketShoppingListResponseDTO;
import com.Munin.MenuMaster.responseDTO.RecipeCalendarResponseDTO;

import java.util.List;
import java.util.Optional;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarRequestDTO recipeCalendarRequestDTO);

    List<RecipeCalendarResponseDTO> getAllRecipeCalendars();

    void createShoppingList(String startDate, String endDate);

    List<MarketShoppingListResponseDTO> getAllShoppingList();

    MarketShoppingListResponseDTO getShoppingListById(String id);
}
