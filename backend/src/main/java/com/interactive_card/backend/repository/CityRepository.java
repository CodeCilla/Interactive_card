package com.interactive_card.backend.repository;

import com.interactive_card.backend.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    // JpaRepository give findAll(), save(), delete()...
}