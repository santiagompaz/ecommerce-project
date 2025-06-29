import { useContext, useEffect, useState } from "react";
import "./App.css";
import "./themes/themes.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ProductsGallery } from "./pages/ProductsGallery";
import { Faq } from "./pages/Faq";
import { Contact } from "./pages/Contact";
import { ProductDetails } from "./components/ProductDetails";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { NotFound } from "./components/NotFound";
import { CartContext } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function App() {
  
  const { isAuthenticated } = useAuth();

  return (
    
      <Routes>

        <Route path="/" element={<Home /> } />

        <Route path="/about" element={<About />}/>

        <Route path="/gallery" element={<ProductsGallery />} />

        <Route path="/gallery/:id" element={<ProductDetails />} />

        <Route path="/faq" element={<Faq />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>{" "} <Admin />{" "} </ProtectedRoutes>
          }
        ></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    
  );
}

export default App;
