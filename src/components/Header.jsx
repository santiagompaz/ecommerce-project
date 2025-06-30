import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HeaderStyles.css";
import Cart from "./Cart";
import { Menu } from "./Menu";
import logo from "../assets/logo.jpg";
import { CartContext } from "../context/CartContext";

export const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { finder, setFinder } = useContext(CartContext);
  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setFinder(""); // ← Limpiar el input al cerrar
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header>
      <ul className="header">
        <li>
          <img src={logo} alt="Huevería La Selección" className="logo" />
        </li>

        <li>
          <h1 className="title">Huevería La Selección</h1>
        </li>

        <li className="icon-section">
          {!showSearch && (
            <button className="icon-button" onClick={() => setShowSearch(true)}>
              <i className="bi bi-search"></i>
            </button>
          )}

          {showSearch && (
            <div ref={searchRef}>
              <input
                type="text"
                className="search-slide"
                placeholder="Buscar productos..."
                value={finder}
                onChange={(e) => setFinder(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </li>

        <ul className="sections">
          <li>
            <button className="icon-button" onClick={() => setShowCart(!showCart)}>
              <i className="bi bi-cart"></i>
            </button>
          </li>
        </ul>

        <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
          <Cart showCart={showCart} onClose={() => setShowCart(false)} />
        </div>

        <div className={`menu-sidebar ${showMenu ? "open" : ""}`}>
          <Menu />
        </div>
      </ul>
    </header>
  );
};
