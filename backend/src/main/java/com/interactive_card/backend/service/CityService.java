package com.interactive_card.backend.service;

import com.interactive_card.backend.model.City;
import com.interactive_card.backend.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getFilteredCities(int minPop, String region, int limit, Double lat, Double lon, double radius) {
        return cityRepository.findFilteredCities(minPop, region, limit, lat, lon, radius);
    }

    public List<String> getDistinctRegions() {
        return cityRepository.findDistinctRegions();
    }
}