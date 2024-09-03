package com.Munin.MenuMaster.service.Impl;

import com.Munin.MenuMaster.model.*;
import com.Munin.MenuMaster.model.Calendar;
import com.Munin.MenuMaster.repository.CalendarRepository;
import com.Munin.MenuMaster.repository.MarketShoppingListRepository;
import com.Munin.MenuMaster.repository.RecipeCalendarRepository;
import com.Munin.MenuMaster.repository.RecipeRepository;
import com.Munin.MenuMaster.requestDTO.RecipeCalendarRequestDTO;
import com.Munin.MenuMaster.responseDTO.MarketShoppingListResponseDTO;
import com.Munin.MenuMaster.responseDTO.RecipeCalendarResponseDTO;
import com.Munin.MenuMaster.service.RecipeCalendarService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeCalendarServiceImpl implements RecipeCalendarService {

    private final CalendarRepository calendarRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeCalendarRepository recipeCalendarRepository;
    private final MarketShoppingListRepository shoppingListRepository;

    @Override
    @Transactional
    public void createOrUpdateRecipeCalendar(RecipeCalendarRequestDTO recipeCalendarDTO) {

        Recipe recipe = recipeRepository.findById(recipeCalendarDTO.getRecipe().getId())
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + recipeCalendarDTO.getRecipe().getId()));

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


    // todo REFATORAR CONTROLLER SERVICE PARA SHOPPINGLIST
    @Override
    @Transactional
    public void createShoppingList(String startDate, String endDate) {
        Map<Recipe, RecipeCalendarRequestDTO> recipesMap = new HashMap<>();
        List<Ingredient> totalIngredients = new ArrayList<>();

        List<RecipeCalendarRequestDTO> filteredList = filteredRecipesByDate(startDate, endDate);

        for (RecipeCalendarRequestDTO dto : filteredList) {
            Recipe recipe = dto.getRecipe();
            if (recipesMap.containsKey(recipe)) {
                RecipeCalendarRequestDTO existingDto = recipesMap.get(recipe);
                existingDto.setQuantity(existingDto.getQuantity() + dto.getQuantity());
            } else {
                recipesMap.put(recipe, dto);
            }
        }

        List<RecipeCalendarRequestDTO> recipesTotalQuantity = new ArrayList<>(recipesMap.values());

        List<Ingredient> shoppingList = calculateIngredientsFromRecipes(recipesTotalQuantity);

        MarketShoppingList marketShoppingList = new MarketShoppingList();
        marketShoppingList.setStart(LocalDate.parse(startDate));
        marketShoppingList.setEnd(LocalDate.parse(endDate));
        marketShoppingList.setShoppingList(shoppingList);

        shoppingListRepository.save(marketShoppingList);

    }

    @Override
    @Transactional
    public MarketShoppingListResponseDTO getShoppingListById(String id) {
        MarketShoppingList marketShoppingList = shoppingListRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new NoSuchElementException("Shopping list not found with id"));

        return convertShoppingListToDTO(marketShoppingList);
    }

    @Override
    @Transactional
    public List<MarketShoppingListResponseDTO> getAllShoppingList() {
        List<MarketShoppingList> marketShoppingLists = shoppingListRepository.findAll();
        return marketShoppingLists.stream().map(this::convertShoppingListToDTO).collect(Collectors.toList());
    }

    private MarketShoppingListResponseDTO convertShoppingListToDTO(MarketShoppingList marketShoppingList) {
        MarketShoppingListResponseDTO dto = new MarketShoppingListResponseDTO();
        dto.setId(marketShoppingList.getId());
        dto.setStartDate(marketShoppingList.getStart().toString());
        dto.setEndDate(marketShoppingList.getEnd().toString());
        dto.setShoppingList(marketShoppingList.getShoppingList());

        return dto;
    }

    private List<RecipeCalendarRequestDTO> filteredRecipesByDate(String startDateStr, String endDateStr) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        List<RecipeCalendarRequestDTO> listRepository = getAllRecipeCalendarsDTO();

        List<RecipeCalendarRequestDTO> filteredRecipes = listRepository.stream()
                .filter(dto -> dto.getDates().stream()
                        .map(LocalDate::parse)
                        .anyMatch(date -> !date.isBefore(startDate) && !date.isAfter(endDate)))
                .toList();

        return filteredRecipes;
    }

    private List<RecipeCalendarRequestDTO> getAllRecipeCalendarsDTO() {
        List<RecipeCalendar> recipeCalendars = recipeCalendarRepository.findAll();

        return recipeCalendars.stream().map(recipeCalendar -> {
            RecipeCalendarRequestDTO dto = new RecipeCalendarRequestDTO();
            dto.setRecipe(recipeCalendar.getRecipe());
            dto.setDates(
                    List.of(recipeCalendar.getCalendar().getDate().toString())
            );
            dto.setQuantity(recipeCalendar.getQuantity());
            return dto;
        }).collect(Collectors.toList());
    }

    private List<Ingredient> calculateIngredientsFromRecipes(List<RecipeCalendarRequestDTO> recipesTotalQuantity) {
        Map<String, Ingredient> ingredientMap = new HashMap<>();

        for (RecipeCalendarRequestDTO dto : recipesTotalQuantity) {
            Recipe recipe = dto.getRecipe();
            Integer quantity = dto.getQuantity();

            if (recipe.getIngredients() != null) {
                for (Ingredient ingredient : recipe.getIngredients()) {
                    String ingredientName = ingredient.getName();
                    if (ingredientMap.containsKey(ingredientName)) {
                        Ingredient existingIngredient = ingredientMap.get(ingredientName);
                        existingIngredient.setQuantity(
                                existingIngredient
                                        .getQuantity()
                                        .add(ingredient
                                                .getQuantity()
                                                .multiply(BigDecimal.valueOf(quantity))));
                    } else {
                        Ingredient newIngredient = new Ingredient();
                        newIngredient.setName(ingredientName);
                        newIngredient.setQuantity(ingredient.getQuantity().multiply(BigDecimal.valueOf(quantity)));
                        newIngredient.setTypeQuantity(ingredient.getTypeQuantity());
                        ingredientMap.put(ingredientName, newIngredient);
                    }
                }
            }

        }
        return new ArrayList<>(ingredientMap.values());
    }
}

