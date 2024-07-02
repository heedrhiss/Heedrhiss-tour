import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext'

function Map() {
    const navigate = useNavigate()
    const {cities} = useCities()
    const [searchParams, setSearchParam] = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get("lng")
    const position = [25,55]

    return (
    <div className={styles.mapContainer} onClick={()=>navigate('form')}>
        <MapContainer center={position} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"/>
        {cities.map(city => <Marker position={[city.position.lat , city.position.lng]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        </Marker>)}
        </MapContainer>
    </div>
    )
}

export default Map
