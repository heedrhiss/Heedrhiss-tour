import { Link } from 'react-router-dom';
import styles from './CityList.module.css'
import Spinner from './Spinner';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    // day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityList({cities, isLoading}) {
    if(isLoading) return <Spinner/>
    return (
        <div className={styles.cityList}>
           {cities.map(city=>  <CityItem  key={city.id} city={city}/>)}
        </div>
    )
}

function CityItem({city}){
    const {cityName, date, emoji, id, position} = city
    
    return(
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${position.lat}/lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span> 
      <h2 className={styles.name}>{cityName}</h2>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
    )
}
export default CityList
