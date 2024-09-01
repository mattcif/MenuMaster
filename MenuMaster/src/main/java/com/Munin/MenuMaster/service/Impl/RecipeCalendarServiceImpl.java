package com.Munin.MenuMaster.service.Impl;

import com.Munin.MenuMaster.model.Calendar;
import com.Munin.MenuMaster.model.Recipe;
import com.Munin.MenuMaster.model.RecipeCalendar;
import com.Munin.MenuMaster.repository.CalendarRepository;
import com.Munin.MenuMaster.repository.RecipeCalendarRepository;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.requestDTO.RecipeCalendarDTO;
import com.Munin.MenuMaster.responseDTO.RecipeCalendarResponseDTO;
import com.Munin.MenuMaster.service.RecipeCalendarService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeCalendarServiceImpl implements RecipeCalendarService {

    private final CalendarRepository calendarRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeCalendarRepository recipeCalendarRepository;

    @Override
    @Transactional
    public void createOrUpdateRecipeCalendar(RecipeCalendarDTO recipeCalendarDTO) {

        Recipe recipe = recipeRepository.findById(recipeCalendarDTO.getRecipeId())
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + recipeCalendarDTO.getRecipeId()));

        List<LocalDate> dates = recipeCalendarDTO.getDates().stream()
                .map(LocalDate::parse)
                .toList();


        for (LocalDate date : dates) {
            Calendar calendar = calendarRepository.findByDate(date)
                    .orElseGet(() -> {
                        Calendar newCalendar = new Calendar();
                        newCalendar.setDate(date);
                        return calendarRepository.save(newCalendar);
                    });

            RecipeCalendar recipeCalendar = recipeCalendarRepository.findByRecipeAndCalendar(recipe, calendar)
                    .orElseGet(() -> {
                        RecipeCalendar newRecipeCalendar = new RecipeCalendar();
                        newRecipeCalendar.setRecipe(recipe);
                        newRecipeCalendar.setCalendar(calendar);
                        newRecipeCalendar.setQuantity(recipeCalendarDTO.getQuantity());
                        return recipeCalendarRepository.save(newRecipeCalendar);
                    });

            if (recipeCalendar.getId() != null) {
                recipeCalendar.setQuantity(recipeCalendarDTO.getQuantity());
                recipeCalendarRepository.save(recipeCalendar);
            }
        }


    }

    @Override
    @Transactional
    public List<RecipeCalendarResponseDTO> getAllRecipeCalendars() {
        List<RecipeCalendar> recipeCalendars = recipeCalendarRepository.findAll();

        return recipeCalendars.stream().map(recipeCalendar -> {
            RecipeCalendarResponseDTO dto = new RecipeCalendarResponseDTO();
            dto.setName(recipeCalendar.getRecipe().getName());
            dto.setDates(
                    List.of(recipeCalendar.getCalendar().getDate().toString())
            );
            dto.setQuantity(recipeCalendar.getQuantity());
            return dto;
        }).collect(Collectors.toList());
    }
}

