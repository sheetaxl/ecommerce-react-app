import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
      const data = await res.json();
      setProducts(data.products);
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName.replace("-", " ")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded-lg">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
