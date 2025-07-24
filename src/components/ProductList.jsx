// src/components/ProductList.jsx
import { useContext } from 'react';

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
const { addToCart } = useCart(); 

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded shadow p-4 bg-white">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-700">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
