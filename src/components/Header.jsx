import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
        setFinder("");
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
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="d-flex align-items-center gap-3 text-decoration-none"
          >
            <img src={logo} alt="Huevería La Selección" className="logo" />
            <h1 className="title m-0">La Selección - Huevos & Regionales</h1>
          </Link>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-house-door"></i> <span className="nav-text">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                 <i className="bi bi-person"></i> <span className="nav-text">Sobre nosotros</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-bag"></i> <span className="nav-text">Galería</span>
                </NavLink>
              </li>
               {/* <li className="nav-item">
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-question-circle"></i> <span className="nav-text">Preguntas frecuentes</span>
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <i className="bi bi-telephone"></i> <span className="nav-text">Contacto</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="icon-section">
              {!showSearch && (
                <button
                  className="icon-button"
                  onClick={() => setShowSearch(true)}
                >
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
            </div>

            <button
              className="icon-button"
              onClick={() => setShowCart(!showCart)}
            >
              <i className="bi bi-cart"></i>
            </button>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
        <Cart showCart={showCart} onClose={() => setShowCart(false)} />
      </div>

      {/*
      <div className={`menu-sidebar ${showMenu ? "open" : ""}`}>
        <Menu />
      </div>
      */}
    </header>
  );
};
