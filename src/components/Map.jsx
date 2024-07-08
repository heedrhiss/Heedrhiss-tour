import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useEffect, useState } from 'react'
import styles from './Map.module.css'

import { useURLParams } from '../hooks/useURLParams'
import { useGeolocation } from '../hooks/GeoLocation'
import Button from './Button';

function Map() {
    
    const {cities} = useCities()
    const [lat, lng] = useURLParams()
    const {position: geoPosition, isLoading: geoIsLoading, getPosition} = useGeolocation()

    const [mapPosition, setMapPosition] = useState([40, 0])
    
    
    useEffect(function(){
        if (lat && lng) setMapPosition([lat, lng]);
        if (geoPosition) setMapPosition(geoPosition);
    
    }
        ,[geoPosition,lat,lng])
    
    return (
    <div className={styles.mapContainer}>
        {!geoPosition && 
            <Button type='position' onclick={getPosition}>
            {geoIsLoading ? 'Loading...!' : 'Get Location'}
        </Button>}

        <MapContainer center={mapPosition} zoom={7} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"/>
        {cities.map(city => <Marker key={city.id} position={[city.position.lat , city.position.lng]}>
        <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
        </Popup>
        </Marker>)}
        <ChangePosition position={mapPosition}/>
        <MapClickEvent/>
        </MapContainer>
    </div>
    )
}

function ChangePosition({position}){
    const map = useMap();

    map.setView(position);

    return null;
}

function MapClickEvent(){

    const navigate = useNavigate()
    // const {position: geoPosition} = useGeolocation()
    
    useMapEvents({
        
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    
        
    })
    
}

export default Map
