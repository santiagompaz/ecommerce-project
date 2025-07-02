import React, { useState } from "react";
import "./ProductFormStyles.css";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = ["price", "stock"].includes(name)
      ? parseFloat(value) || 0
      : value;

    setProduct({
      ...product,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!product.name) validationErrors.name = "El nombre es requerido.";
    if (!product.description)
      validationErrors.description = "La descripción es requerida.";
    if (!product.price || product.price <= 0)
      validationErrors.price = "El precio debe ser mayor a 0.";
    if (!product.stock || product.stock < 0)
      validationErrors.stock = "El stock debe ser 0 o mayor.";
    if (!product.image)
      validationErrors.image = "La URL de la imagen es requerida.";
    if (!product.category)
      validationErrors.category = "La categoría es requerida.";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    onAdd(product);

    // Limpiar el formulario
    setProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      category: "",
    });
    setError({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear nuevo producto</h2>

      <div class="mb-3">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Nombre"
        />
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
      </div>

      <div class="mb-3">
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Descripción"
        />
        {error.description && (
          <p style={{ color: "red" }}>{error.description}</p>
        )}
      </div>

      <div class="mb-3">
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          min="0"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Precio"
        />
        {error.price && <p style={{ color: "red" }}>{error.price}</p>}
      </div>

      <div class="mb-3">
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          min="0"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Stock"
        />
        {error.stock && <p style={{ color: "red" }}>{error.stock}</p>}
      </div>

      <div class="mb-3">
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Imagen URL"
        />
        {error.image && <p style={{ color: "red" }}>{error.image}</p>}
      </div>

      <div class="mb-3">
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Categoría"
        />
        {error.category && <p style={{ color: "red" }}>{error.category}</p>}
      </div>
      <div className="button-area">
        <button type="submit" className="button-primary">
          Crear producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
