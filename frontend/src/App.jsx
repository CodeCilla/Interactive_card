import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './components/MapView';
import Filters from './components/Filters';
import CityList from './components/CityList'; // 1. Import du nouveau composant
import './App.css';

const App = () => {
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [clickedCoords, setClickedCoords] = useState(null);
    const [filters, setFilters] = useState({
        minPop: 0,
        region: '',
        radius: 100,
        limit: 100
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/cities/regions')
            .then(res => setRegions(res.data))
            .catch(err => console.error("Erreur régions:", err));
    }, []);

    useEffect(() => {
        if (!filters.region && !clickedCoords && filters.minPop === 0) {
            setCities([]);
            return;
        }

        const fetchCities = async () => {
            const params = {
                ...filters,
                lat: clickedCoords?.lat || null,
                lon: clickedCoords?.lng || null,
            };

            try {
                const res = await axios.get('http://localhost:8080/api/cities', { params });
                setCities(res.data);
            } catch (err) {
                console.error("Erreur villes:", err);
            }
        };

        fetchCities();
    }, [filters, clickedCoords]);

    return (
        <div className="app-layout">
            <div className="map-container">
                <MapView
                    cities={cities}
                    clickedCoords={clickedCoords}
                    onMapClick={setClickedCoords}
                    radius={filters.radius}
                />
            </div>
            <div className="sidebar">
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                    regions={regions}
                    clickedCoords={clickedCoords}
                    onReset={() => setClickedCoords(null)}
                />

                {/* 2. Intégration de la liste des villes sous les filtres */}
                {clickedCoords && (
                    <CityList
                        cities={cities}
                        clickedCoords={clickedCoords}
                    />
                )}
            </div>
        </div>
    );
};

export default App;