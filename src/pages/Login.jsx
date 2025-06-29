import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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
      <div>
        <label htmlFor="formBasicEmail">E-mail</label>
        <input
          id="formBasicEmail"
          type="email"
          placeholder="Ingrese su email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <div>{error.email}</div>}
      </div>
      <div>
        <label htmlFor="formBasicPassword">Contraseña</label>
        <input
          id="formBasicPassword"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <div>{error.password}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
