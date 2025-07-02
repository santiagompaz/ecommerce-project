import React, { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { ProductList } from "../components/ProductList";
import spinner from "../assets/loading.gif";
import { CartContext } from "../context/CartContext";

export const ProductsGallery = () => {

  const { loading } = useContext(CartContext);

  return (
    <div>
      <Header />
      {loading ? (
        <img src={spinner} alt="Cargando..." style={{margin: '4rem'}}/>
      ) : (
        <div style={{marginTop: '1rem'}}>
        <ProductList />
        </div>
      )}
      <Footer />
    </div>
  );
};
