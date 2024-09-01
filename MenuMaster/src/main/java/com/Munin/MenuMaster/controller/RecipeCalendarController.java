package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.requestDTO.RecipeCalendarDTO;
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
    public ResponseEntity<String> createOrUpdateRecipeCalendar(@RequestBody RecipeCalendarDTO recipeCalendarDTO) {
        try {
            recipeCalendarService.createOrUpdateRecipeCalendar(recipeCalendarDTO);
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
}
