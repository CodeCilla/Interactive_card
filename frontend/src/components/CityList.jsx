// components/CityList.jsx
import React from 'react';
import './CityList.css'; // On va créer un petit fichier CSS aussi

const CityList = ({ cities, clickedCoords }) => {

    // Si aucune ville n'est trouvée, on affiche un message clair
    if (!cities || cities.length === 0) {
        return (
            <div className="city-list-container empty">
                <p>Aucune ville trouvée dans ce rayon.</p>
            </div>
        );
    }

    // Le titre change selon si on a cliqué sur la carte ou non
    const title = clickedCoords
        ? `Villes proches de [${clickedCoords.lat.toFixed(3)}, ${clickedCoords.lng.toFixed(3)}]`
        : `Villes filtrées (${cities.length})`;

    return (
        <div className="city-list-container">
            <h3 className="city-list-title">{title}</h3>
            <ul className="city-list">
                {cities.map(city => (
                    <li key={city.id} className="city-item">
                        <div className="city-main-info">
                            <span className="city-name">{city.name}</span>
                            {city.distance !== null && city.distance !== undefined && city.distance > 0 && (
                                <span className="city-distance">
                                    {city.distance.toFixed(1)} km
                                </span>
                            )}
                        </div>
                        <div className="city-details">
                            <span className="city-pop">Pop: {city.population.toLocaleString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityList;