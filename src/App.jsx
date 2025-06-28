import { useContext, useEffect, useState } from "react";
import "./App.css";
import "./themes/themes.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  
  const {cart, products, loading, error, isAuthenticated, handleAddToCart, handleDeleteFromCart, handleRemoveItem, handleEmptyCart} = useContext(CartContext)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              emptyCart={handleEmptyCart}
              removeFromCart={handleDeleteFromCart}
              addToCart={handleAddToCart}
              removeItem={handleRemoveItem}
              cart={cart}
              products={products}
              loading={loading}
            />
          }
        />

        <Route
          path="/about"
          element={
            <About
              emptyCart={handleEmptyCart}
              removeFromCart={handleDeleteFromCart}
              removeItem={handleRemoveItem}
              cart={cart}
            />
          }
        />

        <Route
          path="/gallery"
          element={
            <ProductsGallery
              emptyCart={handleEmptyCart}
              removeFromCart={handleDeleteFromCart}
              addToCart={handleAddToCart}
              removeItem={handleRemoveItem}
              cart={cart}
              products={products}
              loading={loading}
            />
          }
        />

        <Route
          path="/gallery/:id"
          element={<ProductDetails products={products} />}
        ></Route>

        <Route
          path="/faq"
          element={
            <Faq
              emptyCart={handleEmptyCart}
              removeFromCart={handleDeleteFromCart}
              removeItem={handleRemoveItem}
              cart={cart}
            />
          }
        />

        <Route
          path="/contact"
          element={
            <Contact
              emptyCart={handleEmptyCart}
              removeFromCart={handleDeleteFromCart}
              removeItem={handleRemoveItem}
              cart={cart}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              {" "}
              <Admin />{" "}
            </ProtectedRoutes>
          }
        ></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
