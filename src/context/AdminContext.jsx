import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
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

  const reloadProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error al cargar productos: ", error);
    }
  };

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
      setIsOpen(false);
      await reloadProducts();
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

      setIsOpenEdit(false);
      setSelected(null);
      await reloadProducts();
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
        await reloadProducts();
      } catch (error) {
        console.error(error);
        alert("Hubo un problema al eliminar el producto.");
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
