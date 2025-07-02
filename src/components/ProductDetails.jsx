import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetailsStyles.css';
import { CartContext } from "../context/CartContext";

export const ProductDetails = () => {
  const { products } = useContext(CartContext);
  const { id, idUser } = useParams();
  const navigate = useNavigate();

  const product = products.find((prod) => prod.id == id);

  return (
    <div>
      {product ? (
        <>
          <div className="product-detail">
            <div className="image-container-detail">
              <img
                src={product.image || placeholder}
                alt="Imagen del producto"
                className="image-detail"
              />
            </div>
            <h4 className="name-detail">{product.name}</h4>
            <p className="description-detail">{product.description}</p>
            <div className="info-detail">
              <p className="price-detail">${product.price}</p>
              <p className="stock-detail">{product.stock} unidades</p>
            </div>
          </div>
          <div className="button-area">
            <button className="button-primary" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
};
