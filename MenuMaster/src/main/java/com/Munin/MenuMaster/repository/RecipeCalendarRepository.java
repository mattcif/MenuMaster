package com.Munin.MenuMaster.repository;

import com.Munin.MenuMaster.model.Calendar;
import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.model.RecipeCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RecipeCalendarRepository extends JpaRepository<RecipeCalendar, UUID> {

    Optional<RecipeCalendar> findByRecipeAndCalendar(Recipe recipe, Calendar calendar);

    List<RecipeCalendar> findByOwnerUsername(String username);



}
