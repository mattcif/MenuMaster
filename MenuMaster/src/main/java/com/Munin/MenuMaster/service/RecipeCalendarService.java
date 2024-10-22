package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.dto.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.MarketShoppingListResponseDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeCalendarResponseDTO;

import java.util.List;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarRequestDTO recipeCalendarRequestDTO, String username);

    List<RecipeCalendarResponseDTO> getAllRecipeCalendarsForUsernmae(String username);

    void createShoppingList(String startDate, String endDate, String username);

    List<MarketShoppingListResponseDTO> getAllShoppingListForUsername(String username);

    MarketShoppingListResponseDTO getShoppingListById(String id);
}
