import { createContext, useState, useEffect, useContext } from "react";

const url = "http://localhost:6969/"
const CitiesContext = createContext();

function CitiesProvider({children}){

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    
    useEffect(function (){
      const controller = new AbortController();
    
      async function fetchData(){
        try{ 
          setIsLoading(true)
          const res = await fetch(`${url}cities`, {signal: controller.signal});
         const data = await res.json();
         setCities(data)
      }catch{
        alert("Error occurred")
        // console.log(Error)
      }finally{
        setIsLoading(false)
      }
      }
      fetchData();
    
      return function(){
        controller.abort()
      }
    },[]);

    async function getCity(id){
      try{ 
        setIsLoading(true)
        const res = await fetch(`${url}cities/${id}`);
       const data = await res.json();
       setCurrentCity(data)
    }catch{
      alert("Error occurred")
      // console.log(Error)
    }finally{
      setIsLoading(false)
    }
    }
  

    return(
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity}}>
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