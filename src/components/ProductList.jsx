import React from "react";
import { Products } from "./Products";
import './ProductListStyles.css'

export const ProductList = ({ addToCart, products }) => {
  return (
    <div className="productList">
      {products.map((item) => (

          <Products
            key={item.id}
            addToCart={addToCart}
            product={item}
          />

      ))}
    </div>
  );
};
