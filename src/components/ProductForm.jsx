import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducts({ ...products, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd(products);

    setProducts({
      name: "",
      description: "",
      price: "",
    });
  };

  return <div>ProductForm</div>;
};

export default ProductForm