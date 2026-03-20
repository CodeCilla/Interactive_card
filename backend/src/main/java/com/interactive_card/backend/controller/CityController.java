package com.interactive_card.backend.controller;

import com.interactive_card.backend.model.City;
import com.interactive_card.backend.repository.CityRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "*")
public class CityController {

    private final CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping
    public List<City> getCities(
            @RequestParam(name = "minPop", defaultValue = "0") int minPop,
            @RequestParam(name = "region", defaultValue = "") String region,
            @RequestParam(name = "limit", defaultValue = "100") int limit,
            @RequestParam(name = "lat", required = false) Double lat,
            @RequestParam(name = "lon", required = false) Double lon,
            @RequestParam(name = "radius", defaultValue = "100") double radius
    ) {
        return cityRepository.findFilteredCities(minPop, region, limit, lat, lon, radius);
    }

    @GetMapping("/regions")
    public List<String> getRegions() {
        return cityRepository.findDistinctRegions();
    }
}