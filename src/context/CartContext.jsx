import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {

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

    return(
        <CartContext.Provider value={{cart, products, loading, error, isAuthenticated, handleAddToCart, handleDeleteFromCart, handleRemoveItem, handleEmptyCart}}>
            {children}
        </CartContext.Provider>
    )
}
