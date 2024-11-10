package com.Munin.MenuMaster.model;

import com.Munin.MenuMaster.dto.requestDTO.RecipeRequestDTO;
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
    @Column(columnDefinition = "BINARY(16)")
    private UUID id = UUID.randomUUID();

    private String name;

    @Lob
    private String preparationMethod;
    private String image;

    private String ownerUsername;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Recipe recipe)) return false;

        return getId().equals(recipe.getId());
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
