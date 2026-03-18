package com.interactive_card.backend.repository;

import com.interactive_card.backend.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    @Query(value = "SELECT *, " +
            "CASE WHEN :lat IS NOT NULL AND :lon IS NOT NULL " +
            "THEN ST_Distance(geom::geography, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography) / 1000 " +
            "ELSE 0 END as distance " +
            "FROM cities WHERE population >= :minPop " +
            "AND (:region = '' OR region = :region) " +
            "AND (:lat IS NULL OR :lon IS NULL OR ST_DWithin(geom::geography, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography, :radius * 1000)) " +
            "ORDER BY distance ASC, population DESC LIMIT :limit",
            nativeQuery = true)
    List<City> findFilteredCities(
            @Param("minPop") int minPop,
            @Param("region") String region,
            @Param("limit") int limit,
            @Param("lat") Double lat,
            @Param("lon") Double lon,
            @Param("radius") double radius
    );

    @Query("SELECT DISTINCT c.region FROM City c ORDER BY c.region ASC")
    List<String> findDistinctRegions();
}