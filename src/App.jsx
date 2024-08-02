import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext"
import "./index.css";

// import Homepage from "./pages/Homepage"
// import Product from "./pages/Product"
// import PageNotFound from "./pages/PageNotFound"
// import Pricing from "./pages/Pricing"
// import Login from "./pages/Login"
// import AppLayout from "./pages/AppLayout"

import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from './components/Form'
import ProtectedRoutes from "./components/ProtectedRoutes"
import SpinnerFullPage from "./components/SpinnerFullPage"

const Homepage = lazy(()=> import("./pages/Homepage"))
const Product = lazy(()=> import("./pages/Product"))
const PageNotFound = lazy(()=> import("./pages/PageNotFound"))
const Pricing = lazy(()=> import("./pages/Pricing"))
const Login = lazy(()=> import("./pages/Login"))
const AppLayout = lazy(()=> import("./pages/AppLayout"))

function App() {

  return (
  <AuthProvider>
  <CitiesProvider>
   <BrowserRouter>
   <Suspense fallback={<SpinnerFullPage/>}>
   <Routes>
    <Route index element={<Homepage />}/>
    <Route path="*" element={<PageNotFound/>}/>
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
   </Suspense>
   </BrowserRouter>
  </CitiesProvider>
  </AuthProvider>
  )
}

export default App
