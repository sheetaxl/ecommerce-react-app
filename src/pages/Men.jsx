import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Men() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products/category/mens-shirts")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold">Shop Men’s</h1>
        <p className="mt-2 text-sm">
          Revamp your style with the latest designer trends in men’s clothing or achieve a perfectly curated wardrobe.
        </p>
      </div>

      <div className="flex flex-col md:flex-row px-6 py-10">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 pr-4">
          <h2 className="font-bold mb-2">Filters</h2>
          <div className="text-sm">
            <p className="mb-1 font-semibold">Categories</p>
            <ul className="space-y-1">
              <li><input type="checkbox" defaultChecked /> Shirts</li>
              <li><input type="checkbox" /> Hoodies</li>
              <li><input type="checkbox" /> Jackets</li>
              <li><input type="checkbox" /> Pants</li>
            </ul>

            <p className="mt-4 mb-1 font-semibold">Color</p>
            <div className="flex gap-2 flex-wrap">
              {['bg-gray-600', 'bg-blue-500', 'bg-green-500', 'bg-red-500'].map((color, i) => (
                <span key={i} className={`${color} w-5 h-5 rounded-full border border-gray-400`}></span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4">
          {/* Sort Bar */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Showing {products.length} Products</span>
            <select className="border px-2 py-1 rounded text-sm">
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 shadow rounded">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-48 w-full object-cover mb-4 rounded cursor-pointer"
                  />
                </Link>
                <h3 className="font-semibold text-sm">{product.title}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
                <p className="text-xs text-gray-500">Rating: {product.rating}</p>
                <button
                  className="mt-2 bg-black hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
