// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
// import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";
import Message from "./Message";
import { useURLParams } from "../hooks/useURLParams"; 

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("")
  const [formError, setFormError] = useState("")
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [lat, lng] = useURLParams();

useEffect(function(){

  if(!lat && !lng) return;

async function fetchGeoData(){
  try {
    setIsLoadingForm(true)
    setFormError("")
  const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
  const data = await res.json();
  setCityName(data.city || data.locality || "")
  setCountry(data.countryName)
  setEmoji(convertToEmoji(data.countryCode))
  if(!data.countryName) throw new Error("This location is not valid, Click somewhere else😉")
  }
  catch(err){
    setFormError(err.message)
  }
  finally{
    setIsLoadingForm(false)
  }
}
  fetchGeoData()
}, [lat, lng])

if (isLoadingForm) return <Spinner/>
if (!lat && !lng) return <Message message="Start by Clicking somewhere on the Map...!"/>
if (formError) return <Message message={formError}/>

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <ButtonBack/>
      </div>
    </form>
  );
}

export default Form;
