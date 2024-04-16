import { BrowserRouter, Routes, Route } from "react-router-dom"
import Pricing from "./pages/Pricing"
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";



function App() {

  return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/price" element={<Pricing />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App
