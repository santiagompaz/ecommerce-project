import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      const res = await fetch("/data/users.json");
      const users = await res.json();
      console.log("Usuarios cargados:", users);

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setError({ error: "Credenciales inválidas" });
      } else {
        setIsAuthenticated(true);
        if (foundUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      setError({ email: "Error del servidor o al cargar los usuarios" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email, setEmail,
        password, setPassword,
        error, setError,
        isAuthenticated, setIsAuthenticated,
        handleSubmit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
