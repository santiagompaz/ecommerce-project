import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [finder, setFinder] = useState("");

  const apiUrl =
    "https://681b766b17018fe5057baf9f.mockapi.io/productos-ecommerce/product";

  useEffect(() => {
    fetch(apiUrl)
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

  if (error) {
    return <NotFound />;
  }

  const filteredProducts = products.filter((products) =>
    products?.name.toLowerCase().includes(finder.toLowerCase())
  );

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
      toast.success(`Se agregó ${product.name} al carrito de compras.`);
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    toast.error(`Se eliminó ${product.name} del carrito de compras.`);
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
    toast.error(`Se eliminó ${product.name} del carrito de compras.`);
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const handleEmptyCart = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de vaciar el carrito?",
      text: "Todos los productos serán eliminados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#98D9E1",
      cancelButtonColor: "#E51D0D",
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setCart([]);
      toast.error("Se vació el carrito de compras.");
    }
  };

  const handleFinishBuy = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de finalizar?",
      text: "Se iniciará el proceso de compra.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#98D9E1",
      cancelButtonColor: "#E51D0D",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setCart([]);
      toast.success("Se inició el proceso de compra.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        loading,
        error,
        isAuthenticated,
        handleAddToCart,
        handleDeleteFromCart,
        handleRemoveItem,
        handleEmptyCart,
        handleFinishBuy,
        filteredProducts,
        finder,
        setFinder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
