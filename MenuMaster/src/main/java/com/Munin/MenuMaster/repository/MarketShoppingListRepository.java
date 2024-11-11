package com.Munin.MenuMaster.repository;

import com.Munin.MenuMaster.model.MarketShoppingList;
import com.Munin.MenuMaster.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MarketShoppingListRepository extends JpaRepository<MarketShoppingList, UUID> {
    boolean existsByRecipesContaining(Recipe recipe);
}
