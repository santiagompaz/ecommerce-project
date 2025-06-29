import React, { useEffect, useState } from "react";

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
    if (!product.description) validationErrors.description = "La descripción es requerida.";
    if (!product.price || product.price <= 0) validationErrors.price = "El precio debe ser mayor a 0.";
    if (!product.stock || product.stock < 0) validationErrors.stock = "El stock debe ser 0 o más.";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    onUpdate(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar producto</h2>

      <div>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={product.id || ""}
          readOnly
        />
      </div>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={product.name || ""}
          onChange={handleChange}
          required
        />
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <input
          type="text"
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          required
        />
        {error.description && <p style={{ color: "red" }}>{error.description}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={product.price || ""}
          onChange={handleChange}
          required
          min="0"
        />
        {error.price && <p style={{ color: "red" }}>{error.price}</p>}
      </div>

      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={product.stock || ""}
          onChange={handleChange}
          required
          min="0"
        />
        {error.stock && <p style={{ color: "red" }}>{error.stock}</p>}
      </div>

      <div>
        <label>Imagen URL:</label>
        <input
          type="text"
          name="image"
          value={product.image || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="category"
          value={product.category || ""}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Actualizar producto</button>
    </form>
  );
};

export default EditForm;
