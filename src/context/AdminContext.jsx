import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los productos.",
          icon: "error",
          confirmButtonColor: "#04516F",
          confirmButtonText: "Aceptar",
        });
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

      Swal.fire({
        title: "¡Felicitaciones!",
        text: "Producto creado correctamente.",
        icon: "success",
        confirmButtonColor: "#04516F",
        confirmButtonText: "Aceptar",
      });
      setIsOpen(false);
      await reloadProducts();
    } catch (error) {
      console.error("Error al crear producto:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear el producto.",
        icon: "error",
        confirmButtonColor: "#04516F",
        confirmButtonText: "Aceptar",
      });
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

      Swal.fire({
        title: "¡Felicitaciones!",
        text: "Producto actualizado correctamente.",
        icon: "success",
        confirmButtonColor: "#04516F",
        confirmButtonText: "Aceptar",
      });
      setIsOpenEdit(false);
      setSelected(null);
      await reloadProducts();
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al editar el producto.",
        icon: "error",
        confirmButtonColor: "#04516F",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar el producto?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#04516F",
      cancelButtonColor: "#E51D0D",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el producto.");

        await reloadProducts();

        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto fue eliminado correctamente.",
          icon: "success",
          confirmButtonColor: "#04516F",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar el producto.",
          icon: "error",
          confirmButtonColor: "#98D9E1",
          confirmButtonText: "Aceptar",
        });
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
