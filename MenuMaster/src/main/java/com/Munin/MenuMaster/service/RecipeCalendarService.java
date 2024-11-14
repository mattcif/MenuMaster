package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.dto.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.MarketShoppingListResponseDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeCalendarResponseDTO;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface RecipeCalendarService {

    void createOrUpdateRecipeCalendar(RecipeCalendarRequestDTO recipeCalendarRequestDTO, String username);

    @Transactional
    boolean deleteRecipeCalendar(UUID id, String username);

    List<RecipeCalendarResponseDTO> getAllRecipeCalendarsForUsernmae(String username);


    List<MarketShoppingListResponseDTO> getAllShoppingListForUsername(String username);

    // todo REFATORAR CONTROLLER SERVICE PARA SHOPPINGLIST
    String createShoppingList(String startDate, String endDate, String username);

    MarketShoppingListResponseDTO getShoppingListById(String id);

    void deleteShoppingListById(UUID id, String username);
}
