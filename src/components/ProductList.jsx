import React, { useContext } from "react";
import { Products } from "./Products";
import './ProductListStyles.css'
import { CartContext } from "../context/CartContext";

export const ProductList = () => {

  const { products } = useContext(CartContext);

  return (
    <div className="productList">
      {products.map((item) => (

          <Products key={item.id} product={item} />

      ))}
    </div>
  );
};
