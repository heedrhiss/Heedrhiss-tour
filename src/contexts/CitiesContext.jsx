import { createContext, useState, useEffect, useContext, useReducer } from "react";

const url = "http://localhost:6969/"
const CitiesContext = createContext();

const inistialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {}
}

function reducer (state, action){
  switch(action.type){
    case 'loading': return {...state, isLoading: true}
    case 'failed': return{...state, error: action.payload, isLoading: false}
    case 'cities/loaded': return {...state, cities: action.payload, isLoading: false}
    case 'city/loaded': return{...state, isLoading: false, currentCity: action.payload}
    case 'city/created': return{...state,  isLoading: false,
      cities: [...state.cities, action.payload], currentCity: action.payload}
    case "city/delete": return{...state, isLoading: false,
      cities: state.cities.filter((city)=> city.id !== action.payload)}
    default: 
    throw new Error("Unknown action type.")
  }
}


function CitiesProvider({children}){
  const[{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, inistialState)
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});
    
    useEffect(function (){
      const controller = new AbortController();
    
      async function fetchData(){
        dispatch({type: 'loading'});
        
        try{ 
          
        const res = await fetch(`${url}cities`, {signal: controller.signal});
        const data = await res.json();
        dispatch({type: 'cities/loaded', payload: data}) 
      }catch(err){
        // alert("Error occurred")
        dispatch({type: 'failed', payload: "An error occurred while loading cities...!"})
      }
      }
      fetchData();
    
      return function(){
        controller.abort()
      }
    },[]);

    async function getCity(id){
      if(id == currentCity.id) return;
      dispatch({type: 'loading'})
      try{ 
        
       const res = await fetch(`${url}cities/${id}`);
       const data = await res.json();
       dispatch({type: 'city/loaded', payload: data})
    }catch(err){
      // alert("Error occurred")
      dispatch({type: 'failed', payload: "An error occurred while loading the city...!"})
    }
    }
  
    async function createCity(newCity){
      dispatch({type: 'loading'})
      try{ 
        
        const res = await fetch(`${url}cities`,
        {method: 'POST', body: JSON.stringify(newCity),
      headers: {
        "content-type" : "application/json"
      }});
       const data = await res.json()
      //  setCities(...cities, data);
      dispatch({type: 'city/created', payload: data})
       
    }catch(err){
      // alert("Error occurred")
     dispatch({type: 'failed', payload: "An error occurred while creating the city...!"})
    }
    }

    async function deleteCity(id){
      dispatch({type: 'loading'})
      try{ 
        await fetch(`${url}cities/${id}`,  {method: 'DELETE'});
      //  setCities(cities => cities.filter(city => city.id != id));
      dispatch({type: 'city/delete', payload: id})
       
    }catch(err){
      // alert("Error occurred")
      dispatch({type: 'failed', payload: "An error occurred while deleting the city...!"})
    }
    }
    

    return(
        <CitiesContext.Provider value={{cities, isLoading, currentCity,
        getCity, createCity, deleteCity}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("The context is being used at the wrong level")
    return context;
}

export {CitiesProvider, useCities};