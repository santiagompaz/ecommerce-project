import React, { useEffect, useState } from "react";
import "./EditFormStyles.css";

const EditForm = ({ selectedProduct, onUpdate }) => {
  const [product, setProduct] = useState(selectedProduct || {});
  const [error, setError] = useState({});

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = ["price", "stock"].includes(name)
      ? parseFloat(value) || 0
      : value;

    setProduct({ ...product, [name]: parsedValue });
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
      validationErrors.stock = "El stock debe ser 0 o más.";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    onUpdate(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ margin: "2rem" }}>Editar producto</h2>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          ID:
        </label>
        <input
          type="text"
          name="id"
          value={product.id || ""}
          readOnly
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="ID"
        />
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Nombre:
        </label>
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
        <label for="exampleFormControlInput1" class="form-label">
          Descripción: 
        </label>
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
        <label for="exampleFormControlInput1" class="form-label">
          Precio:
        </label>
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
        <label for="exampleFormControlInput1" class="form-label">
          Stock:
        </label>
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
        <label for="exampleFormControlInput1" class="form-label">
          Imagen URL: 
        </label>
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
        <label for="exampleFormControlInput1" class="form-label">
          Categoría:
        </label>
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
          Actualizar producto
        </button>
      </div>
    </form>
  );
};

export default EditForm;
