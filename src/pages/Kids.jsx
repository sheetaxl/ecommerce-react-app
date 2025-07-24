import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Kids() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/tops') // simulate kids section
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error('Failed to fetch kids products:', err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-500 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold">Shop Kids</h1>
        <p className="mt-2 text-sm">Colorful and comfortable styles for your little ones!</p>
      </div>

      <div className="flex flex-col md:flex-row px-6 py-10">
        <aside className="w-full md:w-1/4 pr-4">
          <h2 className="font-bold mb-2">Filters</h2>
          <ul className="text-sm space-y-1">
            <li><input type="checkbox" defaultChecked /> T-Shirts</li>
            <li><input type="checkbox" /> Hoodies</li>
            <li><input type="checkbox" /> Shorts</li>
          </ul>
        </aside>

        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Showing {products.length} Products</span>
            <select className="border px-2 py-1 rounded text-sm">
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 shadow rounded">
                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-48 w-full object-cover rounded mb-4 hover:scale-105 transition"
                  />
                  <h3 className="font-semibold text-sm hover:underline">{p.title}</h3>
                </Link>
                <p className="text-sm text-gray-600">₹{p.price}</p>
                <p className="text-xs text-gray-500">Brand: {p.brand}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => addToCart(p)}
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
