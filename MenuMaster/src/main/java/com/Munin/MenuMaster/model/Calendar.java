package com.Munin.MenuMaster.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id = UUID.randomUUID();

    private LocalDate date;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private Set<RecipeCalendar> recipeCalendars = new HashSet<>();
}
