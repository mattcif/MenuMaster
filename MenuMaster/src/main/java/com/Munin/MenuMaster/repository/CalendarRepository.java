package com.Munin.MenuMaster.repository;

import com.Munin.MenuMaster.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, UUID> {

    Optional<Calendar> findByDate(LocalDate date) ;
}
