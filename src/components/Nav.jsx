import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavStyles.css";

export const Nav = () => {
  return (
    <nav>
      <ul className="nav">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <i className="bi bi-house-door"></i> Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <i className="bi bi-person"></i> Sobre nosotros
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <i className="bi bi-bag"></i> Galería de productos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/faq"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <i className="bi bi-question-circle"></i> Preguntas frecuentes
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <i className="bi bi-telephone"></i> Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
