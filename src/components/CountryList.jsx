import styles from './CountryList.module.css'
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';



function CountryList() {
const {cities, isLoading} = useCities();

    const country = cities.reduce((arr, city) => 
    {if(arr.map((el)=> el.country).includes(city.country))  return arr
    else return [...arr, {country: city.country, emoji:city.emoji}]}
    , [])

    if(isLoading) return <Spinner/>
    return (
        <div className={styles.countryList}>
           {country.map(country=>  <CountryItem  country={country} key={country.country}/>)}
        </div>
    )
}

export default CountryList
