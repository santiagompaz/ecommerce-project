import React, { useContext } from "react";
import { Products } from "./Products";
import './ProductListStyles.css'
import { CartContext } from "../context/CartContext";

export const ProductList = () => {

  const { products, filteredProducts, finder, setFinder } = useContext(CartContext);

  return (
    <>
   
    <div className="productList">
      {filteredProducts.map((item) => (

          <Products key={item.id} product={item} />

      ))}
    </div>
    </>
  );
};
