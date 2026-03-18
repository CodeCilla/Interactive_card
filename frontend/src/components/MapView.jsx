import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './MapView.css';

const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Icône personnalisée pour le clic (ex: couleur rouge via un filtre CSS ou une URL différente)
const clickedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ cities, clickedCoords, onMapClick }) => {
    return (
        <div className="map-view-container">
            <MapContainer center={[46.6, 2.2]} zoom={6} className="leaflet-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onMapClick={onMapClick} />

                {cities.map(city => (
                    <Marker
                        key={city.id}
                        position={[city.geom.coordinates[1], city.geom.coordinates[0]]}
                    >
                        <Popup>
                            <strong>{city.name}</strong><br/>
                            Pop: {city.population.toLocaleString()}
                        </Popup>
                    </Marker>
                ))}

                {clickedCoords && (
                    <>
                        <Marker position={clickedCoords} icon={clickedIcon} />
                        <Circle
                            center={clickedCoords}
                            radius={radius*1000}
                            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.15 }}
                        />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapView;