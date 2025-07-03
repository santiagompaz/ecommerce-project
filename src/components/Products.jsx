import React, { useContext, useState } from "react";
import "./ProductsStyles.css";
import placeholder from "../assets/placeholder.jpg";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const Products = ({ product }) => {
  const { handleAddToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  const add = () =>
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  const remove = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="product">
      <div className="image-container">
        <img
          src={product.image || placeholder}
          alt="Imagen del producto"
          className="image"
        ></img>
      </div>
      <h4 className="name">{product.name}</h4>
      <p className="description">{product.description}</p>
      <div className="info">
        <p className="price">${product.price}</p>
        <p className="stock">{product.stock} unidades</p>
      </div>
      <div className="counter">
        <button onClick={remove} className="button-counter">
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button onClick={add} className="button-counter">
          +
        </button>
      </div>
      <div className="button-area">
        <button
          onClick={() => {
            handleAddToCart(product, quantity);
            setQuantity(0);
          }}
          className="button-primary"
          disabled={quantity === 0}
        >
          Agregar al carrito
        </button>

        <Link to={`/gallery/${product.id}`}>
          Ver más <i className="bi bi-chevron-right"></i>
        </Link>
      </div>
    </div>
  );
};
