import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { setIsAuthenticated } = useContext(CartContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!email) validationErrors.email = "El email es requerido";
    if (!password) validationErrors.password = "La contraseña es requerida";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    try {
      const res = await fetch("data/users.json");
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setError({ error: "Inválido" });
      } else {
        if (foundUser.role === "admin") {
          setIsAuthenticated(true);
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError({ email: "Error" });
    }
  };

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
