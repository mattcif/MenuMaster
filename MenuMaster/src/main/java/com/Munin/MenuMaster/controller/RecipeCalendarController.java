package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.requestDTO.RecipeCalendarDTO;
import com.Munin.MenuMaster.service.RecipeCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
