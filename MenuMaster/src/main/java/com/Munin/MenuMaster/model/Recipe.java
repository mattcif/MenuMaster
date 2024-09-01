package com.Munin.MenuMaster.model;

import com.Munin.MenuMaster.requestDTO.RecipeRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private String preparationMethod;
    private String image;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private Set<RecipeCalendar> recipeCalendars = new HashSet<>();

    public Recipe(RecipeRequestDTO data) {
        this.name = data.name();
        this.preparationMethod = data.preparationMethod();
        this.image = data.image();
        this.ingredients = data.ingredients();
    }
}
