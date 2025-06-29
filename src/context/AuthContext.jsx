import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { setIsAuthenticated } = useContext(CartContext);

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
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, error, setError, handleSubmit }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
