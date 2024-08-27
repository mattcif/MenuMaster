package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.requestDTO.RecipeRequestDTO;
import com.Munin.MenuMaster.responseDTO.RecipeResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu-master/recipe")
public class RecipeController {
    private final RecipeRepository recipeRepository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<RecipeResponseDTO> getAllRecipes() {
        return recipeRepository.findAll().stream().map(RecipeResponseDTO::new).toList();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public RecipeResponseDTO getRecipeById(@PathVariable UUID id) {
        return recipeRepository.findById(id)
                .map(RecipeResponseDTO::new)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody RecipeRequestDTO data) {
        Recipe recipeData = new Recipe(data);
        recipeRepository.save(recipeData);
    }
}
