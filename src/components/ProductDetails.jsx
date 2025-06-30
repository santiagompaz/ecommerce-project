import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import './ProductDetailsStyles.css'
import { CartContext } from "../context/CartContext";

export const ProductDetails = () => {

  const { products } = useContext(CartContext);

  const { id, idUser } = useParams();

  const product = products.find((prod) => prod.id == id);

  return (
    <div>
      {product ? (
        <div className="product-detail">
          <div className="image-container-detail">
            <img
              src={product.image || placeholder}
              alt="Imagen del producto"
              className="image-detail"
            ></img>
          </div>
          <p className="name-detail">{product.name}</p>
          <p className="description-detail">{product.description}</p>
          <div className="info-detail">
            <p className="price-detail">${product.price}</p>
            <p className="stock-detail">{product.stock} unidades</p>
          </div>
        </div>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
};
