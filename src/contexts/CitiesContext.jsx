import { createContext, useState, useEffect, useContext } from "react";

const url = "http://localhost:6969/"
const CitiesContext = createContext();

function CitiesProvider({children}){

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(function (){
      const controller = new AbortController();
    
      async function fetchData(){
        try{ 
          setIsLoading(true)
          const res = await fetch(`${url}cities`, {signal: controller.signal});
         const data = await res.json();
         setCities(data)
      }catch{
        // alert("Error occurred")
        // console.log(Error)
      }finally{
        setIsLoading(false)
      }
      }
      fetchData();
    
      return function(){
        controller.abort()
      }
    },[])

    return(
        <CitiesContext.Provider values={{cities, isLoading}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    const context = useContext(CitiesContext);
    return context;
}

export {CitiesProvider, useCities};