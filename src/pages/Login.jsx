import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./LoginStyles.css";

export const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
  } = useAuth();

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Ingrese su e-mail
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="usuario@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <div className="message-error">{error.email}</div>}
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Ingrese su contraseña
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && (
          <div className="message-error">{error.password}</div>
        )}
      </div>

      <div className="button-area">
        <button type="submit" className="button-primary">
          Ingresar
        </button>
      </div>
    </form>
  );
};
