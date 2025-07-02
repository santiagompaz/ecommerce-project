import React, { useState, useEffect, useContext } from "react";
import "./CartStyles.css";
import placeholder from "../assets/placeholder.jpg";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

export const Cart = ({ showCart, onClose }) => {
  const {
    cart,
    handleAddToCart,
    handleDeleteFromCart,
    handleRemoveItem,
    handleEmptyCart,
    handleFinishBuy,
  } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  return (
    <div className={showCart ? "" : ""}>
      <div className="header-cart">
        <h2>Carrito de compras</h2>

        <button className="icon-button-x" onClick={onClose}>
          <i className="bi bi-x-circle"></i>
        </button>
      </div>
      {!cart || cart.length === 0 ? (
        <p className="empty-cart">El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <>
            <li key={item.id} className="item-container">
              <div className="image-item-container">
                <img
                  src={item.image || placeholder}
                  alt={"Imagen del producto"}
                  className="image-item"
                />
              </div>
              <div className="info-container">
                <h7 className="name-item">{item.name}</h7>
                <p className="price-item">${item.price}</p>

                <div className="quantity-control">
                  <button
                    onClick={() => handleDeleteFromCart(item)}
                    className="button-counter-cart"
                  >
                    −
                  </button>
                  <span className="quantity-item">{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="button-counter-cart"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="button-container">
                <button
                  className="icon-button-x"
                  onClick={() => handleRemoveItem(item)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
              </li>
              <p className="subtotal-item">
                  Subtotal: ${item.price * item.quantity}
                </p>
            </>
          ))}
        </>
      )}
      <div>
        <h1 className="total">Total: ${totalPrice.toFixed(2)}</h1>
        <div className="button-area">
          <button onClick={() => handleFinishBuy()} className="button-primary">
            Finalizar compra
          </button>
          <button
            onClick={() => handleEmptyCart()}
            className="button-secondary"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
