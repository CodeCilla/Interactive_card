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
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
    @GetMapping("/regions")
    public List<String> getRegions() {
        return cityRepository.findDistinctRegions();
    }
    @GetMapping
    public List<City> getCities(@RequestParam(name = "minPop", defaultValue = "0") int minPop) {
        return cityRepository.findByMinPopulation(minPop);
    }
}