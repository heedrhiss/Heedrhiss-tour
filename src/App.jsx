import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"


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
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoutes from "./components/ProtectedRoutes"


function App() {

  return (
  <AuthProvider>
  <CitiesProvider>
   <BrowserRouter>
   <Routes>
    <Route index element={<Homepage />}/>
    <Route path="*" element={<PageNotfound/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/app" element={<ProtectedRoutes><AppLayout/></ProtectedRoutes>}>
      <Route index element={<Navigate replace to='cities'/>}/>
      <Route path="cities/:id" element={<City/>}/>
      <Route path="cities" element={<CityList />}/>
      <Route path="countries" element={<CountryList/>}/>
      <Route path="form" element={<Form/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  </CitiesProvider>
  </AuthProvider>
  )
}

export default App
