package com.Munin.MenuMaster.requestDTO;

import com.Munin.MenuMaster.model.TypeQuantity;

import java.math.BigDecimal;

public record IngredientRequestDto (
        String name,
        BigDecimal quantity,
        TypeQuantity typeQuantity
) {}