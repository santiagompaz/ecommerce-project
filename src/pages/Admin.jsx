import React, { useContext, useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import placeholder from "../assets/placeholder.jpg";
import EditForm from "../components/EditForm";
import spinner from "../assets/loading.gif";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AdminContext } from "../context/AdminContext";
import "./AdminStyles.css";

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
        <img src={spinner} alt="Cargando..." style={{ margin: "4rem" }} />
      ) : (
        <>
          <header>
            <nav className="navbar navbar-expand-lg navbar-custom">
              <div className="container-fluid d-flex align-items-center">
                <div className="d-flex align-items-center gap-3 text-decoration-none">
                  <img src={logo} alt="La Selección" className="logo" />
                  <h1 className="title m-0">
                    La Selección - Huevos & Regionales
                  </h1>
                </div>
                <div className="ms-auto d-flex align-items-center">
                  <button
                    className="icon-button"
                    onClick={() => {
                      setSelected(null);
                      setIsOpen(true);
                    }}
                    title="Crear nuevo producto"
                  >
                    <i class="bi bi-plus-square"></i>
                  </button>

                  <button
                    className="icon-button"
                    onClick={() => {
                      setIsAuthenticated(false);
                      navigate("/");
                      localStorage.removeItem("isAuthenticated");
                    }}
                    title="Cerrar sesión"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              </div>
            </nav>
          </header>

          <div style={{ padding: "2rem" }}>
            <h1 style={{ marginBottom: "2rem" }}>Panel administrativo</h1>

            {isOpen && <ProductForm onAdd={createProduct} />}

            {products.map((item) => (
              <div className="product" key={item.id}>
                <div className="image-container">
                  <img
                    src={item.image || placeholder}
                    alt="Imagen del producto"
                    className="image"
                  />
                </div>
                <h4 className="name">{item.name}</h4>
                <p className="description">{item.description}</p>
                <p className="price">Precio: ${item.price}</p>
                <p className="stock">Stock: {item.stock}</p>

                <div className="button-area">
                  <button
                    className="button-primary"
                    onClick={() => {
                      setSelected(item);
                      setIsOpenEdit(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="button-secondary"
                    onClick={() => deleteProduct(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {isOpenEdit && selected && (
              <EditForm selectedProduct={selected} onUpdate={updateProduct} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
