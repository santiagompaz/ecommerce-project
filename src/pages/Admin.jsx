import React, { useContext, useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import placeholder from "../assets/placeholder.jpg";
import EditForm from "../components/EditForm";
import spinner from "../assets/loading.gif";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AdminContext } from "../context/AdminContext";

export const Admin = () => {
  const { setIsAuthenticated } = useAuth();

  const {
    products,
    loading,
    isOpen,
    setIsOpen,
    isOpenEdit,
    setIsOpenEdit,
    selected,
    setSelected,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useContext(AdminContext);
  
  const { navigate } = useNavigate();

  return (
    <div>
      {loading ? (
        <img src={spinner} alt="Cargando..." />
      ) : (
        <>
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    navigate("/");
                    localStorage.removeItem("isAuthenticated");
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </li>

              <li></li>
            </ul>
          </nav>
          <h1>Panel administrativo</h1>

          {products.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={item.image || placeholder}
                alt="Imagen del producto"
                className="image"
                style={{ width: "150px", height: "auto" }}
              />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>Precio: ${item.price}</p>
              <p>Stock: {item.stock}</p>
              <p>Categoría: {item.category}</p>

              <div>
                <button
                  onClick={() => {
                    setSelected(item);
                    setIsOpenEdit(true);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => deleteProduct(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              setSelected(null);
              setIsOpen(true);
            }}
          >
            Crear nuevo producto
          </button>

          {isOpen && <ProductForm onAdd={createProduct} />}

          {isOpenEdit && selected && (
            <EditForm selectedProduct={selected} onUpdate={updateProduct} />
          )}
        </>
      )}
    </div>
  );
};
