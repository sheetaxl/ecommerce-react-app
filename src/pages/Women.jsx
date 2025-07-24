import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Women() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  // Fetch women’s dresses from DummyJSON
  useEffect(() => {
    fetch('https://dummyjson.com/products/category/womens-dresses')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error('Failed to fetch women products:', err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-pink-600 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold">Shop Women’s</h1>
        <p className="mt-2 text-sm">
          Discover chic and trendy outfits to elevate your style with our latest collection of women’s fashion.
        </p>
      </div>

      <div className="flex flex-col md:flex-row px-6 py-10">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4 pr-4">
          <h2 className="font-bold mb-3 text-lg">Filters</h2>
          <div className="text-sm space-y-4">
            <div>
              <p className="mb-1 font-semibold">Categories</p>
              <ul className="space-y-1">
                <li><input type="checkbox" defaultChecked /> Dresses</li>
                <li><input type="checkbox" /> Tops</li>
                <li><input type="checkbox" /> Skirts</li>
                <li><input type="checkbox" /> Jackets</li>
              </ul>
            </div>

            <div>
              <p className="mb-1 font-semibold">Color</p>
              <div className="flex gap-2 flex-wrap">
                {['bg-pink-300', 'bg-yellow-300', 'bg-purple-300', 'bg-gray-300'].map((color, i) => (
                  <span key={i} className={`${color} w-5 h-5 rounded-full border border-gray-400`}></span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full md:w-3/4">
          {/* Sort and Count Bar */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Showing {products.length} Products</span>
            <select className="border px-2 py-1 rounded text-sm">
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 shadow rounded">
                {/* Image + title as link */}
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
                  className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded text-sm"
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

