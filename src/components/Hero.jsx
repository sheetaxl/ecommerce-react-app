import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [bannerProduct, setBannerProduct] = useState(null);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch banner product and latest arrivals
  useEffect(() => {
    // Banner: pick 1 product for banner (e.g. first women's dress)
    fetch("https://dummyjson.com/products/category/womens-dresses")
      .then((res) => res.json())
      .then((data) => setBannerProduct(data.products[0]));

    // Latest Arrivals (limit to 3)
    fetch("https://dummyjson.com/products?limit=3&skip=90")
      .then((res) => res.json())
      .then((data) => setLatestProducts(data.products));
  }, []);

  return (
    <section className="bg-gray-100 py-20 text-center">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        Better clothing for the planet
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Sustainable styles picked just for you. Discover fashion that's gentle on the planet.
      </p>

      {/* Shop All Button */}
      <button
        onClick={() => navigate("/women")}
        className="border border-gray-800 px-6 py-2 rounded hover:bg-gray-200 transition mb-12"
      >
        Shop All
      </button>

      {/* Banner Image */}
      <div className="max-w-6xl mx-auto mb-20">
        {bannerProduct ? (
          <img
            src={bannerProduct.thumbnail}
            alt={bannerProduct.title}
            className="w-full h-[24rem] object-cover rounded-lg shadow-inner cursor-pointer"
            onClick={() => navigate(`/product/${bannerProduct.id}`)}
          />
        ) : (
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-inner" />
        )}
      </div>

      {/* Latest Arrivals */}
      <div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Our latest arrivals</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Explore the newest drops from our eco-friendly collections.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="border border-gray-800 px-6 py-2 rounded hover:bg-gray-200 transition mb-12"
        >
          Shop All
        </button>

        {/* Product Cards */}
        <div className="flex justify-center items-center flex-wrap gap-6 px-4">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <div
                key={product.id}
                className="w-60 h-80 bg-white rounded shadow hover:shadow-lg cursor-pointer transition"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{product.description}</p>
                  <p className="text-md font-bold mt-1">₹{product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="w-60 h-80 bg-gray-300 rounded" />
              <div className="w-60 h-96 bg-gray-300 rounded" />
              <div className="w-60 h-80 bg-gray-300 rounded" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

