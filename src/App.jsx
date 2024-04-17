import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Notfound from "./pages/Notfound"
import Pricing from "./pages/Pricing"


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="*" element={<Notfound/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
