import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";

import "./index.css";

import Homepage from "./pages/Homepage"
import Product from "./pages/Product"
import PageNotfound from "./pages/PageNotfound"
import Pricing from "./pages/Pricing"
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from './components/Form'

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
      <Route index element={<Navigate replace to='cities'/>}/>
      <Route path="cities/:id" element={<City/>}/>
      <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
      <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
      <Route path="form" element={<Form/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
