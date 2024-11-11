package com.Munin.MenuMaster.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id = UUID.randomUUID();

    private LocalDate start;
    private LocalDate end;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Ingredient> shoppingList;

    @ManyToMany(fetch = FetchType.EAGER) // Mudança para ManyToMany
    @JoinTable(
            name = "market_shopping_list_recipes",
            joinColumns = @JoinColumn(name = "market_shopping_list_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    private List<Recipe> recipes;

    private String ownerUsername;
}
