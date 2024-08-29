package com.Munin.MenuMaster.model;

import com.Munin.MenuMaster.requestDTO.IngredientRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private BigDecimal quantity;

    @Enumerated(EnumType.STRING)
    private TypeQuantity typeQuantity;

    public Ingredient(IngredientRequestDto data) {
        this.name = data.name();
        this.quantity = data.quantity();
        this.typeQuantity = data.typeQuantity();
    }
}
