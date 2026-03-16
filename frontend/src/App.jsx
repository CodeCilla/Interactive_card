import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Filters from './components/Filters';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [filters, setFilters] = useState({
    limit: 100,
    minPopulation: 0,
    radius: 50, // en km
    region: ''
  });

  const fetchCities = async () => {
    // La logique de fetch sera affinée avec les query params
    const response = await fetch('http://localhost:8080/api/cities');
    const data = await response.json();
    setCities(data);
  };

  useEffect(() => {
    fetchCities();
  }, [filters, origin]);

  return (
    <div className="app-container">
      <main className="map-wrapper">
        <MapView cities={cities} onMapClick={setOrigin} origin={origin} />
      </main>
      <aside className="sidebar">
        <Filters filters={filters} setFilters={setFilters} />
      </aside>
    </div>
  );
}

export default App;