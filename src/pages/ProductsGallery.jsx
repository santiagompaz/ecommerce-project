import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { ProductList } from "../components/ProductList";
import spinner from "../assets/loading.gif";

export const ProductsGallery = ({
  emptyCart,
  removeFromCart,
  removeItem,
  addToCart,
  cart,
  products,
  loading,
}) => {
  return (
    <div>
      <Header
        emptyCart={emptyCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        removeItem={removeItem}
        cartProducts={cart}
      />
      <Nav />
      {loading ? (
        <img src={spinner} alt="Cargando..." />
      ) : (
        <ProductList addToCart={addToCart} products={products} />
      )}
      <Footer />
    </div>
  );
};
