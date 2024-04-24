import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Product from "./pages/Product"
import PageNotfound from "./pages/PageNotfound"
import Pricing from "./pages/Pricing"
import "./index.css";
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"

const url = "http://localhost:6969/"
function App() {
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
  return (
   <BrowserRouter>
   <Routes>
    <Route index element={<Homepage />}/>
    <Route path="*" element={<PageNotfound/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/app" element={<AppLayout/>}>
      <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
      <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
      <Route path="countries" element={<h1>List of Countries</h1>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
