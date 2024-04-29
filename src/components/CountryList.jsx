import styles from './CountryList.module.css'
import Spinner from './Spinner';
import CountryItem from './CountryItem';



function CountryList({cities, isLoading}) {

    const country = cities.reduce((arr, city) => 
    {if(arr.map((el)=> el.country).includes(city.country))  return arr
    else return [...arr, {country: city.country, emoji:city.emoji}]}
    , [])

    if(isLoading) return <Spinner/>

    return (
        <div className={styles.countryList}>
           {country.map(country=>  <CountryItem  country={country}/>)}
        </div>
    )
}

export default CountryList
