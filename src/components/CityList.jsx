import { Link } from 'react-router-dom';
import styles from './CityList.module.css'
import Spinner from './Spinner';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityList() {
  const {cities, isLoading} = useCities();
  
    if(isLoading) return <Spinner/>
    return (
        <div className={styles.cityList}>
           {cities.map(city=>  <CityItem  key={city.id} city={city}/>)}
        </div>
    )
}


function CityItem({city}){
  const {currentCity, deleteCity} = useCities();
    const {cityName, date, emoji, id, position} = city
    
function handleDelete(e){
  e.preventDefault()
  deleteCity(id)
}
    return(
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span> 
      <h2 className={styles.name}>{cityName}</h2>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
    )
}
export default CityList
