import React, { useState, useEffect } from "react";
import "./CartStyles.css";
import placeholder from "../assets/placeholder.jpg";

export const Cart = ({
  emptyCart,
  addToCart,
  removeFromCart,
  removeItem,
  cartProducts,
  showCart,
  onClose,
}) => {

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartProducts]);

  return (
    <div className={showCart ? "" : ""}>
      <div className="header-cart">
        <h2>Carrito de compras</h2>
        <button onClick={onClose}>
          <i className="bi bi-x-circle"></i>
        </button>
      </div>
      {!cartProducts || cartProducts.length === 0 ? (
        <p className="empty-cart">El carrito está vacío</p>
      ) : (
        <ul>
          {cartProducts.map((item) => (
            <li key={item.id} className="item-container">
              <div className="image-item-container">
                <img
                  src={item.image || placeholder}
                  alt={"Imagen del producto"}
                  className="image-item"
                />
              </div>
              <div className="info-container">
                <h6 className="name-item">{item.name}</h6>
                <p className="price-item">${item.price}</p>
                <div className="quantity-control">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="button-counter"
                  >
                    −
                  </button>
                  <span className="quantity-item">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="button-counter"
                  >
                    +
                  </button>
                </div>
                <p className="subtotal-item">
                  Subtotal: ${item.price * item.quantity}
                </p>
              </div>
              <div className="button-container">
                <button onClick={() => removeItem(item)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h1 className="total">
          Total: ${totalPrice.toFixed(2)}
        </h1>
        <button className="button-primary">Iniciar compra</button>
        <button onClick={() => emptyCart()} className="button-secondary">
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;
