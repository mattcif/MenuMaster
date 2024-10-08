package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.requestDTO.ShoppingListRequestDTO;
import com.Munin.MenuMaster.responseDTO.MarketShoppingListResponseDTO;
import com.Munin.MenuMaster.responseDTO.RecipeCalendarResponseDTO;
import com.Munin.MenuMaster.service.RecipeCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu-master/calendar")
public class RecipeCalendarController {

    @Autowired
    private RecipeCalendarService recipeCalendarService;

    @PostMapping("/create")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createOrUpdateRecipeCalendar(@RequestBody RecipeCalendarRequestDTO recipeCalendarRequestDTO) {
        try {
            recipeCalendarService.createOrUpdateRecipeCalendar(recipeCalendarRequestDTO);
            return new ResponseEntity<>("RecipeCalendar created or updated successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing recipe calendar: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Novo método GET para recuperar todos os RecipeCalendars
    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<RecipeCalendarResponseDTO>> getRecipeCalendars() {
        try {
            List<RecipeCalendarResponseDTO> recipeCalendars = recipeCalendarService.getAllRecipeCalendars();
            return ResponseEntity.ok(recipeCalendars);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/shopping-list/create")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.CREATED)
    private ResponseEntity<String> createMarketShoppingList(@RequestBody ShoppingListRequestDTO shoppingListRequestDTO) {
        try {
            String startDate = shoppingListRequestDTO.getStartDate();
            String endDate = shoppingListRequestDTO.getEndDate();
            recipeCalendarService.createShoppingList(startDate, endDate);
            return new ResponseEntity<>("Market Shopping List Created Successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing Market Shopping List", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shopping-list")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.OK)
    private ResponseEntity<List<MarketShoppingListResponseDTO>> getMarketShoppingList() {
        try {
            List<MarketShoppingListResponseDTO> marketShoppingList = recipeCalendarService.getAllShoppingList();
            return ResponseEntity.ok(marketShoppingList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/shopping-list/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.OK)
    private ResponseEntity<MarketShoppingListResponseDTO> getMarketShoppingListById(@PathVariable String id) {
        try {
            MarketShoppingListResponseDTO dto = recipeCalendarService.getShoppingListById(id);
            return ResponseEntity.ok(dto);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
