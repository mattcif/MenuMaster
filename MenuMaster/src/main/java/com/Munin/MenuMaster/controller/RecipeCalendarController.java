package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.dto.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.dto.requestDTO.ShoppingListRequestDTO;
import com.Munin.MenuMaster.dto.responseDTO.MarketShoppingListResponseDTO;
import com.Munin.MenuMaster.dto.responseDTO.RecipeCalendarResponseDTO;
import com.Munin.MenuMaster.service.RecipeCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/calendar")
public class RecipeCalendarController {

    @Autowired
    private RecipeCalendarService recipeCalendarService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createOrUpdateRecipeCalendar(
            @RequestBody RecipeCalendarRequestDTO recipeCalendarRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        try {
            recipeCalendarService.createOrUpdateRecipeCalendar(recipeCalendarRequestDTO, username);
            return new ResponseEntity<>("RecipeCalendar created or updated successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing recipe calendar: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Novo método GET para recuperar todos os RecipeCalendars
    @GetMapping
    public ResponseEntity<List<RecipeCalendarResponseDTO>> getRecipeCalendars(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        try {
            List<RecipeCalendarResponseDTO> recipeCalendars = recipeCalendarService.getAllRecipeCalendarsForUsernmae(username);
            return ResponseEntity.ok(recipeCalendars);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/shopping-list/create")
    @ResponseStatus(HttpStatus.CREATED)
    private ResponseEntity<String> createMarketShoppingList(
            @RequestBody ShoppingListRequestDTO shoppingListRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        try {
            String startDate = shoppingListRequestDTO.getStartDate();
            String endDate = shoppingListRequestDTO.getEndDate();
            String marketShoppingListId = recipeCalendarService.createShoppingList(startDate, endDate, username);
            return new ResponseEntity<>(marketShoppingListId, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing Market Shopping List", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shopping-list")
    @ResponseStatus(HttpStatus.OK)
    private ResponseEntity<List<MarketShoppingListResponseDTO>> getMarketShoppingList(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        try {
            List<MarketShoppingListResponseDTO> marketShoppingList = recipeCalendarService.getAllShoppingListForUsername(username);
            return ResponseEntity.ok(marketShoppingList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/shopping-list/{id}")
    @ResponseStatus(HttpStatus.OK)
    private ResponseEntity<MarketShoppingListResponseDTO> getMarketShoppingListById(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        try {
            MarketShoppingListResponseDTO dto = recipeCalendarService.getShoppingListById(id);
            return ResponseEntity.ok(dto);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/shopping-list/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    private void deleteShoppingListById(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String username = userDetails.getUsername();
        recipeCalendarService.deleteShoppingListById(id, username);
    }
}
