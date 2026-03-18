import React from 'react';
import './Filters.css';

const Filters = ({ filters, setFilters, regions, clickedCoords, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="filters-container">
      <h2>Explorateur</h2>
      
      <div className="field">
          <label>Pop. Min : {filters.minPop}</label>
          <input
              name="minPop"
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={filters.minPop}
              onChange={handleChange}
              className="range-input"
          />
      </div>

      <div className="field">
          <label>Rayon : {filters.radius} km</label>
          <input
              name="radius"
              type="range"
              min="0"
              max="500"
              step="1"
              value={filters.radius}
              onChange={handleChange}
              className="range-input"
          />
      </div>

      <div className="field">
        <label>Région</label>
        <select name="region" value={filters.region} onChange={handleChange}>
          <option value="">Toutes</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>



      {clickedCoords && (
        <div className="coords-info">
          📍 {clickedCoords.lat.toFixed(3)}, {clickedCoords.lng.toFixed(3)}
        </div>
      )}

      <button className="btn-reset" onClick={onReset}>Réinitialiser</button>
    </aside>
  );
};

export default Filters;