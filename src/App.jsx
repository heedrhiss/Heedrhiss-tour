import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Product from "./pages/Product"
import PageNotfound from "./pages/PageNotfound"
import Pricing from "./pages/Pricing"
import "./index.css";
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Homepage />}/>
    <Route path="*" element={<PageNotfound/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/app" element={<AppLayout/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
