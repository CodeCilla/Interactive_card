package com.interactive_card.backend.repository;

import com.interactive_card.backend.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.interactive_card.backend.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    // JpaRepository give findAll(), save(), delete()...
    @Query("SELECT DISTINCT c.region FROM City c ORDER BY c.region ASC")
    List<String> findDistinctRegions();
    @Query("SELECT c FROM City c WHERE c.population >= :minPop")
    List<City> findByMinPopulation(@Param("minPop") int minPop);
}