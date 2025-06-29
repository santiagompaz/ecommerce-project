import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import placeholder from "../assets/placeholder.jpg";
import EditForm from "../components/EditForm";

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const apiUrl =
    "https://681b766b17018fe5057baf9f.mockapi.io/productos-ecommerce/product";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const createProduct = async (productData) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Error al crear nuevo producto.");
      }

      const newProduct = await response.json();

      alert("Producto creado correctamente!");
      setProducts((prev) => [...prev, newProduct]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Hubo un problema al crear el producto.");
    }
  };

  const updateProduct = async (product) => {
    try {
      const response = await fetch(`${apiUrl}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Error al editar el producto.");

      const data = await response.json();
      alert("Producto actualizado correctamente.");

      setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));

      setIsOpenEdit(false);
      setSelected(null);
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al editar el producto.");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar el producto?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el producto.");

        alert("Producto eliminado correctamente.");
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (error) {
        console.error(error);
        alert("Hubo un problema al eliminar el producto.");
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};
