import { useEffect, useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(() => {
          setProducts(datos);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if(error){
    return(<NotFound/>)
  }

  const handleAddToCart = (product, quantity = 1) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === product.id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

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
