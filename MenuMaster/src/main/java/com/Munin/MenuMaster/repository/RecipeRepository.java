package com.Munin.MenuMaster.repository;

import com.Munin.MenuMaster.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, UUID> {

    List<Recipe> findByOwnerUsername(String ownerUsername);
}
